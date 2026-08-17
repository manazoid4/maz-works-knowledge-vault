# MAZ Pocket v0.7.1 — field-use / embedded-behaviour audit

Scope: friction between menus and around transitions when the device is used one-handed, in a hurry, often offline. Repo `C:\Users\manaz\maz-pocket` @ main, v0.7.1. Screens read from the 11 live 240x135 captures taken today; telemetry as supplied (heap=163480 min=143556 largest=151540, host_worker stack_free_min≈4700B, loop_max=4208ms during Wi-Fi join, sd_present=false).

Everything below fits the constraints: six Home surfaces unchanged, no new top-level app, no second framebuffer, no realtime mic refactor, no PSRAM assumptions, nothing that grows peak heap.

Ranked by impact per line of diff, best first.

---

## 1. The legacy v0.3 outbox drain still runs on the UI thread and uploads whole WAVs from inside `loop()`

**Field scenario.** You are walking, Core is reachable, you have two queued voice turns from when it wasn't. Every 15 s the device freezes mid-keystroke for as long as an upload takes — on any screen, with no indication anything is happening.

**Evidence.** `src/apps/product_apps.cpp:249-290` — `updateProductServices()` is called unconditionally from `src/core/shell.cpp:472`, i.e. once per UI frame. Inside:
- `product_apps.cpp:256` `store::loadRecords("outbox", 8)` (whole-file read, see finding 9),
- `product_apps.cpp:261` `host::startSession()` — blocking POST,
- `product_apps.cpp:262` `host::talkAudio(session, item.ref)` / `:264` `host::brainDump(item.ref, {})` — blocking POST that streams the entire WAV from storage (`src/net/mazhost.cpp:121-154`), with `http.setTimeout(60000)` (`mazhost.cpp:78`).

A BrainDump WAV is capped at 5 minutes ≈ 9.6 MB (`voice_apps.cpp:396` comment: 1.9 MB/min). At LAN speed that is seconds of a completely stopped UI loop; on a flaky link it is up to 60 s. The comment at `product_apps.cpp:288` (`// one blocking LAN job per service pass`) admits it.

This path also duplicates v0.7's async drain (`src/core/field.cpp:188-211`, `submitNextOutbox()` → `host_worker`), which handles `source == "beam" | "talk" | "talk-context"`. Both can pick the same `talk` record in the same second: field submits it to the worker while product_apps posts it synchronously → the same voice turn sent twice, two inbox answers.

**Today vs after.** Today: periodic multi-second freezes plus occasional duplicate answers. After: outbox drain happens only on `host_worker`, the loop never stalls, one answer per turn.

**Change.** Delete the `if (millis() >= nextOutbox && Sys.hostOnline) { … }` block in `apps::updateProductServices()` (product_apps.cpp:254-290). Add the one case it uniquely covered to `field::submitNextOutbox()` (field.cpp:194): treat `r.source == "braindump"` like `"talk"` (`host_worker::submitOutboxAudio(r.id, r.ref, "")`).

**Risk.** Low. The braindump branch is the only unique behaviour and it moves to the worker path that already handles missing-file cleanup (field.cpp:198-204).

**Effort.** −37 / +4 lines.

---

## 2. A finished COMM answer strands the single host worker forever if you walked away from the screen

**Field scenario.** You hold SPACE, ask a question, the hint says *"PC working in background   ESC safe"*, so you ESC to Home and put the device away. The answer lands. Nothing consumes it. From then on: no Beam pulls, no outbox drain, no laptop telemetry, and quick-keys 1–4 for LOCK/PLAY/MUTE all reply "PC busy" — until you happen to reopen COMM.

**Evidence.**
- `src/net/host_worker.cpp:148-151` `canSubmit()` only returns true for `Idle`/`FailedToStart`. The result sits in `State::Done` until somebody calls a `take…()`.
- `takeTalkResult()` is called from exactly one place: `src/apps/comm.cpp:332`, inside `CommApp::consumeWorkerResult()`, which only runs while COMM is the top app (`comm.cpp:155-164`).
- `src/core/field.cpp:235-258` handles `OutboxAudio`, `OutboxBeam`, `BeamPull`, `SystemStatus` and deliberately leaves `TalkAudio` alone — `default: break;  // COMM/PC results belong to their caller.`
- `field.cpp:267-269` then returns early for the rest of `update()` because the worker is not `Idle`, so every background service silently stops.
- The hint at `comm.cpp:64` actively invites this: *"PC working in background   ESC safe"*.

**Today vs after.** Today: leaving COMM mid-turn quietly disables the whole background half of v0.7. After: the answer is stored in Recall/Inbox and announced wherever you are, and the worker returns to Idle.

**Change.** In `field::update()`'s switch, add a `case host_worker::JobKind::TalkAudio:` that runs only when `strcmp(shell::currentId(), "talk") != 0`: `takeTalkResult`, then the same persistence COMM does — inbox record on success (`comm.cpp:346-353`), outbox record on failure (`comm.cpp:376-387` `queueRaw`), `saveReminderFrom()` (already exists at field.cpp:90), `notify::post(Note::Success, "Answer ready", …)`. Factor the record-writing out of `CommApp::consumeWorkerResult` into a small free function both call.

**Risk.** Medium-low: needs the "COMM is not on top" guard so an open COMM keeps owning its own result. Same-frame race is impossible — both run on the UI task.

**Effort.** ~30 lines (mostly moved, not new).

---

## 3. Results arrive on a dark screen and the only notice expires in 1.8 s

**Field scenario.** Ask a question, pocket the device. FIELD mode dims at 20 s and blanks at 60 s (`shell.cpp:81,89`). The reply lands 90 s later: `notify::post` fires a sound and paints a toast onto a screen at brightness 0, and 1.8 s later it is gone. You have no idea an answer exists.

**Evidence.**
- `src/core/notify.cpp:33-41` `post()` sets the toast and plays a sound; it never touches brightness. `shell::wake()` (`shell.cpp:310-318`) is only called from `dispatchKey`/`loop` on real input.
- `src/core/shell.cpp:483` `if (gScreenOff) return;` — the render is skipped entirely, so the toast is not even drawn.
- `src/ui/theme.h` `constexpr uint32_t T_TOAST = 1800;` — errors and successes share 1.8 s.
- `shell.cpp:360` any key-down dismisses the toast, so waking to look at it kills it.

**Today vs after.** Today: an offline queue warning or a ready answer can be missed entirely. After: the screen lights for anything worth a sound, and warnings/errors stay legible long enough to read at arm's length.

**Change.** In `notify::post()`, call `shell::wake()`. In `notify::update()` / `notify::render()`, use a per-kind lifetime: `T_TOAST` for `Info`/`Success`, `T_TOAST * 2` for `Warn`/`Error`.

**Risk.** Low. Slight battery cost when a background notification wakes the screen; the existing dim timer re-arms immediately because `gLastInput` moves.

**Effort.** 6 lines.

---

## 4. The reminder sweep re-reads and re-parses the entire record store once per second

**Field scenario.** Nothing visible — until the store has grown. Then the device feels progressively sludgier everywhere, worst on list screens, and the sluggishness follows you between menus because it lives in the shell loop, not in an app.

**Evidence.** `src/apps/product_apps.cpp:292-297`:
```
if (millis() < nextReminder) return;
nextReminder = millis() + 1000;
…
auto reminders = store::loadRecords("reminder", 64);
```
`store::loadRecords` (`src/storage/store.cpp:333-357`) always calls `readText("/maz/records/records.tsv", SIZE_MAX)` — the whole file, every kind, into one `std::string` — then splits every line into a `Record` of six `std::string`s, sorts, and truncates. The `kind` filter is applied *after* the read. So this runs once a second regardless of whether any reminder exists, alongside `field::refreshCounts()` doing the same read three more times every 5 s (`field.cpp:70,75,80`).

**Today vs after.** Today: at least one full store read+parse per second, forever. After: a cheap flag check per second, a real sweep only when a reminder is actually pending.

**Change.** `field::refreshCounts()` already computes `gReminderDue` (field.cpp:79-82). Expose it (`bool field::reminderPending()`), and in `updateProductServices()` return early unless `field::reminderPending()`; raise the cadence to 5000 ms. The one-off migration branch at product_apps.cpp:303-315 still runs on the first sweep after boot, so nothing is lost.

**Risk.** Low. Worst case a reminder fires up to 5 s late — invisible at reminder granularity.

**Effort.** ~10 lines.

---

## 5. The whole screen re-renders and re-pushes 64,800 bytes ten times a second whether or not anything changed

**Field scenario.** Sitting on a static screen (CONTROL list, Settings, LINE READY) still costs a full render plus a full SPI blit every 100 ms. That is battery you need in the field and headroom you need during audio.

**Evidence.** `src/core/shell.cpp:480-491`:
```
static uint32_t lastPaint = 0;
const bool due = millis() - lastPaint > 100;
if (!top->dirty() && !due) return;
…
top->render(gCanvas); ui::statusBar(…); ui::hintBar(…); notify::render(…);
gCanvas.pushSprite(0, 0);
```
`due` defeats the `dirty()` mechanism every screen carefully maintains. `pushSprite` moves 240×135×2 = 64,800 bytes per paint; every animating screen already calls `invalidate()` from its own `update()` (`comm.cpp:158-163`, `field_apps.cpp:61-64`, `home.cpp:102-106`), so `due` buys almost nothing except the `TextField` caret blink and the status-bar clock.

**Today vs after.** Today: 10 full frames/s at idle. After: ~2 frames/s at idle with unchanged responsiveness — any key sets dirty immediately.

**Change.** `shell.cpp:481`: `const bool due = millis() - lastPaint > 500;`. The caret blink in `TextField::draw` (`common.h:101`) has a 500 ms period, so it still animates.

**Risk.** Very low; visually confirm the caret in Notes and in the Wi-Fi password field.

**Effort.** 1 line.

---

## 6. Wi-Fi joins busy-wait on the UI thread for up to 24 seconds

**Field scenario.** You walk into range. The device locks solid — keys swallowed, level meter stopped, clock frozen — then springs back. This is the measured `loop_max=4208ms, stall=yes`.

**Evidence.**
- `src/net/net.cpp:77-78`: `const uint32_t deadline = millis() + 12000; while (millis() < deadline && WiFi.status() != WL_CONNECTED) delay(120);`
- `net.cpp:92-96` `connectSaved()` runs that twice (primary then backup) → up to 24 s.
- `net.cpp:165-171` calls `connectSaved()` from `net::update()`, which runs every frame from `shell.cpp:469`. The stall therefore happens with no user action at all, on whatever screen you are on.
- On success the same path calls `syncClock()` (`net.cpp:137-140` → `net.cpp:209-224`): another blocking loop of up to 6 s ending in `Cfg.save()`, an NVS commit of 25 keys (`settings.cpp:52-84`).
- The same blocking `net::connect` is reachable interactively at `control_center.cpp:341` and `system_apps.cpp:385`.

**Today vs after.** Today: a multi-second dead device on every reconnect attempt and every backoff cycle. After: the reconnect proceeds across frames; the UI keeps drawing and the keyboard FIFO keeps draining.

**Change.** Split `net::connect` into `beginConnect(ssid, pass)` (calls `WiFi.begin`, records a deadline and which slot is being tried) and let `net::update()` poll `WiFi.status()` on later frames, advancing primary → backup → setup-AP as deadlines pass. Cap `syncClock()`'s wait at ~1.5 s per pass and retry later rather than blocking for 6 s.

**Risk.** Medium — the one structural change in this list. Contained to `net.cpp`; the `Sys.wifi*` fields it publishes are unchanged.

**Effort.** ~35 lines.

---

## 7. "Connecting…" is set but never painted, so a Wi-Fi join looks like a crash

**Field scenario.** Wi-Fi screen (the `wifi` capture), you pick a network, type the password, press ENTER — and the screen sits on the password field, frozen, for up to 12 s. Nothing says it is trying.

**Evidence.** `src/apps/control_center.cpp:338-341`:
```
_message = "Connecting...";
invalidate();
const bool ok = net::connect(_pending, pass);
```
`invalidate()` only marks the app dirty; the paint happens later in `shell::loop` (`shell.cpp:485`), which cannot run because we are inside `net::connect`'s busy-wait. Same shape at `system_apps.cpp:385` (Connections ENTER) and `system_apps.cpp:127` / `:436` (`net::scan()`, blocking ~6 s per `net.h:33`).

The codebase already knows the fix: COMM defers its send by a frame precisely so the state paints first — `comm.cpp:287` `_sendAt = millis() + 120;` — and dictate does the same (`dictate.cpp:84-85`).

**Today vs after.** Today: a 12 s frozen password field. After: "Connecting to <ssid>…" is on screen before the attempt, and with finding 6 the UI stays alive throughout.

**Change.** In `NetworkV5App::connectPending` and `ConnectionsApp`'s ENTER handler, set the message plus `_connectAt = millis() + 120` and do the connect from `update()`. Same treatment for `_aps = net::scan()` (paint "Scanning…" first).

**Risk.** Low.

**Effort.** ~15 lines across the two screens.

---

## 8. Entering OPS / AGENTS blocks on a synchronous HTTP GET before it can draw anything

**Field scenario.** From Home you press N or open OPS. The device is dead for ~2 s if Core is unreachable on the LAN, longer on a bad link, then paints the "PC OFFLINE" screen in the capture. There is no "checking…" frame.

**Evidence.** `src/apps/v03.cpp:374` `void onEnter() override { refresh(); }` → `v03.cpp:431` `_summary = host::assurance();` → `mazhost.cpp:320-322`, a blocking `GET /nudge` with `setConnectTimeout(1800)` and `setTimeout(60000)` (`mazhost.cpp:77-78`). `shell::push()` calls `onEnter()` before the first paint (`shell.cpp:320-327`), so the transition itself carries the stall. The N key repeats it synchronously (`v03.cpp:387` `host::sendNudge`) with the screen frozen.

**Today vs after.** Today: every entry into OPS costs a stall, worse the worse the link. After: the list paints immediately with a "CHECKING" right-header and the fetch happens with the UI alive.

**Change.** Minimal: in `AgentsV3App::onEnter()` set `_refreshAt = millis() + 120` instead of calling `refresh()`, run `refresh()` from `update()`, and show `"CHECKING"` in the header until it returns. Proper: add an `Assurance` job kind to `host_worker` next to `SystemStatus` — the plumbing already exists. Independently, lower `mazhost.cpp:78`'s `setTimeout` from 60000 to ~8000 for the small GET/POST calls; 60 s is only justified for the AI turn upload.

**Risk.** Low for the minimal version.

**Effort.** 5 lines minimal; ~40 for the worker version.

---

## 9. The record store is a single file, fully read, fully parsed and fully rewritten on every touch — and it is never pruned

**Field scenario.** After a few weeks of real use every list open, every capture and every reminder tick gets slower, and eventually an `addRecord` fails on a heap whose largest free block is 150 KB.

**Evidence.** `src/storage/store.cpp`:
- `:333-357` `loadRecords()` — `readText(records.tsv, SIZE_MAX)` into one `std::string`, then a `Record` (six `std::string`s) per line into a vector, then `std::sort`, then truncate to `limit`. The `kind` and `limit` arguments save nothing.
- `:371-377` `addRecord()` — `loadRecords(nullptr, SIZE_MAX)`, push, `saveRecords()`, which builds *another* whole-file `std::string` (`:359-369`) before writing. Peak transient ≈ 3× file size, all from the same 150 KB largest block.
- `:379-386` `updateRecord()` — identical cost for a one-field status change.
- Nothing prunes the file. Bodies are large: COMM answers (`comm.cpp:351`), Beams up to 2000 chars (`field.cpp:157`).
- `BeamApp::markSeen()` (`field_apps.cpp:247-255`) calls `updateRecord` once per open beam — O(n²) full-file rewrites, on the UI thread, inside `onEnter()`, i.e. during the menu transition.
- `field::refreshCounts()` (`field.cpp:62-83`) does three full reads every 5 s (12 s in FIELD).

**Today vs after.** Today: unbounded growth in both latency and peak heap. After: bounded file, one read where there were three, no O(n²) transition.

**Change.** Three small independent edits:
1. `saveRecords()`: keep only the newest N (≈150). The vector arrives newest-first from `loadRecords`, so this is a `resize`, guarded so `status == "queued"` outbox items are never dropped.
2. `refreshCounts()`: one `loadRecords(nullptr, 256)` pass, count all three kinds from it.
3. `markSeen()`: load once, mutate every matching row in the vector, save once — needs `store::saveRecords` exposed in `store.h` or a new `store::updateRecords(const std::vector<Record>&)`.

**Risk.** Low-medium — the prune must never delete unsent outbox work; keep the guard.

**Effort.** ~25 lines total.

---

## 10. Backing out of a screen destroys it, so the reply you were reading is gone when you come back

**Field scenario.** COMM gives you a four-line answer. You ESC to Home to check the NOW line or fire a quick key, then come back — the screen says "LINE READY" and the answer is only reachable via RECALL → INBOX, three presses and a full-store read away. Same for hub position: RECALL always reopens on INBOX (visible in the `recall` capture) no matter where you were.

**Evidence.**
- `src/core/shell.cpp:339-347` `pop()` does `delete gStack.back()`; `goHome()` (`:349-351`) pops everything. Every member — `_reply`, `_scroll`, `_cursor`, `TextField::text` — dies with the instance.
- COMM already proves the fix is acceptable: the session id is a file-static (`comm.cpp:26` `std::string gCommSession;`) precisely so it survives; `_reply`/`_scroll` (`comm.cpp:398,400`) were left as members.
- `SurfaceHub::_cursor` (`surfaces.cpp:94`) is per-instance and the hubs are recreated on every open (`registry.cpp:14-16`).
- Note editing is worse: one ESC in `Mode::Edit` discards up to 400 typed characters with no confirmation (`notes_tasks.cpp:74-78`).

**Today vs after.** Today: leaving a screen for two seconds costs you what you were reading. After: COMM keeps the last answer and scroll position; each hub reopens where you left it.

**Change.** (a) Move `_reply` and `_scroll` out of `CommApp` into the same anonymous namespace as `gCommSession` — the N key already clears `_reply`, so the reset path exists. (b) Give `SurfaceHub` a `ListCursor&` passed in from three file-static instances so each hub remembers its row. (c) Notes edit: require ESC twice within 3 s to discard a non-empty draft, reusing the Recorder's two-step-delete pattern (`voice_apps.cpp:503-517`).

**Risk.** Low. (a) means the reply survives for the session — desirable, and it is already persisted to Inbox anyway.

**Effort.** ~18 lines.

---

## 11. The screen dims and blanks while the PC is working for you

**Field scenario.** You send a Context Ask and hold the device waiting for the answer. ~0.9 s warm is fine; ~7 s cold plus a Wi-Fi round trip is not — and in FIELD mode the panel is at brightness 8 after 20 s and black after 60 s while "PC WORKING" is still the truth on screen.

**Evidence.** `src/core/shell.cpp:79-93` `applyScreenTimeout()` exempts exactly one thing: `if (timeout == 0 || Sys.recording) return;`. Nothing about `host_worker::busy()`, a running Core job (`core_console.cpp:149-153` literally paints "Running on PC…"), or TTS playback.

**Today vs after.** Today: the device goes dark while you are waiting on it, and until finding 3 lands the arriving answer is invisible. After: the screen stays up while the device owes you an answer.

**Change.** `shell.cpp:82`: `if (timeout == 0 || Sys.recording || host_worker::busy() || voice::isPlaying()) return;`.

**Risk.** Very low; the worker is bounded by HTTP timeouts, so this cannot pin the backlight indefinitely — especially once finding 8's timeout reduction lands.

**Effort.** 2 lines.

---

## 12. Offline screens name the next action but no key performs it

**Field scenario.** The `nudge` capture: **"PC unavailable / Call PC or check connection"**, hint bar *"ENTER inspect   N nudge   R refresh"*. ENTER and N both do nothing (the list is empty), and no key calls the PC. The dead-end is the message itself.

**Evidence.** `src/apps/v03.cpp:424-426` prints the empty state; `v03.cpp:384` `if (_summary.agents.empty()) return false;` swallows ENTER and N before they can act. The suggested action already exists as `shell::pushById("talk")`.

**Today vs after.** Today: a screen that tells you what to do and refuses to do it. After: ENTER on the offline empty state opens COMM, and the hint bar says so.

**Change.** In `AgentsV3App::onKey`, before the `agents.empty()` guard: `if (_summary.agents.empty() && !_summary.ok && e.code == KEY_ENTER) { shell::pushById("talk"); return true; }`, and have `hints()` return `"ENTER call PC   R retry"` in that state. `LaptopApp`'s "Core may be offline" (`field_apps.cpp:87-88`) already has a working R — it only needs the hint to say so.

**Risk.** None.

**Effort.** 8 lines.

---

## 13. Dictation blocks the loop for the whole upload and throws the audio away when it fails

**Field scenario.** Ctrl+SPACE into any text field, speak a line, Core is slow or gone. The device is frozen for the upload, then the field shows an error and your words are deleted. No retry, and the WAV is unlinked.

**Evidence.** `src/audio/dictate.cpp:101-129` — `update()` runs every frame from `shell.cpp:468` and calls `host::transcribe(gPath)` inline (`dictate.cpp:114`), a blocking upload with `setTimeout(60000)`. On any failure `fail()` (`dictate.cpp:35-42`) calls `discard()`, which `store::remove`s the recording. This affects every text field on the device (`common.h:20-56`): Notes, Tasks, Reminders, Snippets, Decision, Wi-Fi password, host token — exactly the "make the user retype it" failure this audit is hunting.

**Today vs after.** Today: a spoken line lost to a slow link, plus a multi-second freeze. After: the WAV survives, one key retries it, and the freeze is bounded.

**Change.** Minimal: in `fail()`, keep `gPath` for network-shaped failures instead of discarding; set `State::Failed`; make `dictate::start()` on the same owner re-transcribe the existing `gPath` rather than record again; surface "retry: Ctrl+SPACE" in `TextField::draw`'s failed branch. Also drop the transcribe read timeout to ~10 s (finding 8). Proper: add a `Transcribe` job kind to `host_worker`.

**Risk.** Low; cap it so a stale WAV is dropped after two failures or when a new dictation starts under a different owner.

**Effort.** ~12 lines minimal.

---

## 14. MAZ CORE blocks twice on entry and polls a running job synchronously every 1.5 s

**Field scenario.** CONTROL → MAZ CORE (the `core` capture). The transition costs two sequential HTTP round trips before anything paints. Start a build, stay on the result screen, and the UI hitches every 1.5 s for the duration — even though the screen says "You can leave this screen."

**Evidence.** `src/apps/core_console.cpp:32` `onEnter() { refresh(); }` → `:76-77` `host::coreStatus()` then `host::coreProjects()`, both blocking (`core_client.cpp:20-21`: connect 1800 ms, read 12000 ms). `:60-62` auto-polls `host::coreJob` every 1500 ms from `update()`, each poll a blocking GET; `:122` `coreStartJob` likewise.

**Today vs after.** Today: a menu transition that stalls, then a screen that stutters every second and a half. After: the projects screen paints "READING CORE…" first, and a running job is polled at a cadence that matches how fast a build actually finishes.

**Change.** Same deferral as finding 7: `onEnter()` sets `_refreshAt = millis() + 120`, `update()` performs it. Raise the running-job poll from 1500 ms to 3000 ms (5000 ms when `Cfg.fieldMode`).

**Risk.** Low.

**Effort.** ~10 lines.

---

## 15. Long stalls silently eat key presses, including key-up

**Field scenario.** After any of the stalls above, push-to-talk misbehaves: SPACE looks still-held, or a release is lost so a recording never ends and the hint bar is stuck on "release SPACE to send".

**Evidence.** The TCA8418 FIFO is 10 events deep and is only drained while the loop runs (`keyboard.cpp:244-259`). `Keyboard::push` drops the *newest* event when the software ring is full (`keyboard.cpp:148-153`, `// full: drop newest rather than stall input`). A dropped key-*up* leaves a stale entry in `_held` (`keyboard.cpp:222-239`), which `KB.held(KEY_SPACE)` (`comm.cpp:75`, `home.cpp:97`) and `KB.heldFor(KEY_ESC)` (`shell.cpp:458`) trust. The overflow interrupt is enabled (`CFG_OVR_FLOW_IEN`, `keyboard.cpp:142`) but `REG_INT_STAT` is cleared without ever being read (`keyboard.cpp:258`), so an overflow is invisible to the firmware.

**Today vs after.** Today: after a stall the device can believe a key is down when it is not. After: overflow is detected and the held table resynchronises, so push-to-talk always recovers.

**Change.** In `Keyboard::update()`, read `REG_INT_STAT` before clearing it; if the overflow bit (0x02) is set, reset `_heldCount = 0` and `_mods = 0` and drain the FIFO. Separately, drop the *oldest* queued event rather than the newest in `push()`, so a key-up is never the thing discarded.

**Risk.** Low. Resetting `_mods` means a genuinely-held modifier is forgotten after an overflow — the safer of the two failure modes.

**Effort.** ~10 lines.

---

## Considered and rejected (recorded so they are not re-proposed)

- **`Settings::save()` writes all 25 NVS keys every call** (`settings.cpp:52-84`), and it is called on every route toggle (`comm.cpp:144`), quick-key cycle (`field.cpp:349`), FIELD toggle (`field.cpp:356`) and NTP sync (`net.cpp:218`). Real, but a dirty-key diff costs more than it returns and NVS wear at this rate is decades away.
- **Live-screen streaming** (`portal_v2.cpp:694-720`) is already chunked through a fixed scratch buffer and reuses the shell canvas — no second framebuffer, no per-frame allocation. Leave it.
- **`MAZSCREEN` counting with `loadRecords(…, 1000)`** (`control.cpp`, MAZSCREEN handler) is expensive but only runs when a tethered agent asks, which is not a field path.

## Suggested order

Findings 1, 2, 3, 5 and 11 total roughly 50 lines and remove the two worst dead-ends plus the largest idle cost. 4 and 9 stop the device getting slower the more it is used. 6 and 7 fix the Wi-Fi transition. 8, 12, 13, 14 and 15 are per-screen polish on two patterns the codebase already uses elsewhere: defer one frame then work, and keep the artefact on failure.
