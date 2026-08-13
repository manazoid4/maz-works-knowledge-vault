---
date: 2026-08-13
project: maz-works-knowledge-vault
agent: codex
status: completed
type: session
title: "Maz Works Knowledge Vault Identity Migration"
tags:
  - maz-works
  - vault
  - migration
  - agent-memory
related:
  - "[[wiki/meta/maz-works-knowledge-vault-identity]]"
  - "[[wiki/projects/project-locations]]"
---

# Maz Works Knowledge Vault Identity Migration

## What I did

- Created the standalone public repository `manazoid4/maz-works-knowledge-vault` and pushed the complete existing history before changing local identity.
- Moved the physical vault to `C:\Users\manaz\Desktop\Maz Works Knowledge Vault` without discarding local changes.
- Removed the former live-name junction and replaced tool entry points with `MazWorksKnowledgeVault`, `LocalKnowledgeVault`, and `maz-works-knowledge-vault` skill junctions for Codex, OpenCode, and Gemini.
- Updated Obsidian's registry to the new vault path and key.
- Rewired the Local Knowledge watcher and SwarmVault launcher through neutral junctions, then restarted and verified the scheduled watcher.
- Changed `origin` and `fork` to the standalone Maz Works repository while retaining the original MIT project as an `upstream` remote.
- Renamed the Claude package and marketplace metadata to `maz-works-knowledge-vault@maz-works`.
- Replaced active repository, agent, install, privacy, security, contribution, and integration instructions with Maz Works identity.
- Preserved original authorship, copyright, upstream history, and third-party licenses in `LICENSE` and `ATTRIBUTION.md`.

## Files changed

- Vault identity: `README.md`, `HOME.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.agent-context/AGENT_SYSTEM.md`.
- Package and integrations: `.claude-plugin/*`, `.cursor/rules/*`, `.windsurf/rules/*`, `.github/copilot-instructions.md`, `bin/*`, `commands/wiki.md`, selected `skills/*`.
- Maintainer docs: `ATTRIBUTION.md`, `CITATION.cff`, `CONTRIBUTING.md`, `PRIVACY.md`, `SECURITY.md`, `docs/*`.
- Knowledge memory: identity decision, project locations, overview, hot cache, log, and this session note.
- Machine integration: Codex/OpenCode standing orders, Codex trusted-project path, Claude local permissions/plugin state, Obsidian registry, and Local Knowledge Agent config/launcher.

## Decisions made

- **Maz Works Knowledge Vault** is the only active product and operating identity.
- The canonical repository is standalone rather than a fork so GitHub no longer frames the live vault as somebody else's named product.
- The original project name is allowed only in explicit upstream attribution, immutable source captures, historical notes, and Git history.
- Stable neutral junctions protect tools from future display-name changes without exposing the retired live name.
- JobFilter remains one contained project; it does not define the vault.

## Verification

- New repository created as public and non-fork; initial history pushed before migration.
- Git worktree reconciled after Windows interrupted the first directory move; no reset or content discard used.
- Obsidian registry parses and points only at the new path.
- Local Knowledge scheduled watcher runs through the new junction and no longer recreates the previous folder.
- Claude package manifest validation passes.
- All nine hermetic suites pass from a native Linux temporary tree (`make test`), including locking, concurrency, routing, retrieval, and contextual-prefix coverage.
- An active-file audit leaves the retired upstream name only in explicit attribution, historical notes, and source-derived filenames.
- Final remote and installed-plugin verification is recorded after the migration commit is published.

## Next steps

- Future agents use `C:\Users\manaz\Desktop\Maz Works Knowledge Vault` and read this note only if migration provenance is needed.
- Treat remaining old-name matches in historical/source material as provenance, not active naming.
