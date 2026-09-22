# 21. Sensitive information, privacy, calling compliance and recording safeguards

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0421–P0431.

**[P0422](../source/prd-verbatim.md#p0422)** 21.1 Data categories and minimization

**[P0423](../source/prd-verbatim.md#p0423)** Classify and restrict customer mobile, PAN, bank MIS/customer data, Advisor Aadhaar verification evidence, bank account/cancelled cheque, call recordings, application links with partner tracking, company ID cards and payout proof. Do not store full Aadhaar numbers or raw offline e-KYC packages/share codes by default. Mask PAN and bank account where their full content is not necessary; avoid placing sensitive strings in URLs, client logs, error traces, analytics events, notifications or exports. Encrypt in transit and at rest; apply role-based document access and protected delivery URLs with expiry where suitable.

**[P0424](../source/prd-verbatim.md#p0424)** 21.2 Third-party purchased calling lists

**[P0425](../source/prd-verbatim.md#p0425)** KBS states it purchases customer data from third parties. Purchase alone is not sufficient evidence that a customer has consented to KBS credit-card solicitation. Before a batch is activated for calling, require the relevant source/consent representations, approved permitted-use basis, suppression/DND procedure, calling-time/communication rules and vendor-provenance process to be confirmed by KBS compliance. Store source and do-not-contact controls; block or exclude records disallowed by approved policy. Official TRAI guidance on commercial-communication sender obligations and customer preferences is available at https://www.trai.gov.in/advice-to-senders and https://www.trai.gov.in/tcccpr. Exact legal interpretation and operational SOP must be approved for the actual campaign and telephony provider.

**[P0426](../source/prd-verbatim.md#p0426)** 21.3 Call recordings and communications consent

**[P0427](../source/prd-verbatim.md#p0427)** Use a compliant telephony route, give required disclosures, respect call recording/customer consent rules and apply purpose-specific recording access/retention. Automatic recording should be attempted on eligible connected calls through the chosen provider; report recording failures and never promise a recording exists if one does not. Store contact opt-out and restrict further calling. WhatsApp consent/template restrictions and document-delivery evidence must be respected as a separate communication channel.

**[P0428](../source/prd-verbatim.md#p0428)** 21.4 Aadhaar verification

**[P0429](../source/prd-verbatim.md#p0429)** An official UIDAI paperless offline e-KYC flow is a possible verification pattern when permissible; verify the signed payload according to UIDAI guidance and avoid unauthorized storage/share of Aadhaar data. The precise Aadhaar verification mode/provider, whether KBS is an eligible verification entity, consent, retention and audit must be approved before launch. UIDAI reference: https://uidai.gov.in/en/307-faqs/authentication/offline-aadhaar-data-verification-service.html.

**[P0430](../source/prd-verbatim.md#p0430)** 21.5 Operational security requirements

**[P0431](../source/prd-verbatim.md#p0431)** OTP rate limits, session expiry/revocation, server-enforced RBAC, authorization on every object/file/recording, app access policy, secure document/object storage, upload malware scanning, audit logs, secret handling and restricted exports are mandatory design concerns. Maintain an authorized mechanism for deleting/restricting records under applicable policy without silently deleting bank/payout audit trails needed for legitimate obligations. OPEN: final data-retention durations, records of consent, backup/restore targets, incident response owners, acceptable document stores and precise compliance obligations under KBS's contracts.
