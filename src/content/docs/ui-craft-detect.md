---
title: ui-craft-detect
description: Zero-dependency static scanner for AI-generated UI anti-patterns. Rules mirror the Anti-Slop Test in the skill. Usable as a CI gate.
order: 10
section: cli
updated: 2026-04-18
---

`ui-craft-detect` is a standalone CLI. It scans a codebase for the same anti-patterns the skill rejects when generating UI — `transition: all`, bounce easing, purple/cyan gradients, ALL CAPS headings, emoji-as-icons, generic CTAs, glassmorphism stacks, and 12 more. Zero dependencies. One file. CI-ready.

Install nothing. Run it anywhere:

```bash
npx ui-craft-detect ./src
```

Exit code is 0 when clean, 1 when findings.

## Install

```bash
# one-off
npx ui-craft-detect ./src

# add as a project dev dep
pnpm add -D ui-craft-detect
```

Published on npm: [`ui-craft-detect`](https://www.npmjs.com/package/ui-craft-detect).

Or from a clone of the main repo:

```bash
node scripts/detect.mjs ./src
```

## Rules

19 rules grouped by severity. Rules fire per line (per-line) or per file (file-level).

### Critical

| ID | Detects |
|---|---|
| `transition-all` | `transition: all` — animates unknown properties, causes paint thrash |
| `bounce-elastic-easing` | `easeInOutBack`, `easeOutBounce`, elastic cubic-béziers — instant AI-slop tell |
| `animate-bounce` | Tailwind's `animate-bounce` utility |
| `purple-cyan-gradient` | Purple-to-cyan, violet-to-pink, indigo-to-pink gradients |
| `uppercase-heading` | ALL CAPS h1/h2/h3 — hard to read, aggressive by default |
| `left-top-animation` | Animating `left` / `top` / `width` / `height` — layout thrash, never compositor |
| `glassmorphism-stack` (file) | `backdrop-filter` + `rgba(white, low)` + `border-white` together |

### Major

| ID | Detects |
|---|---|
| `gradient-text-metric` | Gradient fill on large numerals — unreadable, AI tell |
| `emoji-feature-icon` | Emoji used as a feature/section icon |
| `pure-black-text` | `#000`, `rgb(0,0,0)`, `oklch(0% ...)` body text — never in real UI |
| `generic-cta` | "Learn more", "Click here", "Read more" as CTA labels |
| `absolute-zindex` | Nuclear z-index values (9999, 99999, 1000000+) |
| `setTimeout-animation` | `setTimeout` driving what should be a CSS or RAF animation |
| `aria-label-emoji` | Emoji inside `aria-label` — screen readers read them literally |
| `no-focus-visible` | Hover state defined without `:focus-visible` counterpart |
| `pixel-radius-inconsistency` | Token-based `border-radius` mixed with raw pixel values in one file |
| `uniform-border-radius` (file) | Identical radius on every component — no hierarchy |

### Warn

| ID | Detects |
|---|---|
| `inline-any-style` | Long inline `style` attribute — should be a class or token |
| `unit-mixing` | Mixed length units (`px` + `rem` + `em`) in the same block |

File-level rules (`glassmorphism-stack`, `uniform-border-radius`) look at the whole file rather than per line, because the anti-pattern is a composition of properties, not a single declaration.

## Ignore comments

Silence a finding at the source. Three forms:

```js
/* ui-craft-detect-ignore-file */
// whole-file skip, put at top

/* ui-craft-detect-ignore-next-line */
transition: all 200ms;  // skipped

/* ui-craft-detect-ignore-rule: transition-all */
transition: all 200ms;  // only that rule skipped on this line
```

## `.uicraftrc.json`

Project-level config. Disable rules by id or change severity.

```json
{
  "rules": {
    "pure-black-text": "off",
    "generic-cta": "warn",
    "uppercase-heading": "critical"
  }
}
```

Place it at the project root. The CLI walks up from the scanned path to find it.

## `--fix` and `--fix-dry-run`

Auto-fix the rules that have a safe replacement (for example `transition: all` → `transition-property` with the declared properties inferred from the block).

```bash
npx ui-craft-detect ./src --fix
npx ui-craft-detect ./src --fix-dry-run   # shows the diff, doesn't write
```

Only rules with a `fix_apply` method are auto-fixable. Everything else still needs manual judgment.

## `--sarif`

Emit SARIF v2.1.0 for GitHub Code Scanning or any SARIF-compatible viewer.

```bash
npx ui-craft-detect ./src --sarif > report.sarif
```

Upload `report.sarif` with `github/codeql-action/upload-sarif@v3` to surface findings in the Security tab.

## Pre-commit hook (Husky)

Install Husky once in the project, then add a hook that scans staged files.

```bash
pnpm add -D husky
pnpm exec husky init
```

Write `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
npx ui-craft-detect $(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(css|jsx|tsx|vue|svelte|astro)$')
```

Commits with findings fail. Skip ad-hoc with `git commit --no-verify`.

The main `ui-craft` repo ships a richer version at `.githooks/pre-commit` that also auto-versions `marketplace.json`. Enable per clone with `git config core.hooksPath .githooks`.

## GitHub Action

Run on every push and PR.

```yaml
name: ui-craft-detect
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Scan for anti-slop
        run: npx ui-craft-detect ./src
```

For SARIF + GitHub Security integration:

```yaml
      - name: Scan with SARIF output
        run: npx ui-craft-detect ./src --sarif > ui-craft.sarif
        continue-on-error: true
      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: ui-craft.sarif
```

## Source

- npm: [`ui-craft-detect`](https://www.npmjs.com/package/ui-craft-detect)
- Single-file source: [`scripts/detect.mjs`](https://github.com/educlopez/ui-craft/blob/main/scripts/detect.mjs)
