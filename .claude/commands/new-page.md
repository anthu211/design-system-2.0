Fetch these two URLs before doing anything else:

1. https://anthu211.github.io/design-system-2.0/shell.md
2. https://anthu211.github.io/design-system-2.0/rules.md

If the requirement mentions charts, also fetch: https://anthu211.github.io/design-system-2.0/charts.md

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
- Page `<title>` tag
- Nav items with real SVG icons
- Breadcrumb segments and sub-header title
- `<!-- Page content goes here -->` with actual content

**Topbar: PAI logo + last-updated + bell + avatar + Navigator button. Never add text to the topbar.**
**Nav header: workspace name (e.g. "EM Dashboard") + "Exposure Management" subtitle. Never "Prevalent AI".**

## Step 3 — Apply persona rules

- **ciso**: KPI cards first (max 5), trend visible, one dominant CTA
- **grc**: Compliance tables, control status always visible, export button
- **security-architect**: Technical detail visible, CVSSv3 scores, asset context
- **security-engineer**: Dense CVE table, bulk toolbar, SLA column, pagination
- **soc-analyst**: Alert queue first, severity always visible, quick row actions

## Step 4 — Build content

Follow every rule in `rules.md` — they are non-negotiable. Key reminders:
- Buttons `border-radius:44px` · Accent `#6360D8` · Filter CTA `#504bb8`
- Tables: checkbox col first, status col, actions col last (empty `<th>`) — NEVER mix status + actions
- Row actions hidden by default, revealed on `tr:hover` via CSS only (never `style="display:flex"`)
- KPI cards: value + label + trend only — no icons, no colored borders
- NO page-level tabs unless explicitly requested
- Nav labels: `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`
- Charts: copy `buildLineChart` / `buildDonutChart` etc. from charts.md verbatim if needed

## Step 5 — Save the file

Write the complete HTML to `[kebab-case-name].html` in the current directory.

Report: filename · persona applied · 2–3 key design decisions
