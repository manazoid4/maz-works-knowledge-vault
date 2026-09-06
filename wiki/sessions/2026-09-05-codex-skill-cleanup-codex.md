---
date: 2026-09-05
project: codex-skill-cleanup
agent: codex
status: completed
---

## What I did

- Pulled the Maz Works Knowledge Vault from `fork main`.
- Audited Codex skill discovery roots, enabled plugin contributions, duplicate names, installation cohorts, and available session evidence of skill-body reads.
- Diagnosed the context-budget warning as an oversized active catalog rather than oversized skill bodies loaded on demand.
- Wrote a reversible, usage-backed cleanup plan with an approval gate.
- After approval, quarantined unused and overlapping skills into dated cold storage with a JSON manifest; restored five frequently used entries caught by the second-pass check.
- Isolated 44 unused remote Vercel leaf skills and disabled the broad Vercel plugin plus unused artifact/productivity plugins.
- Updated `C:\Users\manaz\.codex\AGENTS.md` to document the compact active catalog and restoration path.
- Verified a fresh Codex process sees 78 skills with no context-budget, omitted-skill, or shortened-description warning.

## Files changed

- `wiki/engineering/codex-skill-context-cleanup-plan.md`
- `wiki/sessions/2026-09-05-codex-skill-cleanup-codex.md`
- `C:\Users\manaz\.codex\AGENTS.md`
- `C:\Users\manaz\.codex\config.toml`
- `C:\Users\manaz\.codex\skills-disabled\2026-09-06\manifest.json`
- `C:\Users\manaz\.codex\plugins-disabled\vercel-0.21.4\skills\*`
- `C:\Users\manaz\.agents\skills-disabled\2026-09-06\*`

## Decisions made

- Plan a quarantine-based cleanup instead of permanent deletion.
- Preserve system skills, vault skills, project-relevant official plugins, and one preferred skill per recurring workflow.
- Use dated cold storage rather than permanent deletion so any specialized skill can be restored by manifest.
- Keep official Vercel guidance only for the project-relevant areas; disable broad low-use plugin bundles to preserve full descriptions.
- Preserve the unrelated untracked `10_Projects/` vault content and exclude it from this session commit.

## Next steps

- Future work: restore a named skill from the manifest when needed, then rerun the fresh-session smoke check after any plugin update.
