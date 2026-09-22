import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { OtpRateLimits } from "../src/index.ts";
import { databaseFixture, org, otherOrg, postgresOnly } from "./support.ts";
const policy = {
  PHONE: { limit: 2, windowSeconds: 60 },
  IP: { limit: 3, windowSeconds: 60 },
  DEVICE: { limit: 4, windowSeconds: 60 },
};
const device = "synthetic_device_0001";

test("durable OTP quotas charge all scopes once, persist across service restarts and expire", async () =>
  databaseFixture(async ({ db, sql }) => {
    const key = randomBytes(32),
      limiter = new OtpRateLimits(db, key, policy);
    const subjects = limiter.subjects("a".repeat(64), "192.0.2.1", device);
    assert.equal((await limiter.reserve(org, subjects)).allowed, true);
    assert.equal(
      (await new OtpRateLimits(db, key, policy).reserve(org, subjects)).allowed,
      true,
    );
    const denied = await limiter.reserve(org, subjects);
    assert.equal(denied.allowed, false);
    assert.ok(denied.retryAfterSeconds > 0);
    assert.equal(
      (
        await sql.query(
          "SELECT count(*)::integer AS n FROM otp_rate_reservations",
        )
      ).rows[0]?.n,
      6,
    );
    assert.equal((await limiter.reserve(otherOrg, subjects)).allowed, true);
    await sql.query(
      "UPDATE otp_rate_reservations SET reserved_at=clock_timestamp()-interval '60 seconds' WHERE organization_id=$1",
      [org],
    );
    assert.equal((await limiter.reserve(org, subjects)).allowed, true);
    const data = JSON.stringify(
      (await sql.query("SELECT * FROM otp_rate_reservations")).rows,
    );
    assert.equal(data.includes(device), false);
    assert.equal(data.includes("192.0.2.1"), false);
  }));

test("IP and device quotas prevent phone rotation and equivalent IPv6 bypass", async () =>
  databaseFixture(async ({ db }) => {
    const limiter = new OtpRateLimits(db, randomBytes(32), policy);
    assert.deepEqual(
      limiter.subjects("a".repeat(64), "::ffff:192.0.2.1", device),
      limiter.subjects("a".repeat(64), "192.0.2.1", device),
    );
    assert.deepEqual(
      limiter.subjects("a".repeat(64), "2001:db8::1", device),
      limiter.subjects("a".repeat(64), "2001:0db8:0000:0:0:0:0:1", device),
    );
    for (const phone of ["a", "b", "c"])
      assert.equal(
        (
          await limiter.reserve(
            org,
            limiter.subjects(phone.repeat(64), "192.0.2.2", device),
          )
        ).allowed,
        true,
      );
    assert.equal(
      (
        await limiter.reserve(
          org,
          limiter.subjects("d".repeat(64), "192.0.2.2", "different_device_002"),
        )
      ).allowed,
      false,
    );
    assert.equal(
      (
        await limiter.reserve(
          org,
          limiter.subjects("e".repeat(64), "192.0.2.3", device),
        )
      ).allowed,
      true,
    );
    assert.equal(
      (
        await limiter.reserve(
          org,
          limiter.subjects("f".repeat(64), "192.0.2.4", device),
        )
      ).allowed,
      false,
    );
    assert.throws(() => limiter.subjects("a".repeat(64), "not-an-ip", device));
    assert.throws(() => new OtpRateLimits(db, Buffer.alloc(1), policy));
  }));

test(
  "real PostgreSQL OTP quota admits only the configured concurrent limit",
  postgresOnly,
  async () =>
    databaseFixture(async ({ db, sql }) => {
      const limiter = new OtpRateLimits(db, randomBytes(32), policy),
        subjects = limiter.subjects("a".repeat(64), "192.0.2.1", device);
      const result = await Promise.all(
        Array.from({ length: 8 }, () => limiter.reserve(org, subjects)),
      );
      assert.equal(result.filter((r) => r.allowed).length, 2);
      assert.equal(
        (
          await sql.query(
            "SELECT count(*)::integer AS n FROM otp_rate_reservations",
          )
        ).rows[0]?.n,
        6,
      );
    }),
);
