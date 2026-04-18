---
title: Persona walkthroughs
description: Five archetypes for walking your UI through real users — first-timer, power, low-bandwidth, screen-reader, one-thumb.
order: 21
section: reference
updated: 2026-04-18
---

A heuristic score says what's wrong in the abstract. A persona walkthrough says *who* it breaks for. Use these as overlays on [Heuristic critique](/docs/heuristics): same UI, five different lenses. A UI can score well on Nielsen and still fail Kwame.

Each persona ships with a checklist. Every un-ticked box is a finding, ranked with the same impact tags (`blocks-conversion`, `adds-friction`, `reduces-trust`, `minor-polish`).

## 1. First-timer Priya

**Never used this product category. Doesn't know what's possible.**

28, mobile-only, moderate English literacy, small-business owner evaluating the product for the first time. Cold from a social ad. 90 seconds before she bounces. Doesn't know industry jargon and won't Google it.

Journey: land → understand what the product does → decide whether to sign up → complete signup → reach the "first value" moment.

### Checklist

- Above the fold, the product is clear in 5 seconds
- No jargon on the landing page ("synergy", "orchestrate", "leverage")
- One primary CTA is obvious — no hunt for "sign up"
- Signup asks for the minimum; no 8 fields before seeing the product
- Email / Google / Apple auth all work on mobile
- Clear next action after signup — not a blank dashboard
- Empty states tell her what to do: "Create your first X"
- Unknown terms have tooltips or inline explanations
- Error messages explain the problem in plain language
- If a tap does nothing, she knows whether it's loading or broken
- She can undo her first destructive action
- The primary value moment is reachable in <=3 steps from signup
- Help/contact reachable without leaving the app
- Autocorrect doesn't fight the form (autocomplete attrs set)
- She can pinch-zoom if text is too small

### Red flags

- "AI-powered orchestration platform" without saying what it does
- Signup asks for company size / industry / role before account creation
- Dashboard empty with no "Create your first" CTA
- Tooltips missing on icon-only buttons
- Email verification required before any product value

## 2. Power user Jordan

**Lives in this tool 4+ hours a day. Expects to fly.**

34, senior ops at a scaleup. Keyboard-first, multiple-monitor, deep domain expertise. Metrics their own speed — any friction compounds. Will build a userscript or quit the product if workflows feel slow.

Journey: log in → jump to a specific record via shortcut or search → perform bulk operations → export/report → next task.

### Checklist

- Cmd+K (or /) command palette exists and opens in <100ms
- Every common action has a keyboard shortcut, listed in tooltips
- Tab order sensible; Shift+Tab reverses; Escape closes
- Bulk select works on lists of 100+ with Shift-click and Cmd+A
- Common bulk actions execute in <400ms
- URL state reflects filters / sort / selection
- 1000+ items paginate without virtualized-list jank
- Saved views / segments persist across sessions
- Never trapped in a modal that can't Escape out
- Destructive actions are undoable, not confirm-blocking
- Forms submit on Cmd+Enter
- Columns, hotkeys, or density are customizable
- Paste-to-action works (paste a URL, paste a list of IDs)
- Export works for the current view, not "everything"
- No scroll hijacking, no unasked page transitions

### Red flags

- No command palette on a tool users spend hours in
- Modal-confirm on every delete instead of undo toast
- 200+ item lists without bulk select
- Filters reset on navigation — state lives in local React, not URL
- Shortcuts discoverable only in a hidden help page

## 3. Low-bandwidth Adaeze

**2G cellular, older Android, often offline.**

31, field worker in a region with intermittent connectivity. Budget Android (4GB RAM, Chrome). Tethers off a phone. In and out of signal throughout the day. Data costs real money per MB.

Journey: open on a flaky connection → read or edit a record → queue work while offline → sync on reconnect.

### Checklist

- First paint <3s on simulated 2G (Lighthouse mobile)
- Critical CSS inlined; no blocking font load
- Images have explicit dimensions (no layout shift)
- Images lazy-load below the fold; modern formats (WebP/AVIF)
- Bundle doesn't ship megabytes of unused code
- Skeletons appear within 200ms
- Offline state detected and communicated
- Writes queued locally, reconciled on reconnect
- Optimistic UI avoids round-trip waits
- Error messages distinguish network from server failure
- Retry is one tap, not "refresh the page"
- Text readable without images loaded
- App doesn't poll aggressively on cellular
- Large uploads resumeable or chunked
- Service worker caches the shell for instant return visits

### Red flags

- Blank screen for 6+ seconds on 2G
- "Network error" toast that disappears; no retry, no queue
- Data lost on tab close
- Every interaction requires a server round-trip before UI update
- Hero video autoplays over cellular

## 4. Screen-reader user Kwame

**Fully blind. NVDA + Chrome. Keyboard-only. Needs semantic HTML.**

40, accessibility consultant, experienced screen-reader user. NVDA on Windows + Chrome. Never uses a mouse. Relies on heading structure, ARIA landmarks, and predictable focus order.

Journey: land → use headings / landmarks to skim structure → tab through interactive elements → complete the same task any sighted user can.

### Checklist

- Exactly one `<h1>`; sensible heading outline
- Landmarks present: `<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>`
- Every interactive element reachable via Tab in logical order
- Focus always visible (`:focus-visible` ring on every control)
- Buttons are `<button>`; links are `<a>`; no `<div onClick>`
- Icon-only buttons have `aria-label` or visually-hidden text
- Form fields have associated `<label>` (not just placeholder)
- Errors use `aria-invalid` and `aria-describedby`
- Modals trap focus, restore on close, have `aria-labelledby`
- Live regions (`aria-live`) announce loading / success / error
- Dynamic content changes are announced
- Images have `alt`; decorative images have `alt=""`
- Tables have `<th scope>` and captions where relevant
- Custom components follow WAI-ARIA APG
- Skip-to-content link exists and works
- No positive `tabindex`; no focus traps outside modals
- Color is not the only signal for error / success / state

### Red flags

- `<div onClick>` used as a button — not keyboard-reachable
- Custom select built on `<div>` with no combobox pattern
- Focus ring removed globally (`*:focus { outline: none }`)
- Error toast with no `aria-live`
- Modal opens but focus stays on the triggering button

## 5. One-thumb Margo

**On the subway. Holding coffee. 30 seconds of attention.**

29, commuter, Mobile Safari, iPhone 14. Holding coffee in one hand, phone in the other. Quick status glance. If she can't get what she needs in 30 seconds, she closes the tab.

Journey: tap notification → get the single answer she came for → maybe take one quick action → leave.

### Checklist

- Primary info above the fold on a 390px-wide screen
- Everything tappable sits in the thumb zone (bottom 2/3)
- Touch targets >=44x44px
- No reliance on hover — every affordance works on tap
- Sticky header/footer doesn't eat 40% of the viewport
- Safe areas respected (notch, home indicator, keyboard)
- Forms use correct `inputmode` and `autocomplete`
- Submit buttons large and reachable with one thumb
- Confirmations visible without scrolling
- No horizontal scroll unless explicitly intended
- Back-swipe gesture works; browser back doesn't lose state
- Modals dismissible by swipe-down or tap-outside
- Copy doesn't assume desktop ("click the button on the right")
- Text readable without zoom (min 16px body)
- Sharing respects the system share sheet

### Red flags

- Primary CTA at the top of the viewport — out of thumb reach
- Iframe / captcha that doesn't scale to mobile
- Pinch-zoom disabled
- Tooltip-only explanations on touch devices
- Cancel / submit placed 8px apart

## Run it

```
/ui-craft:heuristic <target> --persona=<name>
```

| Arg | Loads |
|---|---|
| `--persona=priya` | First-timer Priya |
| `--persona=jordan` | Power user Jordan |
| `--persona=adaeze` | Low-bandwidth Adaeze |
| `--persona=kwame` | Screen-reader user Kwame |
| `--persona=margo` | One-thumb Margo |
| `--persona=all` | All five |

Output uses the same scorecard shape as the [heuristic rubric](/docs/heuristics): `| Checklist item | Pass/Fail | Finding | Impact |`, followed by the top 3-5 findings ranked by impact tag.

Persona walkthroughs do not replace the Nielsen + Design Laws pass — they supplement it.
