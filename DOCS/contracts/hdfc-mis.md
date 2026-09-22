# HDFC MIS source contract

Transcribed from PRD section 13; workbook bytes not inspected here. Preserve exact headers and raw values. These are not universal bank columns.

1 | Application No | Bank application identifier candidate; retain original string.

2 | LC2_CODE | Bank/partner code; assist provenance/attribution only when contractually defined.

3 | CURRENT_STAGE | Primary current bank application stage ; show independently.

4 | APPLICATION_REFERENCE_NUMBER | Bank reference identifier candidate; retain original string.

5 | CREATION_DATE_TIME | Bank-provided creation timestamp; do not substitute upload time.

6 | CUSTOMER_TYPE | Contextual customer type, as reported.

7 | CUSTOMER_NAME | Sensitive bank customer name; not sufficient alone for lead matching.

8 | CHANNEL | Bank/channel information; preserve and show in Admin detail as needed.

9 | IPA_STATUS | IPA result; separate from FINAL_DECISION and activation.

10 | DAP_FINAL_FLAG | Bank flag; semantics must be documented, never inferred.

11 | DROPOFF_REASON | Bank-provided reason  for dropped/incomplete case when supplied.

12 | IDCOM_STATUS | IDCOM status, if relevant.

13 | VKYC_STATUS | Video KYC status; independent bank-reported field.

14 | VKYC_CONSENT_DATE | Bank-supplied video KYC consent date.

15 | VKYC_EXPIRY_DATE | Bank-supplied video KYC expiry date.

16 | CAPTURE_LINK | Bank-provided link; only show/use if authorized and validated, do not assume it is a customer application link.

17 | PROMO_CODE | Campaign/promo context; may aid attribution if agreed.

18 | PRODUCT_CODE | Bank product code; mapping to Admin card catalogue may be required.

19 | FINAL_DECISION | Bank-reported final decision ; distinct from CURRENT_STAGE and activation.

20 | FINAL_DECISION_DATE | Date of final decision, if provided.

21 | DECLINE_CODE | Bank decline code; display in authorized details if present.

22 | DECLINE_DESCRIPTION | Bank decline text/category; preserve even if another column contains more detail.

23 | CURABLE_FLAG | Bank-reported curability flag; not a standalone permission to contact or edit bank status.

24 | COMPANY_NAME | Contextual company information; treat as customer-sensitive.

25 | BKYC Status | Biometric KYC status; keep separate.

26 | Reason | Additional bank reason, including KYC context.

27 | KYC Status | Bank-reported KYC result; separate from card decision.

28 | Decision Month | Bank reporting period field; do not overwrite event date.

29 | Decline Descreption | Additional decline description; original spelling preserved.

30 | Decline Type | Decline category/reason; separately displayed if supplied.

31 | Product Des | Bank product description; card crosswalk candidate.

32 | Secured/Unsecured | Reported product classification.

33 | KYC Success/NR | Additional bank-supplied KYC-related field; do not infer from arbitrary values.

34 | Card Type | Bank-reported card type.

35 | Creation Date | Additional bank date; preserve independently from CREATION_DATE_TIME.

36 | Card Activation Staus | Bank-reported card activation status ; original misspelling must be supported.

Read full requirements section 13 for vocabulary, snapshot/delta semantics, reference conflicts and ordering. No automatic payout interpretation of V + ACTIVE or TXN ACTIVE - Rs 100 is approved.
