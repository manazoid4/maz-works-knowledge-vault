# Agent Standing Orders — Maz Works

## Shared identity

Claude, Codex, and OpenCode share one durable cross-project memory system:

- **Name:** Maz Works Knowledge Vault
- **Path:** `C:\Users\manaz\Desktop\Maz Works Knowledge Vault`
- **Repository:** `https://github.com/manazoid4/maz-works-knowledge-vault`
- **Neutral junction:** `C:\Users\manaz\MazWorksKnowledgeVault`
- **Local ingestion junction:** `C:\Users\manaz\LocalKnowledgeVault`

JobFilter is one project inside this vault. Its legacy aliases do not define the shared system.

## Session start

```bash
git -C "C:\Users\manaz\Desktop\Maz Works Knowledge Vault" pull fork main
```

Then read the relevant `wiki/projects/{project}/` context. Use `wiki/hot.md` for recent cross-project context, not as a substitute for project truth.

## Session end

Write `wiki/sessions/YYYY-MM-DD-{project}-{agent}.md`:

```markdown
---
date: YYYY-MM-DD
project: {project}
agent: {claude|codex|opencode}
status: {completed|blocked|in-progress}
---
## What I did
## Files changed
## Decisions made
## Next steps
```

Then commit and push:

```bash
git -C "C:\Users\manaz\Desktop\Maz Works Knowledge Vault" add -A
git -C "C:\Users\manaz\Desktop\Maz Works Knowledge Vault" commit -m "session: {project} {YYYY-MM-DD} {agent}"
git -C "C:\Users\manaz\Desktop\Maz Works Knowledge Vault" push fork main
```

## Project locations

Use `wiki/projects/project-locations.md` as the maintained project map. Do not rely on old aliases embedded in historical session notes.

## Git rules

- Never push directly to `main` on product repositories.
- Use `agents/{task-slug}` branches and pull requests for product work.
- Push this knowledge vault to `fork main` after each session.
- Preserve private boundaries; never digitize awrad, wirds, teacher instructions, credentials, or confidential client material.

## Knowledge rules

- `.raw/` is immutable source material.
- Record facts under the relevant project and link shared patterns into the indexes.
- Preserve provenance and mark uncertainty.
- Do not create a second general-purpose vault.
- Read the complete `SKILL.md` before using any skill.
