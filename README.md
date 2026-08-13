# Maz Works Knowledge Vault

The shared operational memory for **Maz Works** and **Manazir Hussain**.

This vault connects project decisions, research, client work, experiments, reusable patterns, and agent handoffs across the whole Maz Works portfolio. JobFilter is one project inside it; no single product defines the vault.

## What belongs here

- Software, AI tools, automation, products, and experiments
- Verified client work and reusable delivery patterns
- Architecture decisions, project status, research, and session handoffs
- Personal working notes that support Maz Works
- Source material and generated knowledge kept with clear provenance

## Start here

- [`HOME.md`](HOME.md) — human-facing vault home
- [`wiki/hot.md`](wiki/hot.md) — current cross-project context
- [`wiki/index.md`](wiki/index.md) — shared knowledge index
- [`wiki/projects/`](wiki/projects/) — project memory
- [`wiki/sessions/`](wiki/sessions/) — durable agent handoffs
- [`skills/`](skills/) — reusable knowledge-vault skills

## Working model

```text
source or session
      ↓
project-specific note
      ↓
decision / evidence / reusable pattern
      ↓
shared index and hot context
```

The repository is plain Markdown plus small local tools. Obsidian is the primary interface, while Claude, Codex, OpenCode, Gemini, Cursor, and other compatible agents can use the same files and skills.

## Canonical identity

- **Name:** Maz Works Knowledge Vault
- **Repository:** <https://github.com/manazoid4/maz-works-knowledge-vault>
- **Local vault:** `C:\Users\manaz\Desktop\Maz Works Knowledge Vault`
- **Skill package:** `maz-works-knowledge-vault`

Do not create another general-purpose vault or describe this one as a JobFilter vault.

## Verification

Run the hermetic tooling suite from Git Bash, WSL, or another Bash environment:

```bash
make test
```

Validate the Claude Code package metadata with:

```bash
claude plugin validate .
```

## Privacy boundary

The vault is designed for one owner. Never store credentials, private client data, confidential material, or private spiritual content here. See [`PRIVACY.md`](PRIVACY.md) and [`SECURITY.md`](SECURITY.md).

## Provenance

The knowledge-vault engine began from an MIT-licensed upstream project and has been adapted into Maz Works' cross-project operating system. Original authorship and third-party licenses remain documented in [`ATTRIBUTION.md`](ATTRIBUTION.md) and [`LICENSE`](LICENSE).
