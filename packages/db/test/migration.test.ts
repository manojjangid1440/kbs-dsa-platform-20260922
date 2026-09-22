import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { coreMigrationUrl } from "../src/index.ts";
const id = (n: number) =>
  `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
test("PostgreSQL-compatible baseline enforces financial identity and organization constraints", async () => {
  const db = new PGlite();
  try {
    await db.exec(await readFile(coreMigrationUrl, "utf8"));
    await db.query("INSERT INTO organizations VALUES ($1,$2)", [
      id(1),
      "Synthetic",
    ]);
    for (const [n, role] of [
      [2, "ADMIN"],
      [3, "MANAGER"],
      [4, "ADVISOR"],
      [5, "ACCOUNTS"],
    ] as const)
      await db.query(
        "INSERT INTO users(id,organization_id,role,mobile_lookup_hash) VALUES ($1,$2,$3,$4)",
        [id(n), id(1), role, `hash-${n}`],
      );
    await assert.rejects(() =>
      db.query("INSERT INTO users VALUES ($1,$2,$3,$4,true)", [
        id(6),
        id(1),
        "ADMIN",
        "hash-6",
      ]),
    );
    await db.query("INSERT INTO files VALUES($1,$2,$3,$4,$5,$6)", [
      id(10),
      id(1),
      "synthetic-private-key",
      "a".repeat(64),
      "CONSENT",
      "CLEAN",
    ]);
    await db.query(
      "INSERT INTO leads(id,organization_id,advisor_id,bank_id,card_version_id,reporting_snapshot,consent_evidence_id) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [id(20), id(1), id(4), "bank", "card", "{}", id(10)],
    );
    await db.query("INSERT INTO bank_references VALUES($1,$2,$3,$4,$5,$6)", [
      id(1),
      "bank",
      "APPLICATION_NO",
      "0001",
      id(20),
      id(10),
    ]);
    await assert.rejects(() =>
      db.query("INSERT INTO bank_references VALUES($1,$2,$3,$4,$5,$6)", [
        id(1),
        "bank",
        "APPLICATION_NO",
        "0001",
        id(20),
        id(10),
      ]),
    );
    await db.query(
      "INSERT INTO mis_batches(id,organization_id,bank_id,profile_version,file_id,content_hash,uploaded_by,state,source_order) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [id(30), id(1), "bank", "fixture", id(10), "hash", id(2), "ACCEPTED", 1],
    );
    await db.query("INSERT INTO mis_rows VALUES($1,$2,$3,$4,$5,$6,$7,$8)", [
      id(31),
      id(1),
      "bank",
      id(30),
      "Sheet1",
      2,
      "{}",
      "MATCHED",
    ]);
    await db.query(
      "INSERT INTO entitlements VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,true,false)",
      [
        id(40),
        id(1),
        id(4),
        id(20),
        "bank",
        "event1",
        id(31),
        "synthetic",
        10000,
      ],
    );
    for (const n of [50, 51]) {
      await db.query(
        "INSERT INTO payout_requests(id,organization_id,advisor_id,manager_id,admin_id,revision,amount_paise,state) VALUES($1,$2,$3,$4,$5,1,10000,$6)",
        [id(n), id(1), id(4), id(3), id(2), "PENDING"],
      );
      await db.query("INSERT INTO request_items VALUES($1,$2,$3,$4,$5)", [
        id(1),
        id(n),
        id(40),
        "{}",
        10000,
      ]);
    }
    await db.query(
      "INSERT INTO active_reservations(organization_id,entitlement_id,request_id) VALUES($1,$2,$3)",
      [id(1), id(40), id(50)],
    );
    await assert.rejects(() =>
      db.query(
        "INSERT INTO active_reservations(organization_id,entitlement_id,request_id) VALUES($1,$2,$3)",
        [id(1), id(40), id(51)],
      ),
    );
    await db.query(
      "INSERT INTO approvals VALUES($1,$2,1,$3,$4,$5,null,now())",
      [id(1), id(50), "MANAGER", id(3), "APPROVE"],
    );
    await assert.rejects(() =>
      db.query("INSERT INTO approvals VALUES($1,$2,1,$3,$4,$5,null,now())", [
        id(1),
        id(50),
        "ADMIN",
        id(3),
        "APPROVE",
      ]),
    );
    await db.query(
      "INSERT INTO external_payments VALUES($1,$2,$3,$4,10000,now(),$5,$6)",
      [id(60), id(1), id(50), "TX1", id(10), id(5)],
    );
    await assert.rejects(() =>
      db.query(
        "INSERT INTO external_payments VALUES($1,$2,$3,$4,10000,now(),$5,$6)",
        [id(61), id(1), id(51), "TX1", id(10), id(5)],
      ),
    );
    await assert.rejects(() =>
      db.query(
        "INSERT INTO external_payments VALUES($1,$2,$3,$4,10000,now(),$5,$6)",
        [id(62), id(1), id(50), "TX2", id(10), id(5)],
      ),
    );
    await db.query("INSERT INTO paid_entitlements VALUES($1,$2,$3)", [
      id(1),
      id(40),
      id(60),
    ]);
    await assert.rejects(() =>
      db.query("INSERT INTO paid_entitlements VALUES($1,$2,$3)", [
        id(1),
        id(40),
        id(60),
      ]),
    );
    const result = await db.query<{ value: string }>(
      "SELECT value FROM bank_references",
    );
    assert.equal(result.rows[0]?.value, "0001");
  } finally {
    await db.close();
  }
});
