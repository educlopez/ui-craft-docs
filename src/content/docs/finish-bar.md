---
title: Finish bar
description: 10-pass finishing protocol with measurable criteria. The pre-ship gate that turns "done" into "ships with intent".
order: 7
section: skill
updated: 2026-05-03
---

Ten finishing passes, each with measurable criteria and a distinct class of failure. Run before shipping. The passes share no blind spots by design — what Pass 1 catches (hierarchy) Pass 6 ignores (state coverage), and vice versa. The bar is opinionated: when a pass conflicts with a recorded project decision in `brief.md`, the brief wins. Without a brief entry, the bar applies.

## The ten passes

| Pass | Goal | Key criterion |
|---|---|---|
| 1. Hierarchy | One primary element on first glance | Squint test passes; adjacent levels differ ≥1.5× in size, weight, or contrast |
| 2. Type system | Typography is a system, not coexisting styles | ≤3 weights per viewport; tabular nums on data; prose 50–75 characters |
| 3. Surface stack | ≥3 distinguishable elevation levels; both modes intentional | Dark mode passes the intentional-dark test — not an inverted light layer |
| 4. Spacing rhythm | Within < between < section at every nesting level | Every value from the token scale; no arbitrary px; section breaks ≥2× inter-block |
| 5. Iconography | One family; weight matched to type | Single family throughout; stroke weight matches body weight; container shape consistent |
| 6. State coverage | All 8 states explicitly designed | Idle / loading / empty / error / success / partial / conflict / offline all present |
| 7. Motion tuning | Purposeful, sub-400ms, motion-gap-clean | No snap where transition expected; `prefers-reduced-motion` honored |
| 8. Microcopy voice | Every string has voice and specificity | Consistent verbs; no placeholders; no generic CTAs; errors name the fix |
| 9. Pixel honesty | Small details match resolution intent | Sub-pixel borders via `color-mix`; shadow stacks 2–3 layers; varied corner radii |
| 10. Data formatting | Numbers communicate the right thing at the right precision | Tabular nums; abbreviated counts where appropriate; locale-aware currency |

**Done** means zero Critical and zero Major findings across all ten passes. Minor findings are explicitly accepted — write them down and ship, or fix them. Unwritten Minor findings are skipped findings.

## Severity map

**Critical — blocks ship:**
- Pass 1: no discernible hierarchy (flat field of equal-weight elements)
- Pass 6: loading, empty, or error states undefined
- Pass 8: placeholder copy in production paths (lorem ipsum, TODO strings)

**Major — fix before ship when time allows; document if deferring:**
- Pass 3: dark mode is an inverted light layer
- Pass 7: motion-gap failures on visible state changes; `prefers-reduced-motion` not honored
- Pass 9: uniform border-radius across all element types
- Pass 2: proportional numerals on tabular data (misaligned columns)

**Minor — polish; ship-acceptable if explicitly accepted:**
- Pass 2: four weights in viewport instead of three
- Pass 5: icon stroke weight off by half a unit
- Pass 10: currency format missing locale
- Pass 4: one spacing value that skips the token scale

## How `/finalize` orchestrates

`/finalize` runs the bar as a structured audit on a file or surface. The sequence matters: Passes 1–3 are foundational — changing them after later passes invalidates downstream findings.

The run order is: brief check → detector run → token audit → all ten passes → findings ranked by severity. Output is a severity-ranked report with an explicit ship verdict: pass, pass-with-deferred, or block.

The brief gates the entire run. A pass conflicts with a recorded brief principle? The pass yields and cites the principle. No brief entry means no deferral path.

`CRAFT_LEVEL ≤ 6` runs only the load-bearing passes (1, 3, 6, 7, 8). Explicit `/finalize` invocation overrides the knob and runs all ten. The bar exists for the moments when the knob is not enough.

Time budget: one screen with a single primary action takes 15–30 minutes to run clean. A full multi-screen flow takes hours. Run on a vertical slice, ship, repeat — do not try to run the bar on an entire app at once.

## Run the command

```bash
/ui-craft:finalize <file or surface>
```

## Source

[`skills/ui-craft/references/finish-bar.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/finish-bar.md)
