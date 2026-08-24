---
type: project
title: "LeadFinder"
created: 2026-08-24
updated: 2026-08-24
tags:
  - maz-works
  - leadfinder
  - client-acquisition
  - windows
status: active
---

# LeadFinder

LeadFinder is the standalone Maz Works local-first lead discovery, qualification and calling workstation. It is deliberately separate from JobFilterV1, MazOS and the public `mazos-site`.

## Delivery state

- Repository: `https://github.com/manazoid4/leadfinder`
- Feature branch: `agents/leadfinder-slice-1`
- Latest audit-plan commit: `cfe7b6b`.
- Independent product, technical, GUI, and judge audits returned **NO-GO for V1**. The installed build is a prototype and must not be used for live cold calling.
- P0 runtime failures: SQLite seed SQL prevents database-backed commands; installed Gosom is resolved from the wrong resource path; Gosom CSV fields are mapped positionally and incorrectly; five-pass evidence and TPS/CTPS eligibility do not exist; the call loop and responsive GUI are incomplete.
- Build status: `npm run build` passes. `cargo test` compiles but runs zero tests, which is a blocking test gap rather than validation.
- Authoritative audit/repair plan: `leadfinder/docs/V1_AUDIT_AND_PLAN.md`, `leadfinder/tasks/plan.md`, and `leadfinder/tasks/todo.md`.
- Local package remains at `C:\Users\manaz\leadfinder\src-tauri\target\release\bundle\nsis\LeadFinder_0.1.0_x64-setup.exe`; do not treat its presence as release readiness.
- GitHub note: the empty repository was created with the feature branch as its initial default because no `main` ref existed. Do not push directly to `main`; establish the protected integration branch through the normal repository workflow before merging later slices.

## Authoritative context

- Product specification: user-provided LeadFinder v6.1 batch in session context.
- Hermes context: `C:\Users\manaz\.hermes\knowledge\ox-alpha-master-handoff-bundle.md`.
- Local project plan: `leadfinder/docs/IMPLEMENTATION_PLAN.md`.
- V1 audit and release gates: `leadfinder/docs/V1_AUDIT_AND_PLAN.md`.
- Local context note: `leadfinder/docs/HERMES_HANDOFF_CONTEXT.md`.

## Boundaries

- JobFilterV1 is read-only reference material and never a runtime dependency.
- Rust owns SQLite; the frontend does not use a Node database server.
- Discovery, probe, TPS/CTPS and AI advisory work must remain conservative, optional where specified, and independently testable.
- The public Maz Works site is the proof and conversion layer; LeadFinder is the private operating tool.
- Local AI is advisory only: Maz Fast may plan bounded queries with deterministic fallback; Maz Smart may review captured discrepancies but cannot complete verification, change eligibility, or select an opener.
