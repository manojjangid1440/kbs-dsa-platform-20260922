# 17. Activated-card entitlement and complete Advisor payout workflow

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0373–P0391.

**[P0374](../source/prd-verbatim.md#p0374)** 17.1 Non-negotiable eligibility source

**[P0375](../source/prd-verbatim.md#p0375)** An Advisor may request a payout only for an attributed, uniquely identified card entitlement whose applicable activation/commission-trigger event is evidenced by the latest accepted bank MIS under KBS's approved bank-specific payout policy. Neither FINAL_DECISION=Approve, card setup, KBS lead creation, link sharing nor a Telecaller's interest outcome is sufficient by itself. Maintain the raw HDFC activation values (V + ACTIVE, TXN ACTIVE - Rs 100, INACTIVE, unavailable) distinctly. OPEN / LAUNCH BLOCKER: documented per-bank trigger (and whether issuer payout requires bank settlement, first transaction or hold period), amount per card/product/period, bank reversal handling and interpretation of the different HDFC active-looking values. The MIS remains the only source of event confirmation even if a separate rate table specifies payment amounts.

**[P0376](../source/prd-verbatim.md#p0376)** 17.2 Advisor payout home

**[P0377](../source/prd-verbatim.md#p0377)** Advisor sees a card-level ledger: KBS lead, bank/card, bank reference, last matched MIS date, raw activation status, whether current configured rule makes the card payable, amount under the approved rate table, and payout position (available / reserved in request / pending both approvals / approved awaiting Accounts / paid / under review). Show distinct totals for eligible count, available-to-claim count, requested count, approved but unpaid and paid count/amount. Do not expose another Advisor's customer or payment details.

**[P0378](../source/prd-verbatim.md#p0378)** 17.3 Request creation and reservation

**[P0379](../source/prd-verbatim.md#p0379)** Advisor selects eligible available card events (or all eligible available), reviews itemized card count and expected amount, and submits a payout request. At submission, atomically reserve each selected event against that request. Prevent another pending request from including the same entitlement, including double-tap and simultaneous requests from two sessions. An unconfirmed/rejected/unknown activation or a card already reserved/paid must not be selectable. Store request ID, Advisor, Manager/Admin reporting context, exact event IDs/card references, rate/rule version, amount, submission time and itemized snapshot. A submitted request does not itself mean payment is approved or completed.

**[P0380](../source/prd-verbatim.md#p0380)** 17.4 Dual approval

**[P0381](../source/prd-verbatim.md#p0381)** The assigned Manager and the Admin must approve every request before Accounts may pay. Present itemized cards, evidence from MIS, rule version, amount, prior request/payment links and any exception warnings. Record individual actor, role, decision, timestamp and reason. The Manager and Admin receive app notifications; Admin retains organization-wide oversight. An Admin action must not be silently treated as both required approvals. For an Advisor assigned directly under Admin without a Manager, KBS must define a designated independent Manager approver (OPEN); the system must not skip the required Manager step.

**[P0382](../source/prd-verbatim.md#p0382)** 17.5 Approval order and rejection

**[P0383](../source/prd-verbatim.md#p0383)** The requirement mandates both approvals but does not explicitly demand an order. Support two distinct approval records and reveal which approval remains outstanding; configuring Manager-first and then Admin is a reasonable implementation proposal, not a silently assumed business rule. On reject, show requester the recorded reason and apply an approved release/resubmission policy so a card cannot remain permanently reserved by an abandoned request. OPEN: rejection edit/resubmission process, who can cancel a request, maker-checker segregation and time limits.

**[P0384](../source/prd-verbatim.md#p0384)** 17.6 Accounts external payment

**[P0385](../source/prd-verbatim.md#p0385)** After both approvals, Accounts sees a ready-for-payment row with Advisor name, verified masked payout-bank details, request/approval IDs, card count, itemized cards, approved amount and approval audit. Accounts executes a manual transfer outside KBS, then records paid date, amount, transfer reference, payment method if relevant, and uploads payment proof/receipt. KBS stores a controlled payment record and links it to exactly that request and its card events. Do not include any in-app disbursement button that transfers funds.

**[P0386](../source/prd-verbatim.md#p0386)** 17.7 Settled state and no duplicate claims

**[P0387](../source/prd-verbatim.md#p0387)** On confirmed manual payment and required proof, mark the request 'Paid' and its linked card entitlements 'Paid for this event'. Reduce the available-to-claim card count accordingly; do not reduce the historical MIS activation count or alter bank activation values. The Advisor sees paid cards and receipt summary; Manager/Admin/Accounts can trace each payout card to request, both approvals and proof. Reject duplicate bank transaction references or multiple payments of one request unless an explicit audited correction workflow exists. Any partial payment, reversal, bank correction after payment or overpayment must be surfaced as an exception for Admin/Accounts; do not silently create clawback or refund modules in the MVP.

**[P0388](../source/prd-verbatim.md#p0388)** 17.8 Recommended payout-state vocabulary (not bank status)

**[P0389](../source/prd-verbatim.md#p0389)** Available for claim -> Reserved / Request submitted -> Manager approval pending and/or Admin approval pending -> Both approved / Accounts payment pending -> Paid, with explicit Rejected, Cancelled, On hold / review exception labels where policy permits. These are KBS payment-workflow states only. They must not appear as application status, and none of them sets Card Activation Staus.

**[P0390](../source/prd-verbatim.md#p0390)** 17.9 Payout math and reconciliation

**[P0391](../source/prd-verbatim.md#p0391)** At any instant: available payable events = uniquely MIS-eligible entitlements - entitlements reserved by active requests - entitlements already paid for the same payable event. Show source time and rule version. Approved outstanding amount = fully approved unpaid request amount; paid amount = externally confirmed transfer amount, not simply total approved amount. Reconcile count and amount between Advisor, Manager, Admin and Accounts views using the same ledger. A rate changed after a claim must not silently rewrite an already approved/paid snapshot. OPEN: actual remuneration/rate contract, taxes/withholding policy outside MVP statement generation, partial settlements and bank-event uniqueness across reissued cards.
