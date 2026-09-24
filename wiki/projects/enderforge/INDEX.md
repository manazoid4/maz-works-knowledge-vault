---
title: EnderForge
type: project
project: enderforge
status: scaffold-created
created: 2026-09-24
updated: 2026-09-24
tags:
  - projects
  - 3d-printing
  - calibration
---
# EnderForge

Private repository: https://github.com/manazoid4/enderforge
Scaffold PR: https://github.com/manazoid4/enderforge/pull/1
Unified memory PR: https://github.com/manazoid4/unified-memory-database/pull/7
Local workspace: C:/Users/manaz/enderforge

## Purpose

Guided calibration for faster, cleaner, repeatable prints. Prototype on the owner's Ender 5; later reusable profiles, Hermes-inspired CLI/TUI and GUI. No new bed-levelling sensor required. Guided filament changes and possible premium features are later roadmap stages.

## Current state

43-file planning scaffold, six GitHub issues, hardware/baseline worksheets, Markdown templates, benchmark protocol, cube source and Benchy provenance. No working application, new calibration print, firmware configuration or flash. Baseline speed/acceleration remain unknown.

User reports Marlin 2.0.7 and BTT SKR E3 V2; SKR Mini E3 V2.0 is provisional until board marking/MCU are checked. Marlin 2.1.2.8 was verified as the latest stable candidate; compatibility and rollback are not established.

An earlier print was cancelled after a table move and manual Z-screw rotation. Heater targets were set to zero. Logical Z8.32 was not physical position evidence. The cancelled scoop is not a benchmark.

## Next

Confirm hardware and capture firmware/settings plus slicer profile read-only. Decide firmware keep/upgrade before mechanical/first-layer checks, quality calibration and speed/acceleration experiments.

## Evidence and storage

Scaffold commit: 47a38cd. Verification: 41 Markdown files, zero broken local links/unmatched fences; diff whitespace check passed. Projects board could not be created with current token scopes; use issues.

Local Knowledge/projects/enderforge contains this status, roadmap and a tracked-source ZIP archive. That directory is also accessible through C:/Users/manaz/LocalKnowledgeVault.

Related: [[wiki/sessions/2026-09-24-enderforge-codex]]
