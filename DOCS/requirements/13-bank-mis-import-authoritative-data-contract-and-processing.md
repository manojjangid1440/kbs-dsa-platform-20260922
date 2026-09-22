# 13. Bank MIS import — authoritative data contract and processing

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0234–P0307.

**[P0235](../source/prd-verbatim.md#p0235)** 13.1 Source-of-truth boundary

**[P0236](../source/prd-verbatim.md#p0236)** The Admin uploads bank-provided MIS files when received, typically every one to three days. There is no automatic bank/aggregator application-status API and no third-party 'card activation verifier' in scope. For any matched application, only the most recent valid accepted MIS row may update the bank-reported CURRENT_STAGE, FINAL_DECISION, card activation field, KYC results and bank-provided remarks. KBS may store separate operational events and payout events, but these may never overwrite a bank MIS value.

**[P0237](../source/prd-verbatim.md#p0237)** 13.2 HDFC sample: exact 36 column names and business use

**[P0238](../source/prd-verbatim.md#p0238)** The supplied HDFC sample (KBS804%20HDFC%20MIS_recreated(1).xlsx, Sheet1) has the following headings as written. Some include spelling inconsistencies; keep raw header and raw value intact, then map into a controlled internal field with a bank/version-specific import profile.

**[P0239](../source/prd-verbatim.md#p0239)** # | Exact Excel column | Requirement / semantic group

**[P0240](../source/prd-verbatim.md#p0240)** 1 | Application No | Bank application identifier candidate; retain original string.

**[P0241](../source/prd-verbatim.md#p0241)** 2 | LC2_CODE | Bank/partner code; assist provenance/attribution only when contractually defined.

**[P0242](../source/prd-verbatim.md#p0242)** 3 | CURRENT_STAGE | Primary current bank application stage ; show independently.

**[P0243](../source/prd-verbatim.md#p0243)** 4 | APPLICATION_REFERENCE_NUMBER | Bank reference identifier candidate; retain original string.

**[P0244](../source/prd-verbatim.md#p0244)** 5 | CREATION_DATE_TIME | Bank-provided creation timestamp; do not substitute upload time.

**[P0245](../source/prd-verbatim.md#p0245)** 6 | CUSTOMER_TYPE | Contextual customer type, as reported.

**[P0246](../source/prd-verbatim.md#p0246)** 7 | CUSTOMER_NAME | Sensitive bank customer name; not sufficient alone for lead matching.

**[P0247](../source/prd-verbatim.md#p0247)** 8 | CHANNEL | Bank/channel information; preserve and show in Admin detail as needed.

**[P0248](../source/prd-verbatim.md#p0248)** 9 | IPA_STATUS | IPA result; separate from FINAL_DECISION and activation.

**[P0249](../source/prd-verbatim.md#p0249)** 10 | DAP_FINAL_FLAG | Bank flag; semantics must be documented, never inferred.

**[P0250](../source/prd-verbatim.md#p0250)** 11 | DROPOFF_REASON | Bank-provided reason  for dropped/incomplete case when supplied.

**[P0251](../source/prd-verbatim.md#p0251)** 12 | IDCOM_STATUS | IDCOM status, if relevant.

**[P0252](../source/prd-verbatim.md#p0252)** 13 | VKYC_STATUS | Video KYC status; independent bank-reported field.

**[P0253](../source/prd-verbatim.md#p0253)** 14 | VKYC_CONSENT_DATE | Bank-supplied video KYC consent date.

**[P0254](../source/prd-verbatim.md#p0254)** 15 | VKYC_EXPIRY_DATE | Bank-supplied video KYC expiry date.

**[P0255](../source/prd-verbatim.md#p0255)** 16 | CAPTURE_LINK | Bank-provided link; only show/use if authorized and validated, do not assume it is a customer application link.

**[P0256](../source/prd-verbatim.md#p0256)** 17 | PROMO_CODE | Campaign/promo context; may aid attribution if agreed.

**[P0257](../source/prd-verbatim.md#p0257)** 18 | PRODUCT_CODE | Bank product code; mapping to Admin card catalogue may be required.

**[P0258](../source/prd-verbatim.md#p0258)** 19 | FINAL_DECISION | Bank-reported final decision ; distinct from CURRENT_STAGE and activation.

**[P0259](../source/prd-verbatim.md#p0259)** 20 | FINAL_DECISION_DATE | Date of final decision, if provided.

**[P0260](../source/prd-verbatim.md#p0260)** 21 | DECLINE_CODE | Bank decline code; display in authorized details if present.

**[P0261](../source/prd-verbatim.md#p0261)** 22 | DECLINE_DESCRIPTION | Bank decline text/category; preserve even if another column contains more detail.

**[P0262](../source/prd-verbatim.md#p0262)** 23 | CURABLE_FLAG | Bank-reported curability flag; not a standalone permission to contact or edit bank status.

**[P0263](../source/prd-verbatim.md#p0263)** 24 | COMPANY_NAME | Contextual company information; treat as customer-sensitive.

**[P0264](../source/prd-verbatim.md#p0264)** 25 | BKYC Status | Biometric KYC status; keep separate.

**[P0265](../source/prd-verbatim.md#p0265)** 26 | Reason | Additional bank reason, including KYC context.

**[P0266](../source/prd-verbatim.md#p0266)** 27 | KYC Status | Bank-reported KYC result; separate from card decision.

**[P0267](../source/prd-verbatim.md#p0267)** 28 | Decision Month | Bank reporting period field; do not overwrite event date.

**[P0268](../source/prd-verbatim.md#p0268)** 29 | Decline Descreption | Additional decline description; original spelling preserved.

**[P0269](../source/prd-verbatim.md#p0269)** 30 | Decline Type | Decline category/reason; separately displayed if supplied.

**[P0270](../source/prd-verbatim.md#p0270)** 31 | Product Des | Bank product description; card crosswalk candidate.

**[P0271](../source/prd-verbatim.md#p0271)** 32 | Secured/Unsecured | Reported product classification.

**[P0272](../source/prd-verbatim.md#p0272)** 33 | KYC Success/NR | Additional bank-supplied KYC-related field; do not infer from arbitrary values.

**[P0273](../source/prd-verbatim.md#p0273)** 34 | Card Type | Bank-reported card type.

**[P0274](../source/prd-verbatim.md#p0274)** 35 | Creation Date | Additional bank date; preserve independently from CREATION_DATE_TIME.

**[P0275](../source/prd-verbatim.md#p0275)** 36 | Card Activation Staus | Bank-reported card activation status ; original misspelling must be supported.

**[P0276](../source/prd-verbatim.md#p0276)** 13.3 Verified distinct value groups in the HDFC sample

**[P0277](../source/prd-verbatim.md#p0277)** •  CURRENT_STAGE values in the sample include Decisioned Cases, Decisioned Cases and Card setup completed, Document Curing, In-Complete Application, Pending for Biokyc, System Queue.

**[P0278](../source/prd-verbatim.md#p0278)** •  FINAL_DECISION sample values are Approve, Decline, Inprocess.

**[P0279](../source/prd-verbatim.md#p0279)** •  Card Activation Staus sample values are INACTIVE, V + ACTIVE, TXN ACTIVE - Rs 100, and #N/A.

**[P0280](../source/prd-verbatim.md#p0280)** •  KYC Status sample values include Expired, NR, Not Eligible, Success; VKYC_STATUS includes VKYC InComplete and vKYC Success; BKYC Status includes Closed, Completed and #N/A.

**[P0281](../source/prd-verbatim.md#p0281)** •  Decline/reason fields may have #N/A, an internal code, document-curing text, policy-related text or customer refusal information. Preserve every meaningful field as bank text rather than collapsing it into a generic 'Rejected'.

**[P0282](../source/prd-verbatim.md#p0282)** These are observed sample values, not an exhaustive live bank enum list or a confirmation of what each activation value means for commission. Future MIS profiles must accept new values after appropriate review without losing originals.

**[P0283](../source/prd-verbatim.md#p0283)** 13.4 MIS import user journey

**[P0284](../source/prd-verbatim.md#p0284)** 1. Admin chooses Upload bank MIS, bank, import profile/version and workbook file. If the file contains several sheets, Admin chooses or maps each bank sheet explicitly.

**[P0285](../source/prd-verbatim.md#p0285)** 2. Validate file type, readable workbook, headers, required identifier/status column mapping, date formats, row length and expected bank. Do not accept a pincode-list workbook or customer calling list as an MIS upload merely because it is Excel.

**[P0286](../source/prd-verbatim.md#p0286)** 3. Present preview including row count, candidate application-reference coverage, blank status counts, distinct new status values, probable duplicate references, probable matched leads, unmatched rows and conflicts. Preview must avoid broad exposure of raw customer PII.

**[P0287](../source/prd-verbatim.md#p0287)** 4. Admin confirms processing; save immutable source file with bank/profile, checksum, import batch ID, uploader, upload time and per-row provenance.

**[P0288](../source/prd-verbatim.md#p0288)** 5. Resolve rows to existing applications via an approved exact bank-scoped reference linkage. Apply valid updates to bank fields only and append change history; never change KBS operational activity or the original source file.

**[P0289](../source/prd-verbatim.md#p0289)** 6. Record imported, updated-no-change, updated-with-change, unmatched, duplicate/conflict, rejected-invalid and requires-review totals. Admin can open row-level explanations and correct a mapping/linkage through an audited review flow where allowed.

**[P0290](../source/prd-verbatim.md#p0290)** 7. Recompute authorized dashboards, actual MIS update notifications and payout eligibility for correctly matched records. Release a batch only after validation/processing reaches a consistent accepted state.

**[P0291](../source/prd-verbatim.md#p0291)** 13.5 Deterministic matching and identity

**[P0292](../source/prd-verbatim.md#p0292)** The application must retain a KBS lead ID, bank identifier, bank application number and/or application reference number if known. Bank + reliable exact reference is the intended matching key; use the bank's own reference rules and a documented card/partner crosswalk where required. Preserve exact string representations, including leading zeros. Do not auto-match based only on customer name, mobile, PAN, proximity of application dates, product description or an approximate text similarity score. If references disagree, are reused, missing or map to multiple leads, quarantine the MIS row for Admin resolution and do not silently move bank status to a guessed lead. OPEN: issuer-specific unique reference contract and verified way to capture issuer reference from customer link journeys.

**[P0293](../source/prd-verbatim.md#p0293)** 13.6 Existing vs absent vs missing-value behaviour

**[P0294](../source/prd-verbatim.md#p0294)** Condition | Required outcome

**[P0295](../source/prd-verbatim.md#p0295)** New valid MIS row matches a lead | Update only bank-reported fields supplied by the accepted mapping; record source and status changes.

**[P0296](../source/prd-verbatim.md#p0296)** Same lead reported in latest sheet with same values | Record that this MIS batch contains/confirmed the lead without creating a fake status transition.

**[P0297](../source/prd-verbatim.md#p0297)** Existing lead absent from a new sheet | Keep last accepted bank values, show  last matched MIS date , and do not mark rejected/cancelled/expired or claim recent confirmation.

**[P0298](../source/prd-verbatim.md#p0298)** Lead never appears in any accepted MIS | Show  Awaiting MIS Update  for bank status, with no invented bank stage or decision.

**[P0299](../source/prd-verbatim.md#p0299)** A status cell is blank or  #N/A | Show  Not reported  for that field; preserve raw cell and distinguish unknown from negative result. Whether blank supersedes a previously known value depends on an expressly configured full-snapshot vs delta-file rule (OPEN).

**[P0300](../source/prd-verbatim.md#p0300)** New MIS has no usable unique identifier | Leave row unmatched and present Admin review; no name-only auto-link.

**[P0301](../source/prd-verbatim.md#p0301)** Two contradictory rows for same reference within a batch | Mark conflict, do not choose based on file row order without an approved bank rule.

**[P0302](../source/prd-verbatim.md#p0302)** Reimport exact same file | Avoid duplicate status-history/notification/payment eligibility effects; show previously processed source batch.

**[P0303](../source/prd-verbatim.md#p0303)** Bank sends retroactive correction | Keep complete prior and corrected values with source file/time, recalculate current bank reports and flag any financial consequence for review; do not silently delete existing payment history.

**[P0304](../source/prd-verbatim.md#p0304)** 13.7 Bank-specific import profiles

**[P0305](../source/prd-verbatim.md#p0305)** HDFC headings above are an example only. Each contracted issuer must have a validated import profile specifying: accepted sheet/file format, required identifiers, header aliases, distinct stage/decision/activation columns, original bank value vocabulary, date/timezone semantics, reason/remarks columns, partial vs full-snapshot update semantics, exact matching reference, product code mapping and payout-eligible event interpretation. Admin may upload a profile only after review. An unrecognized column/status must not crash the import or be silently converted to a known business outcome; display it as an unmapped raw value pending mapping.

**[P0306](../source/prd-verbatim.md#p0306)** 13.8 Date provenance

**[P0307](../source/prd-verbatim.md#p0307)** Display separately: KBS internal lead-created time; KBS link-shared/initiated time; bank-reported creation/decision/KYC event dates if present; KBS MIS file received/uploaded time and last matched status update time. A user's 'last MIS update' must mean the last accepted batch containing/updating that lead, not the global last time Admin uploaded an unrelated bank file. Avoid deriving bank event dates from the file's filename or upload time.
