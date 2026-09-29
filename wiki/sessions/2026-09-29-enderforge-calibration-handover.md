# Handover 2026-09-29 16:30 — claude → next agent

## State
- Firmware: Marlin 2.1.2.8 max-feature build, flashed and verified (L-011). Z_SAFE_HOMING confirmed: Z homes at X110 Y110.
- C0, C2, C3, C4 done. C5 (first-layer) aborted: head skipped steps at front-left.
- **Root cause found by owner (L-014): Bowden tube too short**, pulls the head at front-left (~X<20 Y<10) so X/Y skip on fast moves. Slow moves clean. Owner fixing with a longer tube / reroute.
- Printer USB was unplugged at handover (no COM port in Windows). Webcam "UGREEN Camera" works via ffmpeg dshow.

## Calibration values (volatile unless noted)
- Z: centre paper drag at the switch point itself -> `M206 Z0` (nothing to restore after power cycle).
- Corners trammed cold, 1 pass (L-013). Plate edges measured (profile `plate_edges_mm`).
- Nothing saved with M500 yet (ledger rule: only after cube passes).

## Next steps
1. Owner fits longer Bowden tube. Verify: home, then `G1 X12 Y12 F6000` round-trips with no skip (M114 before/after + re-home compare).
2. Re-run C5: `.\ef firstlayer` (pattern now X12-205, Y15-205, profile-driven). Live Z nudges M290 ±0.02.
3. C6 PID, C7 E-steps, B0 cube x3, then M500.

## Traps learned this session
- Stepper idle timeout -> Ender 5 bed drops, position silently wrong. Send `M84 S0` at session start.
- `AUTO_REPORT_POSITION` in new firmware: position lines appear mid-G28; `ef capture(until="Count X")` returns early. Send `M154 S0` first, or wait for M114's own `ok`. (ef.py not yet fixed.)
- OctoPrint turns any `Error:` reply into M112. `M428` / LCD "Set Home Offsets" away from home = `Error:Too far from MIN/MAX` = emergency stop. Use `M206 Z..` directly; tell owner not to press that menu item.
- Owner prefers directing moves in plain words ("left 5", "0.3 inch forward"); scratch jog helper worked well — worth adding `ef jog`.
- go2rtc stream `webcam1` points at `video=0` (wrong device); set to `video=UGREEN Camera`.

## Evidence
Ledger L-012..L-014, `testing/ender-5/HARDWARE.md`, PR https://github.com/manazoid4/enderforge/pull/12
