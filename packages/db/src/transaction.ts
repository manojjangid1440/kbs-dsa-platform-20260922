import type { Pool } from "pg";

export interface SqlTransaction {
  query<T extends Record<string, unknown> = Record<string, unknown>>(
    sql: string,
    values?: unknown[],
  ): Promise<{ rows: T[] }>;
}

export interface TransactionalDatabase {
  transaction<T>(work: (tx: SqlTransaction) => Promise<T>): Promise<T>;
}

/** All transaction statements use the same checked-out connection. */
export function postgresDatabase(pool: Pool): TransactionalDatabase {
  return {
    async transaction(work) {
      const client = await pool.connect();
      let broken = false;
      try {
        await client.query("BEGIN");
        const result = await work(client);
        await client.query("COMMIT");
        return result;
      } catch (error) {
        try {
          await client.query("ROLLBACK");
        } catch {
          broken = true;
        }
        throw error;
      } finally {
        client.release(broken);
      }
    },
  };
}
