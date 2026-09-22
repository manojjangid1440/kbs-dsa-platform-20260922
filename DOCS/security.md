# Security and privacy engineering

Authority: full PRD sections 3, 4, 9, 21, 23 and 24. This document is an implementation design, not legal advice or compliance sign-off.

## Authorization

Deny by default. Authenticate session on every protected request; then check active account, organization, action permission, ownership/team, lifecycle prerequisites and data purpose. Admin is organization-wide for business visibility, not an automatic unrestricted sensitive export. Manager record access requires stored reporting relationship. Advisor sees own leads/payouts. Telecaller sees own assigned calling records with training and office/WFH gate. Accounts sees necessary dual-approved requests/payee/proof, never customer queues or MIS edit capabilities.

Recheck record/file/deep-link scope after role, parent or session changes. Never use user-provided manager IDs as authority. Training access must remain available to an eligible untrained Telecaller without granting customer data. At deadline, server time denies access even if worker deactivation is delayed. Deny untrusted `X-Forwarded-For`; trusted proxy configuration and office CIDR checks belong at the API boundary.

## Identity and secrets

OTP-only. Cryptographic randomness; hashed OTP challenge or provider references; bounded expiry/attempts/resends; atomic one-time consume; phone/IP/device throttles; generic account-existence responses. Sessions use secure HttpOnly cookies on web with CSRF protection for cookie-authenticated mutations, platform secure storage on native, explicit revocation and rotation. Do not ship a fixed demo OTP or header-auth bypass. Provider adapters default unavailable.

No plaintext secrets or PII in logs. Validate environment at startup, keep server secrets out of NEXT_PUBLIC/EXPO_PUBLIC variables, and redact authorization/cookies/phone/PAN/bank/OTP fields. Encrypt transport and storage. Sensitive reveal/download needs narrow permission and audit. Database operator access is separate from business Admin access.

## Files and links

Validate size, MIME signature, extension, sheet/row/cell limits, decompressed ZIP bounds and malicious content. Never evaluate Excel formulas, external links or macros. Store immutable input under private object keys; malware scan; only clean assets become readable. Signed URL requires fresh role/object authorization and short expiry. Bank CAPTURE_LINK requires approved HTTPS hostname and purpose, not merely nonblank text. Do not fetch arbitrary user URL server-side. Preserve tracking/fragment for approved issuer links.

## Mobile and communications

Android secure-window protection on sensitive screens; verify on actual supported devices. No claim of preventing cameras/rooted extraction. Do not use SSID as security authority. No offline PII storage until an approved threat model; loss of network shows retry. Suppression precedes all call/share attempts and survives imports. Provider-signed events alone establish delivery/connection/recording existence. Live purchased-data calling and identity verification stay disabled until provider/compliance approvals.

## Abuse cases to test

Cross-team IDs, role escalation, duplicate payout races, forged headers/webhooks, replayed OTP/imports, late MIS correction, download after revocation, formula/ZIP bomb workbook, malicious PDF/link, double-tap call and lead submissions, notification leaking unauthorized record context. Record limitations in release gates.
