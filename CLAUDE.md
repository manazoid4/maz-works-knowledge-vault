# Maz Works Knowledge Vault — Claude Instructions

The unified Maz Works vault lives at `C:\Users\manaz\Desktop\Maz Works Knowledge Vault` and is mirrored at <https://github.com/manazoid4/maz-works-knowledge-vault>.

It covers every Maz Works project, client engagement, experiment, research thread, reusable delivery pattern, and agent handoff. JobFilter is one project inside the system.

## Begin a session

1. Read `AGENTS.md`.
2. Read the relevant project folder under `wiki/projects/`.
3. Read `wiki/hot.md` when recent cross-project context matters.
4. Read a selected skill's complete `SKILL.md` before applying it.

## Vault structure

- `.raw/` — immutable source documents
- `wiki/` — maintained cross-project knowledge
- `wiki/projects/` — project-specific truth and status
- `wiki/sessions/` — durable session receipts
- `Local Knowledge/` — ingestion, graph, retrieval, and digest tools
- `Personal/` — personal notes
- `Archive/` — retained history, not current truth

## Available workflows

- `/wiki` — setup and vault routing
- `/wiki-ingest` — source ingestion
- `/wiki-query` — cited answers from vault material
- `/wiki-lint` — health checks
- `/wiki-cli` — Obsidian transport
- `/wiki-retrieve` — hybrid retrieval
- `/wiki-mode` — LYT, PARA, Zettelkasten, or Generic routing
- `/save` — durable session note
- `/autoresearch` — bounded research loop
- `/canvas` — Obsidian Canvas work
- `/think` — structured reasoning loop

## Guardrails

- Use the canonical vault; do not create a competing general vault.
- Keep historical or upstream names only where provenance requires them.
- Never store credentials, private client information, or private spiritual content.
- Use file locking for concurrent wiki writes.
- Run `make test` after changing scripts or skills.

The active Claude Code package is `maz-works-knowledge-vault`. Upstream MIT attribution is in `ATTRIBUTION.md`.
