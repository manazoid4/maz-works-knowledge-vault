---
type: question
title: "Personal AI Model Routing Workflow"
question: "What is the best simple A-B-C workflow for Maz to maximise ChatGPT Plus while still using GPT-6 Astra?"
answer_quality: solid
created: 2026-09-05
updated: 2026-09-05
tags: [question, ai-workflow, codex, model-routing]
related:
  - "[[AI Engineering Delivery Loop]]"
sources:
  - "[[2026-09-05-gpt-5-6-sol-vs-gpt-6-astra]]"
status: current
---

# Personal AI Model Routing Workflow

## Decision

Use **Sol first, Astra at the bottleneck, Sol to finish**.

Maz's current Codex default, GPT-5.6 Sol at medium reasoning, is already the
right default. GPT-6 Astra should be a deliberate checkpoint rather than the
model that carries every turn.

## The A-B-C workflow

### A — Align with Sol

Start each task with **GPT-5.6 Sol, medium reasoning**. Ask it to:

- state the single outcome;
- read only the relevant repo and vault context;
- identify the smallest useful vertical slice;
- define acceptance checks and risky decisions.

Use one thread per task. Do not load the whole vault or repeat material already
available in project memory.

### B — Build with Sol

Keep **Sol medium** for implementation, commands, tests, ordinary debugging,
documentation, and revisions. Raise Sol to high only when the problem actually
needs deeper reasoning. Give mechanical or repetitive agent work to Terra or
Luna when available.

The execution loop is: implement a bounded slice, run the cheapest relevant
check, repair, then run the full build before completion.

### C — Check with Astra, then finish with Sol

Use **GPT-6 Astra at low or medium reasoning in a fresh review context** when:

- an architecture, security, payment, data, or launch decision has a high cost
  of being wrong;
- the task crosses several repositories or tools;
- Sol has made one serious failed attempt and needs a fresh diagnosis;
- a final independent review could catch an expensive mistake.

Give Astra the requirements, diff, test evidence, and unresolved question. Ask
for findings or a decision, not a complete regeneration of the work. Return to
Sol for routine fixes. Normally allow **one Astra checkpoint per meaningful
task**, or two for a security-sensitive release.

## Why this fits Maz's actual use

The local Codex history inspected on 2026-09-05 contained 519 prior session
logs. In the previous 30 days there were 137 logs including agent forks, using
about 0.27 GB. Across the readable recent turn contexts, about 84% used Sol and
13% used Luna. Sol-high appeared more often than Sol-medium, even though the
global default is correctly set to Sol-medium.

The account's live Plus telemetry was about 24% used in the current five-hour
window and 38% in the weekly window. A previous burst reached 95% of a
five-hour window. This means the practical pressure is bursty parallel and
high-reasoning work, rather than sustained weekly exhaustion.

Therefore:

- keep the existing Sol-medium default;
- reduce routine Sol-high use;
- route mechanical subagents to Luna or Terra;
- reserve Astra for one high-value checkpoint;
- check `/status` before a large parallel run.

## Subscription and OpenRouter rule

Use the ChatGPT Plus allowance first. Plus is separate from API and OpenRouter
billing. OpenAI's current Plus estimates are 10–100 local Sol messages versus
5–45 local Astra messages per five-hour period, with actual consumption varying
by task and context.

On the supplied OpenRouter comparison, both models have a 1.05-million-token
context window, while Astra costs five times as much per token: Sol is $2/M
input and $10/M output; Astra is $10/M input and $50/M output.

Do not make OpenRouter the normal route for personal interactive work while
Plus capacity remains. Use metered OpenRouter/API access for unattended product
automation, reproducible application calls, or valuable overflow after the
included allowance is exhausted.

## Two-week decision rule

Record the five-hour and weekly percentages at the end of substantial workdays
for two weeks. Change plan or buy credits only if work repeatedly stops at the
weekly limit after following this routing policy. A single five-hour spike is a
workflow-routing problem, not evidence that the subscription tier is too small.

## Sources

- [[2026-09-05-gpt-5-6-sol-vs-gpt-6-astra]]
- [[AI Engineering Delivery Loop]]

