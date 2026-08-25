---
date: 2026-08-25
project: maz-pocket
agent: codex
status: in-progress
---

## What I did

- Preserved the local-only host commit `7fe0e04` and all dirty Cardputer WORK changes before modification.
- Created and pushed recovery checkpoint `d74ee97` on `agents/checkpoint-v1-work-firmware-20260825`, with external patch, bundle and untracked-artifact backups under `C:\Users\manaz\maz-pocket-recovery\2026-08-25-work-consistency`.
- Reconciled the implementation with `docs/V100-CONSISTENCY-BUILD-PROMPT-V2.md`, completed host/phone/Cardputer behavior, and fixed every material independent-review finding.
- Prepared v1.0.0 documentation and exact release artifacts, opened draft PR #34, and recorded the local/GitHub gate evidence on the PR.

## Files changed

- MAZ Pocket host WORK store/schema/service/routes, authenticated phone UI and WORK tests.
- Cardputer WORK surface and bounded Host-poll response parser.
- `VERSION`, `CHANGELOG.md`, `RELEASE_NOTES.md`, `README.md`, `QUICKSTART.txt`.
- Release packager now excludes runtime `.log` files.

## Decisions made

- Kept the stable internal `flow` ID while changing the visible sixth Home surface to WORK.
- Reused the existing 10-second normal / 20-second FIELD Host worker; STALE begins at roughly three missed polls.
- Preserved last-known Cardputer values on offline, malformed or oversized data; never substitute fake zeroes.
- Kept PR #34 draft. Do not merge or create `.release/v1.0.0` until physical ADV evidence exists and GitHub Actions can run.

## Evidence

- Final protected branch head: `fe73280d1d32ab8a6c4a4b0a6286c4fd7e977e2e` (`release/v1-work-consistency`).
- PR: https://github.com/manazoid4/maz-pocket/pull/34
- Host: 106/106 tests pass, including real Chromium/Playwright, concurrent bootstrap/write/undo, migration/transaction interruption, corrupt DB, DST, updater persistence and mobile viewports.
- Firmware: PlatformIO succeeds; app image 1,457,920 bytes, 114,944 bytes below the `0x180000` slot.
- Exact artifacts verified: `MAZ-Core-v1.0.0.zip`, `MAZ-Cardputer-v1.0.0.zip`, `MAZ-Pocket-v1.0.0-Install.zip`, `Maz-Pocket-v1.0.0-M5Launcher.bin`, `SHA256SUMS.txt`.
- SHA-256 manifest matches; combined install ZIP SHA-256 is `ddf38b5d70dc11d0206d7f0271108baabb07c052e3dee775f4d6a3c62961f49f`.
- M5Launcher hand-back, web-flasher, version, PowerShell/ASCII, ZIP hygiene, Windows PowerShell 5.1 parse and shipped installer dry-run guards pass.
- Independent reviewer reported six issues; all were fixed and re-reviewed with no new release blocker.

## Next steps

1. Resolve the GitHub Actions billing/spending-limit hold; failed runs contain no steps and explicitly report the account payment restriction.
2. Run the eight-step V2 physical Cardputer ADV checklist using the prepared v1.0.0 artifact.
3. Rerun PR CI, mark PR ready, merge only when green, then add `.release/v1.0.0` on main and verify the GitHub Release/artifacts.
