# 20. UX, visual design and technology constraints

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0408–P0420.

**[P0409](../source/prd-verbatim.md#p0409)** 20.1 shadcn/ui requirement and platform reality

**[P0410](../source/prd-verbatim.md#p0410)** The web UI MUST use shadcn/ui components and a consistent design system; Tamagui and any substitute full UI framework must not be used. shadcn/ui's web component implementations are web/DOM oriented and cannot simply be imported as native Android controls. Build an aligned React Native component set following the same shadcn visual tokens/interaction principles (for example, a carefully vetted React Native shadcn-style component registry or in-house native components). This is a platform-compatible implementation of the user's design requirement, not a license to add an unrelated full UI framework. Shared tokens: spacing, typography, semantic colors, component shape, iconography, field/error states and interaction semantics.

**[P0411](../source/prd-verbatim.md#p0411)** 20.2 Product-level visual outcomes

**[P0412](../source/prd-verbatim.md#p0412)** Provide a polished, intuitive and consistent experience on Android and web with clear hierarchy, touch-friendly layouts, accessible contrast, readable numbers and restrained high-quality animations. Make primary tasks available immediately from each role's home; use progressive disclosure for large MIS data sets. Application stage, final decision, activation and payout state must each have visually distinct labels and explicit text, never color alone. Customers' sensitive fields are masked by default as appropriate. No screenshot/download control should undermine defined Telecaller privacy policy.

**[P0413](../source/prd-verbatim.md#p0413)** 20.3 Required components and responsive behaviour

**[P0414](../source/prd-verbatim.md#p0414)** •  Web: shadcn navigation/sidebar, cards, dialogs, command/search, accessible data tables, upload review steps, status badges, filters, date-range controls, drill-down detail views, documents/recording viewer and notification drawer.

**[P0415](../source/prd-verbatim.md#p0415)** •  Mobile: native bottom/tab/stack navigation, compact lead cards, expandable bank detail, robust OTP, multi-step form with persistent selected card, persistent calling controls, full-width WhatsApp actions, readable payout ledger and adaptive empty/error/loading states.

**[P0416](../source/prd-verbatim.md#p0416)** •  Shared UX patterns: explicit provenance chips (Bank MIS, KBS activity, Accounts payment); distinguish 'Awaiting MIS Update' from actual reported Inprocess; require confirmation for sensitive irreversible actions; display upload freshness and last matched status; provide safe retry without duplicate side effects.

**[P0417](../source/prd-verbatim.md#p0417)** 20.4 User-centred role specifics

**[P0418](../source/prd-verbatim.md#p0418)** Telecaller screen maximizes call context and card/share actions; Advisor minimizes effort in customer lead creation and clearly separates link initiation from actual bank results; Manager prioritizes team drill-down; Admin prioritizes data integrity and reports; Accounts prioritizes dual-approval audit, itemized payment and proof. If a bank column has no meaningful value, use 'Not reported' rather than an unlabeled dash. Never hide a conflicting MIS row behind a green aggregate KPI.

**[P0419](../source/prd-verbatim.md#p0419)** 20.5 Accessibility and localization

**[P0420](../source/prd-verbatim.md#p0420)** English only in initial release. Ensure readable text scaling, accessible labels/keyboard/focus on web, sufficient contrast, clear field-error descriptions and large touch targets. Some protected-screen controls may interact with accessibility services; evaluate security without silently blocking assistive technologies. India-oriented formatting (INR, local phone/date conventions) should be consistent while preserving raw source timestamps/time zones.
