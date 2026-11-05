# Usage status — 5 November 2026, approximately 16:26 UK

Read-only check. No paid inference, key changes, limit increases, top-ups or resets performed.

| Service | Verified remaining | Reset / qualification |
|---|---|---|
| Codex five-hour window | 98% (2% used) | 5 November 21:01:37 UK |
| Codex weekly window | 32% (68% used) | 10 November 16:45:32 UK |
| Codex purchased credits | 0 | Plus plan; ordinary usage allowed |
| Codex reset credits | 0 | No reset redeemed |
| OpenRouter account | $11.739382444 | $17 total credit less $5.260617556 total usage |
| OpenRouter Hermes key | $2 remaining under a $2 limit | Usage $0; no automatic limit reset |
| OpenRouter older MAZ Core key | $0 remaining under a $5 limit | Usage $5.061471239; no automatic limit reset |
| Local router paid allowance | GBP0/day; recorded today GBP0 | Local policy/ledger, not a provider balance |
| OpenCode Go via local router | Remaining allowance unknown | Recorded GLM-5.2 usage: $0.008 last 5h, $0.058 last 7d/30d; excludes other clients |
| Unjailed Telegram chat | Balance/remaining allowance unverified | Bot source uses glm-5.3-abliterated directly at Unjailed, not OpenRouter |
| Other configured providers | Live balances unknown | Router has static quota descriptions but no observed live limit headers; not evidence of remaining credit |

Both accessible OpenRouter keys returned the same account totals; do not add their balances together. The $11.74 account balance is not the Hermes key allowance: the currently configured Hermes key can spend at most its remaining $2. A top-up does not imply that a key limit was raised. The older key is exhausted. This task did not change either limit. The owner-authorized Job Hunter project budget remains $10 total even though the account holds more.

Codex percentages are account-wide, not specific to this chat or Astra, and are not tokens or dollars. Compared with the earlier snapshot, the five-hour window reset while weekly usage rose from 54% to 68%; that increase cannot be attributed solely to this chat.

Bot usage table today records 2 calls labelled openai/gpt-6-luna, 3,854 input+output tokens and $0.000741. This is local telemetry, not an independent provider bill or proof of the underlying routed model. Conversation code discards its returned usage, so that table does not account for Unjailed Telegram chat costs. No complete shared lifetime ledger has been implemented yet.

The planned paid DeepSeek/GLM/Opus OpenRouter combination and $10 shared enforcement are not yet configured. Current conversational Telegram uses an existing Unjailed credential; its spend is separate from OpenRouter. No paid model calls were made for this status check or the preceding dashboard implementation. Background agents may spend independently.

Operational snapshot: Telegram and cycle tasks Running; heartbeat 16:25:22. This proves activity, not successful job applications or available provider capacity. Chrome and watchdog scheduled tasks Ready rather than Running; that state alone does not establish browser failure.

Methods: Codex live usage tool; authenticated read-only OpenRouter [current-key](https://openrouter.ai/docs/api/api-reference/api-keys/get-current-api-key) and [credits](https://openrouter.ai/docs/api/api-reference/credits/get-remaining-credits) endpoints; local router quota command; read-only aggregate bot telemetry. Keys were used only against their provider and never printed. No Claude subscription balance, other-device keys, phone rendering or provider inference was tested.
