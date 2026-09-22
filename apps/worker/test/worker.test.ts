import test from "node:test";
import assert from "node:assert/strict";
import { executeJob } from "../src/index.ts";
test("unconfigured worker fails rather than acknowledging an unprocessed job", async () => {
  await assert.rejects(
    () =>
      executeJob({
        id: "synthetic",
        kind: "MIS_IMPORT",
        organizationId: "org",
        idempotencyKey: "k",
      }),
    /Durable job repository/,
  );
});
