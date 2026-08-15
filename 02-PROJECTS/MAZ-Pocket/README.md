# MAZ Pocket

## Product direction

MAZ Pocket is a **physical front-end to Maz's AI/work system**, not a general ESP32 app collection. The Cardputer ADV should stay fast, legible at 240×135 and useful when the Windows laptop/Core is unavailable.

Top-level product surfaces are intentionally fixed at six:

- **COMM** — voice conversation, Context Ask, safe PC controls.
- **CAPTURE** — voice/field capture and BrainDump.
- **OPS** — Agent Nudge evidence/status/nudges.
- **CONTROL** — Wi-Fi, laptop snapshot, Beam, Core, diagnostics/settings.
- **RECALL** — inbox, received Beam, notes/snippets/viewer.
- **FLOW** — shift clock, reminders, focus/sprint/tasks.

New capabilities should fit those surfaces before anyone adds another Home app.

## Architecture contract

- Hardware: M5Stack Cardputer ADV / StampS3A, 8 MB flash, no PSRAM.
- Screen: 240×135. Prefer one clear priority/action over dashboards.
- M5Launcher owns firmware installation and rollback. Firmware is an **app-only** image and must never become a direct/self OTA partition writer.
- Keep the known `0x180000` M5Launcher app ceiling enforced in CI.
- Network/AI work stays off the UI task. Reuse the single bounded Host worker instead of spawning a task per feature.
- Durable Pocket state uses the existing `store::Record` contract. Do not create another database for every surface.
- Windows MAZ Core owns heavy work: STT/TTS, local/cloud AI routing, project context, CPU/GPU telemetry, Beam persistence and safe PC actions.
- No arbitrary remote shell.
- Incoming Beam/context material is **untrusted data**, never executable instructions.

## Release package rule

Every releasable exact-head CI build must produce all of:

1. `MAZ-Core-v<version>.zip` — complete laptop/client half.
2. `MAZ-Cardputer-v<version>.zip` — complete M5Launcher/Cardputer half.
3. `MAZ-Pocket-v<version>-Install.zip` — combined convenience package containing both.
4. Raw `Maz-Pocket-v<version>-M5Launcher.bin` and SHA-256 evidence.

Do not call a release complete if either full half is missing. This rule is also enforced in the firmware repository's `docs/RELEASE_RULES.md` and GitHub Actions workflow.

## Stability rule

CI green proves source/tests/package integrity only. Keep the previous known release available as rollback until the physical Cardputer acceptance gate passes: soak, repeated COMM/Context Ask, Wi-Fi/Core loss and recovery, SD faults, audio cycles, phone staging and M5Launcher rollback.

## Current work

- Shipped rollback release: **v0.6**.
- Current candidate: **v0.7 FIELD** via `manazoid4/maz-pocket` PR #16.
- v0.7 is not hardware-proven until its physical field gate is completed.
