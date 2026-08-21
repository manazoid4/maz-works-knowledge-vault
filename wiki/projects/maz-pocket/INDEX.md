---
title: MAZ Pocket
created: 2026-08-13
updated: 2026-08-14
type: project
tags: [projects, maz-pocket, hardware, firmware, cardputer, esp32, voice, github]
---

# MAZ Pocket

Standalone firmware for the **M5Stack Cardputer ADV**, installable through
M5Launcher alongside other firmware. It is the physical capture and control
surface for MAZ Host and Agent Nudge: the device handles keys, audio, status,
queues and reminders while the laptop handles STT and model compute.

## MAZ Work

**MAZ Work** is the confirmed name for MAZ Pocket's private work-and-agent
telemetry surface. MAZ Pocket remains the device and firmware name. MAZ Work
will show owner-controlled focus time, active agents, models, tokens,
API-equivalent value and completed outcomes in a six-tile Cardputer interface.
It must not treat token volume or agent uptime as a productivity score.

The planned next release is **v0.9.0 — WORK**. It also adds **MCP Ready** under
CONTROL: a frictionless scan across Codex, Claude Code, OpenCode and Hermes,
plus an authenticated one-click repair/activation action that backs up,
mutates transactionally, verifies the persisted result and leaves OAuth or
workspace approval visibly awaiting the human rather than claiming success.

Full implementation prompt:
`maz-pocket/docs/V090-MAZ-WORK-BUILD-PROMPT.md`.

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

- GitHub's latest release is v0.8.0 — CONTROL. Draft PR #31 contains the MAZ
  Work research, product definition and v0.9 build prompt.

- v0.2 preview is on `agents/maz-pocket-v0-2`, PR #1, release
  `v0.2.0-hardware-preview.4` at commit `2285c39`.
- Eight first-class surfaces: Talk, BrainDump, Inbox, Decision, Focus, Sprint,
  Nudge and Reminders. MAZ Host provides authenticated streamed WAV, STT,
  local/cloud routing, Agent Nudge proxying and bounded USB monitoring.
- Build passes at 38.7% RAM and 48.5% flash; 13 MAZ Host tests pass.
- The Home surface now uses pinned LVGL 9.5.0 over the existing M5Canvas
  framebuffer. It retains the proven ADV keyboard/navigation path and uses an
  aligned 6,720-byte partial RGB565 buffer rather than adding a second input
  system or migrating every screen.
- The final preview is installed on the physical ADV through official
  M5Launcher 2.8.0. Boot, ADV keyboard initialization, isolated internal
  storage, Wi-Fi reconnect, authenticated MAZ Host reachability and real Agent
  Nudge fleet status are verified. Device status reported `ALL_SYNCED` across
  eight agent records.
- Laptop speech proof transcribed a generated voice sample and returned a local
  model answer. Warm total latency was 1.85 seconds (906 ms STT, 929 ms model).
- `scripts/install.ps1` is the supported one-command installer. It preserves
  Launcher, provisions `mazdata`, replaces the prior MAZ slot, flashes through
  Launcher's official serial tool and verifies the physical boot banner.
- Offline Talk and BrainDump records are now dispatched when MAZ Host returns;
  record updates no longer truncate older entries, relative reminders survive
  NTP clock jumps, Sprint exposes its promised debrief key, and `host/run.ps1`
  honors the configured bind address and port.
- `Ctrl+L` and Tools hand back to M5Launcher using its TEST-partition fallback
  contract; this was exercised on hardware without a crash.
- Physical boot verified the LVGL core, display, partial buffer and widget tree.
  The first attempt exposed LVGL's 4-byte draw-buffer alignment requirement;
  the aligned build now reaches READY and live `ALL_SYNCED` status.

## Next

1. Confirm the LVGL Home screen visually and exercise every Home shortcut.
2. Run the remaining physical acceptance flows and record photos: Talk using
   the device mic/speaker,
   BrainDump, Sprint, Reminder and Agent Nudge acknowledgement.
3. Add MAZ Works showcase material only after those flows are demonstrated.
4. Keep the seven-day carry test as the product continuation gate.
