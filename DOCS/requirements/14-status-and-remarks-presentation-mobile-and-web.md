# 14. Status and remarks presentation (mobile and web)

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0308–P0338.

**[P0309](../source/prd-verbatim.md#p0309)** 14.1 No fixed bank-state machine

**[P0310](../source/prd-verbatim.md#p0310)** The old proposed visual path Lead Created -> Application Initiated -> Customer/FOS Action -> Application Submitted -> Under Processing -> Final Status is removed as the authoritative bank-status model. Those words may appear only as precisely labelled KBS operational events or actual bank MIS values if a bank has reported them. Do not auto-advance a lead through that sequence, and do not show 'Processing' simply because a link was shared. Display the latest bank-reported stage/decision/activation as independent fields.

**[P0311](../source/prd-verbatim.md#p0311)** 14.2 My Leads and Manager/Admin status table

**[P0312](../source/prd-verbatim.md#p0312)** Table column | Source and display rule

**[P0313](../source/prd-verbatim.md#p0313)** Customer | Saved lead customer; mask sensitive fields according to role.

**[P0314](../source/prd-verbatim.md#p0314)** Bank / Credit Card | Saved selected bank/card; supplement with reviewed product code mapping as needed.

**[P0315](../source/prd-verbatim.md#p0315)** KBS Lead ID | Generated KBS operational identifier, never portrayed as bank reference.

**[P0316](../source/prd-verbatim.md#p0316)** Bank Application No. | Application No , where available.

**[P0317](../source/prd-verbatim.md#p0317)** Bank Application Reference | APPLICATION_REFERENCE_NUMBER , where available.

**[P0318](../source/prd-verbatim.md#p0318)** Lead Created Date | KBS lead creation event; distinct from bank date.

**[P0319](../source/prd-verbatim.md#p0319)** Bank Creation Date | CREATION_DATE_TIME  and/or  Creation Date  with provenance.

**[P0320](../source/prd-verbatim.md#p0320)** Current Application Stage | CURRENT_STAGE , or  Awaiting MIS Update  when never matched, or  Not reported  if no value provided.

**[P0321](../source/prd-verbatim.md#p0321)** Final Bank Decision | FINAL_DECISION , shown separately.

**[P0322](../source/prd-verbatim.md#p0322)** Card Activation | Card Activation Staus , shown separately and with raw bank value accessible.

**[P0323](../source/prd-verbatim.md#p0323)** Bank Reason / Remarks | Compact preview with complete field-by-field MIS details in lead view.

**[P0324](../source/prd-verbatim.md#p0324)** Last Matched MIS Update | Date/time of newest accepted matching MIS batch, not the global upload.

**[P0325](../source/prd-verbatim.md#p0325)** Action | Open details, actual pending action when supported; no arbitrary 'Move to next stage'.

**[P0326](../source/prd-verbatim.md#p0326)** 14.3 Compact mobile row and full details

**[P0327](../source/prd-verbatim.md#p0327)** Mobile lead row: first line customer and bank/card; second line KBS reference and bank reference if known; primary badges for Stage, Decision, Activation as distinct badges even if unknown; last MIS matched time and a truncated relevant bank reason. Tapping opens full lead detail: original raw values, KYC substatuses and dates, all bank remarks, operational history, MIS upload history and authorized next actions. Web presents the full sortable/filterable table, expandable reason/details and bulk-free status review. Never replace multiple bank fields with a single overloaded green/red 'Success/Failed' chip.

**[P0328](../source/prd-verbatim.md#p0328)** 14.4 Activation display and payout distinction

**[P0329](../source/prd-verbatim.md#p0329)** Raw HDFC  Card Activation Staus | Display | Interpretation boundary

**[P0330](../source/prd-verbatim.md#p0330)** V + ACTIVE | V + ACTIVE | Bank-reported activation value; payout eligibility subject to documented bank-specific commission rule.

**[P0331](../source/prd-verbatim.md#p0331)** TXN ACTIVE - Rs 100 | TXN ACTIVE - Rs 100 | Preserve its distinct value; do not silently merge it with V + ACTIVE for payouts.

**[P0332](../source/prd-verbatim.md#p0332)** INACTIVE | INACTIVE | Not reported active in this field; does not undo a separate approval decision.

**[P0333](../source/prd-verbatim.md#p0333)** #N/A  or empty | Not reported | Unknown/absent, not active, inactive, approved or rejected by inference.

**[P0334](../source/prd-verbatim.md#p0334)** A final bank decision Approve and activation INACTIVE may coexist; show both. CURRENT_STAGE may also reflect card setup without a confirmed activation value; do not treat card setup as activation. OPEN: whether one or both active-looking values count toward KBS commission for each bank, and whether a subsequent settlement/hold period applies.

**[P0335](../source/prd-verbatim.md#p0335)** 14.5 Bank reason and remarks grouping

**[P0336](../source/prd-verbatim.md#p0336)** For HDFC show separate named fields, when available: DROPOFF_REASON, DECLINE_CODE, DECLINE_DESCRIPTION, Decline Descreption, Decline Type, and Reason. Additional statuses/notes such as CURABLE_FLAG, KYC Status, VKYC_STATUS, BKYC Status and relevant expiry dates appear in a detailed Bank/KYC information section; never edit them through an operational notes field. Telecaller and Advisor may append their own dated Operational remarks with author and edit history. Operational remarks must not override MIS remarks, and mismatched/unknown remarks must not trigger a made-up CTA.

**[P0337](../source/prd-verbatim.md#p0337)** 14.6 MIS change history and alerting

**[P0338](../source/prd-verbatim.md#p0338)** For a given lead, group changes by imported batch; show old->new exact bank value per changed field, reported bank event date if available, and KBS import timestamp/uploader. An identical repeat should not create a fictional stage movement. New notifications should state only the changed value or confirmed action, e.g., 'Bank MIS updated: Final decision = Approve; activation = INACTIVE', not 'Your card is activated' unless the activation field actually confirms the configured event. Notifications are role-filtered and contain no unnecessary PAN/full bank account numbers.
