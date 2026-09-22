# Small feature work packages

Read full linked requirements before each task. F00 is implemented as a verified initial core. F01–F21 remain PLANNED end-to-end; shared primitives are listed in memory/STATUS.md. Shared-core progress is tracked separately in [foundation-tasks.md](foundation-tasks.md). Complete each numbered task in a separate commit; split further when needed.

| Feature | Dependencies | Tasks |
| --- | --- | --- |
| [F00 Repository and shared core](F00.md) | No dependencies | 5 |
| [F01 OTP sessions and account lifecycle](F01.md) | F00; approved OTP/session/recovery policy | 4 |
| [F02 Authorization hierarchy and sensitive access](F02.md) | F01; attribution and sensitive reveal policy | 4 |
| [F03 Telecaller creation and official identity](F03.md) | F01 F02; approved ID template/revocation | 3 |
| [F04 Training curriculum and 72 hour enrollment](F04.md) | F03; approved assessment configuration | 4 |
| [F05 Private files audit and job infrastructure](F05.md) | F00 F02; object storage and retention policies | 4 |
| [F06 Customer Excel review and deduplication](F06.md) | F05; exact source workbook and consent/dedup policy | 4 |
| [F07 Assignment queues and durable suppression](F07.md) | F04 F06; allocation/reassignment policy | 4 |
| [F08 Bank pincode profiles and catalogue](F08.md) | F05; nine workbook fixtures and approved sourcing semantics | 4 |
| [F09 Calling provider and recording evidence](F09.md) | F02 F05 F07 F08; compliant telephony provider | 4 |
| [F10 WhatsApp sharing and call outcomes](F10.md) | F08 F09; approved channel consent/templates | 4 |
| [F11 Advisor onboarding and Agent Code](F11.md) | F01 F02 F05; lawful verification and attribution policies | 4 |
| [F12 Advisor lead and issuer link journey](F12.md) | F08 F11; PAN and issuer reference capture policy | 4 |
| [F13 MIS profile parsing and masked preview](F13.md) | F05 F12; source workbooks/profile semantics | 4 |
| [F14 MIS exact match publish and correction](F14.md) | F13; exact reference ordering/correction policy | 4 |
| [F15 Lead views bank remarks and pending actions](F15.md) | F12 F14 | 4 |
| [F16 Notifications and deep-link routing](F16.md) | F02 F05; approved push channel policy | 4 |
| [F17 MIS based entitlement and rate ledger](F17.md) | F14; signed bank trigger/rate/event/hold policy | 4 |
| [F18 Payout reservation and dual approval](F18.md) | F17; independent approver and rejection/cancel policy | 4 |
| [F19 Accounts external settlement and proof](F19.md) | F05 F18; approved payment correction/reference policy | 4 |
| [F20 Role dashboards and reconciliation](F20.md) | F07 F09 F14 F19 | 4 |
| [F21 Android security accessibility and release](F21.md) | Full role journeys; device and signing environment | 4 |
