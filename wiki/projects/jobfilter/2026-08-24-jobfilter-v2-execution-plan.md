---
date: 2026-08-24
project: jobfilter
type: implementation-plan
status: proposed-awaiting-approval
owner: manazoid4
---

# JobFilter V2 Execution Plan

## Decision

JobFilter V2 should launch as a **revenue-recovery layer for UK trade businesses**, not as an immediate Tradify replacement.

The opening promise is:

> Capture enquiries, recover missed callers, send better quotes, and follow up until the customer decides.

The existing public-works qualification product remains available as an optional **Opportunities** module. It must not blur the Stage 1 message. Public-works contractors and homeowner-service trades are different initial customer profiles; V2 must prove one before trying to serve both through the same primary journey.

Full job-management replacement is a later outcome earned through revenue and retention gates. It is not the first release.

## Evidence used

- The 24 August 2026 adversarial V2 audit package supplied by the founder.
- The 5 May 2026 TradieStack research: lightweight CRM, WhatsApp, websites, automations, reviews, and JobFilter signals at software pricing.
- [[wiki/projects/jobfilter/2026-07-22-ultra-research-execution-plan]] and the retained public-works qualification strategy.
- Current repository graph: Next.js 16, React 19, Supabase, Stripe, 39 detected API routes, auth/account flows, intake, alerts, WhatsApp endpoints, Smart Quote surfaces, and a large legacy/public route surface.
- Current GitHub state: substantial automated PR churn, with no V2-specific issue, PR, branch, or commit found on 24 August 2026.
- Direct competitor evidence checked on 24 August 2026: Tradify Lite is £34/user/month and already includes job management, scheduling, quoting, invoicing, payments, and Xero/Sage/QuickBooks sync; Pro is £37/user/month and adds enquiry handling, reminders, costing, timesheets, subcontractors, and certificates. ServiceM8 starts at £25/month with unlimited paid-plan users and includes 100 SMS, while its free sole-trader plan already includes scheduling, quoting, invoicing, payments, CRM automation, and accounting integrations.

## Non-negotiable constraints

1. No code is built from assumptions about credentials or production state. Every audit claim is tagged VERIFIED, INFERRED, or UNVERIFIABLE with its evidence source.
2. No direct push to `main`. Work starts from fresh `origin/main` on `agents/jobfilter-v2-foundation`, preferably in an isolated worktree so the current dirty July branch is preserved.
3. Existing customers and public URLs are protected. Pull the Stripe subscriber state before changing pricing. Inventory every public route and assign KEEP, REDIRECT, or RETIRE. Preserve `/pro/[firm]` and any published microsite links; all retired URLs receive tested 301 redirects.
4. SMS is the launch automation channel. WhatsApp is enabled only after template approval, consent, opt-out, suppression, cost, and delivery-failure handling are proven.
5. Telecom cost is metered. Every tier has message limits, overage/pass-through rules, and a gross-margin floor.
6. AI is assistive, not structural. Qualification, state transitions, idempotency, permissions, pricing, and compliance are deterministic.
7. The physical database grows by vertical slice. The complete domain model is designed first, but speculative Stage 3 tables are not migrated early.
8. Automated tests cannot mark real phone, SMS, WhatsApp, Stripe, or email delivery complete. Those require a dated manual acceptance record.
9. Pre-client fixed cost is £0. Do not buy infrastructure, numbers, messaging credit, AI credit, or SaaS subscriptions before a signed pilot and cleared setup payment. Free/test tiers may support discovery and demos only; their unproven production behaviours stay labelled UNVERIFIED.

## Product boundary

### Stage 1 customer

- UK roofing, building, landscaping, and property-maintenance firms
- roughly 1–10 staff
- already receive phone/web/WhatsApp enquiries
- may keep Tradify, ServiceM8, Fergus, spreadsheets, or paper for job delivery
- will pay to recover and convert revenue without re-platforming the whole business

Plumbing, heating, and electrical firms may pilot enquiry recovery, but are not promised a full replacement until regulated certificates and accounting/CIS exit blockers are solved.

### Stage 1 product

- unified enquiry inbox
- customer and site record
- missed-call capture
- web-form and manual enquiry capture
- lightweight qualification
- quote creation, options, acceptance, and deposit link
- quote follow-up and won/lost reason capture
- communications timeline, consent, opt-out, and suppression
- optional Opportunities module for public tenders

### Explicitly not Stage 1

- diary and dispatch
- job cards
- staff and timesheets
- subcontractor operations
- full invoicing ledger
- job costing
- regulated certificates
- accounting sync
- CIS
- broad local-marketing generation
- AI phone agent
- full Tradify data migration

## Execution sequence

### Phase 0 — Contain and verify

1. Pause JobFilter nightly/code-polish automation and inventory all open PRs. Do not merge overlapping copy branches into the V2 base.
2. Preserve the current local branch and its untracked benchmark artifacts. Fetch `origin/main`, create an isolated V2 worktree, and branch `agents/jobfilter-v2-foundation`.
3. Produce an access statement for GitHub, Vercel, Supabase, Stripe, Resend, Meta WhatsApp, analytics, and production. Anything unavailable remains explicitly unverified.
4. Audit current `main`: build, dependency audit, CI, auth, RLS, tenant isolation, Stripe lifecycle, messaging webhooks, secrets, rate limits, data retention, and current customer/subscriber state.
5. Create the route migration matrix and customer/data migration register before changing navigation or schema.
6. Record baseline funnel, usage, subscriber, and revenue numbers. If data is absent, install measurement before making commercial claims.

**Gate 0:** reviewed baseline; two-user tenant-isolation proof; current subscriber treatment decided; no destructive route/schema work has started.

### Phase 1 — Fail-fast feasibility spikes

#### Funding order

Run interviews, workflow prototypes, local/test-mode demos, incumbent-gap analysis and the unit-economics model at £0. Use Stripe-hosted test mode for demonstrations and a Stripe Payment Link or manual invoice for the first setup payment so accepting the customer does not require a new paid application deployment.

The first signed pilot pays the £149 setup fee before live telecom provisioning. That cash triggers the minimum production upgrades and a real-carrier acceptance test. If the live test fails, refund the setup fee or offer an explicitly agreed manual concierge pilot. Do not represent test credentials, simulated webhooks or free-tier demos as live delivery.

#### Telephony

After the first setup payment, use a JobFilter-controlled UK number and Twilio-style status callbacks for the live proof. Before payment, validate the workflow with provider test credentials and recorded/simulated events only. Test two onboarding paths:

- conditional no-answer/busy forwarding from the customer's existing number to the JobFilter number;
- a new dedicated JobFilter business number when forwarding is unsupported.

Do not port a customer's existing number in the pilot. Prove caller-ID preservation, `busy`/`no-answer` detection, webhook signatures, retries, duplicate events, voicemail interaction, carrier-specific setup, silent-failure monitoring, and the fail-safe path.

#### Messaging and compliance

Create a dated decision table for every automated message: purpose, service/marketing classification, lawful basis, consent capture, template/category, channel, opt-out, suppression, retention, retry policy, and cost. Appointment and payment-status messages stay purely administrative. Review/referral/repeat-work campaigns require their own marketing basis and opt-out handling.

#### Unit economics

Model number rental, inbound/forwarded voice minutes, SMS segments, failed-message fees, WhatsApp/template fees, payment fees, AI usage, hosting, and support/setup time. Set a minimum 70% software gross-margin target before founder labour and a hard tier allowance.

#### Demand

Interview at least 10 target firms, including the office manager or daily software operator wherever one exists. Do not ask only what hurts. Record what their current job-management, CRM and phone products already solve, what still lives in spreadsheets/manual follow-up, and what they pay today.

Pre-sell the complete **enquiry → qualification → quote → follow-up → attributable recovered-revenue** workflow, not generic missed-call text-back. Obtain five signed pilot commitments or deposits before the full Stage 1 build, while each customer retains their current job software.

**Gate 1A — £0 validation:** at least 10 discovery interviews are complete; the differentiated workflow is demonstrable in test mode; the cost model is reviewed; and at least one firm signs and pays the setup fee. No paid infrastructure is purchased before this point.

**Gate 1B — funded live proof:** the first setup payment has funded the minimum production services; the missed-call event works on real UK handsets; SMS delivery and opt-out work; unit economics meet the margin floor; and five firms commit to pay specifically for the end-to-end recovery workflow. Each must name a material gap its incumbent does not already solve. If any condition fails, narrow or kill the wedge before building the platform around it.

Generic missed-call text-back is not sufficient differentiation. A directly comparable 2026 open-source plumber demo was commercially abandoned after discovery found the feature already bundled by Podium, GoHighLevel and leading field-service platforms. JobFilter's testable advantage must be trade-specific qualification, quote action and credible revenue attribution.

### Phase 2 — Stage 1 vertical slices

Each slice includes schema, RLS, service/API, UI, audit events, tests, observability, and manual acceptance.

1. **Tenant foundation:** organisations, memberships, roles, customers, sites, communication preferences, audit log, and two-user isolation suite.
2. **Enquiry inbox:** manual and web-form capture, assignment, pipeline status, notes, source, value, and duplicate handling.
3. **Missed-call rescue:** signed call webhook, enquiry creation, caller acknowledgement by SMS, owner alert, reply capture, retries, delivery receipts, and failure dashboard.
4. **Qualification:** deterministic questions, budget/timing/location fit, evidence, and qualified/unqualified outcomes. AI may draft a summary but cannot decide permissions or state.
5. **Quotes:** branded quote, versioning, options, acceptance/decline, deposit link, expiry, and immutable accepted snapshot.
6. **Quote rescue:** timed service-safe reminders, reply handling, pause/stop, won/lost reasons, attribution, and telecom budget enforcement.
7. **Customer portal:** customer can view and accept the quote, pay a deposit, see communication preferences, and request help without an app account.
8. **Public surface:** rebuild only the primary sales journey after the product flow works. Public navigation becomes Product, Opportunities, Pricing, Trust, Login. App navigation becomes Inbox, Customers, Quotes, Opportunities, Account. Apply the tested redirect map.

**Gate 2:** five paying firms complete 30 days; at least 80% activate the phone/enquiry path; at least three obtain a verifiable recovered or progressed opportunity; no tenant leak, double-send, or silent telecom failure; at least four intend to continue paying.

### Source adaptation protocol

The GitHub pattern audit is a design input, not permission to fork a product wholesale.

1. Before adapting source, record repository, exact commit, file path, licence and destination module in a source manifest.
2. Prefer small official or permissive patterns and their tests: Twilio webhook/status handling, deterministic message safety, financial state invariants and Stripe webhook reconciliation.
3. Port concepts into the existing Next.js/Supabase architecture; do not introduce a second platform stack merely to inherit one feature.
4. Retain notices for MIT/Apache/BSD material and review transitive dependencies.
5. Keep AGPL, GPL, ELv2 and ambiguous code out of implementation context. Use those repositories only to derive independently written requirements and journeys.
6. Require provenance review in every implementation PR.

### Phase 3 — Own the money edge

1. Add accepted-quote to job handoff without requiring scheduling migration.
2. Add deposits, payment links, payment-status service messages, and a revenue ledger reconciled to Stripe.
3. Add invoicing only with an explicit accounting/export strategy; do not create double-entry by pretending JobFilter is the accounting source of truth.
4. Add repeat-service reminders, review requests, and referrals only after the compliance decision table and suppression system pass review.
5. Add data export and account deletion.

**Gate 3:** at least 15 paying accounts, 70% month-two logo retention, measurable recovered/progressed revenue, support load within the founder cap, payment reconciliation clean, and churn reasons understood.

### Phase 4 — Take the operational middle

Build only after Gate 3:

- scheduling and dispatch
- job cards, photos, files, and checklists
- staff permissions and timesheets
- subcontractor scheduling and CIS-aware handoff
- job costing
- accounting integrations
- data migration from Tradify/ServiceM8/CSV
- certificates through verified integrations or approved domain-specific implementation

Start full-replacement pilots with roofers, builders, landscapers, and property-maintenance firms. Do not claim replacement readiness for regulated trades until their certificate and accounting requirements pass acceptance.

**Gate 4:** three firms successfully migrate and run without double entry for 60 days; data import reconciles; accounting/certification blockers for the chosen trade are closed; support and gross margin remain viable.

## Pricing hypothesis

- **Free:** one product walkthrough/fit check, retained free tender scan, and existing public microsite where already promised.
- **Revenue Rescue Pilot:** £39/month per business, with a stated SMS allowance and paid overage/pass-through. No unlimited messaging claim.
- **Done-for-you setup:** £149 one-time, capped at three new setups per week and five concurrent activations.
- **Stage 3/4 pricing:** not pre-committed. Set from observed usage, support cost, and the customer's avoided per-seat incumbent spend.

Do not open at £19–29. ServiceM8 already offers a far broader £25/month package with unlimited paid-plan users and included SMS. JobFilter must prove recovered revenue, not win a commodity feature checklist on price.

The operating-cost sequence is strict: **£0 before the first client → setup fee collected → production hosting/database and one live number provisioned → client acceptance test → monthly pilot begins**. Upgrade services only as measured usage or reliability triggers require; do not pre-buy capacity.

The independent cost audits estimate a responsible five-client production baseline at roughly **$69–73/month plus Stripe fees**, with costs driven mainly by one number and bounded SMS usage per tenant. A single-client acceptance pilot can temporarily defer Supabase Pro and cost roughly **$25/month**, but that explicitly accepts the Free plan's backup/reliability risk and must not become the steady-state design.

## Testing and release gates

Automated coverage must include:

1. organisation creation and member permissions;
2. cross-tenant access denial;
3. manual/web enquiry creation;
4. signed missed-call event and idempotent replay;
5. SMS acknowledgement, opt-out, suppression, retry, and budget cap;
6. qualification and state-transition rules;
7. quote create/version/send/accept/decline;
8. deposit checkout, webhook retry, and reconciliation;
9. route redirects and preserved microsite URLs;
10. account export/deletion and retention behaviour.

Manual acceptance must record real handset/carrier forwarding, a real SMS round trip, a real Stripe test payment/refund/cancellation, a real email, and—only when enabled—a real approved WhatsApp template delivery.

Every implementation checkpoint requires focused tests, `npm run lint`, `npm run build`, browser verification at 320/375/430px and desktop, accessibility checks, dependency audit, preview deployment, and a reviewed PR.

## Kill list

- Building all 36 original sections in one gate.
- Calling Stage 1 a Tradify replacement.
- Making WhatsApp a launch dependency.
- Unlimited telecom usage inside a low flat price.
- Porting customer phone numbers during the first pilot.
- AI voice agent before deterministic missed-call rescue works.
- Selling generic missed-call text-back as the complete differentiator.
- Forking an entire CRM, ERP, invoicing, scheduling or telephony platform.
- Copying AGPL, GPL, ELv2, enterprise-only or ambiguously licensed source into JobFilter.
- Physical full-scope schema before its vertical slice exists.
- Scheduling, staff, timesheets, subcontractors, job costing, certificates, or broad marketing generation before the revenue gates.
- Breaking public microsite URLs.
- Absorbing nightly copy PRs into the V2 foundation without individual review.
- Claiming real delivery from mocked or automated-only tests.

## Execution status — 24 August 2026

- Founder approved execution and the £0-before-clients funding sequence.
- Phase 0 foundation shipped through [JobFilter PR #507](https://github.com/manazoid4/JobFilterV1/pull/507), squash-merged to `main` as `5b51d98427252823b04872d394b4e28bd0b8ac8b`.
- Main CI passed, Vercel production reached Ready, and `https://jobfilter.uk/demo/revenue-rescue` returned 200 with `noindex` and the simulation disclosure.
- The first £0-safe implementation is a synthetic Revenue Rescue walkthrough. It sends no messages, takes no payment and writes no production data.
- Inbound WhatsApp is now disabled by default and fails closed on missing configuration or invalid signatures. Durable inbox/outbox idempotency remains mandatory before enablement.
- No production schema, pricing, subscriber or telecom configuration changed.
- Gate 0 remains partially open: Stripe aggregate state, applied Supabase schema/RLS proof, existing-customer treatment, external nightly automation ownership and hosting/backup plans remain unverified.

## Approved decisions

The founder approved these seven decisions before implementation:

1. Stage 1 is Revenue Rescue alongside existing job software, not immediate replacement.
2. Initial ICP is 1–10-person roofing/building/landscaping/property-maintenance firms.
3. SMS launches first; WhatsApp follows approval and compliance proof.
4. Pilot price is £39/month plus bounded messaging, with £149 setup.
5. Implementation stops at every commercial gate for founder review.
6. Open-source work is adapted only through the recorded licence/provenance protocol; copyleft and source-available products remain clean-room references.
7. Pre-client operation remains at £0; the first cleared setup payment funds the minimum production upgrades and live telecom acceptance test.

Execution began with Phase 0 on `agents/jobfilter-v2-foundation` and merged through PR #507. Nothing was pushed directly to `main`. Further production/data work remains gated as described above.

## Primary current sources

- Tradify UK pricing: https://www.tradifyhq.com/uk/pricing
- ServiceM8 UK pricing: https://www.servicem8.com/uk/pricing
- ServiceM8 Phone: https://www.servicem8.com/uk/phone
- JobFilter V2 GitHub pattern research: [[2026-08-24-v2-github-pattern-research]]
- Plumber missed-call demo and commercial post-mortem: https://github.com/kgorle1111/plumber-missed-call-demo
- Free-tier architecture audit: [[2026-08-24-v2-free-tier-architecture-audit]]
- External-services cost audit: [[2026-08-24-v2-external-services-cost-audit]]
- Twilio Call resource/status callbacks: https://www.twilio.com/docs/voice/api/call-resource
- ICO electronic marketing guidance: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/
- ICO service-message distinction: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/identify-direct-marketing/
