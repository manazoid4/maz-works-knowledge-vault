---
date: 2026-09-21
project: maz-works
agent: codex
status: completed
---

## What I did

Recovered the incomplete Maz Works work, audited customer/enquiry/accessibility paths, and completed the selected A/B/C implementation block. The session was interrupted; do not interpret the wall-clock gap as continuous work.

Caught another run's merged PR40 during final sync. Main is now `9e0ebc9`, with the previous recovery, shorter enquiry form, FAQ/What's New and clean visual changes. Preserved them and moved only new fixes to `agents/maz-works-enquiry-resilience-20260921`. Draft [PR42](https://github.com/manazoid4/mazos-site/pull/42) targets main. No production merge/deploy by this run.

Fixed native enquiry POST fallbacks, delayed-hydration data loss, hidden required Objects contacts, keyboard focus/error associations, catalogue changes during pending submission, duplicate evidence landmarks, clipped mobile Contact navigation and 320px What's New overflow. No fabricated commercial claims or price changes.

## Files changed

Repo `C:/Users/manaz/.codex/worktrees/maz-works-recovery`: enquiry helpers/forms, Objects selection/collection/CSS, project-elements, final-friction/resource-page CSS, vercel CSP, one regression test file and five browser scripts. Context/evidence: `docs/maz-works/WORK-BLOCK-2026-09-21.md`, `CLAUDE-PROMPT-2026-09-21.md`, `work-block-2026-09-21/` and a historical-context pointer.

Commits on current main: `8ac44a2` implementation; `eefbe99` updates overflow; `36097a3` handoff/evidence. Repo worktree clean after push. Old recovery branch keeps local safety commit `2f4e710`; do not merge the superseded PR35/37 stack without checking PR40.

## Decisions made

Prioritised preventing lost enquiries over decorative redesign. Required contacts always visible; only optional details collapse. Preserved the newly landed short homepage form. Kept provider activation/inbox receipt separate from mocked UI proof. Two independent review workers never started and were cancelled; only self-review and actual executed checks count. Claude's separately requested review has not been received.

Evidence: production build (16 pages), typecheck/lint, 51/51 tests, smoke, 28 responsive route/width combinations, no-JS/blocked/late-script submissions, keyboard and all six price states pass. Seven routes at two widths have no automated axe violations; incomplete generic-div naming findings on home/demos remain for Claude's scoped review. This is not a full assistive-technology/WCAG audit. All form sends mocked; no real email sent.

## Next steps

1. Confirm FormSubmit activation for the real custom domain and explicitly authorise a labelled enquiry with verified inbox receipt.
2. Review PR42 against current main; merge/deploy only through the normal authorised release process.
3. Use the refreshed three-goal Claude prompt, based on the new resilience branch. Review Claude's actual code, claims/sources and runtime evidence before integration.
4. Validate a physical Touch prototype, NFC/QR, fit, costs and turnaround. User mentioned changing 0.6 to 0.2 nozzle; no physical change was performed or verified here.

[[wiki/projects/maz-works/STATUS]]
