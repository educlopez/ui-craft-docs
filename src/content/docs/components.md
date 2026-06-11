---
title: Component Contracts
description: Anatomy rules for the workhorse components — buttons (including the destructive friction ladder), text links, icon labels, menus, modals, search, cards, and nav.
order: 30
section: reference
updated: 2026-06-11
---

Anatomy-level rules for the workhorse components: buttons, menus, modals, search, cards, nav. Surface-level composition lives in the [dashboard recipe](/docs/recipe-dashboard); form fields live in [forms](/docs/forms); metric cards and data tables live in dashboard. This page is the layer below: what makes an individual component read as designed rather than assembled.

---

## Buttons

**Anatomy:**

- Horizontal padding ≈ 2× vertical padding. Floors: 16px horizontal, 10px vertical. Equal padding on all sides makes a button read as a tile, not an action.
- Heights: 44–48px on touch, 32–40px acceptable on desktop-only surfaces. **Why:** pointer precision — a mouse hits a 32px target reliably; a thumb doesn't. **When it breaks:** any desktop surface that also ships to touch (most do) — then 44px is the floor everywhere. See [accessibility](/docs/accessibility) for hit-area expansion techniques when the visual must stay smaller.
- Label 14–17px. Check the height/font pair for clean vertical centering: a 32px button with 17px text can't center on whole pixels — pick value pairs whose difference is even, or the label sits visibly off-center.
- Inline groups order left→right by importance. Every state (default, hover, pressed, loading, disabled) is distinguishable without a costume change — one property shift per state transition is usually enough.

**Icon placement carries meaning:**

- Icon **left** of label — aids scanning, communicates the action type at a glance (add, edit, download).
- Icon **right** of label — consequence or destination ("Log out →", "Continue →", external-link marker).
- Don't decorate with an icon that repeats the label without adding either.

**Depth:** flat or one subtle shadow pair. Gradient fills and inner shadows on buttons are expressive opt-ins for branded marketing surfaces — inside a product they read as dated. Anti-slop rules apply.

**Tiers and their contracts:**

- **One primary per context.** Two solid CTAs in one view is a tie, and ties stall decisions.
- **Secondary = outline at ≥3:1 contrast.** A light-gray outline button is indistinguishable from disabled — the outline must have enough contrast to register as an interactive boundary.
- **Tertiary = text + underline.** The underline is an accessibility requirement for color-blind recognition, not decoration.
- **Avoid disabled buttons.** They can't explain themselves, give nothing on press, and assistive tech often skips them entirely. Alternatives in order: keep enabled and validate on press with inline errors; remove the action and explain why; show a lock icon + explanation on hover/press. If a disabled button survives, pair it with visible inline text saying exactly what unlocks it.
- Icon weight matches text weight; icon size matches text size. If an icon overpowers its label, fix it with a lighter stroke — not a washed-out color.

**Destructive actions — friction proportional to blast radius:**

- **Low** (recoverable, undo exists): act immediately + undo toast. Friction here is rude.
- **Medium** (recoverable with effort): confirmation dialog with verb-labeled buttons + the affected items named and highlighted.
- **High** (irreversible, shared, or bulk): confirmation + explicit acknowledgment — type the resource name or tick a checkbox before the destructive button activates. A misclick must not be able to complete the flow.

Destructive buttons get **low** visual prominence (tertiary/outline) in the normal UI — prominence belongs to the actions you want repeated. Inside the confirmation dialog, the destructive verb is the filled button, in the danger color.

---

## Text Links

- **The link affordance is exclusive.** Underline + link color mean "this navigates" — nothing else gets that treatment. A colored underlined heading that isn't a link is a broken promise.
- Inline links inside body text need the underline (color alone fails color-blind users). Standalone links in chrome (nav, footers) may drop the underline when context already signals interactivity.

---

## Icon Labels

- **Prefer a visible text label next to icons.** Only universally-learned glyphs survive alone (search, close, play); everything else is a guess that costs a tap to verify.
- Icon-only buttons require `aria-label` + tooltip as the floor — but visible labels beat both. The visible label is not a fallback; it's the default.

---

## Menus & Dropdowns

- **≤5 options: don't use a dropdown.** Radios or a visible segmented control — one less click, options scannable without interaction. The dropdown earns its collapse only past ~5 options (6–10 still favors radios when vertical space allows; >10 wants type-ahead — see the full selection ladder in [forms](/docs/forms)).
- **Long lists get a scroll container with an affordance:** visible scrollbar + the last visible item partially cut or faded. A list that ends exactly at the container edge looks complete — users don't scroll it. Cutting an item mid-row is the strongest "there's more" signal available.
- **Very long lists** (countries, currencies, assignees) escalate to a searchable sheet or popover — type-ahead beats scrolling past ~20 items, especially on mobile.
- Multi-select: each selected option visibly marked in the list + a one-step "clear all". Nested options: signal children before expansion (chevron, count badge).
- Power-user menus show keyboard shortcuts inline, right-aligned, in muted monospace.
- On low-contrast surfaces, an open menu needs a hairline stroke and/or shadow pair to separate from the page — whitespace alone can't establish the overlay plane.

---

## Modals

- **A modal is for decisions that interrupt for good reason** — destructive confirmations, flows that must not lose context. Minor errors and notices stay inline. If putting a task in a modal adds steps versus doing it in-flow, it doesn't belong in a modal.
- **Three ways out, always:** visible close button (×), an explicit cancel action, and overlay click. Escape key too — see [accessibility](/docs/accessibility) for focus-trap rules.
- **Confirmation buttons are verbs, never Yes/No.** "Delete project" / "Cancel" — the button restates the consequence. Yes/No forces re-reading the question; a negatively phrased question ("Don't you want to keep…?") plus Yes/No produces wrong clicks under time pressure.
- Multi-step flows inside a modal show progress (step count). If the flow grows past ~3 steps, question the modal — promote it to a page.

---

## Search

- Input ≥44px tall with a defined boundary (border or fill). A search field users can't find is a navigation failure.
- Placeholder shows example queries or the dominant content type ("Search projects, people, docs…"), not the word "Search" the icon already communicates.
- Type-ahead suggestions as the user types. Recent searches with individual remove + clear-all for revisit-heavy products.
- **The no-results state is a fork, not a wall.** Show spelling-adjacent alternatives, popular queries, or a scoped-search escape ("search all workspaces instead"). A bare "no results found" ends the session — design it like any other empty state.

---

## Cards (content cards)

Metric cards have their own contract in the dashboard reference. For content and preview cards in grids:

- **Variable-length content must not break grid rhythm.** Either clamp text (`line-clamp` + optional tooltip for the full string) or set a shared min-height per row. Mixed card heights in one grid read as unfinished.
- Identical image aspect ratio across every card in the grid — one off-ratio image breaks the set.
- Card CTA at the bottom (the reading endpoint), with hover + active states on desktop and a full-card tap target on touch.
- Internal padding 16–24px; grid gap 16–40px scaled by `VISUAL_DENSITY`. Multi-column grids want short content; single-column (mobile) tolerates longer — the card is the whole viewport there.

---

## Navigation (top bar)

- Logo top-left links home. Universal recovery convention — breaking it strands lost users.
- Active page visibly marked; hover states on every link.
- One CTA in the nav, visually distinct from both the plain links and the page's own primary CTA — three levels that must not tie.
- **Sticky nav needs a plane separator once content scrolls under it:** 1px hairline at low contrast, or backdrop blur (20–32px) over a 50–80% opacity fill. Without it the nav and content occupy the same visual plane and collide.
- **Transparent or blurred navs must be contrast-checked against every background they scroll over** — the hero section may pass and the white section below fail. Provide a scrolled variant (solid fill) that activates past the hero.
- Overflow: collapse low-priority links into a "More" menu or push them to the footer. Never shrink the type to fit.

---

## Related

- [Forms](/docs/forms) — inputs, labels, validation, and the selection-widget ladder (radios vs. dropdowns vs. autocomplete).
- [Accessibility](/docs/accessibility) — hit areas, focus rings, keyboard contracts, ARIA requirements.
- [Recipe — SaaS Dashboard](/docs/recipe-dashboard) — how these components compose into a full surface.
- [State-first design](/docs/state-design) — empty, loading, error states for every component that can have them.
