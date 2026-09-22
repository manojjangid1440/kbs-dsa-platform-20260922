# 28. Open decisions, dependency owners and launch gates

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0582–P0606.

**[P0583](../source/prd-verbatim.md#p0583)** The following items are not missing from the PRD; they are genuinely unspecified business or contract facts in the supplied source. Engineering must not fill them with undocumented guesses. Owners are proposed functional owners, not named individuals.

**[P0584](../source/prd-verbatim.md#p0584)** Priority | Decision / why it matters | Proposed owner / required resolution

**[P0585](../source/prd-verbatim.md#p0585)** P0 | Exact identifier returned by each issuer/link so a KBS Advisor lead can match MIS without name/mobile guessing. | Bank partnerships + Admin: test issuer journeys and approve reference linkage per bank.

**[P0586](../source/prd-verbatim.md#p0586)** P0 | Which bank MIS field/value proves a commission-eligible  activation event  for each bank; HDFC  V + ACTIVE  vs  TXN ACTIVE - Rs 100  vs payout settlement criteria. | Finance + bank partnerships: signed per-bank payout rule/version and examples.

**[P0587](../source/prd-verbatim.md#p0587)** P0 | Per-bank payout rates, rate effective dates, payout eligibility hold, duplicate/reissued card event identity and rate-change treatment. | Owner/Admin + Finance: approved commercial rate schedule and card-event key.

**[P0588](../source/prd-verbatim.md#p0588)** P0 | Both approvals for Advisor with  Admin as direct parent ; no Manager is naturally assigned. | Owner/Admin: designate independent Manager approver and auditable route.

**[P0589](../source/prd-verbatim.md#p0589)** P0 | Eligibility for purchased third-party customer list, DND/suppression checks, lawful consent, call timing, record retention/recording disclosure and WhatsApp use. | Compliance + telephony/communications provider: written SOP before activation.

**[P0590](../source/prd-verbatim.md#p0590)** P0 | Permissible Aadhaar verification mode and vendor/entity authorization; PAN and payout-bank verification mode. | Compliance + onboarding: provider agreements, consent text, data scope/retention.

**[P0591](../source/prd-verbatim.md#p0591)** P0 | Telephony provider feasibility of in-app originating/bridging, automatic legal recording, caller ID, recordings retrieval and full current pricing. | Engineering + operations: proof of concept and vendor quote.

**[P0592](../source/prd-verbatim.md#p0592)** P0 | Bank MIS file semantics: full snapshot versus delta, blank cell meaning, conflicting row ordering, bank timezone and corrections. | Bank operations + Admin: one approved profile per bank.

**[P0593](../source/prd-verbatim.md#p0593)** P1 | Admin-card catalogue source: actual issuer/card product inventory, benefits PDFs, accurate fees, active links and product-code-to-pincode mapping. | Product/Bank operations: approved canonical card entries.

**[P0594](../source/prd-verbatim.md#p0594)** P1 | Agent Code points to Manager or another person; effect of later code change on old vs future leads, reserved/paid payouts and approvals. | Owner/Admin + Finance: effective-dated attribution policy.

**[P0595](../source/prd-verbatim.md#p0595)** P1 | Telecaller training passing formula, video completion, retry limits and exact new deadline after Manager reactivation. | Operations + training Admin: approved configuration.

**[P0596](../source/prd-verbatim.md#p0596)** P1 | Calling-record dedup key, allocation policy, reassignment and lead-collision rules with an Advisor on same customer. | Admin/Operations: explicit record ownership and reporting rules.

**[P0597](../source/prd-verbatim.md#p0597)** P1 | Official Telecaller ID card fields/verification, expiration/revocation and customer share rules. | Admin + compliance: approved card template.

**[P0598](../source/prd-verbatim.md#p0598)** P1 | WFH network policy: authorized office egress IPs, dynamic IP/VPN, exception duration, device security and offline handling. | IT/security + Admin: enforceable access policy.

**[P0599](../source/prd-verbatim.md#p0599)** P1 | Payment rejection/cancellation/reservation release, partial payments, payout disputes and correction workflow (without building clawbacks). | Finance + Admin: approved finite-state payment SOP.

**[P0600](../source/prd-verbatim.md#p0600)** P1 | Current user load, number of records/day, calls/month, file sizes, document/recording retention, report refresh and response thresholds. | Owner/Admin + operations/engineering: capacity and acceptance targets.

**[P0601](../source/prd-verbatim.md#p0601)** P2 | Exact Manager/Accounts creation and general account-disable permissions; optional Admin/Accounts mobile access. | Owner/Admin: access matrix final sign-off.

**[P0602](../source/prd-verbatim.md#p0602)** P2 | Optional customer-facing follow-up messaging, notification channels, escalation/quiet hours and export/print policy. | Product/Compliance: approved channel/permissions policy.

**[P0603](../source/prd-verbatim.md#p0603)** 28.1 Vendor selection and cost analysis workstream (bounded scope)

**[P0604](../source/prd-verbatim.md#p0604)** The original request asks for reliable low-cost third-party integrations. Compare only support services actually needed: OTP (unit price, resend and fraud controls), lawful Aadhaar/PAN/bank verification (per check, retries and regulatory authorization), telephony (connected vs attempted minute billing, number rental, call-bridging, recording/storage/retrieval, SLA, recordings consent) and WhatsApp (app hand-off vs Business Platform media/template/session pricing, document hosting, template approval and delivery reports). Collect dated, written India-market vendor quotes and forecast cost using KBS's actual monthly user/verification/call/message volumes. No unverified price or vendor is mandated in this PRD. Do not add an aggregator/bank activation-status API: MIS remains the bank-status source of truth.

**[P0605](../source/prd-verbatim.md#p0605)** 28.2 Release gates

**[P0606](../source/prd-verbatim.md#p0606)** No production calling until consent/DND/recording/office-network safeguards and approved provider are operational. No live Aadhaar flow until lawful mode and processing agreements are approved. No automatic Advisor payout eligibility until bank-specific MIS trigger, reference matching, approved commercial rate and Admin-direct dual-approval routing are configured and tested. All three sample workbook schemas must pass import QA before the upload workflow is considered validated; live bank files may require additional per-bank profiles.
