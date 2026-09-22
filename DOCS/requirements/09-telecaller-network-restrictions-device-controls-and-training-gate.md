# 9. Telecaller network restrictions, device controls and training gate

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0163–P0169.

**[P0164](../source/prd-verbatim.md#p0164)** 9.1 Office Wi-Fi-only baseline

**[P0165](../source/prd-verbatim.md#p0165)** All protected Telecaller app actions, including customer-list retrieval, call initiation and customer-detail viewing, must require a valid authenticated Telecaller and an approved office-network context unless an authorized WFH exception exists. Server-side access checks must not rely solely on a displayed Wi-Fi SSID, which can be imitated. Admin controls office-network allowlist and exception administration; the relevant Manager may grant/remove WFH access for their Telecallers. Record granting actor, scope, start/end (if used), revocation and access outcome. OPEN: approved office egress IPs, rules for dynamic IP/VPN and exception durations.

**[P0166](../source/prd-verbatim.md#p0166)** 9.2 No restriction on FOS

**[P0167](../source/prd-verbatim.md#p0167)** Advisor use is not subject to Telecaller office Wi-Fi restrictions. Do not accidentally block Advisor onboarding, lead creation, MIS views or payout requests offsite. Manager/Admin mobile workflows must follow their own access rules.

**[P0168](../source/prd-verbatim.md#p0168)** 9.3 Screenshot and recording restrictions

**[P0169](../source/prd-verbatim.md#p0169)** Protect sensitive app surfaces against ordinary screenshots/screen recordings using Android platform-provided secure-window facilities where available. Apply policy to customer lists, PAN views, Advisor identity/bank records and call/payout materials. Treat device cameras, external screen capture, rooted/compromised devices and accessibility-based extraction as residual risks; do not claim that software can prevent every possible photograph or exfiltration. OPEN: organization mobile-device management, rooted-device response, accessibility requirements and web download/print policy.
