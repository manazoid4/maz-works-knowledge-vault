# Maz Works Knowledge Vault — Gemini Instructions

This repository is the shared project memory for Maz Works. It uses plain Markdown and cross-platform Agent Skills so Gemini can work from the same truth as Claude, Codex, OpenCode, Cursor, and Windsurf.

## Canonical location

- Vault: `C:\Users\manaz\Desktop\Maz Works Knowledge Vault`
- Repository: `https://github.com/manazoid4/maz-works-knowledge-vault`
- Skills link: `~/.gemini/skills/maz-works-knowledge-vault`

Run `bash bin/setup-multi-agent.sh` to install the link.

## Start order

1. Read `AGENTS.md`.
2. Read the relevant `wiki/projects/{project}/` notes.
3. Read `wiki/hot.md` only when broader recent context is useful.
4. Read the selected skill's complete `SKILL.md` before acting.

## Core conventions

- `.raw/` is immutable source material.
- `wiki/` is maintained agent knowledge.
- `wiki/log.md` is append-only.
- `wiki/hot.md` is refreshed at session end.
- Internal knowledge links use Obsidian wikilinks.
- JobFilter is one project, not the vault identity.
- Never store credentials, private client information, or private spiritual content.

The active package name is `maz-works-knowledge-vault`; provenance is documented in `ATTRIBUTION.md`.
