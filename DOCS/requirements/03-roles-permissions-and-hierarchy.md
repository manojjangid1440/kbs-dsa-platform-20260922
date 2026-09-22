# 3. Roles, permissions and hierarchy

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0078–P0089.

**[P0079](../source/prd-verbatim.md#p0079)** 3.1 Role definitions

**[P0080](../source/prd-verbatim.md#p0080)** Role | Account origin | Data access | Main responsibilities

**[P0081](../source/prd-verbatim.md#p0081)** Admin (company owner) | One company-owner Admin | Organization-wide | All configuration, imports, card content, training, users, teams, analytics, MIS review, payout approval and audit.

**[P0082](../source/prd-verbatim.md#p0082)** Manager | Authorized organizational creation (exact creation permission OPEN) | Own reporting team; broad Admin-approved operational scope | Create and supervise Telecallers, reactivate training, WFH exceptions, oversee assigned Advisors, review metrics/recordings and approve payouts. Mobile and web.

**[P0083](../source/prd-verbatim.md#p0083)** Telecaller | Manager only | Own assigned calling customers and own operational activity | Complete training; call from app; see pincode cards; share WhatsApp material; record outcomes, follow-up and links. Monthly salary, no card-based payout claim.

**[P0084](../source/prd-verbatim.md#p0084)** Advisor / FOS | Self-register through app | Own leads, own eligible cards/payouts; own profile | Identity/bank onboarding, choose card, capture customer details, initiate/share issuer link, review bank MIS status, request payouts.

**[P0085](../source/prd-verbatim.md#p0085)** Accounts | Authorized organizational creation (exact creator OPEN) | Approved payout data and required payee details | Review approved payment queue, make payment  outside  the application, record payment reference and upload proof. No bank-status edits.

**[P0086](../source/prd-verbatim.md#p0086)** 3.2 Reporting relationships

**[P0087](../source/prd-verbatim.md#p0087)** A Manager-created Telecaller is assigned to that Manager and cannot see another Manager's records. An Advisor enters an Agent Code during signup or later; a valid code attaches the Advisor to its designated person/Manager. If code is blank, the Advisor belongs under the Admin. The Advisor's applications and activated-card results are attributed through that reporting hierarchy. OPEN: whether changing/adding an Agent Code after prior lead creation changes historical lead/payout attribution, and how an Admin-direct Advisor receives the mandatory Manager payout approval. Neither rule can be silently presumed; historical attribution must remain auditable.

**[P0088](../source/prd-verbatim.md#p0088)** 3.3 Permission safeguards

**[P0089](../source/prd-verbatim.md#p0089)** Permission enforcement must occur server-side as well as in UI, scoped to organization, reporting line, assignment and record type. A Manager cannot access unrelated teams, a Telecaller cannot pull the entire imported customer list, an Advisor cannot see another Advisor's PAN/bank details, and Accounts cannot alter the MIS. Admin access to sensitive data must be limited to legitimate function even though Admin has organization-wide business visibility. Capture access/edit/export/download activity for sensitive records where technically feasible.
