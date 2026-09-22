# Architecture

Status: selected engineering design for a fresh implementation; business policy remains in the open-decision register.

## Workspace boundaries

| Path | Responsibility | Forbidden coupling |
| --- | --- | --- |
| apps/web | Next.js App Router, Tailwind and shadcn/ui; Admin/Manager/Accounts role screens | No database access or client-controlled role authorization |
| apps/mobile | Expo/React Native Android; Telecaller/Advisor/Manager journeys | No web DOM component imports; no browser-only UI pretending to be native |
| apps/api | Fastify HTTP boundary, sessions, validation, object authorization, application transactions | No client-originated bank status mutation |
| apps/worker | Import, notification and reconciliation jobs | No bypass of domain rules or unlocked financial writes |
| packages/contracts | Runtime-validated boundary schemas and typed errors | No UI/provider/database dependencies |
| packages/domain | Pure MIS, training, payout and access policy rules | No network, framework, storage or production policy defaults |
| packages/config | Validated environment and feature readiness | No secrets in exports to clients |
| packages/db | PostgreSQL migrations and future repositories | No ORM model leaked as public API contract |
| packages/integrations | OTP, identity, telephony, WhatsApp and storage ports | No bank status provider integration |
| packages/ui | shadcn/ui web components | Not imported by React Native |
| packages/tokens | Shared color/spacing/type/shape constants | No platform dependencies |

Use npm workspaces and one committed lockfile, strict TypeScript and Node 24. A root check orchestrates all workspace checks. Version pins are resolved during setup and recorded in the lockfile. npm was selected to avoid a second package-manager bootstrap dependency; switching requires an ADR and lockfile migration.

## Runtime and storage

Use PostgreSQL for users, scoped entities, immutable import metadata, snapshots, approvals, reservations, external payments and outbox. Use private object storage for source Excel, recordings, proof and cheque files. Large imports execute asynchronously in a worker. Storage and provider implementations remain gated until configured. Start with a PostgreSQL-backed job/outbox design rather than adding Redis before queue load requires it.

Web/mobile → versioned API → application service → domain validation + repository transaction. Worker → staged raw rows → exact matching → accepted publication transaction → snapshot/history + entitlement reevaluation + outbox. Provider webhook → signature/replay verification → normalized provider event → operational record only.

## Transactions and data flow

Lead creation uses idempotency key scoped to actor, route and payload hash. Commit lead, selected card/link versions, reporting snapshot and audit atomically. Never write a bank snapshot during this transaction.

MIS preview stores immutable input hash and profile revision. Confirming consumes the exact reviewed preview; a changed file/profile invalidates it. Publication acquires bank/batch coordination and lead locks, validates ordering and references, applies snapshots and audit/outbox within a consistent accepted revision. Replaying the same file does not duplicate effects. Source omissions do not erase other leads.

Payout submission locks selected entitlements in sorted ID order, validates ownership/latest eligible evidence/no hold/no paid or reservation, snapshots rate and amount, inserts request/items/reservations and outbox, then commits. Approval rechecks evidence and request revision. Settlement locks request and entitlements, requires both distinct approvers and clean proof, validates exact full amount and unique reference, then atomically records payment and consumes reservations. Correction after settlement creates exception, never deletes payment.

## Availability and errors

Health means process alive. Readiness means dependencies and configuration required by deployed capabilities are available. Unconfigured providers return explicit unavailable errors; they must not generate simulated success. Development demo data is synthetic and clearly marked. Durable database/providership features are not complete until their integration tests run.

Store UTC instants; retain raw bank dates/timezone. Format Indian currency as INR from integer paise and display local dates explicitly. Logs contain request IDs, error codes and safe entity IDs, never OTP, PAN, Aadhaar or full bank data.

## Source references checked during setup

- https://docs.expo.dev/guides/monorepos/ — native workspace support.
- https://ui.shadcn.com/docs/monorepo — web components and workspace layout.
- https://fastify.dev/docs/latest/Reference/TypeScript/ — typed API boundary.

These references inform implementation; they do not add business requirements or authorize vendor integrations.
