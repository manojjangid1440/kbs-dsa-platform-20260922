BEGIN;
CREATE TABLE otp_rate_scopes(
 organization_id uuid NOT NULL REFERENCES organizations(id),
 kind text NOT NULL CHECK(kind IN ('DEVICE','IP','PHONE')),
 subject_hash text NOT NULL CHECK(subject_hash ~ '^[0-9a-f]{64}$'),
 PRIMARY KEY(organization_id,kind,subject_hash)
);
CREATE TABLE otp_rate_reservations(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL, kind text NOT NULL,
 subject_hash text NOT NULL, reserved_at timestamptz NOT NULL,
 FOREIGN KEY(organization_id,kind,subject_hash)
 REFERENCES otp_rate_scopes(organization_id,kind,subject_hash)
);
CREATE INDEX otp_rate_recent ON otp_rate_reservations(organization_id,kind,subject_hash,reserved_at);
COMMIT;
