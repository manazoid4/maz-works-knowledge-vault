---
type: post-mortem
project: maz-works
date: 2026-09-18
agent: codex
status: completed
tags:
  - maz-works
  - client-acquisition
  - agent-process
---
# Maz Works acquisition planning post-mortem

## Scope and outcome
Review of the 18 September planning session and the acquisition assumptions it produced. This is not a claim that a marketing campaign failed: no campaign was executed or measured in this session. The four acquisition goals remain active planning work. A second post-mortem belongs after the first measured campaign cycle.

The user asked for four high-leverage moves for client acquisition, with multiple perspectives and efficient token use. I initially consulted stale project memory, inspected the old Vercel address, asked for business context already available, and drafted recommendations before reviewing current GitHub material. The user had to supply mazworks.uk and ask me to inspect GitHub. I corrected the source review and project memory after that intervention.

## What went wrong

| Finding | Evidence | Consequence | Correction |
|---|---|---|---|
| Stale context treated as current | STATUS.md was dated 8 September and named the Vercel deployment; GitHub PR #33 made mazworks.uk canonical on 16 September. | User had to repeat a known identity fact; initial review used the wrong public address. | Canonical domain and GitHub identity saved in project status and Local Knowledge. Check current first-party sources before strategy. |
| Broad clarification came before discovery | I asked what Maz Works sells and who it serves before reading the live site and repo playbook. | Unnecessary user effort and slower planning. | Infer documented offer and assets first; ask only for unavailable commercial facts. |
| Recommendations preceded the asset review | First draft foregrounded the older Call Desk note; later GitHub review found LeadFinder and the existing acquisition playbook. | Risk of duplicating existing tools, content or processes. | Inventory reusable assets and recent shipped changes before proposing work. |
| Hypotheses sounded more settled than evidence allowed | Offer breadth and the demo CTA were visible; traffic, responses, conversions and acquisition costs were not reviewed. | Copy changes could be prioritised while access, follow-up or another constraint is the actual problem. | Label bottleneck hypotheses; collect funnel baseline before committing heavy work. |
| Draft persisted before current sources were checked | Plan was written, then revised after the domain correction. | Avoidable tool use, tokens and contradictory historical wording. | Read the bounded source set once, decide, then persist a coherent draft. |
| Git success was insufficient evidence of persistence | Initial add skipped ignored plan paths while the session note committed successfully; later explicit staging committed the actual plans. | A session record can misleadingly imply its supporting plan is in the remote. | Inspect staged filenames and tracked contents, not just the final shell exit code. |

Root cause: I treated memory retrieval as verification and started synthesis too early. Tool access was available; this was a sequencing and judgment error. The exact token overhead was not measured and should not be invented.

## What worked

The later review checked the live homepage, client case study and Objects page; current site README and acquisition playbook; LeadFinder documentation; and recent merged site PRs. Existing proof/CTA/scroll improvements were recognised. No site edits, price changes, demos or outreach were executed. The plan retained a small test and explicit uncertainty rather than promising clients or revenue.

## Commercial review: observations versus hypotheses

- Buyer: the site covers several services and problems. A campaign-specific offer may improve relevance, but no evidence yet proves homepage breadth causes lost sales.
- Trust: Scrap Finance Partners establishes delivered client work; the case study explicitly lacks measured commercial outcomes. GitHub shows technical capability, not demand or paying-client counts. Use these assets accurately and obtain permission for additional client proof.
- Acquisition: LeadFinder and a documented outreach process already exist. The next unknown is whether a chosen audience responds and buys; another acquisition application is not justified by the evidence reviewed.
- Economics: free demos and entry prices create a possible time-cost problem. No time records or margin analysis were reviewed, so low profitability is a risk to measure, not a finding.
- Objects: the public page uses concept visuals and repository documentation lists physical validation still to do. A printed, tested sample may be stronger sales evidence than another render. The recent overnight print is not proof that product validation or demand is complete.
- Conversion: lack of pipeline evidence prevents distinguishing insufficient reach, weak targeting, low trust, pricing objections or inconsistent follow-up. Treat these as alternative explanations.

## Corrective actions and verification

- Completed: save mazworks.uk, manazoid4 and manazoid4/mazos-site as canonical context; mirror corrected status and plan locally; commit the tracked plan to the vault remote.
- Completed: revise the four goals to reuse LeadFinder, real client proof and the existing offer structure; add this post-mortem to the plan and checklist.
- Before heavy campaign work: inspect whatever traffic/enquiry and pipeline records are available; record the period and missing data. Do not build a new analytics system merely to fill a planning table.
- Before a niche is treated as selected: compare warm access, urgency, budget, relevant proof and delivery effort. Owner-led service firms are currently a test hypothesis.
- Before each work package: define its output, business question and completion test. Limit exploratory work to the material needed for that decision.
- After the experiment: compare actual conversations, qualified opportunities, proposals, paid clients, cash collected and sales/delivery hours by source. Investigate the largest observed loss before expanding the campaign.

## Future Maz Works startup sequence

1. Read the corrected project status.
2. Check mazworks.uk and the current site README/acquisition playbook; inspect relevant recent changes.
3. Inventory existing proof, tools and warm opportunities before proposing new assets.
4. Separate verified facts, hypotheses and genuinely missing inputs.
5. Ask only for the missing facts that affect the next decision.
6. Prepare one bounded plan and verify the exact durable files before reporting completion.

## Follow-up post-mortem after the acquisition test

Record intended result, actual results, effort/cost, buyer objections, stage losses and delivery economics. Identify what to keep, stop and change. If a test misses a target, distinguish low exposure from a rejected offer; do not declare a market invalid from a small unrepresentative batch. If successful, verify that the result is profitable and repeatable before scaling.

## Evidence

- [Live Maz Works site](https://mazworks.uk)
- [Scrap Finance Partners case study](https://mazworks.uk/work/scrap-finance-partners)
- [Objects page](https://mazworks.uk/3d-printing)
- [Current site README](https://github.com/manazoid4/mazos-site)
- [Acquisition playbook](https://github.com/manazoid4/mazos-site/blob/main/docs/maz-works/CLIENT-ACQUISITION.md)
- [Domain correction PR #33](https://github.com/manazoid4/mazos-site/pull/33)
- [LeadFinder](https://github.com/manazoid4/leadfinder)
- This session's user correction and observed Git outputs.

Related: [[wiki/projects/maz-works/tasks/plan|Acquisition plan]] and [[wiki/projects/maz-works/STATUS|Project status]].
