import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { Pool } from "pg";
import { migrationUrls, postgresDatabase } from "../src/index.ts";
import type { SqlTransaction, TransactionalDatabase } from "../src/index.ts";

export const org = "00000000-0000-4000-8000-000000000001";
export const otherOrg = "00000000-0000-4000-8000-000000000002";
export const postgresOnly = {
  skip:
    !process.env.TEST_DATABASE_URL &&
    "requires real PostgreSQL TEST_DATABASE_URL",
};
export async function databaseFixture(
  work: (x: {
    db: TransactionalDatabase;
    sql: SqlTransaction;
    pool?: Pool;
  }) => Promise<void>,
) {
  const schema = `test_${randomUUID().replaceAll("-", "")}`;
  const pool = process.env.TEST_DATABASE_URL
    ? new Pool({
        connectionString: process.env.TEST_DATABASE_URL,
        max: 8,
        options: `-c search_path=${schema}`,
      })
    : undefined;
  const embedded = pool ? undefined : new PGlite();
  try {
    if (pool) await pool.query(`CREATE SCHEMA ${schema}`);
    for (const url of migrationUrls) {
      const source = await readFile(url, "utf8");
      if (pool) await pool.query(source);
      else await embedded!.exec(source);
    }
    const sql: SqlTransaction = pool ?? embedded!;
    await sql.query(
      "INSERT INTO organizations VALUES($1,'Synthetic'),($2,'Other synthetic')",
      [org, otherOrg],
    );
    const db: TransactionalDatabase = pool
      ? postgresDatabase(pool)
      : { transaction: (work) => embedded!.transaction((tx) => work(tx)) };
    await work({ db, sql, ...(pool ? { pool } : {}) });
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
