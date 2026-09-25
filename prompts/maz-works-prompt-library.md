# Maz Works prompt library

Copy-paste prompts for Claude Code / Codex / any agent. Each is self-contained.
Built 2026-09-25 from the live repos (mazos-site `main` @ 9e0ebc9, leadfinder @ d2e2c1b).
In Claude Code the starred ones are also slash commands: `/mw-next`, `/mw-leads`, `/mw-pitch`, `/mw-demo`, `/mw-quickwin`, `/mw-post`.

## Facts every prompt relies on (update here first if they change)

- **Offer (mazos-site `app/page.tsx` OFFERS):** £0 first step (problem → direction before commitment) · **Quick Win £150 fixed** (£75 start / £75 on completion, one agreed change, not a rebuild) · **Website Launch from £299** (scope + fixed price agreed first) · **Growth System from £499** (site/journey + one automation) · **Support from £49/month** (no long contract).
- **Physical:** Maz Works Objects "Touch" 3D-printed tap stands (Touch One, Touch Three, Touch + Carry) that open reviews/menu/bookings/socials; £10 artwork option. Route `/3d-printing`. Printed on the owner's Ender 5.
- **Positioning (live hero):** "Stop losing time and enquiries to jobs done by hand." Direct with the builder, fixed scope and price, see the direction first.
- **Contact:** manazoid4@gmail.com (site form posts via formsubmit to this address). Live site https://mazos-site.vercel.app.
- **Proof:** Scrap Finance Partners (https://scrap-finance-partners.vercel.app), JobFilter (https://jobfilter.uk), Dessert Lane demo (private), Agent Nudge, MAZ Pocket.
- **Tools:** LeadFinder (`C:\Users\manaz\leadfinder`, Tauri desktop, `npm run tauri dev`, SQLite, Google Maps discovery via Gosom, tech detection via httpx/wappalyzergo, demo configs in `public/demo-configs/*.json`, route `#/demo/<slug>`).
- **Market ammo (verified 23 Aug 2026):** GoDaddy UK web design 6–8 weeks, price behind a call · Yell subscription lock-in, no public price · Fiverr Trustpilot 2.3/5 (14,838 reviews) · UK micro-agency floor ~£825–£995.
- **Privacy:** the vault repo is PUBLIC. `leads/` and `clients/` are git-ignored, local only. Never put client data, logins or lead lists anywhere else in the vault; never write passwords into any file (use a password manager and say where they are).
- **Rules:** never promise % results before seeing the problem; never invent testimonials or client names; branches + PRs, never push to main; no secrets in repos.

---

## A. Run the business

### ★ A1 — Start of day / "what next" (`/mw-next`)
```
You're my Maz Works operator. Read C:\Users\manaz\Desktop\Maz Works Knowledge Vault\NOW.md and the newest file in that vault's wiki/sessions/ mentioning "maz-works".
Tell me in ≤5 lines: the single highest-value task for the next 90 minutes (prefer anything that gets a paying client closer), why, and the exact first command or action.
Then do the computer-side part yourself. Ask me only for things only I can do (calls, filming, sending from my own accounts).
Done = one NOW.md checkbox ticked with proof, or a clear blocker written to NOW.md.
```

### A2 — Weekly review (Fridays, 20 min)
```
Maz Works weekly review. Sources: NOW.md in my vault, `gh pr list` + `gh issue list` for manazoid4/mazos-site, manazoid4/scrap-finance-partners, manazoid4/leadfinder, and `ccusage weekly`.
Output a one-screen table: shipped this week (with links) · leads contacted / replied / demos / paid (ask me for the counts if not in the vault) · AI spend · stuck items.
Then propose next week's top 3 (max) and update NOW.md. No essay.
```

### A3 — End-of-session handover
```
Write a handover before we stop: what changed (files, PRs, links), proof it works, what's half-done, the exact next step, any risk. Save it as a dated note in the vault wiki/sessions/, tick NOW.md, push the vault. ≤25 lines.
```

---

## B. Win clients

### ★ B1 — Find 20 qualified leads (`/mw-leads <niche> <town>`)
```
Goal: 20 UK small businesses in <NICHE> around <TOWN> that are losing enquiries online and could buy a Quick Win (£150), Website Launch (from £299) or a Touch stand.
Use LeadFinder (C:\Users\manaz\leadfinder) if it runs; otherwise public search + each business's own site/Google profile.
For each lead capture: name, site URL, Google rating + review count, the ONE specific leak you can see (e.g. no booking link on mobile, contact form 404s, no reviews link, menu is a PDF, site not HTTPS), evidence (URL + what you saw), best-fit offer.
Skip chains/franchises and businesses with a clearly recent agency site.
Done = CSV at C:\Users\manaz\Desktop\Maz Works Knowledge Vault\leads\<date>-<niche>-<town>.csv with 20 rows, every leak backed by evidence. Report the top 5 in chat.
Never contact anyone. Never invent a problem you didn't observe.
```

### ★ B2 — Personal pitch for one lead (`/mw-pitch <url>`)
```
Lead: <URL>. Inspect the live site on mobile width (390 px) and desktop, plus its Google profile if public.
Find the single most expensive leak (lost bookings/enquiries/reviews). Be specific: where, what happens, why a customer gives up.
Write:
1) A cold email (≤110 words, subject ≤6 words, no hype, no "I hope this finds you well") that names the leak, offers the £0 first step: "I'll show you the fixed version working before you pay anything", and gives one fixed price (usually Quick Win £150).
2) A LinkedIn/Instagram DM version (≤50 words).
3) A 45-second screen-recording script showing the leak and the fix idea.
Done = all three in C:\Users\manaz\Desktop\Maz Works Knowledge Vault\leads\pitches\<business-slug>.md. Don't send anything.
```

### ★ B3 — Build the free demo (`/mw-demo <url>`)
```
Goal: a near-working demo of the fix for <BUSINESS> (<URL>) that I can show on a call within 2 hours of work.
Scope: fix the one leak from their pitch file (leads/pitches/<slug>.md) if it exists; otherwise pick the biggest mobile enquiry/booking leak.
Build: a single static page (Next.js or plain HTML) using their real name, services and public info, with a clear enquiry/booking route. Mark it clearly "Demo by Maz Works, not the live site" and noindex. No invented reviews, prices or claims.
If LeadFinder demo configs fit, add public/demo-configs/<slug>.json there instead.
Deploy a Vercel preview (or give me the local command) and check it at 390 px and 1280 px.
Done = working URL + 3 screenshots + a 60-second walkthrough script (before → after → price → next step). Save the notes to leads/pitches/<slug>.md.
```

### B4 — Follow-up after a demo (3 touches)
```
Business: <NAME>. Demo link: <URL>. Offer discussed: <OFFER + PRICE>. What they said: <NOTES>.
Write 3 follow-ups: day 2 (recap + one-click yes), day 6 (one new useful observation about their site), day 14 (polite close-out, door open).
Each ≤80 words, plain text, no pressure tactics, no fake scarcity. Save to leads/pitches/<slug>.md.
```

### B5 — Fixed-price proposal from call notes
```
Call notes: <PASTE>. Turn this into a one-page fixed-price proposal using only these tiers: Quick Win £150 (£75 start, £75 on completion) · Website Launch from £299 · Growth System from £499 · Support from £49/month · Touch stand if physical.
Sections: the problem (their words) · what I'll deliver (bullets, testable) · not included · price + payment split · timeline in days · what I need from them · how we'll know it worked (a measurable check, not a % promise).
≤350 words. Save as Markdown in the vault clients/<slug>/proposal.md and also give me an email-ready version.
```

---

## C. Deliver

### ★ C1 — Quick Win £150 (`/mw-quickwin <client> <change>`)
```
Client: <CLIENT>. Agreed change: <ONE CHANGE>. Access: <repo/hosting/CMS>.
1) Record before-state: screenshots at 390 px and 1280 px + the exact broken behaviour.
2) Make only the agreed change on a branch. Smallest diff.
3) Verify: build passes, the change works on mobile + desktop, nothing else changed (list files touched).
4) Before/after pack for the client: 2 screenshots each side + 3-line summary in plain English.
Done = PR link (or deploy link) + before/after pack in clients/<slug>/quickwin-<date>.md + reminder to invoice the second £75.
Never touch DNS, payments or email settings without my explicit OK.
```

### C2 — Website Launch (from £299)
```
Client: <CLIENT>. Approved demo: <URL>. Content from client: <PATH/LINK>.
Build the production site from the demo: real content only (flag gaps as TODO, never invent), clear enquiry route that actually delivers to the client (test it end to end), basic SEO (title/description/OG), accessibility pass, Lighthouse mobile ≥ 90 perf/SEO/accessibility.
Done = production URL + enquiry test proof (screenshot of received message) + handover checklist (where logins are kept — never the passwords themselves, domain steps, how to edit) in clients/<slug>/handover.md.
Domain/DNS changes: prepare exact steps for me; don't apply them yourself.
```

### C3 — Growth System (from £499): enquiry follow-up automation
```
Client: <CLIENT>. Where enquiries arrive now: <FORM/EMAIL/WHATSAPP>. What goes wrong: <e.g. replies take 2 days>.
Design + build ONE workflow: capture → instant acknowledgement to the customer → notify the owner → log to a simple sheet/CRM → reminder if unanswered in 24 h.
Use tools the client already pays for where possible. No secrets in repos. Test with a fake enquiry end to end.
Done = diagram (5 boxes) + working test run with timestamps + 1-page owner guide + what it costs them monthly (should be £0–£10).
```

### C4 — Support (£49/month) monthly report
```
Client: <CLIENT>, site <URL>. Check: uptime/HTTPS, form still delivers (send a test), broken links, Lighthouse mobile, any content they asked to change.
Write a 6-line monthly report: what I checked, what I fixed, anything they should know, next month's one suggestion. Save to clients/<slug>/support-<yyyy-mm>.md.
```

### C5 — Case study from finished work
```
Project: <NAME> (repo <REPO>, live <URL>). Using only facts from the repo, the live site and my notes (<NOTES>), write:
- 3-line case study for mazos-site (problem → what I built → what changed)
- a 120-word LinkedIn post version
- alt text for 2 screenshots.
No invented metrics or quotes. If the client hasn't approved being named, write it as "a UK scrap-finance consultancy" style and flag it.
```

---

## D. Get seen (LinkedIn + site)

### ★ D1 — LinkedIn post from real work (`/mw-post`)
```
Look at what I actually shipped in the last 7 days: `gh search commits --author manazoid4 --committer-date ">=<DATE>"` or git logs for mazos-site, enderforge, leadfinder, scrap-finance-partners, plus the vault NOW.md.
Pick the ONE most interesting real thing for small-business owners. Write a LinkedIn post: hook line (claim or tension, ≤12 words), 10–15 short lines, one concrete detail, bridge to "measure, fix, prove" / "see it working before you pay", end with a question. No hashtag spam (max 2), no link in the post; put mazos-site in the first comment.
Also give a 30-second vertical video version (shots + burned-in caption lines) if there's footage.
Save to the vault wiki/sessions/<date>-linkedin-draft.md.
```

### D2 — Turn raw footage into a video post
```
I filmed: <LIST CLIPS + LENGTHS>. Topic: <WHAT HAPPENED>. Use the rules in C:\Users\manaz\Projects\maz-works-linkedin-video-pack.md (9:16, captions burned in, hook in 3 s, native upload, link in first comment).
Give: edit list with timecodes (≤60 s unless it's a story), caption lines (2–3 words each), post caption (10–20 lines, ends with a question), first comment. Only real numbers.
```

### D3 — Ship a homepage improvement to mazos-site
```
Repo C:\Users\manaz\Projects\mazos-site. First: `git fetch && git switch main && git pull`, read AGENTS.md (Next.js version warning), DESIGN.md and CLAUDE.md.
Change: <ONE CHANGE, e.g. "make the £0 first step the primary CTA above the fold on mobile">.
Branch agents/<slug>. Smallest diff. Keep existing copy/prices unless the change is about them.
Verify with `npm run verify` (typecheck, build, tests, smoke) and a 390 px screenshot.
Done = PR link + screenshot + verify output. Don't merge.
```

### D4 — Clear the mazos-site PR backlog
```
Repo manazoid4/mazos-site has open PRs (as of 2026-09-25: #22 old client pitch, #25 dependabot, #36 LinkedIn context pack, #37 enquiry recovery, #41 shipped products, #42 enquiries before scripts load). main already has #40 "land the current customer path".
For each: is it already in main, superseded, or still needed? Rebase-check the needed ones (`gh pr checks`, local `npm run verify`).
Output a table: PR → keep/merge/close → reason. Close only the clearly superseded ones with a comment; ask me before merging anything.
```

---

## E. Physical products (Touch stands, printer)

### E1 — Touch stand order → print checklist
```
Order: <BUSINESS>, product <Touch One/Three/+ Carry>, links <REVIEW/MENU/BOOKING URLs>, artwork <yes/no>.
1) Check every link opens the right page on a phone (no login walls, correct Google review URL format).
2) Write the NFC tag contents + a QR fallback for each tap point.
3) Print checklist for the Ender 5: model file, PLA colour, settings from the EnderForge ledger's latest passing profile, expected print time.
4) Customer card text (≤40 words: tap here to …).
Save to clients/<slug>/touch-order.md.
```

---

## How to write new prompts (keep this shape)
```
Goal: <one outcome someone can see>.
Context: <paths/links/facts; paste, don't assume>.
Done = <proof: URL / screenshot / test output / file path>.
Never: <risky things>. Ask before: <irreversible or outward things>.
Report: ≤5 lines, links first.
```
