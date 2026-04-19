---
title: Commands
description: The 15 slash commands — each a focused pass that applies a single lens from the skill.
order: 4
section: skill
updated: 2026-04-18
---

Commands are focused passes. Each loads a single lens from the skill and returns a structured output. Use them when you know exactly what you want and want to skip routing.

In Claude Code, invoke with the native slash syntax (`/ui-craft:audit`). In other harnesses, every command ships as a peer sub-skill — trigger it by intent ("audit my UI", "polish this page"). Same content, different surface.

Commands honor the knobs set during Discovery. `/ui-craft:polish` with `CRAFT_LEVEL=3` is a no-op. `/ui-craft:animate` with `MOTION_INTENSITY=2` refuses entrance stagger.

## Review & ship

| Command | One-liner | Example prompt | Relevant knobs |
|---|---|---|---|
| `/ui-craft:heuristic` | Signature move — scored critique using Nielsen's 10 + 6 design laws + persona walkthroughs. Markdown scorecard, no code. | "run a heuristic on this checkout" | knob-agnostic |
| `/ui-craft:audit` | Technical UI audit — a11y, performance, responsive. Prioritized findings table. | "audit this checkout form" | knob-agnostic |
| `/ui-craft:critique` | UX critique — hierarchy, clarity, anti-slop. No code changes unless asked. | "critique this pricing page" | `CRAFT_LEVEL` sets severity floor |
| `/ui-craft:polish` | Final polish pass — the compound details that separate "done" from "crafted". | "polish this dashboard" | `CRAFT_LEVEL` gates skip/full/signature |
| `/ui-craft:harden` | Production readiness — loading / empty / error states, i18n, offline, edge cases. | "harden this signup flow" | knob-agnostic |
| `/ui-craft:unhappy` | State-first pass — design every non-happy state (idle / loading / empty / error / partial / conflict / offline) before the happy path. | "design the unhappy paths for this form" | knob-agnostic |

### Gating detail

- `/ui-craft:polish` — `CRAFT_LEVEL ≤ 4` skips entirely; 5–7 is a full pass; 8+ adds a signature detail (the compound moment: a page-level motif or micro-interaction earned by the rest of the craft).
- `/ui-craft:critique` — `CRAFT_LEVEL=3` flags only critical issues; `CRAFT_LEVEL=9+` flags minor polish.
- `/ui-craft:audit`, `/ui-craft:harden`, `/ui-craft:heuristic`, and `/ui-craft:unhappy` are explicitly knob-agnostic. They run the same pass regardless of dial.

## Plan & transform

| Command | One-liner | Example prompt | Relevant knobs |
|---|---|---|---|
| `/ui-craft:shape` | Wireframe-first. ASCII layout + content inventory + state list + open questions before any JSX. | "shape a settings page for API keys" | knob-agnostic |
| `/ui-craft:animate` | Add or fix motion. Honors `MOTION_INTENSITY` and loads the stack reference if opted in. | "animate this modal entrance" | `MOTION_INTENSITY` tiers ≤3 / 4–7 / 8+ |
| `/ui-craft:adapt` | Responsive pass — mobile, tablet, desktop, touch, safe areas. | "adapt this table for mobile" | `VISUAL_DENSITY` sets column count per breakpoint |
| `/ui-craft:typeset` | Typography pass — fonts, scale, hierarchy, micro-typography. | "typeset this long-form page" | knob-agnostic |
| `/ui-craft:colorize` | Introduce color strategically — 90% neutral, one accent, 3–5 placements. | "colorize this empty-state UI" | defers to variant if one is active |
| `/ui-craft:clarify` | UX copy pass — buttons, errors, empty states, form hints. Clarity over cleverness. | "clarify the copy on this onboarding" | knob-agnostic |
| `/ui-craft:extract` | Pull repeated patterns into components and lift magic values into tokens. | "extract repeated patterns in this page" | knob-agnostic |

### Motion tiers

`/ui-craft:animate` behaves differently per `MOTION_INTENSITY` band:

- **1–3** — hover states only; modal enter/exit if essential. No scroll reveals, no stagger.
- **4–7** — reveals on scroll, stagger on lists, page-level transitions if the stack supports it.
- **8+** — loads `references/stack.md` for Motion / GSAP / Three.js patterns (only if the user opted into a stack during Discovery). Allows magnetic cursors, scroll-linked scenes, WebGL elements.

## Taste dial

| Command | One-liner | Example prompt | Relevant knobs |
|---|---|---|---|
| `/ui-craft:distill` | Strip to essence. Cut every section that doesn't earn its space. Absorbs visual-weight reduction (softer type, less motion). | "distill this hero" | `CRAFT_LEVEL` drives cut aggression + signature preservation |
| `/ui-craft:delight` | Add purposeful moments of joy — micro-interactions, not decorative animation. Copy first, animation last. | "add a delight moment to the success screen" | gated by `MOTION_INTENSITY ≥ 4` |

## Invocation surfaces

Same command, different invocation per harness:

```
Claude Code        /ui-craft:polish
Codex              "polish this page"      (matches ui-craft-polish sub-skill)
Cursor             "polish this page"      (matches ui-craft-polish sub-skill)
Gemini             "polish this page"      (matches ui-craft-polish sub-skill)
OpenCode           "polish this page"      (matches ui-craft-polish sub-skill)
```

The materialization is done by `scripts/sync-harnesses.mjs`. Every command in `commands/` becomes its own peer skill with dedicated frontmatter in each non-Claude harness mirror.

## Source files

Every command ships as a single markdown file with YAML frontmatter. Read the source to see exactly what context each command loads and how it routes.

- [`commands/heuristic.md`](https://github.com/educlopez/ui-craft/blob/main/commands/heuristic.md)
- [`commands/audit.md`](https://github.com/educlopez/ui-craft/blob/main/commands/audit.md)
- [`commands/critique.md`](https://github.com/educlopez/ui-craft/blob/main/commands/critique.md)
- [`commands/polish.md`](https://github.com/educlopez/ui-craft/blob/main/commands/polish.md)
- [`commands/harden.md`](https://github.com/educlopez/ui-craft/blob/main/commands/harden.md)
- [`commands/unhappy.md`](https://github.com/educlopez/ui-craft/blob/main/commands/unhappy.md)
- [`commands/shape.md`](https://github.com/educlopez/ui-craft/blob/main/commands/shape.md)
- [`commands/animate.md`](https://github.com/educlopez/ui-craft/blob/main/commands/animate.md)
- [`commands/adapt.md`](https://github.com/educlopez/ui-craft/blob/main/commands/adapt.md)
- [`commands/typeset.md`](https://github.com/educlopez/ui-craft/blob/main/commands/typeset.md)
- [`commands/colorize.md`](https://github.com/educlopez/ui-craft/blob/main/commands/colorize.md)
- [`commands/clarify.md`](https://github.com/educlopez/ui-craft/blob/main/commands/clarify.md)
- [`commands/extract.md`](https://github.com/educlopez/ui-craft/blob/main/commands/extract.md)
- [`commands/distill.md`](https://github.com/educlopez/ui-craft/blob/main/commands/distill.md)
- [`commands/delight.md`](https://github.com/educlopez/ui-craft/blob/main/commands/delight.md)
