# 7. Bank-specific pincode eligibility and credit card catalogue

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0123–P0143.

**[P0124](../source/prd-verbatim.md#p0124)** 7.1 Independent sources

**[P0125](../source/prd-verbatim.md#p0125)** The bank-wise pincode workbook is a sourcing-location reference; it is not an MIS status feed and it is not a complete card catalogue. Separately, Admin maintains card image/name/issuer, description, categories, rewards/benefits, joining and annual fees, major charges, eligibility highlights, applicable disclosures, application URL and benefit PDF. A bank being sourceable at a pincode does not guarantee an individual card is offered or a customer qualifies.

**[P0126](../source/prd-verbatim.md#p0126)** 7.2 Actual uploaded pincode workbook structure

**[P0127](../source/prd-verbatim.md#p0127)** Bank sheet | Example header(s) from the uploaded file | Required treatment

**[P0128](../source/prd-verbatim.md#p0128)** EQUITAS | CITY ,  DISTRICT ,  STATE ,  REGION ,  SOURCING PINCODE ,  BANK ,  Asset _Branch_Code ,  LIABILITY_BRANCH CODE ,  Remarks | Preserve sourcing pincode, branch codes and remarks; do not infer success from a nonblank remark.

**[P0129](../source/prd-verbatim.md#p0129)** IDFC BANK | EXTERNAL_CODE ,  MASTER_PINCODES_NAME ,  CITY ,  STATE ,  COUNTRY ,  NTB | Identify/validate the bank-specific pincode column before activation.

**[P0130](../source/prd-verbatim.md#p0130)** HSBC BANK | CARDDELIVERYFLAG ,  CITY ,  COUNTRY ,  DISTRICT ,  FLAG ,  PINCODE ,  PINCODEFLAG ,  STATE ,  STATUS ,  STDCODE | Preserve delivery, flag and status dimensions; define bank-specific inclusion rules.

**[P0131](../source/prd-verbatim.md#p0131)** Indusind bank | Pincode ,  City ,  State/UT ,  Branch SOL ID ,  Added on | Retain branch and bank-supplied added date.

**[P0132](../source/prd-verbatim.md#p0132)** rbl bank | Pincode ,  City ,  City Code ,  City_Unique_Code ,  State ,  State Code ,  State_Unique_Code ,  Region Code ,  Country: Country Name ,  Sourceable ,  Is Online City | Show and enforce explicit sourceability/online-city values without equating the two.

**[P0133](../source/prd-verbatim.md#p0133)** au bank | CUST_PINCODE ,  CUST_STATE | Use actual bank-specific headings.

**[P0134](../source/prd-verbatim.md#p0134)** yes bank | PINCODE ,  District ,  STATE NAME ,  CITY NAME ,  city_code ,  REGION CODE ,  state_short ,  std_code ,  hub_location ,  branch_code ,  ICL/OCL ,  Policy ,  REGION | Retain policy/ICL-OCL attributes; ignore empty auto-generated header columns only after validation.

**[P0135](../source/prd-verbatim.md#p0135)** AXIS BANK | lender_id ,  pincode ,  city ,  state ,  address_type ,  lenderApiVersion ,  pincode_type | Interpret pincode type and address type with bank-specific rules.

**[P0136](../source/prd-verbatim.md#p0136)** SBI BANK | lender_id ,  pincode ,  city ,  state ,  address_type ,  std ,  source_code ,  lenderApiVersion | Import all meaningful fields; source-code meaning must be confirmed before using it as a filter.

**[P0137](../source/prd-verbatim.md#p0137)** 7.3 Import and matching rules

**[P0138](../source/prd-verbatim.md#p0138)** Admin imports each bank sheet with explicitly reviewed header mappings and value semantics; pincode is stored as a six-character string, not a number, and must not be matched by city alone. Maintain source upload/version per bank. Where a bank encodes offline/online sourcing, digital/physical availability, branch restrictions or policy flags, display only supported routes and preserve original flags. Any ambiguous flag stays 'Requires bank mapping' rather than automatically treating the card as available. Do not incorrectly merge different bank files into one universal schema without preserving the raw original rows.

**[P0139](../source/prd-verbatim.md#p0139)** 7.4 Card presentation and customer lookup

**[P0140](../source/prd-verbatim.md#p0140)** On a customer's calling screen, use the customer's pincode to show bank/card combinations that are both permitted by current bank-specific location mapping and published by Admin for that location/channel. Provide card image, bank, card name, category, benefits PDF, charges, highlighted features and Admin-controlled link. Where no supported combination exists, show 'No card available for this pincode from current uploaded data', not 'Customer is ineligible'. Advisor catalogue supports card browse, search by name/bank, categories (Travel, Shopping, Premium/Top, Fuel, other Admin-configured), filters and card detail. Exact per-bank card-to-pincode mapping is OPEN until KBS supplies the production catalogue and approved sourceability semantics.

**[P0141](../source/prd-verbatim.md#p0141)** 7.5 Initial application links (Admin-managed catalogue seed)

**[P0142](../source/prd-verbatim.md#p0142)** •  https://balaji-partner-h.getpopcard.co/?utm_source=SRIBALAJI&utm_medium=cardifye&utm_campaign=CADF43_KBS

**[P0143](../source/prd-verbatim.md#p0143)** •  https://cconboarding.au.bank.in/auccself/#/?utm_source=MMFNT&utm_medium=banner&utm_campaign=MMFNT-display-campaign-ENT-KBS_50263These are user-supplied example partner/application URLs, not proof of a production API, availability, activation, commission event or specific card/pincode mapping. Admin must assign each link to its bank/card/channel, effective dates and approved sharing context. Preserve existing tracking query strings and URL fragments when sharing; do not incorrectly infer an application/reference number from a click alone.
