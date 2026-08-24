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
- Commit: `35148b0`
- Slice 1: local Tauri shell, Rust-owned SQLite, seeded lead, deterministic eligibility/opener, Call View and outcome persistence.
- Verification: `npm run build`, `npm run lint`, and `cargo check --manifest-path src-tauri/Cargo.toml` pass. Oxlint reports one non-blocking React effect warning.
- GitHub note: the empty repository was created with the feature branch as its initial default because no `main` ref existed. Do not push directly to `main`; establish the protected integration branch through the normal repository workflow before merging later slices.

## Authoritative context

- Product specification: user-provided LeadFinder v6.1 batch in session context.
- Hermes context: `C:\Users\manaz\.hermes\knowledge\ox-alpha-master-handoff-bundle.md`.
- Local project plan: `leadfinder/docs/IMPLEMENTATION_PLAN.md`.
- Local context note: `leadfinder/docs/HERMES_HANDOFF_CONTEXT.md`.

## Boundaries

- JobFilterV1 is read-only reference material and never a runtime dependency.
- Rust owns SQLite; the frontend does not use a Node database server.
- Discovery, probe, TPS/CTPS and AI advisory work must remain conservative, optional where specified, and independently testable.
- The public Maz Works site is the proof and conversion layer; LeadFinder is the private operating tool.
