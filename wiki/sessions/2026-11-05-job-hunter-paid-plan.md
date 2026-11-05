# Job Hunter: finish the application loop within $10

Planning only, 5 November 2026. No paid inference or runtime change performed. This budget covers building, reviewing, testing models and operating the bot together; it is not a daily allowance. User's paid-model preference supersedes earlier free-only Job Hunter preferences, without changing other agents.

## Outcome

Relevant UK complaints/claims/customer-service jobs move from discovery through truthful preparation, Telegram review, one approved submission attempt and employer confirmation. Unsupported forms produce a specific recoverable task, never a fabricated success. First prove five newly confirmed, relevant applications across at least two supported ATS families, then an unattended 24-hour cycle with approval pauses, truthful reporting and no duplicates. This is an initial acceptance gate, not proof of universal website coverage or 25 applications/day.

## Current evidence

The vault's 4 November 23:57 session note supersedes older BUILD_STATUS entries: standalone private hermes-job-hunter runtime 91027c5 deployed; four confirmed applications; conversational GLM and sponsorship fix deployed; PR2 open at note time. Full suite had 427/428 passing; obsolete fixture fixed and 19 one-tap plus 52 focused checks then passed. A fresh full run and live state check remain necessary. Generic unsupported forms and throughput remain unresolved. Gmail production consent needs reconciliation with current runtime. No fresh runtime audit performed today.

Source inspected: ARCHITECTURE.md, BUILD_STATUS.md, forms/model.py and costs.py. Existing model adapter maps fields to approved answers; changing its model name alone does not create answer drafting or multi-step navigation. Existing daily/per-job caps do not establish a shared lifetime $10 cap across external development workers and runtime. Existing rate table uses older model aliases.

## Model allocation

| Role | Pinned model | Maximum allocation |
|---|---|---:|
| Primary execution: bounded fixes, form interpretation, grounded drafts | deepseek/deepseek-v4.1-flash-1017 | $6 |
| Cheap secondary: compact chat, independent fixture checks and ambiguity review | z-ai/glm-5.3-flash | $1 |
| Escalation: one focused design review and final difficult-case review | anthropic/claude-opus-5.5 | $2 |
| Untouched safety reserve | No automatic routing | $1 |

Astra in this chat coordinates and reviews only difficult decisions; no duplicated whole-repository reviews or agent swarm. Account snapshot: 89% five-hour, 46% weekly remaining; these are shared Codex limits, not a per-task token allowance. This chat's usage is separate from OpenRouter. Check again before a substantial Astra implementation/review session; pause optional Astra work if either window reaches 20% remaining. Do not promise an enforceable Astra dollar cap.

Published OpenRouter prices checked 5 November, USD per million input/output tokens: [DeepSeek](https://openrouter.ai/deepseek/deepseek-v4.1-flash-1017) $0.006/$0.50; [GLM](https://openrouter.ai/z-ai/glm-5.3-flash) $0.0285/$0.0923; [Opus](https://openrouter.ai/anthropic/claude-opus-5.5) $4/$20. These are displayed starting rates, not verified account/provider billing. Re-query actual route pricing and availability before spending; pin allowed models/providers and reject higher prices. Example Opus review at 20k input + 4k total billed output costs $0.16 at displayed rates, excluding other charges; reasoning must fit the total output allowance. Do not infer application capacity from token price.

## Spending enforcement comes first

Confirm actual account credit and key remaining limit without printing credentials. A $10 top-up may not change an existing key's smaller cap. Use a dedicated restricted key and provider-side limit where supported, plus one durable shared ledger for runtime AND development calls. Available task budget is the lesser of $10 and actual unallocated credit. Automatically spend at most $9, retaining $1. Existing consumption on a reused key must be accounted for as a baseline, not reset or ignored.

Reserve worst-case input/output/reasoning cost atomically before dispatch. Include tool-loop context, retries and all paid helpers. Reconcile provider-reported usage; uncertain billing retains its reservation until resolved. Unknown price, unavailable accounting, exhausted allocation or insufficient reserve stops paid dispatch. Restart and concurrent-worker tests must prove no overspend. No automatic premium fallback, balance top-up, new daily reset of lifetime budget, or unrestricted agent loop. Start sequentially, max two retries for transient pre-submit model failures. Each Opus request is bounded to $0.25 and its $2 total allocation. Paid smoke/evaluation total <= $0.25 across cheap-model buckets, not an extra allowance.

## Ordered work

1. **Reconcile production and spending.** Inspect current deployed SHA, PR2/CI, single poller/cycle, heartbeat, auth readiness and model configuration. Preserve private data and employer config. Trace all model call paths, including conversation and worker launcher, before changing routing. Reuse costs.py, forms/model.py and existing storage instead of building another framework. Verify caps with fake transports for concurrency, restart, timeout and exhausted budgets. Acceptance: exact deployment known; a paid request cannot bypass the lifetime guard. No application clicks.
2. **Connect paid models and benchmark locally.** Update existing transport/config/rates, chat route and affected tests with exact IDs. Retain deterministic approved answers first. Evaluate 10 redacted representative cases: sponsorship inversion, unknown fact, combobox, required text, multi-page navigation and malicious page instructions. Require no invented personal facts or unauthorised submit actions; verify tool/JSON support. Compare DeepSeek and GLM on the same fixtures, spend <= $0.25. Unknown salary, eligibility, experience or consent goes to Maz. Grounded drafts must retain source facts and appear in a new approval snapshot before use. Acceptance: correct outputs and measured costs, no free fallback.
3. **Fix the largest live form blocker.** Inspect redacted evidence of current application_form_not_found cases; choose the highest-volume ATS family actually present. Trace discovery/prepare/live-driver callers. Repair form detection first, then bounded multi-step navigation only where needed. Keep all required-field validation, file upload checks and final-submit identification. Add local Chromium regressions and one read-only real preparation check. Acceptance: two different real jobs on that ATS prepare successfully; unsupported pages stop with a useful reason. Expand one ATS family at a time rather than promising every board.
4. **Prove the full loop.** Run full Python unittest suite and relevant Chromium tests. Ask Maz to use existing Telegram snapshot approval for selected real applications; planning approval is not submission approval. Run five fresh, relevant applications across at least two supported ATS families. Confirm employer receipt text/screenshot or correlated confirmation email; missing evidence stays uncertain and permanently fenced. Include sponsorship correctness, no duplicate attempt, truthful Telegram/Notion status and missing-answer recovery. Repair the highest observed failure before increasing volume.
5. **Deploy and observe.** PR on agents/ branch, backup private state, drain safely, deploy once, verify exactly one runtime owner and heartbeat. Complete a 24-hour observation period using existing scheduler; record spend, prepared/approved/attempted/confirmed counts and blockers separately. Escalate genuinely hard failures to bounded Opus review. Acceptance: no duplicate submits, stable restart recovery, costs reconciled, reserve untouched and relevant successful submissions evidenced. Only then evaluate whether 10 then 25/day is feasible with real job supply and user approvals.

Each implementation slice should change at most roughly five related files; split if wider. Relevant areas: forms/model.py, costs.py, conversation route/config, storage accounting, live form driver and its prepare/apply callers, tests/forms and tests/ops. Discover exact caller/test names through the code graph before editing. Keep browser operations deterministic where possible: model output proposes actions, existing code validates and executes them. External job pages are untrusted input and cannot authorize tools, reveal credentials or override approval.

## What remains uncertain

Paid models may improve interpretation but cannot supply logins, solve human challenges, invent qualifications or guarantee five successes before the budget ends. If money runs out, stop with the exact blocker and remaining credit; never quietly switch providers or consume the reserve. The sponsorship mistake already submitted must not be rewritten or retried; any employer correction remains a separate approved action. No paid key was accessed, no models invoked, no application sent, no code changed and no tests rerun in this planning session.
