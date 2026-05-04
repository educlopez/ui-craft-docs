---
title: Tokens
description: 3-layer token spine — primitive → semantic → component. Both light and dark intentionally crafted, not just inverted.
order: 6
section: skill
updated: 2026-05-03
---

Tokens are the architectural contract that ties every scale — color, spacing, type, radii, shadows, motion, z-index — into a coherent system. The three-layer model (primitive → semantic → component) is the canonical structure that mature design systems converge on. Without it, dark mode is a patch, theming is a rewrite, and every component hard-codes values that drift from each other over time.

## The three layers

### Layer 1: Primitives

Raw values, named for what they are — not how they're used. `--gray-500`, `--space-md`, `--radius-lg`. Reusable across themes. The naming rule: primitives are nouns about the value. `--button-bg` is a component token; `--text-primary` is a semantic token. Both are wrong at this layer.

```css
/* Neutral ramp — warm tint, not pure gray */
--gray-50:  oklch(98%  0.008 60);
--gray-500: oklch(58%  0.016 60);
--gray-950: oklch(12%  0.006 60);

/* Spacing — 8pt scale */
--space-sm:  0.5rem;   /* 8px */
--space-md:  1rem;     /* 16px */
--space-lg:  1.5rem;   /* 24px */
```

Use OKLCH for perceptually uniform color steps. A ramp built in HSL has uneven perceived brightness across hues — OKLCH keeps lightness visually consistent regardless of hue.

### Layer 2: Semantics

Contextual meaning. References primitives. This is the layer that switches between light and dark mode — primitives never change; semantics remap.

```css
:root {
  --surface-canvas:  var(--gray-50);
  --surface-raised:  var(--gray-100);
  --text-primary:    var(--gray-900);
  --text-secondary:  var(--gray-600);
  --border-default:  oklch(0% 0 0 / 0.12);
}

[data-theme="dark"] {
  --surface-canvas:  var(--gray-950);
  --surface-raised:  var(--gray-900);
  --text-primary:    var(--gray-50);
  --text-secondary:  var(--gray-400);
  --border-default:  oklch(100% 0 0 / 0.12);
}
```

The surface stack names five elevation levels: `canvas`, `raised`, `overlay`, `sunken`, `inverse`. Every component maps to one of them — no component hard-codes a color value that bypasses this layer.

### Layer 3: Components

Specific usage. References semantics. Created on demand per component — not pre-built as a blanket catalog.

```css
--button-primary-bg:        var(--accent-bg);
--button-primary-bg-hover:  var(--accent-bg-hover);
--button-primary-text:      var(--accent-text);
--input-border:             var(--border-default);
--input-border-focus:       var(--border-focus);
```

Create component tokens only when a component has multiple states or themes. A simple component that references semantic tokens directly is correct — don't add a layer to prove you understand the system.

## Light and dark — both intentional

The intentional-dark test: if your dark mode maps `--text-primary` from `gray-900` to `gray-100` and stops, you inverted — you did not design. Real dark mode rebalances the entire surface stack.

**Canvas.** `--surface-canvas` in dark sits near `gray-950` with a slight hue tint. Pure `#000` reads as broken on any monitor with backlight bleed and strips warmth from everything above it.

**Accent.** Saturated accent colors burn on dark surfaces. Drop chroma 10–15% in OKLCH when switching to dark. The hue stays constant; only the `C` value shifts. Brand recognition is preserved; visual strain is reduced.

**Shadows.** Black-on-near-black box-shadows are invisible. In dark mode, replace depth shadows with a `1px` border ring using `--border-default`, or a subtle top-edge highlight:

```css
/* Light: shadow for depth */
box-shadow: var(--shadow-md);

/* Dark: border ring replaces shadow */
box-shadow: inset 0 1px 0 oklch(100% 0 0 / 0.08);
border: 1px solid var(--border-default);
```

**Text.** Pure white on dark backgrounds creates halation on OLED panels. Use `--gray-50` or `oklch(97% 0.01 60)` as the lightest text value — not `#ffffff`.

## Required token categories

Every non-trivial UI needs all seven. Missing categories produce ad-hoc inline values that break theming.

| Category | Primitive examples | Semantic examples |
|---|---|---|
| Color | `--gray-50` → `--gray-950`, `--accent-50` → `--accent-950` | `--text-primary`, `--surface-raised`, `--accent-bg` |
| Spacing | `--space-xs` → `--space-4xl` | (used directly) |
| Type | `--text-xs` → `--text-5xl`, `--leading-tight`, `--font-medium` | `--font-display`, `--font-body`, `--font-mono` |
| Radii | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full` | `--radius-card`, `--radius-button`, `--radius-input` |
| Shadows | `--shadow-sm` → `--shadow-xl` | `--elevation-raised`, `--elevation-overlay` |
| Motion | `--duration-instant` → `--duration-slow`, `--ease-out`, `--ease-spring` | `--motion-hover`, `--motion-modal-in` |
| Z-index | `--z-dropdown`, `--z-modal`, `--z-toast` | (used directly) |

Radii vary by element role — buttons, cards, and inputs each carry a distinct radius. Uniform radius on every element is the clearest signal of generated UI.

Z-index values use semantic labels, never arbitrary integers. `--z-modal: 40` is recoverable; `z-index: 9999` is a maintenance problem.

## Run the command

```bash
/ui-craft:tokens                             # audit if present, establish if absent
/ui-craft:tokens audit                       # audit only
/ui-craft:tokens establish                   # propose new spine
/ui-craft:tokens color                       # focus on one category
```

## Source

[`skills/ui-craft/references/tokens.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/tokens.md)
