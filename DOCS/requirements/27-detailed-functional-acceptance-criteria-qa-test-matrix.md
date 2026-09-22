# 27. Detailed functional acceptance criteria / QA test matrix

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0521–P0581.

**[P0522](../source/prd-verbatim.md#p0522)** The following tests are intended to become executable QA cases; placeholders marked OPEN must be bound to KBS-approved values before formal sign-off.

**[P0523](../source/prd-verbatim.md#p0523)** ID | Scenario and expected result

**[P0524](../source/prd-verbatim.md#p0524)** AUTH-01 | Every role signs in using registered mobile + valid OTP; password/email login is not required or offered.

**[P0525](../source/prd-verbatim.md#p0525)** AUTH-02 | OTP expiry, wrong code, resend and rate-limiting handled without exposing another account.

**[P0526](../source/prd-verbatim.md#p0526)** RBAC-01 | Telecaller sees own assigned customers only; Manager sees own team; Admin organization-wide; Advisor own leads; Accounts approved payout data only.

**[P0527](../source/prd-verbatim.md#p0527)** RBAC-02 | Direct API/deep-link attempt to another user's lead, PAN, recording, cheque or proof is denied server-side.

**[P0528](../source/prd-verbatim.md#p0528)** TRAIN-01 | Manager alone creates Telecaller with name/number; assigned Manager and company ID generated.

**[P0529](../source/prd-verbatim.md#p0529)** TRAIN-02 | First successful Telecaller login stores one 72-hour deadline; repeat login cannot reset it.

**[P0530](../source/prd-verbatim.md#p0530)** TRAIN-03 | All three video/MCQ modules must be passed in order before calling queue is accessible.

**[P0531](../source/prd-verbatim.md#p0531)** TRAIN-04 | A Telecaller with incomplete module after 72 hours is deactivated and cannot access customer data.

**[P0532](../source/prd-verbatim.md#p0532)** TRAIN-05 | Assigned Manager reactivates failed Telecaller; next screen is first uncleared module; earlier passes persist.

**[P0533](../source/prd-verbatim.md#p0533)** TRAIN-06 | Another Manager cannot reactivate a Telecaller outside their reporting team.

**[P0534](../source/prd-verbatim.md#p0534)** CUST-01 | Admin imports sample headers  NAME ,  PAN NO ,  MOBILE ,  Pincode ; no nonexistent Location column is assumed.

**[P0535](../source/prd-verbatim.md#p0535)** CUST-02 | Uploaded records validated, duplicate/invalid/suppressed rows reported, accepted records assigned to eligible trained Telecallers.

**[P0536](../source/prd-verbatim.md#p0536)** CUST-03 | Reimporting same customer list does not erase prior assignment, do-not-contact or call history.

**[P0537](../source/prd-verbatim.md#p0537)** CUST-04 | Follow-up customer remains in active follow-up; completed/declined customer can be hidden without deletion.

**[P0538](../source/prd-verbatim.md#p0538)** PIN-01 | All nine supplied bank sheet structures are importable via bank-specific profiles with original fields preserved.

**[P0539](../source/prd-verbatim.md#p0539)** PIN-02 | Unknown sourcing flag does not create an automatically available card; pincode not found displays no supported sourceability, not personal ineligibility.

**[P0540](../source/prd-verbatim.md#p0540)** PIN-03 | Pincode match preserves zeros, respects bank/channel flags, displays linked Admin card details/PDF/URL when configured.

**[P0541](../source/prd-verbatim.md#p0541)** CARD-01 | Advisor can browse/search/filter by issuer/category, open accurate benefits/fees/disclosures and select card.

**[P0542](../source/prd-verbatim.md#p0542)** CALL-01 | Telecaller initiates call from app; actual provider result/call ID and duration when available are attached to correct customer.

**[P0543](../source/prd-verbatim.md#p0543)** CALL-02 | When recording exists it is playable by authorized Manager/Admin; recording failure never displays 'recorded'.

**[P0544](../source/prd-verbatim.md#p0544)** CALL-03 | Card benefits, official ID, PDF, link and remarks remain reachable within the customer calling context.

**[P0545](../source/prd-verbatim.md#p0545)** WA-01 | PDF, official ID and card link are individually shareable; 'share sheet opened' is not called 'delivered'.

**[P0546](../source/prd-verbatim.md#p0546)** WA-02 | Exact published URL and tracking parameters are preserved; link-sharing activity is recorded against customer/card.

**[P0547](../source/prd-verbatim.md#p0547)** CALL-04 | Interest/follow-up/decline recorded as  operational  outcome and does not set bank final decision or activation.

**[P0548](../source/prd-verbatim.md#p0548)** SEC-01 | Telecaller customer actions blocked outside approved office context unless valid WFH exception; Advisor offsite use remains allowed.

**[P0549](../source/prd-verbatim.md#p0549)** SEC-02 | Android app applies supported protected-screen controls; security test notes residual external capture limitations.

**[P0550](../source/prd-verbatim.md#p0550)** FOS-01 | Advisor signs up by OTP/name/mobile/email and completes required identity/bank/cheque workflow under approved compliance rules.

**[P0551](../source/prd-verbatim.md#p0551)** FOS-02 | Valid Agent Code assigns correct parent; blank code maps to Admin; adding code later is available with explicit attribution policy.

**[P0552](../source/prd-verbatim.md#p0552)** FOS-03 | Advisor guided lead captures mobile, details, PAN, pincode/location, employment/ITR income, declarations and review.

**[P0553](../source/prd-verbatim.md#p0553)** FOS-04 | Internal submission generates a KBS lead only; sharing an issuer link does not set bank 'Submitted', 'Approve' or activation.

**[P0554](../source/prd-verbatim.md#p0554)** FOS-05 | PAN verify mismatch, missing consent and invalid customer field produce editable errors, not a false completed lead.

**[P0555](../source/prd-verbatim.md#p0555)** FOS-06 | Advisor sees own My Leads, search/filters/detail, and can always distinguish operational history from bank MIS history.

**[P0556](../source/prd-verbatim.md#p0556)** MIS-01 | Admin MIS upload validates expected bank-specific mapping, rows and references and shows import-preview anomalies.

**[P0557](../source/prd-verbatim.md#p0557)** MIS-02 | HDFC stage =  Decisioned Cases , decision =  Approve , activation =  INACTIVE  appear independently and verbatim.

**[P0558](../source/prd-verbatim.md#p0558)** MIS-03 | HDFC  Card Activation Staus = #N/A  displays 'Not reported', with no activation payout eligibility inferred.

**[P0559](../source/prd-verbatim.md#p0559)** MIS-04 | KBS lead not yet present in MIS displays 'Awaiting MIS Update', never a fabricated bank stage.

**[P0560](../source/prd-verbatim.md#p0560)** MIS-05 | Previous bank-matched lead missing in newest MIS retains last accepted values and its own last matching batch date.

**[P0561](../source/prd-verbatim.md#p0561)** MIS-06 | Distinct original remarks from  DROPOFF_REASON ,  DECLINE_DESCRIPTION ,  Decline Descreption ,  Decline Type ,  Reason  etc. remain individually viewable.

**[P0562](../source/prd-verbatim.md#p0562)** MIS-07 | Bank status cannot be edited from Telecaller, Advisor, Manager, Admin direct lead edit or Accounts workflows; only accepted MIS processing changes it.

**[P0563](../source/prd-verbatim.md#p0563)** MIS-08 | Reupload identical MIS does not duplicate change history, notifications, activation event or payout.

**[P0564](../source/prd-verbatim.md#p0564)** MIS-09 | Unmatched/ambiguous references and contradictory duplicates are quarantined rather than guessed by customer name.

**[P0565](../source/prd-verbatim.md#p0565)** MIS-10 | A valid later bank correction produces a new source-backed historical snapshot with reported date separated from upload time.

**[P0566](../source/prd-verbatim.md#p0566)** MIS-11 | Unknown bank values are preserved pending mapping; no silent  Approve / Activated  synonym guess.

**[P0567](../source/prd-verbatim.md#p0567)** VIEW-01 | Web table/mobile lead cards show distinct Stage, Decision, Activation, remarks and per-lead last matched MIS date.

**[P0568](../source/prd-verbatim.md#p0568)** VIEW-02 | No fixed Lead Created -> Processing -> Approved timeline appears as a falsely bank-confirmed path.

**[P0569](../source/prd-verbatim.md#p0569)** VIEW-03 | Pending actions represent supported actual bank instructions or explicitly logged KBS tasks with source and owner if known.

**[P0570](../source/prd-verbatim.md#p0570)** DASH-01 | Calling attempts, links shared, operational leads, bank decisions and MIS activations are separate KPIs with date/source.

**[P0571](../source/prd-verbatim.md#p0571)** DASH-02 | Manager team scope and Admin org scope yield consistent underlying totals when filtered to same population/time.

**[P0572](../source/prd-verbatim.md#p0572)** PAY-01 | Approval/card setup without configured MIS payout event cannot create available payout entitlement.

**[P0573](../source/prd-verbatim.md#p0573)** PAY-02 | Eligible card selected in a submitted request is reserved; second session cannot claim it concurrently.

**[P0574](../source/prd-verbatim.md#p0574)** PAY-03 | Both Manager and Admin decisions exist before request appears in Accounts payment-ready queue.

**[P0575](../source/prd-verbatim.md#p0575)** PAY-04 | Admin-direct Advisor cannot bypass the independent Manager approval requirement.

**[P0576](../source/prd-verbatim.md#p0576)** PAY-05 | Accounts records  external  transfer and uploads proof; KBS itself does not transfer money.

**[P0577](../source/prd-verbatim.md#p0577)** PAY-06 | Paid entitlement no longer claimable; MIS activation count/history unchanged; itemized card/request/payment trace exists.

**[P0578](../source/prd-verbatim.md#p0578)** PAY-07 | Wrong amount, absent proof, double transaction reference and later MIS correction route to visible exceptions, not silent double payout.

**[P0579](../source/prd-verbatim.md#p0579)** NOTIF-01 | MIS status-change notification reports exact changed field/source time and deep-links only for authorized recipient.

**[P0580](../source/prd-verbatim.md#p0580)** NOTIF-02 | Request approvals/payment notifications reach relevant Advisor/Manager/Admin/Accounts without leaking PAN or full bank account.

**[P0581](../source/prd-verbatim.md#p0581)** AUDIT-01 | User access changes, uploads, assignment, training reactivation, bank correction, each approval and payment retain source/actor/time.
