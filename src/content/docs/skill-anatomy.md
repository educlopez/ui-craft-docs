---
title: Skill anatomy
description: How UI Craft is structured — the main skill, its 20 domain references, the 15 slash commands, and the 3 style variants.
order: 2
section: skill
updated: 2026-04-18
---

UI Craft is not one long file. It is a slim entry point plus a routing table pointing to depth references — so agents only load the knowledge they need for the current task.

## Three layers

1. **Main skill** — `skills/ui-craft/SKILL.md`. ~13 KB. Knobs, Discovery phase, anti-slop rules, the routing table, and the few always-needed rules.
2. **References** — `skills/ui-craft/references/*.md`. 20 domain files. Loaded on demand based on intent.
3. **Commands** — `commands/*.md`. 15 focused passes that apply a single lens from the skill.

Plus 3 sibling **variants** — pre-committed styles that lock the knobs. See [Style variants](/docs/variants). Playful and brutalist ship as style presets under `examples/presets/`, not full siblings.

## The main skill

`SKILL.md` is deliberately small. It was slimmed from 35 KB to 13.6 KB in v0.5.0 via progressive disclosure. Always-needed rules stay in `SKILL.md`. Depth lives in references. The file contains:

- Knobs block (`CRAFT_LEVEL`, `MOTION_INTENSITY`, `VISUAL_DENSITY`)
- Discovery phase (4 questions)
- Anti-slop list (the checklist applied to every UI)
- Routing table (intent → reference file)
- Four modes: Build, Animate, Review, Polish

[Read on GitHub &rarr;](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/SKILL.md)

## The 20 domains

Each domain is one file. Agents load them based on intent.

| Domain | File | Covers |
|---|---|---|
| Motion | [`motion.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/motion.md) | Decision ladder, duration + easing token scales, interaction rules, choreography, motion budget, reduced-motion contract |
| Layout | [`layout.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/layout.md) | Spacing systems, optical alignment, layered shadows, visual hierarchy |
| Typography | [`typography.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/typography.md) | `text-wrap: balance`, tabular-nums, font scale, curly quotes |
| Color | [`color.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/color.md) | OKLCH, design tokens, dark mode, APCA contrast |
| Accessibility | [`accessibility.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/accessibility.md) | WAI-ARIA, keyboard nav, focus management, touch targets |
| Performance | [`performance.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/performance.md) | Compositor-only animations, FLIP, `will-change`, CLS prevention |
| Modern CSS | [`modern-css.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/modern-css.md) | View Transitions, Anchor Positioning, Popover, `<dialog>`, `interpolate-size`, `color-mix()`, scroll-driven, container queries |
| Responsive | [`responsive.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/responsive.md) | Fluid sizing, mobile-first, touch zones, safe areas |
| Sound | [`sound.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/sound.md) | Web Audio API, feedback sounds, appropriateness matrix |
| UX Copy | [`copy.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/copy.md) | Voice / tone matrix, reading level, terminology, locale-aware strings, inclusive language, error / empty / CTA tactics |
| UI Review | [`review.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/review.md) | Systematic critique methodology, anti-slop detection, Polish Pass |
| Dashboard | [`dashboard.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/dashboard.md) | Signal-to-noise hierarchy (hero / supporting / context / deep-dive), sidebar, metric cards, data tables |
| Inspiration | [`inspiration.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/inspiration.md) | Real patterns from dub.co, cursor, linear, vercel, stripe |
| Stack | [`stack.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/stack.md) | Motion, GSAP, Three.js — decision tree, patterns, perf gotchas, anti-patterns (opt-in) |
| Heuristics | [`heuristics.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/heuristics.md) | Nielsen's 10 + Fitts / Hick / Doherty / Cleveland-McGill / Miller / Tesler with 1–5 scoring rubric and impact framing |
| Personas | [`personas.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/personas.md) | 5 archetypes (first-timer, power user, low-bandwidth, screen-reader, one-thumb) with walkthrough checklists |
| State design | [`state-design.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/state-design.md) | Idle / loading / empty / error / partial / conflict / offline — design the unhappy path first |
| Data viz | [`dataviz.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/dataviz.md) | Cleveland-McGill perceptual hierarchy, chart selection matrix, ColorBrewer + Okabe-Ito palettes, direct labeling, Tufte |
| AI / chat surfaces | [`ai-chat.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/ai-chat.md) | Streaming contract, 7-state model, tool traces, citations, feedback affordances, generative UI, conversation layout |
| Forms | [`forms.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/forms.md) | Validation timing, progressive disclosure, multi-step wizards, autosave, optimistic submit, field-specific patterns |

### Stack is opt-in

`stack.md` is the only reference that is not loaded by default. It only loads when:

- `MOTION_INTENSITY ≥ 8`, **and**
- The user opted into Motion / GSAP / Three.js during Discovery

This is deliberate. The file is large. Loading it for a static button animation would be noise.

## The routing table

`SKILL.md` contains a routing table that maps user intent to reference files. Agents match the intent and load only the relevant files. Examples:

| User intent | Loads |
|---|---|
| "Build a pricing page" | `layout.md`, `typography.md`, `color.md`, `responsive.md`, `copy.md` |
| "Audit this component" | `accessibility.md`, `performance.md`, `responsive.md`, `review.md` |
| "Animate this modal" | `motion.md`, `performance.md`, `accessibility.md` |
| "Build a dashboard" | `layout.md`, `dashboard.md`, `typography.md`, `responsive.md`, `state-design.md` |
| "Polish this page" | `review.md`, `typography.md`, `layout.md`, `motion.md` |

Agents never load all 20 references at once. That defeats the point of progressive disclosure.

## The 15 commands

Focused passes. Each command loads a single lens. See [Commands](/docs/commands) for the full reference. They are grouped by intent:

- **Review & ship** — `heuristic`, `audit`, `critique`, `polish`, `harden`, `unhappy`
- **Plan & transform** — `shape`, `animate`, `adapt`, `typeset`, `colorize`, `clarify`, `extract`
- **Taste dial** — `distill`, `delight`

Only Claude Code understands slash commands natively. In other harnesses they are materialized as peer sub-skills with their own `name` + `description` frontmatter. Same content, different invocation surface.

## Harness mirrors

Source of truth: `skills/ui-craft/` + `commands/`. Never edit `.codex/`, `.cursor/`, `.gemini/`, `.opencode/`, or `.agents/` directly.

The mirrors are generated by `scripts/sync-harnesses.mjs` and committed to the repo so `npx skills add` installs the right tree for each harness. CI re-runs the sync on every push to `main`.

```bash
node scripts/sync-harnesses.mjs
# or
npm run sync
```

[More in the README &rarr;](https://github.com/educlopez/ui-craft#maintaining-harness-mirrors)

## File layout

```
ui-craft/
  skills/
    ui-craft/
      SKILL.md                     # slim entry point (~13 KB)
      references/                  # 20 domain files
        accessibility.md
        ai-chat.md
        color.md
        copy.md                    # voice/tone + microcopy (unified)
        dashboard.md
        dataviz.md
        forms.md
        heuristics.md
        inspiration.md
        layout.md
        modern-css.md
        motion.md                  # unified motion reference
        performance.md
        personas.md
        responsive.md
        review.md
        sound.md
        stack.md
        state-design.md
        typography.md
    ui-craft-minimal/SKILL.md
    ui-craft-editorial/SKILL.md
    ui-craft-dense-dashboard/SKILL.md
  commands/                        # 15 source-of-truth slash commands
  examples/
    animation-storyboard.md        # multi-stage animation pattern
    presets/
      playful.md                   # Clay / Gumroad / Duolingo / Arc preset
      brutalist.md                 # Swiss print / Nothing / terminal preset
  scripts/
    detect.mjs                     # anti-slop detector
    sync-harnesses.mjs             # mirror generator
    validate.mjs                   # manifest + frontmatter validator
```
