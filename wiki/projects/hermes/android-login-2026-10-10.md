# Hermes Android connection — 10 October 2026

## Result

Found the existing key for the active `maz-cloud` Hermes profile and verified it. Enabled a persistent Tailscale TCP forwarder so the Android client can reach the existing localhost gateway. No gateway restart or key rotation was needed.

## Phone setup

1. Turn on Tailscale on the Pixel, signed into the same tailnet as MAZPC.
2. Open Hermes Android, tap **+**.
3. Label: **Maz Cloud**. Host: `100.115.207.123`. Port: `8643`.
4. API Key: the existing `API_SERVER_KEY` in `C:/Users/manaz/AppData/Local/hermes/profiles/maz-cloud/.env`. The actual credential was returned privately to the owner and is deliberately excluded from this note.
5. Leave custom proxy/dashboard settings at their defaults and tap **Connect**.

This selects the active maz-cloud profile, not ILM. Optional dashboard features are not configured or verified in this task.

## Evidence

- Active profile file: `maz-cloud`.
- Existing gateway: `127.0.0.1:8643`, Hermes Agent 0.20.0.
- Authenticated `/api/sessions` and `/v1/models`: HTTP 200.
- Unauthenticated `/api/sessions`: HTTP 401.
- Authenticated `/api/sessions` through `100.115.207.123:8643`: HTTP 200 from MAZPC.
- Tailscale Serve reports a background TCP forwarder to `127.0.0.1:8643`.
- Owner enabled Pixel Tailscale; a direct Tailscale ping succeeded in 116 ms. End-to-end Android login and chat remain for the owner to test.

## Operational change

Command applied: `tailscale serve --bg --tcp 8643 tcp://127.0.0.1:8643`.
Undo only this forwarder: `tailscale serve --tcp=8643 off`.
The proxy is restricted to the private tailnet. No public Funnel or LAN listener was added. MAZPC, Hermes, and Tailscale must remain running.

## Research

[Upstream Android setup documentation](https://github.com/rusty4444/hermes-android#quick-start) identifies the key as `API_SERVER_KEY`, supports Tailscale, and treats dashboard access as optional. This installation uses port 8643 rather than the documented default 8642.

## Next action

Owner enables Tailscale on the phone and connects. If chat or dashboard features fail, record the app error before changing gateway configuration. Unified Memory startup rejected the unregistered `maz-agents` slug, so no lifecycle session ID was created.
