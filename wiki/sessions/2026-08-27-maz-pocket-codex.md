---
date: 2026-08-27
project: maz-pocket
agent: codex
status: in-progress
---
## What I did
- Recovered the interrupted last-12-hour session: it was CHUNK C (not Batch C), continuing PR #35 on `agents/chunk-a-core-ai-recovery`.
- Finished and pushed the MAZ Pocket client/job pipeline integration, deterministic daily execution state, Cardputer WORK quick increment/control path, and schema migration.
- Audited and pushed Unified Memory lifecycle/redaction fixes on `agents/maz-pocket-unified-memory-audit` (PR #1).
- Researched five real public UK businesses: three qualified opportunities and two rejected benchmarks; prepared (not sent) personalised outreach and one mini-solution proof state.
- Added one current official Sana Solutions Engineer vacancy as `READY_TO_APPLY`; no application was submitted.
- Verified the live host, mDNS/direct-IP portal, diagnostics, MAZLATEST, LOCAL_FAST, phone work dashboard, and repeated route requests.

## Files changed
- MAZ Pocket host WORK schema/store/service/routes/control/phone/app, tests, and Cardputer firmware surfaces.
- Unified Memory `memory.py`, lifecycle adapter/tests/docs/status (committed separately on PR #1).
- Live local WORK database at `~/.maz-pocket/work/work.sqlite3` now contains the researched pipeline records.

## Decisions made
- Reused the existing WORK SQLite ledger rather than creating a disconnected CRM.
- Keep outreach and job submission human-controlled; statuses are `READY_TO_SEND` / `READY_TO_APPLY`.
- Physical gate is currently `BLOCKED_NO_DEVICE`: USB VID/PID `303A:1001` was absent at verification time, although the previously verified device remains reachable on LAN as `192.168.1.47`.
- Release decision remains pending the physical gate and one-hour soak. GitHub Actions is externally blocked by account billing.

## Next steps
- Reconnect the genuine Cardputer ADV, re-detect by VID/PID, flash the already-built firmware, and execute the physical acceptance flow.
- Run and capture the planned one-hour status/diagnostics/AI/WORK/reconnect soak.
- Update PR #35 with final evidence, then make the exact READY/NOT_READY decision.
