Fetch these URLs before doing anything else:

1. https://anthu211.github.io/design-system-2.0/ds-core.md
2. https://anthu211.github.io/design-system-2.0/charts.md

---

The user's requirement is: $ARGUMENTS

Generate a complete HTML page and save it as a file in the current working directory.

---

## Step 1 — Parse the requirement

- **Screen/feature**: what is being built
- **Persona**: infer from persona table in `ds-core.md`
- **Filename**: kebab-case (e.g. `alerts-dashboard.html`)

## Step 2 — Build the shell

Copy the Shell HTML Template from `ds-core.md` verbatim — full `<style>` block, full JS. Do NOT shorten or rewrite. Only replace:
- Page `<title>`
- Nav items with real SVG icons matching the page
- Breadcrumb text and sub-header page title
- `<!-- Page content goes here -->` with actual content

## Step 3 — Apply persona rules

- **ciso**: KPI cards first (max 5), trend charts, one dominant CTA
- **grc**: Compliance tables, control status visible, export button
- **security-architect**: CVSSv3 scores, technical detail, asset context
- **security-engineer**: Dense CVE table, bulk toolbar, SLA column, pagination
- **soc-analyst**: Alert queue first, severity sorted, row quick-actions on hover

## Step 4 — Build content

Use component patterns from `ds-core.md`. Follow every hard rule and hard don't.
Use chart functions from `charts.md` verbatim — NEVER canvas or external chart libraries.

## Step 5 — Save the file

Write complete HTML to `[kebab-case-name].html` in the current directory.

Report: filename · persona applied · 2–3 key design decisions
