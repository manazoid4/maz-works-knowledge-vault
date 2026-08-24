---
date: 2026-08-24
project: maz-works
agent: codex
status: completed
---

## What I did

- Diagnosed the installed MazOS repair gate from `desktop-backend.log`.
- Confirmed the packaged Node runtime was misparsing an absolute Windows `C:\\...` entry script as `C:`.
- Changed the Tauri launcher to pass the validated `server.js` entrypoint relative to its working directory.
- Rebuilt the standalone assets and Windows EXE/MSI bundles.
- Installed the corrected EXE locally and launched MazOS successfully; the backend reached `Ready` on loopback and the app window remained responsive.
- Opened and merged MazOS PR #59 after the Windows verification and packaging checks passed.

## Files changed

- `mazos-ui/src-tauri/src/commands.rs`
- `wiki/projects/maz-works/CALL-DESK.md`
- `wiki/sessions/2026-08-24-maz-works-codex.md`

## Decisions made

- Keep the fix at the process-launch boundary; no changes to the Call Desk API or data model were needed.
- Treat the locally installed build as the corrected test artifact while retaining the existing code-signing and graphical acceptance requirements for public distribution.

## Next steps

- Open CALL DESK in the running MazOS window and complete the installed-app acceptance matrix.
- Configure code signing before distributing the installer.
