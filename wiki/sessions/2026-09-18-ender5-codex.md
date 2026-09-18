---
date: 2026-09-18
project: ender5
agent: codex
status: completed
---
## What I did
Read-only live check through OctoPrint at http://127.0.0.1:5000. Profile Maz_Endr5_26, COM7 at 115200 baud, Operational, ready, no errors, no active or selected job. Nozzle 18.67 C and bed 18.83 C; both targets zero.
## Files changed
This session note and its Local Knowledge copy.
## Decisions made
Use OctoPrint for printer checks. Windows service OctoPrint5000 uses C:/OctoPrint/basedir/5000; API credential is in its config.yaml and must never be copied into notes. Read-only GET /api/printer, /api/job, /api/connection verified the status. Old Klipper dashboard on port 8080 is unconfigured (missing mcu serial) and does not reflect the active OctoPrint connection. No printer controls or configuration were changed. Unified Memory start returned unknown_project:printer, so no session ID was available.
## Next steps
Future status checks should query OctoPrint directly. Idle status does not establish physical print quality.

## Follow-up: last overnight job
Checked /api/files?recursive=true, octoprint.log and serial.log at about 11:15 BST. OctoPrint log first connects at 02:20 on 2026-09-18 and reports Operational; no Printing, PrintDone, PrintFailed, Finishing or Cancelling events. Uploads directory is empty. API lists eight SD-card files but no print history or last-job metadata. Serial communication logging was disabled. Cannot establish which SD file ran last or whether it completed successfully. Current idle/cold status alone is not proof of completion.
