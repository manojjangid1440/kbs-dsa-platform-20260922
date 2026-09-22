# API contracts

Status: target contract. Only endpoints listed as implemented in memory/STATUS.md exist. Base prefix `/v1`. Strict JSON schema validation; reject unknown writable fields, especially bank state injected into lead creation. Read roles are taken from verified server session, never `X-Role`, query parameters or client user IDs.

## Transport

Success contains resource data; lists contain `items`, opaque `nextCursor`, and source/read-version metadata where required. Error shape `{error:{code,message,requestId}}`; no stack/PII. Use 400 invalid input, 401 missing/expired session, 403 denied scope, 404 absent/not-visible entity, 409 revision/idempotency/reservation conflict, 422 business-policy violation, 429 throttled and 503 provider/policy unconfigured. Object existence must not leak across scopes.

Mutation idempotency uses `Idempotency-Key`, actor+route scope and canonical payload hash. Same key/same payload returns original result; same key/different payload is 409. Store response/outcome with mutation atomically. Requests use revision/If-Match for editable resources and approval snapshots.

| Endpoint | Actor and contract | Required behavior |
| --- | --- | --- |
| POST /auth/otp/request | Registered role or Advisor signup; mobile, purpose | Generic acknowledgment; phone/IP/device throttle; provider failure truthful |
| POST /auth/otp/verify | challenge ID and code | Expiry/attempt/consume atomically; server role; start Telecaller first-login once |
| POST /auth/logout | Current session | Revoke token and clear session; no client-only logout |
| GET /me | Any authenticated user | Masked self and next prerequisite; no raw verification data |
| POST /telecallers | Manager | name/mobile; create assigned user and ID workflow; no Admin shortcut |
| GET /training/me | Telecaller | Curriculum, passes, first deadline and current module |
| POST /training/:module/assessment | Own enrollment | Server marks answers; no submitted score trusted; deadline/order check |
| POST /telecallers/:id/reactivate | Assigned Manager | reason and approved policy; preserve passes |
| PUT /telecallers/:id/wfh | Assigned Manager / authorized Admin | audited validity/revocation; deny outside scope |
| POST /imports/customer/preview | Admin | private clean file ID; mapping/version/consent evidence |
| POST /imports/customer/:id/confirm | Admin | exact preview revision; validation/assignment and totals |
| GET /calling-customers | Telecaller own; Manager team; Admin org | network/training gate at server; cursor filters; masked fields |
| POST /calling-customers/:id/calls | Assigned Telecaller | suppression/consent/network gate; idempotent provider request |
| POST /calls/:id/outcomes | Authorized Telecaller | operational outcome/notes/followup only |
| POST /customers/:id/shares | Assigned user | PDF/ID/link version and consent; delivery not invented |
| POST /imports/pincodes/preview, confirm | Admin | bank-specific semantics, profile and raw rows |
| GET /cards | Permitted registered role | published content; pincode/sourceability distinct from customer eligibility |
| POST /advisors/onboarding | Advisor self | approved identity evidence reference, bank/cheque, optional Agent Code |
| PATCH /me/agent-code | Advisor self | code and effective-policy version; historical snapshots retained |
| POST /leads | Verified Advisor | customer name/mobile, PAN evidence, card/version, pincode, employment, ITR income, consents; strict schema |
| POST /leads/:id/link-events | Owning Advisor | approved URL/version; initiation outcome only |
| GET /leads, /leads/:id | Advisor own; Manager team; Admin org | distinct bank facts, provenance, operational history and freshness |
| POST /imports/mis/preview | Admin | bank/profile/file; header and row validation; exception counts |
| POST /imports/mis/:id/confirm | Admin | reviewed revision; async job ID, then consistent publication |
| POST /mis-rows/:id/resolve | Admin with review permission | verified reference evidence/reason; no free-form status editing |
| GET /imports/:id | Admin | stage, consistent totals, row exceptions and accepted source |
| GET /payouts/entitlements | Advisor own; permitted finance scope | itemized evidence/rate/availability; no Telecaller commission |
| POST /payouts/requests | Advisor | entitlement IDs; transaction locks and reservation; server amount |
| POST /payouts/:id/approvals | Assigned Manager or Admin | own role only, request revision, decision/reason |
| GET /payments/ready | Accounts | both approvals, no hold, current evidence, verified payee |
| POST /payments | Accounts | request ID/revision, exact full amount, transfer reference/date, clean proof; external record only |
| GET /files/:id/access | Authorized purpose/scope | short-lived private access after clean scan and audit |
| GET /notifications | Scoped recipient | source facts, unread and authorized deep links |
| GET /reports/:type | Manager team/Admin org/Accounts finance | named metric, date basis, population, latest accepted read version |

## No endpoints by design

No PATCH bank stage/decision/activation; no password login; no generic client role switch; no automatic disbursement; no public recording/cheque/MIS download; no application-status provider callback. Provider callbacks are restricted to OTP/identity/telephony/WhatsApp as approved, signature checked and replay resistant.

## Dates, fields and links

Use ISO-8601 instants for API times and separate raw bank dates with source timezone. Monetary amounts are integer paise; INR is explicit. Pincodes and issuer references stay strings. Raw blank and #N/A stay preserved in evidence but have a Not reported presentation. Every bank field includes source row/batch, accepted time and raw value; operational history cannot supply that provenance.
