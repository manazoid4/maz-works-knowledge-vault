---
date: 2026-09-05
project: ai-model-routing
agent: codex
status: completed
---

## What I did

- Compared GPT-5.6 Sol and GPT-6 Astra using the supplied OpenRouter page and current OpenAI sources.
- Inspected bounded local Codex session statistics, model selection, reasoning levels, and live Plus limit telemetry.
- Designed and saved a personal A-B-C workflow for future AI work.

## Files changed

- `wiki/sources/2026-09-05-gpt-5-6-sol-vs-gpt-6-astra.md`
- `wiki/questions/personal-ai-model-routing-workflow.md`
- `wiki/sessions/2026-09-05-ai-model-routing-codex.md`
- `wiki/index.md`
- `wiki/log.md`

## Decisions made

- Keep GPT-5.6 Sol at medium reasoning as the default.
- Use GPT-6 Astra for one high-value bottleneck or independent review, then return routine fixes to Sol.
- Route mechanical agent work to Luna or Terra and reduce routine Sol-high usage.
- Use the included Plus allowance before paying separately for OpenRouter or API usage.

## Next steps

- Follow the workflow for two weeks and observe five-hour and weekly usage through `/status` or the usage dashboard.
- Revisit subscription or credit purchases only if weekly limits repeatedly stop valuable work.

