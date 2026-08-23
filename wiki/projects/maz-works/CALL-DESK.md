---
type: decision
title: "Maz Works Call Desk"
created: 2026-08-23
updated: 2026-08-23
decision_date: 2026-08-23
tags:
  - maz-works
  - client-acquisition
  - windows
  - sales-operations
status: active
related:
  - "[[wiki/projects/maz-works/STATUS]]"
  - "[[2026-08-23-maz-works-codex]]"
sources:
  - "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/"
  - "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-live-calls/"
---

# Maz Works Call Desk

## Decision

Maz Works client acquisition uses a dedicated local-first Call Desk inside the existing MazOS Windows application. It is separate from JobFilter's proposed AI call-screening product. The operator remains the live caller; the application supplies research evidence, compliance gates, an honest script, notes, outcomes and follow-up state.

## Commercial loop

The Call Desk operationalises the canonical Maz Works client journey:

1. Find a public business website with a specific visible problem.
2. Save the business, public contact source and bounded homepage evidence.
3. Screen the number against TPS, CTPS and the Maz Works suppression list.
4. Make a permission-based live call that states Maz Works' identity and one verified observation.
5. Discover the business's real enquiry problem before pitching.
6. Offer a free evidence note or 15-minute screen-share.
7. If useful, offer one fixed £150 Website Rescue Sprint with agreed scope, verification and proof.
8. Record the outcome, next action and follow-up date.
9. Turn successful work into permission-based proof, a case study and a reusable pattern.

## Operator workflow

- Add a prospect with business name, phone, website, trade, area and the public source of the details.
- Run the single-homepage checker. Review the finding before repeating it; the score is a lead-research signal, not a complete audit.
- Record TPS, CTPS and internal suppression results. A call is blocked when any result is unknown or blocked, when a consent override lacks an evidence note, or when screening is older than the 28-day Maz Works operating policy.
- Open the live call screen only after the evidence and screening gate passes.
- Use the permission opener, discovery questions, evidence bridge, bounded offer, objection responses and direct close.
- Save one outcome: no answer, gatekeeper, interested, follow-up, booked, not interested or do not call.
- A do-not-call outcome immediately sets the internal suppression flag. Call writes are idempotent so a retry does not duplicate the timeline.

## Script principles

- Identify Maz Works immediately.
- Ask for 30 seconds and make it easy to decline.
- State only a finding produced and reviewed for that business.
- Ask how customers currently find the business, what action the site should drive, where enquiries fail, who owns changes and which fix matters most.
- Do not claim a comprehensive SEO, security, accessibility or performance audit.
- Do not push after a clear refusal. Add the number to the suppression list immediately when requested.

## Website checker boundary

The checker fetches only the supplied public HTTP(S) homepage. It follows at most four redirects, stops after 10 seconds, caps HTML at 1 MB and rejects credentials, localhost, private IPv4, private IPv6, mapped IPv4 and NAT64 private targets. It reports status, HTTPS, title, viewport, description, contact/form/call-to-action signals and response time.

The fetch is bounded lead research. It does not crawl the site, submit forms, bypass access controls, scan vulnerabilities or certify compliance.

## Data and privacy

Prospect data is stored in the MazOS local application data directory and excluded from Git. There is no cloud CRM sync, call recording, automated dialling, AI voice screening or automatic TPS/CTPS query.

Current UK operating boundary based on ICO guidance:

- screen live B2B marketing numbers against both TPS and CTPS and the internal do-not-call list;
- do not call registered numbers without the specific subscriber override recorded for Maz Works;
- display a callable number, identify Maz Works and provide contact details if asked;
- honour objections and withdrawals immediately;
- maintain a lawful basis and transparency where personal data is processed.

This note is an operating control, not legal advice. Re-check ICO guidance before materially changing the acquisition method.

## Delivery

- Repository: `manazoid4/mazos-ui`
- Branch: `agents/maz-works-call-desk`
- Pull request: `https://github.com/manazoid4/mazos-ui/pull/57`
- Final branch commit at delivery: `dca3158`
- Verification: TypeScript clean; 10 unit tests pass; full Playwright call flow passes; production/static desktop builds pass; authenticated backend smoke returns 200, unauthenticated returns 401 and preflight returns 204; Rust check passes; strict desktop audit has zero blockers; npm audit reports zero vulnerabilities.
- NSIS installer: `MazOS_1.0.0_x64-setup.exe`, 30,423,697 bytes, SHA-256 `12A1DC6DBDE7EE62A055D032EA42E8EF91D82CC919A75ED106C6044ACF73A3D8`.
- MSI installer: `MazOS_1.0.0_x64_en-US.msi`, 45,515,376 bytes, SHA-256 `BB17FE29318A31EAF0CB87D56DBB49CB2FF4514B529E327F3D8B9F7BB1C2F7B4`.
- Both local development installers are unsigned. Windows may show SmartScreen warnings until code signing is configured.

## Release gate

PR #57 must be reviewed and merged before treating the branch as the canonical MazOS release. The locally built installers are usable test artifacts but should not be publicly released under version `1.0.0` without code signing and the existing installed-application acceptance matrix.
