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

## Cleanup classification

### Safe to archive now

The following root namespaces are legacy operating structures and are superseded by the current wiki/agent system:

- `00_Hermes/`
- `_Hermes/`
- `03-MEMORY/`
- `04-SESSIONS/`
- `06-SYSTEM/`
- `99_Inbox/` (currently historical vault-merge material)

They are moved intact to `Archive/legacy-memory-system-2026-07/` so history remains available without presenting stale files as live truth.

### Needs content-aware migration before removal

- `02-PROJECTS/` — contains later project artifacts, including MAZ Pocket field/interface work from August.
- `10_Projects/` — contains unique recovered project material and a tracked gitlink/submodule.

Do not bulk-delete either directory. Migrate project-by-project into `wiki/projects/<project>/` and only then remove the old namespace.

## Recommended next migration pass

1. Create canonical `wiki/projects/agent-nudge/`, `wiki/projects/hermes/` and any other missing active project hubs.
2. Move unique `02-PROJECTS/<project>/` material into the matching canonical project hub, preserving dates and filenames where useful.
3. Reconcile `10_Projects/*.md` against canonical project hubs; migrate unique facts, archive superseded summaries.
4. Decide a stable location for the Scrap Finance Partners gitlink before removing `10_Projects/`; update `.gitmodules` atomically if it moves.
5. Run link/lint/retrieval tests after migration.
6. Only then remove the empty legacy namespaces.

## Machine integration direction

The neutral machine-wide contract should remain the existing Maz Works vault/junction model. Agent-specific adapters should point into this one knowledge system rather than cloning COG per agent.

A future integration should expose adapted skills through the existing multi-agent skill package and keep one canonical knowledge graph. MAZ Pocket can consume compact project/hot summaries from this same source rather than own a separate durable brain.

## Guardrails

- Preserve Git history and provenance.
- Never copy third-party code without compatible licensing and attribution.
- No second general-purpose vault.
- No whole-vault context loading.
- Environment-dependent memory must be re-verifiable.
- Private-boundary knowledge remains outside the shared public vault.
