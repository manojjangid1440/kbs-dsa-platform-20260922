# ADR 002 Three independent authorities

Status: accepted engineering choice implementing PRD invariants. Date: 2026-09-22.

Operational events, bank MIS snapshots/history and payment ledger are distinct entities and write boundaries. Only accepted MIS processing updates bank fields. Preserve original spelling/value, source row and dates. Payout rules derive eligibility from evidence without mutating that evidence. No single catch-all application status.

Consequences: more explicit UI fields and provenance; safe replay and correction handling; exact references required; missing evidence stays unknown. No status provider integration or arbitrary direct bank-state editor is introduced.
