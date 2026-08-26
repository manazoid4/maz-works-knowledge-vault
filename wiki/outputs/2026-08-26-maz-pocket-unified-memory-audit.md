---
date: 2026-08-26
type: audit
status: completed
projects: [maz-pocket, leadfinder, unified-memory, maz-works]
agent: codex
---
# MAZ Pocket, LeadFinder, and unified-memory audit

## Executive verdict

The last large body of work is a sequence, not one session: LeadFinder on
24 August, MAZ Pocket WORK/physical verification on 25 August, then MAZLATEST,
direct-flash recovery, and unified-memory scaffolding on 26 August.

MAZ Pocket's local portal is not wholly absent: it resolves, renders, and
unlocks with the active installed credential. The user-visible system is still
functionally broken because no AI route can complete a live turn, the saved
route is CLOUD rather than MAZLATEST, a stale repo credential looks like a
pairing failure, and the portal has not passed sustained reconnect/load tests.

## Live findings

| Surface | Result | Meaning |
|---|---|---|
| Device `/api/status` | 8/8 HTTP 200 | Firmware and Wi-Fi HTTP server are alive |
| Installed token | unlock + protected screen 200 | Active device credential works |
| Repo token | protected screen 401 | Checked-out `.env` is stale |
| Pairing UX | 43-character credential | Secure enough underneath, unusable as human pairing |
| Saved route | CLOUD (`2`) | User expectation of MAZLATEST does not match device state |
| MAZLATEST | 503 | 9router combo contains two retired models |
| CLOUD | 500 | upstream 404 escapes through `raise_for_status()` |
| LOCAL | 503 | configured llama.cpp server unavailable |
| AUTO | 500 | local failure falls to the same unhandled cloud failure |
| Direct current model probes | 401 | Core/router credential contract is also stale or invalid |
| Browser | renders desktop/mobile; one reset in repeated fresh contexts | needs load/reconnect soak and clearer mobile layout |
| Host tests | pass, warnings only | regression suite misses real provider/config integration |

The reported `2 + 2 -> 5` is treated as an accepted-answer correctness defect,
but it cannot be replayed now because transport/provider routing fails first.
Future smoke checks must validate the normalized answer is `4`, not merely
accept HTTP 200.

## LeadFinder and Maz Works marketing

The SQLite crash fix landed and `npm run build` passes. Five audited P0s remain:
safe header-mapped discovery/import, five persisted evidence passes, fail-closed
eligibility, truthful opener/50-site gate, and restart-safe calling workflow.
Until those pass, Maz Works marketing may accurately describe LeadFinder as an
audited local-first prototype under active development, not a production-ready
or legally callable lead engine.

## Unified-memory audit

Before this pass the repository contained only `README.md` and a large
`LEDGER.md`; its promised `spine/` did not exist, no harness loaded it, and the
local compiled knowledge graph did not retrieve the newest Pocket/LeadFinder
sessions. The vault's `hot.md` and `index.md` were also stale.

The target organization is now:

1. small root index;
2. per-project current status;
3. cross-project topic contracts;
4. bounded GSD plans and current state;
5. date-partitioned immutable evidence;
6. vault links for long-form canonical context.

This improves organization but is not yet full integration. Harness adapters,
append/query API, conflict handling, automated staleness/indexing, link/secret
checks, and cross-agent UAT are still missing.

## GSD roadmap

The recovery follows Discuss -> Plan -> Execute -> Verify -> Ship:

1. contain errors and add effective-route diagnostics;
2. restore MAZLATEST plus an independent fallback;
3. replace raw-token entry with short-code pairing and soak the portal;
4. run guarded physical COM verification when the expected device appears;
5. add deterministic, evidence-bound AI refinement and structured memory saves;
6. wire selective unified-memory adapters across harnesses;
7. execute LeadFinder's remaining P0s;
8. clean-install, soak, recovery, and rollback release UAT.

Detailed plan: `C:\Users\manaz\unified-memory-database\plans\2026-08-26-maz-pocket-reliability-and-memory-roadmap.md`.

