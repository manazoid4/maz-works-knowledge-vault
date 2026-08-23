---
type: synthesis
title: "Ox Alpha Hermes Portfolio Audit-to-Build Batches"
created: 2026-08-23
updated: 2026-08-23
tags:
  - hermes
  - ox-alpha
  - portfolio
  - audit
  - build-prompts
  - friction
status: current
related:
  - "[[wiki/questions/ox-alpha-hermes-30-test-benchmark]]"
  - "[[wiki/projects/maz-pocket/INDEX]]"
  - "[[wiki/projects/maz-works/STATUS]]"
  - "[[wiki/projects/jobfilter/INDEX]]"
  - "[[wiki/projects/flowlens/INDEX]]"
  - "[[wiki/projects/inkweave/INDEX]]"
sources: []
question: "How should Hermes/Ox Alpha audit the highest-priority Maz Works repositories in evidence-safe batches and produce standalone build-agent prompts?"
answer_quality: solid
---

# Ox Alpha Hermes Portfolio Audit-to-Build Batches

## What to expect

This is a five-paste workflow, not one giant context dump:

1. **Bootstrap** creates an isolated audit workspace, snapshots GitHub, records exact SHAs, reconciles vault/local evidence, and installs anti-hallucination rules.
2. **Batch 1** audits JobFilter, Maz Works, and Scrap Finance Partners for the fastest credible path to revenue.
3. **Batch 2** audits Agent Nudge, FlowLens, and VoxPane as strong differentiated products needing commercial proof.
4. **Batch 3** audits Maz Pocket, OmniScribe, and InkWeave with proof-before-investment gates.
5. **Final synthesis** ranks all nine evidence-producing build tranches and creates a 30-day build queue.

Every project must produce:

- `audit.md` — evidence-backed product, UX, engineering, commercial, security, operations, and friction audit;
- `market-readiness.md` — quickest honest path to demand/revenue proof, plus reversal conditions;
- `build-prompt.md` — a standalone prompt a fresh build agent can implement on an `agents/` branch.

The system is deliberately read-only. It does not edit products, deploy, open PRs, change billing, access secrets, or contact customers. Its job is to produce trusted inputs for later build agents.

## Why this order

GitHub stars do not provide a useful popularity ranking: JobFilter has one star and the other selected repos currently have zero. Owner-visible 14-day traffic on 2026-08-23 showed attention but also obvious automation/bot noise in clone counts:

| Repo | Views / unique | Clones / unique | Interpretation |
|---|---:|---:|---|
| Agent Nudge | 18 / 15 | 31 / 24 | Strongest observed human-looking GitHub attention. |
| JobFilter | 23 / 4 | 25,459 / 615 | High clone activity is anomalous; revenue readiness matters more than raw count. |
| Maz Works | 20 / 2 | 385 / 202 | Likely automation-heavy; its real value is live distribution and client conversion. |
| Maz Pocket | 121 / 1 | 334 / 3 | Repeat views with one unique viewer; not broad popularity. |
| Remaining five | 0 unique views | 4–13 unique clones | Insufficient evidence of public demand. |

Batch order therefore uses commercial readiness and speed to proof, while retaining traffic as one labelled signal:

- **Batch 1:** JobFilter, Maz Works, Scrap Finance Partners.
- **Batch 2:** Agent Nudge, FlowLens, VoxPane.
- **Batch 3:** Maz Pocket, OmniScribe, InkWeave.

The final audit may change this order, but only with cited evidence and explicit reversal conditions.

## Verified repository map

| Project | GitHub source of truth | Default branch at setup | Known local path |
|---|---|---|---|
| JobFilter | `manazoid4/JobFilterV1` | `main` | `C:\Users\manaz\JobFilterV1` |
| Maz Works | `manazoid4/mazos-site` | `main` | `C:\Users\manaz\mazos-site` |
| Scrap Finance Partners | `manazoid4/scrap-finance-partners` | `master` | `C:\Users\manaz\scrap-finance-partners` |
| Agent Nudge | `manazoid4/agent-nudge` | `main` | `C:\Users\manaz\Projects\agent-nudge` |
| FlowLens | `manazoid4/flowlens` | `master` | `C:\Users\manaz\flowlens` |
| VoxPane | `manazoid4/Voxpane` | `main` | No verified local clone; use audit snapshot. |
| Maz Pocket | `manazoid4/maz-pocket` | `main` | `C:\Users\manaz\maz-pocket` |
| OmniScribe | `manazoid4/omniscribe` | `master` | No verified local clone; use audit snapshot. |
| InkWeave | `manazoid4/inkweave` | `main` | No verified local clone; repository is archived. |
| Knowledge vault | `manazoid4/maz-works-knowledge-vault` | `main` | `C:\Users\manaz\Desktop\Maz Works Knowledge Vault` |

Hermes must re-verify all branches, archive flags, SHAs, and paths at run time. This table is a locator, not permission to assume state.

---

## Paste 1 of 5 — Bootstrap and evidence contract

Paste this first and wait for `BOOTSTRAP COMPLETE`.

```text
You are Ox Alpha running inside Hermes on my local Windows machine. You are preparing evidence-backed portfolio audits that will later be handed to separate build agents. This run is AUDIT-ONLY.

MISSION
Audit nine Maz Works projects in three later batches. Your outputs must be useful enough that a fresh build agent can implement the recommended smallest evidence-producing tranche without seeing this conversation.

NON-NEGOTIABLE SAFETY
1. Do not modify any source repository, local worktree, GitHub repository, issue, PR, deployment, database, billing system, environment variable, external account, or customer data.
2. Do not read or print .env files, credentials, tokens, private keys, browser cookies, or secret values.
3. Do not run production probes, submit forms, send messages, contact customers, or trigger paid APIs.
4. Write only inside a new run directory under:
   C:\Users\manaz\.hermes\workspace\ox-alpha-portfolio-audit\<RUN_ID>
5. Never use destructive Git or filesystem commands. Never reset, clean, delete, or overwrite a user repository.
6. Process one project at a time. Clear the active project evidence context before starting the next. Do not blend project facts.
7. If a tool, repo, private source, or file is unavailable, write UNKNOWN/UNAVAILABLE and continue. Never fill the gap from memory.

RUN DIRECTORY
Create a unique RUN_ID using UTC date/time. Under it create:
- 00-run-manifest.md
- 00-source-ledger.md
- 00-run-log.md
- sources/github/
- sources/vault/
- outputs/batch-1/
- outputs/batch-2/
- outputs/batch-3/
- outputs/final/

PROJECT MAP TO VERIFY
- JobFilter => GitHub manazoid4/JobFilterV1; expected local C:\Users\manaz\JobFilterV1
- Maz Works => GitHub manazoid4/mazos-site; expected local C:\Users\manaz\mazos-site
- Scrap Finance Partners => GitHub manazoid4/scrap-finance-partners; expected local C:\Users\manaz\scrap-finance-partners
- Agent Nudge => GitHub manazoid4/agent-nudge; expected local C:\Users\manaz\Projects\agent-nudge
- FlowLens => GitHub manazoid4/flowlens; expected local C:\Users\manaz\flowlens
- VoxPane => GitHub manazoid4/Voxpane; no local clone assumed
- Maz Pocket => GitHub manazoid4/maz-pocket; expected local C:\Users\manaz\maz-pocket
- OmniScribe => GitHub manazoid4/omniscribe; no local clone assumed
- InkWeave => GitHub manazoid4/inkweave; expected archived; no local clone assumed
- Knowledge vault => GitHub manazoid4/maz-works-knowledge-vault; expected local C:\Users\manaz\Desktop\Maz Works Knowledge Vault

SOURCE ACQUISITION
A. Run gh auth status without printing tokens. If GitHub CLI is unavailable, use public GitHub pages/API and mark private sources unavailable.
B. For every GitHub repo, query and record: exact owner/name, URL, visibility, archived flag, default branch, HEAD SHA, pushedAt, description, stars, forks, open issues/PRs if available, latest release, and 14-day traffic if authorised. Record traffic as a noisy attention signal, not market demand.
C. Create a fresh snapshot clone of each accessible GitHub repository inside this run directory only. Do not reuse, pull, reset, or alter a user worktree. Check out or inspect the recorded default-branch SHA. If cloning fails, use gh api/contents and mark limitations.
D. Create a fresh snapshot of the knowledge-vault GitHub main branch inside sources/vault and record its SHA.
E. Probe each expected local path read-only. Record whether it exists, its remote URL, current branch, HEAD, upstream divergence, and whether git status --porcelain is dirty. Do not fetch, pull, checkout, stash, or edit it.
F. Local content may reveal newer uncommitted work, but it is LOCAL-ONLY until committed to GitHub. Never silently use it as shipped truth.

SOURCE PRECEDENCE
1. For current shipped code and repository status: GitHub default branch at the recorded SHA is authoritative.
2. For issues, PRs, releases, CI, and repository metadata: GitHub is authoritative.
3. For durable product decisions, founder constraints, prior research, and project memory: the GitHub snapshot of manazoid4/maz-works-knowledge-vault main is authoritative, but it may be stale relative to code.
4. Local worktrees are read-only supplementary evidence. Label every claim from them LOCAL-ONLY and record the path/HEAD/dirty state.
5. External market, legal, pricing, competitor, and technical claims require current primary sources with URL and access date. If not researched, label HYPOTHESIS.
6. When sources conflict, report the conflict. Never pick the more convenient version silently.

MANDATORY CLAIM LABELS
Use one of these after every material claim:
- [GITHUB owner/repo@SHA:path]
- [GITHUB-META owner/repo@SHA]
- [VAULT@SHA:path]
- [LOCAL-ONLY path@HEAD:path]
- [EXTERNAL URL accessed YYYY-MM-DD]
- [INFERENCE from cited evidence]
- [HYPOTHESIS — validation required]
- [UNKNOWN — source unavailable]

Do not invent line numbers. Use exact paths and symbol/section names when line numbers are not reliably available. A code-level claim needs code/test/config evidence, not only README text. A deployment claim needs deployment or live evidence; repository code alone cannot prove production state.

ANTI-HALLUCINATION CHECKS
- Before each finding, ask: what source proves this, and did I actually read it?
- Keep a per-project Fact / Inference / Unknown table.
- Never report a command, test, browser check, clone, source read, or external research action unless it actually ran successfully.
- Never turn planned, mocked, preview, demo, stubbed, archived, or credential-gated capability into “shipped.”
- Never infer demand from stars, clones, page views, a polished UI, or the founder’s enthusiasm.
- Never create a fixed number of findings. Zero high-severity findings is acceptable.

COMMON AUDIT LENSES
For each project later examine:
1. Current truth: shipped, preview, planned, stale, archived, blocked.
2. Customer and jobs-to-be-done evidence.
3. Friction: cognitive, interaction, trust, time, technical, financial, operational, handoff, accessibility, emotional.
4. Product scope and fastest evidence-producing vertical slice.
5. UX, mobile/desktop fit, accessibility, failure/recovery states.
6. Architecture, reliability, tests, deployment, maintainability.
7. Security, privacy, legal/compliance, claims accuracy.
8. Sales, positioning, pricing, conversion, distribution.
9. Analytics and the cheapest experiment that could disprove the bet.
10. Founder effort, dependencies, and time to first credible revenue proof.

REQUIRED PROJECT OUTPUTS
For each project create a separate folder under the correct batch:
- source-ledger.md
- audit.md
- market-readiness.md
- build-prompt.md

audit.md must contain:
- audited GitHub SHA and source coverage;
- bias/uncertainty log;
- current-truth table;
- user journey and friction map;
- findings ranked P0/P1/P2/P3 with evidence, affected user, root cause, impact, confidence, smallest remedy, and verification;
- strengths worth preserving;
- contradictions and unknowns;
- what not to build.

market-readiness.md must contain:
- evidence of attention versus evidence of demand;
- target buyer/user and painful job;
- present offer and trust gaps;
- quickest honest route to first/next revenue proof;
- 7-day and 30-day experiments with success, failure, and stop thresholds;
- major dependency or compliance gate;
- a score from 0–5 for demand evidence, product readiness, distribution, monetisation clarity, founder effort, risk, and speed to proof;
- reversal conditions that would change the recommendation.

STANDALONE BUILD PROMPT CONTRACT
build-prompt.md must be written as a complete prompt addressed to a fresh build agent. It must include:
1. ROLE AND OUTCOME.
2. PROJECT, repo URL, default branch, audited SHA, and authoritative files.
3. CURRENT VERIFIED TRUTH, with evidence paths.
4. ONE vertical-slice objective that produces user or market evidence.
5. WHY NOW and the friction removed.
6. SCOPE and explicit NON-GOALS.
7. REQUIRED READS before editing, including AGENTS.md/CLAUDE.md and relevant vault notes.
8. WORKTREE/GIT rules: inspect first, preserve user changes, branch agents/<task-slug>, never push main, open a PR only after verification.
9. IMPLEMENTATION TASKS small enough for one focused session, ordered by dependencies, each with acceptance criteria and likely files. Never invent likely files; say DISCOVER FIRST if not evidenced.
10. UX/accessibility acceptance criteria where relevant.
11. Security/privacy/compliance and claim-truth gates.
12. TEST, lint, build, and manual verification commands taken from the repository. If unknown, require discovery instead of inventing commands.
13. FAILURE/ROLLBACK behaviour and STOP/ASK conditions.
14. DEFINITION OF DONE and required final report/PR evidence.
15. A final “Do not expand scope” instruction.

The build prompt must not ask the build agent to implement an entire roadmap. It should implement the smallest defensible tranche. If the project needs validation more than code, the build prompt should build the validation instrument or truthful funnel, not speculative infrastructure.

BOOTSTRAP TASK
Perform only the source acquisition, run manifest, source ledger, and directory setup now. Do not audit any project yet. Finish with:
- RUN_ID and absolute run path;
- source availability table for all ten repositories including the vault;
- GitHub SHAs and archive/private status;
- local path/drift summary;
- all limitations;
- the exact phrase BOOTSTRAP COMPLETE.
```

---

## Paste 2 of 5 — Batch 1: immediate commercial leverage

Paste only after bootstrap completes.

```text
Continue the existing Ox Alpha portfolio audit run. Read and obey 00-run-manifest.md, 00-source-ledger.md, and the bootstrap evidence contract. This remains AUDIT-ONLY. Work sequentially and write only inside the existing run directory.

BATCH 1 PROJECTS, IN THIS ORDER
1. JobFilter — manazoid4/JobFilterV1
2. Maz Works — manazoid4/mazos-site
3. Scrap Finance Partners — manazoid4/scrap-finance-partners

Before each project, load only that project’s GitHub snapshot, relevant vault notes, GitHub metadata, and labelled local-only evidence. Close its evidence ledger before opening the next project.

PROJECT 1 — JOBFILTER
Primary question: What is the shortest honest path from the current public-opportunity product to a paid proof that a small UK construction/maintenance firm receives relevant, timely, actionable value worth £39/month?

Audit specifically:
- current `/find-jobs` journey and time to first credible opportunity;
- real source readiness versus credential-gated/experimental sources;
- lead quality, empty-result handling, scoring explanations, free/paid redaction, and whether value can be proved without implying exclusivity or award likelihood;
- signup, account, checkout, Stripe, Supabase, alerts, WhatsApp, and founder-only activation friction;
- public claims versus actual default-branch implementation;
- mobile, keyboard, screen-reader, error, loading, and recovery experience;
- development-route protection, PII, webhooks, cron/auth, source failure, deduplication, and partial success;
- a 7-day paid or high-intent pilot that validates sellable lead quality before adding sources or UI.

The build prompt should target the smallest tranche that most directly improves or measures paid value. It must not paper over zero lead supply with design polish.

PROJECT 2 — MAZ WORKS
Primary question: What is the smallest improvement to the live Maz Works proof-and-contact journey that can generate a qualified client, employer, or collaborator conversation without turning the site into generic agency theatre?

Audit specifically:
- current live claims, project classification, proof links, case studies, contact routes, and £150 founding implementation offer;
- visitor journeys for employer, small-business client, technical collaborator, and sceptical peer;
- evidence hierarchy, identity/trust, contact friction, CTA competition, analytics, SEO, accessibility, mobile performance, and failure states;
- which portfolio projects deserve homepage/case-study attention based on actual evidence;
- whether conversion can be improved through proof sequencing and a lower-friction enquiry rather than more copy/features.

The build prompt should produce one measurable conversion/proof tranche and preserve the calm, accountable single-builder identity.

PROJECT 3 — SCRAP FINANCE PARTNERS
Primary question: What can be sold fastest and safely: fractional finance service, YardLedger software, or a bounded diagnostic/implementation offer—and what legal/compliance gate must be cleared first?

Audit specifically:
- current live offer, pricing, lead form, trust/identity evidence, YardLedger claims, proof, and target buyer;
- the buyer journey for a UK scrap-yard owner using Fred/Xero and struggling with stock, margin/tonne, month-end, or FD visibility;
- conversion, mobile, accessibility, form delivery, analytics, SEO, and follow-up friction;
- current code versus vault claims and any stale branch/deployment assumptions;
- AML supervision, ICO/data protection, professional indemnity, financial-service boundaries, claims, and company identity. Treat these as risks requiring qualified verification, not legal advice;
- a founder-led service or diagnostic offer that can validate demand before building speculative YardLedger depth.

The build prompt must contain a hard compliance/claims gate and must not authorise trading, regulated activity, or financial claims without founder-qualified confirmation.

BATCH 1 CROSS-PROJECT OUTPUT
After the three project folders are complete, create outputs/batch-1/BATCH-1-SUMMARY.md with:
- comparable score table;
- evidence-backed ranking for quickest credible revenue proof;
- popularity/attention signals kept separate from demand evidence;
- shared friction patterns;
- dependencies and founder-only actions;
- one recommended build prompt to run first, one second, and one explicitly deferred;
- 7-day plan capped at 20 founder hours;
- contradictions that could reverse the order.

QUALITY GATE
Check that every material claim has a valid source label, every project has all four required files, and every build-prompt.md is standalone. If not, repair the outputs before reporting.

Finish with the absolute paths to all Batch 1 outputs, the three audited SHAs, the recommended first build prompt, limitations, and the exact phrase BATCH 1 COMPLETE.
```

---

## Paste 3 of 5 — Batch 2: strong next wedges

```text
Continue the existing Ox Alpha portfolio audit run. Read and obey the bootstrap contract and completed source ledger. This remains AUDIT-ONLY. Do not rely on Batch 1 conclusions as facts for these projects.

BATCH 2 PROJECTS, IN THIS ORDER
1. Agent Nudge — manazoid4/agent-nudge
2. FlowLens — manazoid4/flowlens
3. VoxPane — manazoid4/Voxpane

PROJECT 1 — AGENT NUDGE
Primary question: Does Agent Nudge have a narrow, urgent, demonstrable paid wedge beyond being an impressive local-first coordination system?

Audit specifically:
- verified v0.5/core capabilities versus roadmap, demo fixtures, hosted-site claims, and commercial packaging still under validation;
- two-minute install/demo/doctor path, Windows packaging, onboarding, failure recovery, uninstall/rollback, and provider coverage truth;
- collision/drift/context assurance value for solo multi-agent developers versus teams;
- reliability risks including sole-writer boundary, crash/stale-lock recovery, daemon auth, licensing recovery, and connector drift;
- privacy/security claims and proof;
- GitHub attention, release/download evidence, support burden, distribution, willingness-to-pay, and a testable paid assurance wedge;
- whether the next build should improve adoption/reliability or add capability.

The build prompt must choose one adoption/reliability tranche tied to a measurable proof. Do not recommend cloud expansion unless evidence demands it.

PROJECT 2 — FLOWLENS
Primary question: What is the shortest path from the truthful rough-notes quickstart to a paid MSP process-assurance pilot with real evidence, review, and approval?

Audit specifically:
- shipped quickstart versus interactive preview, mocks, stubs, and planned SaaS;
- UK MSP onboarding/offboarding or privileged-access workflow wedge;
- rough notes -> evidence-linked Process -> human review -> approval -> export journey;
- pilot CTA and notification configuration, consent/redaction, accessibility, mobile/desktop fit, analytics, and trust;
- persistence/auth/Supabase plans and known RLS/cross-workspace/security gates;
- design-partner workflow, measurable operational outcome, price commitment, and 90-day falsification gates;
- which real vertical slice can be built safely before marketplace, graph UI, ambient capture, or automation runtime.

The build prompt must respect the security gate: no unsafe persistence migration or enterprise theatre.

PROJECT 3 — VOXPANE
Primary question: Can VoxPane reach a trustworthy Windows beta for people with dyslexia, low literacy, ADHD, visual stress, or reading difficulty, and what is the smallest evidence-producing beta tranche?

Audit specifically:
- actual Win32/UI Automation/capture/OCR/content-ordering/TTS implementation versus README claims;
- the “say play / Ctrl+Alt+Space” first-run journey, install/signing, permissions, unsupported apps, secure fields, cloud consent, failure/recovery, and tray controls;
- accessibility tested with affected users, not merely accessibility feature count;
- fidelity safeguards for dates, numbers, amounts, codes, names, and quotations;
- privacy of captured screen content, diagnostic logs, Azure/Ollama boundaries, exclusions, and threat model;
- differentiation from Narrator/NVDA/JAWS/browser readers without claiming replacement;
- beta recruitment, success measures, pricing hypothesis, support burden, and Windows distribution.

The build prompt should create the smallest safe beta/proof tranche, with real accessibility acceptance criteria and privacy-preserving diagnostics.

BATCH 2 CROSS-PROJECT OUTPUT
Create outputs/batch-2/BATCH-2-SUMMARY.md with comparable scores, fastest proof ranking, shared trust/adoption friction, one build-first choice, one research-first choice, one defer condition, and a 20-hour founder plan. Keep GitHub attention distinct from paid demand.

QUALITY GATE
Verify all claim labels, audited SHAs, source coverage, four files per project, standalone build prompts, and explicit unknowns. Repair before reporting.

Finish with absolute paths, audited SHAs, the recommended first build prompt, limitations, and the exact phrase BATCH 2 COMPLETE.
```

---

## Paste 4 of 5 — Batch 3: proof before investment

```text
Continue the existing Ox Alpha portfolio audit run under the bootstrap evidence and safety contract. This remains AUDIT-ONLY.

BATCH 3 PROJECTS, IN THIS ORDER
1. Maz Pocket — manazoid4/maz-pocket
2. OmniScribe — manazoid4/omniscribe
3. InkWeave — manazoid4/inkweave

PROJECT 1 — MAZ POCKET
Primary question: What evidence would prove MAZ Pocket is a daily-use product or commercially valuable ecosystem surface rather than an accomplished hardware project?

Audit specifically:
- current firmware/release truth, physical verification, remaining acceptance flows, build/test evidence, and v0.9 MAZ Work plan;
- Cardputer ADV hardware constraints, installer, offline recovery, keyboard/audio/storage, launcher handoff, and support risk;
- daily jobs for capture, Talk, BrainDump, approvals, agent state, MCP readiness, and relationship to MAZ Host/Agent Nudge;
- seven-day carry-test evidence, target buyer, hardware ownership dependency, distribution, pricing, and willingness to pay;
- feature sprawl versus the smallest repeatedly useful loop;
- accessibility, privacy, authentication, repair authority, rollback, and truthful status.

The build prompt must either complete one blocked real-device proof or build the smallest measurement/reliability tranche. Do not expand the app suite.

PROJECT 2 — OMNISCRIBE
Primary question: Is there enough implemented product and differentiated demand to justify reviving OmniScribe, and what is the cheapest proof before expensive video/AI infrastructure?

Audit specifically:
- actual default-branch implementation versus repository description “AI video translation + artistic style transfer” and generic scaffolding/docs;
- target buyer and job, competitive substitutes, compute/storage/egress/API cost, turnaround, copyright/consent, voice/likeness, content safety, and output quality;
- upload/privacy/deletion, failure/retry, progress, payment/refund, accessibility, and support implications;
- whether a bounded concierge service or single short-video transformation proves demand more cheaply than a platform;
- hard stop conditions if repository/product evidence is too weak.

The build prompt must be a small validation surface or truthful single-flow prototype. It must not build a broad generation platform or invent existing infrastructure.

PROJECT 3 — INKWEAVE
Primary question: Should the archived InkWeave repository be revived, and can snippets -> useful free chapter -> willingness to pay be proved before full-book generation?

Audit specifically:
- archived status, actual implementation, marketing pages, generation types, and missing auth/storage/payment/worker path;
- blank-page anxiety, authorship/control, manuscript privacy, plagiarism/fidelity concerns, deletion, cost, and failure recovery;
- free-chapter activation, target segment, pricing signal, concierge bias, and cheapest proof;
- long-running generation reliability and payment failure only as future constraints, not reasons to overbuild now;
- evidence required to unarchive and invest versus reasons to keep paused.

The build prompt should implement only a truthful validation/concierge or minimal free-chapter vertical slice after an explicit unarchive/continue gate. Do not build 80,000-word infrastructure first.

BATCH 3 CROSS-PROJECT OUTPUT
Create outputs/batch-3/BATCH-3-SUMMARY.md with continue/validate/pause verdicts, proof cost, founder effort, technical risk, commercial upside, one smallest build worth doing, and explicit kill criteria. Do not reward technical novelty without user evidence.

QUALITY GATE
Verify claim labels, audited SHAs, archive/private state, four files per project, standalone build prompts, and unknowns. Repair before reporting.

Finish with absolute paths, audited SHAs, the one recommended proof build, limitations, and the exact phrase BATCH 3 COMPLETE.
```

---

## Paste 5 of 5 — Final portfolio synthesis and build queue

```text
All three batches should now be complete. Perform a fresh-context synthesis using the written batch/project outputs as inputs. This remains AUDIT/PLANNING ONLY: do not modify source repos, create branches, open PRs, deploy, message anyone, or access secrets.

FIRST VERIFY COMPLETENESS
- Locate the existing RUN_ID and run directory.
- Confirm all nine project folders contain source-ledger.md, audit.md, market-readiness.md, and build-prompt.md.
- Confirm all nine audited GitHub SHAs and source limitations are recorded.
- If anything is missing, mark the synthesis INCOMPLETE and repair only the missing audit artifact before continuing.

NORMALISE WITHOUT ERASING DIFFERENCES
Create outputs/final/PORTFOLIO-EVIDENCE-MATRIX.md. For all nine projects compare:
- observed GitHub attention, with date window and bot/automation caveat;
- real demand evidence;
- target buyer pain;
- shipped product truth;
- time to next credible revenue proof;
- founder effort;
- distribution;
- monetisation clarity;
- engineering/reliability risk;
- security/privacy/legal/compliance gate;
- accessibility stakes;
- top friction removed;
- recommended tranche and build-prompt path;
- evidence quality and confidence.

Use a transparent 0–5 score, but do not let arithmetic hide hard gates. A compliance blocker, archived repo, missing core flow, or unverified customer pain must remain visible.

MAKE A DECISION
Create outputs/final/PORTFOLIO-DECISION.md containing:
1. Ranked order for the next 30 days.
2. PRIMARY commercial focus, SECONDARY proof lane, MAINTENANCE lane, and PAUSED projects.
3. Exactly 80 founder hours allocated across the month.
4. One outcome, metric, success threshold, stop threshold, and reversal condition per active project.
5. The uncomfortable trade-offs and what will not be built.
6. A 7-day first week with no more than five founder actions.
7. Separate rankings for observed popularity, fastest revenue proof, long-term upside, and mission/portfolio value. Never call one ranking “the truth.”

BUILD QUEUE
Create outputs/final/BUILD-QUEUE.md. Include all nine project build prompts in recommended order, but mark each RUN NOW, RUN AFTER EVIDENCE, BLOCKED, or PAUSED. For each include:
- project and audited SHA;
- standalone build-prompt.md absolute path;
- objective and friction removed;
- dependency/gate;
- expected evidence produced;
- estimated agent scope (S/M/L; split L);
- founder action required;
- verification bar;
- stop condition.

BUILD-PROMPT VALIDATION
Read every build-prompt.md as if you are a fresh build agent with no conversation context. Fail and repair any prompt that:
- lacks repo/branch/SHA/source paths;
- contains invented files or commands;
- bundles multiple independent subsystems;
- lacks acceptance criteria/tests/manual checks;
- permits pushing main or overwriting user changes;
- hides security/privacy/compliance gates;
- does not state non-goals and stop conditions;
- cannot produce user/market evidence.

HERMES HANDOFF
Create outputs/final/HERMES-HANDOFF.md containing:
- RUN_ID and source SHAs;
- exact output paths;
- recommended first build prompt to paste into a build agent;
- recommended second prompt and its dependency;
- founder-only actions;
- known unknowns;
- how to repeat the audit later without overwriting this run.

FINAL RESPONSE
Return a concise executive summary, the four rankings, recommended 80-hour allocation, first five actions, absolute paths to PORTFOLIO-DECISION.md, BUILD-QUEUE.md, HERMES-HANDOFF.md, and all nine build-prompt.md files, plus limitations. End with the exact phrase PORTFOLIO AUDIT COMPLETE.
```

## Reading the results

A good run will not produce nine “build now” verdicts. Expect one or two immediate build prompts, several evidence/validation prompts, and explicit pauses. The most useful result is a smaller build queue with strong stop conditions—not a larger roadmap.

Automatic failure conditions include: unsupported claims, fake tool use, cross-project citations, treating traffic as demand, treating local-only work as shipped, hiding archive/compliance state, or producing build prompts that ignore `agents/` branch and verification rules.
