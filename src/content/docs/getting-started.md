---
title: Getting started
description: Install UI Craft in your AI coding agent, answer four discovery questions, and get non-generic interfaces from the next prompt.
order: 1
section: skill
updated: 2026-04-18
---

UI Craft is an Agent Skill. It does not install into your project — it installs into your coding agent. Once present, any prompt that touches UI routes through the skill before code is written.

## Install

```bash
npx skills add educlopez/ui-craft
```

The installer detects your harness and drops the right mirror into the right folder. Main `ui-craft` skill + 3 style variants + 15 slash commands get copied in a single step.

### Per-agent folders

| Agent | Folder | What lands there |
|---|---|---|
| Claude Code | `.claude/` | Main skill + slash commands (native) |
| Codex | `.codex/skills/` | Main skill + variants + commands-as-sub-skills |
| Cursor | `.cursor/skills/` | Same as Codex |
| Gemini | `.gemini/skills/` | Same as Codex |
| OpenCode | `.opencode/skills/` | Same as Codex |
| Generic agent-skills spec | `.agents/skills/` | Same as Codex |

Only Claude Code understands slash commands natively. Other harnesses get each command materialized as its own peer skill, triggered by intent ("audit my UI", "polish this page") rather than `/ui-craft:audit`.

### Alternative install

```bash
git clone https://github.com/educlopez/ui-craft.git ~/.skills/ui-craft
```

Or as a submodule:

```bash
git submodule add https://github.com/educlopez/ui-craft.git .skills/ui-craft
```

## Discovery phase

Before writing a single line of code, the skill analyzes your project for existing design decisions — CSS variables, Tailwind config, font imports, component themes, existing accent colors. If you already have a design system, it respects it.

If the project has no design system yet, the skill asks four quick questions:

1. **Style** — minimal, editorial, dense-dashboard (full variants), playful or brutalist (presets), or "I'll describe it"
2. **Accent color** — never defaults to blue; asks or derives from context
3. **Font** — Geist, Inter, DM Sans, Plus Jakarta Sans, serif pairing, or custom
4. **Animation stack** (optional) — Motion, GSAP, Three.js, or none. Gates whether `references/stack.md` gets loaded.

Answer them once per project. The skill persists decisions in context for the session.

## Knobs

Three numeric dials (1–10) the skill sets during Discovery. They change behavior, not just tone.

| Knob | Default | At 1 | At 10 |
|---|---|---|---|
| `CRAFT_LEVEL` | 7 | ships fast, skips Polish Pass | pixel-perfect, compound details applied |
| `MOTION_INTENSITY` | 5 | hover states only | scroll-linked, page transitions, magnetic cursor |
| `VISUAL_DENSITY` | 5 | whitespace-heavy editorial | dashboard-dense |

Gating examples:

- `CRAFT_LEVEL ≤ 4` — `/ui-craft:polish` becomes a no-op
- `MOTION_INTENSITY ≤ 3` — hover + modal enter/exit only
- `MOTION_INTENSITY ≥ 8` — `references/stack.md` (442 lines) loads, but only if you opted into a motion stack during Discovery
- `VISUAL_DENSITY ≥ 8` — `/ui-craft:adapt` produces tight 4/8px grid layouts

## First run

Once installed, use your agent normally. The skill triggers on UI intent — no flag, no prefix.

```
You: Build a pricing page for a developer tool.

Agent: (reads your project tokens, asks Discovery questions if needed,
        picks layout + typography + color + motion + a11y in one pass,
        returns code that doesn't look like every other AI pricing page)
```

Or call a specific pass:

```
/ui-craft:critique                # UX critique, no code changes
/ui-craft:audit                   # a11y / perf / responsive findings
/ui-craft:polish                  # compound details pass
```

The full command list lives in [Commands](/docs/commands).

## What to read next

- [Skill anatomy](/docs/skill-anatomy) — how the skill is structured across 20 references and 15 commands.
- [Style variants](/docs/variants) — the 3 opt-in siblings that lock in a style (minimal, editorial, dense-dashboard), plus playful and brutalist presets.
- [ui-craft-detect](/docs/ui-craft-detect) — the standalone CLI that scans a codebase for AI-generated UI anti-patterns.
