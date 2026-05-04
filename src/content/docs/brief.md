---
title: Brief
description: Durable design brief at `.ui-craft/brief.md` — anchors every design decision in the project across sessions.
order: 5
section: skill
updated: 2026-05-03
---

The brief is a short markdown file committed to your repo at `.ui-craft/brief.md`. It records what the product is, who it serves, and what it believes — once, durably, in a form the agent reads before touching any UI. Without it, every session re-derives context, decisions drift, and principles get re-litigated from scratch.

## Why a brief

Most design drift isn't caused by bad decisions — it's caused by decisions made without the same context as the last ones. A designer who wasn't in the room chooses the wrong font weight. An agent that doesn't know the target user adds onboarding wizard steps to a product whose principle is "blank canvas over guidance." A sprint planning session relitigates whether confirmations should be modals or toasts — again.

The brief fixes this by writing down what the product IS and what it BELIEVES. Not aspirationally — specifically. It's not a mission statement. It's a constraint document: five sections, all required, all short, designed so any agent or collaborator can read it in under two minutes and make consistent decisions without asking.

## Five required sections

### 1. Product purpose

One sentence. Specific enough that two different products could not use it. "An AI-powered platform for modern teams" tells the agent nothing about trade-offs. "Schedules end-of-day cash reconciliation reports for retail finance teams" tells the agent everything.

**Strong:** "Schedules end-of-day cash reconciliation reports for retail finance teams."
**Weak:** "An AI-powered platform for modern teams."

### 2. Primary user

One sentence. Role + context + device at minimum. Frequency of use and session length are useful additions. Specific enough that a UI decision could differ from a hypothetical secondary user.

**Strong:** "A finance ops lead at a 200-store retail chain, working in the office between 6am and 9am, on a 13-inch laptop."
**Weak:** "Anyone who manages money."

### 3. Three to five principles

Opinionated statements about how this product behaves — not aspirations, but beliefs. List them in conflict-resolution order: when two apply to the same decision, the higher one wins.

Each principle must clear five bars: opinionated, actionable, memorable, distinctive, testable. The test: would anyone disagree? If the opposite sounds insane, it's a platitude. "Be user-friendly" fails. "Wrong is worse than late" passes.

**Strong:** "Wrong is worse than late." Resolves every confirmation modal debate.
**Weak:** "Accuracy matters." A category label, not a constraint.

### 4. Success metric

One to two sentences. Observable user behavior, not a business outcome. Something surface design directly influences.

**Strong:** "User identifies the day's outlier stores within 30 seconds of landing on the dashboard."
**Weak:** "Increase MRR by 12%." — The surface has no direct lever on a revenue metric.

### 5. Out of scope

Three to five declarative statements about what this surface deliberately does not do. Each item should prevent at least one future feature request from landing in the wrong place.

```
- Does not display historical trends beyond 30 days
- Does not support bulk edits from this surface
- Does not expose raw transaction data
```

## Principles workshop

When the user is starting fresh and has no principles yet, load the [principles catalog](/docs/principles-catalog) to seed the conversation. The catalog shows what opinionated principles look like for eight product categories — developer tools, consumer apps, finance, creative tools, analytics, collaborative tools, AI surfaces, and public forms.

A strong principle clears five bars: opinionated (takes a stance), actionable (resolves a real debate), memorable (short enough to recall), distinctive (reflects this product), and testable (a design can be evaluated against it). Apply the "would anyone disagree?" test: if the opposite sounds insane, the principle is a platitude. Trim to three to five — more than five means none of them are load-bearing.

Test candidates against past decisions. If a principle would have flipped a decision you stand behind, it is the wrong principle.

## How the agent uses the brief

Reading `.ui-craft/brief.md` is Discovery Phase Step 1 — it runs before any other analysis on a UI task.

When making a design decision, the agent cites the principle it applies: *"Density reduced per principle 2: 'Show the data, not the design.'"* If a decision isn't covered by any principle, the gap is flagged rather than guessed. The brief is updated; the decision isn't treated as wrong by default.

During `/finalize`, the brief governs which finish-bar passes can be deferred. A project that explicitly records "polish deferred to completeness" in the brief can downgrade pixel-honesty findings to Minor. No brief entry means no deferral — the bar applies.

Pivots are append-mostly: deprecated principles are struck through with a date and a reason, not deleted. The team should be able to trace why a principle changed.

## Run the command

```bash
/ui-craft:brief                              # auto-detect
/ui-craft:brief "first time"                 # full new-brief flow
/ui-craft:brief "update principles"          # focused update
```

## Source

[`skills/ui-craft/references/brief.md`](https://github.com/educlopez/ui-craft/blob/main/skills/ui-craft/references/brief.md)
