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

## Files changed

- `maz-pocket/docs/research/work-telemetry-landscape.md`
- `maz-pocket/docs/ideas/maz-work.md`
- `maz-pocket/docs/V090-MAZ-WORK-BUILD-PROMPT.md`
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

## Next steps

- Define the normalized event/session schema and exact v1 metric semantics.
- Execute `docs/V090-MAZ-WORK-BUILD-PROMPT.md` on an `agents/` implementation branch.
- Validate Work and MCP Ready on disposable client homes and the physical ADV
  before publishing v0.9.0.
