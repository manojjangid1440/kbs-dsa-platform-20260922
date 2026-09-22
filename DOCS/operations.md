# Development and operations runbook

## Local setup target

Node 24 and npm workspaces. `npm ci` installs pinned dependencies. `npm run check` runs docs integrity, strict typechecks, domain/API tests and database baseline verification. `npm run dev:api`, `npm run dev:web` and `npm run dev:mobile` start separate apps. Exact implemented scripts are recorded in root package.json; a planned command is not proof it ran.

API binds loopback by default. Web/native demo shells contain synthetic examples and do not authenticate real users. Copy `.env.example` only when needed; never commit `.env` values. Approved provider credentials are not included. PostgreSQL development infrastructure is isolated and must not use a production database. Android APK requires Android SDK/JDK or approved EAS account and signing setup; no APK is claimed before a successful build and device smoke test.

## CI and code review

Clean install from lockfile; documentation links/source coverage; typecheck; unit and API tests; schema migration smoke test; web production build. Add real PostgreSQL race tests, Android CI and provider contract tests as their integrations land. Commit each small task with its ID. No force pushes. Dependency upgrades are separate reviewed tasks.

## Imports and recovery

Raw file immutable and checksum verified. Preview profile and file revision are bound to confirm. Worker jobs have attempt count, bounded retry/backoff and quarantine for permanent failures. Crash before publication exposes no accepted partial data. Retry checks committed idempotency/outbox keys. Reconciliation reports input rows vs accepted/unchanged/unmatched/conflict/rejected and source publication revision. Admin review must preserve old evidence; never repair by direct production status edit.

## Finance recovery

If transfer outcome is unclear, Accounts marks review rather than attempts duplicate payment. A transfer exists outside KBS; ingestion of its proof is a separate operation. Keep request/cards/approvals/payment links immutable. Correction after payment opens exception, not a clawback. Reconcile available/reserved/paid cardinality and paise amounts daily under an approved run schedule. Production scheduling remains an operational decision.

## Observability and backup

Structured request/job/correlation IDs and safe error codes; counters for unmatched references, duplicate batches, deadline access denials, failed provider requests, outbox retries, reservation conflicts and payment exceptions. No PII in telemetry. Alert thresholds and on-call owners require approved scale inputs. Backups cover database plus private asset references/objects. Test restore with MIS and payout provenance; RPO/RTO and retention are unresolved, not invented SLAs.

## Remote repository

This task creates a fresh local Git repository with full incremental history. It does not reuse any existing repository. If remote creation/push capability is unavailable, preserve `.git` in the deliverable archive and record that no remote publication occurred. Never claim a GitHub URL without successful creation and push. Use a newly authorized private destination when available, then `git remote add origin <new-url>` and `git push -u origin main`; do not overwrite an existing remote project.
