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

#### Telephony

Use a JobFilter-controlled UK number and Twilio-style status callbacks for the proof. Test two onboarding paths:

- conditional no-answer/busy forwarding from the customer's existing number to the JobFilter number;
- a new dedicated JobFilter business number when forwarding is unsupported.

Do not port a customer's existing number in the pilot. Prove caller-ID preservation, `busy`/`no-answer` detection, webhook signatures, retries, duplicate events, voicemail interaction, carrier-specific setup, silent-failure monitoring, and the fail-safe path.

#### Messaging and compliance

Create a dated decision table for every automated message: purpose, service/marketing classification, lawful basis, consent capture, template/category, channel, opt-out, suppression, retention, retry policy, and cost. Appointment and payment-status messages stay purely administrative. Review/referral/repeat-work campaigns require their own marketing basis and opt-out handling.

#### Unit economics

Model number rental, inbound/forwarded voice minutes, SMS segments, failed-message fees, WhatsApp/template fees, payment fees, AI usage, hosting, and support/setup time. Set a minimum 70% software gross-margin target before founder labour and a hard tier allowance.

#### Demand

Interview at least 10 target firms and obtain five signed pilot commitments or deposits before the full Stage 1 build. Test willingness to pay while they retain their current job software.

**Gate 1:** the missed-call event works on real UK handsets; SMS delivery and opt-out work; unit economics meet the margin floor; five firms commit to a paid pilot. If any fail, narrow or kill the feature before building the platform around it.

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
- Physical full-scope schema before its vertical slice exists.
- Scheduling, staff, timesheets, subcontractors, job costing, certificates, or broad marketing generation before the revenue gates.
- Breaking public microsite URLs.
- Absorbing nightly copy PRs into the V2 foundation without individual review.
- Claiming real delivery from mocked or automated-only tests.

## Approval requested

Approve or amend these five decisions before implementation:

1. Stage 1 is Revenue Rescue alongside existing job software, not immediate replacement.
2. Initial ICP is 1–10-person roofing/building/landscaping/property-maintenance firms.
3. SMS launches first; WhatsApp follows approval and compliance proof.
4. Pilot price is £39/month plus bounded messaging, with £149 setup.
5. Implementation stops at every commercial gate for founder review.

On approval, execution begins with Phase 0 only and ends in a pushed `agents/jobfilter-v2-foundation` branch plus GitHub PR. Nothing is pushed directly to `main`.

## Primary current sources

- Tradify UK pricing: https://www.tradifyhq.com/uk/pricing
- ServiceM8 UK pricing: https://www.servicem8.com/uk/pricing
- ServiceM8 Phone: https://www.servicem8.com/uk/phone
- Twilio Call resource/status callbacks: https://www.twilio.com/docs/voice/api/call-resource
- ICO electronic marketing guidance: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/
- ICO service-message distinction: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/identify-direct-marketing/
