# Prevalent AI — Claude Code Project Memory

This file is loaded automatically by Claude Code at the start of every session. Read it fully before responding to any request.

---

## What This Project Is

Prevalent AI is a cybersecurity risk and exposure management platform. You are generating UI for enterprise security teams: Security Analysts, CISOs, and IT Admins.

Before writing any code, you have two sources of truth:

| File | URL | What it contains |
|------|-----|------------------|
| Design System Spec | https://anthu211.github.io/design-system-2.0/spec.md | Every token, component HTML pattern, shell structure, colour, spacing, and layout rule |
| UX Context | https://anthu211.github.io/design-system-2.0/ux-context.md | Personas (Analyst, CISO, IT Admin), UX laws (Hick's, Fitts's, Miller's), product UX principles |

**Fetch both files at the start of every session. Never generate UI from memory — always read the spec first.**

---

## Mandatory UI Rules (Always Apply)

These rules are derived from the spec. Apply them without being asked.

- **Shell is mandatory** — every screen uses the topbar + left nav + content sub-header + content body structure. No exceptions.
- **Topbar is always `#131313`** — never changes with theme.
- **Accent is always `#6360D8`**. Filter/Active Filters CTA always uses `#504bb8`.
- **All buttons use `border-radius: 44px`** (pill shape). Never `6px` on a button.
- **Font is always Inter** — include the Google Fonts link in every file.
- **Light theme is default** — generate with `<html class="theme-light">`.
- **Output complete, self-contained HTML files** — no external dependencies other than Google Fonts and the PAI logo SVG.
- **Status must always be visible** — never hide severity or status in a tooltip only.
- **Tables before cards** for list data — analysts need density, not decoration.
- **Destructive actions need confirmation modals** — name the item, state the consequence, use a red confirm button.

---

## Shortcut Commands

### `/new-component [component-name] [persona]`

Generates a complete, self-contained HTML file for a new UI component or screen.

**What it does:**
1. Fetches and reads the spec and UX context
2. Builds the component using exact design system tokens and the mandatory shell
3. Applies the named persona's goals and frustrations to shape the output
4. Returns a complete, production-ready HTML file

**Examples:**
```
/new-component AlertsTable analyst
/new-component RiskOverviewDashboard ciso
/new-component IntegrationSettings it-admin
/new-component FindingsDetail analyst
```

**Persona values:** `analyst` · `ciso` · `it-admin`

**What persona changes:**
- `analyst` → Dense tables, visible severity, row-level actions, sort/filter/export prominent
- `ciso` → KPI cards first, trend direction explicit, max 5 metrics, minimal jargon
- `it-admin` → Clear form validation, integration status visible, destructive action confirmations, grouped settings

---

### `/ux-review [paste HTML or describe screen]`

Reviews a screen or component against the design system spec and UX laws. Returns a clear pass/fail checklist.

**What it does:**
1. Fetches and reads the spec and UX context
2. Checks the provided screen against: token usage, shell structure, component patterns, Hick's/Fitts's/Miller's laws, persona fit, and the 5 product UX principles
3. Returns a structured list: what passes, what needs fixing, and exactly why

**Example:**
```
/ux-review [paste full HTML of a screen]
```

**Review checklist (applied automatically):**
- [ ] Uses mandatory shell (topbar, nav, sub-header, content body)
- [ ] Topbar is `#131313`
- [ ] Accent colour is `#6360D8`, filter CTA is `#504bb8`
- [ ] All buttons are pill-shaped (`border-radius: 44px`)
- [ ] Status is visible by default (not tooltip-only)
- [ ] Tables used for list data (not cards)
- [ ] No more than 5 KPI cards in a row
- [ ] Destructive actions have confirmation modals with item name + consequence
- [ ] Error states include a message (not just a red border)
- [ ] Navigation section collapsed by default (Hick's Law)
- [ ] Primary CTA is visually dominant; secondary/tertiary are quieter
- [ ] Table columns ≤ 7 by default; extras opt-in via Add Column
- [ ] Inter font loaded via Google Fonts

---

### `/persona-check [feature or screen description]`

Identifies which persona a feature primarily serves, surfaces their goals and frustrations, and flags anything that might work against how they think.

**What it does:**
1. Reads the UX context personas
2. Maps the feature to the most relevant persona(s)
3. Surfaces that persona's goals, frustrations, and UI implications
4. Flags specific design decisions that might conflict with how they work
5. Suggests 1–3 concrete adjustments if issues are found

**Examples:**
```
/persona-check bulk export feature
/persona-check integration error screen
/persona-check new dashboard with 8 KPI cards
/persona-check findings table with status in tooltip only
```

---

## Project File Locations

| File | Purpose |
|------|---------|
| `spec.md` | Design system spec — tokens, components, shell HTML |
| `ux-context.md` | Personas, UX laws, UX principles |
| `CLAUDE.md` | This file — project memory and shortcut commands |

All three files are hosted at: `https://anthu211.github.io/design-system-2.0/`

---

## How to Work in This Project

**For a new screen:**
```
/new-component [ScreenName] [persona]
```

**For reviewing existing work:**
```
/ux-review
[paste HTML]
```

**For checking if a feature fits the user:**
```
/persona-check [describe the feature]
```

**For a general build:**
```
Read our spec: https://anthu211.github.io/design-system-2.0/spec.md
Read our UX context: https://anthu211.github.io/design-system-2.0/ux-context.md
Build: [describe what you want]
```

---

## Notes

- This file is version-controlled. Update it as the design system evolves.
- When new personas are added to `ux-context.md`, add them to the `/new-component` persona values above.
- When new shortcut commands are added, document them here before use.
