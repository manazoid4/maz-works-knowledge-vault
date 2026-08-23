# Implementation Plan: Ox Alpha Hermes 30-Test Benchmark

## Overview

Create a copy-paste benchmark for Ox Alpha running in Hermes through the local `MazLatest` custom endpoint (`127.0.0.1:20128`), which routes through 9router and OpenRouter. The benchmark will contain 30 useful tests across 10 business and product perspectives. Every test must produce an actionable artifact for JobFilter, InkWeave, OpenFlowKit, Zawiya, or the wider Maz Works portfolio, with friction reduction as the common evaluation lens.

## Architecture Decisions

- Use 10 sectors with three tests per sector so breadth is deliberate rather than random.
- Make every prompt self-contained, project-specific, and safe to paste into Hermes without requiring hidden context.
- Separate model-quality scoring from business usefulness: a fluent answer can still fail if it lacks evidence, prioritisation, or a lower-friction next action.
- Require assumptions and evidence labels so Ox Alpha is tested for honesty rather than rewarded for confident invention.
- Keep Zawiya prompts strictly public-safe and explicitly exclude private spiritual content.
- Store the canonical pack in the vault and a convenience copy in `.hermes/knowledge`.

## Task List

### Phase 1: Foundation

- [x] Task 1: Verify Hermes routing structure without reading or exposing secrets.
- [x] Task 2: Read current context for JobFilter, InkWeave, OpenFlowKit, and Zawiya.
- [x] Task 3: Define the 10-sector coverage map, friction taxonomy, and common scoring rubric.

### Checkpoint: Foundation

- [x] The pack reflects the local Hermes custom endpoint and current project realities.
- [x] Exactly 10 distinct perspectives are represented.
- [x] Privacy and hallucination guardrails are explicit.

### Phase 2: Core Benchmark

- [x] Task 4: Write 30 numbered, copy-paste prompts with three tests per sector.
- [x] Task 5: Add expected artifacts, pass signals, and failure signals for each test.
- [x] Task 6: Add a repeatable run protocol and results table for comparing runs or models.

### Checkpoint: Core Benchmark

- [x] All 30 prompts are independently runnable.
- [x] Each prompt reduces or measures a specific form of friction.
- [x] Outputs are useful even when the model performs imperfectly.

### Phase 3: Delivery

- [x] Task 7: Save the canonical benchmark in the vault and a Hermes knowledge copy.
- [x] Task 8: Update vault index, log, hot cache, and session note.
- [x] Task 9: Verify counts, coverage, links, Git diff, then commit and push to `fork main`.

### Checkpoint: Complete

- [x] Exactly 30 tests and 10 sectors are present.
- [x] No secrets or private Zawiya material are included.
- [x] Vault and Hermes copies match.
- [x] Vault changes are committed and pushed.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Prompts reward verbosity instead of usefulness | High | Enforce concise output contracts, prioritised actions, and decision-ready artifacts. |
| Ox Alpha invents repo facts it cannot inspect | High | Require evidence labels, assumptions, and `NOT VERIFIED` markers. |
| Tests become coding-heavy | Medium | Allocate exactly three prompts to each of 10 non-overlapping sectors. |
| Free routing varies between runs | Medium | Record route, latency, tool use, and score per run; repeat key tests. |
| Zawiya privacy boundary is crossed | High | Use only public-safe operational inputs and explicit exclusions in every Zawiya prompt. |

## Open Questions

- None required for v1. Results from the first run will determine which prompts become recurring audits or automated Hermes loops.
