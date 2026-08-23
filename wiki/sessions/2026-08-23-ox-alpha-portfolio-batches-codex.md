---
date: 2026-08-23
project: ox-alpha-portfolio-batches
agent: codex
status: completed
---

## What I did

- Pulled the shared vault and verified all nine requested GitHub repositories using GitHub CLI.
- Recorded default branches, visibility, archive state, descriptions, recency, stars, and owner-visible 14-day traffic.
- Verified known local paths and identified that VoxPane, OmniScribe, and InkWeave do not have confirmed standalone local clones; InkWeave is archived on GitHub.
- Read current vault context for Maz Pocket, Maz Works, FlowLens, Scrap Finance Partners, JobFilter, InkWeave, and Agent Nudge, plus GitHub READMEs for Agent Nudge, VoxPane, OmniScribe, and JobFilter.
- Replaced a monolithic test approach with five paste blocks: bootstrap, three project batches, and final synthesis.
- Required claim-level GitHub/vault/local/external labels and source snapshots tied to exact SHAs.
- Required every project audit to output a complete standalone build-agent prompt for one small evidence-producing tranche.
- Installed the guide in the vault and Hermes knowledge directory.

## Files changed

- `tasks/plan.md`
- `tasks/todo.md`
- `wiki/questions/ox-alpha-hermes-portfolio-audit-build-prompt.md`
- `wiki/index.md`
- `wiki/log.md`
- `wiki/hot.md`
- `wiki/sessions/2026-08-23-ox-alpha-portfolio-batches-codex.md`
- `C:\Users\manaz\.hermes\knowledge\ox-alpha-hermes-portfolio-audit-build-prompt.md` (local Hermes copy)

## Decisions made

- GitHub stars are too sparse to rank the portfolio; traffic is recorded but treated as noisy attention, not demand.
- Batch 1 prioritises credible near-term money: JobFilter, Maz Works, Scrap Finance Partners.
- Batch 2 prioritises differentiated products requiring adoption/paid proof: Agent Nudge, FlowLens, VoxPane.
- Batch 3 uses hard validation gates for Maz Pocket, OmniScribe, and archived InkWeave.
- GitHub default branch is authoritative for shipped code; vault GitHub main is authoritative for durable decisions; local dirty work is labelled local-only.
- Audit agents never modify products. Build agents receive separate, SHA-anchored prompts and use `agents/` branches.

## Next steps

- Paste Bootstrap into the current Hermes/Ox Alpha session and wait for `BOOTSTRAP COMPLETE`.
- Paste Batch 1 and review the three build prompts before continuing.
- Run Batches 2 and 3 in the same audit run, then paste Final Synthesis.
- Start only the highest-ranked `RUN NOW` build prompt and preserve the remaining prompts as a gated queue.
