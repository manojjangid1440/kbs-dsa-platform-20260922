import test from "node:test";
import assert from "node:assert/strict";
import {
  applyMis,
  bankDisplay,
  matchReferences,
  contradictoryRows,
  type AcceptedRow,
  type MisPolicy,
} from "../src/mis.ts";
const p: MisPolicy = {
  approved: true,
  version: "fixture-v1",
  mode: "SNAPSHOT",
  blank: "REPLACE",
};
const row: AcceptedRow = {
  bankId: "b",
  leadId: "l",
  batchId: "batch1",
  rowId: "row1",
  fingerprint: "hash/profile/bank/lead/1",
  sourceOrder: 1,
  acceptedAt: "2026-09-22T10:00:00Z",
  fields: {
    CURRENT_STAGE: "Decisioned Cases",
    FINAL_DECISION: "Approve",
    "Card Activation Staus": "INACTIVE",
  },
};
function initial() {
  const r = applyMis(null, row, p);
  assert.equal(r.kind, "applied");
  if (r.kind !== "applied") throw Error();
  return r.snapshot;
}
test("approval and inactive remain independent and unknown stays unknown", () => {
  const s = initial();
  assert.equal(s.fields.FINAL_DECISION, "Approve");
  assert.equal(s.fields["Card Activation Staus"], "INACTIVE");
  assert.equal(bankDisplay("#N/A", true), "Not reported");
  assert.equal(bankDisplay(null, false), "Awaiting MIS Update");
  assert.equal(bankDisplay("NEW_BANK_VALUE", true), "NEW_BANK_VALUE");
});
test("exact bank scoped references keep zeros and reject conflicting aliases", () => {
  const index = [
    {
      bankId: "b",
      kind: "APPLICATION_NO" as const,
      value: "0001",
      leadId: "l",
    },
    { bankId: "b", kind: "REFERENCE" as const, value: "R2", leadId: "other" },
  ];
  assert.deepEqual(
    matchReferences("b", [{ kind: "APPLICATION_NO", value: "0001" }], index),
    { kind: "matched", leadId: "l" },
  );
  assert.equal(
    matchReferences("other", [{ kind: "APPLICATION_NO", value: "0001" }], index)
      .kind,
    "unmatched",
  );
  assert.equal(
    matchReferences("b", [{ kind: "APPLICATION_NO", value: "1" }], index).kind,
    "unmatched",
  );
  assert.equal(
    matchReferences(
      "b",
      [
        { kind: "APPLICATION_NO", value: "0001" },
        { kind: "REFERENCE", value: "R2" },
      ],
      index,
    ).kind,
    "conflict",
  );
  assert.equal(matchReferences("b", [], index).kind, "unmatched");
  assert.equal(
    matchReferences(
      "b",
      [{ kind: "APPLICATION_NO", value: "0001" }],
      [...index, { ...index[0]!, leadId: "duplicate" }],
    ).kind,
    "conflict",
  );
});
test("identical file replay does not refresh or generate change effects", () => {
  const s = initial();
  const r = applyMis(s, { ...row, acceptedAt: "2026-09-23T10:00:00Z" }, p);
  assert.equal(r.kind, "replay");
  if (r.kind === "replay") assert.equal(r.snapshot, s);
});
test("new same-value matching batch refreshes only confirmation", () => {
  const r = applyMis(
    initial(),
    {
      ...row,
      batchId: "batch2",
      rowId: "row2",
      fingerprint: "2",
      sourceOrder: 2,
      acceptedAt: "2026-09-23T10:00:00Z",
    },
    p,
  );
  assert.equal(r.kind, "applied");
  if (r.kind === "applied") {
    assert.equal(r.changes.length, 0);
    assert.equal(r.snapshot.lastMatchedAt, "2026-09-23T10:00:00Z");
  }
});
test("blank policy explicit and prior field provenance survives delta KEEP", () => {
  const r = applyMis(
    initial(),
    {
      ...row,
      fingerprint: "2",
      sourceOrder: 2,
      fields: { FINAL_DECISION: null },
    },
    { ...p, mode: "DELTA", blank: "KEEP" },
  );
  assert.equal(r.kind, "applied");
  if (r.kind === "applied") {
    assert.equal(r.snapshot.fields.FINAL_DECISION, "Approve");
    assert.equal(r.snapshot.fieldSources.FINAL_DECISION, "row1");
    assert.equal(r.snapshot.lastRow.fields.FINAL_DECISION, null);
  }
  const replace = applyMis(
    initial(),
    {
      ...row,
      fingerprint: "2",
      sourceOrder: 2,
      fields: { FINAL_DECISION: "#N/A" },
    },
    p,
  );
  if (replace.kind === "applied")
    assert.equal(
      bankDisplay(replace.snapshot.fields.FINAL_DECISION, true),
      "Not reported",
    );
  else assert.fail();
});
test("stale/equal source requires review; wrong identity and unapproved policy fail", () => {
  const s = initial();
  assert.equal(
    applyMis(s, { ...row, fingerprint: "older", sourceOrder: 0 }, p).kind,
    "review",
  );
  assert.equal(
    applyMis(s, { ...row, fingerprint: "conflict" }, p).kind,
    "review",
  );
  assert.throws(() => applyMis(s, { ...row, leadId: "other" }, p));
  assert.throws(() => applyMis(null, row, { ...p, approved: false }));
});
test("contradictory rows identified independently of file order", () => {
  const rs = [
    { reference: "001", fields: { FINAL_DECISION: "Approve" } },
    { reference: "001", fields: { FINAL_DECISION: "Decline" } },
  ];
  assert.deepEqual(contradictoryRows(rs), ["001"]);
  assert.deepEqual(contradictoryRows([...rs].reverse()), ["001"]);
});
