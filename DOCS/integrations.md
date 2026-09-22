# External integration contracts

No bank-status or activation API is allowed. MIS remains authoritative. The PRD does not mandate vendor names/prices; collect dated quotes against actual volumes later.

| Port | Required behavior | Failure/retry evidence |
| --- | --- | --- |
| OTP | Request/verify challenge through approved provider with rate limits and expiry | unavailable/expired/wrong/limited; never fixed-code success |
| Identity | Permitted consent-based Aadhaar route and PAN/bank checks where approved | verified, mismatch, unavailable, pending; no inferred success |
| Telephony | Idempotent outbound request, provider ID, signed events, connection/end/duration and retrievable recording | attempted vs connected distinct; reconcile timeout before retry |
| WhatsApp | Approved handoff or Business Platform integration for PDF/ID/link | handed off is not sent/delivered; signed delivery reports if available |
| Storage | Private upload, MIME/size/hash, scan, purpose-bound authorized download | pending/clean/rejected/missing; no read before clean |
| Push | Recipient-scoped notification and authorized deep link | deduplication, retry, expiry; no sensitive push payload |

Each adapter accepts a correlation/idempotency key, returns a typed actual outcome and never writes bank facts. Production starts unavailable until configured. Test fixtures cannot be enabled by a request field or public variable. Verify webhook signature over original bytes, bound timestamp/replay IDs, and accept only known tenant/provider configuration.

Provider selection workstream: total OTP request/resend cost and abuse protection; identity authorization and minimum retained data; connected vs attempted telephony billing, bridge legs, rental, concurrency, recording storage/retrieval/retention; WhatsApp template/media pricing and consent; object egress/scan; service availability and reconciliation. The business must supply expected volumes. No unverified vendor is recommended here.
