---
date: 2026-09-30
project: mazos-site
agent: claude
status: completed
---
## What I did
- Audited Codex's uncommitted Batch 1 in `C:\Users\manaz\.codex\worktrees\mazos-batches` against Brief 3, fixed the gaps and shipped it: mazos-site PR #93.
- Built Batch 2 (Build my system with `quotePlan()`, cost calculator, playable phone, motion polish): PR #94, stacked on #93.
- Built Batch 3 (View Transitions, trade-page scenes and builder, 2-step form, video slot, sticky CTA, CSS 10 → 4 files pixel-identical, final audit): PR #95, stacked on #94.
- Private handover: unified-memory-database PR #48.

## Decisions made
- Builder pricing: standard add-ons can be bought alone; the first job to build is Starter; further ones are Extra automation; Business System when the parts cost more; weekly report included.
- Builder and calculator are not `<form>`s (the homepage keeps one form; no GET forms).

## Next steps
- Maz: merge #93, #94, #95 in order after checking the previews; confirm the instant confirmation on production (`RESEND_API_KEY` is Production-only); record the walkthrough video.
- A stray empty Vercel project `vc` was created by `vercel curl` from a scratch folder; delete it once Maz OKs.
