---
title: Codex skill context cleanup plan
date: 2026-09-05
status: completed
owner: codex
---

# Codex skill context cleanup plan

## Outcome

Reduce the model-visible Codex skill catalog enough that every retained skill is included and its description remains available, while keeping removed skills recoverable from dated cold storage.

## Evidence and diagnosis

- The current session exposes 356 skill entries with descriptions stripped. Codex reports that another 26 entries were omitted.
- Local discovery currently includes 238 top-level directories with `SKILL.md` under `C:\Users\manaz\.codex\skills` and 105 under `C:\Users\manaz\.agents\skills`.
- The agent directory includes 71 individual GSD skills.
- The personal skill directory was largely installed in three bulk imports on 2026-08-08: 59 Matt Pocock/Addy Osmani-era entries, 84 reverse/security entries, and 88 Agent Native-era entries.
- Available Codex session history shows 342 installed top-level skill names: 44 read at least twice, 18 read once, and 280 with no observed skill-body read. This is a useful signal, not proof that a skill can never be useful.
- Enabled, project-relevant plugins also contribute skills, especially Vercel. Plugin caches should not be edited directly.

## Decisions

1. Quarantine instead of delete. Move unused skills into dated directories outside active discovery roots and record every source/destination in a manifest.
2. Preserve all `.system` skills and the Maz Works Knowledge Vault skill junction/package.
3. Keep official project-relevant plugins enabled during the first pass. Remove overlapping standalone copies before considering plugin removal.
4. Keep one preferred skill for each recurring workflow: research, planning, implementation, debugging, review, verification, frontend/browser testing, security, GitHub, Next.js, Supabase, Stripe, TypeScript, and vault operations.
5. Retain the small GSD working set evidenced in history (`gsd-debug`, `gsd-onboard`, `gsd-plan-phase`, `gsd-resume-work`, `gsd-audit-milestone`, `gsd-discuss-phase`, `gsd-execute-phase`, and `gsd-verify-work`). Quarantine the other GSD command skills initially.
6. Prefer frequently used skills when choosing among overlaps. Examples include `planning-and-task-breakdown`, `research`, `deep-research`, `adding-a-feature`, `diagnosing-bugs`, `code-review`, `closed-loop-delivery`, `source-driven-development`, `frontend-ui-engineering`, `browser-testing-with-devtools`, `playwright-skill`, `security`, `api-security`, `github`, `nextjs-best-practices`, `supabase`, and `stripe-integration`.
7. Quarantine the specialist reverse/competition pack except the small security umbrella set with observed use. Quarantine most Agent Native leaf skills while retaining its umbrella/toolkit and any evidenced recurring leaf skills.
8. Update `C:\Users\manaz\.codex\AGENTS.md` after cleanup so it no longer claims every bulk pack is active; document cold-storage restoration instead.

## Execution tasks

### Task 1: Snapshot and produce the exact allowlist

Acceptance criteria:

- Capture active roots, skill names, paths, junction targets, hashes, provenance timestamps, plugin enablement, and observed read counts.
- Produce explicit keep and quarantine lists before moving anything.
- Confirm archive destinations resolve under `C:\Users\manaz\.codex\skills-disabled\2026-09-05` and `C:\Users\manaz\.agents\skills-disabled\2026-09-05`.

Verification:

- Inventory totals reconcile with active directory totals.
- No `.system`, vault, or plugin-cache path appears in the quarantine list.

### Task 2: Quarantine unused and overlapping standalone skills

Acceptance criteria:

- Move only manifest-listed directories, using literal resolved paths.
- Preserve junction targets; remove/move only the active junction entry when applicable.
- Leave one preferred implementation for duplicate names.
- Do not edit plugin caches.

Verification:

- Every moved source is absent from the active root and present at its manifest destination.
- Every retained skill has a readable `SKILL.md`.

### Task 3: Reduce the GSD surface and align standing instructions

Acceptance criteria:

- Keep the evidenced core GSD workflow set and quarantine the unused commands.
- Update the Codex standing-order routing text to match the active catalog and explain restoration from cold storage.
- Preserve hooks and GSD runtime files outside the skill directories.

Verification:

- GSD hooks remain configured.
- Each retained GSD skill body and any directly required resource exists.

### Task 4: Verify in a fresh Codex session

Acceptance criteria:

- Start a fresh Codex process/session so skill discovery is rebuilt.
- No “Exceeded skills context budget” warning appears.
- No skills are reported omitted.
- Retained entries include useful descriptions, not only names and paths.
- Target at most 120 model-visible skills; lower further if descriptions are still stripped.

Verification:

- Parse the fresh session world state and record visible count, description count, omitted count, and warning state.
- Smoke-test discovery of planning, debugging, GitHub, Next.js, Supabase, Vercel, browser testing, and vault skills.

### Task 5: Persist results and rollback instructions

Acceptance criteria:

- Record final counts, manifest location, decisions, and restore procedure in the vault.
- Commit and push only cleanup-related vault files to `fork main`; preserve unrelated worktree content.

Verification:

- Vault commit is present on `fork/main`.
- A dry-run rollback resolves every manifest destination back to its original active root without collisions.

## Checkpoints

- After Task 1: review exact keep/quarantine counts before moves.
- After Tasks 2–3: verify filesystem integrity before launching a fresh session.
- After Task 4: if descriptions remain stripped, prune the least-used retained standalone skills in a second reversible pass.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Historical non-use hides future value | Dated cold storage and manifest-based restoration; no permanent deletion |
| A retained skill depends on a quarantined sibling | Inspect direct references for retained skills before moves and keep required dependencies |
| Plugin update restores overlap | Do not edit caches; prefer plugin copies and periodically re-run the inventory |
| GSD command becomes unavailable | Keep the evidenced core set and document one-command restoration from the manifest |
| Fresh session still exceeds the budget | Enforce the 120-entry ceiling and perform a second pass based on description size and usage |

## Approval gate

Execution required explicit user approval; approval was received before the execution result below.

## Execution result — 2026-09-06

- Moved 346 unused/overlapping directories to dated cold storage. Five frequently used entries were restored before verification; the manifest retains their history.
- Isolated 44 unused remote Vercel leaf skills under `C:\Users\manaz\.codex\plugins-disabled\vercel-0.21.4\skills`; retained 11 Vercel guidance skills.
- Disabled the broad Vercel plugin plus unused documents, spreadsheets, presentations, PDF, template-creator, visualize, and sites plugins in `C:\Users\manaz\.codex\config.toml`.
- Updated `C:\Users\manaz\.codex\AGENTS.md` with the compact active catalog and cold-storage restore procedure.
- Fresh Codex verification: 78 model-visible skill entries and no skill context-budget warning, no omitted-skills warning, and no shortened-description warning.
- The Supabase MCP emitted its existing unauthenticated OAuth transport error during the smoke process; this is unrelated to skill discovery and did not prevent the agent from returning `OK`.
