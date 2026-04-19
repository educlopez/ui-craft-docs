---
title: Style variants
description: Three opt-in sibling skills that pre-commit to a style and lock the knobs. Plus two style presets (playful, brutalist) as examples, not full skills.
order: 3
section: skill
updated: 2026-04-18
---

The main `ui-craft` skill is style-agnostic. Variants are opinionated forks that pre-commit to an aesthetic and lock the knobs to values that make the aesthetic work. Agents pick a variant when the user mentions a specific style or a product reference.

Each variant defers to the main skill for base rules and references. It only overrides knob defaults and adds style-specific guidance.

## Knobs locked

| Variant | Triggers on | Knobs locked | Style anchors |
|---|---|---|---|
| `ui-craft-minimal` | "minimal", "Linear-like", "Notion-like", "whitespace-heavy" | CRAFT=8 / MOTION=3 / DENSITY=2 | Monochrome + one accent, Inter/Geist, hairline borders |
| `ui-craft-editorial` | "editorial", "magazine", "Medium-like", "Substack-like", "long-form" | CRAFT=9 / MOTION=4 / DENSITY=3 | Serif display + humanist body, wide reading column, OpenType |
| `ui-craft-dense-dashboard` | "dashboard", "admin panel", "Bloomberg-like", "Retool-like" | CRAFT=7 / MOTION=3 / DENSITY=9 | IBM Plex + mono numbers, semantic palette, 4/8px grid |

## When to invoke each

### `ui-craft-minimal`

Triggers on "minimal", "clean", "whitespace-heavy", "Linear-like", "Notion-like", "Vercel-like".

Minimal aesthetics only work when executed precisely. Polish Pass is mandatory. One accent. Hairline borders. Almost no motion. Whitespace is the composition.

Product references: **Linear, Notion, Vercel.**

### `ui-craft-editorial`

Triggers on "editorial", "magazine", "long-form", "content-heavy", "blog", "Medium-like", "Substack-like".

Typography is the star. Reading-aware motion (fade on reveal, link hovers). Wide reading column, generous vertical rhythm. Serif display paired with humanist body. Baseline grid, drop caps, OpenType features.

Product references: **Medium, Substack, The Verge.**

### `ui-craft-dense-dashboard`

Triggers on "dashboard", "admin panel", "data-dense UI", "analytics", "internal tool", "Bloomberg-like", "Retool-like".

Data-first, keyboard-first, operator tools. Every pixel earns its place. Tight 4/8px grid. Semantic color palette. Tabular-nums on every number. Mono for IDs. Sparklines. Keyboard-shortcut-visible chrome. Row-level micro-motion only.

Product references: **Bloomberg, Retool, Linear issues view.**

## Variants defer

A variant is not a rewrite of the skill. It is a thin overlay:

- Inherits every anti-slop rule from `ui-craft`
- Inherits every reference file from `ui-craft/references/`
- Overrides only knob defaults and style-specific rules

That means if you build with `ui-craft-editorial`, you still get accessibility, performance, and responsive rules from the base skill. You just also get serif display pairings, drop caps, baseline grid, and OpenType discipline on top.

## How variants get picked

The agent picks a variant in one of two ways:

1. **Explicit** — user says "build this minimal-style" or "Linear-like dashboard". The variant description matches the trigger words and the agent loads the variant SKILL.md first.
2. **Implicit** — user describes a product the variant is anchored to. "Build a Notion-like editor" matches `ui-craft-minimal`. "Build a Bloomberg-style terminal" matches `ui-craft-dense-dashboard`.

If nothing matches, the base `ui-craft` skill is used with default knobs. You can always override with explicit knob values in your prompt: "build this with `VISUAL_DENSITY=9` and `MOTION_INTENSITY=2`".

## Style presets

Not every aesthetic earns a full sibling skill. Playful and brutalist ship as style presets — reference material the main `ui-craft` skill reads when the user asks for those aesthetics. Presets define the same kind of lock (knob values + style overrides) without adding siblings that compete with the main skill's triggers.

| Preset | Style anchors | Knobs locked | Source |
|---|---|---|---|
| `playful` | Clay / Gumroad / Duolingo / Arc aesthetic — spring motion, generous radii, saturated-but-tuned multi-accents (<=3), colored soft shadows | CRAFT=8 / MOTION=7 / DENSITY=4 | [`examples/presets/playful.md`](https://github.com/educlopez/ui-craft/blob/main/examples/presets/playful.md) |
| `brutalist` | Swiss print / Nothing / terminal aesthetic — type-as-hero, hard 2–4px borders, pure B/W, instant state changes | CRAFT=7 / MOTION=2 / DENSITY=6 | [`examples/presets/brutalist.md`](https://github.com/educlopez/ui-craft/blob/main/examples/presets/brutalist.md) |

When the user says "build this playful" or "Clay-like", the main skill applies the preset's knob values + style overrides on top of the base rules. No separate sibling skill loads.

## Source files

- [`skills/ui-craft-minimal/SKILL.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft-minimal/SKILL.md)
- [`skills/ui-craft-editorial/SKILL.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft-editorial/SKILL.md)
- [`skills/ui-craft-dense-dashboard/SKILL.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft-dense-dashboard/SKILL.md)
- [`examples/presets/playful.md`](https://github.com/educlopez/ui-craft/blob/main/examples/presets/playful.md)
- [`examples/presets/brutalist.md`](https://github.com/educlopez/ui-craft/blob/main/examples/presets/brutalist.md)
