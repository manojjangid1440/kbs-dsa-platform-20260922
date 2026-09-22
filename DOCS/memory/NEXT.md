# Next session handoff

## Start exactly here

1. Read root AGENTS.md, DOCS/START-HERE.md and memory/STATUS.md. Inspect `git status --short` and `git log --oneline -16`. Do not rebuild the repository or re-analyze the original PRD from scratch.
2. Run `npm ci` and `npm run check` using Node 24. Last verified result: local 36 pass / 2 PostgreSQL-only skips; GitHub Actions 38 pass / 0 skips against PostgreSQL 17. All shared/web/native typechecks and remote web build pass. Set TEST_DATABASE_URL to an isolated test database to run concurrency tests locally; the tests create and drop random schemas.
3. Read F01.md/F02.md, full requirement sections 3–4 and 21, contracts/api.md, security.md and data-model.md.
4. F01.01 is complete in migration 002 and packages/db/src/otp-challenges.ts. Published commit 2407d47 passed PostgreSQL concurrency CI run 35736511346. Do not reimplement it or mistake it for working live OTP authentication.
5. F01.02a throttling is implemented and awaits its remote PostgreSQL race gate. Next unblocked slice: **F01.03 server sessions**. Sessions must be issued inside the OTP consume continuation, use hashed unpredictable tokens, re-read active account/role, expire/revoke/rotate atomically and retain first-login evidence for training. Do not wire an OTP HTTP success flow before provider, request limits, trusted organization resolution and session transport/CSRF are ready.
6. F01.02 delivery needs approved OTP provider/policy. Until supplied, keep live OTP unavailable. F02 scoped repository queries and F05 private-file/job persistence can follow their declared dependencies; never claim an unavailable adapter works.

## Important actual state

- Web synthetic preview: `npm run dev:web`; API: `npm run dev:api`; mobile: `npm run dev:mobile`.
- API readiness deliberately 503 and protected /v1 routes 401. These are expected foundation behaviors.
- Pure payout transition functions require transactional repository row locks. Do not expose them as mutable in-memory HTTP endpoints.
- MIS rule helpers do not parse Excel. The three actual workbook files were not attached to this task; do not claim fixture import coverage.
- Browser visual QA remains outstanding because Chromium installation failed. Android bundle export passed, but APK signing/secure-screen/device tests remain outstanding.
- Canonical private remote is https://github.com/manojjangid1440/kbs-dsa-platform-20260922; main tracks origin/main. Initial GitHub CI passed. See [GITHUB.md](GITHUB.md) for initial commit mapping. Fetch current state before publishing; do not force-push.

## Each task ending

Update feature checkboxes and STATUS/NEXT/SESSION-LOG with exact evidence. Commit source, relevant documentation and tests together. Keep all unresolved business policy in the decision register. Do not mark full features done from passing core-unit tests.
