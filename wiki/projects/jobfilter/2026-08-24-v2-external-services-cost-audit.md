---
date: 2026-08-24
project: jobfilter
type: external-services-cost-audit
status: completed
---

# JobFilter V2 — external-services and near-zero-cost audit

## Verdict

JobFilter can remain **£0 before the first client** as a non-commercial validation/demo, but it cannot truthfully operate the live Revenue Rescue product for free. The first client's setup payment should fund the production upgrades and telecom credit before their number is activated.

The hard boundary is Vercel: its Hobby plan is restricted to non-commercial personal use. A paying pilot requires Vercel Pro ($20/month). A production database should also move to Supabase Pro ($25/month) because Free is described for experiments, pauses after inactivity, and lacks automatic backups. Each customer then needs a uniquely attributable UK phone number and metered voice/SMS. “Free telecom” does not exist.

Recommended commercial trigger:

1. **£0 validation:** Vercel Hobby + Supabase Free + Resend Free; interactive demo, fake/sandbox records, Stripe test mode and manually conducted sales. No live customer traffic, no promise of reliable call rescue.
2. **First signed client and paid £149 setup:** upgrade Vercel to Pro, put $50–100 telecom credit on the provider, provision the first number, run real handset acceptance, then activate the client.
3. **First recurring payment / before storing irreplaceable production data:** upgrade Supabase to Pro. The founder can temporarily defer this during a tightly supervised single-client trial, but must accept the no-backup risk explicitly.

All prices below were checked against primary vendor material on 24 August 2026. Vendor prices change; USD figures exclude tax and exchange-rate movement.

## Unavoidable-cost matrix

| Capability | £0 option and cap | Unavoidable live cost | Launch workaround | Upgrade trigger / risk |
|---|---|---|---|---|
| Web app / API | Vercel Hobby has 1m function invocations and other free quotas | Hobby is non-commercial; [Vercel Pro is $20/month](https://vercel.com/pricing) | Use Hobby only for founder demo and validation | Upgrade before the first paying client is activated |
| Database, auth, CRM, portal, ledger | [Supabase Free](https://supabase.com/pricing): 500MB DB, 1GB files, 5GB egress, 50k MAU | Production-grade starting point is Pro at $25/month; Free pauses and has no automatic backups | Demo/synthetic data on Free | Upgrade before irreplaceable client data; mandatory by several active clients |
| Missed-call capture | Provider trial can prove a founder-owned verified number | One number per customer plus voice minutes; [Twilio UK mobile number $2.50/month and inbound $0.01/min](https://www.twilio.com/en-us/voice/pricing/gb) | No customer activation until a real carrier test passes | Every activated customer; unique number is needed for tenant attribution |
| Conditional forwarding | Carrier codes/setup may cost no fixed fee | The customer's carrier may charge diverted minutes; carrier behaviour and voicemail conflicts vary | Customer pays their carrier; record carrier-specific acceptance | Reject unsupported plans; monitor a daily heartbeat/test call because silent failure loses leads |
| SMS acknowledgement/replies | Trial messages are not a production allowance | [UK outbound $0.056/segment, inbound $0.0075/segment](https://www.twilio.com/en-us/sms/pricing/gb), plus failed-message fee | One GSM-7 segment acknowledgement; email/web alert to owner; email-first follow-up | Hard per-account segment cap and paid overage; never promise unlimited messaging |
| WhatsApp | None suitable for unrestricted production automation | [Twilio charges $0.005 per inbound/outbound message plus Meta template fees](https://www.twilio.com/en-us/whatsapp/pricing); business-initiated messages need templates outside the 24-hour service window | Defer; launch SMS first | Enable only after template inventory, approval, consent/suppression and a customer-funded allowance |
| Transactional email | [Resend Free](https://resend.com/pricing): 3,000/month, 100/day | Pro $20/month for 50k/month and no daily cap | Free for pilot; stagger non-urgent mail | Upgrade before traffic plus auth/admin mail can breach 100/day—roughly before 100 active clients under this model |
| Payments | Stripe test mode is free | [UK cards 1.5% + 20p](https://stripe.com/gb/payments); Billing starts at another 0.7% of recurring volume; Invoicing Starter 0.4% per paid invoice | Payment Links have no separate product fee; merchant bears deposit processing | Never absorb customer deposit fees; reconcile from webhooks, not return URLs |
| AI summaries/drafts | Turn AI off and use deterministic questions/templates | [Claude Haiku 4.5: $1/M input, $5/M output](https://www-cdn.anthropic.com/files/4zrzovbb/website/3684c2faafb97418665782cea0001f439f74b1d2.pdf) | AI optional; one schema-constrained summary after deterministic qualification | Per-account token cap; no AI in permissions, money, consent or state transitions |
| Quotes and PDFs | Generate HTML/PDF inside the app | Only hosting compute; no e-sign vendor needed for ordinary quote acceptance | Store immutable accepted version, name, timestamp, IP/user agent and confirmation email | Paid signing only if a later regulated workflow requires stronger identity/evidence |
| Electronic acceptance | Click-to-accept can be valid evidence | Legal review, not necessarily a software fee | [Law Commission](https://lawcom.gov.uk/project/electronic-execution-of-documents/) confirms electronic signatures can execute documents where intent/formalities are satisfied | Do not use the simple flow for deeds or regulated certificates |
| Calendar/scheduling | Internal calendar in Postgres; [Google Calendar API currently has no added charge below quotas](https://developers.google.com/workspace/calendar/api/guides/quota) | Google announced quota charging later in 2026; OAuth/review and support effort remain | Stage 3; export `.ics` first | Add sync after revenue gate, with push notifications and rate-limit handling |
| Files/photos/forms/checklists | Supabase Free includes 1GB; compress photos client-side | Supabase Pro includes 100GB; extra storage/egress is metered | Private buckets, RLS and signed URLs; cap file count/size | Upgrade storage when 70% of quota is reached; never expose job photos in public buckets |
| Maps/geocoding/routes | Plain postcode/address and external map link | Public OSM Nominatim is max 1 request/sec, bans autocomplete and warns commercial users access can disappear; Google Maps has free usage caps then metering | Do not build maps in Stage 1 | Stage 3: Google currently includes 10k monthly Geocoding/Routes Essentials events; add billing alerts |
| Workflows/retries | Postgres outbox plus scheduled worker; [QStash Free](https://upstash.com/pricing/qstash) allows 1,000 deliveries/day | QStash PAYG is $1/100k delivery attempts; retries also count | Free through early customers, with idempotency and DLQ | Enable PAYG before normal traffic plus retries approaches 1,000/day |
| Monitoring | [Sentry Developer](https://sentry.io/pricing/) is $0: 5k errors, 5GB logs, one uptime and one cron monitor | More monitors/team access cost extra | One critical synthetic check plus telecom failure dashboard | Upgrade when alert coverage cannot fit, not merely with customer count |
| Browser notifications | Standards-based Web Push has no per-message vendor fee | Engineering/support cost; user permission and device reliability | Owner email plus in-app badge first | Add push as convenience, never as the sole missed-call alert |
| Xero sync | New Xero app Starter supports five connections free | [Core is A$35/month to 50 connections; Plus A$245 to 1,000](https://developer.xero.com/faq/pricing-and-policy-updates), with certification/security work | CSV/accountant export; Stage 3 only | Start Xero integration only after replacement revenue gate; five pilots can use Starter |
| QuickBooks/Sage | Sandboxes may be free, but production approval/support is not “free work” | Commercial terms and certification must be rechecked at build time | CSV export; customer/accountant remains source of truth | Build only against verified demand and vendor approval |
| CIS | HMRC sandbox/API access has no published per-call fee | Production approval, security, required fraud-prevention headers, ongoing tax correctness; [HMRC CIS API is beta](https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/cis-deductions-api/3.0) | Accounting export/handoff; make no filing claim | Stage 3 specialist review; not a cheap CRUD feature |
| Gas/electrical certificates | Generic PDF forms are technically free | Scheme/regulatory validation, version maintenance and professional liability are not | Exclude replacement claim for regulated trades | Partner/integrate only after written requirements and acceptance by qualified practitioners |
| Tender scanner | [Find a Tender and Contracts Finder expose free OCDS APIs](https://www.gov.uk/government/publications/open-contracting) | Storage, processing and source-change monitoring only | Retain existing scanner; cache raw source and provenance | Upgrade infra when ingestion threatens app quotas; do not scrape vendor sites |
| Data protection | Templates/checklists cost nothing | Likely annual [ICO tier-1 fee £52](https://ico.org.uk/for-organisations/data-protection-fee/data-protection-fee/) unless exempt; possible legal review | Complete controller/processor terms, DPA, retention, deletion and incident process before launch | Review whenever a new channel, AI use or regulated integration changes processing |
| Reviews, referrals, repeat work | Manual owner action from CRM | Automated SMS/WhatsApp/email is metered and may be direct marketing | Keep out of Stage 1 automation | [ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/) says genuine service messages are distinct from promotion; add only with lawful-basis/consent/opt-out decision |

## Rough monthly cost scenarios

These are planning assumptions, not quotes:

- £39/month customer subscription.
- Per customer: one UK mobile number ($2.50), 20 forwarded missed calls averaging 30 seconds ($0.10), 40 outbound SMS segments ($2.24), 10 inbound segments ($0.075), and 50 small Haiku summaries ($0.125). Variable vendor cost: **about $5.04/customer/month**.
- Fixed production stack: Vercel Pro $20 + Supabase Pro $25. Resend/Sentry/QStash remain free until their caps.
- At 100 clients Resend Pro $20 is included and $1 QStash PAYG headroom is assumed.
- Stripe subscription cost: 1.5% + 20p Payments plus 0.7% Billing = **about £1.058 per £39 subscription**. The £52 ICO fee is shown as £4.33/month equivalent.
- Excludes VAT, exchange movement, the customer's carrier forwarding charge, domain, support labour, legal/accounting review, refunds/chargebacks, customer deposit processing and WhatsApp.

| Active clients | Production infra | Telecom + AI | Email/queue | Total vendor USD | SaaS Stripe GBP | ICO equivalent GBP | Revenue GBP |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 5 | $45.00 | $25.20 | $0 | **$70.20** | £5.29 | £4.33 | £195 |
| 20 | $45.00 | $100.80 | $0 | **$145.80** | £21.16 | £4.33 | £780 |
| 100 | $45.00 | $504.00 | $21 | **$570.00** | £105.80 | £4.33 | £3,900 |

Using a sensitivity assumption of $1 = £0.75, gross margin before founder labour/support and tax is roughly 68% at 5 clients, 83% at 20, and 86% at 100. The five-client margin misses the 70% target because fixed production cost is concentrated across too few accounts; the £149 setup charge is therefore important, and the telecom allowance must stay bounded.

An explicitly risk-accepted single-client trial can temporarily keep Supabase Free, making the first live stack about $25/month ($20 Vercel plus about $5 variable). That is not a durable production posture: no automatic database backup means a “free” outage can cost more than the saved $25.

## Cost-control decisions to carry into the build plan

1. The product is £0 only until the first client; collect setup before provisioning anything.
2. One tenant number and a fixed SMS-segment allowance are included. Carrier forwarding cost belongs to the customer. Overage is passed through or sending pauses safely.
3. Default quote documents and non-urgent follow-up to email. Use SMS for immediate acknowledgement and high-value action only.
4. Keep every automated message to one GSM-7 segment where possible; count actual provider segments, delivery attempts and failures against the tenant budget.
5. WhatsApp, maps, calendar sync, accounting, CIS and certificates remain behind explicit revenue/compliance gates.
6. AI is off by default, cheap-model only, cached where safe and capped per tenant.
7. Use a durable local outbox/idempotency ledger. Free queues and crons are transport aids, not the source of truth.
8. Alert at 50/70/90% of every quota. A free tier that hard-stops is a product outage, not a saving.
9. Do not market “unlimited” calls, texts, files, AI or users until measured usage proves it.
10. Re-price vendor rates immediately before implementation and quarterly thereafter.

## Features that cannot honestly be delivered free

- Commercial Vercel hosting under current plan terms.
- A reliable production database with automatic backups.
- A unique UK phone number, inbound voice and SMS for each customer.
- WhatsApp business-initiated automation.
- Card processing and recurring subscription billing.
- Claude API usage, however small.
- The ICO fee if JobFilter is not exempt.
- Xero beyond five connections and the operational work for any accounting integration.
- Certified gas/electrical workflows and HMRC/CIS production assurance.

Everything else can begin on existing/free capacity only if it has a measured cap, failure behaviour and funded upgrade trigger.
