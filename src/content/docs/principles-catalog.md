---
title: Principles catalog
description: 42 example design principles across 8 product categories — seed material for the /brief principles workshop.
order: 8
section: skill
updated: 2026-05-03
---

The catalog shows what opinionated, actionable, distinctive principles look like for different product types. It is used as conversation seeds during the [brief](/docs/brief) principles workshop — not as templates to adopt literally. The point is to see the form, then write your own.

## Eight product categories

Each category has five to six worked examples. Below are the strongest from each.

**Developer Tools** — *"Show the data, not the design."* Chrome retreats; data and state are the entire surface. Color is reserved for status signals; decorative elements have no place here.

**Consumer Apps** — *"The empty page is the customer."* The user's first action defines the product. The empty state is the most important screen — it receives the same design care as the filled state.

**Finance / Regulated** — *"Wrong is worse than late."* Confirm everything. Recovering from a mistake in this domain is more expensive than the friction of a confirmation step.

**Creative Tools** — *"The canvas is sacred."* Every panel, toolbar, and overlay is dismissable. The active workspace gets the largest available area. Chrome serves the canvas; the canvas never serves chrome.

**Data Analytics** — *"One number per screen."* Every dashboard surface has a hero metric; everything else supports it. Equal-weight grids push every judgment onto the user and slow time-to-insight.

**Collaborative Tools** — *"Conflict is expected, not exceptional."* Simultaneous edits are the happy path; sequential editing is the edge case. Merge conflict UI is designed before launch, not handled by a generic error.

**AI / Streaming** — *"Streaming is a state, not a transition."* Mid-stream is a first-class UI state with its own affordances — a visible caret, partial citations rendered as they arrive, and an abort affordance always present.

**Public Forms** — *"Defaults are decisions."* Every pre-filled value or pre-selected option was chosen deliberately. No field has a default that benefits the product at the user's expense.

## How a strong principle is structured

Each principle in the catalog has four parts:

1. **Title** (4–7 words) — short enough to recall without reading the file.
2. **Statement** (one line) — what the product commits to.
3. **Design implication** — what concretely changes in the product because of this principle. If nothing changes, the principle is decorative.
4. **Opposite ruled out** — the alternative the principle explicitly rejects. This is the proof of stance. A principle that rules out nothing is a platitude.

Example — full form:

> **"The keyboard is the primary input"**
> Statement: every action is reachable without a pointer.
> Implication: every modal, panel, and dropdown has a keyboard shortcut. Tab order matches visual order. Hover-only affordances do not exist.
> Opposite ruled out: "power users will learn the UI" — assuming that heavy users will mouse through menus every session trades their time for engineering convenience.

## Anti-principles

Some statements look like principles but rule nothing out. The test: flip the principle. If the opposite sounds insane rather than merely wrong, you have a platitude.

- **"Be user-friendly"** — opposite is "be user-hostile," which is insane. Every product claims this. Not opinionated.
- **"Design with empathy"** — opposite is incoherent. Too vague to produce a design implication.
- **"Make it beautiful"** — beautiful is undefined and context-dependent. No decision follows from it.
- **"Keep it simple"** — "simple" is a preference, not a constraint. "Show the data, not the design" is what this actually means for a developer tool. Use the specific version.
- **"Modern design"** — compared to what, when? An aesthetic preference with no resolution power.
- **"Accessibility matters"** — this is the floor, not a principle. Treating it as a principle permits non-accessible surfaces to exist by exception. Accessibility is non-negotiable; a principle governs trade-offs above the floor.

A principle that produces no design implication and rules out no alternative is a slogan. Slogans belong in marketing copy, not in `.ui-craft/brief.md`.

## Use during `/brief`

When the user runs the principles workshop branch (`/ui-craft:brief "first time"` or `/ui-craft:brief "update principles"`), the agent loads this catalog, surfaces two to three examples from the closest category, and asks which resonate or which the user would flip.

The seeds prime — the workshop refines. The goal is three to five principles that survive the "would anyone disagree?" test, test clean against real past decisions, and rank for conflict resolution. More than five means none of them are load-bearing.

Categories are starting points, not silos. A finance tool with power-user workflows may need a developer-tools principle alongside its compliance-first ones. The brief can borrow across categories.

## Source

[`skills/ui-craft/references/principles-catalog.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/principles-catalog.md)
