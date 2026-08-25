---
date: 2026-08-25
project: codex-remote
agent: codex
status: completed
---

## What I did

- Recovered the exact Windows Codex Remote workaround from the 2026-08-20 session.
- Copied the current Codex desktop app's bundled CLI (`0.149.0-alpha.4`) to a temporary directory.
- Started its app server on loopback at `ws://127.0.0.1:51147`.
- Enabled persistent Remote Control and generated a new manual pairing code for ChatGPT mobile.
- Verified the server reported `MAZPC` with status `connected` and remained listening.

## Files changed

- `wiki/outputs/2026-08-25-codex-mobile-connection-research.md`
- `wiki/sessions/2026-08-25-codex-remote-codex.md`

## Decisions made

- Reused the known-working Codex desktop bundled app-server protocol because the normal Windows CLI still reports daemon lifecycle support as Unix-only.
- Kept the server bound to loopback and used Codex Remote's authenticated relay; no Tailscale, SSH, or public tunnel was added.
- Left the Codex app-server process running so the paired phone can connect.

## Next steps

- Enter the generated short-lived code in ChatGPT mobile under **Remote** before it expires.
- If it expires, rerun the same `remoteControl/pairing/start` flow to create a fresh code.
