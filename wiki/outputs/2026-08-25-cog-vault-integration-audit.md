---
type: audit
title: "COG integration and vault topology audit"
date: 2026-08-25
status: active
tags: [vault, agents, memory, cog, cleanup]
---

# COG integration and vault topology audit

## Verdict

Do **not** install COG as a second general-purpose vault and do not replace the existing Maz Works Knowledge Vault structure.

The current vault already provides the stronger foundation for this environment: a canonical cross-project identity, Obsidian markdown, Git history, targeted project/session memory, source-first ingestion, hybrid retrieval, write locking, verification tooling, multi-agent skill links, and neutral machine junctions.

Treat COG (`huytieu/COG-second-brain`) as an MIT-licensed **pattern donor**. Adapt the few capabilities that improve the existing operating loop instead of importing its directory tree wholesale.

## Current operating layer

Keep these as active sources of truth:

- `AGENTS.md`
- `.agent-context/AGENT_SYSTEM.md`
- `HOME.md`
- `wiki/hot.md`
- `wiki/index.md`
- `wiki/projects/`
- `wiki/sessions/`
- `Local Knowledge/`
- `skills/`, `agents/`, `commands/`, `hooks/`
- retrieval, locking, ingestion and verification scripts/tests

## COG capabilities worth adapting

### High priority

1. **Memory hygiene** — periodically re-verify environment-dependent facts such as paths, repository names, URLs and tool locations; record `last_verified` and confidence instead of trusting old memory indefinitely.
2. **Closed-loop verification** — express acceptance criteria explicitly and require independent evidence before a build or automation is called complete.
3. **Harvest + retro** — convert session learnings into proposed durable improvements, with review rather than uncontrolled self-modification.
4. **Ultragoal / durable long-running goal state** — useful for multi-session projects and build-agent work that must survive context resets.

### Medium priority

5. **Knowledge consolidation** — periodic synthesis of scattered notes into maintained concepts and project summaries.
6. **Weekly check-in** — adapt as a concise operator/business review driven by actual project/session evidence rather than a second journaling hierarchy.
7. **Braindump classification** — useful only if routed into the existing Capture / Local Knowledge / project structure; do not create parallel COG folders.

### Mostly duplicate or defer

- COG auto-research overlaps the existing `autoresearch` skill.
- COG's separate PM/content/design skill catalog should be adopted only task-by-task when it solves a real gap.
- Do not import COG's full root taxonomy, personal CRM structure, iCloud assumptions, or duplicate agent manifests by default.

## Cleanup completed in this audit

### Legacy memory/session namespaces

Moved intact under `Archive/legacy-memory-system-2026-07/`:

- `00_Hermes/`
- `_Hermes/`
- `03-MEMORY/`
- `04-SESSIONS/`
- `06-SYSTEM/`
- `99_Inbox/`

These remain available as history but no longer compete with current paths for agent attention.

### Legacy project namespaces

Removed the old `02-PROJECTS/` root by relocating each project subtree intact:

- Agent Nudge → `wiki/projects/agent-nudge/legacy-imports/02-PROJECTS/`
- Hermes → `wiki/projects/hermes/legacy-imports/02-PROJECTS/`
- JobFilter → `wiki/projects/jobfilter/legacy-imports/02-PROJECTS/`
- MAZ Pocket → `wiki/projects/maz-pocket/legacy-imports/02-PROJECTS/`
- MazOS → `wiki/projects/mazos/legacy-imports/02-PROJECTS/`
- Recall → `wiki/projects/recall/legacy-imports/02-PROJECTS/`

Removed the old `10_Projects/` root by relocating its unique summaries to the matching project `legacy-imports/` folders. The legacy Zawiyah summary moved into Archive to preserve the private-boundary rule. The Scrap Finance Partners gitlink moved to `external/scrap-finance-partners`, with `.gitmodules` changed in the same commit.

## Remaining cleanup candidates

Do not delete these automatically; audit individually first:

- root `Ralph_Execution_Log*.md` files;
- old historical references inside archived notes;
- legacy repository aliases outside this repository;
- duplicate project summaries inside `legacy-imports/` after their useful facts are distilled into current project hubs.

## Machine integration direction

The neutral machine-wide contract should remain the existing Maz Works vault/junction model. Agent-specific adapters should point into this one knowledge system rather than cloning COG per agent.

A future integration should expose adapted skills through the existing multi-agent skill package and keep one canonical knowledge graph. MAZ Pocket can consume compact project/hot summaries from this same source rather than own a separate durable brain.

## Recommended implementation sequence

1. Add a Maz Works-native `memory-hygiene` skill first.
2. Add closed-loop evidence/acceptance patterns to the existing verifier rather than importing COG's whole harness.
3. Add harvest/retro as propose-first updates to durable knowledge.
4. Add durable multi-session goal state only where it improves current build-agent workflows.
5. Add a lightweight weekly operator review after the Work/consistency data model stabilizes.
6. Keep braindump ingestion routed through existing Capture / Local Knowledge paths.

## Guardrails

- Preserve Git history and provenance.
- Never copy third-party code without compatible licensing and attribution.
- No second general-purpose vault.
- No whole-vault context loading.
- Environment-dependent memory must be re-verifiable.
- Private-boundary knowledge remains outside the shared public vault.
