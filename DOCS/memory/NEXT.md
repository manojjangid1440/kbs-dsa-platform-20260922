# Next session handoff

## Start exactly here

1. Read root AGENTS.md, DOCS/START-HERE.md and memory/STATUS.md. Inspect `git status --short` and `git log --oneline -16`. Do not rebuild the repository or re-analyze the original PRD from scratch.
2. Run `npm ci` and `npm run check` using Node 24. Last verified result: 32 passing tests; all shared/web/native typechecks pass. A browser binary is not included.
3. Read F01.md/F02.md, full requirement sections 3–4 and 21, contracts/api.md, security.md and data-model.md.
4. First implement **F01.01: durable OTP challenge/session persistence** in a new migration and trusted service boundary. Include hashed challenge/token, atomic one-time consume, expiry/attempt counters and revocation. Existing API has no authenticated data routes. Do not replace this with header-role authentication or a fixed OTP.
5. Implement meaningful replay/expiry/rate-limit/session-revocation and wrong-object tests with real database transactions. Commit that small task before the provider/UI task.
6. F01.02 needs approved OTP provider/policy. Until supplied, keep live OTP unavailable. Continue unblocked F02 scoped repository queries and F05 private-file/job persistence with provider interfaces; never claim an unavailable adapter works.

## Important actual state

- Web synthetic preview: `npm run dev:web`; API: `npm run dev:api`; mobile: `npm run dev:mobile`.
- API readiness deliberately 503 and protected /v1 routes 401. These are expected foundation behaviors.
- Pure payout transition functions require transactional repository row locks. Do not expose them as mutable in-memory HTTP endpoints.
- MIS rule helpers do not parse Excel. The three actual workbook files were not attached to this task; do not claim fixture import coverage.
- Browser visual QA remains outstanding because Chromium installation failed. Android bundle export passed, but APK signing/secure-screen/device tests remain outstanding.
- Canonical private remote is https://github.com/manojjangid1440/kbs-dsa-platform-20260922; main tracks origin/main. Initial GitHub CI passed. See [GITHUB.md](GITHUB.md) for initial commit mapping. Fetch current state before publishing; do not force-push.

## Each task ending

Update feature checkboxes and STATUS/NEXT/SESSION-LOG with exact evidence. Commit source, relevant documentation and tests together. Keep all unresolved business policy in the decision register. Do not mark full features done from passing core-unit tests.
