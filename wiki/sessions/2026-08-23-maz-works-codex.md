---
date: 2026-08-23
project: maz-works
agent: codex
status: completed
---

## What I did

- Searched local Codex, Claude and OpenCode conversation archives plus the Maz Works Knowledge Vault for the remembered Maz Works lead, call-screening and client-acquisition system.
- Identified that the memory combines three related sources: the Maz Works commercial flywheel, the Scrap Finance Partners acquisition workspace, and the JobFilter/TradieStack call-screening concept.
- Located the original conversation logs and durable project notes for each source.
- Turned the recovered Maz Works workflow into a working Call Desk inside the MazOS Windows application, explicitly separate from JobFilter AI call screening.
- Added local prospect persistence, bounded homepage evidence checks, a TPS/CTPS/internal suppression gate, live call scripts, objection responses, notes, outcomes, follow-ups and pipeline states.
- Added deterministic unit tests and a full isolated-Chromium Playwright flow from prospect creation through a booked call.
- Upgraded vulnerable dependencies to versions producing zero npm audit findings and fixed dynamic Hermes file tracing that was inflating the Windows package.
- Built and verified final unsigned NSIS and MSI installers, pushed `agents/maz-works-call-desk`, and opened `manazoid4/mazos-ui` PR #57.
- Observed that PR #57 auto-merged into a repo with a Vercel deployment, added an explicit hosted UI/API denial so prospect operations and the website checker remain local-only, rebuilt both installers, and opened follow-up PR #58.
- Confirmed PR #58 merged, the complete GitHub Windows verification and packaging workflow passed, the production hosted page renders the local-only gate, and the production site-check API returns 403.
- Installed the fresh NSIS build locally to `C:\Users\manaz\AppData\Local\MazOS` and launched it successfully; the responsive window title is `MazOS · Maz Works`.
- Used the vault save skill. Its `wiki-lock.sh` has CRLF line endings that fail under Bash on Windows; locks were acquired and released through a CRLF-normalized process-substitution invocation.

## Files changed

- `wiki/sessions/2026-08-23-maz-works-codex.md`
- `wiki/projects/maz-works/CALL-DESK.md`
- `wiki/index.md`
- `wiki/log.md`
- `wiki/hot.md`
- MazOS implementation on PR #57, including `src/app/call-desk/`, Call Desk/site-check APIs, domain logic, tests, desktop configuration and operator documentation.

## Decisions made

- Treat the August 13 Maz Works commercial model as the canonical client journey: problem, bounded demo, agreed scope, paid implementation, presentation, proof, permission, case study and reusable pattern.
- Do not describe the combined system as already built for Maz Works. The mature acquisition workspace was built for Scrap Finance Partners; AI call screening was only a later TradieStack idea.
- Reuse the proven acquisition workflow only through an explicit Maz Works adaptation rather than conflating separate products.
- Use the existing MazOS Tauri application as the Windows foundation rather than putting private prospect operations into the public Maz Works website.
- Keep the system local-first and human-operated: no automated dialling, call recording, AI voice screening, cloud CRM sync or automatic registry lookup.
- Require bounded website evidence, a recorded public source, current TPS and CTPS checks, a clear internal suppression result and an evidence note for any specific-consent override before the call script unlocks.
- Use the fixed £150 Website Rescue Sprint as the first paid bounded offer after a free evidence note or 15-minute screen-share.
- Treat merged PRs #57 and #58 as the canonical code path; locally built installers are unsigned test artifacts, not a public release.
- Require PR #58's local-only boundary on hosted MazOS: Vercel/non-loopback requests cannot access prospect persistence or use the server-side site checker.

## Next steps

- Install the PR/CI artifact or local installer and complete the existing graphical installed-application acceptance matrix before public release.
- Complete the existing graphical installed-application acceptance matrix before public release.
- Configure code signing before distributing the installer beyond controlled testing.
- Obtain access to a registered TPS/CTPS screening service; the application records results but deliberately does not pretend to query the registers.
- Start with a small researched list, call only screen-cleared prospects, measure conversations/bookings/paid sprints, and refine scripts from recorded objections rather than adding automation prematurely.
