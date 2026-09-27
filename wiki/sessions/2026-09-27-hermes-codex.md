---
date: 2026-09-27
project: hermes
agent: codex
status: completed
---
## What I did
- Started the local maz-abliterated model for the maz-local-abliterated Hermes profile through the installed Bionic/LM Studio runtime. A local chat completion returned READY.
- On user request, unloaded maz-abliterated and stopped the local API server on port 1234. lms ps confirmed no loaded models.
- Waited 10 seconds, then sampled resource usage: GTX 1660 Ti GPU 11%, VRAM 1625/6144 MiB, 47 C, 9.70 W; i7-10750H CPU 2%; RAM 20.33/39.86 GiB used (51%), 19.54 GiB free.
## Files changed
- Session note and matching Local Knowledge inbox note only. No Hermes configuration changes.
## Decisions made
- Leave the model unloaded and API server stopped per the latest user instruction.
- Unified memory startup returned unknown_project:hermes; no session ID was issued.
## Next steps
- None. The model remains stopped.
