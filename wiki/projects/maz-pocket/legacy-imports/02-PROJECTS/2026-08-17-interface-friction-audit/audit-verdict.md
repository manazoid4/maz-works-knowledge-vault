# MAZ Pocket v0.7.1 — judge's verdict over the UX and FIELD audits

Judged against: `VERSION` = 0.7.1, `docs/RELEASE_RULES.md`, `docs/VERIFICATION.md`
(v0.7 is **not** hardware-proven; v0.6 remains the rollback release),
`docs/V070-FIELD.md`, `RELEASE_NOTES.md`, `CHANGELOG.md`.

Every claim below was re-opened at the cited `file:line` in the working tree. No
repo file was edited. The device was not touched.

---

# 1. VERIFICATION

## UX audit

### F1 — stuck `KEY_ESC` in the held table — **PARTLY-TRUE (substance CONFIRMED, one sub-claim WRONG)**

Provable from code alone. No device needed to establish the leak; a device is
needed only to confirm the user-visible sequence and to regression-test the fix.

CONFIRMED, exactly as written:

- `keyboard.cpp:212-218` — with Fn held, the down event is emitted as `k.fnCode`
  (`KEY_ESC` for `` ` ``, `keyboard.cpp:48`).
- `keyboard.cpp:222-230` — that *emitted* code, `KEY_ESC`, is what enters `_held`.
- `keyboard.cpp:187-192` — Fn is consumed locally; releasing Fn first sets
  `_fn = false` with no other bookkeeping.
- `keyboard.cpp:231-239` — the key-up for `` ` `` is emitted as `KEY_GRAVE` and the
  removal loop searches for `KEY_GRAVE`. `KEY_ESC` is never removed.
- `keyboard.h:39` — `HELD_MAX = 8`; `keyboard.h:54-55` — a flat array, so once
  `_heldCount` reaches 8 no further key can register as held
  (`keyboard.cpp:226`). `KB.held(KEY_SPACE)` then fails and push-to-talk
  (`comm.cpp:75`, `home.cpp:97`) silently stops arming. Six leakable codes exist
  (`KEY_ESC/UP/DOWN/LEFT/RIGHT/DELETE`, `keyboard.cpp:48,61,87,100-102`).
- `shell.cpp:458-462` and `shell.cpp:366-369` are quoted correctly.

**WRONG sub-claim:** *"That ESC press never pops, because the `KEY_ESC` release
event never arrives (`shell.cpp:389`)."* The release does arrive. It arrives as
`KEY_GRAVE`, and `navFallback` (`shell.cpp:266-275`) rewrites it to `KEY_ESC` at
`shell.cpp:375-378`, so `shell.cpp:389` sees `ev.code == KEY_ESC` and pops
normally. The first press therefore behaves correctly.

**The audit under-states its own finding in one place.** On a *second* Fn+`` ` ``
press the existing entry is found "known" at `keyboard.cpp:224-226`, so `since` is
**never refreshed**. `heldFor(KEY_ESC)` grows monotonically from the very first
press for the rest of the session. Consequences, all confirmed against
`shell.cpp:458`:

1. A short Fn+`` ` `` tap pops correctly, and then ~600 ms later `goHome()` fires
   unprompted, because `gEscHandled` was cleared on that down and `held(KEY_ESC)`
   is still true.
2. Every ESC press after that clears `gEscHandled` on down and immediately
   satisfies `heldFor > 600`, so ESC becomes "teleport to Home" on the *down*
   edge, before the app ever sees the release.

Note that `KB.held(KEY_ESC)` is only ever populated by a real Fn+`` ` `` chord —
the bare-`` ` `` nav-fallback path stores `KEY_GRAVE`. So hold-ESC-to-Home only
works via the chord today, and the leak only fires via the chord.

**Verdict: the highest-impact finding in either audit, and it stands.**

### F2 — 33-char hint truncation — **CONFIRMED**

`ui.cpp:133-136` (`char buf[34]; snprintf(..., "%.33s", ...)`). Verified against
the screenshots, not just the source:

- `recall.png` renders `UP/DOWN choose   ENTER open   ESC` — `surfaces.cpp:32` is
  38 chars.
- `wifi.png` renders `W wifi   S scan   C host setup` — `H test` is gone entirely,
  and `H` is the only host-reachability probe on that screen.
- `nudge.png` renders `ENTER inspect   N nudge   R refre` — the audit did not even
  list this one; `R` is the *only working key* on that screen and its label is cut.

### F3 — `pop()` re-runs `onEnter()` — **CONFIRMED**

`shell.cpp:339-347` calls `gStack.back()->onEnter()` on the parent. All four cited
victims verified: `product_apps.cpp:78` (Decision clears both fields),
`product_apps.cpp:109-111` (Sprint clears `_goal`), `notes_tasks.cpp:61-65` (Notes
forced back to `Mode::List`), `voice_apps.cpp:305-312` (Capture calls
`beginVoice()` — an unrequested recording).

### F4 — hold-ESC ignores `gEscClaimed` — **CONFIRMED**

`shell.cpp:458` tests `!gEscHandled` only; `gEscClaimed` is set at
`shell.cpp:371`/`384` and never consulted. Sub-state ESC handlers confirmed at
`control_center.cpp:56-60`, `v03.cpp:379`, `product_apps.cpp:52`,
`core_console.cpp:38,42`.

### F5 — hub rows clipped, 5-item lists scroll — **CONFIRMED**

`surfaces.cpp:59` `visible = 4`; `surfaces.cpp:69` `y = BODY_Y + 17 + row*25` →
rows at 32/57/82/107, height 21, so row 4 spans y 107-128. Hint bar starts at
`SCREEN_H - HINT_H = 121` (`theme.h:9,12`) and is drawn *after* the app
(`shell.cpp:485-487`), so it paints over the row. Visible in `desk.png`.
`RECALL_ITEMS` and `FLOW_ITEMS` are exactly 5 (`surfaces.cpp:108-122`).
The proposed geometry (5 rows, pitch 18, first at `BODY_Y+15`) ends at y 118 —
arithmetic checks out, and `control_center.cpp:100` already ships `visible = 5`,
so this is a precedent, not an invention.

### F6 — Home UP/DOWN dead — **CONFIRMED**

`home.cpp:80-82` handles ENTER/RIGHT/LEFT only. `KEY_UP`/`KEY_DOWN` fall through
the shortcut scan (`home.cpp:84-92`, no descriptor uses those codes) and return
false; `navFallback(KEY_UP)` is `KEY_NONE` (`shell.cpp:266-275`), so nothing
happens. `move()` (`home.cpp:158-164`) wraps modulo 6, so `move(±TABLE_COLS)`
is correct with `TABLE_COLS = 3` (`theme.h:23`).

### F7 — no numeric list selection — **CONFIRMED as fact, risk UNDER-STATED**

`common.h:124-137` handles `KEY_UP`/`KEY_DOWN` only. But note the call ordering:
`SurfaceHub::onKey` (`surfaces.cpp:36`) and `InboxApp::onKey`
(`product_apps.cpp:53`) invoke `_cursor.onKey()` **before** their own key
handling. Adding digits to `ListCursor` therefore silently claims digits on
*every* list screen at once, including any that later want a digit. That needs a
per-screen sweep, not the three-file spot check the audit offers.

### F10 / F11 / F12 / F13 / F14 (spot-checked)

- **F10 CONFIRMED** — `surfaces.cpp:97-106` (8 rows) vs `control_center.cpp:32-42`
  (9 rows); `network`, `talk`, `tools`, `settings` duplicated in both.
- **F11 CONFIRMED, hazardous as sequenced** — `shell.cpp:154-161` does
  `pop(); pushById(target)`. But the proposed `pop(); goHome(); pushById()`
  drives `goHome()` (`shell.cpp:349-351`) through every parent's `onEnter()`. If
  CAPTURE is on the stack, `voice_apps.cpp:305-312` starts a 5-minute recording
  mid-transition. This is F3's bug weaponised. Do not ship F11 before F3.
- **F12 CONFIRMED** — `core_console.cpp:89` prints *"Configure CONTROL > MAZ
  CORE"*; that row is `control_center.cpp:35` with `target == nullptr`, and its
  detail view swallows every key but ESC (`control_center.cpp:55-61`). The
  instruction on screen points at a screen that cannot do the thing. Host setup
  is only in the legacy screen, reached via `system_apps.cpp:282`
  (`case 7: pushById("wifi")`), registered as *"Legacy Connections"*
  (`registry.cpp:42`).
- **F13 PARTLY-TRUE.** All four wrong help lines CONFIRMED at
  `system_apps.cpp:543-573`: `TAB` is handled only in Tasks; Home's 1-4 are quick
  actions (`home.cpp:67-74`) and there are six cells not eight; `/` is
  `navFallback`'s RIGHT (`shell.cpp:271`); `W` is Wi-Fi (`registry.cpp:19`) and
  stopwatch has no shortcut (`registry.cpp:37`). The ESC = Fn+`` ` `` / arrows =
  Fn+`; . , /` gap is CONFIRMED — `docs/USAGE.md:45-50` writes "ESC" and "Hold
  ESC" as though a key exists. **WRONG in one detail:** Fn+Space, Fn+F and Fn+1-4
  *are* documented — `RELEASE_NOTES.md:46-51` and `docs/V070-FIELD.md:29,33`.
  They are missing from the on-device help only.
- **F14 CONFIRMED** — `v03.cpp:384` `if (_summary.agents.empty()) return false;`
  sits above ENTER and N; `v03.cpp:378` puts `R` above the guard, so the audit is
  right that only `R` works. `nudge.png` shows the dead-end and the truncated hint.

## Field audit

### #1 — legacy v0.3 drain blocks the loop and can double-send — **CONFIRMED, and worse than stated**

- `shell.cpp:472` calls `apps::updateProductServices()` every frame.
- `product_apps.cpp:254-290`: a 15 s tick that does `store::loadRecords("outbox", 8)`,
  `host::startSession()`, `host::talkAudio()` / `host::brainDump()` — all blocking,
  with `http.setTimeout(60000)` (`mazhost.cpp:78`). The `// one blocking LAN job
  per service pass` comment at `product_apps.cpp:288` is real.

**Duplicate-send claim — CONFIRMED that both drains can act on the same record.**
`field::submitNextOutbox()` (`field.cpp:188-211`) selects
`kind == "outbox" && status == "queued"` with `source ∈ {beam, talk, talk-context}`.
`product_apps.cpp:257-267` selects the same kind/status with
`source ∈ {talk, braindump}`. **`source == "talk"` is claimed by both.** The
async path leaves the record at `status == "queued"` until
`finishOutboxAudio()` marks it `done` (`field.cpp:111-112`), which cannot run
until the worker completes — and both drains run on the same UI task in the same
`shell::loop()` pass (`shell.cpp:470` then `:472`). A 15 s tick landing inside
that window re-uploads the identical WAV synchronously and writes a second inbox
record. Two answers for one question.

**Neither audit spotted the sharper hazard.** `product_apps.cpp:285` calls
`store::remove(item.ref)` on success — deleting the WAV that the host worker may
still be streaming from its own FreeRTOS task (`host_worker.cpp:110-118` →
`mazhost.cpp:121-154`). That is a cross-task file race, not just a duplicate.
Unproven, but it raises this from "annoying" to "must fix".

### #2 — a finished COMM answer strands the host worker — **CONFIRMED, fully**

Every gate the audit names checks out:

- `host_worker.cpp:148-151` — `canSubmit()` returns true only for `Idle` /
  `FailedToStart`. A completed job parks in `State::Done` (`host_worker.cpp:134`).
- `takeTalkResult()` (`host_worker.cpp:232-237`) is the **only** thing that
  returns a `TalkAudio` job to Idle, and grep confirms exactly one caller:
  `comm.cpp:332`, inside `CommApp::consumeWorkerResult()`, reachable only from
  `CommApp::onEnter/onKey/update` (`comm.cpp:74,112,157`) — i.e. only while COMM
  is the top app.
- `field.cpp:257` `default: break;  // COMM/PC results belong to their caller.`
- `field.cpp:267-269` returns early for the whole of `update()` while the worker
  is not Idle — so Beam pull, outbox drain and telemetry all stop.
- Every other submitter is gated by the same `canSubmit()`:
  `submitOutboxAudio` (`:196`), `submitOutboxBeam` (`:207`), `submitBeamPull`
  (`:217`), `submitSystemStatus` (`:225`), `submitPcAction` (`:185`). Quick keys
  1-4 go through `submitPcAction` at `field.cpp:333` and therefore fail.
- The invitation is real: `comm.cpp:64` *"PC working in background   ESC safe"*.

One nuance the audit did not note, which makes the symptom nastier:
`host_worker::busy()` (`:277-280`) is **false** in the `Done` state, so nothing on
screen indicates the worker is jammed. It looks idle and behaves blocked.

### #3 — results land on a dark screen — **CONFIRMED**

`notify.cpp:33-41` never touches brightness; `shell.cpp:483` `if (gScreenOff)
return;` skips the render entirely, so the toast is not even drawn;
`theme.h:59` `T_TOAST = 1800` is shared by all four kinds; `shell.cpp:360`
dismisses on any key-down.

### #4 — reminder sweep re-reads the whole store every second — **CONFIRMED**

`product_apps.cpp:292-297` (1000 ms cadence, unconditional
`store::loadRecords("reminder", 64)`), and `store.cpp:333-336` reads
`records.tsv` with `SIZE_MAX` and filters by kind *after* parsing every line.
`field::refreshCounts()` (`field.cpp:62-83`) does three more full reads every 5 s
(12 s in FIELD), and already computes `gReminderDue` at `field.cpp:79-82`.

### #5 — full repaint 10×/s regardless of `dirty()` — **CONFIRMED**

`shell.cpp:480-491` verbatim. `pushSprite` moves 240×135×2 = 64,800 B per paint.
Caveat the audit missed: the proposed `> 500` aliases against the caret's own
500 ms toggle (`common.h:101`, `(millis()/500)%2`) and can make the caret look
frozen. Use 250 ms — still a 4× reduction, no aliasing.

### #6 — Wi-Fi joins busy-wait up to 24 s on the UI thread — **CONFIRMED**

`net.cpp:77-78` (12 s busy-wait), `net.cpp:92-96` (`connectSaved()` runs it twice),
`net.cpp:165-172` (driven from `net::update()`, called every frame at
`shell.cpp:469`). This is the measured `loop_max = 4208 ms`.

### #8 / #11 / #12 / #14 (spot-checked) — **CONFIRMED**

`v03.cpp:374` `onEnter() { refresh(); }` → `v03.cpp:431` `host::assurance()`,
blocking, before `shell::push()` (`shell.cpp:320-327`) ever paints.
`mazhost.cpp:77-78` sets connect 1800 ms / read **60000 ms** for every call.
`shell.cpp:82` exempts only `Sys.recording`. `core_console.cpp:32` blocks twice on
entry and `core_console.cpp:60-62` polls a running job every 1500 ms
synchronously.

### #9 — record store fully read/rewritten, never pruned — **PARTLY-TRUE**

The cost analysis is CONFIRMED: `store.cpp:333-357` (whole-file read, per-line
`Record` of six `std::string`s, sort, then truncate), `store.cpp:371-377`
(`addRecord` = full load + full save), `store.cpp:379-386` (`updateRecord`
identical for a one-field change). Nothing prunes.

Two errors in the proposed remedy:

1. **WRONG:** *"needs `store::saveRecords` exposed in `store.h`"* — it is already
   declared at `store.h:91`.
2. **WRONG as written:** *"The vector arrives newest-first from `loadRecords`, so
   this is a `resize`."* `addRecord` (`store.cpp:374-375`) does
   `loadRecords(nullptr, MAX)` — newest-first — then **`push_back`s the new record
   at the end**. A `resize(150)` inside `saveRecords()` on a full store would
   discard the record just written. Any prune must sort or insert at the front
   first. This is exactly the kind of change that must not be hand-waved on a
   device whose store holds unsent outbox work.

### #15 — stalls eat key presses — **CONFIRMED in code, UNPROVABLE off-device**

`keyboard.cpp:148-153` drops the newest event (so a key-*up* can be the casualty);
`keyboard.cpp:142` enables `CFG_OVR_FLOW_IEN`; `keyboard.cpp:258` writes
`REG_INT_STAT` without ever reading it, so overflow is invisible. Whether the
TCA8418 actually overflows within the observed 4.2 s stall cannot be established
from source.

---

# 2. RECONCILIATION

Merged where both audits found one defect from two angles:

| # | Merged finding | UX | FIELD | Note |
|---|---|---|---|---|
| M1 | `_held` table desynchronises and lies about key state | F1 (Fn-release ordering, deterministic) | 15 (dropped key-up after a stall, probabilistic) | **Same corrupt structure, two causes.** F1's `_emitted[4][14]` fix (56 B, no heap) cures the deterministic path; #15's overflow read and drop-oldest cure the stall path. Ship F1 first — it is provable and reproducible; #15 needs the device. |
| M2 | Screens are destroyed on the way out and reconstructed on the way in | F3 (`onEnter` re-fires, drafts die, mic re-arms) | 10 (`pop()` deletes the instance, reply/scroll/cursor die) | Same root at `shell.cpp:339-347`. F3's `onResume()` split is the correct primitive; #10's file-static `_reply` and per-hub cursors are then optional polish on top. |
| M3 | Offline empty state names an action and refuses to perform it | F14 (`T call PC`) | 12 (`ENTER call PC`) | **Adjudicated to ENTER.** ENTER is already advertised in the hint bar and is currently dead in that exact state (`v03.cpp:384-385`); `T` would be a fourth undocumented letter on a device whose help screen is already wrong (F13). |
| M4 | The hint bar is the only place secondary actions are named, and it truncates | F2 | 12 (partly — "the hint should say R retry") | One string pass fixes both. |
| M5 | Entering a screen carries a blocking network call | F3 (indirectly: `onEnter` does work) | 8, 14, 7 | The codebase already owns the pattern — `comm.cpp:287` `_sendAt = millis() + 120`, `dictate.cpp:84-85`. Apply it uniformly rather than per-screen. |

### Adjudicated contradictions

1. **"More redraws for feedback" (UX F8/F9 live hub and Home glyphs) vs "fewer
   redraws for loop time" (FIELD 5).** *Not actually in conflict.* F8/F9 change
   what a render *draws*, not how often it happens. With FIELD 5's throttle at
   250 ms, a live hub value still refreshes 4×/s — far beyond human need for
   "is anything waiting?" — while the blit count drops 4×. Do FIELD 5 first;
   F8/F9 then cost nothing extra. The one hard constraint on F8 is the audit's own:
   the `live()` callbacks must be pure reads of `Sys`/`Cfg`. No `host::` call may
   appear inside `render()`.

2. **FIELD 3 wants toasts to live twice as long; the UX audit complains toasts
   already cover list rows for 1.8 s** (visible in `recall.png`, where
   "BrainDump saved" hides two rows of RECALL). *Split by kind.* Double only
   `Warn`/`Error` — the ones you must read. `recall.png`'s offender is a
   `Note::Success`, so it is untouched. Both audits get what they asked for.

3. **UX F11 (palette should `goHome()` first) vs UX F3 (`onEnter` must stop
   firing on the way back).** F11 is *only* safe after F3. As things stand,
   `goHome()` walks `onEnter()` through every parent and can start a recording
   (`voice_apps.cpp:310`). Ordering, not contradiction — but it kills F11 for
   v0.7.2.

4. **FIELD 5's 500 ms vs the caret's 500 ms period.** Adjudicated to 250 ms
   (see §1).

---

# 3. RANKING FOR THE CURRENT RELEASE REALITY

v0.7.1 is shipped, CI-green, **not** hardware-proven; v0.6 is still the rollback
per `docs/RELEASE_RULES.md` ("CI green means source/tests/package integrity, not
physical Cardputer proof"). The device is live on Wi-Fi and paired. That reality
sets the bar: a v0.7.2 patch may contain only changes whose failure mode is
visible in one glance at the screen and whose blast radius does not reach the
keyboard, the network state machine, the record store or the worker contract.

## SHIP NOW — v0.7.2 patch

| # | Finding | File:line | Minimal change | Diff | What could regress |
|---|---|---|---|---|---|
| S1 | F2 hint truncation | `surfaces.cpp:32`, `core_console.cpp:29`, `system_apps.cpp:43,358,580`, `comm.cpp:67` | Delete the redundant `ESC back` / `ESC home` tail (the `<ESC` chip at `ui.cpp:123-129` already states it permanently, in colour); shorten `comm.cpp:67` to `"hold SPACE call  Fn+SPACE ask"` | ~12 | Nothing executable. Only risk is over-trimming a string below its useful label — re-count each against the 33-char budget. |
| S2 | F13 stale on-device help | `system_apps.cpp:543-573` | Delete the four wrong lines (TAB / 1-8 / `/` / `C W Q V`); add a `#KEYS` block naming ESC = Fn+`` ` ``, arrows = Fn+`; . , /`, Fn+Space, Fn+F, Fn+1-4; add `H  help` under `#HOME` | ~20 | None (a `const char*` array). Only regression: the help list grows past its scroll window — check `HELP_COUNT` paging. |
| S3 | F6 Home vertical arrows dead | `home.cpp:81-82` | `if (e.code == KEY_DOWN) { move(+TABLE_COLS); return true; }` and the `KEY_UP` mirror | 4 | None. `move()` already wraps modulo 6 (`home.cpp:158-164`). |
| S4 | F5 hub row clipped under the hint bar | `surfaces.cpp:59,69,74-75` | `visible = 5`, pitch 18, height 16, first row `BODY_Y + 15` | 4 | Cosmetic only. Font0 is 8 px in a 16 px row; `control_center.cpp:100` already ships `visible = 5`. Verify `ui::scrollBar` (`surfaces.cpp:84`) with the new window. |
| S5 | M3 offline empty state (F14 + FIELD 12) | `v03.cpp:370-384` | Above the `agents.empty()` guard: `if (_summary.agents.empty() && !_summary.ok && e.code == KEY_ENTER) { shell::pushById("talk"); return true; }`; `hints()` returns `"ENTER call PC   R retry"` in that state | 8 | ENTER now leaves OPS from the offline state. Guard on `!_summary.ok` so "No active agents" (a healthy state) still does nothing. |
| S6 | F4 hold-ESC ignores a claimed ESC | `shell.cpp:458` | add `&& !gEscClaimed` | 1 | Hold-ESC-to-Home stops working *from inside a sub-state* — which is the intent. It does **not** cure the F1 teleport; only F1 does. |
| S7 | FIELD 11 screen dims while the PC owes you an answer | `shell.cpp:82` | `if (timeout == 0 \|\| Sys.recording \|\| host_worker::busy() \|\| voice::isPlaying()) return;` | 2 | Battery. Bounded by the HTTP timeouts, but note `mazhost.cpp:78` is 60 s — the backlight can stay lit for a minute on a dead link. Acceptable; better after the timeout reduction lands. Confirm `voice::isPlaying()` is declared in the header `shell.cpp` already includes. |
| S8 | FIELD 3 results arrive on a dark screen | `notify.cpp:33-41`, `theme.h:59` | `shell::wake()` inside `post()`; per-kind lifetime — `T_TOAST` for Info/Success, `T_TOAST*2` for Warn/Error | 6 | A background notification now lights the panel — a battery cost in the field, and the dim timer re-arms from `gLastInput`. Do **not** double Success/Info: `recall.png` shows a success toast already covering two list rows. |
| S9 | FIELD 5 full blit 10×/s at idle | `shell.cpp:481` | `> 100` → `> 250` (**not** 500) | 1 | Any screen that mutates state without calling `invalidate()` becomes up to 250 ms stale. Two things to eyeball: the `TextField` caret (`common.h:101`) and the portal live-screen mirror (`portal_v2.cpp:694-720`), which streams `gCanvas` and now sees a staler buffer. |
| S10 | F12 "Configure CONTROL > MAZ CORE" points at a dead screen | `control_center.cpp:50,55-61` | In the `_detail` branch, when `_cursor.sel == 2` and the key is ENTER, `shell::pushById("wifi")`; detail hint → `"ENTER host setup   ESC list"` | ~6 | Additive — the detail branch currently returns false for every key but ESC, so nothing is displaced. Makes `core_console.cpp:89` true as written. |

**Total: ~64 lines. No new surface, no new top-level app, no new heap, no change
to the worker contract, the keyboard, the network state machine or the store.**

## NEEDS THE HARDWARE GATE (`docs/VERIFICATION.md`)

Correct findings that must be proven on the device before release.

| Finding | Why it cannot ship blind |
|---|---|
| **UX F1 — `_held` leak** (the single most valuable fix in either audit) | Touches the decode path of **every keystroke on the device**. The leak is provable from source; the fix is not. Repro first (Fn+`` ` ``, release Fn first, watch for the unrequested Home jump ~600 ms later), then verify push-to-talk, Fn+Space and Fn+1-4 still arm. Verification gate item 7. |
| **FIELD 1 — delete the legacy outbox drain** | Removes a shipped delivery path. BrainDump must be re-proven end-to-end through `host_worker` (gate item 7: "BrainDump ... still behave correctly"). The WAV-removed-mid-upload race also needs observing before it is asserted as fixed. |
| **FIELD 2 — TalkAudio strand** | Changes who owns a worker result. The "COMM is not on top" guard must be proven with real turns, including the ESC-mid-turn case that motivates it. Gate item 5 (no freeze) and 6 (real Core answers). |
| **FIELD 6 — non-blocking Wi-Fi** | The single structural change in either audit. Gate items 2 and 3 (scan/connect/backup, and `MAZ-Pocket-Setup` appearing on bad credentials) exist precisely for this state machine. |
| **FIELD 7, 8, 14 — paint-then-work deferral** | Low risk individually, but they change transition timing on three screens; the point of the change is a timing property only the device can show. |
| **FIELD 9 — store prune + single-read counts** | Data loss risk on a store holding unsent outbox work, and the proposed `resize` is wrong as written (§1). Never ship a prune that has not been watched on hardware with a full store. |
| **FIELD 13 — dictation retry** | Audio + storage path; ES8311 constraints; gate item 7. |
| **FIELD 15 — TCA8418 overflow detection** | Cannot be validated from source at all. Requires provoking an overflow on the real expander. |
| **UX F3 / FIELD 10 (M2) — `onResume()` split** | Touches the lifecycle of every app on the device. Also entangled with FIELD 2: if `pop()` stops calling `onEnter()`, `CommApp` loses its only result-consumption path unless FIELD 2 lands first, or `CommApp` gets `onResume() { consumeWorkerResult(); }`. Ship the pair or neither. |
| **UX F7 — digit selection in lists** | Needs a per-screen sweep for digit collisions (`ListCursor::onKey` is called before every screen's own handler), then device confirmation on Tools, Settings, Network, Core and Inbox. |
| **UX F8 / F9 — live hub values and Home state glyphs** | Cheap and correct, but Home and the three hubs are the most-looked-at pixels on the device; a wrong glyph is worse than no glyph. Land after FIELD 5's throttle so the cost is measured in the new regime. |

## DEFER / REJECT

| Finding | Verdict | Constraint or reason |
|---|---|---|
| **UX F11 — palette should `goHome()` first** | **DEFER** to after F3 | Not a constraint violation — an ordering hazard. `goHome()` (`shell.cpp:349-351`) walks `onEnter()` through every parent, and `CaptureApp::onEnter` (`voice_apps.cpp:305-312`) starts a 5-minute recording. Shipping this before F3 makes Ctrl+K a way to start recordings by accident. |
| **UX F10 — dedupe CONTROL CENTER** | **REJECT for 0.7.x** | The audit rates its own risk medium, and correctly: `control_center.cpp:76` (`_cursor.sel == 8`) and the `idx ==` branches in `renderDetail` are positional literals that must all move together. It also renames a row the user has learned. Payoff is 2 chords. Not worth re-opening the verification gate for. Revisit in v0.8 alongside retiring `wifi` (`registry.cpp:42`). |
| **UX "reverse `cycleQuick` on Fn+Shift+n"** | **DEFER** | New chord on a device whose help screen is already wrong. Ship F13 first, then decide. |
| **UX "`SurfaceHub` static `lastSel`"** | **DEFER, fold into M2** | Same root cause as F3/FIELD 10. Doing it standalone means touching `surfaces.cpp` twice (S4 already rewrites `render`). |
| **UX "`<ESC` tick should track internal detail depth"** | **DEFER** | Requires apps to publish sub-state depth — a new `App` API. Out of scope for a patch. |
| **FIELD's own three rejections** (`Settings::save()` NVS diff, live-screen streaming, `MAZSCREEN` counting) | **ENDORSED** | The reasoning holds. Do not re-propose. |
| **A `Transcribe` / `Assurance` job kind on `host_worker`** (the "proper" halves of FIELD 8 and 13) | **DEFER to v0.8** | `docs/RELEASE_RULES.md`: "prefer the existing single bounded Host worker over additional FreeRTOS workers." Adding job kinds is allowed, but FIELD 2 must land first — a second consumer of a worker that already strands is a worse worker. |

---

# 4. SEQUENCE FOR THE SHIP-NOW SET

Three items touch `shell.cpp` and two touch `surfaces.cpp`. Nothing in this set
touches `ui.cpp` — the audits' shared worry about that file applies to the
deferred work, not here.

1. **S1** — hint strings across `surfaces.cpp:32`, `core_console.cpp:29`,
   `system_apps.cpp:43,358,580`, `comm.cpp:67`. Pure text; no dependency.
   Do the `surfaces.cpp:32` edit here so step 4 does not have to.
2. **S2** — `HELP_LINES` (`system_apps.cpp:543-573`). Same file as two of S1's
   edits; do it after so the line numbers settle once.
3. **S5** — `v03.cpp:370-384`. Isolated file.
4. **S4** — `SurfaceHub::render` (`surfaces.cpp:55-86`). After step 1's edit to
   line 32 in the same file.
5. **S3** — `home.cpp:81-82`. Isolated file.
6. **S10** — `control_center.cpp:50,55-61`. Isolated file.
7. **`shell.cpp` in a single pass, top-down** — S7 (line 82), S6 (line 458),
   S9 (line 481). All three are single-line replacements at distinct sites, so no
   offsets shift, but doing them in one edit avoids three re-reads of the file.
8. **S8** — `notify.cpp:33-48` + `theme.h:59`. Last of the behavioural items, so
   `shell::wake()`'s semantics are already settled by step 7. Confirm `notify.cpp`
   can include `shell.h` without a cycle (`shell.cpp` includes `notify.h`, not the
   reverse — it is clean).

**Largest felt improvement per line: S3 (F6), four lines.** It converts the entire
bottom row of Home — CONTROL, RECALL, FLOW, half the product — from three
chorded RIGHT presses to one DOWN, on the screen the user sees more than any
other, every session, forever.

**Largest absolute improvement in the set: S1 + S2 together.** S1 makes `H test`
on the Wi-Fi screen and `R refresh` on OPS visible for the first time; S2 stops
the on-device help from teaching four keys that do not exist and finally names the
Fn chords that every navigation keystroke on this device actually requires. Note
what that pairing implies about the shipped product: the only two documented
back/navigation affordances, "ESC" and "arrows", are chords named nowhere in the
firmware or in `docs/USAGE.md:45-50`.

---

# 5. HONEST GAPS

## What neither audit examined at all

- **First-run and recovery.** The `MAZ-Pocket-Setup` AP and `192.168.4.1` repair
  flow (`net.cpp:160-171`, `portal_v2.cpp`) are verification-gate items 3 and 4
  and got one dismissive mention (FIELD's rejected list) between two audits. The
  worst navigation experience on this device is probably the one a user has when
  Wi-Fi is broken, and nobody looked.
- **The portal / live-screen mirror as a consumer of the render loop.** FIELD 5
  proposes throttling repaints; `portal_v2.cpp:694-720` streams `gCanvas`. A
  staler mirror is a real, unanticipated consequence of a change both audits
  treat as free. Flagged in S9, unmeasured.
- **ES8311 mic/speaker exclusivity.** A stated project constraint, and no finding
  in either audit examines what happens when TTS playback (`voice::isPlaying()`)
  overlaps a hold-SPACE. S7 now makes playback hold the backlight up, which puts
  more attention on that window, not less.
- **SD present vs absent.** Telemetry says `sd_present=false`, so every store
  measurement in FIELD 4/9 was taken against flash. `store::backendName()`
  switches backends; nobody characterised the SD path, and gate item 7 covers SD
  fault behaviour.
- **Memory arithmetic.** Neither audit measured a single proposal against the
  ~150 KB largest-free-block reality it cites in its own preamble. F1's 56-byte
  table and F8's function pointers are obviously fine; FIELD 9's prune is argued
  purely from first principles.
- **App-slot budget.** No one checked any proposal against the `0x180000`
  ceiling in `docs/RELEASE_RULES.md`. All of the ship-now set is small, but that
  is an assumption, not a measurement.
- **The four read-only Control Center detail panes** (`control_center.cpp:117-168`)
  — F10 counts them as dead weight and moves on; nobody asked whether they should
  show something.
- **String overflow outside the hint bar.** F2 fixes the hint bar. Headers and
  list rows use `ui::ellipsis` inconsistently and were never swept.

## Plausible but unproven — do not treat as established

- **F1 crowding out `KEY_SPACE`.** The mechanism is real (`HELD_MAX = 8`, six
  leakable codes). That anyone has hit it, or that it explains an observed
  push-to-talk failure, is speculation. Fix F1 for the teleport; treat the
  push-to-talk death as a bonus, not evidence.
- **FIELD 1's duplicate answer.** The *overlap* is proven (`source == "talk"` in
  both drains). The *timing window* is not — it requires the 15 s tick to land
  while a worker job for the same record is in flight. Likelihood unquantified.
  The WAV-deleted-mid-upload race (`product_apps.cpp:285`) is my addition and is
  equally unproven.
- **FIELD 15's overflow.** `REG_INT_STAT` being written without a read
  (`keyboard.cpp:258`) is CONFIRMED. That the TCA8418 actually overflows in the
  observed 4.2 s stall is not, and cannot be from source.
- **FIELD 9's "eventually `addRecord` fails on a 150 KB block".** Directionally
  right, quantitatively unsupported — no one measured the current `records.tsv`.
- **S7's battery cost.** Asserted "very low" by the audit. With
  `mazhost.cpp:78` at 60 s, one dead-link COMM turn can hold the backlight for a
  minute. Unmeasured either way.

## One thing I could not settle

Whether F1 alone restores correct ESC behaviour, or whether the `navFallback`
double-path (`shell.cpp:266-275` accepting bare `` ` `` as ESC while only the
Fn chord populates `_held`) leaves hold-ESC-to-Home working from one input path
and not the other. It reads as though it does. Prove it on the device before
writing "ESC fixed" in a changelog.
