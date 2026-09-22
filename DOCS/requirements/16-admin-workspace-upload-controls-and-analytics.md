# 16. Admin workspace, upload controls and analytics

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0348–P0372.

**[P0349](../source/prd-verbatim.md#p0349)** 16.1 Organization-wide operations

**[P0350](../source/prd-verbatim.md#p0350)** One Admin/owner oversees all Managers, Telecallers, Advisors and Accounts users; training content/MCQs/thresholds; calling list and auto-assignment; office network/WFH controls; bank pincode mapping and card catalogue; official ID design; benefit PDFs and links; MIS files and import exceptions; operational call data/recordings; leads and real MIS status; payout requests, approvals, payment proofs, reconciliation and audit records. Expose upload logs, unmatched MIS cases, prohibited contact records and configuration versions.

**[P0351](../source/prd-verbatim.md#p0351)** 16.2 Admin dashboard collection

**[P0352](../source/prd-verbatim.md#p0352)** Dashboard | Required tiles, charts and drill-down

**[P0353](../source/prd-verbatim.md#p0353)** Executive overview | New operational leads, bank-matched cases, bank decision distribution, confirmed activation categories, eligible-card counts, payouts requested/approved/paid; date range and latest per-bank MIS freshness visible.

**[P0354](../source/prd-verbatim.md#p0354)** Telecaller performance | Upload and allocation batches; total/connected/failed/no-answer calls; unique contacted customers; connected-to-interest and follow-up outcomes; links/PDF/ID shared; recordings available; team/individual drill-down.

**[P0355](../source/prd-verbatim.md#p0355)** Manager performance | Team staffing/training, WFH grants, calling results, Advisor lead volume, MIS decision/activation values and pending dual approvals, by reporting line.

**[P0356](../source/prd-verbatim.md#p0356)** Advisor performance | Registered/verified Advisors, own generated leads, unmatched/matched references, actual MIS stage/decision/activation, eligible/reserved/paid payout cards, lead-level detail.

**[P0357](../source/prd-verbatim.md#p0357)** Bank/card mix | Lead count and actual MIS bank stage/decision/activation by issuer, card, period, channel and pincode where reliable; don't infer card approval from sourceability.

**[P0358](../source/prd-verbatim.md#p0358)** MIS integrity and freshness | Per-bank last upload, last matched updates, number of rows imported/matched/unmatched/invalid/conflicted, new enums, row/key duplicates and corrections requiring review.

**[P0359](../source/prd-verbatim.md#p0359)** Payout liability and settlement | Eligible vs reserved vs approved vs paid card events, request aging, dual-approval backlog, external transfer records, missing proof and exceptions.

**[P0360](../source/prd-verbatim.md#p0360)** Data and permissions audit | User management changes, training/WFH changes, sensitive-data access, changed catalogue/link versions, MIS corrections and payout changes.

**[P0361](../source/prd-verbatim.md#p0361)** 16.3 Metric formulas and guardrails

**[P0362](../source/prd-verbatim.md#p0362)** •  Call attempts: count distinct provider-confirmed outbound attempts within time filter; separately report user-initiated attempts that failed before provider connection.

**[P0363](../source/prd-verbatim.md#p0363)** •  Connected calls: count distinct provider-confirmed connected calls where provider data supports it; never infer connection from saved remarks.

**[P0364](../source/prd-verbatim.md#p0364)** •  Unique customers contacted: distinct assigned customer IDs with confirmed connected calls in period.

**[P0365](../source/prd-verbatim.md#p0365)** •  Link shares: count distinct recorded share actions; actual delivered messages only when a delivery status exists.

**[P0366](../source/prd-verbatim.md#p0366)** •  Leads created: count distinct KBS lead IDs created in period; split by Advisor/operational Telecaller lead category.

**[P0367](../source/prd-verbatim.md#p0367)** •  MIS-matched leads: count distinct lead IDs with at least one accepted and reliable bank MIS linkage; show unmatched leads separately.

**[P0368](../source/prd-verbatim.md#p0368)** •  Bank stage/decision/activation counts: per latest accepted matching MIS value, independently, with 'Not reported' and 'Awaiting MIS' categories.

**[P0369](../source/prd-verbatim.md#p0369)** •  Activation payout eligible: count unique card events satisfying bank-specific approved rule based on MIS, minus neither duplicates nor already-paid records; distinguish eligibility count from available-to-claim count.

**[P0370](../source/prd-verbatim.md#p0370)** •  Available claim count: eligible unique card events minus those reserved in active request(s) and those already paid for the same entitlement.

**[P0371](../source/prd-verbatim.md#p0371)** •  Paid payout amount: amount recorded as externally paid by Accounts with supporting transaction proof; distinguish approved-but-unpaid amount.

**[P0372](../source/prd-verbatim.md#p0372)** For period-based reports, label whether filtering by KBS lead date, source MIS reporting event date, MIS upload date or Accounts paid date. Never mix denominators or imply a value reflects live bank status beyond the latest imported MIS.
