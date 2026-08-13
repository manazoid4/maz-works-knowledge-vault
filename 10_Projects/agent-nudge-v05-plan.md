# Agent Nudge — v0.5 Plan Ideas (Multi-Agent, Multi-Perspective)

Saved 2026-07-24. Parked while installing tdd-guard.

## Current state (v0.4.0, on main)
Local-first Windows preflight + receipt layer for coding agents (Claude Code, Codex, OpenCode).
- SQLite ledger → localhost Fastify daemon (127.0.0.1:47831) → CLI/MCP/connector adapters → Electron+React UI.
- Live Connect: reversible provider hooks (owns exact fragments, backups outside repo, refuses drift, rolls back).
- Live Sync v1: sessions, expiring path claims, sourced facts, deterministic fan-out, sync cursor, HOLD/REVIEW/CLEAR, acknowledge/release.
- Delivery classes: BLOCK, ACT_NOW, NEXT_BOUNDARY, DIGEST, DROP. Schema already has supersedesFactId / invalidatesFactIds (core/schemas.ts).
- Public site = marketing/fixtures only, no context uploaded.
- Principles: deterministic + explainable routing, no transcript capture, no telemetry, no silent config writes, project isolation.

## v0.5 candidate directions
1. **Orchestration / hand-off scoping** — orchestrator agent assigns paths to workers; Nudge auto-generates BLOCK claims for out-of-scope edits + a recipient-scoped context pack with the planner's instructions. `agent-nudge handoff/scope`.
2. **Perspective / role-based routing** — agents check in with a `role`/`perspective` (frontend, backend, sec-reviewer, architect, planner). Relevance scoring (core/relevance.ts) uses publisher+recipient role. Same fact → BLOCK for backend, DIGEST for frontend.
3. **Multi-agent consensus / peer review** — new `REVIEW_REQUIRED` class; publishing agent can't release a claim until a *different* agent checks in, reads the pack, and acknowledges/supersedes. Multi-perspective = reviewer persona stamping the change.
4. **Cross-session debate (contradictory facts)** — when Agent B publishes a fact conflicting with Agent A's active fact on same path/scope, fire CONFLICT to both, force a superseding fact before claim clears. Uses existing supersedes/invalidates fields.

## Recommended v0.5 scope: "Perspective-Aware Routing & Handoffs"
- Roles/perspectives on check-in (optional).
- Targeted delivery: publish facts by `targetPerspective`, not just projectId.
- Review holds: new REVIEW class — claim can't release until a *different* agent/human acknowledges.

## Next step when resumed
Pick a direction, then write formal ISSUE.md + BUILD_PLAN.md. Work on `agents/*` branch, never push to main. Run full gate (lint/format/typecheck/unit/integration/e2e/build/demo/doctor/package:win) before completion claims.
