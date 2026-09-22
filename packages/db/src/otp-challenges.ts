import {
  createHmac,
  randomInt,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import type { SqlTransaction, TransactionalDatabase } from "./transaction.ts";

type Purpose = "LOGIN" | "ADVISOR_SIGNUP";
type Scope = { organizationId: string; mobileHash: string; purpose: Purpose };
type Verified = Scope & { challengeId: string };
type ChallengeRow = {
  mobile_lookup_hash: string;
  code_digest: string;
  usable: boolean;
};
export type OtpPolicy = { ttlSeconds: number; maxAttempts: number };
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const purposeIsValid = (value: string) =>
  value === "LOGIN" || value === "ADVISOR_SIGNUP";

/** Trusted server-only persistence. Not an HTTP authentication endpoint. */
export class OtpChallenges {
  private readonly pepper: Buffer;
  private readonly policy: OtpPolicy;

  constructor(
    private readonly db: TransactionalDatabase,
    pepper: Buffer,
    policy: OtpPolicy,
  ) {
    // Engineering ceilings, not an approved business policy; no defaults.
    if (
      pepper.byteLength < 32 ||
      !Number.isInteger(policy.ttlSeconds) ||
      policy.ttlSeconds < 1 ||
      policy.ttlSeconds > 900 ||
      !Number.isInteger(policy.maxAttempts) ||
      policy.maxAttempts < 1 ||
      policy.maxAttempts > 10
    )
      throw new Error("Invalid OTP security configuration");
    this.pepper = Buffer.from(pepper);
    this.policy = { ...policy };
  }

  private digest(...parts: string[]): string {
    return createHmac("sha256", this.pepper)
      .update(JSON.stringify(parts))
      .digest("hex");
  }

  mobileHash(mobile: string): string {
    if (!/^\+91[6-9]\d{9}$/.test(mobile))
      throw new Error("Invalid mobile format");
    return this.digest("mobile-lookup-v1", mobile);
  }

  /** The code may be passed only to the approved delivery adapter; never log it. */
  async issue(scope: Scope): Promise<{ challengeId: string; code: string }> {
    if (
      !uuid.test(scope.organizationId) ||
      !/^[0-9a-f]{64}$/.test(scope.mobileHash) ||
      !purposeIsValid(scope.purpose)
    )
      throw new Error("Invalid challenge scope");
    const challengeId = randomUUID();
    const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
    const digest = this.digest(
      "otp-code-v1",
      scope.organizationId,
      scope.purpose,
      challengeId,
      code,
    );
    await this.db.transaction(async (tx) => {
      const key = [scope.organizationId, scope.mobileHash, scope.purpose];
      await tx.query(
        `INSERT INTO otp_subjects VALUES($1,$2,$3) ON CONFLICT DO NOTHING`,
        key,
      );
      await tx.query(
        `SELECT organization_id FROM otp_subjects
         WHERE organization_id=$1 AND mobile_lookup_hash=$2 AND purpose=$3 FOR UPDATE`,
        key,
      );
      await tx.query(
        `UPDATE otp_challenges SET revoked_at=clock_timestamp()
         WHERE organization_id=$1 AND mobile_lookup_hash=$2 AND purpose=$3
         AND consumed_at IS NULL AND revoked_at IS NULL`,
        key,
      );
      await tx.query(
        `INSERT INTO otp_challenges(id,organization_id,mobile_lookup_hash,purpose,
           code_digest,issued_at,expires_at,max_attempts)
         SELECT $1,$2,$3,$4,$5,t,t+($6::integer*interval '1 second'),$7
         FROM (SELECT clock_timestamp() AS t) AS server_time`,
        [
          challengeId,
          ...key,
          digest,
          this.policy.ttlSeconds,
          this.policy.maxAttempts,
        ],
      );
    });
    return { challengeId, code };
  }

  /** Continuation must contain only transactional DB work, never network effects.
   * It must verify the current account and issue a session before auth is usable.
   * Wrong, expired, exhausted, revoked and nonexistent challenges all return false.
   */
  async consume<T>(
    input: {
      organizationId: string;
      purpose: Purpose;
      challengeId: string;
      code: string;
    },
    continueInTransaction: (
      tx: SqlTransaction,
      verified: Verified,
    ) => Promise<T>,
  ): Promise<{ ok: false } | { ok: true; value: T }> {
    if (
      !uuid.test(input.organizationId) ||
      !uuid.test(input.challengeId) ||
      !purposeIsValid(input.purpose)
    )
      return { ok: false };
    return this.db.transaction(async (tx) => {
      const key = [input.challengeId, input.organizationId, input.purpose];
      // Acquire the row first. Check wall-clock expiry after any lock wait.
      await tx.query(
        `SELECT id FROM otp_challenges WHERE id=$1 AND organization_id=$2 AND purpose=$3 FOR UPDATE`,
        key,
      );
      const result = await tx.query<ChallengeRow>(
        `SELECT mobile_lookup_hash,code_digest,
          (expires_at>clock_timestamp() AND consumed_at IS NULL AND revoked_at IS NULL
           AND attempts<max_attempts) AS usable
         FROM otp_challenges WHERE id=$1 AND organization_id=$2 AND purpose=$3`,
        key,
      );
      const row = result.rows[0];
      const digest = this.digest(
        "otp-code-v1",
        input.organizationId,
        input.purpose,
        input.challengeId,
        /^\d{6}$/.test(input.code) ? input.code : "invalid-code",
      );
      const correct = timingSafeEqual(
        Buffer.from(row?.code_digest ?? "0".repeat(64), "hex"),
        Buffer.from(digest, "hex"),
      );
      if (!row?.usable) return { ok: false };
      await tx.query(
        "UPDATE otp_challenges SET attempts=attempts+1 WHERE id=$1",
        [input.challengeId],
      );
      if (!correct) return { ok: false };
      // Conditional write rechecks expiry immediately before consuming.
      const consumed = await tx.query(
        `UPDATE otp_challenges SET consumed_at=clock_timestamp()
         WHERE id=$1 AND expires_at>clock_timestamp() RETURNING id`,
        [input.challengeId],
      );
      if (consumed.rows.length === 0) return { ok: false };
      const value = await continueInTransaction(tx, {
        organizationId: input.organizationId,
        mobileHash: row.mobile_lookup_hash,
        purpose: input.purpose,
        challengeId: input.challengeId,
      });
      return { ok: true, value };
    });
  }
}
