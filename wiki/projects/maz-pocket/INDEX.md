---
title: MAZ Pocket
created: 2026-08-13
updated: 2026-08-13
type: project
tags: [projects, maz-pocket, hardware, firmware, cardputer, esp32, voice, github]
---

# MAZ Pocket

Standalone firmware for the **M5Stack Cardputer ADV**, installable through
M5Launcher alongside other firmware. It is the physical capture and control
surface for MAZ Host and Agent Nudge: the device handles keys, audio, status,
queues and reminders while the laptop handles STT and model compute.

## Locations

- Local repo: `%USERPROFILE%\maz-pocket`
- GitHub: `https://github.com/manazoid4/maz-pocket`
- Binary: `.pio/build/cardputer-adv/firmware.bin`

## Why it exists

MAZ Pocket avoids putting intelligence on the ESP32. Its daily value is fast
capture, visible agent state, physical shortcuts, approvals/reminders and
offline survival without reopening a laptop. MAZ Host performs expensive work;
Agent Nudge supplies deterministic assurance facts rather than guessed status.

## Hardware facts worth remembering

- The ADV is **not** a Cardputer with a bigger battery. Its keyboard moved
  behind a **TCA8418 I2C expander** (addr 0x34, INT on G11) — which is why
  pre-ADV firmware boots on an ADV with a **completely dead keyboard**. MAZ
  Pocket ships its own driver.
- Audio moved to an **ES8311 codec** (I2C 0x18). One codec serves both
  directions, so mic and speaker cannot be live at once.
- **No PSRAM.** 512KB SRAM total, so audio streams to storage block by block.
- SD CS is **G12**, not the G5 printed on the M5 docs page. M5Unified's ADV
  table and M5Stack's own ADV UserDemo both say G12.
- `M5Unified` 0.2.19 is the first registry release with
  `board_M5CardputerADV`. Pinned exactly; floating it silently breaks audio.

## Current status

- v0.2 preview is on `agents/maz-pocket-v0-2`, PR #1, release
  `v0.2.0-hardware-preview.1`.
- Eight first-class surfaces: Talk, BrainDump, Inbox, Decision, Focus, Sprint,
  Nudge and Reminders. MAZ Host provides authenticated streamed WAV, STT,
  local/cloud routing, Agent Nudge proxying and bounded USB monitoring.
- Build passes at 16.4% RAM and 40.0% flash; 11 MAZ Host tests pass.
- A physical ADV was detected and an earlier v0.2 image booted, exposing SD and
  partition-label issues. M5Launcher was restored. The corrected build has not
  yet been installed or accepted on hardware.
- Launcher installs are app-only. An OTA-launched MAZ Pocket build never formats
  shared internal storage. Full-chip flashing is explicitly destructive.

## Next

1. Install the preview through M5Launcher WUI or FAT32 SD manager without
   replacing Launcher.
2. Run the physical acceptance flows and record latency/photos: Talk,
   BrainDump, Sprint, Reminder and Agent Nudge acknowledgement.
3. Add MAZ Works showcase material only after those flows are demonstrated.
4. Keep the seven-day carry test as the product continuation gate.
