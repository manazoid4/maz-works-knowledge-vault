---
date: 2026-09-04
project: jobfilter
agent: codex
status: completed
---
## What I did
- Pulled the Maz Works Knowledge Vault and reviewed JobFilter project context plus the automation memory.
- Inspected the current JobFilter repo scripts, CI workflow, Vercel config, and regression suite to find repo-grounded instruction deltas.
- Updated `C:\Users\manaz\JobFilterV1\AGENTS.md` with a minimal note about using targeted files in `tests/regression` for area-specific checks.
- Ran `npm run build` to verify the repo still builds after the documentation change.

## Files changed
- `C:\Users\manaz\JobFilterV1\AGENTS.md`
- `C:\Users\manaz\.codex\automations\update-agents-md\memory.md`
- `wiki/sessions/2026-09-04-jobfilter-codex.md`

## Decisions made
- Kept the `AGENTS.md` change narrow instead of restating the full regression inventory, because the existing CI section is already accurate and the new durable fact is the presence of a larger targeted regression suite.
- Left stale vault index content untouched because this automation is scoped to repo-grounded `AGENTS.md` maintenance, not broader vault cleanup.

## Next steps
- If the targeted regression suite gains a stable small subset that should always run, add that sequence only after it is reflected in repo automation or repeated local usage.
- Track the eventual `middleware.ts` to `proxy` migration separately; it remains a build warning, not a new workflow.
