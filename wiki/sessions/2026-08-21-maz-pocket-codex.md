---
date: 2026-08-21
project: maz-pocket
agent: codex
status: completed
---

## What I did

- Researched 15 open-source personal AI-agent and work-telemetry dashboards from GitHub and first-party Reddit posts.
- Extracted the recurring data, UI patterns, accuracy caveats and Cardputer-sized information architecture.
- Proposed separating human focus time, AI consumption, productive output and efficiency/health.
- Confirmed **MAZ Work** as the telemetry surface name while retaining MAZ Pocket for the physical device and firmware.
- Inspected the live GitHub repository, v0.8 release, PRs, issues, Actions,
  release workflow and current v0.8 code boundaries.
- Produced the complete v0.9.0 WORK implementation prompt, including
  transactional one-click MCP validation, repair and activation.
- Ran two independent app audits and a third release-slice selection pass.
- Organized every registered feature into keep, move, hide, defer and
  compatibility decisions, then wrote the controlling v0.9 architecture and
  ten vertical implementation tasks.

## Files changed

- `maz-pocket/docs/research/work-telemetry-landscape.md`
- `maz-pocket/docs/ideas/maz-work.md`
- `maz-pocket/docs/V090-MAZ-WORK-BUILD-PROMPT.md`
- `maz-pocket/docs/V090-FEATURE-ARCHITECTURE.md`
- `maz-pocket/tasks/plan.md`
- `maz-pocket/tasks/todo.md`
- `wiki/projects/maz-pocket/INDEX.md`
- `wiki/sessions/2026-08-21-maz-pocket-codex.md`

## Decisions made

- Maz Pocket remains the physical device/firmware identity.
- The proposed telemetry experience is private and owner-facing, not employer surveillance.
- Productive time must not be inferred from token volume or agent uptime.
- API-priced token totals must be labelled estimated API value, not actual spend.
- Confirmed the name **MAZ Work**.
- Proposed Cardputer home metrics: Focus, Agents, Model, Tokens, Value and Done.
- Target the next release as **v0.9.0 — WORK**, with MCP Ready inside CONTROL.
- Keep the exact six Home tiles and stable IDs; visible `flow` becomes WORK.
- Ship two complete loops: glanceable WORK and authenticated MCP check/fix.
- Hide duplicate navigation in v0.9 without merging/deleting implementations.
- Defer broad menu wrappers, full portal redesign, OpenCode/Hermes telemetry
  and deep analytics until v0.9.x or later.

## Next steps

- Review the locked schemas in Task 1, then execute `tasks/todo.md` in order on
  an `agents/` implementation branch.
- Validate Work and MCP Ready on disposable client homes and the physical ADV
  before publishing v0.9.0.
