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

## General planning-agent harness rules

- Read requested video transcripts during research and record the transcript
  method; never imply a video was watched when it was not.
- Keep a source ledger and distinguish fact, source claim, inference, and
  recommendation.
- Route DeepSeek to cheap, non-sensitive extraction and backend-heavy work;
  route creative/visual judgement to Claude and execution/verification to
  Codex. Keep secrets, customer data, regulated data, and sensitive IP out of
  untrusted model contexts.
- Refresh time-sensitive paths, URLs, repository state, tools, and claims.
  Record `last_verified`, provenance, confidence, and refresh/expiry conditions.
- Use COG as a pattern donor only: memory hygiene, independent evidence,
  explicit acceptance gates, bounded checkpoints, and propose-first harvest /
  retros. Do not create a second vault or load whole transcripts by default.
