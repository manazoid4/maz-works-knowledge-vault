---
date: 2026-08-25
project: codex-remote
agent: codex
status: completed
---

# Prior working Codex mobile connection

## Conclusion

The prior working path was **ChatGPT mobile Remote -> Codex Remote Control on the Windows host `MAZPC`**. It was not a JobFilter, InkWeave, OpenFlowKit, Zawiya, Tailscale, SSH, or generic tunnel setup. On 2026-08-20, Codex bypassed the Unix-only `codex remote-control` daemon by running the Codex Windows app's bundled experimental app server on loopback and calling its Remote Control JSON-RPC methods over WebSocket.

The old manual pairing code was short-lived (nine characters) and expired at `2026-08-20 15:33:56 UTC`, so it is intentionally omitted. A fresh code must be generated.

## 2026-08-20 working environment

- Windows host/server name: `MAZPC`
- Installed Codex app package: `OpenAI.Codex_26.814.5167.0_x64__2p2nqsd0c76g0`
- Normal Codex CLI: `0.147.0`; its `remote-control` lifecycle was Unix-only.
- Bundled app CLI: `0.148.0-alpha.15`
- Bundled executable source: `C:\Program Files\WindowsApps\OpenAI.Codex_26.814.5167.0_x64__2p2nqsd0c76g0\app\resources\codex.exe`
- Working copy used: `%TEMP%\codex-app-cli-26.814.5167\codex.exe`
- App-server transport: `ws://127.0.0.1:51147` (loopback only)
- Required initialization capability: `experimentalApi = true`
- Remote enable request: `remoteControl/enable` with `ephemeral = false`
- Pairing request: `remoteControl/pairing/start` with `manualCode = true`
- Observed enable response: `status = connecting`, `serverName = MAZPC`

## Exact prior launch command

The session first copied the bundled CLI out of the protected WindowsApps directory:

```powershell
$tempDir = Join-Path $env:TEMP 'codex-app-cli-26.814.5167'
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
Copy-Item -LiteralPath 'C:\Program Files\WindowsApps\OpenAI.Codex_26.814.5167.0_x64__2p2nqsd0c76g0\app\resources\codex.exe' -Destination (Join-Path $tempDir 'codex.exe') -Force
```

It then launched the loopback-only app server in the background:

```powershell
$rcPort = 51147
$rcExe = Join-Path (Join-Path $env:TEMP 'codex-app-cli-26.814.5167') 'codex.exe'
$rcOut = Join-Path $env:TEMP 'codex-remote-control.stdout.log'
$rcErr = Join-Path $env:TEMP 'codex-remote-control.stderr.log'
$rcProc = Start-Process -FilePath $rcExe -ArgumentList @(
  'app-server',
  '--listen',
  "ws://127.0.0.1:$rcPort"
) -WindowStyle Hidden -RedirectStandardOutput $rcOut -RedirectStandardError $rcErr -PassThru
```

## Exact prior JSON-RPC sequence

After connecting a `System.Net.WebSockets.ClientWebSocket` to `ws://127.0.0.1:51147`, the session sent these three messages in order:

```powershell
Send-RcJson ([ordered]@{
  method = 'initialize'
  id = 1
  params = [ordered]@{
    clientInfo = [ordered]@{
      name = 'powershell-remote-setup'
      title = 'PowerShell Remote Setup'
      version = '1.0.0'
    }
    capabilities = [ordered]@{ experimentalApi = $true }
  }
})

Send-RcJson ([ordered]@{
  method = 'remoteControl/enable'
  id = 2
  params = [ordered]@{ ephemeral = $false }
})

Send-RcJson ([ordered]@{
  method = 'remoteControl/pairing/start'
  id = 3
  params = [ordered]@{ manualCode = $true }
})
```

The third response contained `pairingCode`, `manualPairingCode`, `environmentId`, and `expiresAt`. The nine-character `manualPairingCode` was the value intended for ChatGPT mobile -> **Remote**.

## Earlier supported UI path (2026-08-01)

The earlier attempt launched the installed Windows app directly at:

```text
codex://settings/connections/computer
```

The documented flow was to enable **Allow other devices to connect** / **Remote Control**, then open **Remote** in the latest ChatGPT mobile app and scan the displayed QR code while signed into the same account and workspace. The note also says to update both apps and re-pair if an old pairing predates 2026-06-08 and had gone unused.

## Sources

- Vault session note: `C:\Users\manaz\Desktop\Maz Works Knowledge Vault\wiki\sessions\2026-08-20-codex-remote-codex.md` (2026-08-20; completed workaround; commits `1f700b906` and `b597cca841`).
- Exact command transcript: `C:\Users\manaz\.codex\sessions\2026\08\20\rollout-2026-08-20T16-14-45-01a01fbd-2a5b-75e1-92d7-ebdc8ca132b7.jsonl`.
- Vault session note: `C:\Users\manaz\Desktop\Maz Works Knowledge Vault\wiki\sessions\2026-08-01-codex-mobile-codex.md` (2026-08-01; supported desktop QR flow; commit `834cf871`).

No prior Codex-specific Tailscale, SSH, Cloudflare, ngrok, or other tunnel configuration was found in the vault. The MAZos mobile snapshot/localhost bridge notes are a separate product feature and are not the requested Codex mobile pairing.
