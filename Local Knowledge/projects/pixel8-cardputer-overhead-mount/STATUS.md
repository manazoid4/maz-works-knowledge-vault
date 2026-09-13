---
type: project-status
project: pixel8-cardputer-overhead-mount
status: awaiting-physical-fit-results
last_verified: 2026-09-13
agent: codex
---
# Pixel8 Cardputer overhead mount

Workspace: `C:/Users/manaz/Desktop/3d Printing Stuff`. The user has only printed a screw and hole: it is tight and does not fully engage. **Do not describe the old thread as validated.**

Current authorised stage: ONE compact Ender 5 test plate, no full arm or overnight build. `TESTS/TestPlate_v1.stl` and `.step` are exported; editable `.FCStd` and Python source are preserved. 12 separate parts: frame clips A/B/C, indexed joint pair, revised joint screw/nut, short Pixel/ADV edge coupons, male/female head connector and tapered keeper.

Final bounds 159 x 106 x 20 mm, within 220 x 220 mm, minimum spacing 9.004 mm. Meshes are watertight and one connected solid per piece. STEP round-trip has 12 valid solids. Digital screw motion, opposed joint teeth, connector and keeper intersections are zero in the checked assembly. These are not physical fit or load results.

Orca estimate: 1h59m27s, 14.99 g PLA, 0.20 mm layers, 3 walls, 15% gyroid, supports off. Preferred under-90-minute time was not achieved; do not claim otherwise. Use the user's currently proven printer profile before exporting actual G-code; nearby Klipper machine files are DRAFT.

Reuse: V5 existing long screw STEP supplies unchanged thread pitch/profile, shortened for the joint. Female is directly male-derived with 10% radial enlargement and +/-0.15 mm axial flank relief; radial clearance alone failed the digital interference check. Existing v6 13.8 mm phone opening informs the short phone coupon; ADV nominal 19.6 mm informs 20.4 mm coupon. Case measurements and 20x20 extrusion assumption remain unconfirmed.

Recovered local conversation history and file inventory are documented in `TESTS/RECOVERED_HISTORY.md` and `FILE_INVENTORY.json`. Unified Memory returned unknown_project, so no session ID existed and no end call could be made. A bounded GitHub repo-name lookup found no matching mount repository. No legacy global ledger was loaded.

Durable full test-pack archive is under `Local Knowledge/projects/pixel8-cardputer-overhead-mount/TestPlate_v1-delivery.zip`, also accessible through `C:/Users/manaz/LocalKnowledgeVault`.

Next action: user prints only this plate and reports frame letter, thread engagement, joint load/cycling, real cased-phone fit, ADV controls/cable access, and connector retention/removal. No full arm until the user approves the fit results. After approval, optimise full system into one safe overnight plate if possible, otherwise two logical plates.
