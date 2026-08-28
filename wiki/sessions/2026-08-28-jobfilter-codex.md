---
date: 2026-08-28
project: jobfilter
agent: codex
status: completed
---
## What I did
Updated `C:\Users\manaz\JobFilterV1\AGENTS.md` with repo-verified command and CI workflow details only.
Verified the change with a full `npm run build`.

## Files changed
`C:\Users\manaz\JobFilterV1\AGENTS.md`
`C:\Users\manaz\.codex\automations\update-agents-md\memory.md`
`C:\Users\manaz\Desktop\Maz Works Knowledge Vault\wiki\sessions\2026-08-28-jobfilter-codex.md`

## Decisions made
Kept the edit minimal and avoided untracked local scripts because they are not yet established repo workflow.
Recorded Node 22 CI and `npm audit --audit-level=high` because both are explicitly present in `.github/workflows/ci.yml`.

## Next steps
If `middleware.ts` is still present in app code, migrate it to Next.js `proxy` before the deprecation becomes blocking.
