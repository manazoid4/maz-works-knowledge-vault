# 2026-08-17 — MAZ Pocket interface friction audit

Three-pass audit of the v0.7.1 firmware UI: two independent auditors from
different perspectives, then a judge that re-opened every top finding at its
cited `file:line` before ranking. Repo at `main`, v0.7.1 merged, device live on
Wi-Fi and paired to MAZ Core.

| File | What it is |
|---|---|
| `audit-ux.md` | Interaction-design pass — 14 findings + 5 notes |
| `audit-field.md` | Field-use / embedded-behaviour pass — 15 findings |
| `audit-verdict.md` | Judge — verification, reconciliation, ship/defer ranking |
| `screens/*.png` | 11 real 240×135 captures from the device, pulled over HTTP |

The screenshots came from the device's own `/api/screen` rather than serial,
because opening COM5 resets the ESP32 and a reset mid-audit would change the
navigation state being photographed. `portal_v2.cpp:296 allowedApp()` permits
only eleven ids, so the FIELD screens v0.7 added (laptop, beam, shift) could not
be captured remotely — a gap worth closing in its own right.

## The finding that reframes the rest

The ADV has **no ESC key and no arrow keys**. ESC is Fn+`` ` ``, arrows are
Fn+`;` `,` `.` `/`. Every navigation keystroke is a two-key chord, and that fact
appears nowhere on the device and nowhere in `docs/`.

On top of that, `keyboard.cpp` adds the *emitted* code (`KEY_ESC`) to the held
table but removes the *physical* one (`KEY_GRAVE`), so releasing Fn first leaks a
permanent held entry. `heldFor(KEY_ESC)` then grows monotonically from the first
press, and ESC degrades into "teleport to Home" on the down edge. Six codes can
leak against `HELD_MAX = 8`, which can also stop push-to-talk arming.

## Ship-now set (~64 lines, v0.7.2 patch)

Ordered so the changes do not collide; several touch `shell.cpp` and `ui.cpp`.

1. Drop the redundant `ESC back` hint tails — the 33-char truncation at
   `ui.cpp:133-136` is currently eating `H test` and `R refresh`.
2. Rewrite `HELP_LINES` — four documented keys do not exist; ESC and the arrow
   chords are named nowhere.
3. ENTER on the offline OPS empty state opens COMM.
4. `visible = 5` and pitch 18 so RECALL/FLOW fit without scrolling.
5. UP/DOWN move a row on Home.
6. ENTER on the MAZ CORE detail opens host setup.
7. One `shell.cpp` pass: don't dim while the worker owes an answer; `&& !gEscClaimed`
   on hold-to-home; render tick 100 → 250 ms.
8. `shell::wake()` on notify post; longer toast for Warn/Error.

Best felt improvement per line: Home UP/DOWN, four lines, turning the whole
bottom row from three chords into one.

## Confirmed defects held behind the hardware gate

- The legacy v0.3 outbox drain runs a blocking WAV upload on the UI thread **and**
  duplicates v0.7's async drain, so the same talk record can send twice — and
  `product_apps.cpp:285` deletes the WAV the worker may still be streaming.
- A finished COMM answer strands the single host worker if the user left the
  screen, blocking Beam, outbox, telemetry and quick keys. `host_worker::busy()`
  returns false in `Done`, so the jam is invisible on screen.

## What the judge threw out

- One audit's fix for record pruning would have dropped the record just written
  (`addRecord` push_backs onto a newest-first vector).
- A proposed 500 ms render tick aliases against the caret's own 500 ms toggle;
  250 ms instead.
- The CONTROL/CONTROL-CENTER de-duplication saves two chords but rewrites
  positional literals and renames a learned row — not worth re-opening
  `docs/VERIFICATION.md`.

## Status

Audit only. No firmware changed, no device touched. v0.7 remains
un-hardware-proven and v0.6 remains the rollback release until
`docs/VERIFICATION.md` passes.
