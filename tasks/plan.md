# Implementation Plan: Ox Alpha Portfolio Audit-to-Build Batches

## Overview

Replace the broad 30-test sampler with a focused audit system for nine priority repositories: JobFilter, Maz Works, Scrap Finance Partners, Agent Nudge, FlowLens, VoxPane, Maz Pocket, OmniScribe, and InkWeave. Hermes/Ox Alpha will work in bounded batches, treat GitHub default-branch commits as code truth, reconcile the GitHub-backed knowledge vault and local worktrees without silently mixing them, and finish every project with a complete build-agent prompt for one evidence-producing tranche.

## Architecture Decisions

- Separate observed popularity from commercial potential. Current stars are nearly flat; 14-day GitHub traffic is useful but noisy, especially clone counts.
- Use three batches of three projects to prevent context contamination and weak cross-project claims.
- Give each Hermes run a dedicated audit workspace; source repositories remain read-only.
- Require claim-level source labels tied to repository/vault commit SHAs and exact paths.
- Make GitHub default branch the shipped-code authority, the vault the decision/context authority, and local worktrees explicitly local-only evidence.
- End every audit with a standalone build prompt scoped to one vertical slice, with branch, tests, acceptance criteria, non-goals, safety gates, and stop conditions.
- Use a final synthesis pass only after all three batches exist.

## Batch Order

1. **Immediate commercial leverage:** JobFilter, Maz Works, Scrap Finance Partners.
2. **Strong next wedges:** Agent Nudge, FlowLens, VoxPane.
3. **Proof before investment:** Maz Pocket, OmniScribe, InkWeave.

## Task List

### Phase 1: Evidence foundation

- [x] Pull the Maz Works Knowledge Vault from `fork main`.
- [x] Verify GitHub repository names, visibility, archive state, branches, pushes, stars, and descriptions.
- [x] Query owner-visible 14-day views and clones for all nine repos.
- [x] Resolve known local repository paths and identify absent local clones.
- [x] Read current vault context and selected GitHub READMEs.

### Checkpoint: Foundation

- [x] Popularity claims are labelled as observed metrics, not broad market demand.
- [x] Batch order balances attention, revenue proximity, readiness, risk, and speed to proof.
- [x] Source precedence and hallucination controls are explicit.

### Phase 2: Prompt system

- [x] Write one bootstrap prompt that establishes workspace, manifests, source snapshots, citations, and safe operating rules.
- [x] Write three independent batch prompts with project-specific audit questions.
- [x] Write a final synthesis prompt that ranks tranches without losing project evidence.
- [x] Define the required audit and build-prompt schemas.

### Checkpoint: Prompt quality

- [x] Every project produces `audit.md`, `market-readiness.md`, and `build-prompt.md`.
- [x] Every build prompt is executable by a fresh build agent without the audit conversation.
- [x] Unknown, unavailable, archived, private, or locally divergent state cannot be silently converted into fact.

### Phase 3: Delivery

- [x] Save the canonical guide in the vault and an identical Hermes knowledge copy.
- [x] Update vault index, log, hot cache, and session note.
- [x] Verify project count, batch count, paste-block count, source labels, copy hashes, and secret scan.
- [x] Commit and push the vault to `fork main`.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| One long run cross-contaminates project facts | High | Three bounded batches; one project evidence ledger at a time. |
| Local work differs from GitHub | High | Never merge silently; label `LOCAL-ONLY` and audit GitHub SHA separately. |
| Traffic is mistaken for demand | High | Report window and noise; combine with readiness and revenue evidence. |
| Audit produces an oversized roadmap | High | One vertical tranche and one standalone build prompt per project. |
| Model claims tool use it did not perform | High | Source manifest, exact citations, command evidence, and automatic-fail rules. |
| Legal/compliance claims become advice | High | Treat as risks requiring qualified verification; no trading/deployment actions. |

## Open Questions

- None required for v1. Actual audit evidence may reorder the projects; the final synthesis prompt is required to show reversal conditions.
