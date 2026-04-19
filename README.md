# UI Craft — Docs

Landing page + documentation site for [UI Craft](https://github.com/educlopez/ui-craft), the design engineering skill for AI coding agents.

**Live:** [skills.smoothui.dev](https://skills.smoothui.dev)

![UI Craft](public/og.png)

## What's here

- **Landing** (`/`) — hero + 4 before/after comparison sliders, 4 modes, knobs (CRAFT / MOTION / DENSITY), 20 domains chunked into 4 clusters, 15 commands grouped by intent (Review & ship / Plan & transform / Taste dial), "Works in every agent" matrix, anti-slop demo, differentiated install / "what changes" CTAs.
- **Docs** (`/docs`) — 13 reference pages grouped into Skill, CLI, and Reference sections. Covers getting-started, skill-anatomy, variants, commands, `ui-craft-detect`, plus per-domain references (heuristics, personas, state-design, dataviz, copy, motion, ai-chat, forms).

## Stack

- [Astro](https://astro.build) 6 with content collections at `src/content/docs/`
- [Tailwind CSS v4](https://tailwindcss.com)
- Vanilla JS — comparison sliders with keyboard nav, Figma rulers, brand-inspect overlay, GitHub stars fetch with localStorage 1h TTL
- Deploys to Vercel

## Development

This project uses **pnpm**:

```bash
pnpm install
pnpm dev
```

Runs at `localhost:4321`.

## Build

```bash
pnpm build
pnpm preview
```

## Anti-slop config

`.uicraftrc.json` at the root silences two detector rules that are intentional editorial choices on this site (`unit-mixing`, `pixel-radius-inconsistency`). Editorial prose mixes `px` for borders with `rem` for scale on purpose.

Run the detector locally against the landing source:

```bash
npx ui-craft-detect src
```

Target: 0 findings. The landing is dogfooded — it's a walking demonstration of the rules ui-craft teaches.

## Related

- **Skill repo**: [github.com/educlopez/ui-craft](https://github.com/educlopez/ui-craft)
- **npm CLI**: [npmjs.com/package/ui-craft-detect](https://www.npmjs.com/package/ui-craft-detect) — static anti-slop detector, 33 rules, zero deps
- **Agent skills registry**: [skills.sh](https://skills.sh)
- **Author's other packages**: [smoothui-cli](https://www.npmjs.com/package/smoothui-cli), [design-bites](https://www.npmjs.com/package/design-bites), [sparkbites-mcp](https://www.npmjs.com/package/sparkbites-mcp)

## License

MIT
