---
date: 2026-08-20
project: codex-remote
agent: codex
status: completed
---
## What I did

Verified the official setup requirements, then discovered and exercised the installed Codex app's experimental Remote Control app-server protocol on Windows.

## Files changed

- Added this session note.

## Decisions made

- The public documentation describes a desktop-app QR flow, but the installed Codex CLI 0.147.0 exposes an experimental `remote-control` command whose daemon lifecycle is Unix-only.
- The bundled Codex 0.148.0-alpha.15 app server exposes experimental `remoteControl/enable` and `remoteControl/pairing/start` JSON-RPC methods on Windows.
- Started a loopback-only app server, enabled Remote Control for host `MAZPC`, and generated a short-lived manual pairing code. The code itself was not persisted.

## Next steps

- Enter the short-lived code in ChatGPT mobile Remote and verify that `MAZPC` connects.
- Replace the experimental background process with the supported desktop-managed lifecycle when convenient.
