---
date: 2026-08-24
project: jobfilter
agent: codex
status: completed
---

## What I did

- Searched the vault, raw Codex/Claude histories, archived memory exports, local JobFilter Git history, and GitHub for the original JobFilter V2/full-overhaul discussion.
- Found no GitHub issue, PR, branch, commit, or local transcript containing the quoted 36-section V2 brief.
- Recovered related source material: the 5 May TradieStack concept, the 22 July public-works execution plan, current repository architecture, and the founder-supplied 24 August adversarial audit package.
- Re-checked current Tradify and ServiceM8 pricing/features, Twilio call-event mechanics, and ICO service-versus-marketing guidance against primary sources.
- Consolidated the evidence into [[wiki/projects/jobfilter/2026-08-24-jobfilter-v2-execution-plan]].
- Audited 20 relevant GitHub repositories across missed-call recovery, omnichannel inboxes, CRM, quotes/invoices, payments, scheduling, field service and tender-data processing.
- Classified each repository as permissive, mixed-licence or clean-room reference and recorded exact reuse boundaries in [[wiki/projects/jobfilter/2026-08-24-v2-github-pattern-research]].
- Amended the execution plan after finding a directly comparable missed-call product whose author abandoned the generic wedge following customer and competitor discovery.

## Files changed

- `wiki/projects/jobfilter/2026-08-24-jobfilter-v2-execution-plan.md`
- `wiki/projects/jobfilter/2026-08-24-v2-github-pattern-research.md`
- `wiki/sessions/2026-08-24-jobfilter-v2-codex.md`

## Decisions made

- Proposed Revenue Rescue as the Stage 1 product alongside incumbent job software.
- Retained public tender qualification as an optional Opportunities module rather than mixing two ICPs in the primary journey.
- Proposed SMS-first messaging, a real telephony feasibility gate, bounded telecom economics, and staged commercial gates before job-management replacement.
- Generic missed-call text-back is an acquisition trigger, not sufficient differentiation; Gate 1 now tests the complete qualification-to-quote and attributable-revenue workflow against what prospects already own.
- Open-source adaptation requires a per-file source manifest and licence/provenance review; AGPL, GPL, ELv2 and ambiguous source remains clean-room reference only.
- No JobFilter repository files were changed; implementation awaits founder approval.

## Next steps

- Founder approves or amends the six decisions in the revised V2 plan.
- On approval, create an isolated `agents/jobfilter-v2-foundation` branch from fresh `origin/main`, execute Phase 0, verify, push, and open a PR.
