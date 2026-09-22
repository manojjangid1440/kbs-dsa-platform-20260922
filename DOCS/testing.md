# Verification strategy

The entire original matrix is in [testing/source-acceptance.md](testing/source-acceptance.md). A retained requirement is not automatically tested. Each task must link actual test evidence or remain pending.

## Core test priorities

- Unknown/blank/#N/A vs reported value; approval and activation independent; new raw vocabulary preserved.
- Exact issuer-reference matching including leading zeros, conflicting aliases, ambiguous duplicates, wrong bank and no identifiers.
- MIS same-file replay, same-value confirmation, absent lead, snapshot vs delta blank rules and stale-source quarantine.
- First-login 72-hour deadline, exact boundary, sequential modules, preservation across reactivation and wrong-team denial.
- Server authorization including inactive/cross-org/other-owner, Accounts scope, Telecaller training/network/WFH expiry, Advisor offsite access.
- Payout no policy/no activation/no Manager route; amount in paise; request ownership; distinct role approvals; proof and full amount; duplicate reservation/payment.
- Strict API schemas reject injected bank fields and unsupported enum values; protected endpoints deny unauthenticated access; readiness does not pretend missing providers exist.

## Persistence and integration gates

Run schema against a PostgreSQL-compatible engine for syntax/constraint smoke tests, but do not call that a real PostgreSQL concurrent-transaction test. Before financial release use two independent real PostgreSQL connections with a barrier and verify exactly one successful reservation/settlement. Test rollback after each write boundary, process restart, worker crash before/after commit, outbox retries and bank correction during approval.

Full workbook fixtures must include all three actual source files, nine pincode sheet profiles and 36 HDFC headings; malicious/oversized/corrupt/formula files; blank/reference/date conflicts and unknown values. They are unavailable in this task, so initial schema fixture tests are insufficient for import sign-off.

## UI and device gates

Web production build plus browser smoke: keyboard/focus, narrow viewport, long remarks, mixed decision/activation, upload errors, forbidden deep link. Android APK build/device tests: OTP keyboard, back stack/draft, secure windows, call/share handoff, network change and accessibility. Typecheck/Metro export is not Android device validation.

## Evidence format

Record date, command, result, affected task/requirement and limitations in memory/STATUS.md and session log. No unexecuted test marked passing. Tests for financial/security rules are mandatory; avoid superficial tests that only assert static UI text or mirror implementation.
