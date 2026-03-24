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
7. Charts: inline SVG only — never `<canvas>` or Chart.js
8. Action buttons min 32px height · Tables need checkbox col + pagination

## Step 5 — Save the file

Write the complete HTML to `[kebab-case-name].html` in the current directory.

Report: filename · persona applied · 2–3 key design decisions
