# Attributions and provenance

## Upstream knowledge-vault engine

Maz Works Knowledge Vault began as a fork of the MIT-licensed [`AgriciDaniel/claude-obsidian`](https://github.com/AgriciDaniel/claude-obsidian) project by AgriciDaniel / AI Marketing Hub.

That upstream provided the original Obsidian and agent-skills structure, including much of the ingestion, retrieval, locking, methodology, and Canvas tooling preserved in this repository. Its copyright notice remains intact in [`LICENSE`](LICENSE), and its Git history is retained. Maz Works maintains the adapted vault and its project-specific content under a distinct name; this rebrand does not claim original authorship of the upstream implementation.

The `upstream` Git remote is retained for provenance and selective future updates.

## LLM Wiki pattern

- **Originator:** Andrej Karpathy
- **Source:** <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>
- **Use:** The core pattern of using an LLM to build and maintain a structured wiki from source material.

## ITS CSS snippets

- **Author:** SlRvb
- **Source:** <https://github.com/SlRvb/Obsidian--ITS-Theme>
- **License:** GPL-2.0
- **Files:** `.obsidian/snippets/ITS-Dataview-Cards.css`, `.obsidian/snippets/ITS-Image-Adjustments.css`

Those files remain subject to GPL-2.0, including modifications.

## Bundled Obsidian community plugins

| Plugin | Author | Repository |
|---|---|---|
| Calendar | Liam Cain | <https://github.com/liamcain/obsidian-calendar-plugin> |
| Thino | Boninall / Quorafind | <https://github.com/Quorafind/Obsidian-Thino> |
| Obsidian Excalidraw | Zsolt Viczian | <https://github.com/zsviczian/obsidian-excalidraw-plugin> |
| Obsidian Banners | Danny Hernandez | <https://github.com/noatpad/obsidian-banners> |

`obsidian-excalidraw-plugin/main.js` is not tracked and is downloaded from the plugin's official releases by `bin/setup-vault.sh`.
