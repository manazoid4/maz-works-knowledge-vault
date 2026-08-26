---
date: 2026-08-26
project: maz-pocket-unified-memory
agent: codex
status: completed
---
## What I did

- Reconstructed the 24-26 August LeadFinder, MAZ Pocket, Maz Works marketing,
  and unified-memory work from sessions, project notes, Git history, and live
  code/runtime state.
- Tested the physical Pocket portal over hostname/direct IP, active/stale token,
  protected screen, desktop/mobile browser, Core route matrix, direct 9router
  aliases/models, local endpoint state, COM enumeration, and automated suites.
- Identified the retired MazLatest combo, invalid router authentication, down
  local engine, unhandled cloud exception boundary, route mismatch, stale token
  copy, and pairing UX failure.
- Reorganized unified memory into index/project/topic/plan/dated-ledger layers
  and wrote a GSD-structured reliability and memory roadmap.
- Rechecked LeadFinder's production frontend build and restated the five
  remaining P0s and truthful marketing boundary.
- Installed GSD Core v1.11.0 for Codex. A later non-interactive `--version`
  probe was interpreted by the package as an install command and also installed
  the same release for Claude Code. The originally supplied repository was
  archived and pointed to the maintained Open GSD distribution; no GSD workflow
  command was allowed to silently choose product decisions.

## Files changed

- `C:\Users\manaz\unified-memory-database`: README, legacy ledger banner,
  root index, `.planning`, project status, topics, plan, and dated ledger.
- `wiki/projects/maz-pocket/INDEX.md`
- `wiki/projects/leadfinder/STATUS.md`
- `wiki/projects/unified-memory/INDEX.md`
- `wiki/outputs/2026-08-26-maz-pocket-unified-memory-audit.md`
- `wiki/hot.md`, `wiki/index.md`, and this session note.
- Codex and Claude Code global GSD skills/agents/hooks installed by the official
  current npm package.

## Decisions made

- Treat unified memory as a small cross-agent operational control plane; keep
  the vault canonical for long-form knowledge.
- Keep strong machine credentials but replace human raw-token entry with a
  short-lived code exchange.
- Validate deterministic answers, including arithmetic, rather than treating
  HTTP success as correctness.
- Restore reliability and diagnostics before new Pocket features or AI polish.
- Do not select live paid providers or alter router costs without an explicit
  supported-model/cost decision.

## Next steps

1. Implement typed upstream errors and `/diagnostics` in MAZ Core.
2. Repair Core/9router auth and replace retired MazLatest members after model/
   cost selection; establish one independent fallback.
3. Implement and soak-test short-code pairing and portal reconnection.
4. Run guarded COM tests when the expected ADV port is present.
5. Wire one harness to unified memory and prove cross-agent handoff.
6. Execute LeadFinder's remaining P0 slices in dependency order.
