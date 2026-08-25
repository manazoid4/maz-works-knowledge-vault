# Archived legacy memory system

This directory preserves pre-cutover root namespaces superseded by the current Maz Works Knowledge Vault structure.

Archived on: 2026-08-25

## Canonical replacements

| Archived path | Current source of truth |
|---|---|
| `00_Hermes/` | `.agent-context/AGENT_SYSTEM.md`, `AGENTS.md`, `wiki/hot.md`, `wiki/projects/`, `wiki/sessions/` |
| `_Hermes/` | `wiki/projects/` plus targeted project/session retrieval |
| `03-MEMORY/` | `wiki/projects/`, `wiki/hot.md`, `wiki/index.md`, `wiki/sessions/` |
| `04-SESSIONS/` | `wiki/sessions/` |
| `06-SYSTEM/` | `.agent-context/AGENT_SYSTEM.md`, `AGENTS.md`, current skills and hooks |
| `99_Inbox/` | `Local Knowledge/` for ingestion; historical merge reports remain archived here |

## Why these moved

The archived namespaces describe earlier July-era memory and session protocols. Several files point at paths that no longer exist or contain dated task state. The August identity migration established `wiki/projects/`, `wiki/sessions/`, `wiki/hot.md`, neutral junctions, and `.agent-context/AGENT_SYSTEM.md` as the active operating layer.

Nothing in this archive should be treated as current operational truth unless it is re-verified against the live vault and environment.

## Project namespace cleanup

The old `02-PROJECTS/` and `10_Projects/` roots were also removed from the active root in the same cleanup series, but their useful material was not discarded:

- project-specific content moved under `wiki/projects/<project>/legacy-imports/`;
- the legacy Zawiyah summary moved under `Archive/legacy-project-summaries/` rather than into active shared project memory;
- the Scrap Finance Partners gitlink moved to `external/scrap-finance-partners` with `.gitmodules` updated atomically.

Historical paths remain recoverable through Git history.
