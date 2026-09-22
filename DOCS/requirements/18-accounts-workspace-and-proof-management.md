# 18. Accounts workspace and proof management

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0392–P0398.

**[P0393](../source/prd-verbatim.md#p0393)** 18.1 Screens and actions

**[P0394](../source/prd-verbatim.md#p0394)** Accounts logs in with mobile OTP -> views Awaiting payment (dual-approved only), Paid, and Exceptions/needs correction queues -> opens a request -> verifies approved card count, payee bank summary, approved amount and both approval records -> pays manually using bank/finance tools outside KBS -> records transfer reference/date/amount -> uploads documentary proof -> submits payment record -> sees locked paid summary. Restrict access to necessary payee banking fields, full cancelled-cheque files and proof documents.

**[P0395](../source/prd-verbatim.md#p0395)** 18.2 Data and permission rules

**[P0396](../source/prd-verbatim.md#p0396)** Accounts cannot modify Advisor reporting hierarchy, import MIS, change activation, adjust payout-rule eligibility or approve on behalf of Manager/Admin. Accounts can flag an amount/bank discrepancy and return it to Admin for resolution; do not permit silent editing of approved request card list or approved amount after both approvals. Admin and relevant Manager see the payment record and proof according to permissions; Advisor sees payment confirmation and a privacy-safe receipt summary.

**[P0397](../source/prd-verbatim.md#p0397)** 18.3 Audit and reconciliation

**[P0398](../source/prd-verbatim.md#p0398)** Persist payer operator, timestamp, payment status, payment reference, proof file identifier, approved request and itemized card entitlement keys. Prevent a card/payment reference from being unlinked from its completed claim. Corrections must preserve the prior entry and actor. OPEN: whether payment can be partial/split; until specified, one approved request is either unpaid or fully recorded paid, with mismatched amount held for review.
