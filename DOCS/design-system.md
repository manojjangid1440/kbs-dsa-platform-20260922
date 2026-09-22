# Design system and screen behavior

Implement the full source sections 12, 20 and 25, including all 29 FOS conceptual screens. Adjacent screens may be combined without removing fields or actions. Web uses shadcn/ui components; native uses React Native with shared tokens. No Tamagui or unrelated full UI framework.

## Visual direction

Calm operational workspace with dark navigation, neutral surfaces, teal primary action, strong readable typography, consistent rounded controls and spacious tables. Use warning/negative/success colors only alongside explicit text. Four distinct labels always remain visible where applicable: Stage, Decision, Activation, Payout. Provenance labels say Bank MIS, KBS activity or Accounts payment. Avoid a single success badge for mixed facts.

Shared tokens define semantic colors, spacing, radii and type sizes. Web components cover Button, Card, Badge, Input, Dialog, table/filter/search, sidebar and upload steps. Native primitives cover screen container, touch action, field/error, badge and compact lead card; native navigation must retain call controls while inspecting card details.

## Mandatory states

Each data screen has loading, empty, error, forbidden, unavailable provider/policy and populated states. Awaiting MIS is a meaningful state, not a spinner; Not reported means a matched field is blank/#N/A. Data recency belongs to each lead. Long raw bank text wraps in detail; tables offer compact preview without losing the complete original. Duplicate taps disable while pending and use server idempotency. Forms preserve safe draft progress and selected card; avoid persistent customer PII on unapproved device storage.

## Role navigation

Admin: Overview, Imports, Catalogue/Pincodes, People/Training, Leads, Calling, Payouts, Audit/Exceptions, Settings. Manager: Team, Calling/Followups, Advisors/Leads, Training/WFH, Approvals, Analytics. Accounts: Ready to pay, Paid, Exceptions, Payment detail/proof. Advisor Android: Home/Cards, Create lead, My leads, Payouts, Profile with notifications. Telecaller Android: Training gate then Queue/Followups, Calling desk, History, Official ID. Manager mobile mirrors authorized functions with compact cards.

## Critical interaction details

MIS upload: choose type/bank/profile → file/sheet → masked mapping/preview → conflicts/references → confirm exact revision → progress/results with row explanations. Never treat customer/pincode workbooks as interchangeable MIS.

Calling desk: persistent customer/call context, sourceable cards, expandable benefits/fees, PDF/ID/link actions, provider status, separate saved outcome and followup. Do not navigate away from live controls just to read a PDF or benefit.

Lead creation: mobile, name/basic details, PAN and real verification, pincode/location, one of three employment choices, annual income as per ITR, declarations/bureau acknowledgment, review, KBS reference, link action. Bank reference unavailable is explicit. History separates operational events and chronological accepted MIS changes; no fixed bank progression.

Payout: itemized evidence and immutable amounts; request confirmation; separate approval chips with actor/date; Accounts audit and external-transfer form; proof state; paid summary. Do not expose an in-app transfer action. Ambiguity becomes a visible exception.

## Accessibility

Keyboard/focus and labelled controls on web; touch targets at least 44 logical units as an engineering target; support text scaling, contrast and screen-reader labels. Use locale en-IN/INR and labelled date timezone. Responsive tables must remain usable on narrow web widths. Test ordinary and long/missing bank text, poor connectivity, empty queue and access revocation.

## Initial shell boundary

The initial web/native shells may show explicitly labelled synthetic examples to validate tokens and bank-field separation. They are not live dashboards, completed role journeys or proof of provider integration. Do not hide this distinction from users or mark feature specs done because a shell renders.
