# Handover: firmware package built, not flashed

## 0. 60-second version
Owner explicitly requested the firmware build. Marlin 2.1.2.8 for confirmed SKR Mini E3 V2.0 and stock Ender 5 parts is built with Z400. Package: C:/Users/manaz/Downloads/EnderForge-Marlin-2.1.2.8-Z400. No printer commands or flash this turn. Calibration remains C1 next unless owner flashes first.

## 1. Coach-me prompt
Use ef one step at a time, three lines maximum. If firmware was flashed, verify reports and physical endstop operation before motion; then resume calibration.

## 2. Read first
Previous Claude handover, AGENTS.md, package READ-ME-FIRST.txt, build-manifest.json and calibration ledger.

## 3. Printer facts
Board and stock components confirmed by user. Preserve Z400, print/travel 500 and retract 1000 mm/s². PEI 220 mm, edge coordinates unverified.

## 4. Done
PlatformIO STM32F103RE_btt build SUCCESS twice. Binary 179740 bytes; vector-table sanity passed. SHA256 b3f03a7d54091930cfa2259ce7d37ec57526c522e3826eecbfbac02bf612b4bd. Exact source ZIP, GPL licence, manifest, hash and instructions included. No hardware validation yet.

## 5. Next actions
Preserve old firmware backup if available; owner handles SD flash. Reconnect and check M115/M503/M119, plausible temperatures, Z400 and physical endstop responses before supervised homing. Do not blindly migrate EEPROM.

## 6. Watch-outs
Build success is not hardware validation. Rollback image has not been obtained. Never let an M114 substitute for physical position after manual screw movement. Do not auto-home upon reconnect.

## 7. Finish-up checklist
Build package and source delivered; handover and ledger updated. GitHub PR and durable memory persisted.

## 8. Where memory lives
Repo docs/handovers and testing/ender-5/LEDGER.md; vault wiki/sessions and Local Knowledge/projects/enderforge; unified-memory-database project status.