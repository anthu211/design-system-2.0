Fetch ALL of these URLs fully before doing anything else:

1. https://anthu211.github.io/design-system-2.0/spec.md
2. https://anthu211.github.io/design-system-2.0/shell.md
3. https://anthu211.github.io/design-system-2.0/components.md
4. https://anthu211.github.io/design-system-2.0/charts.md
5. https://anthu211.github.io/design-system-2.0/ux-context.md
6. https://anthu211.github.io/design-system-2.0/rules.md
7. https://anthu211.github.io/design-system-2.0/best-practices.md

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
- Nav items with real SVG icons from the icon table
- Breadcrumb segments and sub-header title
- `<!-- Page content goes here -->` with actual content

**Nav header is ALWAYS "Prevalent AI" / "Exposure Management" — never change it.**

## Step 3 — Apply persona rules

- **ciso**: KPI cards first (max 5), trend visible, one dominant CTA
- **grc**: Compliance tables, control status always visible, export button
- **security-architect**: Technical detail visible, CVSSv3 scores, asset context
- **security-engineer**: Dense CVE table, bulk toolbar, SLA column, pagination
- **soc-analyst**: Alert queue first, severity always visible, quick row actions

## Step 4 — Build content

Use patterns from `components.md` and `charts.md`. Follow every rule in `rules.md` — they are non-negotiable. Apply per-component dos/don'ts and all error handling patterns from `best-practices.md`.

**Critical constraint — NO inferred tabs**: Do NOT add a tab bar (Overview / Assets / Findings / etc.) unless the user's requirement explicitly describes tabs. If the user asked for one page, build one page's content. Left nav already handles section navigation.

## Step 5 — Save the file

Write the complete HTML to `[kebab-case-name].html` in the current directory.

Report: filename · persona applied · 2–3 key design decisions
