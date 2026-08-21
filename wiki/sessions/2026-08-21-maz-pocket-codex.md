---
date: 2026-08-21
project: maz-pocket
agent: codex
status: in-progress
---

## What I did

- Researched 15 open-source personal AI-agent and work-telemetry dashboards from GitHub and first-party Reddit posts.
- Extracted the recurring data, UI patterns, accuracy caveats and Cardputer-sized information architecture.
- Proposed separating human focus time, AI consumption, productive output and efficiency/health.
- Narrowed naming to a MAZ-branded telemetry surface rather than a generic Agent/Token/Pulse name.

## Files changed

- `maz-pocket/docs/research/work-telemetry-landscape.md`
- `wiki/sessions/2026-08-21-maz-pocket-codex.md`

## Decisions made

- Maz Pocket remains the physical device/firmware identity.
- The proposed telemetry experience is private and owner-facing, not employer surveillance.
- Productive time must not be inferred from token volume or agent uptime.
- API-priced token totals must be labelled estimated API value, not actual spend.
- Proposed Cardputer home metrics: Focus, Agents, Model, Tokens, Value and Done.

## Next steps

- Confirm the telemetry surface name; current recommendation is `MAZ Shift`, with `MAZ Ledger` and `MazScope` as alternatives.
- Define the normalized event/session schema and exact v1 metric semantics.
- Prototype the six-tile layout at 240x135 before firmware implementation.
- Integrate host-side collectors, verify on hardware, then prepare a release.
