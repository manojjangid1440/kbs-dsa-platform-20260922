# 26. End-to-end cross-role scenarios

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0494–P0520.

**[P0495](../source/prd-verbatim.md#p0495)** 26.1 Telecaller customer interaction

**[P0496](../source/prd-verbatim.md#p0496)** 1. Manager creates Telecaller from name+number; employee ID is generated.

**[P0497](../source/prd-verbatim.md#p0497)** 2. Telecaller logs in by mobile OTP, starts 72-hour training, passes three MCQ/video modules sequentially and gets assigned customer records only after completion.

**[P0498](../source/prd-verbatim.md#p0498)** 3. Admin imports calling workbook; records pass validation/compliance checks, then allocate automatically under all Managers' eligible Telecallers.

**[P0499](../source/prd-verbatim.md#p0499)** 4. Telecaller opens assigned customer's pincode; KBS uses the correct bank-specific sourceability mapping and Admin card catalogue to show applicable products, PDFs and links.

**[P0500](../source/prd-verbatim.md#p0500)** 5. Telecaller taps in-app Call; provider handles call and recording where authorized; UI remains on calling desk with card/WhatsApp actions.

**[P0501](../source/prd-verbatim.md#p0501)** 6. Customer requests benefits/office ID/card link; Telecaller shares each as appropriate; record share attempt/result against the customer.

**[P0502](../source/prd-verbatim.md#p0502)** 7. Telecaller logs interest/decline/follow-up and notes; follow-up stays active while completed/declined row may be hidden without deletion; do-not-contact enforced.

**[P0503](../source/prd-verbatim.md#p0503)** 8. Assigned Manager and Admin can see attempts, confirmed connected calls, recordings and interaction results. No step changes bank status or creates Telecaller commission.

**[P0504](../source/prd-verbatim.md#p0504)** 26.2 Advisor application and MIS refresh

**[P0505](../source/prd-verbatim.md#p0505)** 1. Advisor self-registers by mobile OTP, completes name/email, authorized Aadhaar verification, payout bank details/cheque and optional Agent Code (blank -> Admin parent).

**[P0506](../source/prd-verbatim.md#p0506)** 2. Advisor browses available cards by bank/category, reviews benefits/fees/disclosures and selects a card.

**[P0507](../source/prd-verbatim.md#p0507)** 3. Advisor enters customer mobile/basic details/PAN/pincode/employment/annual ITR income/declarations; reviews and submits KBS operational lead.

**[P0508](../source/prd-verbatim.md#p0508)** 4. Advisor sees KBS lead reference, shares/opens Admin-approved bank link and records the initiation event. If no issuer bank reference has been captured, bank reference is visibly unavailable.

**[P0509](../source/prd-verbatim.md#p0509)** 5. Before any accepted matching MIS, bank status is Awaiting MIS Update, not 'Application Submitted' or 'Under Processing'.

**[P0510](../source/prd-verbatim.md#p0510)** 6. Admin uploads HDFC MIS. A row with a reliable exact reference matches the lead. Show, for example, CURRENT_STAGE = Decisioned Cases, FINAL_DECISION = Approve, Card Activation Staus = INACTIVE as three separate fields. These are illustrative source values, not a generated status path.

**[P0511](../source/prd-verbatim.md#p0511)** 7. When a later MIS reports a different field, update just the supplied bank information under the bank profile's agreed full/delta semantics, append true source-backed change history and update Advisor/Manager/Admin views.

**[P0512](../source/prd-verbatim.md#p0512)** 8. Bank reasons/remarks remain literal MIS content, KBS follow-up notes remain operational; eligible payout appears only after configured issuer activation-event evidence and payout policy are satisfied.

**[P0513](../source/prd-verbatim.md#p0513)** 26.3 Advisor payout and Accounts settlement

**[P0514](../source/prd-verbatim.md#p0514)** 1. A bank MIS update confirms a qualifying activation event for an Advisor-owned, uniquely identified card under approved bank-specific payout rules.

**[P0515](../source/prd-verbatim.md#p0515)** 2. Advisor sees the event in Available Payouts and requests payment for the selected eligible card(s); they become reserved immediately.

**[P0516](../source/prd-verbatim.md#p0516)** 3. Relevant Manager and Admin each review and approve the same itemized request; Accounts sees it only after both approvals.

**[P0517](../source/prd-verbatim.md#p0517)** 4. Accounts pays outside KBS and uploads transfer details/proof. KBS records external payment and marks the same entitlement as paid.

**[P0518](../source/prd-verbatim.md#p0518)** 5. Advisor's available payable-card count decreases by paid/reserved entitlements, while historical MIS activation count stays accurate; a second request for the same entitlement is blocked.

**[P0519](../source/prd-verbatim.md#p0519)** 26.4 Missing and conflicting MIS

**[P0520](../source/prd-verbatim.md#p0520)** A new KBS lead has no bank reference or no MIS match: display Awaiting MIS Update. A prior matched lead is absent from today's bank sheet: preserve previous actual reported values and show that this lead's last matched MIS was older. A bank row has two plausible candidate leads or duplicate inconsistent values: quarantine as conflict for Admin and do not choose by customer name. A blank activation field means 'Not reported', not 'INACTIVE'. No fabricated follow-up CTA is generated by a blank.
