# Privacy

Maz Works Knowledge Vault is a local-first, plain-Markdown system. The core vault has no telemetry or analytics.

## Stays local by default

- Vault notes, indexes, caches, and source manifests
- BM25 indexing and local retrieval
- Obsidian editing and filesystem-backed agent workflows

## Optional network use

External calls occur only when a user invokes a network-backed workflow or enables an explicit consent flag. This includes web research, URL extraction, and optional contextual retrieval. Read the selected skill before enabling egress.

## Never store

- Credentials, API keys, or authentication tokens
- Private or confidential client material
- Proprietary information without explicit permission
- Private spiritual content, including awrad, wirds, or teacher instructions

Local `.env` files and runtime credentials must remain ignored. Report accidental exposure through [`SECURITY.md`](SECURITY.md).
