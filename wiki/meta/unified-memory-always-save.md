---
type: decision
title: "Always Save Agent Outcomes to Unified Memory"
created: 2026-08-28
updated: 2026-08-28
decision_date: 2026-08-28
tags:
  - unified-memory
  - agent-operations
  - persistence
status: active
related:
  - "[[wiki/projects/unified-memory/INDEX]]"
  - "[[wiki/sessions/2026-08-28-viral-video-pack-codex]]"
sources:
  - "[[wiki/projects/unified-memory/INDEX]]"
---
# Always Save Agent Outcomes to Unified Memory

All agent sessions persist a bounded outcome to the unified-memory database
before ending. The record includes the memory session ID, concise result,
concrete evidence, and next action. Use `memory.py end` and pass
`--update-status` only when the project's current truth changed.

The Maz Works Knowledge Vault remains the long-form canonical record. Each
session also writes a dated vault note with the decisions and changed files,
then commits and pushes the vault to `fork main`. If the task has no matching
indexed project, record that lookup and the blocker rather than fabricating
project context.
