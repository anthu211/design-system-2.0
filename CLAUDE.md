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

## Slash Commands

These commands are implemented as prompt files in `.claude/commands/`. They work automatically in Claude Code — type the command and Claude fetches the spec, applies the rules, and generates the output.

> **How they work:** Each file in `.claude/commands/` is a prompt template. When you run `/new-component AlertsTable analyst`, Claude Code reads `new-component.md`, substitutes your arguments, and executes it. The spec and UX context URLs are embedded in each command file — Claude always fetches them fresh.

### `/new-component [component-name] [persona]`
### `/new-component [component-name] [persona] react`

Generates a UI component or screen. Defaults to a self-contained HTML file. Add `react` as a third argument to generate TSX instead.

**What it does:**
1. Fetches and reads the spec (including the React/Developer Reference section) and UX context
2. Builds the component using exact design system tokens and the mandatory shell
3. Applies the named persona's goals and frustrations to shape the output
4. Returns a complete, production-ready file — HTML or TSX depending on the third argument

**Examples (HTML — vibe coding / prototyping):**
```
/new-component AlertsTable analyst
/new-component RiskOverviewDashboard ciso
/new-component IntegrationSettings it-admin
/new-component FindingsDetail analyst
```

**Examples (React — developer-ready TSX):**
```
/new-component AlertsTable analyst react
/new-component RiskOverviewDashboard ciso react
/new-component IntegrationSettings it-admin react
/new-component FindingsDetail analyst react
```

**Persona values:** `analyst` · `ciso` · `it-admin`

**What persona changes:**
- `analyst` → Dense tables, visible severity, row-level actions, sort/filter/export prominent
- `ciso` → KPI cards first, trend direction explicit, max 5 metrics, minimal jargon
- `it-admin` → Clear form validation, integration status visible, destructive action confirmations, grouped settings

**What `react` changes (vs HTML):**
- Output is `.tsx` files, one component per file in `src/components/ui/`
- Styling uses Tailwind classes — no inline styles except Navigator gradient
- Interactive components use Radix UI primitives (Dialog, Select, Checkbox, Tabs)
- All tokens reference the Tailwind config values (`bg-accent`, `rounded-pill`, etc.)
- Shell is the `Shell` layout component, not raw HTML
- No `<link>` tags or `<style>` blocks — font loaded via `next/font/google` or layout

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
| `.claude/commands/new-component.md` | Prompt for `/new-component` slash command |
| `.claude/commands/ux-review.md` | Prompt for `/ux-review` slash command |
| `.claude/commands/persona-check.md` | Prompt for `/persona-check` slash command |
| `spec.md` (hosted) | Design system spec — tokens, components, shell HTML, React patterns |
| `ux-context.md` (hosted) | Personas, UX laws, UX principles |

Live spec files: `https://anthu211.github.io/design-system-2.0/`

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
