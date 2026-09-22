# Release gates

Current release classification: development foundation. The following gates must all pass before production features become available.

| Gate | Required evidence | Current baseline |
| --- | --- | --- |
| Reference linkage | Verified per-bank issuer flow, exact unique reference and reviewed conflicts | OPEN |
| MIS profile | Snapshot/delta, blank/order/timezone, correction, all workbook fixtures and consistent publish tests | OPEN |
| Finance | Signed activation/rate/event rules, independent direct-Admin approver, release/cancellation policy | OPEN |
| Financial integrity | Real PostgreSQL concurrent reserve/approve/pay tests, proof and reconciliation | OPEN |
| Communications | Approved source/consent/suppression SOP, provider and recording/device PoC | OPEN |
| Identity | Lawful provider/mode/consent/retention approved | OPEN |
| Authentication | Real OTP/session, abuse limits, revocation/recovery, server/object scope tests | OPEN |
| Assets | Private storage, scan, authorized access and retention | OPEN |
| Training | Approved score/retry/video/reactivation settings and real deadline jobs | OPEN |
| UI and mobile | Full role journeys, web accessibility, Android APK/device tests | OPEN |
| Operations | Capacity thresholds, observability, incident owner, backup/restore and secrets | OPEN |

A foundation build may pass while these gates remain open. Production cannot be enabled merely by changing an environment variable that bypasses missing policies.
