---
title: Recipe — SaaS Dashboard
description: Build contract for a production SaaS dashboard — three named compositions, exact shell spec, component inventory, strict build order, and a 10-item acceptance bar.
order: 28
section: reference
updated: 2026-06-11
---

An outcome recipe is a build contract, not a rule list: follow it top to bottom and the result is shippable without a design retouch pass. Rules for individual patterns live in [dashboard](/docs/dashboard), [data visualization](/docs/dataviz), and [tokens](/docs/tokens) — this page decides **composition**: which layout, which defaults, in what order, and what "done" means.

Fastest path: use `/craft dashboard` and the recipe runs automatically. The sections below explain what the command does so you can override any step.

**Who this serves:** the zero-questions path produces a strong default for users who don't design. Every default below is overridable — users who do design treat the compositions as skeletons and go from there.

## Step 0 — Three inputs

Ask once, in one compact prompt. If the user declines or says "you decide", apply the defaults and move on — never block.

| Input | Options | Default |
|---|---|---|
| Primary user + 60-second decision | exec ("are we winning?") / operator ("what needs action now?") / analyst ("why did X change?") | operator |
| Theme | one of the four presets in [themes](/docs/themes), or the project's existing tokens | existing tokens if present, else **Graphite** |
| Density | `VISUAL_DENSITY` knob 1–10 | 7 |

The first answer selects the composition. Persona is not cosmetic — it decides what the hero metric is and what gets buried.

## Step 1 — Pick the composition

Three named compositions. Don't invent a fourth unless the brief demands it — these cover the decision shapes that recur in production SaaS.

### Overview (exec)

```
┌──────┬──────────────────────────────────────┐
│      │ topbar: title · date range · avatar  │
│ nav  ├───────────────┬──────┬──────┬────────┤
│      │ HERO metric   │ sup1 │ sup2 │ sup3   │
│      ├───────────────┴──────┴──────┴────────┤
│      │ trend area chart (2/3)  │ breakdown  │
│      │                         │ h-bars 1/3 │
│      ├─────────────────────────┴────────────┤
│      │ table (top movers, 5-8 rows)   ▼fold │
└──────┴──────────────────────────────────────┘
```

One hero answering "are we winning", 3 supports decomposing it, one trend, one breakdown. Table is below the fold on purpose — execs drill rarely. Charts large, tables small.

### Command (operator) — default

```
┌──────┬──────────────────────────────────────┐
│      │ topbar: title · global filter · ⌘K   │
│ nav  ├──────┬──────┬──────┬─────────────────┤
│      │ hero │ sup1 │ sup2 │  status strip   │
│      ├──────┴──────┴──────┴─────────────────┤
│      │ filter row: ghost buttons · reset    │
│      ├──────────────────────────────────────┤
│      │ WORK QUEUE table — dominant, 60%+    │
│      │ of viewport height            ▼fold  │
└──────┴──────────────────────────────────────┘
```

The table IS the product: the operator acts on rows. The metric strip is compact (single row, small cards). Row actions visible on hover, keyboard-navigable (j/k or arrows), status as 6px dots. Charts appear only as sparklines inside cards — a full trend chart steals space from the queue.

### Analytics (analyst)

```
┌──────┬──────────────────────────────────────┐
│      │ topbar: title · saved views · export │
│ nav  ├──────────────┬───────────────────────┤
│      │ filter rail  │ primary chart canvas  │
│      │ (dimensions, │ (area or h-bars,      │
│      │  segments,   │  direct-labeled)      │
│      │  compare)    ├───────────────────────┤
│      │              │ segmented table  ▼fold│
└──────┴──────────────┴───────────────────────┘
```

Filters are first-class (left rail, not a toolbar row) because the analyst's job is slicing. The chart canvas re-renders on every filter change — show a 150ms opacity transition, never a spinner for operations under 400ms. Direct-label series; drop the legend (see [data visualization](/docs/dataviz)).

## Step 2 — Shell spec (exact values)

- **Sidebar:** 240px (range 220–260). Subtle background tint — never full dark outside the Carbon preset. Collapses to 56px icon rail below 1024px, off-canvas below 768px.
- **Topbar:** 56px (range 48–64), same surface as content (no border-bottom heavier than 1px hairline).
- **Content:** padding 24px (density ≤4: 32px; ≥8: 16px), max-width none — dashboards use the viewport. 12-col grid, gap 16px (24px at density ≤4).
- **Card padding:** 16–20px. **Table rows:** 40–48px.
- **Above the fold at 1440×900:** hero + supports + one more content type minimum. Three content types visible — non-negotiable.

## Step 3 — Component inventory

Build exactly these, to spec:

1. **Nav item** — active = accent bg at 10% + accent text; `aria-current="page"`.
2. **Metric card, two variants** — primary (accent-tinted, 36px number) / secondary (neutral, 28px). Sparkline 32px tall. Change text plain tertiary — no pills, no colored arrows.
3. **Area chart** — gradient fill 15%→0, horizontal-only gridlines.
4. **Data table** — status dots, right-aligned `tabular-nums` numbers, sentence-case headers, row hover.
5. **Filter bar** — ghost buttons, conditional "Reset" text link.
6. **Empty / loading / error states** for every data region. Skeletons mirror the final layout geometry — never generic gray boxes of arbitrary size.

For charts, prefer Recharts or visx in React projects, ECharts or Chart.js otherwise. Sparklines as inline SVG polylines — no library needed. Tables with headless markup (TanStack Table or equivalent); avoid themed datagrids that fight the token system.

## Step 4 — Build order

Token spine first, states before polish. Skipping ahead is how AI-generated UIs pick up the "slop" tell.

1. **Tokens** — apply the theme preset or map existing tokens.
2. **Shell** — sidebar + topbar + grid, responsive collapse wired.
3. **Hero tier + supports** — the squint test must already pass here.
4. **Primary chart or work-queue table** per composition.
5. **Remaining tiers.**
6. **States** — loading / empty / error / partial for every data region.
7. **Keyboard pass** — focus-visible everywhere, table navigable, ⌘K if Command composition.
8. **Finish** — run finish-bar passes 1–4 + 7 minimum (full bar at `CRAFT_LEVEL ≥ 8`).

## Acceptance bar — "would a designer retouch this?"

Ship only when every box checks. One unchecked = not done, no exceptions:

- [ ] Squint test: eye lands on exactly ONE thing first (the hero)
- [ ] One accent color, ≤5 placements in the viewport; everything else neutral
- [ ] ≥3 content types above the fold; NO equal-weight card grid anywhere
- [ ] Every number `tabular-nums`; every comparison plain secondary text (no pills, no arrows)
- [ ] Empty, loading, and error states exist and match layout geometry
- [ ] Date range or equivalent time control present on time-series surfaces
- [ ] Keyboard: tab order logical, focus visible, table rows reachable
- [ ] Sidebar tinted (not black), headers sentence case, no uppercase except 11–13px tracked labels
- [ ] Charts: correct type per data story, single-hue opacity ramp, no legend for single series
- [ ] `prefers-reduced-motion` honored; all transitions ≤400ms

## Related

- [Themes](/docs/themes) — pick and apply a token preset before building the shell.
- [Components](/docs/components) — anatomy rules for buttons, menus, modals, and nav.
- [State-first design](/docs/state-design) — empty/loading/error state patterns for every data region.
- [Tokens](/docs/tokens) — the 3-layer token spine the preset maps into.
