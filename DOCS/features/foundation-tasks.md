# Initial core task sequence

These are deliberately smaller than full product features. Each task is an independent commit after the complete docs baseline. Task results and evidence belong in memory/STATUS.md.

- [x] C01 — Workspace tooling, exact dependencies, check orchestration and CI.
- [x] C02 — Strict shared contracts and environment/provider readiness.
- [x] C03 — Server-side role scope and Telecaller prerequisite policy core.
- [ ] C04 — Sequential training and 72-hour deadline core.
- [ ] C05 — MIS raw fields, exact reference matching and safe update semantics.
- [ ] C06 — Payout eligibility, reservation and dual-approval/payment transition core.
- [ ] C07 — PostgreSQL baseline and constraint smoke tests.
- [ ] C08 — API and worker foundation with health/readiness and denied protected routes.
- [ ] C09 — Shared tokens, shadcn web and native Android foundation shells.
- [ ] C10 — Verification, documentation integrity and recoverable handoff.

Core business helpers must not be exposed as production financial/authentication services before repositories, sessions and transaction gates are implemented. C07 smoke coverage does not prove real database races. C09 provides app foundations, not completed Android/web feature flows.
