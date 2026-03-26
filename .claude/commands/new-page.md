Read these local files from the current working directory before doing anything else:

1. `ds-core.md`
2. `shell.md`
3. `charts.md`

---

The user's requirement is: $ARGUMENTS

Generate a complete HTML page and save it as a file in the current working directory.

---

## Step 1 — Parse the requirement

- **Screen/feature**: what is being built
- **Persona** (infer from `ds-core.md` persona table if not stated)
- **Filename**: kebab-case (e.g. `alerts-dashboard.html`)

## Step 2 — Build the shell

Copy the COMPLETE shell HTML from `shell.md` verbatim — full `<style>` block, full JS. Do NOT shorten or rewrite. Only replace:
- Page `<title>`
- Nav items with real SVG icons
- Breadcrumb and sub-header title
- `<!-- Page content goes here -->` with actual content

Follow the shell structure rules in `ds-core.md` exactly.

## Step 3 — Apply persona rules (from ds-core.md)

- **ciso**: KPI cards first (max 5), trend visible, one dominant CTA
- **grc**: Compliance tables, control status always visible, export button
- **security-architect**: Technical detail visible, CVSSv3 scores, asset context
- **security-engineer**: Dense CVE table, bulk toolbar, SLA column, pagination
- **soc-analyst**: Alert queue first, severity always visible, quick row actions

## Step 4 — Build content

Use component patterns from `ds-core.md`. Follow every hard rule and hard don't listed there.
Use chart functions from `charts.md` verbatim — NEVER canvas or external chart libraries.

## Step 5 — Save the file

Write the complete HTML to `[kebab-case-name].html` in the current directory.

Report: filename · persona applied · 2–3 key design decisions
