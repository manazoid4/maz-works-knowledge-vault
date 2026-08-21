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

## Files changed

- `maz-pocket/docs/research/work-telemetry-landscape.md`
- `maz-pocket/docs/ideas/maz-work.md`
- `wiki/projects/maz-pocket/INDEX.md`
- `wiki/sessions/2026-08-21-maz-pocket-codex.md`

## Decisions made

- Maz Pocket remains the physical device/firmware identity.
- The proposed telemetry experience is private and owner-facing, not employer surveillance.
- Productive time must not be inferred from token volume or agent uptime.
- API-priced token totals must be labelled estimated API value, not actual spend.
- Confirmed the name **MAZ Work**.
- Proposed Cardputer home metrics: Focus, Agents, Model, Tokens, Value and Done.

## Next steps

- Define the normalized event/session schema and exact v1 metric semantics.
- Prototype the six-tile layout at 240x135 before firmware implementation.
- Integrate host-side collectors, verify on hardware, then prepare a release.
