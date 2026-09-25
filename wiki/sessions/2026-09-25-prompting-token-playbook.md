---
date: 2026-09-25
project: meta
agent: claude
status: completed
---
# Prompting + token playbook

Sources: Anthropic "Best practices for Claude Code", r/ClaudeAI + r/ClaudeCode (hidden-overhead measurement, context-discipline setups), GitHub yurukusa/claude-code-token-templates, sup3x/claude-code-eco token guide, lmacan1/claude-code-hygiene. Plus your last 49 sessions (217 prompts).

## Your baseline (measured 2026-09-25)

| Signal | Value | Cost |
|---|---|---|
| Median prompt | 91 chars | fine: short is good when the goal is clear |
| "also…" inside a prompt | 38 of 217 | scope added mid-task = re-plans, half-finished work |
| "resume/continue" | 31 | sessions die mid-work (limits) → handovers matter |
| Skills in every prompt | 296 personal + plugin skills (~450 listed) + ~100 agent types | several thousand tokens **every request** |
| MCP servers | 7 personal + plugin ones; 5–6 fail to connect every start (30 s timeouts each) | slow start, noise |
| Hooks | 44 (10 SessionStart, 10 PreToolUse) | Fact-Forcing Gate fired ~15× in one EnderForge session = ~15 wasted round-trips |

Community reference: Claude Code starts at ~16–23k tokens before you type; heavy plugin/MCP setups reach 60k+. Every turn re-reads it (cached ≈ 10% price, but a cache miss or 1M-context session pays full).

## Biggest savings, ranked (do these once)

1. **Disable plugins you don't use weekly** (`/plugin`). everything-claude-code alone adds ~150 skills + ~50 agents + 5 MCP servers that fail to connect anyway.
2. **Remove dead/duplicate MCP servers** (`/mcp`): local-knowledge (times out), `reddit` (duplicate of reddit-mcp-buddy, closed), plugin github/memory/playwright/context7 (duplicates, time out). Prefer CLIs (`gh`) over MCP.
3. **Fact-Forcing Gate hook:** make it fire once per session, or only on truly destructive commands. Right now it blocks the first Bash, every new file and anything containing `rm`/`>`; each block = one full extra turn.
4. **"Code Discovery Protocol" SessionStart hook** tells every session to use codebase-memory-mcp first. Drop it unless you actually index repos.
5. **Prune skills folder**: archive skills unused in 30 days (`~/.claude/skills-archive/`). Descriptions load every request; bodies only on use.
6. `/context` once to see your real startup number; `/usage` for spend. Target: under ~25k startup.

## Per-session habits (free)

- **One goal per session.** Build → flash → calibrate = 3 sessions. `/clear` between; resume from the handover.
- **Start fresh over ~$3 or ~150k context.** Long chats cost more per step and get dumber.
- **Pick model/effort at session start** (switching mid-session breaks the cache): Opus xhigh for audits/firmware/debugging; Sonnet 5 medium for coaching steps, docs, simple edits.
- **Side questions → `/btw`** (usage, "what's X") so they don't grow context.
- **Wide searches → subagent** ("use an Explore agent to find…"), main context stays clean.
- **Don't reject a tool call to redirect.** Press Esc, then type the new goal. Rejections + re-plans double cost.
- **Give facts, not labels.** A photo/exact name beats "the Z bolt thing" (that cost a research round).
- **Queue extras** at the end: "Later (don't start yet): …" instead of "also do X" mid-task.

## Prompt templates (built from your best prompt: the firmware flash one)

**Build / feature**
```
Goal: <one outcome a user can see>.
Repo: <path>. Branch/PR rules: default.
Done = <observable proof: tests pass + URL live / device shows X / command output Y>.
Never: <risky things>. Ask before: <irreversible things>.
Report in ≤5 lines: result, proof, links, next step.
```

**Fix**
```
Bug: <what happens> vs <what should>. Exact error: <paste>.
Repro: <steps/command>. Tried: <…>.
Done = repro passes + regression test added. Smallest diff.
```

**Resume**
```
Read AGENTS.md + newest docs/handovers/*. Continue from §5 step <N>.
Stop at <checkpoint> and report. Write a handover before stopping.
```

**Research (bounded)**
```
Question: <…>. Sources: <Reddit/GitHub/docs>. Budget: ≤5 searches.
Output: table of top 5 with link + one-line "apply it by…". Then apply the top 2 to <repo/file>.
```

**Physical coach** (hardware)
```
Coach me through <task>. You do all computer work. Give me one physical step at a time, ≤3 lines, wait for my report. Never guess devices; back up before writing; stop on any mismatch.
```

## What makes output "working products", not docs

- Every prompt names **Done = proof** (tests, live URL, device reading). Without it, agents drift into planning docs.
- Ask for the **smallest end-to-end slice first** (e.g. `ef status` live before 10 commands).
- End every session: "handover + vault". Next agent starts in 1 minute instead of 20.
