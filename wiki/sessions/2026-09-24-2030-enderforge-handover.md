# Handover: 2026-09-24 (Claude → next agent)

From: Claude Code (Opus 5.5). To: any agent (Claude, Codex, other).

## 0. 60-second version

- **Goal:** fastest, most efficient reliable Ender 5 with **no bed probe**. Owner adjusts the Z-stop bolt + 4 corner knobs by hand. Every change → SD cube test → ledger row. Later: public repo + mazworks.uk case study.
- **Tool:** `ef` CLI at repo root. `.\ef` shows the next step. Each step guides the owner and writes the ledger.
- **Where we are:** C0 done. **Next is C1 `ef check`**, then C2 home → C3 Z bolt paper test → C4 corner tram → C5 full-bed first layer.
- **Your job:** coach the owner through `ef` one step at a time, fix `ef` when real hardware output differs from what it expects, keep the ledger + handovers current.

## 1. Coach-me prompt (owner pastes this into any agent)

> You're my EnderForge coach. In `C:\Users\manaz\enderforge`: read `AGENTS.md` and the newest file in `docs/handovers/`. Run `py apps/cli/ef.py --json`, then tell me the next physical step in **3 short plain lines max** (what to hold/turn/look at). I'll run the `ef` command myself and paste the output. If anything fails or looks wrong, give me the exact fix, then the next step. Push me forward: when a step passes, immediately tell me the next one. Keep speed tuning (`ef speed`) going until the ladder finishes. Write a new handover in `docs/handovers/` before you stop.

## 2. Read first (5 min)

1. [`AGENTS.md`](../../AGENTS.md): rules (safety, ledger, branches, secrets, handovers).
2. [`START.md`](../../START.md): the owner's one-page card.
3. [`testing/ender-5/TEST-PLAN.md`](../../testing/ender-5/TEST-PLAN.md): ladder C0–C15 and how the speed ladder decides pass/fail.
4. [`testing/ender-5/LEDGER.md`](../../testing/ender-5/LEDGER.md): all settings + results. Append-only.
5. [`apps/cli/README.md`](../../apps/cli/README.md): `ef` commands, flags, exit codes.
6. [`docs/research/TOOLS.md`](../research/TOOLS.md): what we reuse (3dprintassistant, OctoPrint plugins, Orca calibration).

## 3. Printer facts

| | |
|---|---|
| Printer | Creality Ender 5, BTT SKR Mini E3 V2.0 (replaced stock V1.1.4), stock hotend/thermistor/display (user-reported), Bowden |
| Firmware | Marlin 2.0.7.2 (Feb 4 2021). BABYSTEPPING on, BINARY_FILE_TRANSFER off, no LIN_ADVANCE |
| Bed | 220 × 220 mm, Z 300 mm, gold PEI, 4 knobs, **no probe** |
| Homing | X max, Y max, Z min (bed rises to the Z switch; Z-stop bolt/bracket sets Z0) |
| Settings | Steps 80/80/400/93; max accel X/Y 500; print/travel 500, retract 1000; JD 0.08; PID P21.73 I1.54 D76.55; mesh off |
| Host | OctoPrint 1.11.8, http://localhost:5000, COM7 @ 115200. Plugins: Obico, go2rtc only |
| API key | `~/.enderforge/octoprint.key`. **Owner should rotate it** (it was pasted in chat) |
| Cube | SD `CUBE20~1.GCO` = `/CUBE20.GCODE`; no local copy, slicer settings unknown |

## 4. Done so far

- PR #9, #10 merged (goals, ledger, ladder, START, prior-work index, `ef` v1). #8 closed (superseded).
- **This branch `agents/ultra-audit`** (needs PR + merge, see §7):
  - `ef` reordered to the owner's request: **C3 `zpaper`** (Z-stop bolt + paper at centre, re-home loop with direction advice) → **C4 `tram`** (knobs, centre check) → **C5 `firstlayer`** (generates one-layer full-bed G-code: outline + 5 squares, uploads to OctoPrint, prints, owner types `u`/`d` for live `M290` Z nudges, grades each square → advice).
  - **C8 `speed`**: guided speed ladder on the SD cube (accel 1000→3000, then 125→200% speed), resets settings after, pass/fail rules, time saved vs B0, **warns if the cube file overrides acceleration**.
  - `ef fix <symptom>`: troubleshooter mapped to ladder steps (idea borrowed from 3dprintassistant).
  - Fixes: cube "done" detection (cancelled ≠ done), heater wait timeout, first-layer double retract.
  - 13 tests (`py -m unittest discover tests`) with a fake OctoPrint.
  - Docs: START card, TEST-PLAN (C0–C15, Orca calibration for C9–C14), TOOLS research, CLI README, handover folder + rule.

## 5. Next actions

1. Merge this branch (§7).
2. Owner: `.\ef check` → `.\ef home` → `.\ef zpaper` → `.\ef tram` → `.\ef firstlayer`. That's the first physical session.
3. **Hardware-untested code paths**: check each on first real run and fix fast:
   - `home`: M119 text (`x_max: TRIGGERED`/`open`) and M114 regex.
   - `zpaper`/`tram`: G28 wait uses `until=Count X` from M114.
   - `firstlayer`: multipart upload to `/api/files/local`; `M290` direction (`+` should raise the nozzle; if the owner says it went the wrong way, flip the sign and add a test).
   - `pid`: M303 output parsing (`Kp:`/`DEFAULT_Kp`).
   - `speed`: `M204` report parsing mid-print.
4. Then C6 `pid`, C7 `esteps`, B0 `cube` ×3, C8 `speed` until the ladder finishes.
5. Recommend owner installs PrintTimeGenius, Print History, HeaterTimeout (see TOOLS.md). Don't install without asking.
6. C12 firmware flash is a separate supervised session: keep the old `firmware.bin` / `FIRMWARE.CUR` as rollback.

## 6. Watch-outs

- First `G28` after the table move: owner keeps a hand near the power switch in case the Z switch triggers late.
- Z-stop direction: nozzle too tight → switch must click **earlier** (bolt out / bracket up). Too loose → later (bolt in / bracket down). Confirm with the owner which mechanism the printer actually has; record it in HARDWARE.md.
- Z400 steps vs physical lead unverified: the B0 cube Z height will show a 2× error immediately.
- OctoPrint owns serial. Never open COM7 directly.
- Don't tune XYZ steps from cube size.
- Old Klipper/WSL setup (`Desktop/3d print/Ender5/`) is abandoned and contains a secrets file: don't copy.
- Owner preferences: execute without asking, terse replies, plain numbered physical steps, always PRs (merge when asked), print links, save to vault + unified memory.

## 7. Finish-up checklist for this branch

- [ ] `git push -u origin agents/ultra-audit`, open PR, merge (owner asked for merges).
- [ ] Copy §0 + §5 to vault `manazoid4/maz-works-knowledge-vault` → `wiki/projects/enderforge/` and unified memory `manazoid4/claude-obsidian` → `wiki/projects/enderforge/`.

## 8. Where memory lives

- Repo: `docs/handovers/` (newest = current truth), ledger, TEST-PLAN.
- Vault: `manazoid4/maz-works-knowledge-vault` (`wiki/projects/enderforge/`, `wiki/sessions/`).
- Unified memory: `manazoid4/claude-obsidian` (`wiki/projects/enderforge/`).
