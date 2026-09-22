# Repository instructions

## Read first every session

1. Read `DOCS/START-HERE.md`, `DOCS/memory/STATUS.md`, `DOCS/memory/NEXT.md`, and the latest entry in `DOCS/memory/SESSION-LOG.md`.
2. Inspect `git status --short` and the recent commit log. Preserve other people's uncommitted changes.
3. Read the selected feature file, its complete linked requirement sections, acceptance cases, relevant contracts and ADRs. Do not load only a summary and guess the rest.
4. Select the first unblocked small task from `DOCS/features/README.md`. Reconcile actual code and test evidence with status before marking anything complete.

## Authority and invariants

User instructions > original attached PRD/latest documented user correction > accepted business decisions > feature specifications > implementation proposals. Preserve raw source and provenance. Never silently resolve an OPEN policy. Engineering defaults must be labelled as such and production gates must fail closed when policies are missing.

Only accepted MIS processing writes bank stage, final decision, activation, KYC and bank remarks. No direct bank-status edit endpoint. Keep operational, bank and payment state distinct. Missing MIS is unknown; approval is not activation. Exact bank-scoped references only; no name/mobile/PAN fuzzy matching. No Telecaller commission. Both Manager and Admin must approve each payout; one person cannot count twice. Accounts records external payments only. Prevent duplicate claims/payments in database transactions. Preserve history, suppression and source files.

## Workflow

All production source belongs in this monorepo. Use TypeScript, shared contracts and platform-appropriate components; shadcn/ui on web, React Native components with shared tokens on Android. Never import DOM components in mobile. Do not introduce Tamagui, passwords, bank-status APIs, automatic money transfer, loans or out-of-scope incentives.

Before application code, update relevant docs and acceptance criteria. Implement one independently reviewable task at a time. Run meaningful checks for affected risks. Commit every completed small task with its task ID and a precise message. Do not bundle unrelated changes. Never claim a test passed without executing it. Keep lockfile committed. Do not commit real customer data, secrets, node_modules or generated build directories.

Update `STATUS.md`, `NEXT.md`, `SESSION-LOG.md` and feature task status when progress changes. `STATUS.md` separates implemented, scaffolded, proposed, blocked and verified. Record commit references without trying to embed a commit's own future hash. If interrupted, leave exact files, commands, failures and next action in NEXT. Commit the handoff before stopping when possible.

No external communication, live customer calling, live identity verification, payment recording, production deployment or remote publication is implied by local development. No provider mock may run in production. Demo content must be labelled and entirely synthetic.

## Completion gate

A feature is done only when the entire referenced requirement is met, meaningful tests pass, authorization is checked at server and object scope, relevant UI states exist, docs and traceability are updated, and unresolved dependencies are absent. A passing pure unit test does not prove database concurrency, provider behavior, Android capture prevention or production readiness.

Preferred Git author for this repository: Manoj Jangid <manoj.jangid@skidos.com>. Never amend unrelated history or force-push.
