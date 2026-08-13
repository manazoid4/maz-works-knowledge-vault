# Security policy

## Reporting

Report vulnerabilities privately through [GitHub Security Advisories](https://github.com/manazoid4/maz-works-knowledge-vault/security/advisories/new). Do not publish credentials, private vault content, or exploitable details in a public issue.

Include a concise description, reproduction steps, affected files, and a suggested fix when possible.

## Scope

This policy covers the maintained tooling under `skills/`, `agents/`, `scripts/`, `hooks/`, `bin/`, and `.claude-plugin/`.

User-authored vault content and third-party applications are outside the software-maintenance scope, but accidental sensitive-data exposure should still be reported immediately.

## Trust boundary

Maz Works Knowledge Vault is a single-owner, local-first system. Filesystem permissions are the trust boundary for locks, caches, transport data, and hook execution. It is not hardened as a multi-tenant service.

- Write locks may be released across local processes.
- Hooks run with the invoking user's permissions.
- Optional retrieval or research features may use external services only behind their documented consent gates.
- Secrets and private client information must never be committed.

See [`PRIVACY.md`](PRIVACY.md) and [`ATTRIBUTION.md`](ATTRIBUTION.md) for data and provenance details.
