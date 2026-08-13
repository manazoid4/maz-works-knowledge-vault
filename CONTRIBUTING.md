# Contributing to Maz Works Knowledge Vault

This is Manazir Hussain's active cross-project knowledge system. Changes should improve its reliability, clarity, retrieval, or portability without weakening privacy boundaries.

## Principles

1. Read affected instructions, tests, and callers before editing.
2. Prefer the smallest complete change.
3. Preserve source provenance and distinguish historical notes from current truth.
4. Add explicit handling for new failure modes, network calls, and state changes.
5. Never include credentials, private client data, confidential material, or private spiritual content.

## Workflow

1. Create a focused branch.
2. Make the change and add or update tests for behaviour changes.
3. Run `make test` in a Bash environment.
4. Validate package metadata with `claude plugin validate .` when relevant.
5. Update the relevant project note or session handoff.
6. Open a pull request against <https://github.com/manazoid4/maz-works-knowledge-vault>.

Contributions are licensed under [`LICENSE`](LICENSE). The upstream foundation and third-party components are documented in [`ATTRIBUTION.md`](ATTRIBUTION.md).
