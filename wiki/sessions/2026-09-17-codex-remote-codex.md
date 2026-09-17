---
date: 2026-09-17
project: codex-remote
agent: codex
status: in-progress
---
## What I did
Restored Android ChatGPT Remote host MAZPC. Previous temporary loopback server was absent. Installed official standalone Codex 0.154.0 using the reviewed OpenAI installer as the normal Windows user, retaining the npm installation. Managed daemon start failed with Windows access/private socket errors, so restored the known-working app-server WebSocket method.
Created scheduled task Codex Remote Start: interactive user, Limited privileges, at logon, hidden PowerShell launching hidden standalone current/bin/codex.exe app-server --listen ws://127.0.0.1:51147. No execution time limit, battery operation allowed, three failure retries. Remote enabled via experimental JSON-RPC remoteControl/enable with ephemeral=false.
Verified remoteControl/status/read reports connected for MAZPC. Stopped and restarted task: listener PID changed from 6424 to 3060; remote status remained connected without another enable request. Listener remains loopback only. Phone-side confirmation is still pending.
## Files changed
- Official standalone install under ~/.codex/packages/standalone; installer updated user PATH.
- Windows scheduled task Codex Remote Start.
- This session note and Local Knowledge copy.
## Decisions made
Use authenticated Codex relay with the existing host identity. Run without administrator privileges. Do not store pairing codes in the vault. Leave existing npm install and running interactive Codex session intact.
Unified memory start with project codex returned unknown_project; no memory session was created.
## Next steps
Open ChatGPT Android Remote and select MAZPC. If pairing is required, use the fresh short-lived manual code supplied in chat. Verify a task from the phone. Keep PC awake and online.
Official setup reference: https://learn.chatgpt.com/docs/remote
