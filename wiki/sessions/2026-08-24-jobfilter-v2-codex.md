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
- Commissioned two independent audits of free-tier architecture and external-service costs, including numeric 5/20/100-customer scenarios and hard upgrade triggers.
- Revised the funding sequence to keep pre-client validation at £0 and fund all live production upgrades from the first cleared setup payment.
- Created an isolated JobFilter worktree and `agents/jobfilter-v2-foundation` branch from fresh `origin/main`, preserving the dirty July worktree.
- Completed and committed the Phase 0 access/security audit, route migration matrix, design contract and source manifest.
- Built a synthetic, no-send Revenue Rescue walkthrough at `/demo/revenue-rescue` for £0 customer discovery.
- Made inbound WhatsApp disabled by default, added constant-time Meta signature validation, removed message-body logs and contained retry-after-side-effect behaviour.
- Opened PR #507, addressed its webhook review finding, passed CI/Vercel/Meticulous, squash-merged as `5b51d984`, and verified the production route and disabled webhook.

## Files changed

- `wiki/projects/jobfilter/2026-08-24-jobfilter-v2-execution-plan.md`
- `wiki/projects/jobfilter/2026-08-24-v2-github-pattern-research.md`
- `wiki/projects/jobfilter/2026-08-24-v2-free-tier-architecture-audit.md`
- `wiki/projects/jobfilter/2026-08-24-v2-external-services-cost-audit.md`
- `wiki/projects/jobfilter/STICKY-TODO.md`
- `wiki/sessions/2026-08-24-jobfilter-v2-codex.md`

## Decisions made

- Proposed Revenue Rescue as the Stage 1 product alongside incumbent job software.
- Retained public tender qualification as an optional Opportunities module rather than mixing two ICPs in the primary journey.
- Proposed SMS-first messaging, a real telephony feasibility gate, bounded telecom economics, and staged commercial gates before job-management replacement.
- Generic missed-call text-back is an acquisition trigger, not sufficient differentiation; Gate 1 now tests the complete qualification-to-quote and attributable-revenue workflow against what prospects already own.
- Open-source adaptation requires a per-file source manifest and licence/provenance review; AGPL, GPL, ELv2 and ambiguous source remains clean-room reference only.
- Vercel Hobby is limited to pre-client non-commercial validation. The first £149 setup payment funds Vercel Pro, live telecom acceptance and then production database reliability; no capacity is pre-purchased.
- Phase 0 code was merged through PR #507; no direct push to project `main` occurred.
- Production schema, pricing, subscribers, paid infrastructure and live telecom remain unchanged pending Gate 0/1 evidence.

## Next steps

- Founder uses the synthetic walkthrough for 10 incumbent-gap interviews and obtains the first signed £149 setup payment.
- Provide Stripe aggregate state and a non-production Supabase branch for applied-schema/two-user RLS verification.
- Identify the external nightly PR generator and confirm Vercel/Supabase plan and backup state.
- Only after those gates: implement the organisation/enquiry vertical slice; do not enable WhatsApp or buy telecom before its funded acceptance test.
