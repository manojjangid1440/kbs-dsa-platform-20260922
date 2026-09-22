# Import contract boundaries

Customer calling list, bank sourcing/pincode list and bank MIS are three different import categories. Never autodetect them solely from the `.xlsx` extension.

Customer list exact headings: NAME, PAN NO, MOBILE, Pincode. No Location column exists in the described sample. Pincode stays six-character string; resolve location from approved reference or show unavailable. Validation, dedup, source consent/suppression and allocation policies are distinct stages.

Pincode sheets: EQUITAS, IDFC BANK, HSBC BANK, Indusind bank, rbl bank, au bank, yes bank, AXIS BANK, SBI BANK. Each full raw heading set and bank-specific attribute treatment is preserved in source section 7. Card catalogue is separate; delivery/sourceability/online flags cannot be conflated. Unknown mapping blocks publication of availability.

HDFC: all 36 headings in hdfc-mis.md. Identifiers are Application No and APPLICATION_REFERENCE_NUMBER candidates subject to approved exact bank reference contract. Keep CURRENT_STAGE, FINAL_DECISION, Card Activation Staus and KYC/reason columns independent. Raw headers include intentional source misspellings.

Common preview: immutable file hash, category, bank if applicable, profile version, sheet/header mapping, masked rows, total rows, validation/conflict counts and reviewed revision. Confirm must bind to the same bytes/profile. Raw file stored privately and unchanged. Row result reason must be attributable to original sheet/row.

Unknown fields are retained, unknown values are not mapped to invented decisions, and formula cells are not executed. File size/ZIP expansion/row/cell limits must be configured. Actual workbook test fixtures remain required before import acceptance.
