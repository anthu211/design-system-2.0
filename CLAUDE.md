# Prevalent AI — Design System

Prevalent AI is a cybersecurity risk and exposure management platform. You are generating UI for enterprise security teams: Security Analysts, CISOs, GRC teams, Security Engineers, and SOC Analysts.

The design system spec lives at: `https://anthu211.github.io/design-system-2.0/ds-core.md`

**Do NOT fetch any files at session start.** Fetch only when a command runs or when the user explicitly asks you to build UI.

---

## Mandatory Rules (always apply, no exceptions)

- Every screen uses: topbar + left nav + sub-header + content body
- Topbar always `background:#131313` — PAI logo image only, NO "Prevalent AI" text
- Accent: `#6360D8` · Filter CTA: `#504bb8` · Destructive: `#dc2626`
- All buttons: `border-radius:44px` (pill) — never 6/8/12px
- Cards, table wrappers: `border-radius:4px` only
- Font: Inter via Google Fonts. Theme: `<html class="theme-light">`
- Severity/status always visible in table column — never tooltip-only
- Tables for list data, not cards
- Destructive actions need confirmation modals (name the item, state consequence, red button)
- No page-level tabs unless explicitly requested
- Spacing: 4px scale only — 4, 8, 12, 16, 20, 24, 32, 48px

---

## Slash Commands

Use these to build UI. Each command fetches only what it needs from the design system.

### `/new-page [describe the screen]`
Creates a complete HTML page. Fetches `page-spec.md` + `charts.md`.
```
/new-page alerts dashboard for the SOC analyst team
/new-page executive risk summary with KPI cards
/new-page vulnerability findings for a specific asset
/new-page compliance framework status for GRC
```

### `/new-component [describe what to add]`
Adds a component to an existing HTML page in place. Fetches `ds-core.md` + `charts.md`.
```
/new-component add a filter bar to alerts-dashboard.html
/new-component add a delete confirmation modal to the findings table
/new-component add KPI cards at the top of risk-overview.html
```

### `/new-react-component [describe the component]`
Generates a React/TypeScript component. Fetches `ds-core.md` + `react.md`.
```
/new-react-component alerts table with bulk actions
/new-react-component CISO dashboard with KPI cards and trend chart
```

### `/ux-review [paste HTML or describe screen]`
Reviews a screen against design system rules. Fetches `ds-core.md`.

### `/persona-check [feature description]`
Identifies primary persona and flags design conflicts. Fetches `ds-core.md`.

---

## Copy-paste prompt (no Claude Code)

For any AI tool (Claude.ai, ChatGPT, Cursor, v0, Copilot) — copy this block, paste it, fill in the last line:

```
Read these design system files fully before responding:
https://anthu211.github.io/design-system-2.0/page-spec.md
https://anthu211.github.io/design-system-2.0/charts.md

Persona (keep one, delete the rest): ciso · grc · security-architect · security-engineer · soc-analyst

Describe the screen you want to build:
```
