---
date: 2026-09-06
project: maz-pocket
agent: codex
status: in-progress
---
# MAZ Pocket element14 Batch A

## What I did

- Created competition PR #36 from current main and kept PR #35 separate for selective Astra review.
- Verified element14 rules, repaired the unavailable M5GFX dependency pin, built firmware successfully, and fixed fragmented USB acceptance reads.
- Proved the physical v1.0.0 device connects over Wi-Fi to Core and renders the target surfaces. CALL run 1 returned no result; PLAN exposed a stall; live Nudge returned 503.
- Saved a reusable competition/Kickstarter workflow in unified memory and the vault.

## Files changed

- MAZ Pocket: `docs/element14/*`, `platformio.ini`, `scripts/accept-device.py`.
- Unified memory: competition/crowdfunding plan and index.
- Vault: reusable prompt, this session note, index/log/hot references.

## Decisions made

- Sol handles routine CLI/evidence/implementation; Astra selects architecture and performs final skeptical review.
- Do not merge PR #35 wholesale or expand WORK/pipelines for element14.
- Keep the repository private until secret/history and physical gates pass.
- The founder performs the final logged-in element14 submission.

## Next steps

Astra selects the exact reliability ports and resolves CALL, PLAN, Nudge and bounded YouTube/Notepad design. Sol then implements, runs physical gates, prepares assets and submission.
