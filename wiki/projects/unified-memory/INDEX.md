---
title: Unified Memory Database
created: 2026-08-26
updated: 2026-08-28
type: project
status: active
tags: [projects, unified-memory, agents, context, gsd]
---
# Unified Memory Database

Local repository: `C:\Users\manaz\unified-memory-database`.

This is the cross-agent operational control plane for Codex, Claude, OpenCode,
Hermes, and routed models. It does not replace the Maz Works Knowledge Vault.
The vault stays canonical for long-form knowledge; unified memory holds small,
current, provenanced project status, decisions, plans, and execution pointers.

## Landed 2026-08-26

- `INDEX.md` as the small agent/human entry point.
- GSD-style `.planning/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, and
  `STATE.md`.
- Per-project current status, cross-project topics, bounded plans, and
  date-partitioned execution evidence.
- Legacy monolithic ledger retained but frozen as a compatibility page.

## Missing

- Start/end context adapters for each harness.
- A local append/query interface and schemas for facts, decisions, tasks,
  results, and conflicts.
- Automated indexes, staleness report, retention, secret scan, link lint, and
  vault provenance checks.
- Demonstrated write/read handoff across different agents.

## Operating contract

Every agent session saves a bounded outcome to unified memory before ending:
session ID, concise result, concrete evidence, and next action. The long-form
summary and changed-file list are mirrored in the Maz Works Knowledge Vault
session note, which is committed and pushed to `fork main`. If no indexed
project matches, the agent records the lookup and blocker instead of guessing.

Canonical audit and roadmap:
[[wiki/outputs/2026-08-26-maz-pocket-unified-memory-audit]].
