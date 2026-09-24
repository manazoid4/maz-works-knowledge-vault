# Handover: 2026-09-24 (Claude → next agent)

From: Claude Code (Opus 5.5). To: any agent (Claude, Codex, other).

## 0. 60-second version

- **Goal:** fastest, most efficient reliable Ender 5 with **no bed probe**. Owner sets Z height with the stock **silver Z screw** (back of bed, lock nut) and levels with the 4 corner knobs. Every change → SD cube test → ledger row. Later: public repo + mazworks.uk case study.
- **Tool:** `ef` CLI at repo root. `.\ef` shows the next step. Each step guides the owner and writes the ledger.
- **Where we are:** C0 done. **Owner's next step is C1 `.\ef check`**, then C2 home → C3 Z screw paper test → C4 corner knobs → C5 full-bed first layer.
- **Your job:** coach the owner through `ef` one step at a time, fix `ef` fast when real printer output differs from what it expects (add a test per fix), keep the ledger + handovers current.

## 1. Coach-me prompt (owner pastes this into any agent)

> You're my EnderForge coach. In `C:\Users\manaz\enderforge`: read `AGENTS.md` and the newest file in `docs/handovers/`. Run `py apps/cli/ef.py --json`, then tell me the next physical step in **3 short plain lines max** (what to hold/turn/look at). I'll run the `ef` command myself and paste the output. If anything fails or looks wrong, give me the exact fix, then the next step. Push me forward: when a step passes, immediately tell me the next one. Keep speed tuning (`ef speed`) going until the ladder finishes. Write a new handover in `docs/handovers/` before you stop.

## 2. Read first (5 min)

1. [`AGENTS.md`](../../AGENTS.md): rules (safety, ledger, branches, secrets, handovers, coach mode).
2. [`START.md`](../../START.md): the owner's one-page card.
3. [`testing/ender-5/TEST-PLAN.md`](../../testing/ender-5/TEST-PLAN.md): ladder C0–C15, speed-ladder pass/fail rules.
4. [`testing/ender-5/LEDGER.md`](../../testing/ender-5/LEDGER.md): all settings + results. Append-only.
5. [`apps/cli/README.md`](../../apps/cli/README.md): `ef` commands, flags, exit codes.
6. [`docs/research/TOOLS.md`](../research/TOOLS.md): what we reuse (3dprintassistant, OctoPrint plugins, Orca calibration).

## 3. Printer facts

| | |
|---|---|
| Printer | Creality Ender 5, stock, silver frame (user-reported). BTT SKR Mini E3 V2.0 (replaced stock V1.1.4). Stock hotend/thermistor/display, Bowden |
| Z-stop | Stock silver adjustable screw + lock nut on the back of the bed carriage presses the Z switch. **Tip higher = bed stops lower (more gap).** ¼ turn ≈ 0.1–0.2 mm |
| Firmware | Marlin 2.0.7.2 (Feb 4 2021). BABYSTEPPING on (M290), BINARY_FILE_TRANSFER off, no LIN_ADVANCE |
| Bed | 220 × 220 mm, Z 300 mm, gold PEI, 4 knobs, **no probe** |
| Homing | X max, Y max (back-right), Z min (bed rises to the Z switch) |
| Settings | Steps 80/80/400/93; max accel X/Y 500; print/travel 500, retract 1000; JD 0.08; PID P21.73 I1.54 D76.55; mesh off |
| Host | OctoPrint 1.11.8, http://localhost:5000, COM7 @ 115200. Plugins: Obico, go2rtc only |
| API key | `~/.enderforge/octoprint.key`. Owner has secured it (2026-09-24): no action needed |
| Cube | SD `CUBE20~1.GCO` = `/CUBE20.GCODE`; no local copy, slicer settings unknown |

## 4. Done so far

- Merged: PR #9 (goals, ledger, ladder, START, prior-work index), PR #10 (`ef` v1). #8 closed (superseded).
- **PR #11** (`agents/ultra-audit`):
  - `ef` in the owner's order: **C3 `zpaper`** (centre paper test, silver-screw steps with direction, re-home loop) → **C4 `tram`** (knob nearest the nozzle, centre check) → **C5 `firstlayer`** (generates one-layer full-bed G-code: outline + 5 squares, uploads, prints; owner types `u`/`d` for live `M290` Z nudges, grades each square → advice).
  - **C8 `speed`**: guided ladder on the SD cube (accel 1000→3000, then 125→200% speed), resets after, pass/fail rules, time saved vs B0. ~60 s in, reads live `M220` + `M503` and fails the rung if the file changed speed %, `M201` or `M204`.
  - `ef fix <symptom>`: troubleshooter mapped to ladder steps.
  - Audit fixes: final PID values parsed (not the first cycle's), heaters forced off on any exit/Ctrl+C from a heating step, speed settings restored even on error, SD card checked/initialised before printing, serial-log matching tolerates OctoPrint line numbers, cancelled print ≠ done, heater wait timeout, first-layer double retract, Windows console-safe output.
  - 18 tests (`py -m unittest discover tests`) with a fake OctoPrint + realistic Marlin replies.

## 5. Next actions

1. Merge PR #11 when the owner says so.
2. Owner, first session: `.\ef check` → `.\ef home` → `.\ef zpaper` → `.\ef tram` → `.\ef firstlayer`.
3. **Motion/heat paths never run on hardware yet.** Watch the first real run of each and fix fast:
   - `home`: M119 text (`x_max: TRIGGERED`/`open`), M114 regex (`Count X`).
   - `zpaper`/`tram`: G28 completion via `until=Count X`.
   - `firstlayer`: multipart upload to `/api/files/local`; `M290 Z+0.02` should raise the nozzle (flip sign + add test if the owner says it went the wrong way).
   - `pid`: `DEFAULT_Kp` lines in real M303 output.
   - `speed`: `FR:` and `M201/M204` parsing mid-SD-print.
4. Then C6 `pid`, C7 `esteps`, B0 `cube` ×3, C8 `speed` until the ladder finishes.
5. Suggest (don't install without asking) PrintTimeGenius, Print History, HeaterTimeout.
6. C12 firmware flash = separate supervised session; keep old `firmware.bin` / `FIRMWARE.CUR` as rollback.

## 6. Watch-outs

- First `G28` after the table move: owner keeps a hand near the power switch in case the Z switch triggers late (bed into nozzle).
- The owner adjusts the Z screw with the bed lowered 10 mm (`zpaper` does this). ¼ turn at a time.
- Knob direction varies by view: `tram` says "corner DOWN/UP", not clockwise.
- Z400 steps vs physical lead unverified: the B0 cube Z height shows a 2× error immediately.
- OctoPrint owns serial. Never open COM7 directly.
- Don't tune XYZ steps from cube size.
- Old Klipper/WSL setup (`Desktop/3d print/Ender5/`) is abandoned and has a secrets file: don't copy.
- Owner preferences: execute without asking, terse replies, plain numbered physical steps, PRs (merge when asked), print links, save to vault.

## 7. Finish-up checklist

- [x] PR #11 updated with this pass.
- [x] Handover copied to vault `wiki/sessions/`.

## 8. Where memory lives

- Repo: `docs/handovers/` (newest = current truth), ledger, TEST-PLAN.
- Vault = unified memory: `manazoid4/maz-works-knowledge-vault` (`wiki/sessions/*enderforge*`). Local clone `Desktop/Maz Works Knowledge Vault`, push with `git push fork HEAD:main` (`wiki/projects/` is gitignored there).
- `manazoid4/claude-obsidian` is archived/read-only: don't write there.
