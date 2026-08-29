---
date: 2026-08-29
project: leadfinder
agent: codex
status: completed
---
## What I did

- Removed the storage/discovery/qualification P0 blockers without deleting existing outcomes.
- Rebuilt SQLite around a transactional schema v2, optional phone, strong dedupe, persisted five-pass evidence, research, partner/referral, and model-cache tables.
- Added RFC 4180 Gosom/CSV ingestion, separate public-web discovery, ProjectDiscovery httpx/wappalyzergo scanning, supplied preview-app rejection, and 9router-only capped/cached model calls.
- Ported Konva's MIT directional Sobel emboss, passed the standalone render gate, added two config-driven templates, and published the real RFID Wallets UK demo.
- Added the lead pipeline, editable opportunity/solution/next-action/template/demo fields, fixed manual outreach, and the deliberately small partners view.
- Rejected Paarsa Wahid after live Easify detection; used RFID Wallets UK as the qualifying real demo lead.

## Files changed

- LeadFinder commit `d2e2c1b` on `agents/leadfinder-slice-1`.
- Core: `src-tauri/src/{database,ingest,cloud,research,lib}.rs`.
- UI/demo: `src/App.tsx`, `src/DemoPage.tsx`, `render-gate/engraving.js`, `public/templates/`, `public/demo-configs/`.
- Evidence: `RESULTS.md`, `THIRD_PARTY_NOTICES.md`, `README.md`.

## Decisions made

- DM/demo workflow is now usable, but live cold calling remains NO-GO.
- Manual sends only; contact remains locked until all five channel-specific evidence passes exist.
- Paarsa Wahid is not a valid demo target while Easify is installed.
- The stable published demo URL is `https://leadfinder-tan-seven.vercel.app/#/demo/rfid-wallets-uk`.
- No raw HTML enters a model; deterministic site signals stay at or below 2KB.

## Next steps

- Confirm RFID Wallets UK's public DM path and remaining evidence passes, then Maz sends the fixed message manually and records the outcome.
- Run the first Gosom Template 2 campaign and add another real demo config without component changes.
