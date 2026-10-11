---
type: concept
title: Maz Works Proof Pass — reusable NFC event return loop
created: 2026-10-11
updated: 2026-10-11
status: proposed-not-built
tags: [maz-works, events, nfc, customer-acquisition, demo, experiment]
source: Owner conversation on 2026-10-11
related:
  - "[[wiki/projects/maz-works/STATUS]]"
---

# Maz Works Proof Pass — "I owe you proof. Not a pitch."

**Owner intent (2026-10-11):** At local founder, business-owner and technology meetups, do something genuinely unusual with existing NFC cards: hand an attendee a physical, hyper-personalised reason to return in X days, see a useful solution for their own problem, and remember Maz Works. The card should be reusable across events. The aim is qualified relationships and paid projects, not indiscriminate freebies. This is a **proposed campaign / build brief, not an implemented feature, live offer, customer promise, or verified result**.

## The experience: a physical "problem receipt"

1. **Discovery, 60–90 seconds.** Ask: "What's one repetitive job or customer problem you'd love to stop dealing with?" Repeat their words and confirm the business consequence, existing tools and who makes decisions. Don't assume a problem from a website.
2. **Write the promise together.** Give a numbered reusable NFC Proof Pass with an erasable writable insert / removable sleeve. Write the attendee's *business name* (only with their permission), the one problem in ordinary language, an agreed demonstration target, today's date and a specific return date. Don't print private details permanently on reusable cards.
3. **Tap + optional consent.** NFC tag and printed QR both open the campaign landing page. The attendee can ask for a personalised example using the **existing** Maz Works free-demo form; the card is an experience, not an account, payment token or a data store. Source `?src=event-proof-pass` fits the existing attribution pattern. If this system isn't built, use a tested URL to `https://www.mazworks.uk/free-plan?src=event-proof-pass` and a manual paper/owner-only record.
4. **Show something concrete.** Use the existing free-demo offer: a suitable templated working example on Maz's test setup, normally replied to within **one working day**, with a fixed, bounded quote for live deployment. For a complex novel product, offer a **labelled storyboard or click-through sketch** rather than claim it is functional. Never touch their operational apps or confidential customer data without agreed paid scope, permission and safeguards.
5. **Return invitation (7 days suggested).** "Bring the card back or book a quick online return before [actual date]. I'll walk you through the proof and the next practical step." The extra return experience is the time-limited invitation, **not** eligibility for the standard free demo, which remains open. The card is returned for reuse; remote returns are equally valid.
6. **Close clearly.** After showing the proof, offer an accurate fixed-price proposal using the current packages and `app/offers.ts` as price source; the attendee owns the choice to proceed. One respectful manual follow-up only with appropriate permission.

## Front-of-card / tabletop sign copy (draft, needs owner sign-off)

**Front:** "MAZ WORKS · PROOF PASS #001" / "**I owe you proof. Not a pitch.**" / "Tell me one business problem. I'll show you a working example of how I'd tackle it." / "TAP OR SCAN TO CLAIM".

**Back:** "**Come back within 7 days.** Bring this card back for your personal walkthrough — or return online." / "Your problem: ______" / "Agreed example: ______" / "Return by: ______" / "A test demo isn't a live installed system. You'll get a clear next step and a fixed quote if further work is needed."

**Banner/corner:** "GOT ONE ANNOYING BUSINESS PROBLEM? / 90 seconds to tell me. / Your own proof pass. / A working example and a reason to come back. / Maz Works · Websites • Automation • Custom Software." The event organiser must approve any banner, table or live demo setup.

## What makes it memorable

- **A promise with a physical return.** A numbered object with the visitor's precise words and a real due date is harder to forget than a generic business card. Do **not** invent artificial scarcity or pretend every pass is individually engineered.
- **Founder counter-signature.** Initial the problem receipt together. The visitor can hold you to a narrow demonstration; acknowledge if the example cannot be built safely.
- **A real before → after.** Show their current step, a simple proposed step, and what still requires implementation. Contrast *test example* with *live result*.
- **Return to unlock, not retargeting.** The visitor returns for a five-minute walkthrough and optional one-page improvement plan. Do not use a false expiry or revoke the normal free-demo service.
- **Limited physical inventory.** Start with **five reusable cards per event** only if Maz can genuinely fulfil five examples and walkthroughs. Physical cards are lent/returned; unlike free 3D-printed gifts, this is not a gifted object. Existing gift rule remains: free 3D-printed thank-yous are for paying customers only.

## Hyper-personalisation by conversation

| Attendee | Their own wording to capture | Honest proof on test data |
|---|---|---|
| Café / shop owner | "I answer the same DM every night" | Mock customer question → prepared reply and handover |
| Salon / groomer | "People cancel and I forget to refill slots" | Example cancellation → waitlist notification flow |
| Trades / garage | "Quotes go cold before I follow up" | Dummy enquiry → quote status and follow-up reminder |
| Founder / creator | "I have an idea but no product to show" | Small clickable concept on clearly fake sample data |
| Office team / professional | "We're copying one form into three places" | Dummy intake → two system-ready structured outputs |

**Never** infer private problems, pretend to know a company, guarantee revenue/time saved, or promise the full system free. If the problem is not a fit, be direct and recommend an existing tool or a better provider. The aim is to be useful even if no sale results.

## Fastest pilot: zero new app development

**Materials:** 5 existing NFC cards/tags (re-encoded with a reusable public destination), 5 removable sleeves or erasable slips, a marker, a printed QR fallback, and a phone/laptop showing *real* existing demos. A reusable roller banner is optional **only with organiser consent**. Don't purchase a market stall or speculative expo stand.

**One-time preparation:**
- Manually test NFC and QR on at least Android + iPhone and verify the intended page works without NFC. Avoid encoding contact names or business details on the physical tag.
- Use the existing `/free-plan?src=event-proof-pass`; leave all production page content, service pricing and primary CTA unchanged during pilot.
- Make a short private tracker: card number, event (not attendee's private address), agreed proof, promised return date, owner approval to contact, status, and next step. Keep any names/email and conversation notes in private CRM / private leads space, **never this public repo or vault**.
- Owner personally confirms which requests fit existing free-demo scope; keep any live-client integration, real phone numbers, payments and production work out of the pilot.
- Create an offline fallback: attendee scans public QR later, or receives the usual free-demo URL manually.

**At event:** Speak to 10 relevant people, issue at most five passes if capacity allows; take proof obligations seriously. Give permission-friendly alternative to people who dislike sharing contact details. No organiser-authorised display? carry one card and phone rather than install a stand uninvited.

**After event:** Send the promised example through the existing manual process, note delivered vs not delivered, hold optional online or in-person return appointments. Do not set up unconsented automated reminders.

**Success gate after two relevant events:** count meaningful conversations, passes accepted, suitable demo requests, demos actually delivered within stated turnaround, returns/online walkthroughs, proposals requested, paid starts, and owner time spent. **No invented conversion figures.** Kill or adjust the campaign if proof debt / time per lead outweighs paid opportunities.

## Proposed software phase, only after pilot evidence and owner GO

- Reuse current Next.js site and enquiry flow. No second CRM, parallel pricing config, AI-branded offer, expensive NFC hardware, or duplicated lead system.
- Optional noindexed `/proof-pass/[public-token]` landing page; accessible QR equivalent; plain-English "what's been agreed / test demo / return booking" and opt-in enquiry. Limit guessing/enumeration, treat link as a bearer URL and never include sensitive details in it. Use server-side random tokens and expiry/revocation. Avoid logging PII in analytics.
- Minimal per-pass workflow: **issued → claimed → demo scoped → prepared → presented → returned/closed**, plus declined / unable-to-deliver; owner has final approval at every promise and outbound step. NFC points to generic event page until a secure per-pass experience exists. Use a removable QR or manual pairing if individual links are needed; don't bulk-program irreversible personal links.
- Store attendee identity/consent only in existing authorised private CRM; don't build tracking pixels or automatic outbound sequences. Distinguish technical scan from explicit marketing opt-in under UK GDPR/PECR. Respect withdrawal and deletion.
- Do not promise deadlines that conflict with `CHECK_REPLY_TIME`; do not publicly advertise a bonus as live until tested. Existing free-demo and `MAIN_CTA` stay canonical.
- Tests: expired/unknown/revoked token; QR and NFC fallback; no JavaScript; mobile 390px; screen reader + reduced motion; no personal info leaked; failure preserves enquiry; duplicate claim/idempotency; source tag reaches enquiry; contact is never created merely by scanning; manual send only; return-booking fallback; capacity exhausted copy.

## Scope and ownership

**Approved here:** recording the owner's idea and the recommended bounded pilot as knowledge. **Not approved/implemented:** a new site route, card manufacturing, automatic deadlines, external communications, a live competition, or a free production build. The public website documentation can link to this canonical note. Private execution details belong in Unified Memory. Pricing is never duplicated: see `manazoid4/mazos-site/app/offers.ts`.

**Next action:** print/test *one* hand-written Proof Pass and NFC link, and trial it at a relevant founder or business network before designing software. If the first two outings produce genuine return conversations, scope the smallest software slice and request owner GO.
