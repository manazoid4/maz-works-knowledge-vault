# Maz Works: Lead Quality v2 (canonical lead rules)

**Version:** v2, adopted 28 Sep 2026 by Maz. Replaces the v1 score (proximity, reviews, premises, LinkedIn, gifts, case-study points) and the 7 "quality rules" of 28 Sep morning. Every agent (Claude, Codex, others) uses this file. Public file: no business names, contacts or prospect details here; those live in the private `maz-works-leads` repo and HubSpot.

Offers and prices: read them from `mazos-site/app/offers.ts` (Offer v9). Never copy prices into lead notes or prompts; name the offer and let the price come from that file.

## The method

**Find a repeated business problem → establish credible evidence → identify a useful paid intervention.**

Small website issues (typos, template text, no tap-to-call, a broken footer link) are supporting observations or a small standalone opportunity. On their own they never qualify a business for the main list.

Look beyond the homepage: service pages, team and recruitment pages, booking pages, FAQs, terms, contact and process pages, the owner's own posts.

## Four problem families (start roughly 6 / 6 / 4 / 4 in a batch of 20; never fill a quota with weak leads)

| Family | What to investigate |
|---|---|
| Enquiries and quoting | Requests arriving through several channels, repeated estimates, survey or site-visit scheduling, quote follow-up |
| Bookings and repeat customers | Repeated scheduling, cancellations, reminders, rebooking, waiting lists, customer chasing |
| Job delivery and invoicing | Manual paperwork, repeated data entry, staff hand-offs, completion records, invoice delays |
| Professional-service projects | Gathering client briefs, qualification, onboarding, document collection, progress updates |

Any UK business, any trade. A polished website is not an exclusion. A PDF, a missing booking button or a phone-based service is **not automatically a problem**: check what routes already exist (booking app, WhatsApp, portal) before suggesting work.

## Score (0–10)

| Dimension | Points | Evidence required |
|---|---:|---|
| Business problem | 0–3 | 0 none or cosmetic · 1 hypothesis only · 2 documented recurring bottleneck (in their own words or visible process) · 3 corroborated operational consequence (e.g. they state lost calls, overflowing inbox, no-shows, turning work away) |
| Repetition or workload | 0–2 | 1 verified recurring process · 2 concrete evidence of frequency or volume (e.g. "100+ emails a day", "fully booked 6 weeks", several staff doing it) |
| Paid solution fit | 0–2 | 1 plausible match to a current offer · 2 a bounded intervention the known workflow clearly supports |
| Buyer access | 0–2 | 1 verified business contact route · 2 named responsible decision-maker plus a route to them |
| Relevant timing | 0–1 | Dated expansion, recruitment, new site/service, or a stated priority connected to the problem |

**Gates (all required):** business problem ≥ 2, solution fit ≥ 1, a verified contact route, evidence checked in the last 30 days, and no exclusion.

**Tiers**
- **Gold 8–10**, passes every gate. A strong research prospect, not a confirmed buyer. **Gold does not require a limited company.**
- **Silver 6–7**, passes every gate.
- **Bench** (re-check queue): plausible but missing evidence. Not counted in any "20 leads" target.
- **Exclude** from the campaign: cosmetic-only findings, disproven problems, duplicates, chains/franchises, or no credible paid intervention.

**No points for:** geography or distance, gifts, LinkedIn presence, assumed case-study willingness, number of reviews. Reviews never establish budget.

**Contact route is separate from tier.** UK PECR: cold email only to a confirmed limited company (Ltd) at a business address; everyone else is phone, walk-in or a reply to their own published channel. Record `Contact route` accordingly. A sole trader can be Gold.

## What every private lead record contains

1. Evidence URLs and the date each was checked
2. Score breakdown (5 dimensions) and tier, plus the previous score if re-scored
3. **Observed facts** (what we saw) kept separate from **commercial hypotheses** (what we think it costs) and **owner-confirmed** information (only after a conversation)
4. Business consequence in one plain sentence (no invented £ losses)
5. Proposed intervention: name the Offer v9 package or add-on. Starter = one genuinely useful automation. Recommend a Business System or custom work only when the confirmed scope warrants it.
6. Contact route and decision-maker (if named)
7. Unanswered questions (budget, urgency, current tools stay "unknown" until the owner says)
8. Next action

## Discovery questions (first real conversation)

- What happens from enquiry to payment?
- Where does someone repeatedly copy, chase or correct information?
- How often, and how much time does it take?
- What happens when that step fails?
- Could software you already pay for do it?
- Who approves spending, and when would a change matter?

## HubSpot and measurement

- Priority (tier) is separate from sales progress (lead status). Research never marks a lead contacted.
- Refresh and dedupe (domain, business identity, phone) before creating. Import Gold → Silver → Bench. Preserve owners, history and opt-outs.
- Company names start with `🥇 GOLD · `, `🥈 SILVER · ` or `BENCH · `. Keep the `Lead tier` property in sync.
- Measure: owner-validated opportunities, quotes requested, paid starts. Review the method after 10 real conversations.

## Gifts (unchanged, not a scoring factor)

Free 3D-printed items are a thank-you for **paying** clients only, handed over with the finished job. Never offered before payment and never used to rank a lead.

## Lead hand-off format (plain text, one block per lead)

BUSINESS NAME (Town) · Tier + score
Contact: route / named decision-maker
Problem (observed): one plain sentence + URL + date
Consequence (hypothesis): one plain sentence
Intervention: Offer v9 package or add-on
Unknowns: what we still need to learn
Next action: one line
