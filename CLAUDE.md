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
- **Tables before cards** for list data — operational users need density, not decoration.
- **Destructive actions need confirmation modals** — name the item, state the consequence, use a red confirm button.

---

## Slash Commands

These commands are implemented as prompt files in `.claude/commands/`. They work automatically in Claude Code — just type the command and describe what you want. Claude fetches the spec fresh, applies all design system rules, and creates or edits the file directly.

> **How they work:** Each file in `.claude/commands/` is a prompt template. Claude Code reads the matching file, substitutes your description, and executes it. No copy-pasting required.

---

### `/new-page [describe what you want]`

**Creates a new, complete HTML page and saves it as a file in the current directory.**

Just describe the screen you need. Claude infers the persona, derives a filename, generates the full page, and writes it to disk.

**Examples:**
```
/new-page alerts dashboard for the analyst team
/new-page executive risk summary with KPI cards and trend charts
/new-page integration settings with connection status and error states
/new-page vulnerability findings detail for a specific asset
/new-page third party vendor risk overview
```

**What it does:**
1. Fetches the spec and UX context
2. Infers persona from the description (analyst / ciso / it-admin)
3. Generates a complete, self-contained HTML file with the mandatory shell
4. Saves it as `[kebab-case-name].html` in the current directory
5. Reports the filename, persona applied, and key design decisions

---

### `/new-component [describe what to add]`

**Adds a component to an existing HTML page — edits the file in place.**

Describe the component you want and which page it belongs to. Claude reads the existing file, adds the new component in the right place, and confirms what changed.

**Examples:**
```
/new-component add a filter bar to alerts-dashboard.html
/new-component add a delete confirmation modal to the findings table
/new-component add KPI cards at the top of risk-overview.html
/new-component add an empty state to the vendor table
/new-component add a bulk action toolbar to the alerts table
```

**What it does:**
1. Fetches the spec and UX context
2. Reads the target HTML file
3. Adds the component (HTML + CSS + JS) without rewriting the whole file
4. Matches the existing page's tokens and style
5. Reports what was added and where

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

## File Locations

| File / Directory | Purpose |
|-----------------|---------|
| `CLAUDE.md` | This file — loaded automatically by Claude Code every session |
| `.claude/commands/new-page.md` | Prompt for `/new-page` slash command |
| `.claude/commands/new-component.md` | Prompt for `/new-component` slash command |
| `.claude/commands/ux-review.md` | Prompt for `/ux-review` slash command |
| `.claude/commands/persona-check.md` | Prompt for `/persona-check` slash command |
| `spec.md` (hosted) | Design system spec — tokens, components, shell HTML, React patterns |
| `ux-context.md` (hosted) | Personas, UX laws, UX principles |

Live spec files: `https://anthu211.github.io/design-system-2.0/`

---

## How to Work in This Project

**To build a new page:**
```
/new-page [describe the screen you need]
```

**To add a component to an existing page:**
```
/new-component [describe what to add and which file]
```

**To review an existing screen:**
```
/ux-review [paste HTML or describe the screen]
```

**To check if a feature fits the right user:**
```
/persona-check [describe the feature]
```

**For a general build (no slash command):**
```
Read our spec: https://anthu211.github.io/design-system-2.0/spec.md
Read our UX context: https://anthu211.github.io/design-system-2.0/ux-context.md
Build: [describe what you want]
```

---

## Notes

- This file is version-controlled. Update it as the design system evolves.
- **Personas:** `ciso` · `grc` · `security-architect` · `security-engineer` · `soc-analyst`
- When new personas are added to `ux-context.md`, update the persona list above and the command files.
- When new shortcut commands are added, document them here before use.
# Mon Mar 23 17:14:30 IST 2026
