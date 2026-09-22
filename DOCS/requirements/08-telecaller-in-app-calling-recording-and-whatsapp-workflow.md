# 8. Telecaller in-app calling, recording and WhatsApp workflow

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0144–P0162.

**[P0145](../source/prd-verbatim.md#p0145)** 8.1 Call-screen design and interaction sequence

**[P0146](../source/prd-verbatim.md#p0146)** Telecaller opens assigned customer -> sees customer summary and pincode-matched card choices -> taps Call -> the call is placed using a business telephony solution integrated with the app -> status of call establishment appears without hiding the customer's card details -> Telecaller may expand a card and use WhatsApp share actions from the same screen -> after the interaction, Telecaller records call result, selected/shared card, notes and follow-up or hide action -> the Manager/Admin sees the full activity trail and recording when one is available. An internet-hosted business telephony/call-bridging service may be used; the PRD does not promise unrestricted native PSTN call recording from a standard Android third-party app.

**[P0147](../source/prd-verbatim.md#p0147)** 8.2 Telephony functional requirements

**[P0148](../source/prd-verbatim.md#p0148)** •  Start an outbound call from the app's Call action; associate call ID, calling Telecaller, assigned customer, target number, initiated time, provider result, connect/end time if reported and duration with one activity.

**[P0149](../source/prd-verbatim.md#p0149)** •  Provide comprehensible states such as requesting connection, ringing (if provider supports), connected, ended, failed, no answer and recording available/unavailable; distinguish provider-confirmed state from user-selected outcome.

**[P0150](../source/prd-verbatim.md#p0150)** •  Recording should be initiated automatically through the selected authorized telephony provider when legally and technically available; expose playback to assigned Manager and Admin under access policy and keep recording linked to the correct call/customer.

**[P0151](../source/prd-verbatim.md#p0151)** •  If call initiation or recording fails, show the failure and permit a safe retry; never show 'Recorded' unless a retrievable recording exists. Avoid duplicate attempts caused by a double tap.

**[P0152](../source/prd-verbatim.md#p0152)** •  The recording architecture/provider, per-minute costs, concurrent-call capacity, number masking/caller ID, consent disclosure, recording retention, retrieval fees and uptime support are OPEN provider-selection decisions. Select on total cost and reliable recording, not just headline per-minute price.

**[P0153](../source/prd-verbatim.md#p0153)** 8.3 Customer context retained on the calling screen

**[P0154](../source/prd-verbatim.md#p0154)** Show name, masked/mobile number as role permits, pincode, location if verified, assigned Telecaller, recent activity and follow-up status; a card list filtered by current pincode mapping; card benefits, applicable fees, PDF link and application link; call outcome and remarks editor; share actions for PDF, official ID and card link. Avoid navigating away from the live calling context merely to see benefits or send information.

**[P0155](../source/prd-verbatim.md#p0155)** 8.4 Official Telecaller identity card

**[P0156](../source/prd-verbatim.md#p0156)** Generate an official KBS employee/office ID card at Telecaller account creation; the purpose is to let a customer identify the person/company contacting them. The card must be shareable by the user from the customer call interface. Exact ID-card fields, photo/logo, expiry/revocation rules and validation method are OPEN; do not put unnecessary PAN, customer data or payout information on it. Regenerate or revoke its shareable representation on account deactivation as required by an approved policy.

**[P0157](../source/prd-verbatim.md#p0157)** 8.5 WhatsApp sharing

**[P0158](../source/prd-verbatim.md#p0158)** Offer distinct Send benefit PDF, Send office ID, and Send application link actions for the customer's WhatsApp number. Use Admin-approved current card content/links. Show a clear hand-off/send result based on the chosen integration: opening a compose/share sheet is not proof of delivery; provider-confirmed delivery, where available, is recorded separately. Record who initiated sharing, customer, card, asset/link version, timestamp and actual known outcome. Where a customer has not consented to business-initiated WhatsApp messages, follow approved WhatsApp Business/communications policies rather than silently sending promotional content. Exact WhatsApp integration method, template approval, message pricing and media-hosting costs are OPEN.

**[P0159](../source/prd-verbatim.md#p0159)** 8.6 Operational call-outcome taxonomy

**[P0160](../source/prd-verbatim.md#p0160)** Keep Telecaller-entered operational outcomes distinct from bank MIS fields. At minimum support: no answer/unreachable or technical failure; connected and interested; connected and link/PDF requested/shared; callback/follow-up needed; customer declined/not interested; completed interaction/no further calling; and optional remarks. The Admin may refine the operational taxonomy without creating bank application-stage values. Require a reason/notes when choosing follow-up/declined if configured. Hide declined/completed rows from the active call queue but do not delete them. A customer request not to be contacted must be enforced as a suppression, including across new imports.

**[P0161](../source/prd-verbatim.md#p0161)** 8.7 Telecaller 'lead' terminology and attribution

**[P0162](../source/prd-verbatim.md#p0162)** The original requirements mention that Telecallers can create leads when sending a credit-card link, but later clarify that Telecallers are salaried and should not own Advisor-like commission leads. Implement an operational calling lead/interest record tied to customer, card, link and Telecaller activity, usable for Manager/Admin performance analysis and later MIS matching where KBS receives a reliable reference. It does not grant card payout to the Telecaller and does not create an invented bank status. If an Advisor later submits a separate commission-bearing application for the same customer, attribution and collision rules require OPEN business definition; do not double-count the application.
