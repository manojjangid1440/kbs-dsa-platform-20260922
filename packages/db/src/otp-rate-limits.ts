import { createHmac, randomUUID } from "node:crypto";
import { isIP } from "node:net";
import type { TransactionalDatabase } from "./transaction.ts";

const kinds = ["DEVICE", "IP", "PHONE"] as const;
type Kind = (typeof kinds)[number];
export type RatePolicy = Record<Kind, { limit: number; windowSeconds: number }>;
type Subjects = Record<Kind, string>;

function canonicalIp(ip: string): string {
  if (isIP(ip) === 4) return ip;
  if (isIP(ip) !== 6 || ip.includes("%")) throw new Error("Invalid client IP");
  const normalized = new URL(`http://[${ip}]/`).hostname.slice(1, -1);
  const mapped = /^::ffff:([a-f0-9]+):([a-f0-9]+)$/.exec(normalized);
  if (!mapped) return normalized;
  const a = parseInt(mapped[1]!, 16),
    b = parseInt(mapped[2]!, 16);
  return [a >> 8, a & 255, b >> 8, b & 255].join(".");
}

export class OtpRateLimits {
  private readonly key: Buffer;
  private readonly policy: RatePolicy;
  constructor(
    private readonly db: TransactionalDatabase,
    key: Buffer,
    policy: RatePolicy,
  ) {
    if (
      key.length < 32 ||
      kinds.some(
        (k) =>
          !policy[k] ||
          !Number.isInteger(policy[k].limit) ||
          policy[k].limit < 1 ||
          policy[k].limit > 10000 ||
          !Number.isInteger(policy[k].windowSeconds) ||
          policy[k].windowSeconds < 1 ||
          policy[k].windowSeconds > 86400,
      )
    )
      throw new Error("Invalid rate-limit configuration");
    this.key = Buffer.from(key);
    this.policy = structuredClone(policy);
  }

  /** clientIp comes from trusted socket/proxy resolution, never raw forwarding headers. */
  subjects(
    phoneHash: string,
    clientIp: string,
    deviceIdentity: string,
  ): Subjects {
    if (
      !/^[0-9a-f]{64}$/.test(phoneHash) ||
      !/^[A-Za-z0-9_-]{16,200}$/.test(deviceIdentity)
    )
      throw new Error("Invalid throttle identity");
    const digest = (kind: Kind, value: string) =>
      createHmac("sha256", this.key)
        .update(JSON.stringify(["otp-rate-v1", kind, value]))
        .digest("hex");
    return {
      PHONE: digest("PHONE", phoneHash),
      IP: digest("IP", canonicalIp(clientIp)),
      DEVICE: digest("DEVICE", deviceIdentity),
    };
  }

  async reserve(
    organizationId: string,
    subjects: Subjects,
  ): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
    if (
      !/^[0-9a-f-]{36}$/i.test(organizationId) ||
      kinds.some((k) => !/^[0-9a-f]{64}$/.test(subjects[k]))
    )
      throw new Error("Invalid throttle scope");
    return this.db.transaction(async (tx) => {
      for (const kind of kinds) {
        const key = [organizationId, kind, subjects[kind]];
        await tx.query(
          "INSERT INTO otp_rate_scopes VALUES($1,$2,$3) ON CONFLICT DO NOTHING",
          key,
        );
        await tx.query(
          "SELECT kind FROM otp_rate_scopes WHERE organization_id=$1 AND kind=$2 AND subject_hash=$3 FOR UPDATE",
          key,
        );
      }
      const now = (
        await tx.query<{ now: Date }>("SELECT clock_timestamp() AS now")
      ).rows[0]!.now;
      let retryAfterSeconds = 0;
      for (const kind of kinds) {
        const p = this.policy[kind];
        const row = (
          await tx.query<{ used: number; retry: number | null }>(
            `SELECT count(*)::integer AS used,
           ceil(extract(epoch FROM (min(reserved_at)+$4::integer*interval '1 second'-$5::timestamptz)))::integer AS retry
           FROM otp_rate_reservations WHERE organization_id=$1 AND kind=$2 AND subject_hash=$3
           AND reserved_at>$5::timestamptz-$4::integer*interval '1 second'`,
            [organizationId, kind, subjects[kind], p.windowSeconds, now],
          )
        ).rows[0]!;
        if (row.used >= p.limit)
          retryAfterSeconds = Math.max(retryAfterSeconds, row.retry ?? 1, 1);
      }
      if (retryAfterSeconds > 0) return { allowed: false, retryAfterSeconds };
      for (const kind of kinds)
        await tx.query(
          "INSERT INTO otp_rate_reservations VALUES($1,$2,$3,$4,$5)",
          [randomUUID(), organizationId, kind, subjects[kind], now],
        );
      return { allowed: true, retryAfterSeconds: 0 };
    });
  }
}
