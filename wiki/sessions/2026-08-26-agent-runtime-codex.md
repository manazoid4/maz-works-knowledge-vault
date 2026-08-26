---
date: 2026-08-26
project: agent-runtime
agent: codex
status: completed
---

## What I did

- Audited Codex doctor, MCP inventory, installed plugins, and recent tool-use evidence.
- Removed the redundant `code-review-graph` MCP server and its PostToolUse/SessionStart hook.
- Removed unused `openwiki` and `reddit` MCP servers.
- Removed zero-use `caveman`, `test-android-apps`, and `coderabbit` plugins.
- Retained codebase-memory, Local Knowledge, Supabase, Context7, OpenAI developer docs, browser tooling, and standing-order skill packs.
- Removed one duplicated codebase-memory SessionStart instruction while retaining the trusted active copy.
- Terminated the two orphaned code-review-graph server processes and uninstalled its standalone `uv` tool executables; the copy bundled inside Hermes remains an internal Hermes dependency, not a configured Codex MCP.
- Verified Codex doctor: 22 OK, 0 failures; 7 configured MCP servers, including one deliberately disabled Notion connection.

## Files changed

- `C:\Users\manaz\.codex\config.toml`
- `C:\Users\manaz\.codex\hooks.json`
- Removed active `C:\Users\manaz\.codex\hooks\code-review-graph-hook.ps1`
- Rollback snapshot: `C:\Users\manaz\.codex\backups\2026-08-26-runtime-prune\`

## Decisions made

- `codebase-memory-mcp` is the canonical code graph integration; do not reinstall the duplicate code-review graph or its per-tool hook.
- Hermes Curator is already enabled. Unified Memory should adapt its deterministic stale/archive lifecycle, pinning, dry-run, audit ledger, snapshots, and single-edit rollback without creating another canonical vault.
- Curator-style consolidation remains opt-in and independently reviewed; never auto-delete unique durable knowledge.

## Verification

- PostToolUse hook registry is empty and its executable script is absent from the active hook directory.
- Retained MCP servers: codebase-memory, Local Knowledge, node/browser runtime, Context7, OpenAI developer docs, Supabase; Notion remains disabled.
- Removed plugins report `not installed`.
- Backup SHA-256: config `049A942F94248BF76E03BA7EF75F7AE5176AA91DB46FB05FCC7983247857AC29`; hooks `E4D6FDD3AFAE36F8C92ED0AC254C3666E523D8AA3562FCF69A52557560011335`; hook script `07B70378CE742489E9C0FE9BA506DF4187BF1E8D6DDDE02C9FB5CC6A1A8E46FF`.

## Live-session hook diagnosis

- The continuing `PostToolUse hook (failed)` banner belongs to the already-running Codex process, which loaded the removed hook at session start.
- Rechecked the active Codex files: `C:\Users\manaz\.codex\hooks.json` is `{ "hooks": {} }`, and active Codex configuration contains no `PostToolUse` or `code-review-graph` reference.
- A new Codex session is required once to unload the stale in-memory hook registration. No further on-disk Codex hook removal is pending.
- Separately, Claude Code's enabled ECC plugin had a Windows-incompatible `post:observe` shell hook. Added scoped `ECC_DISABLED_HOOKS=post:observe` to `C:\Users\manaz\.claude\settings.json`; JSON parsing and ECC's disabled-hook decision both passed. Rollback copy: `C:\Users\manaz\.claude\backups\2026-08-26-posttooluse-fix\settings.json.before` (SHA-256 `9CD525C1686A33C2EA1EEEDB9F9FFE6961FC69B803AE3B006B2073BF61A904B1`).

## Next steps

- Resume MAZ Pocket closure from its staged release branch state.
- Incorporate the Curator lifecycle into the Unified Memory protocol and local replaceable runtime after MAZ Pocket is safely checkpointed.
