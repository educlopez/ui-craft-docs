---
title: Heuristic critique
description: Score your UI against Nielsen's 10 usability heuristics + 6 design laws, with impact framing for PMs.
order: 20
section: reference
updated: 2026-04-18
---

Most UI review is vibes. `/ui-craft:heuristic` produces a scored, machine-parseable scorecard — every finding gets a heuristic, a 1-5 score, and an impact tag a PM can paste into Linear or Jira. Usability is not a knob: `CRAFT_LEVEL` does not relax these scores. A 2 is a 2 at every craft level.

This page is the rubric: Nielsen's 10 heuristics (scored 1-5), 6 design laws (PASS/FAIL), and the impact tags that rank findings.

## Scoring rubric

Applies to every heuristic.

| Score | Meaning |
|---|---|
| 1 | Blocks users. Core task cannot complete. |
| 2 | Severe friction. Users abandon or error repeatedly. |
| 3 | Works but confusing. Users complete with hesitation. |
| 4 | Works, minor polish left. No user impact. |
| 5 | Best-in-class. Nothing to add. |

Every finding is recorded as a row: `| Heuristic | Score | Finding | Impact |`.

## Nielsen's 10 heuristics

Source: Nielsen, J. (1994). *10 Usability Heuristics for User Interface Design*. Nielsen Norman Group.

### 1. Visibility of system status

Keep users informed about what is going on, through appropriate feedback within reasonable time.

What to look for:

- Every async action has a loading state (spinner, progress, skeleton)
- Submit buttons disable + show progress while in flight
- Optimistic UI reconciles on server response (no silent failure)
- Navigation state is visible (active tab, breadcrumb, selected row)
- Long operations (>5s) escalate to progress percentage or estimate

Common AI-generated failures: form submit has no loading state; toast disappears before the user reads it; no confirmation that a save succeeded.

### 2. Match between system and the real world

Speak the user's language. Follow real-world conventions.

What to look for:

- No system jargon in user copy ("exception thrown", "null ref")
- Icons match cultural convention (trash = delete, not a cog)
- Dates formatted for the user's locale, not ISO
- Error messages speak human, not stack trace
- Metaphors consistent (folder, file, workspace)

Common AI failures: "Submit payload" instead of "Save changes"; "Entity not found" instead of "We couldn't find that project"; time shown as Unix timestamps.

### 3. User control and freedom

Users perform actions by mistake. They need a clearly marked emergency exit.

What to look for:

- Every destructive action has Undo (preferred) or a confirm dialog
- Modals close on Esc and on backdrop click
- Multi-step flows have Back without losing state
- Autosave preserves in-progress work on nav away
- URL reflects state so the back button works

Common AI failures: delete is instant and irreversible; modal traps the user; browser back loses all form input.

### 4. Consistency and standards

Users should not have to wonder whether different words or actions mean the same thing. Follow platform conventions.

What to look for:

- Primary action placement consistent across views
- Same verb for same operation throughout ("Delete" always, not "Delete"/"Remove"/"Trash")
- Icon meanings stable across screens
- Form patterns match platform (Cmd+Enter submits on macOS)

Common AI failures: buttons swap position between modals; three different words for "delete" in one product; scroll hijacking on a standard content page.

### 5. Error prevention

Better than good error messages is a design that prevents the problem from occurring.

What to look for:

- Destructive actions require typing the resource name
- Disabled states prevent invalid submissions (with explanation on hover)
- Input constraints enforced client-side (date pickers, typed inputs)
- Autosave + version history on content-creation surfaces
- Warn before leaving unsaved changes

Common AI failures: freeform "Are you sure?" confirms users mindlessly click; no validation until submit; paste blocked on fields.

### 6. Recognition rather than recall

Minimize memory load by making objects, actions, and options visible.

What to look for:

- Recently used / favorited items surfaced
- Autocomplete on any field with a known set of answers
- Keyboard shortcuts listed in tooltips (not buried in help)
- Current selection persists visibly
- Empty states suggest next actions

Common AI failures: Cmd+K exists but undiscoverable; user must remember which tab they were on after refresh; dropdown with 200 options and no search.

### 7. Flexibility and efficiency of use

Accelerators — unseen by novice — may speed up the interaction for the expert.

What to look for:

- Keyboard shortcuts for frequent actions
- Bulk actions on lists (multi-select + batch operate)
- Saved views / filters / segments
- Customization for heavy users (column config, hotkeys)
- Paste-to-action patterns (URL paste auto-parses)

Common AI failures: same flow for novice and expert; no multi-select in lists of 100+; no command palette on tools users spend hours in.

### 8. Aesthetic and minimalist design

Dialogues should not contain information that is irrelevant or rarely needed.

What to look for:

- Every section answers one question; no filler
- Visual weight proportional to importance
- One accent, 3-5 placements per viewport
- White space is used, not avoided
- No decorative graphics competing with content

Common AI failures: hero has 4 CTAs of equal weight; every card has a colored top border; gradient backgrounds on every section.

### 9. Help users recognize, diagnose, and recover from errors

Error messages in plain language, precise about the problem, constructive about the solution.

What to look for:

- Errors appear inline, at the field, not as a global banner
- Messages specify what went wrong AND how to fix it
- Server errors include a copy-to-clipboard ID for support
- Recovery is one click (retry, undo, contact support)
- Network errors differ from validation errors

Common AI failures: "Something went wrong" with no detail, no retry, no support path; red toast that disappears before the user reads it; error blames the user.

### 10. Help and documentation

Help may be necessary even though it is better if the system can be used without it.

What to look for:

- Help is contextual, not a separate site
- Empty states double as onboarding
- Tooltips on non-obvious icons
- Inline help links in complex forms
- Searchable docs for deep features

Common AI failures: no tooltips on icon-only buttons; help buried behind a "?" with a 404 behind it; onboarding is a 10-slide lightbox users skip.

## The 6 design laws

Each scored PASS / FAIL with a specific detail. These are physics and psychology, not preferences — failing them has measurable UX impact.

### Fitts's Law

Source: Fitts, P. M. (1954). *The information capacity of the human motor system in controlling the amplitude of movement*.

Statement: time to acquire a target is a function of its size and distance.

- PASS — touch targets >=44px on mobile, >=24px on desktop; primary CTA in natural eye/thumb path; related actions grouped
- FAIL — touch targets under 44px mobile; destructive actions adjacent to primary actions; CTA far from where the user just looked

### Hick's Law

Source: Hick, W. E. (1952). *On the rate of gain of information*.

Statement: decision time grows logarithmically with the number of choices.

- PASS — nav <=7 items at any level; no field offers 20+ unfiltered options without search
- FAIL — 12+ top-nav items; 200-entry select with no type-ahead; dashboard with 18 equal-weight metrics

### Doherty Threshold

Source: Doherty, W. J. & Thadani, A. J. (1982). *The Economic Value of Rapid Response Time*. IBM.

Statement: productivity soars when response time is under 400ms.

- PASS — perceived response <400ms; optimistic UI for saves, likes, toggles; skeletons within 200ms
- FAIL — form submit shows a spinner for 2s with no optimistic state; nav click waits on full server round-trip before painting anything

### Cleveland-McGill hierarchy

Source: Cleveland, W. S. & McGill, R. (1984). *Graphical Perception*. JASA.

Statement: humans decode visual encodings with different accuracy — position > length > angle > area > color-hue.

- PASS — quantitative comparisons use position or length (bar, line, dot); color reserved for category; no pie or 3D
- FAIL — pie chart used for comparison; donut with >=5 slices; color-gradient encodes magnitude where length would work

See [Data visualization](/docs/dataviz) for the full chart-selection matrix.

### Miller's Law

Source: Miller, G. A. (1956). *The Magical Number Seven, Plus or Minus Two*.

Statement: humans hold ~7 (+/-2) items in working memory. Chunking extends this.

- PASS — navigation <=7 items per level; forms chunked into <=5 sections; multi-step flows <=5 steps or with clear progress
- FAIL — 14-item top nav; single-page form with 23 ungrouped fields; 9-step checkout with no progress indicator

### Tesler's Law

Also called the Law of Conservation of Complexity. Attributed to Larry Tesler.

Statement: every application has an irreducible amount of complexity. The only question is who deals with it — the user, the UI, or the backend.

- PASS — complexity absorbed by sensible defaults, automation, or backend inference; advanced controls behind progressive disclosure
- FAIL — UI exposes every backend knob; user must configure 8 things before the primary task; no default state, only empty forms

## Impact tags

Every finding carries one impact tag. This is how a PM prioritizes.

| Tag | Meaning | Example |
|---|---|---|
| `blocks-conversion` | User cannot complete the core journey | Signup submit silently fails on network error |
| `adds-friction` | User completes but abandonment rises | Submit button has no loading state; users click 3-4x |
| `reduces-trust` | Quality signal — affects retention | Typos in error messages; inconsistent button styles |
| `minor-polish` | Craft layer only; no measurable user impact | Missing `tabular-nums` on a metric |

Rank findings by impact tag, not by heuristic order: `blocks-conversion > adds-friction > reduces-trust > minor-polish`.

## Output format

The command outputs exactly this shape. Three tables, then a ranked top-findings list.

```markdown
## Heuristic Scorecard

| Heuristic | Score | Finding | Impact |
|-----------|-------|---------|--------|
| Visibility of system status | 2 | Form submit has no loading state; users click 3-4x | adds-friction |
| Match system and real world | 4 | Dates formatted for locale; one copy says "entity" | minor-polish |
| Error recovery | 1 | "Something went wrong" with no ID, no retry | blocks-conversion |

## Design Law Audit

| Law | Pass/Fail | Detail |
|-----|-----------|--------|
| Fitts's Law | FAIL | Primary CTA is 32px tall on mobile; expected >=44px |
| Hick's Law | PASS | 5 top-nav items — within 7+/-2 |
| Doherty Threshold | FAIL | Save shows spinner for ~1.8s with no optimistic state |

## Top findings (ranked by impact)

1. Error recovery (score 1, blocks-conversion) — strands users; no ID, no retry, no support path
2. Fitts's Law (FAIL, adds-friction) — primary CTA 32px on mobile; raise to >=44px
3. Doherty Threshold (FAIL, adds-friction) — save feels broken; add optimistic UI
```

Only include findings at `reduces-trust` or worse in the ranked list. Cap at 5.

## Run it

```
/ui-craft:heuristic [path] [--persona=<name>]
```

The persona flag layers a walkthrough checklist on top of the rubric. See [Persona walkthroughs](/docs/personas) for the five archetypes.
