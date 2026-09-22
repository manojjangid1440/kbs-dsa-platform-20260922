# Start here

This repository is the durable product memory. Read [memory/STATUS.md](memory/STATUS.md) for what actually exists and [memory/NEXT.md](memory/NEXT.md) for the next executable task. No chat history is necessary.

## Reading paths

- Product: [requirements/README.md](requirements/README.md), [analysis/gaps-and-improvements.md](analysis/gaps-and-improvements.md), [decisions/open-decisions.md](decisions/open-decisions.md).
- Engineering: [architecture.md](architecture.md), [data-model.md](data-model.md), [contracts/api.md](contracts/api.md), [security.md](security.md), [testing.md](testing.md).
- Delivery: [features/README.md](features/README.md), [traceability.md](traceability.md), [release-gates.md](release-gates.md).
- UX: [design-system.md](design-system.md), full source sections 12, 20 and 25.
- Operations: [operations.md](operations.md), [integrations.md](integrations.md), [decisions/README.md](decisions/README.md).

## Coverage and truth

The full 31 PRD sections are reproduced with stable paragraph IDs; the original DOCX and complete extraction are retained. Feature files are small work packages, not substitutes for detailed requirements. Acceptance criteria are copied without shortening into `testing/source-acceptance.md`. All initial OPENs are retained and additional engineering gaps are explicitly identified as proposals.

Status words: PLANNED = specified only; CORE = pure shared logic implemented; SCAFFOLDED = application entry/build exists without completed journey; VERIFIED = named check executed; BLOCKED = external/business dependency prevents completion; DONE = end-to-end acceptance satisfied. Never equate these labels.
