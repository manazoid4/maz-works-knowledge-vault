---
date: 2026-09-08
project: mazos-site
agent: codex
status: completed
---
# Maz Works Objects launch

## What I did

- Built and launched the Maz Works Objects Touch collection at `/3d-printing`.
- Added three shared-price bundles, original concept visuals, an interactive destination demonstration, a progressive enquiry flow, accurate NFC FAQs, and manufacturing handover notes.
- Added homepage, shared navigation, footer, metadata, and sitemap discovery while preserving the digital-service experience.
- Fixed a Next.js security advisory and a submit-time intended-use validation issue found during CI and PR review.
- Merged [PR #23](https://github.com/manazoid4/mazos-site/pull/23) and verified the production route.

## Files changed

- `app/3d-printing/`
- `public/objects/`
- Homepage, shared chrome, sitemap, design documentation, repository handoff, package manifest, lockfile, and tests
- Unified memory project status and dated evidence ledger

## Decisions made

- Product imagery remains visibly labelled as concept visuals until physical prints exist.
- Pricing has one code source: Touch One £29, Touch Three £49, Touch + Carry £79, with a £10 artwork add-on.
- Existing FormSubmit delivery remains the enquiry transport; link fields are optional and no live test messages were sent.
- Physical claims remain bounded pending PLA, Ender 5, fit, retention, NFC, QR, delivery, and timing verification.

## Next steps

- Print and NFC-test one Touch Three prototype.
- Record confirmed material, geometry, tag, QR, delivery, and timing evidence.
- Replace or supplement concept visuals with first-party product photographs after testing.
