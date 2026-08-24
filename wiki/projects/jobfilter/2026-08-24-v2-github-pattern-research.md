---
date: 2026-08-24
project: jobfilter
agent: codex
status: completed
---

# JobFilter V2 — GitHub pattern research

## Scope and method

This is a shortlist of 20 repositories relevant to JobFilter V2's enquiry inbox, missed-call recovery, quotes, invoicing, payments, scheduling, field service, customer communications and retained opportunity scanner. Evidence was checked on 24 August 2026 using only GitHub repository metadata, source, READMEs, licence files and commit history.

“Permissive” does not mean “copy indiscriminately.” Before importing code, verify the licence at the exact file/package path, retain notices, review dependencies and provenance, and record the source commit. AGPL/GPL/ELv2 or ambiguous code must remain a clean-room product and architecture reference unless legal review explicitly approves reuse.

## Ranked top five for JobFilter

1. **[kgorle1111/plumber-missed-call-demo](https://github.com/kgorle1111/plumber-missed-call-demo)** — the closest implementation and the most important strategic warning. Reuse its safety, delivery and evaluation patterns; accept its conclusion that generic missed-call text-back is not a sufficient wedge.
2. **[chatwoot/chatwoot](https://github.com/chatwoot/chatwoot)** — strongest reference for a single enquiry timeline across SMS, WhatsApp, email and web, with assignments, labels and automation. Only non-`enterprise/` code is MIT.
3. **[SolidInvoice/SolidInvoice](https://github.com/SolidInvoice/SolidInvoice)** — strongest permissive reference for financially correct quote-to-invoice state, immutable tax/money snapshots, reminders and payments.
4. **[twilio-labs/function-templates](https://github.com/twilio-labs/function-templates)** — small, provider-authored Voice/SMS webhook patterns that can be adapted surgically without importing a platform.
5. **[clawnify/OpenFieldService](https://github.com/clawnify/OpenFieldService)** — closest compact field-service domain model, but very new and carrying a README/licence contradiction that must be resolved before substantial copying.

Near-term conclusion: use repositories as pattern libraries, not as a foundation to fork. JobFilter already uses Next.js/Supabase; port narrow, well-tested concepts into that stack. Do not introduce PHP, Odoo, Frappe, Rails or a telephony platform merely to inherit a feature.

## A. Permissive candidates — code adaptation can be considered

| Repository | Purpose and stack | Activity at check | Licence boundary | Reusable pattern | JobFilter adaptation |
|---|---|---:|---|---|---|
| [kgorle1111/plumber-missed-call-demo](https://github.com/kgorle1111/plumber-missed-call-demo) | Missed call → auto-SMS demo for plumbers; Python, FastAPI, Twilio, Claude | 0 stars; pushed 2026-08-03 | [MIT](https://github.com/kgorle1111/plumber-missed-call-demo/blob/main/LICENSE) | Deterministic safety gates, one structured LLM call, Twilio delivery-status callback, opt-out, value receipts, 56 tests and 12 evals | Port the webhook/idempotency/suppression/delivery evidence model into Next.js. Treat the post-mortem below as a product gate, not a footnote. |
| [clawnify/OpenFieldService](https://github.com/clawnify/OpenFieldService) | Compact FSM: customers, jobs, dispatch, weekly schedule, invoices, materials and checklists; TypeScript, Preact/Vite, Hono, SQLite | 16 stars; pushed 2026-08-22 | GitHub and [LICENSE](https://github.com/clawnify/OpenFieldService/blob/main/LICENSE) say MIT, while README says AGPL; obtain clarification before substantial reuse | Compact customer/job/service/invoice entities and REST boundaries | Map the domain into Supabase tables and Next route handlers; do not copy its storage/auth assumptions. Most useful as Stage 3 schema reference. |
| [SolidInvoice/SolidInvoice](https://github.com/SolidInvoice/SolidInvoice) | Quotes, invoices, payments, recurring billing and reminders; PHP 8.4, Symfony 7, Doctrine, API Platform, Payum, MoneyPHP | 951 stars; pushed 2026-08-24 | [MIT](https://github.com/SolidInvoice/SolidInvoice/blob/3.1.x/LICENSE) | Money value objects, tax snapshot on issue, quote → invoice transitions, overdue scheduler | Re-express these invariants in TypeScript/Postgres. Use integer minor units; make issued documents immutable/versioned; drive chasers from durable scheduled jobs. |
| [InvoicePlane/InvoicePlane](https://github.com/InvoicePlane/InvoicePlane) | Clients, quotes, invoices, payments, gateways, reminders and branded templates; PHP/CodeIgniter, MoneyPHP, Stripe | 3,120 stars; pushed 2026-08-23 | Root SPDX is unclear, but [LICENSE.txt](https://github.com/InvoicePlane/InvoicePlane/blob/develop/LICENSE.txt) is MIT; name/logo have trademark restrictions | Mature document statuses, numbering, templates and payment allocation | Adapt state vocabulary and printable-document requirements; use no InvoicePlane branding. |
| [calcom/cal.diy](https://github.com/calcom/cal.diy) | Scheduling infrastructure; TypeScript, Next.js, Postgres, Prisma, tRPC, Tailwind, Turborepo, Zod | 47,903 stars; pushed 2026-08-08 | [MIT](https://github.com/calcom/cal.diy/blob/main/LICENSE); README says community self-host build is not recommended for production | Slot calculation, time zones, availability, reschedule/cancel and calendar sync | Study for Stage 3 site visits and dispatch. Port only scheduling algorithms and tests that are truly needed; never import the whole monorepo. |
| [twilio/twilio-node](https://github.com/twilio/twilio-node) | Official Node/TypeScript Twilio API client | 1,544 stars; pushed 2026-08-12 | [MIT](https://github.com/twilio/twilio-node/blob/main/LICENSE) | Typed Voice/SMS calls, pagination, error handling and optional 429 backoff | Prefer the maintained SDK over hand-written REST. Wrap it behind a JobFilter channel adapter and persist provider IDs/statuses. |
| [twilio-labs/function-templates](https://github.com/twilio-labs/function-templates) | Provider-authored serverless templates for Voice, SMS and other Twilio products; JavaScript | 405 stars; pushed 2026-08-17 | [MIT](https://github.com/twilio-labs/function-templates/blob/main/LICENSE) | Small webhook, forwarding and message examples | Adapt webhook verification, call routing and status callbacks into Next route handlers; test UK conditional-forwarding behaviour on real carriers. |
| [fonoster/fonoster](https://github.com/fonoster/fonoster) | Programmable telephony stack and open Twilio alternative; TypeScript | 8,081 stars; pushed 2026-08-24 | [MIT](https://github.com/fonoster/fonoster/blob/main/LICENSE) | Voice application verbs, number/application separation, recording and event concepts | Architecture reference or later provider option. Do not self-host a telecom stack for the pilot; it would multiply operational risk. |
| [jambonz/jambonz-feature-server](https://github.com/jambonz/jambonz-feature-server) | Core programmable-voice feature server; JavaScript/Node, Redis | 99 stars; pushed 2026-08-21 | [MIT](https://github.com/jambonz/jambonz-feature-server/blob/main/LICENSE) | Explicit call-session state, webhook-driven call control and failure handling | Study silent-failure detection and event state only. It is too infrastructure-heavy for Stage 1. |
| [cortezaproject/corteza](https://github.com/cortezaproject/corteza) | API-centric low-code CRM/workflow platform; Go with web clients | 2,136 stars; pushed 2026-08-24 | [Apache-2.0](https://github.com/cortezaproject/corteza/blob/2024.9.x/LICENSE) | Record-level permissions, structured modules, automation workflows and REST boundaries | Borrow tenant-aware permission and workflow concepts; keep JobFilter's fixed trade-specific model instead of building a generic low-code platform. |
| [stripe-samples/accept-a-payment](https://github.com/stripe-samples/accept-a-payment) | Official Stripe examples for Payment Intents/Checkout and multiple methods; JavaScript plus server variants | 841 stars; pushed 2026-08-20 | [MIT](https://github.com/stripe-samples/accept-a-payment/blob/main/LICENSE) | Server-created payment state, webhook reconciliation, retry-safe confirmation | Use official patterns for deposits and invoice payment links. Stripe webhooks, not browser redirects, must be payment truth. |
| [open-contracting/kingfisher-process](https://github.com/open-contracting/kingfisher-process) | Stores and preprocesses Open Contracting Data Standard records; Python/SQL | 4 stars; pushed 2026-08-20 | [BSD-3-Clause](https://github.com/open-contracting/kingfisher-process/blob/main/LICENSE) | Raw-source retention, transform pipeline, validation and normalized contracting records | Use for the retained tender module: immutable raw payload, source/run provenance, normalized release, validation errors and repeatable scoring input. |

## B. Mixed licences — only reuse after exact path/package verification

| Repository | Purpose and stack | Activity at check | Licence boundary | Reusable pattern | JobFilter adaptation |
|---|---|---:|---|---|---|
| [chatwoot/chatwoot](https://github.com/chatwoot/chatwoot) | Omnichannel conversation inbox; Ruby on Rails, Vue, Postgres/Redis | 36,162 stars; pushed 2026-08-24 | Root [licence](https://github.com/chatwoot/chatwoot/blob/develop/LICENSE) makes non-`enterprise/` content MIT; `enterprise/` has a separate restricted licence | Unified contacts/conversations/messages/inboxes, assignments, labels, channel adapters and automation | Model every web/SMS/WhatsApp event as one conversation timeline and keep channel payloads behind adapters. Do not import enterprise paths. |
| [novuhq/novu](https://github.com/novuhq/novu) | Multichannel notification workflows and embeddable inbox; TypeScript monorepo | 39,660 stars; pushed 2026-08-24 | [Mixed licence](https://github.com/novuhq/novu/blob/next/LICENSE): content outside named enterprise restrictions is stated as MIT, while enterprise packages carry a restrictive proprietary licence; verify every path | Provider abstraction, per-channel workflow steps, preferences, digesting and delivery state | Study the event → workflow → channel-attempt model. For Stage 1, a small local outbox is preferable to adopting Novu's platform complexity. |

## C. Copyleft/source-available — clean-room reference only

| Repository | Purpose and stack | Activity at check | Licence boundary | Pattern worth studying | JobFilter adaptation without copying code |
|---|---|---:|---|---|---|
| [OCA/field-service](https://github.com/OCA/field-service) | Mature modular Odoo FSM addons covering CRM, accounting, portal, calendar, routes, recurrence, signing and timesheets; Python/Odoo/XML/JS | 194 stars; pushed 2026-08-18 | [AGPL-3.0](https://github.com/OCA/field-service/blob/19.0/LICENSE) | Base work order plus optional integration modules | Validate the B1/B2/B3 module boundaries and Stage 3 exit-blocker map; design independently. |
| [frappe/erpnext](https://github.com/frappe/erpnext) | Full ERP for accounting, CRM, projects, inventory and HR; Python/JS/TS/Frappe | 38,452 stars; pushed 2026-08-24 | [GPL-3.0](https://github.com/frappe/erpnext/blob/develop/license.txt) | Linked business records, permissions, explicit states, history and background jobs | Use as a completeness checklist for later accounting/job-management scope, not as code or a dependency. |
| [idurar/idurar-erp-crm](https://github.com/idurar/idurar-erp-crm) | Client, quote, invoice and payment CRM; MERN, Ant Design, Redux | 8,711 stars; pushed 2026-08-14 | [AGPL-3.0](https://github.com/idurar/idurar-erp-crm/blob/master/LICENSE) | Resource/action controllers and document dashboards | Study screen density and sales-document journey; independently implement only the small trade-specific flow. |
| [crater-invoice-inc/crater](https://github.com/crater-invoice-inc/crater) | Estimates, invoices, payments, portal and Stripe; Laravel/PHP, Vue 3, Pinia, Tailwind | 8,342 stars; repository pushed 2024-08-10; default-branch product work is stale | Root [LICENSE](https://github.com/crater-invoice-inc/crater/blob/master/LICENSE) is AGPL-3.0 despite conflicting package metadata; treat as AGPL | Estimate/invoice UX, customer portal and payment flow | Screenshot/journey reference only. Do not copy; do not depend on this stale project. |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | Extensible CRM objects, views and workflows; TypeScript/Nx, NestJS, BullMQ, Postgres, Redis, React/Jotai | 55,462 stars; pushed 2026-08-24 | [Mixed](https://github.com/twentyhq/twenty/blob/main/LICENSE): mostly AGPL plus application exception, enterprise commercial code, and named MIT packages | Custom objects, workflow execution, queues and activity views | Study only the object/activity model. Avoid generic customization and reproduce no AGPL application code. A named MIT package can be considered only after package-level verification. |
| [invoiceninja/invoiceninja](https://github.com/invoiceninja/invoiceninja) | Invoices, quotes, projects, time, client portal and API; PHP/Laravel | 10,022 stars; pushed 2026-08-20 | [Elastic License 2.0](https://github.com/invoiceninja/invoiceninja/blob/v5-stable/LICENSE), source-available with managed-service restrictions; not an OSS code donor for JobFilter SaaS | Full document lifecycle, portal and API surface | Use solely for feature/UX benchmarking. Do not adapt source into JobFilter. |

## The missed-call demo changes the strategy

The repository's [ARTICLE.md](https://github.com/kgorle1111/plumber-missed-call-demo/blob/main/ARTICLE.md) records an unusually valuable negative result: the author shipped the demo and then killed the product direction after discovery showed Podium, GoHighLevel, Housecall Pro, Jobber and ServiceTitan already bundle missed-call text-back. The code demonstrates competent delivery engineering, but the generic proposition was not differentiated.

For JobFilter this means:

- Do not make “we send an SMS after a missed call” the whole Stage 1 wedge.
- Retain the telephony proof gate, but test a narrower promise: trade-specific qualification, quote creation/follow-up and attributable recovered revenue in one workflow.
- Interview and pre-sell before platform work. The buyer must identify a meaningful gap after accounting for what their existing CRM/phone provider already supplies.
- Copy the evidence discipline: deterministic safety gates before AI, a single schema-constrained model call, opt-out/suppression, provider delivery callbacks, value receipts, and automated evals.
- The kill criterion should be explicit: if five firms will not pay for the complete enquiry-to-quote recovery workflow alongside their incumbent, stop before building scheduling or back-office replacement.

## Recommended reuse protocol

1. Create a source manifest before any adaptation: repository, exact commit, file path, licence and intended JobFilter module.
2. Prefer concepts and tests over copied implementation. Port into the existing Next.js/Supabase architecture.
3. For MIT/Apache/BSD code, retain required copyright/licence notices and review transitive dependencies.
4. For mixed repositories, confirm the licence of every source file and package; absence of a restrictive directory name is not enough by itself.
5. Keep AGPL, GPL and ELv2 repositories out of the implementation agent's copy context. Translate only requirements and independently described behaviour.
6. Never copy vendor branding, fixture customer data, API credentials, secrets, generated assets or screenshots.
7. Add attribution and provenance review to PR acceptance, alongside tests and security review.

## Build-order implications

The GitHub evidence supports a narrow vertical slice, not a broad fork:

1. **Discovery/proof:** validate UK call forwarding and differentiation against incumbent text-back.
2. **Enquiry core:** Chatwoot-inspired contact/conversation/message model, implemented independently in JobFilter.
3. **Safe delivery:** plumber-demo and Twilio-inspired signed/idempotent webhook, suppression, status callback, retry and value receipt.
4. **Commercial action:** SolidInvoice-inspired quote state/money invariants, then acceptance/deposit using official Stripe samples.
5. **Later only:** Cal scheduling and OpenFieldService/OCA field-service patterns after the paid Stage 1 gate.
6. **Tender continuity:** Kingfisher-style raw/provenance/normalized pipeline around the retained opportunity scanner.

No repository here justifies cloning an entire application. The best result is a small set of attributable patterns ported into JobFilter's existing stack behind commercial gates.
