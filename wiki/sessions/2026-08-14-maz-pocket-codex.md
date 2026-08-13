---
date: 2026-08-14
project: maz-pocket
agent: codex
status: in-progress
---
## What I did
- Recovered official M5Launcher 2.8.0 after the full-chip image had replaced it.
- Fixed the Cardputer ADV black screen by separating display and SD SPI hosts.
- Added isolated `mazdata` LittleFS storage, automatic saved-Wi-Fi association,
  private USB pairing, authenticated Agent Nudge credential discovery and a
  verified Launcher hand-back.
- Replaced the destructive web/full-chip path with one Launcher-only install
  command and physically verified install, replacement, boot and hand-back.
- Started MAZ Host and Agent Nudge locally, fixed STT dependencies/device
  selection, selected a responsive installed local model and measured the voice
  pipeline.
- Published hardware preview 2 and pushed PR #1.
- Addressed all five current PR review findings: offline Talk/BrainDump dispatch,
  lossless record updates, clock-safe relative reminders, reachable Sprint
  debrief and configured host binding.
- Rebuilt and installed the corrected app through M5Launcher, then observed
  `MAZSTATUS wifi=online host=online nudge=ALL_SYNCED agents=8` on hardware.
- Published hardware preview 3 from commit `1766e39`.

## Files changed
- MAZ Pocket firmware networking, storage, boot diagnostics and Launcher hand-back.
- MAZ Host pairing, STT, Agent Nudge authentication and tests.
- Launcher-only packaging/install scripts, README and verification record.
- Shared record/reminder service, offline dispatcher, Sprint flow and host launcher.

## Decisions made
- M5Launcher is the sole normal installation route; full-chip MAZ installers are removed.
- The Cardputer remains a fast interface; `gemma3:1b` is the working laptop default here.
- Public MAZ Works claims remain blocked until the interactive device flows have real photos and manual acceptance.
- Offline audio remains the durable source of truth; Talk deletes its raw file
  only after a retried answer is recorded, while BrainDump keeps the source.

## Next steps
- Visually confirm the home screen and exercise all eight shortcuts.
- Prove device-mic Talk, BrainDump highlights, Sprint debrief, reminder actions,
  and a deliberately stale Agent Nudge nudge/acknowledgement flow.
- Reformat or replace the inserted card as FAT32/MBR; internal storage is working.
