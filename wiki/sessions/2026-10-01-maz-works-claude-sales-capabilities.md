---
date: 2026-10-01
project: maz-works
agent: claude
memory_session: mem_20261001t225245_961ec1a6
---
# Maz Works sales capabilities set up (Claude)

- Added `/mw-council` skill (`~/.claude/skills/mw-council`): five-lens sales review, evidence vs hypotheses, one recommendation. Verified loads; first run done.
- Removed retired prices from `/mw-leads`, `/mw-pitch`, `/mw-quickwin` (local `~/.claude/commands`); prompt library terms fixed (half-now-half-later retired).
- Guide + capability index: [[SALES-OPERATING-GUIDE]].
- Blockers needing Maz: Gmail OAuth, HubSpot re-auth, X RapidAPI key (paid), Reddit API 403.
- Council verdict: open top-5 Gold with a question about their week + £195 Starter framed as connecting tools they already pay for; Maz contacts all 5 by Fri 3 Oct.
- Open fixes: offers.ts L254/L263 "pay the rest" wording; stale private delivery kit (£29, £395/£595 repair).
- Next: agent identifies each Gold lead's existing software (10 min each) and rewrites the 5 openers in private `leads/`.
