---
date: 2026-08-13
project: maz-pocket
agent: codex
status: in-progress
---
## What I did

- Removed Probity completely: global package, Codex hook/config entry and local state directory.
- Built the v0.2 physical-assistant slice around Talk, BrainDump, Inbox,
  Decision, Focus, Sprint, Nudge and ordinary reminders.
- Added authenticated MAZ Host STT/model routing and a Launcher-safe app-only
  release path. Added bounded serial reconnect/status/logging based on the useful
  operational lesson from terminal_mcp without copying its source.
- Added Agent Nudge's provider-neutral assurance protocol, configurable
  three-day policy, evidence, dormant-session handling and idempotent explicit
  nudge API.
- Pushed MAZ Pocket PR #1 and Agent Nudge PR #34. Published the MAZ Pocket
  `v0.2.0-hardware-preview.1` app-only binary.

## Files changed

- MAZ Pocket: firmware apps, storage/network/audio integration, MAZ Host,
  packaging, CI, verification and licence notes.
- Agent Nudge: assurance core, database/API routes and tests; removed old
  developer-specific paths.
- Vault: this session note and `wiki/projects/maz-pocket/INDEX.md`.

## Decisions made

- M5Launcher is preserved; all normal device installs are app-only through its
  WUI or SD manager. The full web image is clearly destructive.
- MAZ Pocket owns interaction, capture and visible state; MAZ Host owns expensive
  STT/model work; Agent Nudge owns deterministic assurance facts.
- terminal_mcp was not imported because its repository has conflicting licence
  declarations and excessive scope. The required reconnect/logging behaviour is
  an original narrow implementation.
- Do not publish a MAZ Works case study until real device flows, timings and
  photos exist.

## Next steps

1. Open M5Launcher WUI and install the app-only preview.
2. Configure MAZ Host and run the five physical acceptance flows with timings.
3. Fix only observed hardware failures; keep unverified flows labelled honestly.
4. Merge PRs after checks/review, then decide on showcase material.
