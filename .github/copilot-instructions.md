# Maz Works Knowledge Vault — GitHub Copilot Instructions

This repository is the shared Markdown knowledge system for Maz Works and Manazir Hussain. It is also a cross-platform Agent Skills package and Obsidian vault.

## Repository layout

- `skills/` — reusable agent skills
- `hooks/hooks.json` — Claude Code lifecycle hooks
- `.claude-plugin/` — package and marketplace metadata
- `wiki/` — maintained cross-project knowledge
- `wiki/projects/` — project truth and status
- `wiki/sessions/` — agent session receipts
- `.raw/` — immutable source documents
- `_templates/` — Obsidian templates

## Editing conventions

1. Use flat YAML frontmatter with plural `tags`, `aliases`, and `cssclasses` keys.
2. Use Obsidian wikilinks for internal knowledge links.
3. Use `YYYY-MM-DD` dates.
4. Never modify `.raw/` source material.
5. Keep `wiki/log.md` append-only and place new entries first.
6. Refresh `wiki/hot.md`; do not grow it indefinitely.
7. Keep Agent Skills frontmatter compatible with the shared skill specification.
8. Preserve source attribution and distinguish current truth from historical notes.
9. Treat Maz Works Knowledge Vault as the umbrella; JobFilter is one contained project.
10. Never add credentials, private client information, or private spiritual content.

Run `make test` after changing scripts or skills. The active repository is <https://github.com/manazoid4/maz-works-knowledge-vault>.
