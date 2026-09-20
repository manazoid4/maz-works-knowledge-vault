---
date: 2026-09-20
project: maz-works
agent: codex
status: completed
release_status: blocked-on-delivery-verification
last_verified: 2026-09-20
---
# Maz Works recovery and customer path

## What I did
Recovered the actual 19 September Codex session: usage limit before work, no completed build. Preserved Claude PR #34 and integrated Agent B PR #35 locally. Completed recovery in draft [PR #37](https://github.com/manazoid4/mazos-site/pull/37), stacked on #35; production unchanged.

Fixed false-success delivery on unreadable/missing confirmation; service-link reloads that lost drafts; missing reply email in recovery; webmail recovery; keyboard reset focus; mobile form text. Restored explicit websites/software/automation/physical positioning, collapsed redundant process height, and replaced a public MAZ Pocket repository link returning 404. Fixed Windows sitemap test portability.

## Files changed
- Isolated worktree: C:/Users/manaz/.codex/worktrees/maz-works-recovery
- Branch: agents/maz-works-recovery-20260920
- Commits: f680214 (implementation and tests), 17e71eb (context/evidence).
- Repo: enquiry helper/forms/recovery CSS; page/layout/projects; regression tests; scripts/verify-customer-path.cjs; docs/maz-works/RECOVERY-CONTEXT-2026-09-20.md and screenshots/raw measurements. Older handoffs point to current recovery.
- Local Knowledge/projects/maz-works/2026-09-20-recovery.md; this session; wiki/projects/maz-works/STATUS.md.
- Unified Memory session mem_20260920t135243_cbc1883e ended with status update and evidence.

## Decisions made
Kept B's legibility and outcome-led copy. Restored concrete digital/physical breadth and demo suitability. No invented client results or manufacturing claims. No new CRM/database, outreach, production merge or production deployment. Kept pre-existing dirty Objects checkout intact. Obsidian CLI was not available; filesystem fallback used.

## Evidence
npm run verify: production build, typecheck, 48 tests and smoke passed. npm run lint passed (typecheck alias). Browser: five marketing routes at 320/390/768/1440, zero overflow/broken images/console errors; both mocked forms, six Objects prices, keyboard, recovery, service draft/history preservation passed. Mobile form text now 16px. Mobile homepage 8257px on B -> 7574px recovered; live is 7504px, so recovery is 70px taller than live while retaining larger type. Desktop live 5283px -> 5068px. No live form messages sent. Push CI and Vercel preview passed; PR CI checked separately. High/critical audit passed with one existing moderate baseline-browser-mapping advisory (existing Dependabot PR #25).

## Next steps
1. Owner activates FormSubmit for www.mazworks.uk and explicitly authorises labelled live tests; confirm receipt from both forms. Yesterday's recorded activation rejection is not proof of today's inbox state or every historical enquiry failing.
2. Review PR #35; then retarget/review PR #37 to main. Do not deploy merely because preview checks pass.
3. Print, photograph and NFC-test Objects before manufacturing claims.
4. Resolve apex/www canonical policy and review existing dependency PR separately.

Canonical next-agent entry: repo docs/maz-works/RECOVERY-CONTEXT-2026-09-20.md. Project: [[wiki/projects/maz-works/STATUS]].
