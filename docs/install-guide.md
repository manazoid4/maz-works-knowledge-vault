# Maz Works Knowledge Vault — Install and recovery guide

Canonical repository: <https://github.com/manazoid4/maz-works-knowledge-vault>

This guide is for Manazir Hussain's Maz Works environment. It restores the shared vault, Obsidian registration, and cross-agent skill links without creating another general-purpose vault.

## Clone or recover

```powershell
git clone https://github.com/manazoid4/maz-works-knowledge-vault.git "C:\Users\manaz\Desktop\Maz Works Knowledge Vault"
```

Open `C:\Users\manaz\Desktop\Maz Works Knowledge Vault` as the vault in Obsidian.

## Git remotes

The active writable remotes should point at Maz Works. The MIT-licensed foundation remains available as `upstream` for provenance and selective updates.

```powershell
git remote set-url origin https://github.com/manazoid4/maz-works-knowledge-vault.git
git remote add fork https://github.com/manazoid4/maz-works-knowledge-vault.git
git remote add upstream https://github.com/AgriciDaniel/claude-obsidian.git
```

Skip an `add` command when the named remote already exists and use `set-url` instead.

## Local junctions

The canonical folder is human-readable. Neutral junctions give tools stable paths:

```powershell
New-Item -ItemType Junction -Path "$env:USERPROFILE\MazWorksKnowledgeVault" -Target "$env:USERPROFILE\Desktop\Maz Works Knowledge Vault"
New-Item -ItemType Junction -Path "$env:USERPROFILE\LocalKnowledgeVault" -Target "$env:USERPROFILE\Desktop\Maz Works Knowledge Vault\Local Knowledge"
```

## Agent skills

Run from Git Bash or WSL:

```bash
bash bin/setup-multi-agent.sh
```

The installer exposes `skills/` through the neutral `maz-works-knowledge-vault` package path for Codex, OpenCode, and Gemini. Claude Code can install the repository marketplace directly:

```bash
claude plugin marketplace add manazoid4/maz-works-knowledge-vault
claude plugin install maz-works-knowledge-vault@maz-works
```

## Verify

```bash
claude plugin validate .
make test
```

Then confirm:

- Obsidian opens the Maz Works path.
- `git remote -v` shows Maz Works for `origin` and `fork`.
- each agent exposes the vault skills under `maz-works-knowledge-vault`.
- `C:\Users\manaz\LocalKnowledgeVault` resolves into the new vault.
- no active instruction or configuration points at a legacy vault path.

## Boundaries

- JobFilter is one project inside the vault.
- Historical source captures and attribution may retain upstream names.
- Never store credentials, private client material, or private spiritual content.
- Do not delete history when synchronizing with upstream; cherry-pick or merge reviewed changes deliberately.

See [`ATTRIBUTION.md`](../ATTRIBUTION.md), [`PRIVACY.md`](../PRIVACY.md), and [`SECURITY.md`](../SECURITY.md).
