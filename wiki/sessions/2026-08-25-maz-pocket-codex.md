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

- Final protected branch head: `0ece3725c760bd04c62beac69ebca09f5c6ce60d` (`release/v1-work-consistency`), pushed to origin.
- PR: https://github.com/manazoid4/maz-pocket/pull/34
- Host: 109 passed, 0 skipped. Focused WORK/launcher/Playwright: 40 passed, 0 skipped. Coverage includes real Chromium, concurrent bootstrap/write/undo, migration/transaction interruption, corrupt DB, DST, updater persistence and mobile viewports.
- Firmware: PlatformIO succeeds; app image 1,457,920 bytes, 114,944 bytes below the `0x180000` slot.
- Exact artifacts verified: `MAZ-Core-v1.0.0.zip`, `MAZ-Cardputer-v1.0.0.zip`, `MAZ-Pocket-v1.0.0-Install.zip`, `Maz-Pocket-v1.0.0-M5Launcher.bin`, `SHA256SUMS.txt`.
- Rebuilt artifact SHA-256 values at the exact head: firmware `c15dab99cb702a6982353174e3f147dd5e815d6bb90129e428c6593acdfedd5f`; Core ZIP `92a8b35a491642b9e22f36b82d552975f5c82ee0e7a32332bf1dcbe4cf814e68`; Cardputer ZIP `56ab4b371bc511f33061b854d55de71df39d6afd057814bec93c2c4fc530a392`; combined install ZIP `3c9f68a54822a704e8049a8f0d84c91611361c610b788a7ad310e74dcd6a37dc`.
- M5Launcher hand-back, web-flasher, version, PowerShell/ASCII, ZIP hygiene, Windows PowerShell 5.1 parse and shipped installer dry-run guards pass.
- Independent reviewer reported six issues; all were fixed and re-reviewed with no new release blocker.
- Full 8 MB pre-flash device backup is preserved locally with SHA-256 `FF06F881E61289554BBCD8D3AE1BC3CBD9F3430D8DA4898E1E933B8EE9C927FD`; never upload it because NVS may contain credentials.
- Connected Cardputer ADV was provisioned with official M5Launcher 2.8.0, installed through the repository installer, and booted `MAZ Pocket 1.0.0 READY board=24 keyboard=ok storage=internal`.
- Physical serial acceptance opened all six Home surfaces and all six WORK TOOLS; runtime pressure/stall remained zero. Wi-Fi/host freshness and audio remain manual because Wi-Fi was not configured. The SD card reported invalid FAT, so MAZ safely used internal `mazdata`.
- A later COM5 recheck found the port no longer enumerated; no write was attempted and the earlier flash/boot evidence remains the last verified device state.
- Exact-head Actions runs `32974758399` and `32974753174` were rejected before any steps. GitHub annotation: account payments failed or the spending limit must be increased.

## Next steps

1. Resolve the GitHub Actions billing/spending-limit hold; failed runs contain no steps and explicitly report the account payment restriction.
2. Reconnect the Cardputer, configure Wi-Fi, and capture the remaining host freshness/stale plus audio evidence; optionally format the SD card FAT32 if external storage is desired.
3. Rerun PR CI, mark PR ready, merge only when green, then add `.release/v1.0.0` on main and verify the GitHub Release/artifacts. Do not start Unified Memory until this non-manual CI blocker is cleared under the master sequencing rule.
