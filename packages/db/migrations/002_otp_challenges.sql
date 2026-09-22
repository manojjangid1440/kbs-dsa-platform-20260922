BEGIN;
CREATE TABLE otp_subjects(
 organization_id uuid NOT NULL REFERENCES organizations(id),
 mobile_lookup_hash text NOT NULL CHECK(mobile_lookup_hash ~ '^[0-9a-f]{64}$'),
 purpose text NOT NULL CHECK(purpose IN ('LOGIN','ADVISOR_SIGNUP')),
 PRIMARY KEY(organization_id,mobile_lookup_hash,purpose)
);
CREATE TABLE otp_challenges(
 id uuid PRIMARY KEY, organization_id uuid NOT NULL,
 mobile_lookup_hash text NOT NULL, purpose text NOT NULL,
 code_digest text NOT NULL CHECK(code_digest ~ '^[0-9a-f]{64}$'),
 issued_at timestamptz NOT NULL, expires_at timestamptz NOT NULL,
 attempts integer NOT NULL DEFAULT 0, max_attempts integer NOT NULL,
 consumed_at timestamptz, revoked_at timestamptz,
 CHECK(expires_at>issued_at), CHECK(max_attempts BETWEEN 1 AND 10),
 CHECK(attempts BETWEEN 0 AND max_attempts),
 CHECK(consumed_at IS NULL OR consumed_at>=issued_at),
 CHECK(revoked_at IS NULL OR revoked_at>=issued_at),
 CHECK(consumed_at IS NULL OR revoked_at IS NULL),
 FOREIGN KEY(organization_id,mobile_lookup_hash,purpose)
 REFERENCES otp_subjects(organization_id,mobile_lookup_hash,purpose)
);
CREATE UNIQUE INDEX otp_one_live_challenge
 ON otp_challenges(organization_id,mobile_lookup_hash,purpose)
 WHERE consumed_at IS NULL AND revoked_at IS NULL;
CREATE INDEX otp_challenge_expiry ON otp_challenges(expires_at);
COMMIT;
