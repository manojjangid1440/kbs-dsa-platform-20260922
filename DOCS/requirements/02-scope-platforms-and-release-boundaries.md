# 2. Scope, platforms and release boundaries

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0069–P0077.

**[P0070](../source/prd-verbatim.md#p0070)** 2.1 In scope

**[P0071](../source/prd-verbatim.md#p0071)** Android APK built with React Native; English UI; responsive web administration/role screens; OTP login; Admin, Manager, Telecaller, Advisor and Accounts roles; Advisor public registration and verified onboarding; Telecaller Manager-only creation and 72-hour module training; Admin customer-list import and automated assignment; bank-specific pincode import and card catalogue; in-app business calling and provider-based call recordings; WhatsApp card PDF, company ID and application-link sharing; operational calling records; Advisor lead creation and link initiation; imported MIS-based status and remarks; per-role dashboards, filtering, recording access and notifications; dual-approval manual payouts; payment proof and auditable histories; security and access controls.

**[P0072](../source/prd-verbatim.md#p0072)** 2.2 Out of scope for initial release

**[P0073](../source/prd-verbatim.md#p0073)** Personal loans, home loans, LAP or other financial products; iOS app; multi-language UI; automatic bank-status or activation checks via bank/aggregator APIs; automatic card status inferred from visits to bank websites; in-app money transfer; targets, leaderboards, incentives, upline commissions, TDS/GST statements and clawback modules. A provider used for OTP, compliant identity/PAN/bank verification, business telephony or authorized WhatsApp delivery is not a bank-status integration and may still be needed.

**[P0074](../source/prd-verbatim.md#p0074)** 2.3 Channel availability

**[P0075](../source/prd-verbatim.md#p0075)** •  Android mobile: Telecaller, Advisor and Manager journeys; Admin/Accounts mobile functions only if specifically provided and appropriately permissioned, otherwise their primary workspace is web. The original requirement explicitly grants Managers both mobile and web.

**[P0076](../source/prd-verbatim.md#p0076)** •  Web: Admin control, Manager management/reporting and Accounts payout workflow; other role web access only where deliberately permitted.

**[P0077](../source/prd-verbatim.md#p0077)** •  Bank website: the customer completes the external issuer application through the Admin-configured bank link. KBS does not claim to own the bank's forms, card decision or final application status.
