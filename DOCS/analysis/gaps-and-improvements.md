# Deep analysis and engineering improvements

## Conclusion

The product is coherent if three independent records remain separate: KBS operational activity, bank-reported MIS evidence, and KBS payment accounting. The most serious risk is financial or customer-facing certainty being inferred from incomplete bank data. Implement shared domain rules and transactional persistence before operational screens. A polished UI cannot compensate for incorrect reference matching or duplicate payouts.

The supplied PRD already calls out important policy gaps. This analysis retains those gaps and adds technical treatment; it does not convert proposed decisions into approved commercial or legal rules.

## Requirement conflicts already resolved by the source

1. shadcn/ui supersedes Tamagui. Share design tokens with native components, never DOM implementations.
2. MIS-only bank facts supersede bank/aggregator status APIs and a fixed application timeline.
3. A saved lead and a shared issuer link are operational events, not bank submission evidence.
4. Telecaller training is 72 elapsed hours from first successful login, not three dates on a calendar.
5. Manager reactivation resumes at the first uncleared module and retains passes.
6. Android first; iOS and multilingual UI are excluded.
7. Telecaller interest records are salary-based operational attribution and cannot generate Advisor payout.
8. Payout requires separate Manager and Admin approvals, including Admin-direct Advisors.

## Critical missing inputs and safe treatment

| ID | Gap and consequence | Required resolution | Safe behavior until resolved |
| --- | --- | --- | --- |
| G01 | Issuer link may never return an application identifier; MIS cannot deterministically join | Bank operations demonstrate each issuer reference capture and uniqueness contract | Save operational lead; show Awaiting MIS; quarantine unlinked rows |
| G02 | Two active-looking HDFC values have undefined commercial meaning | Finance signs bank/product trigger, rate, event key and effective dates | No automatic payout entitlement |
| G03 | Admin-direct Advisor lacks required Manager approver | Owner designates independent Manager route | Request cannot progress to payable |
| G04 | Blank cells and older files may overwrite valid facts incorrectly | Bank profile declares snapshot/delta, blank rules, ordering and correction authority | Reject unapproved profile; hold stale/conflicting rows |
| G05 | Purchased calling data lacks proven permitted-use evidence | Compliance-approved source attestations, suppression and communication SOP | Import review allowed; calling allocation blocked |
| G06 | Aadhaar/PAN/bank verification providers and lawful mode unspecified | Authorized provider contract and approved data-minimization flow | Verification unavailable; no fake verified state |
| G07 | Telephony recording feasibility and total cost unknown | Provider proof of concept on target Android devices | Adapter boundary; live calls disabled |
| G08 | Assessment pass formula, attempts and reactivation window unknown | Training owner configures versioned policy | Gate assessment/reactivation without approved configuration |
| G09 | Customer duplicate and cross-channel attribution policy unknown | Operations defines exact identity and collision/reassignment rules | Review ambiguous records; never merge by name |
| G10 | Agent Code changes could move historical financial ownership | Effective-dated attribution and approval policy | Preserve original snapshots; no silent retroactive movement |
| G11 | Rejection/cancellation might strand or prematurely release entitlement | Finance approves terminal-state and release SOP | Hold ambiguous claim; no speculative automatic release |
| G12 | Device/IP/WFH policy incomplete | IT provides trusted proxy topology, office egress, expiry/revocation policy | Protected Telecaller calls denied outside verified context |
| G13 | Production catalogue and mapping incomplete | Bank-specific products, PDFs, URL versions, sourcing semantics approved | No invented card availability or fees |
| G14 | Source workbooks not attached to this implementation task | Obtain exact three sample workbook bytes | Header-level contracts only; real workbook QA pending |

## Additional engineering gaps discovered

| ID | Recommendation | Why and implementation boundary |
| --- | --- | --- |
| E01 | Version import profiles and hash immutable bytes | Same bytes under same bank/profile replay idempotently; changed mapping requires explicit reviewed reprocess |
| E02 | Explicit bank reporting order separate from upload order | Late older workbook cannot overwrite newer facts just because uploaded last; correction requires authorized reason |
| E03 | Stage import then publish in one transaction/version | Dashboards and entitlement calculation must never see half a batch; job retries resume safely |
| E04 | Unique issuer reference aliases with conflict detection | Application number and reference may disagree; require both to resolve consistently, not first match wins |
| E05 | Transactional outbox with unique event keys | Commit bank facts and notification intent together; retry without duplicated alerts |
| E06 | Database row locks and active-reservation uniqueness | Pure UI validation is insufficient against two devices claiming the same card |
| E07 | Revalidate entitlement immediately before approval/payment | A correction while a claim is reserved must put it on hold; retain paid history and flag exceptions |
| E08 | Immutable money snapshots in integer paise | Avoid floating-point amounts; preserve rule/rate used at submission; no silent repricing |
| E09 | Bind approval to request revision and distinct actor | Changed card list, bank destination or amount cannot inherit stale approvals |
| E10 | Normalize transfer references only by approved method | Preserve raw reference; uniqueness scope and correction route must be defined without over-rejecting legitimate bank references |
| E11 | Verify provider webhook signatures and replay IDs | Client events cannot prove connected call, delivered message or retrievable recording |
| E12 | Treat profile mappings and imported links as untrusted input | Reject formulas/macros/oversized ZIP expansion; never execute cells; validate HTTPS host before opening bank CAPTURE_LINK |
| E13 | Design document lifecycle as pending scan → clean → permitted | Proof, cheque and recording URLs require authorization at read time and short expiry; no public buckets |
| E14 | Persist suppressions independently of customer queues | Reimport, reassignment and hide/unhide cannot reactivate forbidden contact |
| E15 | Bound OTP attempts across phone, IP and device, with atomic consume | Hash codes, expire them, avoid account enumeration, prevent resend/verify replay; production provider remains unconfigured |
| E16 | Use trusted transport IP, not SSID or arbitrary forwarding header | IP policy enforcement depends on known reverse proxy chain; WFH revocation invalidates cached permission |
| E17 | Do not persist customer PII in mobile offline caches initially | Offline sensitive writes introduce stale access and duplicate-operation risks; show reconnect flow, preserve only safe UI state |
| E18 | Separate latest bank snapshot from bank change history | Same-value confirmation updates freshness but not a fake transition; absent lead gets no freshness update |
| E19 | UTC instants plus source timezone/raw date and Asia/Kolkata display | Resolve Excel serials, date ambiguity and time-only fields explicitly in profile; never infer timezone from filename |
| E20 | Version training curriculum at enrollment | Admin edits cannot silently invalidate completed modules; enrollment migration requires deliberate policy |
| E21 | Add reconciliation of outbox, import counts and payout ledger | Operational repair requires reproducible links from raw file to row to snapshot to entitlement to payment |
| E22 | Keyset pagination and stable read version for large reports | No unbounded customer exports; source-time filters and population must remain explicit |
| E23 | Separate business visibility from sensitive-field privilege | Admin organization visibility does not automatically authorize arbitrary full PAN/account export |
| E24 | Bootstrap single Admin through a controlled provisioning command | Never public Admin signup or role chosen by request body; manager/accounts creation waits for policy |
| E25 | Keep production readiness machine-readable | Missing provider/policy must fail startup or dependent operation; health does not imply functional readiness |
| E26 | Protect declared event identity across reissued/replaced cards | Do not assume one lead equals one lifetime commission event; approved bank event identity needed |

## Better sequencing

Build pure contracts, policy gates, audit envelopes and domain invariants first. Then migrations, real OTP/session and object authorization, private uploads and job/outbox infrastructure. Only then implement training/queue, catalogue/onboarding, lead creation, MIS staging, financial ledger, provider calling and dashboards. UI design tokens and role shells can proceed after shared core, but dashboard numbers remain synthetic until wired to authorized projections.

The monorepo is a modular application, not a fleet of microservices. One API and one worker are sufficient initially; shared packages avoid duplicated rules across Android and web. Split services only when measured scaling/ownership needs justify it.

## What the analysis cannot establish

No production capacity, vendor pricing, legal approval, commercial activation interpretation, real workbook compatibility, working Android APK or existing code quality is inferred. Vendor evaluation is a later dated procurement task. No existing repository is used.
