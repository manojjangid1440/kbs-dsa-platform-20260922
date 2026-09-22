import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { Pool } from "pg";
import {
  coreMigrationUrl,
  otpMigrationUrl,
  OtpChallenges,
  postgresDatabase,
} from "../src/index.ts";
import type { SqlTransaction, TransactionalDatabase } from "../src/index.ts";

const org = "00000000-0000-4000-8000-000000000001";
const otherOrg = "00000000-0000-4000-8000-000000000002";
const testUrl = process.env.TEST_DATABASE_URL;

async function fixture(
  work: (x: {
    db: TransactionalDatabase;
    sql: SqlTransaction;
    otp: OtpChallenges;
    scope: { organizationId: string; mobileHash: string; purpose: "LOGIN" };
    pool?: Pool;
  }) => Promise<void>,
) {
  const schema = `otp_test_${randomUUID().replaceAll("-", "")}`;
  const pool = testUrl
    ? new Pool({
        connectionString: testUrl,
        max: 6,
        options: `-c search_path=${schema}`,
      })
    : undefined;
  const embedded = pool ? undefined : new PGlite();
  try {
    if (pool) await pool.query(`CREATE SCHEMA ${schema}`);
    const sql: SqlTransaction = pool ?? embedded!;
    for (const path of [coreMigrationUrl, otpMigrationUrl]) {
      const migration = await readFile(path, "utf8");
      if (pool) await pool.query(migration);
      else await embedded!.exec(migration);
    }
    await sql.query(
      "INSERT INTO organizations VALUES($1,'Synthetic'),($2,'Other synthetic')",
      [org, otherOrg],
    );
    const db: TransactionalDatabase = pool
      ? postgresDatabase(pool)
      : {
          transaction: (work) => embedded!.transaction((tx) => work(tx)),
        };
    const otp = new OtpChallenges(db, randomBytes(32), {
      ttlSeconds: 120,
      maxAttempts: 3,
    });
    const scope = {
      organizationId: org,
      mobileHash: otp.mobileHash("+919000000001"),
      purpose: "LOGIN" as const,
    };
    await work({ db, sql, otp, scope, ...(pool ? { pool } : {}) });
  } finally {
    if (pool) {
      try {
        await pool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
      } finally {
        await pool.end();
      }
    }
    await embedded?.close();
  }
}

test("OTP uses keyed storage, binds scope, and consumes only once", async () =>
  fixture(async ({ otp, sql, scope }) => {
    const issued = await otp.issue(scope);
    const input = { ...scope, ...issued };
    const stored = (await sql.query("SELECT * FROM otp_challenges")).rows[0]!;
    assert.equal(typeof stored.code_digest, "string");
    assert.equal(String(stored.code_digest).length, 64);
    assert.notEqual(stored.code_digest, issued.code);
    assert.equal(JSON.stringify(stored).includes("+919000000001"), false);
    assert.equal("code" in stored, false);
    let continuations = 0;
    const continuation = async (
      _tx: SqlTransaction,
      verified: { mobileHash: string },
    ) => {
      continuations++;
      assert.equal(verified.mobileHash, scope.mobileHash);
      return "verified";
    };
    assert.deepEqual(
      await otp.consume({ ...input, organizationId: otherOrg }, continuation),
      { ok: false },
    );
    assert.deepEqual(
      await otp.consume({ ...input, purpose: "ADVISOR_SIGNUP" }, continuation),
      { ok: false },
    );
    assert.deepEqual(await otp.consume(input, continuation), {
      ok: true,
      value: "verified",
    });
    assert.deepEqual(await otp.consume(input, continuation), { ok: false });
    assert.equal(continuations, 1);
  }));

test("OTP attempts persist, exhaustion rejects even correct code, resend revokes", async () =>
  fixture(async ({ otp, sql, scope }) => {
    const first = await otp.issue(scope);
    const input = { ...scope, ...first };
    const denied = () => {
      throw new Error("Must not continue");
    };
    for (let i = 0; i < 3; i++)
      assert.deepEqual(await otp.consume({ ...input, code: "bad" }, denied), {
        ok: false,
      });
    assert.deepEqual(await otp.consume(input, denied), { ok: false });
    assert.equal(
      (
        await sql.query("SELECT attempts FROM otp_challenges WHERE id=$1", [
          first.challengeId,
        ])
      ).rows[0]?.attempts,
      3,
    );
    const second = await otp.issue(scope);
    assert.deepEqual(await otp.consume(input, denied), { ok: false });
    assert.deepEqual(
      await otp.consume({ ...scope, ...second }, async () => true),
      { ok: true, value: true },
    );
    assert.ok(
      (
        await sql.query("SELECT revoked_at FROM otp_challenges WHERE id=$1", [
          first.challengeId,
        ])
      ).rows[0]?.revoked_at,
    );
  }));

test("OTP expiry is strict and continuation failure rolls consumption back", async () =>
  fixture(async ({ otp, sql, scope }) => {
    const expired = await otp.issue(scope);
    await sql.query(
      "UPDATE otp_challenges SET issued_at=clock_timestamp()-interval '2 minutes', expires_at=clock_timestamp() WHERE id=$1",
      [expired.challengeId],
    );
    assert.deepEqual(
      await otp.consume({ ...scope, ...expired }, async () => true),
      { ok: false },
    );
    const live = await otp.issue(scope);
    await assert.rejects(
      otp.consume({ ...scope, ...live }, async (tx) => {
        await tx.query(
          "UPDATE organizations SET name='Should roll back' WHERE id=$1",
          [org],
        );
        throw new Error("Downstream failure");
      }),
      /Downstream failure/,
    );
    const row = (
      await sql.query(
        "SELECT consumed_at,attempts FROM otp_challenges WHERE id=$1",
        [live.challengeId],
      )
    ).rows[0];
    assert.equal(row?.consumed_at, null);
    assert.equal(row?.attempts, 0);
    assert.equal(
      (await sql.query("SELECT name FROM organizations WHERE id=$1", [org]))
        .rows[0]?.name,
      "Synthetic",
    );
    assert.deepEqual(
      await otp.consume({ ...scope, ...live }, async () => true),
      { ok: true, value: true },
    );
  }));

test("OTP rejects missing or unsafe security configuration", async () =>
  fixture(async ({ db }) => {
    assert.throws(
      () =>
        new OtpChallenges(db, Buffer.alloc(8), {
          ttlSeconds: 120,
          maxAttempts: 3,
        }),
    );
    assert.throws(
      () =>
        new OtpChallenges(db, randomBytes(32), {
          ttlSeconds: 0,
          maxAttempts: 3,
        }),
    );
    assert.throws(
      () =>
        new OtpChallenges(db, randomBytes(32), {
          ttlSeconds: 120,
          maxAttempts: 11,
        }),
    );
  }));

test(
  "real PostgreSQL concurrent OTP consume and resend have one winner",
  {
    skip:
      !testUrl &&
      "requires TEST_DATABASE_URL; PGlite cannot prove connection races",
  },
  async () =>
    fixture(async ({ otp, sql, scope }) => {
      const challenge = await otp.issue(scope);
      const results = await Promise.all(
        Array.from({ length: 6 }, () =>
          otp.consume({ ...scope, ...challenge }, async () => true),
        ),
      );
      assert.equal(results.filter((r) => r.ok).length, 1);
      const issued = await Promise.all(
        Array.from({ length: 6 }, () => otp.issue(scope)),
      );
      const active = (
        await sql.query(
          "SELECT id FROM otp_challenges WHERE consumed_at IS NULL AND revoked_at IS NULL",
        )
      ).rows;
      assert.equal(active.length, 1);
      assert.ok(issued.some((c) => c.challengeId === active[0]?.id));
    }),
);

test(
  "real PostgreSQL expiry is rechecked after waiting for a row lock",
  { skip: !testUrl && "requires TEST_DATABASE_URL" },
  async () =>
    fixture(async ({ otp, pool, scope }) => {
      const challenge = await otp.issue(scope);
      const blocker = await pool!.connect();
      try {
        await blocker.query("BEGIN");
        await blocker.query(
          "SELECT id FROM otp_challenges WHERE id=$1 FOR UPDATE",
          [challenge.challengeId],
        );
        await blocker.query(
          "UPDATE otp_challenges SET expires_at=clock_timestamp()+interval '150 milliseconds' WHERE id=$1",
          [challenge.challengeId],
        );
        const pending = otp.consume(
          { ...scope, ...challenge },
          async () => true,
        );
        await blocker.query("SELECT pg_sleep(0.3)");
        await blocker.query("COMMIT");
        assert.deepEqual(await pending, { ok: false });
      } finally {
        await blocker.query("ROLLBACK");
        blocker.release();
      }
    }),
);
