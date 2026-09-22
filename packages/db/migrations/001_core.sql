-- Core baseline. Forward-only. Business repositories and race tests are still required.
BEGIN;
CREATE TABLE organizations(id uuid PRIMARY KEY, name text NOT NULL);
CREATE TABLE users(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL REFERENCES organizations(id),
 role text NOT NULL CHECK(role IN ('ADMIN','MANAGER','TELECALLER','ADVISOR','ACCOUNTS')),
 mobile_lookup_hash text NOT NULL, active boolean NOT NULL DEFAULT true,
 UNIQUE(organization_id,id), UNIQUE(organization_id,mobile_lookup_hash)
);
CREATE UNIQUE INDEX one_active_admin ON users(organization_id) WHERE role='ADMIN' AND active;
CREATE TABLE files(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL REFERENCES organizations(id),
 object_key text NOT NULL UNIQUE, sha256 text NOT NULL CHECK(length(sha256)=64),
 purpose text NOT NULL, scan_state text NOT NULL CHECK(scan_state IN ('PENDING','CLEAN','REJECTED')),
 UNIQUE(organization_id,id)
);
CREATE TABLE leads(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL REFERENCES organizations(id),
 advisor_id uuid NOT NULL, bank_id text NOT NULL, card_version_id text NOT NULL,
 reporting_snapshot jsonb NOT NULL, consent_evidence_id uuid NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(organization_id,id), UNIQUE(organization_id,id,bank_id),
 FOREIGN KEY(organization_id,advisor_id) REFERENCES users(organization_id,id),
 FOREIGN KEY(organization_id,consent_evidence_id) REFERENCES files(organization_id,id)
);
CREATE INDEX leads_owner_created ON leads(organization_id,advisor_id,created_at,id);
CREATE TABLE bank_references(
 organization_id uuid NOT NULL, bank_id text NOT NULL,
 kind text NOT NULL CHECK(kind IN ('APPLICATION_NO','REFERENCE')), value text NOT NULL CHECK(length(value)>0 AND value=btrim(value)),
 lead_id uuid NOT NULL, evidence_id uuid NOT NULL,
 PRIMARY KEY(organization_id,bank_id,kind,value),
 FOREIGN KEY(organization_id,lead_id,bank_id) REFERENCES leads(organization_id,id,bank_id),
 FOREIGN KEY(organization_id,evidence_id) REFERENCES files(organization_id,id)
);
CREATE TABLE mis_batches(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL REFERENCES organizations(id), bank_id text NOT NULL,
 profile_version text NOT NULL, file_id uuid NOT NULL, content_hash text NOT NULL,
 uploaded_by uuid NOT NULL, uploaded_at timestamptz NOT NULL DEFAULT now(),
 state text NOT NULL CHECK(state IN ('STAGED','REVIEW','ACCEPTED','REJECTED')),
 source_order bigint NOT NULL CHECK(source_order>=0),
 UNIQUE(organization_id,id), UNIQUE(organization_id,id,bank_id),
 UNIQUE(organization_id,bank_id,profile_version,content_hash),
 FOREIGN KEY(organization_id,file_id) REFERENCES files(organization_id,id),
 FOREIGN KEY(organization_id,uploaded_by) REFERENCES users(organization_id,id)
);
CREATE TABLE mis_rows(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL, bank_id text NOT NULL, batch_id uuid NOT NULL,
 sheet_name text NOT NULL, row_number integer NOT NULL CHECK(row_number>0), raw_fields jsonb NOT NULL,
 result text NOT NULL CHECK(result IN ('MATCHED','UNMATCHED','CONFLICT','INVALID','UNCHANGED')),
 UNIQUE(organization_id,id), UNIQUE(organization_id,id,bank_id), UNIQUE(batch_id,sheet_name,row_number),
 FOREIGN KEY(organization_id,batch_id,bank_id) REFERENCES mis_batches(organization_id,id,bank_id)
);
CREATE TABLE bank_snapshots(
 organization_id uuid NOT NULL, lead_id uuid PRIMARY KEY, bank_id text NOT NULL, source_row_id uuid NOT NULL,
 fields jsonb NOT NULL, field_sources jsonb NOT NULL, version integer NOT NULL CHECK(version>0), last_matched_at timestamptz NOT NULL,
 FOREIGN KEY(organization_id,lead_id,bank_id) REFERENCES leads(organization_id,id,bank_id),
 FOREIGN KEY(organization_id,source_row_id,bank_id) REFERENCES mis_rows(organization_id,id,bank_id)
);
CREATE TABLE bank_history(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL, lead_id uuid NOT NULL, source_row_id uuid NOT NULL,
 changes jsonb NOT NULL, accepted_at timestamptz NOT NULL,
 FOREIGN KEY(organization_id,lead_id) REFERENCES leads(organization_id,id),
 FOREIGN KEY(organization_id,source_row_id) REFERENCES mis_rows(organization_id,id), UNIQUE(lead_id,source_row_id)
);
CREATE TABLE entitlements(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL, advisor_id uuid NOT NULL,
 lead_id uuid NOT NULL, bank_id text NOT NULL, event_key text NOT NULL, mis_row_id uuid NOT NULL,
 rule_version text NOT NULL, amount_paise bigint NOT NULL CHECK(amount_paise>0 AND amount_paise<=9007199254740991),
 eligible boolean NOT NULL, on_hold boolean NOT NULL DEFAULT false,
 UNIQUE(organization_id,id), UNIQUE(organization_id,bank_id,event_key),
 FOREIGN KEY(organization_id,advisor_id) REFERENCES users(organization_id,id),
 FOREIGN KEY(organization_id,lead_id,bank_id) REFERENCES leads(organization_id,id,bank_id),
 FOREIGN KEY(organization_id,mis_row_id,bank_id) REFERENCES mis_rows(organization_id,id,bank_id)
);
CREATE TABLE payout_requests(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL, advisor_id uuid NOT NULL, manager_id uuid NOT NULL, admin_id uuid NOT NULL,
 revision integer NOT NULL CHECK(revision>0), amount_paise bigint NOT NULL CHECK(amount_paise>0 AND amount_paise<=9007199254740991),
 state text NOT NULL CHECK(state IN ('PENDING','APPROVED','HOLD','REJECTED','CANCELLED','PAID')),
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(manager_id<>admin_id AND advisor_id<>manager_id AND advisor_id<>admin_id), UNIQUE(organization_id,id),
 FOREIGN KEY(organization_id,advisor_id) REFERENCES users(organization_id,id),
 FOREIGN KEY(organization_id,manager_id) REFERENCES users(organization_id,id),
 FOREIGN KEY(organization_id,admin_id) REFERENCES users(organization_id,id)
);
CREATE TABLE request_items(
 organization_id uuid NOT NULL, request_id uuid NOT NULL, entitlement_id uuid NOT NULL,
 evidence_snapshot jsonb NOT NULL, amount_paise bigint NOT NULL CHECK(amount_paise>0),
 PRIMARY KEY(request_id,entitlement_id), UNIQUE(organization_id,request_id,entitlement_id),
 FOREIGN KEY(organization_id,request_id) REFERENCES payout_requests(organization_id,id),
 FOREIGN KEY(organization_id,entitlement_id) REFERENCES entitlements(organization_id,id)
);
CREATE TABLE active_reservations(
 organization_id uuid NOT NULL, entitlement_id uuid PRIMARY KEY, request_id uuid NOT NULL,
 reserved_at timestamptz NOT NULL DEFAULT now(),
 FOREIGN KEY(organization_id,request_id,entitlement_id) REFERENCES request_items(organization_id,request_id,entitlement_id)
);
CREATE TABLE approvals(
 organization_id uuid NOT NULL, request_id uuid NOT NULL, revision integer NOT NULL,
 role text NOT NULL CHECK(role IN ('MANAGER','ADMIN')), actor_id uuid NOT NULL,
 decision text NOT NULL CHECK(decision IN ('APPROVE','REJECT')), reason text, decided_at timestamptz NOT NULL,
 PRIMARY KEY(request_id,revision,role), UNIQUE(request_id,revision,actor_id),
 FOREIGN KEY(organization_id,request_id) REFERENCES payout_requests(organization_id,id),
 FOREIGN KEY(organization_id,actor_id) REFERENCES users(organization_id,id)
);
CREATE TABLE external_payments(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL, request_id uuid NOT NULL UNIQUE,
 transfer_reference text NOT NULL CHECK(length(btrim(transfer_reference))>0),
 amount_paise bigint NOT NULL CHECK(amount_paise>0), paid_at timestamptz NOT NULL,
 proof_file_id uuid NOT NULL, recorded_by uuid NOT NULL,
 UNIQUE(organization_id,id), UNIQUE(organization_id,transfer_reference),
 FOREIGN KEY(organization_id,request_id) REFERENCES payout_requests(organization_id,id),
 FOREIGN KEY(organization_id,proof_file_id) REFERENCES files(organization_id,id),
 FOREIGN KEY(organization_id,recorded_by) REFERENCES users(organization_id,id)
);
CREATE TABLE paid_entitlements(
 organization_id uuid NOT NULL, entitlement_id uuid PRIMARY KEY, payment_id uuid NOT NULL,
 FOREIGN KEY(organization_id,entitlement_id) REFERENCES entitlements(organization_id,id),
 FOREIGN KEY(organization_id,payment_id) REFERENCES external_payments(organization_id,id)
);
CREATE TABLE audit_events(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL, actor_id uuid NOT NULL,
 action text NOT NULL, target_id text NOT NULL, safe_metadata jsonb NOT NULL DEFAULT '{}', occurred_at timestamptz NOT NULL DEFAULT now(),
 FOREIGN KEY(organization_id,actor_id) REFERENCES users(organization_id,id)
);
CREATE TABLE outbox(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL, event_key text NOT NULL, recipient_id uuid NOT NULL,
 safe_payload jsonb NOT NULL, attempts integer NOT NULL DEFAULT 0 CHECK(attempts>=0),
 next_attempt_at timestamptz NOT NULL DEFAULT now(), delivered_at timestamptz,
 UNIQUE(organization_id,event_key,recipient_id), FOREIGN KEY(organization_id,recipient_id) REFERENCES users(organization_id,id)
);
CREATE INDEX outbox_pending ON outbox(next_attempt_at) WHERE delivered_at IS NULL;
COMMIT;
