# 23. Error states, conflicts and recovery paths

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0451–P0461.

**[P0452](../source/prd-verbatim.md#p0452)** 23.1 Authentication and access

**[P0453](../source/prd-verbatim.md#p0453)** OTP incorrect/expired/rate-limited; disabled account; Telecaller training overdue; Telecaller outside approved office network without WFH permission; Manager/Advisor moved teams; denied document access; session invalidated. Show a clear role-appropriate message and a valid recovery action without revealing whether an unrelated phone number/customer exists.

**[P0454](../source/prd-verbatim.md#p0454)** 23.2 Training and queue

**[P0455](../source/prd-verbatim.md#p0455)** Video unavailable; submission interrupted; wrong/insufficient MCQ score; 72-hour deadline reached during assessment; Manager tries to reactivate a Telecaller outside their team; no eligible assignees on upload; duplicate customers; customer requests no further contact; previous record hidden then reappears in new purchased batch. Preserve progress/history; fail closed on access; do not erase suppression.

**[P0456](../source/prd-verbatim.md#p0456)** 23.3 Calling and sharing

**[P0457](../source/prd-verbatim.md#p0457)** Provider busy/offline, call never connected, callback required, recording denied/failed, WhatsApp not installed or customer hasn't consented, PDF missing, expired company ID, revoked bank link, no pincode mapping. The UI must report what is known and prevent a misleading 'Call completed', 'Recorded', 'PDF delivered' or 'Customer eligible' success badge.

**[P0458](../source/prd-verbatim.md#p0458)** 23.4 Lead initiation and MIS

**[P0459](../source/prd-verbatim.md#p0459)** Issuer website opens but no application reference returns; KBS lead submitted twice; customer corrects PAN; pincode maps to no issuer; MIS has unexpected header, conflicting duplicate bank reference, unknown status, an absent old lead, a stale earlier batch or #N/A activation. Preserve separate operational and bank status; quarantine conflicts; use 'Awaiting MIS Update' or 'Not reported' as appropriate; keep prior accepted status with its actual freshness label.

**[P0460](../source/prd-verbatim.md#p0460)** 23.5 Payout exceptions

**[P0461](../source/prd-verbatim.md#p0461)** Simultaneous claims on same eligible card; request awaiting one of two approvals; request rejected; Advisor directly under Admin (no assigned Manager); paid request with missing proof; external transfer amount differs; rate adjusted after request; bank MIS corrects a previously reported activation. Hold ambiguous payments for Admin/Accounts review; don't double-pay or silently reverse history. Any additional compensating-payment/clawback process requires a later, separately agreed scope.
