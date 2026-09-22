# 22. Conceptual data model and ownership (requirements, not database design)

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0432–P0450.

**[P0433](../source/prd-verbatim.md#p0433)** Business entity | Minimum relationships/data | Authoritative input

**[P0434](../source/prd-verbatim.md#p0434)** User / Role | Mobile, role, enabled state, authentication/security history | KBS account administration / signup.

**[P0435](../source/prd-verbatim.md#p0435)** Reporting assignment | Advisor Agent Code, Manager/Admin parent, effective date/history | Approved KBS hierarchy policy.

**[P0436](../source/prd-verbatim.md#p0436)** Training enrollment | Telecaller, first login, original deadline, modules, scores/pass history, reactivation | KBS training activity and Admin content.

**[P0437](../source/prd-verbatim.md#p0437)** Customer calling record | Source row/batch, customer name/mobile/pincode/PAN-restricted, Telecaller assignee, suppressed/hidden status | Admin-uploaded customer list + KBS allocation.

**[P0438](../source/prd-verbatim.md#p0438)** Card / product / link | Bank, product code, published description, pincode/channel sourcing, fees, PDF, application URL/version | Admin card catalogue and bank pincode uploads.

**[P0439](../source/prd-verbatim.md#p0439)** Call / operational activity | Telecaller, customer, call/provider ID, actual call result, recording, remarks, share actions | In-app activity + telephony/WhatsApp provider results.

**[P0440](../source/prd-verbatim.md#p0440)** Advisor lead | Advisor, customer consent/details, card, KBS lead ID, own application-link activity, reporting parent snapshot | KBS Advisor flow.

**[P0441](../source/prd-verbatim.md#p0441)** Bank application linkage | Bank, confirmed issuer application number/reference, KBS lead, match verification | Reliable bank reference and approved linkage.

**[P0442](../source/prd-verbatim.md#p0442)** Bank MIS batch / row | Bank/profile, immutable file, uploader/times, original row/fields, match/conflict outcome | Admin-uploaded bank MIS.

**[P0443](../source/prd-verbatim.md#p0443)** Reported bank status snapshot | Current stage, final decision, KYC substatuses, activation, bank reasons, source row and last matched batch | Only accepted matching MIS row .

**[P0444](../source/prd-verbatim.md#p0444)** MIS change history | Old/new raw field values, source batch/time, bank event date if present | Accepted MIS update processing.

**[P0445](../source/prd-verbatim.md#p0445)** Payout entitlement | Advisor/lead/card payable event, approved bank-specific trigger, rate version, eligibility and reservation/paid history | MIS evidence + approved KBS commercial policy.

**[P0446](../source/prd-verbatim.md#p0446)** Payout request/approvals | Selected entitlements, amount, Manager and Admin decisions, audit | KBS dual-approval workflow.

**[P0447](../source/prd-verbatim.md#p0447)** External payment | Accounts operator, transfer reference/date/amount, proof, request linkage | Accounts-recorded external payment evidence.

**[P0448](../source/prd-verbatim.md#p0448)** Notification / audit | Intended recipient/record/event, event source, read/time, actor/change reason | KBS events with MIS source reference where appropriate.

**[P0449](../source/prd-verbatim.md#p0449)** 22.1 Separation constraints

**[P0450](../source/prd-verbatim.md#p0450)** Customer calling records, Advisor leads, bank MIS rows and payout entitlements are separate entities even when they mention the same human/card. No accidental one-to-one assumption: a person may have multiple bank applications, a bank reference must match an issuer-specific application, and an Advisor may have multiple card entitlements. Reporting parent changes and card/payment settlements need effective-dated history. File versions, status snapshots and payment snapshots must be reproducible from audit evidence without exposing raw PAN/Aadhaar in normal UI.
