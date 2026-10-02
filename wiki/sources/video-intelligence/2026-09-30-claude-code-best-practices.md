---
type: source
source_type: video
title: "Claude Code best practices | Code w/ Claude"
creator: "Anthropic (Cal, Claude Code team)"
url: https://www.youtube.com/watch?v=gv0WHhKelSE
published: Unknown
ingested: 2026-09-30
transcript: "[[.raw/transcripts/2026-09-30-gv0WHhKelSE]]"  # exact, 273 segments, ends 25:42
topics: [agents, software, ops]
projects: [maz-works-site, mazos, all-agents]
status: ingested
---

# Claude Code best practices | Code w/ Claude

**One line:** how to work with Claude Code: give it context in CLAUDE.md, plan first, make small changes checked by tests, verify with screenshots, run several sessions in parallel.
**Sponsor/affiliate interest:** none (Anthropic's own talk).

## What it teaches (structured)
- Claude Code is a plain agent loop that finds code with agentic search (grep/glob), not an index. [Shown] (04:04-05:21)
- Use Claude as a thought partner: ask for 2-3 options before building. [Creator opinion] (07:20)
- CLAUDE.md is the shared memory, in the project and home dirs, and can pull in other files with `@`. Child-directory CLAUDE.md files are not read automatically. [Shown] (10:41-11:56, 22:25)
- Permission management and auto-accept (shift-tab). [Shown] (11:56-12:38)
- Prefer well-known CLI tools (for example `gh`) over MCP servers. [Creator opinion] (13:18)
- `/clear` between tasks, `/compact` to keep long ones going. [Shown] (14:00-15:09)
- Plan first, keep a to-do list, press Escape to redirect, Escape twice to jump back. [Creator opinion] (15:09-15:46)
- Smart vibe coding: tests first, small changes, run tests/typecheck/lint, commit often. [Creator opinion] (15:46-16:28)
- Paste screenshots to guide and to debug UI. [Shown] (16:28)
- Run multiple Claudes in parallel; headless/SDK mode for CI and GitHub Actions. [Shown] (17:07, 18:24)
- "Think hard" between tool calls on newer models. [Shown] (19:39)
- Check the changelog weekly; on each new model, prune CLAUDE.md. [Creator opinion] (21:03, 23:45)
- Multi-agent coordination through shared markdown files such as `ticket.md`. [Shown] (24:24-25:01)

## Fit with our system
| Idea | Fit | Our decision |
|---|---|---|
| CLAUDE.md / AGENTS.md as shared memory | already doing | keep short; prune on each new model |
| Plan first, 2-3 options | partly | state the plan and the "done" check before building |
| Small changes + tests + commit often | already doing (`npm run verify`) | keep PR-per-batch |
| Screenshots for UI | partly | every UI change is checked at 390 and 1280 by screenshot |
| Parallel agents via shared markdown | already doing (handover docs) | keep `HANDOVER.md` as the ticket file |
| CLI over MCP | fits | use `gh`, `vercel` CLIs first |

## Actions
- [x] Standing rule for all agents added to vault CLAUDE.md (this PR).
- [ ] Prune site `AGENTS.md` at the next model change (Our inference: it is long).

## Reusable principles (kept for future agents)
- Context is the product: keep CLAUDE.md/AGENTS.md short and current; prune on new models.
- Plan and name the check that proves "done" before editing; redirect early with Escape.
- Small diffs, tests/typecheck/lint after each, commit often.
- UI work is verified with screenshots, not typechecks.
- Parallel agents share state through markdown files, not chat.
- Prefer a CLI over an MCP server when one exists.

## Unclear / not verified
- Publish date unknown; features (for example `think hard`) may have changed since.
