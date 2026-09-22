# 25. Role-specific screen inventory and navigation

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0473–P0493.

**[P0474](../source/prd-verbatim.md#p0474)** 25.1 Shared screens

**[P0475](../source/prd-verbatim.md#p0475)** OTP login; role-aware access error; profile/support/logout; notifications with record deep-link; masked sensitive-data reveal only under permission; session-expired recovery; no-connection/retry and account-deactivated explanations. Each role returns to its own home after successful OTP and prerequisite checks.

**[P0476](../source/prd-verbatim.md#p0476)** 25.2 Telecaller Android screens

**[P0477](../source/prd-verbatim.md#p0477)** Screen | Primary information/actions | Exit/next

**[P0478](../source/prd-verbatim.md#p0478)** Training landing | Three modules, completion/checks, first-login deadline, current module, reason if deactivated | Active module or Manager reactivation message.

**[P0479](../source/prd-verbatim.md#p0479)** Module learning | Admin video, relevant learning material, progress | MCQ assessment after configured prerequisites.

**[P0480](../source/prd-verbatim.md#p0480)** MCQ result | Correctness/score, pass threshold and retry availability | Next module only after pass; queue after Module 3.

**[P0481](../source/prd-verbatim.md#p0481)** My Calling Queue | Assigned customers only; name, masked mobile, pincode/location, status, callbacks, Call/Open | Customer calling desk.

**[P0482](../source/prd-verbatim.md#p0482)** Customer / Calling Desk | Customer, sourceable cards, PDF, official ID, share link, in-app call, call state, remarks | Save outcome; follow-up queue or hidden history.

**[P0483](../source/prd-verbatim.md#p0483)** Card Detail in Call | Bank/card, pincode/channel availability, benefits/fees, PDF/link | Return to live call context without losing call controls.

**[P0484](../source/prd-verbatim.md#p0484)** Interaction Detail | All attempts, real recordings if available, shared material, operational remarks | Continue safe permitted follow-up.

**[P0485](../source/prd-verbatim.md#p0485)** Follow-ups | Due callback customers, latest operational note | Open customer; reschedule/complete within policy.

**[P0486](../source/prd-verbatim.md#p0486)** History / Hidden | Completed/declined calling records permitted by own assignment | View; no deletion or suppressed recontact.

**[P0487](../source/prd-verbatim.md#p0487)** Official ID | Company identity card and revocation/validity information | Share through authorized customer action.

**[P0488](../source/prd-verbatim.md#p0488)** 25.3 Manager mobile and web screens

**[P0489](../source/prd-verbatim.md#p0489)** Team overview; Create Telecaller; Telecaller profile/training/deactivation/reactivation; WFH exception administration; allocation and calls; customer operational history/recording access; Advisor team and lead-MIS details; team analytics; payout requests and approval detail; approval history; notifications; profile/logout. Mobile may use smaller cards/filters; web may use richer full-width data tables, but authorization and calculation must be consistent.

**[P0490](../source/prd-verbatim.md#p0490)** 25.4 Admin web screens

**[P0491](../source/prd-verbatim.md#p0491)** Executive dashboard; Managers/users/roles; Telecaller training content and test configuration; customer calling Excel import/mapping/result; allocation oversight; bank-specific pincode file import/mapping/result; card catalogue/editor/PDFs/application links; MIS Excel import/profile/preview/match/conflict/log; cross-role customers, operational leads and Advisor applications; organization analytics by source; telephony/WhatsApp delivery/recording oversight; network/WFH policy; Agent Code/hierarchy management; payout rules (once approved), payout approval and ledger; payment proofs; compliance/suppression; audit and exceptions; notifications/account. The one Admin owner must retain final business visibility, but sensitive-data read/export must be audited.

**[P0492](../source/prd-verbatim.md#p0492)** 25.5 Accounts web screens

**[P0493](../source/prd-verbatim.md#p0493)** Pending dual-approved payments; payout request detail with two approval records; masked payee-bank details; manual payment record form; proof upload/verification; paid ledger; payment exceptions; notifications/profile. No status-edit control exists here.
