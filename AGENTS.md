# Maz Works Knowledge Vault — Agent Instructions

## Canonical vault

This is the single shared knowledge vault for Maz Works and Manazir Hussain.

- Canonical path: `C:\Users\manaz\Desktop\Maz Works Knowledge Vault`
- Repository: `https://github.com/manazoid4/maz-works-knowledge-vault`
- Main dashboard: `HOME.md`
- Current context: `wiki/hot.md`
- Shared index: `wiki/index.md`
- Project memory: `wiki/projects/`
- Session handoffs: `wiki/sessions/`
- Local ingestion: `Local Knowledge/`
- Preserved history: `Archive/`

JobFilter is one project inside the vault. Do not describe the complete vault as a JobFilter vault and do not create another general-purpose vault.

## Session protocol

Before project work:

1. Pull `main` from the `fork` remote.
2. Read the relevant `wiki/projects/{project}/` context.
3. Read `wiki/hot.md` only when cross-project context is useful.
4. Read the complete `SKILL.md` for any selected skill before using it.

At session end:

1. Update the relevant project status or handoff.
2. Write `wiki/sessions/YYYY-MM-DD-{project}-{agent}.md`.
3. Commit and push the vault to `fork main`.

## Knowledge rules

- `.raw/` contains source material and is immutable.
- `wiki/log.md` is append-only, newest entries first.
- `wiki/hot.md` is refreshed rather than endlessly appended.
- Use Obsidian wikilinks for internal knowledge links.
- Preserve sources, confidence, dates, and truth boundaries.
- Never commit credentials, private client data, confidential material, or private spiritual content.

## Skills

Skills live at `skills/<name>/SKILL.md`. Multi-agent discovery uses the neutral package path:

```text
~/.codex/skills/maz-works-knowledge-vault
~/.opencode/skills/maz-works-knowledge-vault
~/.gemini/skills/maz-works-knowledge-vault
```

Run `bash bin/setup-multi-agent.sh` to install missing links.

## Maintained toolset

The repository includes Obsidian knowledge workflows, hybrid retrieval, methodology routing, per-file write locking, source ingestion, wiki health checks, session saving, research, and Canvas support. Run `make test` after changing scripts or skills.

The original MIT-licensed foundation is credited in `ATTRIBUTION.md`. Maz Works is the active identity and maintenance boundary.
