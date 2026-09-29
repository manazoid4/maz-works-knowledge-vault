# YouTube video intelligence (standing workflow, Maz 29 Sep 2026)

**Trigger:** Maz sends a YouTube URL. Treat the video as a source of project intelligence, not something to summarise.
**Before any related strategic decision or new research:** search `wiki/sources/video-intelligence/` first (`_index.md` lists every ingested video by topic) so we don't repeat research.

## 1. Get the full transcript (in this order)

1. `python3 scripts/yt-transcript.py <url> .raw/transcripts/<date>-<slug>.md`: title, channel, upload date and **exact** `[mm:ss]` timestamps. Needs `pip install youtube-transcript-api`. It works on Maz's PC and for Codex locally, but YouTube blocks cloud servers (RequestBlocked).
2. If it's blocked: **Exa `web_fetch_exa`** on the video URL (set `maxCharacters` high, e.g. 200000) gives the full transcript text without timestamps; **Firecrawl `firecrawl_scrape`** gives title, channel, date and duration. Then run `python3 scripts/yt-transcript.py --from-text <file> --duration <seconds>` to add **estimated** timestamps, marked `~mm:ss`.
3. If neither returns a transcript, say so. Never summarise from the title, description or memory. A partial transcript is labelled partial, with the point where it stops.

Save the transcript in `.raw/transcripts/` (it is never edited after saving).

## 2. Understand what the creator actually teaches

Read it from beginning to end. Capture: arguments, frameworks, methods, examples, workflows, tools, prompts, automation patterns, marketing tactics, metrics and lessons, each with a timestamp.
Label every point: **[Shown]** (demonstrated or evidenced in the video), **[Creator opinion]** (claimed, not shown), **[Our inference]** (our own reading). Where the transcript is unclear, write `Unclear` rather than guessing. Note any sponsor or affiliate interest.

## 3. Connect it to our projects (check before proposing)

Read the current state first: `NOW.md`, `prompts/maz-works-niche-needs.md` (lead rules), `mazos-site/app/offers.ts` (Offer v9), `mazos-site/AGENTS.md` (positioning, no advertised AI), the memory handover and existing video notes.
For each useful idea, give: **Fit** (fits / conflicts / already doing it), **Why**, and **Action**. An action is an implementation task, experiment (with a metric and a stop date), reusable prompt, agent instruction, script, automation or change to a named project.
Areas to check: B2B/B2C marketing, lead generation, cold outreach (PECR: cold email only to a confirmed Ltd), sales systems/HubSpot, AI-agent workflows, automation, positioning, content/LinkedIn (posting rules), operations and software.
Don't copy the creator's advice blindly. Say plainly when an idea clashes with Offer v9, the positioning, the no-AI-in-the-offer rule or Lead Quality v2, and which one wins.

## 4. Save it (every video)

1. Note: `wiki/sources/video-intelligence/<YYYY-MM-DD>-<slug>.md` using the template below.
2. Add one line to `wiki/sources/video-intelligence/_index.md` under the right topic, and to `wiki/log.md`.
3. If a principle is durable, add it to the relevant rules file (e.g. niche-needs, prompt library) and link back to the note.
4. If it changes a project, open a task or PR on that project and link it from the note.
5. Commit on a branch, open a PR and merge. Commit message: `knowledge: ingest YouTube research - <video title>`.
6. Store only durable, reusable knowledge. No temporary observations, no lead names or contact details (this vault is public), and no secrets.

Reply to Maz: short, then a one-paragraph summary (what's worth doing, what we changed, what he must do).

## Note template

```markdown
---
type: source
source_type: video
title: "<video title>"
creator: "<channel / speaker>"
url: <https://www.youtube.com/watch?v=...>
published: <YYYY-MM-DD or Unknown>
ingested: <YYYY-MM-DD>
transcript: "[[.raw/transcripts/<file>]]"  # exact | estimated (~) | partial
topics: [lead-gen, outreach, sales, agents, automation, content, positioning, ops, software]
projects: [maz-works-site, leads, ...]
status: ingested
---

# <title>

**One line:** what the creator is actually teaching.
**Sponsor/affiliate interest:** <none / named>

## What it teaches (structured)
- Framework / method 1: ... [Shown|Creator opinion] (mm:ss)

## Most useful sections
| Time | What | Why it matters to us |
|---|---|---|

## Tools, prompts, metrics mentioned
- ...

## Fit with our system
| Idea | Fit (fits / conflicts / already doing) | Our decision |
|---|---|---|

## Actions
- [ ] Task / experiment (metric, stop date) → project, link to PR or issue

## Reusable principles (kept for future agents)
- ...

## Unclear / not verified
- ...
```
