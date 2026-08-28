---
date: 2026-08-28
status: active-with-caveats
---
# Reddit MCP Buddy and Rhei

## Reddit MCP Buddy

- Version: `reddit-mcp-buddy@1.1.14`, pinned global npm install.
- Licence: MIT.
- Registered for Claude Code, Codex, and OpenCode.
- Mode: anonymous/read-only; no Reddit username or password stored.
- Smoke test: MCP handshake and five-tool discovery succeeded; live r/SideProject browse succeeded through RSS fallback.
- Limitation: anonymous RSS lacks scores, comment counts, ratios, NSFW flags, and often has stricter effective throttling. Never infer missing popularity metrics.

## Rhei

- Version: `@rhei-team/rhei@1.0.0-beta.109`, pinned.
- Licence metadata: `UNLICENSED`; public beta and proprietary distribution.
- Windows package starts but lacks a Windows native indexer. A Linux copy is installed under Ubuntu 24.04 WSL and the three Windows agent clients launch it through `wsl.exe`.
- `RHEI_MCP_SOURCE_UPLOAD=never` is part of every launcher; Pro/cloud was declined during local initialization.
- MCP handshake and 23-tool discovery succeeded. Workspace discovery and bounded local search work. The Markdown vault has no usable code index, which is expected; use Rhei on source-code repositories, not as a wiki search replacement.
- Local `.rhei/` artifacts are ignored by Git.

## Supply-chain review

- Registry integrity hashes matched `npm pack` output for both pinned versions.
- `npm audit --omit=dev` reported zero known vulnerabilities across the resolved production tree at install time.
- Reddit MCP Buddy has three direct dependencies and auditable TypeScript output.
- Rhei is a large beta tarball with bundled native Linux/macOS helpers, no public repository metadata in npm, and no Windows native helper. Treat upgrades as reviewed changes; do not switch back to an unpinned shell installer.
- Neither server receives automatic authority to publish, post, or access account credentials.
