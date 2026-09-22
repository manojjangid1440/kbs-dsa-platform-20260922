import { requireRule, validInstant } from "@kbs/contracts";
export const BANK_FIELDS = [
  "CURRENT_STAGE",
  "FINAL_DECISION",
  "Card Activation Staus",
  "KYC Status",
  "VKYC_STATUS",
  "BKYC Status",
  "DROPOFF_REASON",
  "DECLINE_CODE",
  "DECLINE_DESCRIPTION",
  "Decline Descreption",
  "Decline Type",
  "Reason",
] as const;
export type RawFields = Readonly<Record<string, string | null>>;
export interface BankReference {
  bankId: string;
  kind: "APPLICATION_NO" | "REFERENCE";
  value: string;
  leadId: string;
}
export type Match =
  | { kind: "matched"; leadId: string }
  | { kind: "unmatched" | "conflict"; reason: string };
export function matchReferences(
  bankId: string,
  refs: readonly { kind: BankReference["kind"]; value: string | null }[],
  index: readonly BankReference[],
): Match {
  const supplied = refs.filter(
    (r): r is { kind: BankReference["kind"]; value: string } =>
      r.value !== null && r.value !== "" && r.value !== "#N/A",
  );
  if (!supplied.length)
    return { kind: "unmatched", reason: "NO_USABLE_REFERENCE" };
  const leads = new Set<string>();
  let missing = false;
  for (const ref of supplied) {
    if (ref.value.trim() !== ref.value)
      return { kind: "conflict", reason: "REFERENCE_MAPPING_REQUIRED" };
    const matches = index.filter(
      (x) =>
        x.bankId === bankId && x.kind === ref.kind && x.value === ref.value,
    );
    const unique = new Set(matches.map((x) => x.leadId));
    if (unique.size > 1)
      return { kind: "conflict", reason: "AMBIGUOUS_REFERENCE" };
    if (!unique.size) missing = true;
    else for (const id of unique) leads.add(id);
  }
  if (leads.size > 1)
    return { kind: "conflict", reason: "REFERENCES_DISAGREE" };
  // Conservatively review unknown aliases instead of guessing they are equivalent.
  if (missing)
    return {
      kind: leads.size ? "conflict" : "unmatched",
      reason: "UNVERIFIED_REFERENCE",
    };
  const leadId = [...leads][0];
  return leadId
    ? { kind: "matched", leadId }
    : { kind: "unmatched", reason: "NO_MATCH" };
}
export function bankDisplay(
  raw: string | null | undefined,
  everMatched: boolean,
): string {
  if (!everMatched) return "Awaiting MIS Update";
  return raw === null ||
    raw === undefined ||
    raw.trim() === "" ||
    raw === "#N/A"
    ? "Not reported"
    : raw;
}
export interface AcceptedRow {
  bankId: string;
  leadId: string;
  batchId: string;
  rowId: string;
  fingerprint: string;
  sourceOrder: number;
  acceptedAt: string;
  fields: RawFields;
}
export interface Snapshot {
  bankId: string;
  leadId: string;
  fields: RawFields;
  fieldSources: Readonly<Record<string, string>>;
  lastMatchedAt: string;
  lastRow: AcceptedRow;
  acceptedFingerprints: readonly string[];
}
export interface MisPolicy {
  approved: boolean;
  version: string;
  mode: "SNAPSHOT" | "DELTA";
  blank: "REPLACE" | "KEEP";
}
export interface BankChange {
  field: string;
  before: string | null | undefined;
  after: string | null;
  rowId: string;
  batchId: string;
  acceptedAt: string;
}
export type ApplyResult =
  | { kind: "applied"; snapshot: Snapshot; changes: BankChange[] }
  | { kind: "replay"; snapshot: Snapshot }
  | { kind: "review"; reason: string };
/** Only trusted accepted-import service calls this; absent leads are not passed at all. */
export function applyMis(
  previous: Snapshot | null,
  row: AcceptedRow,
  policy: MisPolicy,
): ApplyResult {
  requireRule(
    policy.approved && policy.version.length > 0,
    "PROFILE_REQUIRED",
    "Approved MIS profile required",
  );
  validInstant(row.acceptedAt);
  requireRule(
    Number.isSafeInteger(row.sourceOrder) && row.sourceOrder >= 0,
    "INVALID_SOURCE_ORDER",
    "Reviewed source ordering required",
  );
  if (previous) {
    requireRule(
      previous.leadId === row.leadId && previous.bankId === row.bankId,
      "REFERENCE_MISMATCH",
      "Snapshot identity differs",
    );
    if (previous.acceptedFingerprints.includes(row.fingerprint))
      return { kind: "replay", snapshot: previous };
    if (row.sourceOrder < previous.lastRow.sourceOrder)
      return { kind: "review", reason: "STALE_SOURCE_REQUIRES_CORRECTION" };
    if (row.sourceOrder === previous.lastRow.sourceOrder)
      return { kind: "review", reason: "EQUAL_ORDER_REQUIRES_REVIEW" };
    if (validInstant(row.acceptedAt) < validInstant(previous.lastMatchedAt))
      return { kind: "review", reason: "ACCEPTANCE_TIME_REGRESSION" };
  }
  const fields: Record<string, string | null> = { ...previous?.fields };
  const fieldSources: Record<string, string> = { ...previous?.fieldSources };
  const changes: BankChange[] = [];
  for (const [field, raw] of Object.entries(row.fields)) {
    const blank = bankDisplay(raw, true) === "Not reported";
    if (blank && policy.blank === "KEEP" && Object.hasOwn(fields, field))
      continue;
    // Original raw blank/#N/A remains in row even if profile keeps a prior known snapshot value.
    const before = fields[field];
    if (before !== raw)
      changes.push({
        field,
        before,
        after: raw,
        rowId: row.rowId,
        batchId: row.batchId,
        acceptedAt: row.acceptedAt,
      });
    fields[field] = raw;
    fieldSources[field] = row.rowId;
  }
  return {
    kind: "applied",
    snapshot: {
      bankId: row.bankId,
      leadId: row.leadId,
      fields,
      fieldSources,
      lastMatchedAt: row.acceptedAt,
      lastRow: row,
      acceptedFingerprints: [
        ...(previous?.acceptedFingerprints ?? []),
        row.fingerprint,
      ],
    },
    changes,
  };
}
export function contradictoryRows(
  rows: readonly { reference: string; fields: RawFields }[],
): string[] {
  const seen = new Map<string, string>();
  const conflicts = new Set<string>();
  for (const row of rows) {
    const value = JSON.stringify(
      Object.entries(row.fields).sort(([a], [b]) => a.localeCompare(b)),
    );
    const prior = seen.get(row.reference);
    if (prior !== undefined && prior !== value) conflicts.add(row.reference);
    seen.set(row.reference, value);
  }
  return [...conflicts];
}
