---
date: 2026-09-05
project: codex-skill-cleanup
agent: codex
status: in-progress
---

## What I did

- Pulled the Maz Works Knowledge Vault from `fork main`.
- Audited Codex skill discovery roots, enabled plugin contributions, duplicate names, installation cohorts, and available session evidence of skill-body reads.
- Diagnosed the context-budget warning as an oversized active catalog rather than oversized skill bodies loaded on demand.
- Wrote a reversible, usage-backed cleanup plan with an approval gate.

## Files changed

- `wiki/engineering/codex-skill-context-cleanup-plan.md`
- `wiki/sessions/2026-09-05-codex-skill-cleanup-codex.md`

## Decisions made

- Plan a quarantine-based cleanup instead of permanent deletion.
- Preserve system skills, vault skills, project-relevant official plugins, and one preferred skill per recurring workflow.
- Do not execute filesystem or configuration changes until the user approves the plan.
- Preserve the unrelated untracked `10_Projects/` vault content and exclude it from this session commit.

## Next steps

- On approval, create the exact manifest and allowlist, quarantine unused skills, align standing instructions, and verify a fresh Codex session has descriptions with no omitted skills.
