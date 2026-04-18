---
title: Variants
description: Five opt-in sibling skills that pre-commit UI Craft to a style and lock the knobs to matching values.
order: 3
section: skill
updated: 2026-04-18
---

The main `ui-craft` skill is style-agnostic. Variants are opinionated forks that pre-commit to an aesthetic and lock the knobs to values that make the aesthetic work. Agents pick a variant when the user mentions a specific style or a product reference.

Each variant defers to the main skill for base rules and references. It only overrides knob defaults and adds style-specific guidance.

## Knobs locked

| Variant | `CRAFT_LEVEL` | `MOTION_INTENSITY` | `VISUAL_DENSITY` | Style anchors |
|---|---|---|---|---|
| `ui-craft-minimal` | 8 | 3 | 2 | Monochrome + one accent, Inter/Geist, hairline borders |
| `ui-craft-editorial` | 9 | 4 | 3 | Serif display + humanist body, wide reading column, OpenType |
| `ui-craft-dense-dashboard` | 7 | 3 | 9 | IBM Plex + mono numbers, semantic palette, 4/8px grid |
| `ui-craft-playful` | 8 | 7 | 4 | Rounded corners, spring motion, multi-accent (≤3), colored soft shadows |
| `ui-craft-brutalist` | 7 | 2 | 6 | Mono or geometric sans, hard 2–4px borders, pure B/W, type-as-hero |

## When to invoke each

### `ui-craft-minimal`

Triggers on "minimal", "clean", "editorial", "whitespace-heavy", "Linear-like", "Notion-like", "Vercel-like".

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

### `ui-craft-playful`

Triggers on "playful", "friendly", "fun", "approachable", "casual", "Clay-like", "Gumroad-like", "Duolingo-like", "Arc Browser".

Playful without craft reads as childish. Spring-heavy motion carries the personality. Generous radii. Saturated-but-tuned multi-accents (≤3). Colored soft shadows. Moderate density — cards breathe, but layout has rhythm and variety.

Product references: **Clay, Gumroad, Duolingo, Arc Browser.**

### `ui-craft-brutalist`

Triggers on "brutalist", "raw", "deliberately ugly", "Swiss print", "Nothing-like", "terminal aesthetic", "editorial brutalism", "web 1.0 revival".

Type-as-hero, hard contrast, visible grids, raw chrome. Mono or geometric sans. Solid 2–4px borders. Sharp corners. Pure B/W allowed. Instant state changes — no entrance animation, no scroll reveal. ALL CAPS mono labels are permitted here (not in other variants).

Product references: **Nothing UI, Swiss print revival, yugonostalgia sites (Yung Lean era), terminal aesthetic.**

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

## Source files

- [`skills/ui-craft-minimal/SKILL.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft-minimal/SKILL.md)
- [`skills/ui-craft-editorial/SKILL.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft-editorial/SKILL.md)
- [`skills/ui-craft-dense-dashboard/SKILL.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft-dense-dashboard/SKILL.md)
- [`skills/ui-craft-playful/SKILL.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft-playful/SKILL.md)
- [`skills/ui-craft-brutalist/SKILL.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft-brutalist/SKILL.md)
