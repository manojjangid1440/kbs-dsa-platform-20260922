# 4. Global authentication and account lifecycle

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0090–P0100.

**[P0091](../source/prd-verbatim.md#p0091)** 4.1 OTP-only authentication

**[P0092](../source/prd-verbatim.md#p0092)** Every role logs in by registered mobile number plus OTP; do not introduce password/email login as an alternative. Advisor uses the same mobile/OTP flow to begin signup. Login validates role, activation, training gate, network restrictions (where applicable), verification/onboarding completion and session policy before presenting the role's home screen. All OTP codes must expire, be rate-limited and never be stored or shown in plaintext after verification. Lost/changed phone ownership and number reassignment require an Admin-reviewed recovery process; OPEN: specific recovery policy and OTP provider contract.

**[P0093](../source/prd-verbatim.md#p0093)** 4.2 Role-dependent first login

**[P0094](../source/prd-verbatim.md#p0094)** •  Telecaller: OTP -> mandatory training or failed/deactivated explanation; no calling queue before successful training.

**[P0095](../source/prd-verbatim.md#p0095)** •  Advisor: OTP -> personal details, identity verification, payout-bank details and optional Agent Code -> available Advisor home when allowed by onboarding policy.

**[P0096](../source/prd-verbatim.md#p0096)** •  Manager: OTP -> team workspace on mobile or web.

**[P0097](../source/prd-verbatim.md#p0097)** •  Admin: OTP -> organization-wide dashboard and controls.

**[P0098](../source/prd-verbatim.md#p0098)** •  Accounts: OTP -> payout queue and payment records.

**[P0099](../source/prd-verbatim.md#p0099)** 4.3 User lifecycle

**[P0100](../source/prd-verbatim.md#p0100)** Maintain account creation, active, blocked/deactivated and reactivated events with who/when/why. Preserve assignment history, completed training, activity and payout records when status changes. Do not let deactivation erase existing MIS or audit history. OPEN: exact Manager/Advisor/Accounts suspension and recovery authority, account-retention period and concurrent-session rules.
