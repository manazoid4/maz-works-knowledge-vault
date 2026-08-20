---
date: 2026-08-20
project: codex-remote
agent: codex
status: blocked
---
## What I did

Verified the current official setup requirements for ChatGPT/Codex Remote on Windows.

## Files changed

- Added this session note.

## Decisions made

- Remote host pairing requires the ChatGPT desktop app UI and QR-code flow.
- OpenAI does not support initiating Remote setup from Codex CLI, an IDE extension, or PowerShell alone.

## Next steps

- Obtain an interactive desktop session on the Windows host to complete pairing, or use an accessible ChatGPT desktop host and connect the target machine as an SSH development host.
