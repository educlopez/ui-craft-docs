---
title: Recipe — Landing Page
description: Build contract for a marketing landing page — three named compositions with ASCII layouts, section grammar, pricing block rules, craft constraints, and a 10-item acceptance bar.
order: 31
section: reference
updated: 2026-06-11
---

An outcome recipe is a build contract, not a rule list: follow it top to bottom and the result is publishable without a design retouch pass. Rules for individual patterns live in [components](/docs/components), [tokens](/docs/tokens), and [themes](/docs/themes) — this page decides **composition**: which layout, which defaults, in what order, and what "done" means.

Fastest path: use `/craft landing` and the recipe runs automatically. The sections below explain what the command does so you can override any step.

**Who this serves:** the zero-questions path produces a strong default for users who don't design. Every default below is overridable — users who do design treat the compositions as skeletons and go from there.

## Step 0 — Three inputs

Ask once, in one compact prompt. If the user declines or says "you decide", apply the defaults and move on — never block.

| Input | Options | Default |
|---|---|---|
| What exists to show | live product (screenshots possible) / pre-launch (no product yet) / sales-led service | live product |
| Theme | one of the four presets in [themes](/docs/themes), or the project's existing tokens | brand tokens if present, else **Graphite** |
| One conversion action | trial signup / demo request / waitlist / purchase | trial signup |

The first answer selects the composition. One page, ONE conversion action — every section either advances it or gets cut.

## Step 1 — Pick the composition

Three named compositions. Don't invent a fourth unless the brief demands it — these cover the intent shapes that recur in production landing pages.

### Product-forward (default — live product)

```
┌───────────────────────────────────────────────┐
│ nav: logo · 3-4 links · sign in · CTA (dark)  │
├──────────────────────┬────────────────────────┤
│ badge (what's new)   │                        │
│ H1 48-72px, 2-3 lines│   REAL product shot    │
│ sub ≤2 sentences     │   cropped at right     │
│ [primary] [ghost]    │   edge + fold ──────── │
│ micro-trust line     │   floating proof card  │
│ proof: metric + logos│              ▼fold     │
└──────────────────────┴────────────────────────┘
```

Text left (F-pattern — text-heavy reads left-anchored), product right, **cropped at the fold and the right edge** — a visual that ends in mid-air says "done"; one cut mid-element says "scroll". One floating mini-card over the shot (live metric, notification) adds depth and a second story beat.

### Message-forward (pre-launch / waitlist)

```
┌───────────────────────────────────────────────┐
│ nav: logo · 1-2 links · CTA                   │
│                                               │
│        H1 centered, 56-80px (Z-pattern)       │
│        sub, one sentence                      │
│        [email input + join CTA, attached]     │
│   offset proof: avatars+count LEFT, badge     │
│   RIGHT — break the symmetry deliberately     │
│        abstract visual / motif  ────── ▼fold  │
└───────────────────────────────────────────────┘
```

Center is allowed ONLY with asymmetric supporting elements — center-everything-symmetric is the template tell. No product? Never fake screenshots: use a distinctive abstract motif tied to the brand hue, or typographic composition.

### Proof-forward (sales-led / B2B service)

```
┌───────────────────────────────────────────────┐
│ nav + compact hero: H1 + sub + [demo CTA]     │
├───────────────────────────────────────────────┤
│ outcome strip: 3 specific metrics, large nums │
├───────────────────────────────────────────────┤
│ case block: quote + attributed face + numbers │
│ alternating with capability rows      ▼fold   │
└───────────────────────────────────────────────┘
```

The hero is modest; evidence is the hero. Numbers large and `tabular-nums`; every claim attributed (name, role, company). Buyers here distrust adjectives and read proof.

## Step 2 — Section grammar (below the hero)

Order, each answering ONE question; spacing 80–160px between majors, varied:

1. **Proof strip** — "do people like me use this?" Logos at low contrast + one specific stat ("teams cut X from 6h to 20min" beats "trusted by thousands").
2. **Feature rows × 2–3** — "what does it do for me?" Asymmetric alternating rows with real visuals (chart, flow, screenshot detail). Never a uniform 3-column icon grid — that's the #1 template tell.
3. **How it works / depth section** — "is it credible?" 3 steps max, or one technical diagram. Cut it if the product is self-evident.
4. **Pricing teaser or full pricing** — "can I afford it?" See pricing block rules below.
5. **Final CTA** — "ok, how do I start?" Restate the primary action + the micro-trust line. One section, not a wall.
6. **Footer** — boring on purpose. Sitemap, legal, socials. Footers that try to be clever bury the links people need.

**Pricing block rules** (when present): highlight the recommended plan (border/badge/size) without making siblings look irrelevant; sticky column headers on long comparison tables; tooltips on hover for feature jargon; discounts shown as % under $100 and absolute amounts above (perceived size); charm pricing where the product tolerates it; scarcity only if genuinely true — faked urgency reads instantly and burns trust.

## Step 3 — Craft constraints (the ones landings break most)

- **CTA hierarchy is three levels that must not tie:** nav CTA ≠ hero primary ≠ section CTAs. Hero primary is the most prominent interactive element on the page (see [components](/docs/components)).
- **Headline carries a dual benefit** where honest — immediate + long-term ("Answers today, confidence at month-end"). Front-load the key noun. No jargon: a stranger gets the value in one read.
- **One signature detail** — drawn underline on the key word, a custom marker, a motif from the product mark. Exactly one.
- **Specific beats vague, everywhere:** metrics with units, named customers, real UI. Every "world-class/powerful/seamless" is a slot where evidence should be.
- **Gradients**: if used, adjacent hues only, plus subtle grain/noise to kill the flat plastic look. Never the purple-cyan template wash.
- **Copy budget:** no section over 2–3 sentences; CTAs are verb + outcome ("Start free trial", not "Get started" twice in different colors).

## Step 4 — Build order

1. **Tokens** — apply the theme preset or map existing tokens.
2. **Nav + hero** — squint test must pass with the hero alone.
3. **Proof strip.**
4. **Feature rows.**
5. **Pricing** (if present).
6. **Final CTA + footer.**
7. **Responsive pass** — hero stacks text-first on mobile, product shot below, still cropped.
8. **Motion** — entrances subtle, one scroll reveal per section max (see [motion](/docs/motion)).
9. **Finish** — run finish-bar passes 1–4 + 8.

## Acceptance bar — publishable without retouching?

Ship only when every box checks. One unchecked = not done, no exceptions:

- [ ] Squint test on the hero: H1 → primary CTA, in that order; nothing competes
- [ ] One conversion action; every section advances it
- [ ] Product/visual cropped at fold or edge (scroll tease); no visual floating in dead air
- [ ] CTA hierarchy: 3 distinct levels, no ties
- [ ] At least one specific, attributed proof point; zero unattributed superlatives
- [ ] No uniform icon-card grid anywhere
- [ ] Section spacing 80–160px, varied; every section answers one question
- [ ] One signature detail, exactly one
- [ ] Mobile: hero readable without zoom, CTAs thumb-reachable, no horizontal scroll
- [ ] `prefers-reduced-motion` honored; entrances ≤400ms; no scroll-jacking

## Related

- [Themes](/docs/themes) — pick and apply a token preset before building the shell.
- [Components](/docs/components) — anatomy rules for buttons, links, and nav.
- [Tokens](/docs/tokens) — the 3-layer token spine the preset maps into.
- [Recipe — SaaS Dashboard](/docs/recipe-dashboard) — when the hero shot needs a product UI worth showing.
