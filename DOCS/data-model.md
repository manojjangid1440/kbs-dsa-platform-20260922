# Data model and consistency contracts

Read full source section 22. PostgreSQL is the selected engineering persistence model because financial reservations, exact references and publication require transactional constraints. The initial migration is a core baseline, not the complete final schema.

## Identity and hierarchy

Organization has one active owner Admin. User contains immutable ID, organization, registered normalized phone, role and lifecycle. Public registration can create Advisor only. ReportingAssignment is effective-dated, stores parent/Agent Code, actor and reason; prior assignments are never overwritten. Lead and payout request capture attribution version. Any later reparenting policy must preserve historical audit and explicitly determine read scopes.

Session stores hashed token, subject, issued/expiry/revoked instants and device metadata under retention policy. OTPChallenge stores hashed code/provider challenge reference, expiry, attempts, consumed instant and throttling scope; no plaintext OTP persistence. WfhGrant stores Telecaller/Manager organization scope, active interval, revocation and reason. TrainingEnrollment stores first-login instant, original deadline, current deadline, curriculum version, module passes and reactivation history. Completion events use server time.

## Customer and catalogue

CallingCustomer has restricted PII reference, mobile lookup hash under approved normalization, six-character pincode, source batch/row and assignment history. Suppression is independent of queue lifecycle and applies across imports. Hidden does not mean deleted. OperationalInterest does not equal AdvisorLead.

Bank, Card, CardVersion, ApplicationLinkVersion, BenefitAsset and PincodeProfile are separate. Raw bank sourcing rows survive normalization. Card publication requires reviewed bank/channel/location crosswalk. Link URLs retain all original query/fragment content; approved host and validity are separately checked. No catalogue record guarantees credit eligibility.

AdvisorLead captures Advisor, card version, customer evidence/consent, employment enum, annual ITR income in integer paise, KBS reference, reporting snapshot and created time. OperationalEvent append-only records lead creation/link initiation/follow-up. No bank-state fields belong on editable lead payloads.

## MIS

MisProfileVersion: bank, schema/version, exact header mapping, identifiers, original vocabulary, snapshot/delta and blank policy, source timezone, ordering/correction policy, product crosswalk and approval evidence.

MisBatch: bank/profile, file hash/object reference, source reporting order, uploaded actor/time, review/publication state and counts. Uniqueness scoped by bank/profile/content hash; intentional reprocess is an explicit new reviewed action.

MisRow: batch, sheet, row number, original cell values/types, validation/match outcome, reason and accepted lead link when valid. Preserve the HDFC 36 original headers including misspellings. Row identity is never customer name.

BankReference: bank, reference kind, exact value, lead, reviewed evidence. Unique bank/kind/value; disagreeing reference aliases quarantine a row. BankSnapshot: lead, latest accepted source row, version, raw stage/decision/activation/KYC/remarks, last matched time. BankHistory: changed field with old/new raw values, row/batch, bank-reported date and imported time. Same-value confirmations update last matched time, not a transition. An omitted lead is untouched.

## Payout

PayoutRuleVersion defines approved bank/product event trigger, effective range, event uniqueness, rate in paise, hold/settlement criteria. No production seed amounts.

Entitlement identifies the bank-scoped unique payable event, Advisor/lead, accepted MIS evidence, rule version, amount and eligible/on-hold state. Multiple card events must not be collapsed by person. PayoutRequest snapshots Advisor, designated Manager, Admin, revision, currency/amount and state. RequestItem snapshots entitlement/evidence/rate/amount; original item history is retained.

ActiveReservation has entitlement primary key and request foreign key; an entitlement has at most one active claim. PaidEntitlement has entitlement primary key linked to one payment; submission checks and locks it before reserving. Approval has unique request/revision/role, actor, outcome/reason and time; Manager and Admin actors differ. ExternalPayment has unique request and transfer reference under approved reference scope, amount, paid time, Accounts actor and clean proof reference. It does not send funds.

Do not rely on CHECK constraints across unrelated tables to enforce business authorization. Application transaction and conditional database writes jointly enforce current state; integration tests must exercise races.

## Supporting records

FileAsset has purpose, size/type/hash, private key, scan state, access policy, retention and expiry. Call has provider request/event IDs, confirmed timestamps/status, recording asset and independent user outcome. ShareEvent has artifact/link version, handoff/provider result and confirmed delivery only if available. NotificationOutbox has unique event+recipient key, attempts, next retry and sent state. Audit is append-only actor/action/source/correlation/reason with safe metadata. Exception tracks unresolved corrections and owners without rewriting evidence.

## Required indexes and migrations

F01.01 adds `otp_subjects` as a durable lock row scoped by organization, keyed mobile hash and purpose, plus `otp_challenges` with digest, issued/expiry/consumed/revoked instants and bounded attempts. A partial unique index permits at most one unconsumed, unrevoked challenge per scope; resend revokes its predecessor even if expired. Subject lock rows contain no raw phone or code. Retention and key rotation need an approved policy before activation. Database transactions pin a single connection and roll back on any continuation failure. Migration tests use isolated databases/schemas, never production data.

Index organization and record owner on scoped lists; bank/reference uniqueness; bank/batch hash; batch/row; lead/history time; owner+createdAt pagination; due followups; request status+submittedAt; outbox nextAttemptAt. Partial unique active Admin per organization. Foreign keys preserve links to immutable evidence. New migrations are forward-only; back up and rehearse restoration before production. No seed with real PII or assumed commercial rates.
