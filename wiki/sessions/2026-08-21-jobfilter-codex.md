---
date: 2026-08-21
project: jobfilter
agent: codex
status: completed
---
## What I did
- Created a new repo-root `AGENTS.md` for JobFilter because the checkout did not already have one.
- Added only repo-confirmed workflows and commands from `package.json`, `.github/workflows/ci.yml`, `README.md`, and `vercel.json`.
- Verified the change with `npm run build`.

## Files changed
- `C:\Users\manaz\JobFilterV1\AGENTS.md`
- `C:\Users\manaz\.codex\automations\update-agents-md\memory.md`

## Decisions made
- Kept the new agent file narrow: stack/source reality, active scripts, CI sequence, and Vercel cron only.
- Did not add broader process guidance because that would have duplicated standing orders or invented repo behavior.

## Next steps
- If the team wants more agent guidance later, extend this file from observed repo workflows rather than adding generic instructions.
