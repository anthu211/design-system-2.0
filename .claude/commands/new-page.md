Fetch ALL of these URLs fully before doing anything else:

1. https://anthu211.github.io/design-system-2.0/spec.md
2. https://anthu211.github.io/design-system-2.0/shell.md
3. https://anthu211.github.io/design-system-2.0/components.md
4. https://anthu211.github.io/design-system-2.0/charts.md
5. https://anthu211.github.io/design-system-2.0/ux-context.md

---

The user's requirement is: $ARGUMENTS

Generate a complete HTML page and save it as a file in the current working directory.

---

## Step 1 — Parse the requirement

- **Screen/feature**: what is being built
- **Persona** (infer if not stated):
  - Dashboard / overview / executive / risk → `ciso`
  - Compliance / GRC / audit / framework / control → `grc`
  - Architecture / attack surface / topology → `security-architect`
  - Vulnerability / CVE / patch / asset / scan → `security-engineer`
  - Alert / incident / triage / threat / SOC → `soc-analyst`
- **Filename**: kebab-case (e.g. `alerts-dashboard.html`)

## Step 2 — Build the shell

Copy the COMPLETE shell HTML from `shell.md` verbatim — including the ENTIRE `<style>` block with all CSS tokens and component classes. Do NOT write any custom CSS. Do NOT replace or shorten the style block. Only replace:
- Page title, nav header, module subtitle
- Nav items with real SVG icons from the icon table
- Breadcrumb segments and sub-header title
- `<!-- Page content goes here -->` with actual content

**No `<h1>` or extra heading below the sub-header. Content starts directly.**
**CRITICAL: Never write inline styles for components. Always use ds-* class names from the style block.**

## Step 3 — Apply persona rules

- **ciso**: KPI cards first (max 5), trend visible, one dominant CTA
- **grc**: Compliance tables, control status always visible, export button
- **security-architect**: Technical detail visible, CVSSv3 scores, asset context
- **security-engineer**: Dense CVE table, bulk toolbar, SLA column, pagination
- **soc-analyst**: Alert queue first, severity always visible, quick row actions

## Step 4 — Build content

Use patterns from `components.md` and `charts.md`. Non-negotiable:
1. Topbar `#131313` · Accent `#6360D8` · Filter CTA `#504bb8`
2. All CTA buttons pill-shaped (`border-radius:44px`)
3. Inter font · Light theme default (`<html class="theme-light">`)
4. Status/severity always visible — never tooltip-only
5. Tables for list data · Destructive actions need confirmation modals
6. Spacing 4px scale only: 4,8,12,16,20,24,32,48px
7. Charts: inline SVG only — copy `buildLineChart` or `buildMultiLineChart` or `buildVerticalBarChart` from `charts.md` verbatim
8. Action buttons min 32px height · Tables need checkbox col + pagination

### HARD NEGATIVE RULES — never do any of these:

**KPI cards**
- NEVER add colored `border-top`, `border-left`, or any decorative border
- NEVER add custom `background`, shadow, or icon decorations
- Use ONLY `<div class="ds-kpi-card">` — no `style=""` attribute at all
- Content = value + label + trend delta only. Nothing else inside the card.

**Buttons**
- NEVER use `border-radius` other than `44px` on any button
- NEVER use custom background colors — use `t-primary`, `t-outline`, `t-secondary`, `t-danger`, `t-tertiary`, `t-special` classes only
- NEVER make a button smaller than `sz-md` (32px) for clickable actions

**Badges / Status**
- NEVER use custom `background` or `color` inline — use `ds-badge success/warning/danger/info/neutral` classes only
- NEVER hide severity in a tooltip — always visible in the default table column

**Tables**
- NEVER use `<table>` without wrapping in `<div class="ds-table-wrap">`
- NEVER use custom `padding` on `<td>` — use `ds-td` class
- NEVER omit the checkbox column (leftmost) and pagination footer
- NEVER show more than 7 columns by default

**Cards / Containers**
- NEVER use `border-radius` other than `4px` on cards, table wrappers, or panels
- NEVER add `box-shadow` unless it is a modal overlay
- NEVER use gradient backgrounds on content cards

**Callouts**
- NEVER invent custom callout styling — use `ds-callout ds-callout-warning/error/info/success` only

**Charts**
- NEVER write a chart from scratch — copy `buildLineChart`, `buildMultiLineChart`, `buildVerticalBarChart`, or `buildDonutChart` from `charts.md` verbatim
- NEVER use `<canvas>`, Chart.js, D3, or any library
- Chart wrappers use `border-radius:4px` only

**Layout / Spacing**
- NEVER use arbitrary pixel values like `3px`, `5px`, `7px`, `10px`, `11px`, `14px`, `15px`
- NEVER add extra `<h1>`, `<h2>`, or section titles below the sub-header — content starts directly
- NEVER add decorative dividers, hero sections, or illustration placeholders

## Step 5 — Save the file

Write the complete HTML to `[kebab-case-name].html` in the current directory.

Report: filename · persona applied · 2–3 key design decisions
