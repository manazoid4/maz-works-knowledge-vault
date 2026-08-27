---
date: 2026-08-27
project: maz-pocket
agent: codex
status: blocked
---
## What I did
- Recovered and completed the interrupted MAZ Pocket CHUNK C work on PR #35, preserving the original host and firmware work.
- Removed JobFinder from the active product surface while retaining its historical SQLite row as dormant data; the V2 JOB HUNT consistency track remains intact.
- Fixed simultaneous pairing claims with a serialized single-use state transition and deterministic concurrency coverage.
- Moved Cardputer WORK `+1` onto the existing non-blocking host worker.
- Completed Manage Tracks: primary event selection, add, deactivate/restore, active/headline controls, and history-preserving stable IDs.
- Hardened packaging against private `.env*` files, added the Install ZIP checksum, and made CI install/require Playwright Chromium.
- Removed the direct-slot flashing helper from the v1 release branch so M5Launcher remains the only firmware installer; implementation remains recoverable in Git history at `3abeae7a`.
- Ran the full 158-test host/browser suite, a real PlatformIO build, release packaging/checksum verification, and an authenticated live-Core smoke test.
- Committed and pushed `0d1872f` to `agents/chunk-a-core-ai-recovery`; posted evidence to PR #35.

## Files changed
- MAZ Pocket WORK routes/service/store/phone UI and pairing store/tests.
- Cardputer WORK surface, field coordinator, and host worker.
- Release packaging, CI workflows, version/handoff guard, and release rules.

## Decisions made
- Only MAZ Pocket was active for this execution pass; LeadFinder, acquisition, Unified Memory, and other workstreams remain paused.
- Historical records are deactivated/hidden rather than destructively deleted when product scope changes.
- M5Launcher is the sole firmware installer and rollback owner for v1.
- The code is release-candidate ready locally, but the release is not complete without green CI and physical Cardputer evidence.

## Verification evidence
- Host/browser: 158 tests passed, including real Chromium one-tap WORK acceptance.
- Firmware: PlatformIO success; `firmware.bin` 1,463,488 bytes, application flash usage 1,463,125 bytes, under the `0x180000` slot ceiling.
- Packaging: Core ZIP private `.env*` entries = 0; all external SHA-256 checksums valid, including `MAZ-Pocket-v1.0.0-Install.zip`.
- Live host: authenticated health/phone/WORK smoke passed; LAN Cardputer polling returned HTTP 200.
- PR: https://github.com/manazoid4/maz-pocket/pull/35 at `0d1872f`.

## Postmortem
- The major waste risk was scope sprawl across MAZ Pocket, Unified Memory, LeadFinder, acquisition, and JobFinder. Constraining execution to one workstream produced concrete release fixes quickly.
- The independent review was valuable because happy-path tests missed concurrency, blocking firmware I/O, packaging secrets, incomplete checksums, skipped browser CI, and the installer-boundary conflict.
- Generated artifacts must be rebuilt after the final source edit; stale release ZIPs can otherwise look valid while omitting the latest host UI.
- Live log monitoring is useful evidence, but unbounded polling output should be sampled rather than repeatedly streamed into the session.

## Next steps
- Fix the GitHub billing/spending restriction so Actions can actually start, then rerun PR #35.
- Install the prepared v1.0.0 app-only artifact through M5Launcher and complete the numbered physical acceptance checklist.
- If both gates pass, merge PR #35, publish v1.0.0 through the release workflow, and verify all five release artifacts.
