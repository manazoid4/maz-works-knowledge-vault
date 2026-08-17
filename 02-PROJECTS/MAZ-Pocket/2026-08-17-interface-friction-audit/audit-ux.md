# MAZ Pocket v0.7.1 — interaction audit: friction between menus

Scope: navigation only. Six-surface Home is fixed, no new top-level app, no new
features, no PSRAM-hungry state. Evidence is device screenshots captured today
plus the shipped source at `C:\Users\manaz\maz-pocket`.

## Two facts that frame everything

1. **This device has no ESC key and no arrow keys.** `src/input/keyboard.cpp:47-103`
   — the 4x14 ADV map has no `KEY_ESC`, `KEY_UP/DOWN/LEFT/RIGHT` entries. They exist
   only as `fnCode` overrides: ESC = **Fn+`**, UP = **Fn+;**, DOWN = **Fn+.**,
   LEFT = **Fn+,**, RIGHT = **Fn+/**. Every navigation keystroke on this device is a
   two-key chord. `shell.cpp:266-275 navFallback()` quietly accepts the *bare* keys
   (`;` `.` `,` `/` `` ` ``) as nav when the focused app doesn't consume them — a
   one-key path that is documented nowhere, on the device or in `docs/`.
2. **Menu depth is cheap; the keystrokes to walk it are not.** Home→Settings is
   12 keystroke-chords today. Nearly every finding below is about that ratio.

Baseline journey that is already excellent and must not regress: *Home → ask a
question → read the answer → Home* = **3 actions**. Holding SPACE on Home arms
(`home.cpp:76-79,96-101`), pushes `talk`, and `CommApp::onEnter` sees the key still
held (`comm.cpp:75`) and starts recording in the same gesture. Release sends. ESC
returns. Nothing here needs changing — but see F8: nothing on Home says so.

---

## F1. A single Fn-release ordering permanently turns ESC into "go Home"

**Journey hurt:** every back press, everywhere, for the rest of the session.

**Evidence:** `keyboard.cpp:212-239`. On key-down with Fn held, the event is emitted
as the *fn* code (`KEY_ESC`) and `KEY_ESC` is inserted into the `_held` table. On
key-up, `_fn` is already false if the user lifted Fn first, so the event is emitted as
`KEY_GRAVE` and the removal loop (`:232-238`) looks for `KEY_GRAVE` — `KEY_ESC` is
never removed. `KB.held(KEY_ESC)` is then true forever.

Consequences in `shell.cpp:458-462`:
- That ESC press never pops, because the `KEY_ESC` release event never arrives
  (`shell.cpp:389`).
- ~600 ms later `KB.heldFor(KEY_ESC)` exceeds the threshold and `goHome()` fires
  unprompted.
- `gEscHandled` latches true and is only cleared on the next ESC *down*
  (`shell.cpp:366-369`) — so the **next** ESC press sees a stale multi-second
  `heldFor` and jumps to Home immediately. ESC is now "home", not "back", until a
  `` ` ``-released-first press happens to clear the entry.

The same leak applies to Fn+; / . / , / / (stale `KEY_UP/DOWN/LEFT/RIGHT`). With
`HELD_MAX = 8` (`keyboard.h:39`) six phantom entries can crowd out `KEY_SPACE`, at
which point `KB.held(KEY_SPACE)` fails and the flagship one-hold-to-talk gesture
(`comm.cpp:75`, `home.cpp:97`) silently stops starting the recording.

**Keystrokes:** ESC before = 1 chord = back. ESC after the leak = 1 chord = teleport
to Home + re-walk the whole menu (up to 12 chords to get back where you were).

**Minimal change:** in `Keyboard::decode()`, remember what code each physical key
emitted. Add `uint8_t _emitted[4][14]` to `keyboard.h` (56 bytes, no heap); on down
store `e.code` at `[row][col]`; on up, use `_emitted[row][col]` for both the emitted
event code and the `_held` removal, then clear it. Alternative narrower fix: when Fn
goes up (`keyboard.cpp:187-192`), purge `KEY_ESC/UP/DOWN/LEFT/RIGHT/DELETE` from
`_held`.

**Risk:** low, contained to one function. Reproduce first: press Fn+`, release Fn
before `` ` ``, then watch for an unrequested jump to Home ~600 ms later.

**Effort:** ~10 lines.

---

## F2. The hint bar silently eats the last affordance on at least four shipped screens

**Journey hurt:** discovery of every secondary action.

**Evidence:** `ui.cpp:133-136` hard-truncates hints to 33 chars. This is visible in
the captured screenshots, mid-word:

| screenshot | hint string in source | what the device shows |
|---|---|---|
| `talk.png` | `comm.cpp:67` `"hold SPACE call   Fn+SPACE Context Ask"` | `hold SPACE call  Fn+SPACE Contex` |
| `core.png` | `core_console.cpp:29` `"R refresh  ENTER project  ESC back"` | `R refresh ENTER project ESC bac` |
| `wifi.png` | `system_apps.cpp:358` `"W wifi   S scan   C host setup   H test"` | `W wifi  S scan  C host setup` |
| `control/flow/recall.png` | `surfaces.cpp:32` `"UP/DOWN choose   ENTER open   ESC home"` | `UP/DOWN choose  ENTER open  ESC` |

The `wifi.png` case is the worst: `H` is the only way to test whether MAZ Host is
reachable (`system_apps.cpp:445-452`), and its label is completely invisible on the
only screen that offers it.

**Keystrokes:** unbounded — an invisible action is an action nobody presses.

**Minimal change:** the `<ESC` chip (`ui.cpp:123-129`) already states the back
affordance permanently, in colour, with a depth tick. Delete the redundant
`"ESC back"` / `"ESC home"` tail from every hint string that has one — that alone
frees 8-9 characters and un-truncates `surfaces.cpp:32`, `core_console.cpp:29` and
`system_apps.cpp:43,358,580`. Shorten `comm.cpp:67` to `"hold SPACE call  Fn+SPACE ask"`.

**Risk:** none (string edits). **Effort:** ~12 lines.

---

## F3. Returning to a screen re-runs `onEnter()`, wiping drafts and re-arming the mic

**Journey hurt:** any Fn+Space Context Ask from a screen you were typing on; Capture → Inbox → back.

**Evidence:** `shell.cpp:339-347` — `pop()` calls `gStack.back()->onEnter()` on the
*parent*. Every app is constructed fresh by `pushById` (`registry.cpp:60-63`), so
several apps legitimately treat `onEnter` as a constructor — and then get it fired
again on the way back:

- `product_apps.cpp:78` `DecisionApp::onEnter` clears `_what` and `_reason`. Type a
  decision, Fn+Space to ask MAZ about it (`shell.cpp:287-292` pushes `talk` from any
  screen), ESC back → **both fields are empty**.
- `product_apps.cpp:109-111` `SprintApp::onEnter` clears `_goal`. Same loss, and its
  own `B` key pushes `braindump` (`product_apps.cpp:127`), guaranteeing the round trip.
- `notes_tasks.cpp:61-65` `NotesApp::onEnter` forces `Mode::List` — an in-progress
  note edit is discarded on return, with no prompt.
- `voice_apps.cpp:305-312` `CaptureApp::onEnter` calls `beginVoice()`. Press `I` to
  check the Inbox (`voice_apps.cpp:339-342`), press ESC, and the device **starts a new
  5-minute recording by itself** and drops `_result`.

**Keystrokes:** before = your text still exists (0). After = retype it (dozens), or a
WAV you did not ask for.

**Minimal change:** add `virtual void onResume() {}` to `core/app.h` next to
`onEnter`, change `shell.cpp:345` to call `onResume()`, and give the four screens that
genuinely want fresh data (`InboxApp`, `BeamApp`, `HomeApp`, `AgentsV3App`) an
`onResume() { reload(); }` one-liner.

**Risk:** low; the failure mode is a stale list until the next explicit refresh.

**Effort:** ~15 lines across 6 files.

---

## F4. Hold-ESC-to-Home fires even when the screen already consumed that ESC

**Journey hurt:** leaving any detail/modal state slightly slowly.

**Evidence:** `shell.cpp:458-462` checks `!gEscHandled` but ignores `gEscClaimed`
(set at `shell.cpp:371`). In Control Center detail (`control_center.cpp:56-60`),
Agents detail (`v03.cpp:379`), Inbox detail (`product_apps.cpp:52`), Core's
Actions/Result views (`core_console.cpp:38,42`), the Wi-Fi password field
(`control_center.cpp:324-329`) and the Beam composer (`field_apps.cpp:151-156`),
ESC-down is claimed to exit the sub-state. Hold that same press past 600 ms and you
also get thrown to Home — losing, e.g., a scan list you spent a scan cycle building.

**Keystrokes:** before = 1 chord and a surprise + up to 12 chords to return. After = 1 chord.

**Minimal change:** `shell.cpp:458` →
`if (KB.held(KEY_ESC) && KB.heldFor(KEY_ESC) > 600 && !gEscHandled && !gEscClaimed)`.

**Risk:** none. **Effort:** 1 line.

---

## F5. Surface hub rows are drawn under the hint bar, and 5-item lists need scrolling to show 5 items

**Journey hurt:** CONTROL / RECALL / FLOW — three of the six Home surfaces.

**Evidence:** `surfaces.cpp:59,69` — `visible = 4`, first row at `BODY_Y + 17 = 32`,
pitch 25, height 21. The fourth row occupies y 107-128; the hint bar starts at
y 121 (`theme.h:11-14`). It is clipped in `desk.png`, `flow.png` and `recall.png`.
Worse: `RECALL_ITEMS` and `FLOW_ITEMS` are exactly **5** entries
(`surfaces.cpp:108-122`), so the last item (VIEWER, TASKS) requires a scroll into a
list that would otherwise fit whole. `CONTROL_ITEMS` is 8 and shows 4.

**Keystrokes:** RECALL→VIEWER and FLOW→TASKS cost a wasted DOWN each, forever.

**Minimal change:** in `SurfaceHub::render`, `visible = 5`, row pitch 18, row height
16, first row at `BODY_Y + 15` (15 + 5×18 = 105, clearing the hint bar). RECALL and
FLOW then need no scrolling at all, and CONTROL shows 5 of 8.

**Risk:** cosmetic only; Font0 is 8 px so a 16 px row is comfortable.

**Effort:** 4 lines.

---

## F6. Home is a 3x2 grid whose vertical arrows are dead

**Journey hurt:** reaching CONTROL, RECALL, FLOW — the entire bottom row of Home.

**Evidence:** `home.cpp:81-82` handles only `KEY_RIGHT` and `KEY_LEFT`; `move()`
(`:158-164`) wraps through a flat vector. `lvgl_ui.cpp:39-43` lays those cells out as
`TABLE_COLS = 3` × 2 rows. Registry order (`registry.cpp:11-16`) puts COMM CAPTURE
OPS on row 1 and CONTROL RECALL FLOW on row 2. UP/DOWN return false, fall through
`navFallback` (`shell.cpp:375-387`), and do nothing at all.

**Keystrokes:** Home→CONTROL = 3 RIGHT chords. After: 1 DOWN.

**Minimal change:** in `HomeApp::onKey`,
`if (e.code == KEY_DOWN) { move(+TABLE_COLS); return true; }` and the mirror for
`KEY_UP` — `move()` already wraps modulo the count.

**Risk:** none. **Effort:** 4 lines.

---

## F7. Lists cannot be selected by number

**Journey hurt:** every list on the device.

**Evidence:** `ListCursor::onKey` (`common.h:124-137`) understands only UP/DOWN. Every
list screen inherits that limit: `SurfaceHub`, `ControlCenterApp`, `ToolsApp`
(9 rows, 5 visible), `SettingsApp` (9 rows), `NetworkV5App` (8 rows),
`CoreConsoleApp`, Inbox, Beam. Digits are unused in all of them — Home's 1-4 quick
keys are `home.cpp:67-74`, which does **not** use `ListCursor`.

**Keystrokes, Home → Settings, today:** RIGHT ×3, ENTER, DOWN ×7 (`surfaces.cpp:97-106`,
SETTINGS is index 7), ENTER = **12**. With F6 + F7: DOWN, ENTER, `8` = **3**.

**Minimal change:** in `ListCursor::onKey`, map `e.ch` `'1'..'9'` to
`sel = ch - '1'; clamp(count); return true;` when the index is in range.

**Risk:** low — the only screens that both use `ListCursor` and want digits are text
entry sub-modes, and those all intercept the field before reaching the cursor
(`field_apps.cpp:150`, `notes_tasks.cpp:70`, `control_center.cpp:202`).

**Effort:** 6 lines.

---

## F8. Hub rows show a caption where the value belongs

**Journey hurt:** "is anything waiting for me?" — the reason CONTROL and RECALL exist.

**Evidence:** `HubItem.sub` is a compile-time constant (`surfaces.cpp:18-22`), so
`recall.png` reads `BEAM — received text` while `Sys.beamUnread` holds the actual
count (`field.cpp:74-77`), `flow.png` reads `SHIFT CLOCK — field work` while
`Sys.shiftRunning`/`shiftSeconds` are live, and `desk.png` reads
`WI-FI — scan / connect` with no hint of whether the PC is reachable
(`host::linkName()`, `Sys.hostOnline`). The user opens the row to learn what the row
could have told them. The hub header status is a constant too
(`surfaces.cpp:127-138`: `"PC + DEVICE"`, `"LOCAL + SD"`, `"TIME + ACTION"`).

**Keystrokes:** before = ENTER + ESC (2 chords) per row just to look. After = 0.

**Minimal change:** add `const char* (*live)()` to `HubItem`, defaulting to `nullptr`;
in `render`, use `_items[idx].live ? _items[idx].live() : _items[idx].sub`. Populate
it for four rows only: BEAM (`beamUnread`), SHIFT CLOCK (elapsed), MAZ CORE /
PC-COMM (`host::linkName()`), INBOX (count). Same trick for the header status.

**Risk:** low; keep the callbacks pure reads of `Sys`/`Cfg` — no blocking host calls
inside `render()`.

**Effort:** ~25 lines.

---

## F9. Home tiles carry a decorative badge where a state glyph would fit

**Journey hurt:** the glance that should replace a drill-down.

**Evidence:** `home.cpp:148-156 iconFor()` returns a fixed character per app id;
`lvgl_ui.cpp:53-64` draws it in a dedicated 22×18 box. The only live element on Home
is the single NOW line, and `field::nowText()` (`field.cpp:297-308`) is strictly
priority-ordered — it shows *one* of "AGENT NEEDS MAZ", "OUTBOX n WAITING",
"BEAM n NEW", "n AGENTS WAIT". Everything below the winner is invisible until you
open the surface. `nudge.png` shows the cost: the user walked into OPS to be told
"PC OFFLINE".

**Keystrokes:** before = ENTER + ESC per surface to check it. After = 0.

**Minimal change:** make `iconFor()` consult `Sys`: `'!'` for `nudge` when
`Sys.agentQuestion`, the digit of `Sys.beamUnread` for `recall`, `'*'` for `desk`
when `host::configured() && !Sys.hostOnline`. Home already repaints twice a second
(`home.cpp:102-106`), so nothing else changes.

**Risk:** none. **Effort:** ~10 lines.

---

## F10. CONTROL CENTER is a second copy of the CONTROL surface, one level deeper

**Journey hurt:** everything under CONTROL.

**Evidence:** `surfaces.cpp:97-106` (`CONTROL_ITEMS`, 8 rows) vs
`control_center.cpp:32-42` (`CONTROL_ITEMS`, 9 rows). Four targets are identical:
`network`, `talk`, `tools`, `settings`. The first row of the CONTROL surface is
`{"CONTROL CENTER", "everything", "control"}` — so Home→CONTROL→CONTROL CENTER→
SETTINGS reaches at depth 4 exactly what Home→CONTROL→SETTINGS reaches at depth 3,
via a list that looks almost the same (`desk.png` vs `control.png`: same typography,
overlapping rows, different order). Only five Control Center rows are unique, and
four of those are read-only text panes (`renderDetail`, `:117-168`).

**Keystrokes:** the duplicate path costs +2 chords and one wrong mental model.

**Minimal change:** delete the four duplicated rows from `control_center.cpp:32-42`,
leaving OVERVIEW / MAZ CORE / LIVE SCREEN / STORAGE / M5LAUNCHER, and rename the
`desk` entry from `"CONTROL CENTER" / "everything"` to `"STATUS" / "overview + storage"`
(`surfaces.cpp:98`).

**Risk:** medium — `control_center.cpp:76` (`_cursor.sel == 8`) and the `idx ==`
branches in `renderDetail` are positional literals that must all move together.

**Effort:** ~12 lines.

---

## F11. Ctrl+K stacks the result on whatever screen you launched it from

**Journey hurt:** every palette jump.

**Evidence:** `shell.cpp:154-161` — `pop()` removes the palette, then `pushById`
pushes the target on top of the *previous* screen. From Home→CONTROL→MAZ CORE, a
Ctrl+K "settings" lands Settings at depth 4, and ESC drops you back into MAZ CORE,
which you had mentally left. The depth tick (`ui.cpp:129`) is the only clue.

**Keystrokes:** before = ESC ×3 to reach Home afterwards. After = 1.

**Minimal change:** in `Palette::onKey`'s ENTER branch, `pop(); goHome(); pushById(target);`
— the palette is a "go somewhere" affordance, not a "push a sibling" one.

**Risk:** low. **Effort:** 1 line.

---

## F12. Two different Wi-Fi screens, and host setup lives only in the older one

**Journey hurt:** first-run pairing and every "why is Core offline" moment.

**Evidence:** the registry carries both `network` → `NetworkV5App`
(`registry.cpp:19`) and `wifi` → "Legacy Connections" `ConnectionsApp`
(`registry.cpp:42`). CONTROL→WI-FI opens the new one; Settings→"Wi-Fi & host"
(`system_apps.cpp:282`) opens the legacy one — `wifi.png`, with an entirely different
key scheme (`W`/`S`/`C`/`H` vs a list). Only the legacy screen can set the host
address and token (`system_apps.cpp:442-444, 364-378`). Meanwhile MAZ CORE tells the
user *"Configure CONTROL > MAZ CORE"* (`core_console.cpp:89`) — and CONTROL→MAZ CORE
is a read-only text pane that accepts no key but ESC (`control_center.cpp:137-147`,
`:55-62`). The instruction points at a screen that cannot do the thing.

**Keystrokes:** Home→host setup today = RIGHT ×3, ENTER, DOWN ×7, ENTER, DOWN ×7,
ENTER, `C` = **21**, and only if you already know the route.

**Minimal change:** in `ControlCenterApp::onKey`, when `_detail && _cursor.sel == 2`
and the key is ENTER, `shell::pushById("wifi")`; change the detail hint to
`"ENTER host setup   ESC list"` (`control_center.cpp:50`). Then `core_console.cpp:89`
becomes true as written.

**Risk:** none. **Effort:** ~6 lines. (Retiring the legacy screen entirely is a bigger
job and out of scope here.)

---

## F13. "Keys & Help" is stale, and it is the deepest screen on the device

**Journey hurt:** the first hour with the device, and every forgotten shortcut after.

**Evidence:** `system_apps.cpp:543-573`. Four lines are wrong against shipped v0.7.1:
- `"TAB  next page of apps"` — `KEY_TAB` is handled in exactly one place, Tasks
  (`notes_tasks.cpp:303`). Home ignores it.
- `"1-8  open that cell"` — on Home, 1-4 are the quick actions (`home.cpp:67-74`);
  5-8 do nothing.
- `"/  command palette"` — `/` is `navFallback`'s RIGHT (`shell.cpp:270`). The palette
  is Ctrl+K only (`shell.cpp:279-282`).
- `"C W Q V  calc, stopwatch, qr, viewer"` — `W` is Wi-Fi in the registry
  (`registry.cpp:19`); stopwatch has no shortcut at all (`registry.cpp:37`).

Absent entirely: **Fn+Space Context Ask, Fn+F FIELD, Fn+1-4 quick-key cycling** — the
three headline v0.7 features — and, most importantly, the fact that **ESC is Fn+`**
and the **arrows are Fn+; . , /**, which appears nowhere on the device and nowhere in
`docs/USAGE.md`, `docs/V070-FIELD.md`, `README.md` or `RELEASE_NOTES.md`.

Reaching it: Home→CONTROL→SETTINGS→"Keys & help" = **21 chords**. There *is* an `H`
shortcut (`registry.cpp:45`) but it works only on Home (`home.cpp:84-92`) and is
documented only inside the help screen it opens.

**Minimal change:** rewrite `HELP_LINES` — delete the four wrong lines, add a `#KEYS`
block naming Fn+` / Fn+;./, / Fn+Space / Fn+F / Fn+1-4, and list `H  help` under
`#HOME`. Optionally add `H` behind Fn in `handleGlobalKey` so help is one chord from
anywhere (~4 lines).

**Risk:** none (text). **Effort:** ~20 lines.

---

## F14. Empty states advertise keys that do nothing, and hide the one that would help

**Journey hurt:** every offline moment — which on this device is common by design.

**Evidence:** `nudge.png` shows "PC unavailable / Call PC or check connection" under
the hint `"ENTER inspect   N nudge   R refresh"`. In `v03.cpp:384`, `_summary.agents`
is empty, so ENTER and N return false and do nothing; only `R` works. The empty state
tells the user to "Call PC" (`v03.cpp:426`) but offers no key to do it — COMM is a
sibling surface, reachable only via ESC, two moves and ENTER. Same shape in
`field_apps.cpp:87-89` (Laptop: "R retry" lives in the body, not the hint) and
`system_apps.cpp:481` ("press ESC and try again" as body text).

**Keystrokes:** before = ESC + n moves + ENTER (4-5). After = 1.

**Minimal change:** make `hints()` state-aware where the list is empty — in
`AgentsV3App::hints`, `if (_summary.agents.empty()) return "R retry   T call PC";` and
add `if (e.code == KEY_T) { shell::pushById("talk"); return true; }` to its `onKey`.
`T` is already the registry shortcut for `talk` (`registry.cpp:11`), so the letter
stays consistent with Home.

**Risk:** low. **Effort:** ~6 lines.

---

## Also noted, not worth a slot

- `field::cycleQuick` (`field.cpp:343-351`) walks a 12-item list one way only, so
  setting slot 4 to M5LAUNCHER costs 11 presses of Fn+4. Reverse cycling on
  Fn+Shift+n would be ~4 lines.
- Toasts render over list content for 1.8 s (`theme.h:59`); `recall.png` shows
  "BrainDump saved" covering a row the user is trying to select.
- `SurfaceHub` cursors reset to row 0 on every re-entry from Home, because
  `pushById` constructs a fresh app. A `static int lastSel[3]` keyed by `_id` in
  `surfaces.cpp` would remember it in 6 lines and 12 bytes.
- The `<ESC` depth tick (`ui.cpp:129`) tracks `Sys.navDepth` only, so it does not move
  while the user descends the internal views of MAZ CORE (Projects→Actions→Result) or
  any `_detail` mode — three ESCs are needed where the chrome implies one.
- `SettingsApp::hints` is `"left/right change  ENTER toggle"` for all nine rows, but
  rows 7 and 8 (`system_apps.cpp:281-286`) are navigation, not toggles.

## Suggested order of work

`F4` and `F11` are one line each. `F1` is the one to reproduce and fix first, because
it corrupts the meaning of the only back affordance on the device. `F2`, `F5`, `F6`
and `F7` together take Home→Settings from 12 chords to 3 for roughly 25 lines of diff.
`F3` is the only finding here that destroys user data.
