# Roadmap

These are delivery stages, not promised dates. Only the initial documentation scaffold is complete.

| Stage | Deliverable | Exit evidence |
|---|---|---|
| 0 — Inventory | Confirm Ender 5 board, firmware, sensors, extruder, nozzle and current limits; save baseline | Reviewed hardware record, settings export and rollback material |
| 1 — Firmware decision | Compare staying on 2.0.7 with a correctly configured stable Marlin build | Written keep/upgrade decision; if upgrading, reviewed config, reproducible build, recovery route and supervised checks |
| 2 — Mechanical baseline | Frame/bed alignment, smooth motion, homing, tramming and usable first layer | Mechanical checklist and first-layer results; no speed tuning before this gate |
| 3 — Quality tuning | Extrusion, temperature, flow, retraction and cooling | Targeted tests reduce blobs/stringing; selected settings have evidence |
| 4 — Performance tuning | Acceleration and speed sweeps within motion and extrusion limits | Matched cube/Benchy runs show time savings without exceeding agreed quality limits |
| 5 — CLI/TUI prototype | Read-only connection through first complete guided calibration/report flow | Owner completes a resumable session with no hidden commands |
| 6 — Complete MVP | GUI parity, reusable profiles, export, error recovery and packaged install | Same workflow passes in CLI and GUI, plus simulated failure tests and physical prototype validation |
| 7 — Filament workflow | Guided material-specific unload/load/purge and recovery | Validated standalone flow; mid-print changes require explicit firmware support and position preservation |
| 8 — Wider beta | Additional printers, compatibility matrix, docs and user feedback | Independent users reproduce calibration and understand limits |
| 9 — Premium exploration | Optional advanced comparisons, fleet/history or support services | Evidence of demand, licensing review and a clear free/premium boundary |

Dependencies: inventory before firmware; stable mechanics before useful benchmarks; proven physical procedures before automation; shared engine before GUI parity. Firmware upgrade is not a prerequisite if current firmware safely supports the required steps.
