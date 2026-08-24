---
date: 2026-08-24
project: jobfilter
type: infrastructure-audit
status: completed
agent: codex-subagent
---

# JobFilter V2 — free-tier architecture audit

## Verdict

JobFilter can be **developed and demonstrated** for $0 in platform fees. It cannot responsibly or contractually run as a paid production product entirely on free tiers.

The decisive blocker is Vercel, not technical capacity: Vercel Hobby is restricted to personal, non-commercial use. A paid JobFilter deployment requires Vercel Pro, currently $20/month for one deploying seat with $20 of usage credit. Vercel's 14-day Pro trial is trial credit, not a durable free tier. ([Hobby plan](https://vercel.com/docs/plans/hobby), [fair-use rules](https://vercel.com/docs/limits/fair-use-guidelines), [Pro plan](https://vercel.com/docs/plans/pro-plan))

The second boundary is reliability. Supabase Free has enough raw quota for early JobFilter usage, but it can pause after low activity, has no downloadable automatic backups, only one day of platform logs, no support SLA, and becomes read-only over 500 MB. Those terms are suitable for development and a short feasibility test, not for the system that receives customers' missed calls, quotes and payment state. Supabase Pro is currently $25/month and includes seven days of daily backups and avoids inactivity pausing. ([Supabase pricing](https://supabase.com/pricing), [production checklist](https://supabase.com/docs/guides/deployment/going-into-prod), [database size](https://supabase.com/docs/guides/platform/database-size))

Telephony, production SMS, WhatsApp, card processing and AI inference are inherently usage-based. They can be cheap and tightly capped; they are not free. Trial balances must never be included in the unit economics.

Therefore the recommended floor is:

- **Development/demo:** $0 platform cost; no paying users and no claim of production reliability.
- **Pre-client feasibility:** $0 using test credentials, simulated webhooks, synthetic data and local/test-mode demos; this does not prove live delivery.
- **First-client-funded feasibility:** after the £149 setup payment clears, provision one paid phone number and measured telecom usage for the real-handset acceptance test.
- **First paid pilot:** Vercel Pro $20 + Supabase Pro $25 + telecom + Stripe transaction fees; Resend, PostHog and Sentry can remain on genuine free tiers.
- **Later stages:** the same core can stay inexpensive. Costs scale mainly with one telephone number per firm, message segments, files, email volume and support—not application compute.

Checked against primary vendor documentation on **24 August 2026**. Prices exclude VAT/tax and currency conversion.

## Access and evidence boundary

Verified:

- the current JobFilter knowledge-graph architecture: Next.js/TypeScript, Vercel-style route handlers, Supabase auth/data use, Stripe and messaging surfaces, 39 detected API routes;
- the approved proposed V2 execution plan and the 20-repository GitHub pattern audit;
- current public pricing, quotas, runtime limits and legal terms from vendor documentation linked throughout this report.

Not verified:

- the actual JobFilter Vercel, Supabase, Twilio, Resend, Stripe, Meta, PostHog or Sentry account plan and usage;
- credits already on those accounts;
- production data volume, message volume, existing phone numbers, region selections or billing alerts;
- UK number inventory and carrier-specific forwarding behaviour in the Twilio console;
- negotiated pricing or startup credits.

No repository or deployment was modified.

## Cost classifications

- **Genuinely free:** recurring published allowance with no temporary credit. It may still have reliability or quota restrictions.
- **Trial credit:** temporary, one-time or discretionary. Excluded from steady-state estimates.
- **Usage-based:** no platform subscription may be required, but every unit or successful transaction costs money.
- **Impossible to be free:** the feature necessarily consumes a paid regulated network, payment rail, licensed vendor service, or a commercial hosting plan.

## Recommended low-cost architecture

Keep one application and one source of truth. Do not add Redis, a general workflow product, a separate CRM, a PDF microservice or a self-hosted telephony platform for Stage 1.

```text
Browser / public portal
        |
        v
Next.js on Vercel Pro  <----- signed Twilio / Stripe / Resend callbacks
        |                              |
        | short request                | verify, dedupe, persist, return 2xx
        v                              v
Supabase Postgres: domain rows + event/outbox + provider attempts + audit trail
        |
        | pg_cron claims due work with idempotency keys
        v
Worker route / Edge Function -----> Twilio, Resend, Stripe, optional Claude
        ^                                      |
        +------------- delivery callbacks -----+
```

### Application and API

Keep Next.js on Vercel. Static and cached public pages are cheap; route handlers should authenticate, validate, make one durable write, and return quickly. Vercel Hobby has substantial technical allowances—one million function invocations and up to four CPU-hours—but those allowances do not override its non-commercial restriction. Vercel Pro's $20 fee is the minimum compliant JobFilter hosting cost. ([Hobby quotas](https://vercel.com/docs/plans/hobby), [Pro pricing](https://vercel.com/docs/plans/pro-plan))

Do not use Vercel Cron for core reminders on Hobby. Hobby cron is limited to once per day with up to 59 minutes of timing variance. Pro allows once per minute, but the cheaper and more cohesive scheduler is Supabase Cron because the due state already lives in Postgres. ([Vercel Cron limits](https://vercel.com/docs/cron-jobs/usage-and-pricing))

### Database, tenancy and durable jobs

Supabase remains the source of truth. Use RLS for tenant isolation and store these infrastructure records alongside the business data:

- immutable domain/audit events;
- `scheduled_actions` with due time, tenant, type, state and cancellation reason;
- `outbox_messages` with an idempotency key and payload reference, not unrestricted PII copies;
- `delivery_attempts` with provider ID, segment count, cost estimate, status and callback time;
- `inbound_events` with provider event ID and a uniqueness constraint;
- per-tenant budgets and suppression entries.

Supabase Cron uses `pg_cron`, can schedule from every second to yearly, recommends no more than eight simultaneous jobs and jobs under ten minutes. A single every-minute dispatcher should claim a bounded batch using row locks, not create one cron job per reminder. ([Supabase Cron](https://supabase.com/docs/guides/cron))

Database webhooks use asynchronous `pg_net`, but their response history is short and they are not a substitute for JobFilter's own outbox and failure table. The worker must be idempotent because all real delivery mechanisms can retry. ([Database webhooks](https://supabase.com/docs/guides/database/webhooks), [webhook diagnostics](https://supabase.com/docs/guides/troubleshooting/webhook-debugging-guide-M8sk47))

QStash is an optional escape hatch, not a starting dependency. Its genuine free tier currently allows 1,000 messages/day, ten active schedules, three retries, a seven-day maximum delay and three-day dead-letter retention. Pay-as-you-go is $1 per 100,000 messages. Add it only if the Postgres dispatcher proves operationally weak; keep scheduled business intent in Postgres either way. ([QStash pricing](https://upstash.com/pricing/qstash), [delivery and retry controls](https://upstash.com/docs/qstash/api-reference/messages/publish-a-message))

### Storage and PDFs

Store document metadata and immutable quote/invoice snapshots in Postgres. Render printable HTML or a lightweight server-side PDF; do not launch Chromium just to make a quote PDF. Put only generated PDFs and user files in object storage, with signed URLs and tenant-scoped paths.

Supabase Free includes 1 GB object storage but all Supabase products share the 5 GB uncached and 5 GB cached egress allowances. Pro includes 100 GB storage and 250 GB of each egress class. ([storage pricing](https://supabase.com/docs/guides/storage/pricing), [egress](https://supabase.com/docs/guides/platform/manage-your-usage/egress))

Do not introduce Cloudflare R2 until files justify it. If they do, R2 Standard has a genuine monthly free tier of 10 GB storage, one million Class A operations, ten million Class B operations and free Internet egress. It also supports an EU jurisdictional restriction. This is attractive for Stage 4 job photos, but adds a processor, credentials, lifecycle rules and backup obligations. ([R2 pricing](https://developers.cloudflare.com/r2/pricing/), [R2 data location](https://developers.cloudflare.com/r2/reference/data-location/))

### Email

Use Resend custom SMTP/API from the start; Supabase's default SMTP is demonstration-only, accepts only pre-authorised team addresses and is currently limited to two messages per hour. ([Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp))

Resend Free is a genuine production-capable allowance: 3,000 sent-and-received transactional emails/month, 100/day, one sending domain, one webhook endpoint and 30-day provider retention. Configure SPF, DKIM and DMARC and separate authentication from marketing identities. Upgrade to Resend Pro at $20/month before the daily or monthly cap can block password resets or customer documents. ([Resend pricing](https://resend.com/pricing), [quotas](https://resend.com/docs/knowledge-base/account-quotas-and-limits), [domain setup](https://resend.com/docs/dashboard/domains/introduction))

### Analytics and observability

PostHog Cloud EU can remain free well beyond the pilot: one project, one-year retention, one million analytics events, 5,000 replays, one million flag requests and 100,000 exceptions each month. Set explicit billing limits if a card is ever added. Capture product events without message bodies, phone numbers, addresses or quote descriptions. ([PostHog pricing and EU region](https://posthog.com/pricing))

Sentry Developer is also genuinely free for one operator, with 5,000 errors, 5 GB logs, five million spans, 50 replays, one uptime monitor, one cron monitor and 30-day lookback. Prefer Sentry for operational errors and PostHog for product funnels; if maintaining both creates noise, keep Sentry and use small first-party funnel tables instead of duplicating all telemetry. ([Sentry pricing](https://sentry.io/pricing/))

Provider callbacks and JobFilter's own delivery-attempt table are the monitoring source for missed-call/SMS reliability. A green Vercel function log is not evidence that an SMS reached a handset.

### AI

AI is not required for any structural workflow. Qualification gates, state transitions, reminders, pricing, suppression, opt-out and tenant access must stay deterministic. Make AI a metered optional draft/summary action, cache stable prompts, cap calls per tenant and fall back to a deterministic template.

Claude API inference is usage-based, not free. At the audit date Claude Haiku 4.5 is $1/million input tokens and $5/million output tokens; Sonnet 5 is $2/$10. A small call using 2,000 input and 300 output tokens costs roughly $0.0035 on Haiku before caching, so carefully bounded assistive AI can be inexpensive without pretending it is free. ([Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing))

### CI, browser testing and browser automation

GitHub Actions on GitHub Free includes 2,000 minutes and 500 MB artifact storage per month for private repositories; standard runners are free for public repositories. Set budgets to stop usage instead of allowing surprise overage. Run unit, integration and a focused Playwright browser suite on Linux, retain artifacts briefly, and keep mobile viewport checks in the same run. ([included GitHub usage](https://docs.github.com/en/billing/reference/product-usage-included), [Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions))

Do not run a general-purpose browser crawler inside the production Vercel request path. Vercel Functions have bundle, memory and duration limits, and browser binaries consume a large fraction of them. Browser work also creates long, failure-prone requests and site-terms risk. Use official procurement APIs/feeds for tender ingestion. If a source genuinely requires a browser, run a bounded scheduled GitHub Action or a separately costed worker, persist raw-source provenance, and never make it part of the missed-call/quote availability path. Vercel's function bundle limit is 250 MB compressed; Hobby is limited to 2 GB memory, while current Fluid Compute duration can reach 300 seconds. ([Vercel function limits](https://vercel.com/docs/functions/limitations))

## Feature-by-feature cost and feasibility matrix

| Feature | Lowest-cost service/pattern | Classification | Free/pilot ceiling | Failure or upgrade trigger |
|---|---|---|---|---|
| Public site and microsites | Next.js static/cached pages | Demo free; paid product impossible on Hobby | Hobby is non-commercial | Upgrade to Vercel Pro before paid use or any deployment intended for financial gain |
| Auth | Supabase Auth + Resend SMTP | Genuinely free within quotas | 50,000 MAU; Resend 100 emails/day | Any auth mail approaches 70/day, or deliverability/support requires paid email |
| Organisations, RLS, audit | Supabase Postgres | Technically free; production-risky | 500 MB DB; no downloadable auto backups; possible pause | Upgrade to Pro before first paid pilot; immediately on read-only risk or recovery requirement |
| Enquiry/customer/site CRM | Postgres + Next route handlers | Genuinely free compute inside paid host allowance | Limited mainly by DB size/egress | Query latency, 70% DB quota, or egress warning |
| Web/manual enquiry capture | Signed/rate-limited routes + database | Genuinely free | Vercel and Supabase request quotas are ample | Abuse, bot submissions or function-credit trend |
| Missed-call detection | One voice-capable UK DID per firm + conditional forwarding | Impossible to be free in production | Twilio trial is proof-only | Number unavailable, forwarding fails, or per-firm telecom exceeds allowance |
| Voice receipt/forwarding | Twilio inbound voice | Usage-based | UK mobile/local inbound currently $0.0100/min | Silent callback, carrier failure, unexpected minutes or support burden |
| Two-way SMS | Twilio Programmable Messaging | Usage-based | UK outbound $0.056/segment; inbound $0.0075/segment; failed processing $0.001 | Enforce segment cap; pass through/overage before allowance is reached |
| WhatsApp | Twilio/Meta templates after approval | Usage-based, not launch-free | Twilio $0.005 each inbound/outbound plus Meta template fee where applicable | Enable only after approvals, template inventory, consent and cost caps |
| Qualification | Deterministic rules in app/DB | Genuinely free | Application quotas | None; AI summary remains optional |
| AI summary/draft | Claude Haiku with hard budget | Usage-based | No durable free API allowance assumed | Disable/fallback when tenant or global daily budget is reached |
| Quote versions/options | Postgres minor-unit money and immutable snapshots | Genuinely free | DB quota | Upgrade database before storage/latency limit |
| Quote PDF | HTML/React PDF + object storage | Genuinely free at pilot volume | 1 GB Supabase Free storage | 70% storage, high egress or many job photos; then Pro/R2 |
| Customer portal/acceptance | Signed short-lived token + Next page | Genuinely free | App quotas | Abuse/rate-limit events or need for stronger customer identity |
| Timed quote rescue | Postgres scheduled action + one pg_cron dispatcher | Genuinely free infrastructure; channel is paid | Eight concurrent jobs recommended; each under ten minutes | Backlog age, duplicate sends, or dispatcher runtime > one interval; then QStash/queue |
| Deposits/payment links | Stripe Checkout/Payment Links + webhooks | Usage-based | No setup/monthly fee; standard UK cards 1.5% + 20p | Always price processing into transaction economics |
| Invoice/revenue ledger | Postgres state + Stripe reconciliation | Genuinely free infrastructure | DB quota; Stripe transaction fee remains | Reconciliation mismatch, accounting-source conflict, or customer count gate |
| Transactional email | Resend | Genuinely free to quota | 100/day, 3,000/month | Upgrade at 70% daily capacity, not after blocked mail |
| Reviews/referrals/repeat work | Scheduled actions | Infrastructure free; delivery/compliance not free | Email allowance; SMS/WhatsApp usage charges | Consent/suppression failure or telecom cap |
| Tender ingestion/scoring | Existing deterministic fetchers + official APIs + daily/periodic jobs | Often free, source-dependent | Source rate limits and CI/runtime | Any browser-only source, anti-bot change or data licence restriction requires explicit costing |
| Scheduling/dispatch/job cards | Postgres + calendar UI | Genuinely free infrastructure | App/DB quotas | Scale and support complexity, not compute, drive upgrade |
| Staff/timesheets/subcontractors | Postgres/RLS | Genuinely free infrastructure | DB quota | Permission complexity, audit retention and payroll/CIS integration requirements |
| Photos/files/checklists | Supabase Storage, later R2 EU | Genuinely free to quota | 1 GB Supabase Free; 10 GB R2 Standard free | 70% capacity, upload abuse, backup/retention burden |
| Xero/Sage/QuickBooks | Direct official APIs where approved | Unverifiable as free end-to-end | Developer access is not production partner approval | Treat approval, support and vendor terms as separate blockers before promise |
| Certificates/CIS | Deterministic domain code or verified partner | Infrastructure may be free; assurance is not | No free-tier claim substantiated | Legal/domain validation and insurer/customer acceptance required |
| Migration/import/export | Local/CI batch plus signed storage | Genuinely free at pilot scale | GitHub minutes/storage and DB quotas | Large imports, PII artifacts or long runtime move to controlled one-off worker |
| Product analytics | PostHog EU | Genuinely free to high quota | 1M events, 5k replays, 1 project | Sample/disable replay before exceeding; never capture sensitive fields |
| Error/cron/uptime monitoring | Sentry Developer | Genuinely free to quota | 5k errors, 1 uptime and 1 cron monitor | Upgrade or consolidate alerts if limits hide production failure |
| Backups/disaster recovery | Supabase Pro daily backup; independent export | Impossible to meet a sound production recovery bar solely with Supabase Free | Free requires manual/off-site dumps and has no managed downloadable backup | Pro before paid users; restore drill before Stage 1 gate |

## Telecom and payment facts that dominate unit economics

At the audit date Twilio publishes these UK prices:

- voice-capable mobile number: $2.50/month; local voice number: $3.50/month;
- inbound voice: $0.0100/minute;
- outbound SMS to UK mobile numbers: $0.056 **per segment**;
- inbound SMS: $0.0075 per segment;
- failed-message processing fee: $0.001;
- WhatsApp through Twilio: $0.005 for every inbound or outbound message, plus applicable Meta template charges.

Sources: [UK voice](https://www.twilio.com/en-us/voice/pricing/gb), [UK SMS](https://www.twilio.com/en-us/sms/pricing/gb), [WhatsApp](https://www.twilio.com/en-us/whatsapp/pricing).

One number per firm is not an optional luxury for the proposed forwarding mechanism. If several firms forward into one destination number, the webhook sees the caller and common destination but cannot reliably identify which firm's original line was called. A unique DID is the clean routing key. Published inventory and combined voice/SMS capability still require a console test.

Keep outbound SMS in GSM-7 and below one segment wherever possible. Unicode punctuation, emoji or long copy can change encoding and multiply segment cost. Record the provider-reported segment count and charge it to the tenant's allowance.

Stripe has no setup or monthly fee for standard payments but charges 1.5% + 20p for a standard UK card; Payment Links are included in integrated pricing. This is a cost of recovered revenue, not hosting. ([Stripe UK pricing](https://stripe.com/gb/pricing), [Payment Links](https://stripe.com/gb/payments/payment-links))

## Stage cost envelopes

These are planning examples, not forecasts. They use published list prices and deliberately exclude temporary credits, VAT, currency conversion, customer support time, domains and any existing vendor contracts.

### Development and internal demo

| Component | Recurring cost |
|---|---:|
| Vercel Hobby, non-commercial only | $0 |
| Supabase Free | $0 |
| Resend Free | $0 |
| PostHog/Sentry free | $0 |
| Stripe test mode | $0 |
| Twilio test credentials/mocks | $0, but cannot prove real delivery |
| **Total** | **$0** |

This environment may show every screen and run deterministic test journeys. It may not be represented as a working commercial missed-call product.

### First-client-funded Phase 1 feasibility spike

Before a client, use provider test credentials and simulated events at $0. After the first £149 setup payment clears, use one real UK number, real handsets and tightly bounded SMS/voice. Supabase Free and the Vercel Pro 14-day trial can reduce the short experiment's platform bill, but neither trial credit nor Twilio trial behaviour counts as production evidence. Fund the production upgrade and a $25 hard telecom acceptance-test budget from setup revenue. A Stripe test charge remains free because it is test mode.

### Stage 1 — five paid pilot firms

Responsible baseline:

| Component | Example monthly cost |
|---|---:|
| Vercel Pro | $20.00 |
| Supabase Pro | $25.00 |
| 5 Twilio UK mobile numbers | $12.50 |
| 30 outbound SMS per firm (150 segments) | $8.40 |
| 20 inbound SMS per firm (100 segments) | $0.75 |
| 100 total inbound voice minutes | $1.00 |
| Resend, PostHog, Sentry | $0 within quotas |
| Optional bounded Claude | approximately $1–5 |
| **Example before Stripe fees** | **approximately $68.65–$72.65/month** |

At 100 outbound SMS segments per firm, outbound SMS alone rises to $28/month and the example total rises by $19.60. This is why the £39 pilot must include a published segment allowance and paid overage/pass-through. “Unlimited messaging” is economically indefensible.

Running paid pilots on Supabase Free would save $25/month but trades away managed accessible backups, non-pausing and support. That is possible as an explicitly accepted experiment; it is not the recommended production baseline.

### Stage 3 — 15 retained accounts

The application/database/email/analytics base can plausibly remain $45/month. With one $2.50 number per account, 30 outbound and 20 inbound SMS segments per account, and roughly 20 inbound voice minutes per account, telecom is about $69/month. Add approximately $5–15 for bounded AI and transaction-dependent Stripe fees: **roughly $119–129/month plus payment fees**.

At 100 outbound segments per account, telecom grows by a further $58.80. Message volume, not Vercel compute, is the upgrade and pricing driver.

### Stage 4 — 50 operational accounts

Vercel Pro and Supabase Pro may still be sufficient if queries are indexed, payloads small and files are offloaded appropriately. Fifty $2.50 numbers plus 30 outbound and 20 inbound SMS segments per account is already about $218.50/month before voice. Add the $45 platform base, $10–50 AI envelope, likely Resend Pro once all transactional mail exceeds 3,000/month, and storage beyond the free allowance: **roughly $300–400/month plus Stripe and any accounting/certificate partner fees**.

This remains inexpensive relative to 50 subscriptions, but it is not free and should be modelled per active account.

## Hard upgrade triggers

Upgrade before the limit, not after a customer-facing failure:

1. **Vercel:** Pro before the first commercial deployment. Add spend alerts at $20 credit usage thresholds; investigate if functions exceed 50% of the included monthly credit or webhook latency rises.
2. **Supabase:** Pro before the first paid pilot. Alert at 60% and act at 70% of database, storage or egress quota. Never wait for 500 MB read-only mode.
3. **Email:** Resend Pro when any rolling seven-day projection exceeds 70 emails/day or 2,100/month, leaving capacity for password resets and incident communication.
4. **Queue:** add QStash/managed queue when the oldest due outbox row exceeds two dispatch intervals, retry backlog grows across two cycles, or processing cannot finish in a bounded cron batch.
5. **Storage:** consider R2 EU or Supabase expansion at 70% storage or when job-photo egress is visibly material. Preserve an independent inventory and deletion lifecycle.
6. **Observability:** upgrade/consolidate if sampled errors, log caps or one-monitor limits could hide missed-call, SMS or payment failures.
7. **Telecom:** pause automation at 80% of a tenant allowance; require an explicit overage choice. Add a global daily spend circuit breaker and anomaly alert.
8. **AI:** return deterministic output at the tenant/global budget. AI exhaustion must never block acknowledgement, quote acceptance, opt-out or payment reconciliation.
9. **CI:** keep the private-repo Actions budget in stop mode and reduce artifact retention if use exceeds 70% of 2,000 minutes or 500 MB.

## Reliability and failure modes

| Failure | Consequence | Required control |
|---|---|---|
| Supabase Free pauses | Call/payment webhook cannot persist | Do not use paused Free project for paid production; health check and Pro upgrade |
| Free DB has no accessible managed backup | Enquiries, quotes and consent evidence may be unrecoverable | Pro daily backup plus periodic independent encrypted export and restore drill |
| Webhook acknowledged before durable write | Provider will not retry; event vanishes | Verify then persist before 2xx; return retryable error on storage failure |
| Duplicate provider callback | Double SMS, duplicate payment/job state | Unique provider event ID and idempotent state transition |
| Cron/worker stalls | Quote chasers and failure alerts remain pending | Oldest-due metric, Sentry cron monitor, bounded recovery job |
| SMS becomes multi-segment | Cost multiplies silently | GSM-7 validation, length preview, provider segment count, tenant cap |
| Phone forwarding silently deactivates | A week of enquiries is lost | Daily synthetic/owner check, last-event anomaly, onboarding proof and fail-safe instructions |
| Resend daily cap reached | Auth resets and quotes stop | Reserve capacity for auth; upgrade at 70%, channel-priority queue |
| Stripe redirect trusted instead of webhook | False paid status | Webhook reconciliation is truth; retry and periodic mismatch report |
| Logs contain customer message bodies | Unnecessary privacy exposure across processors | Structured IDs/status only, redaction, short retention |
| Browser scraper breaks | Tender feed silently becomes stale | Source freshness/record count alarms and official APIs; isolate from revenue-rescue path |
| AI provider unavailable or over budget | Qualification or response blocks | Deterministic fallback and optional async drafting only |

## Regional and data-protection position

- Select the **specific Supabase London (`eu-west-2`) region**, not a broad “Europe” region. Supabase explicitly says region selection controls primary data location but is not itself proof of compliance. ([Supabase regions](https://supabase.com/docs/guides/platform/regions))
- Vercel's Pro DPA covers UK transfer mechanisms, but its documentation says primary processing is in the US and services may process internationally. Do not put raw customer message bodies or unnecessary personal data into deployment logs, analytics, cache keys or error reports. ([Vercel DPA](https://vercel.com/legal/dpa))
- If R2 is adopted, use the `eu` jurisdictional restriction rather than a best-effort location hint. This keeps objects in the EU, not specifically the UK; document the transfer and DPA.
- Choose PostHog EU (Frankfurt), redact PII, and disable replay on portals/forms containing addresses, phone numbers, quote text or payment data unless a reviewed masking configuration proves otherwise.
- Maintain a processor register and retention schedule for Vercel, Supabase, Twilio, Resend, Stripe, Anthropic, PostHog, Sentry and Cloudflare if used.
- Do not send full enquiry histories to Claude. Send the minimum fields needed for the draft, and store the model/version, token use and a hash/reference of the input rather than duplicating sensitive content in logs.

## What should not be added to “make it free”

- A self-hosted telephony stack: carrier numbers and termination remain paid, while on-call and security work explodes.
- A general Redis cache: JobFilter's pilot workload does not need one; Postgres and HTTP caching are enough.
- A full workflow platform: one outbox dispatcher is easier to reason about and audit.
- Headless Chromium for quote PDFs: HTML/lightweight PDF rendering is cheaper and more reliable.
- Per-reminder cron jobs: one bounded dispatcher avoids schedule limits and gives a complete backlog view.
- Free-tier keep-alive traffic to prevent Supabase pausing: it attempts to evade the product's reliability boundary and still supplies no backup/SLA.
- Trial credits in pricing: they expire and conceal the true gross margin.
- Unlimited SMS/WhatsApp: telecom is the principal variable cost and must be metered.

## Final recommendation

Approve a **near-zero variable-compute architecture**, not a “free production” claim:

1. Keep Next.js/Vercel, Supabase and the current codebase.
2. Use Vercel Hobby only for private non-commercial development; pay $20 for Pro before commercial use.
3. Use Supabase Free for development/feasibility, then pay $25 for Pro before storing paying customers' operational data.
4. Put scheduled intent and delivery evidence in a Postgres outbox driven by one Supabase Cron dispatcher.
5. Use Resend, PostHog, Sentry and GitHub Actions within their real free allowances.
6. Treat Twilio, Stripe and Claude as metered cost centres with per-tenant and global circuit breakers.
7. Launch SMS first, constrain it to short messages, and do not enable WhatsApp until approval and cost/compliance gates pass.
8. Defer R2, QStash and any additional platform until a measured threshold proves they are needed.

The honest steady-state production floor for the five-firm pilot is approximately **$69–73/month plus Stripe fees** at a small 30-outbound-segment allowance per firm. That is “basically cheap,” not free. Any plan claiming $0 production cost is either violating Vercel's terms, ignoring telecom/payment charges, or accepting an avoidable data-loss and outage risk.
