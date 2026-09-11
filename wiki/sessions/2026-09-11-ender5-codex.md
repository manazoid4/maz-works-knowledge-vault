---
date: 2026-09-11
project: ender5
agent: codex
status: in-progress
---

## What I did

Completed the disconnected Windows preparation for an original Ender 5: dedicated WSL2 Klipper host, authenticated Mainsail, USBIPD, native Orca profiles/sheet, board firmware candidates, printable upgrades and ADV mount research. Re-ran the plan, recorded the post-mortem and Windows-specific recovery instructions.

## Files changed

- `C:\Users\manaz\Desktop\3d print\` — active execution workspace and local Git commit.
- `wiki/projects/ender5/2026-09-11-windows-klipper-preparation.md`
- `wiki/sessions/2026-09-11-ender5-codex.md`

## Decisions made

- Keep OrcaSlicer native on Windows and Linux printer services inside isolated `Ender5` WSL.
- Use authenticated nginx for Mainsail and leave Moonraker loopback-only.
- Select firmware only after physical board/MCU verification.
- Treat Cardputer ADV BMI270 as an experimental external logger, not a native Klipper accelerometer.

## Next steps

The Ender 5 is not connected: no printer USB device or COM port is present. When powered and connected, continue with actual board/MCU verification, candidate selection, flash and observed commissioning.
