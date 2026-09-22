# 19. Notifications and in-app event routing

Authority: source PRD; full section reproduced, not an overview. Source paragraph range P0399–P0407.

**[P0400](../source/prd-verbatim.md#p0400)** 19.1 Mandatory notifications

**[P0401](../source/prd-verbatim.md#p0401)** •  Telecaller/Manager: new assignment, training deadline/deactivation/reactivation, WFH grant/revocation, assigned follow-up due, call recording available/failure if operationally relevant.

**[P0402](../source/prd-verbatim.md#p0402)** •  Advisor: onboarding/verification issue, lead operational confirmation, new MIS match, actual MIS decision/stage/activation changes, bank-reported actionable issue, payout submission, Manager/Admin approval/rejection and Accounts payment confirmation.

**[P0403](../source/prd-verbatim.md#p0403)** •  Manager: Telecaller training exceptions, team operational items, Advisor request requiring Manager approval and resulting payment updates.

**[P0404](../source/prd-verbatim.md#p0404)** •  Admin: import completed/failed/unmatched/conflicted, bank mapping anomalies, company metrics where configured, Advisor request requiring Admin approval, payment exception and privileged-security event.

**[P0405](../source/prd-verbatim.md#p0405)** •  Accounts: request enters payment queue only after both approvals, request/payment exception and pending proof.

**[P0406](../source/prd-verbatim.md#p0406)** 19.2 Event semantics

**[P0407](../source/prd-verbatim.md#p0407)** An MIS alert cites which raw reported field changed and the date of the accepted matching batch; it must not say 'approved/activated' unless the specific relevant MIS field and configured rule support that claim. Deduplicate repeated identical imports and restrict recipient scope by ownership/hierarchy. A notification should deep-link to the correct authorized record; after ownership change or revocation, permission-check again before showing content. OPEN: push provider, expiry, customer-visible notifications (not requested) and escalation policy.
