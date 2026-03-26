The user's requirement is: $ARGUMENTS

The full design system rules are already loaded from CLAUDE.md. If `shell.md` exists in the working directory, read it and copy the shell HTML verbatim. If `charts.md` exists, read it and use chart functions verbatim. Otherwise generate from the rules in CLAUDE.md.

Generate a complete HTML page and save it as a file in the current working directory.

---

## Step 1 — Parse the requirement

- **Screen/feature**: what is being built
- **Persona**: infer from persona table in CLAUDE.md
- **Filename**: kebab-case (e.g. `alerts-dashboard.html`)

## Step 2 — Build the shell

If `shell.md` is available: copy the COMPLETE shell HTML verbatim — full `<style>` block, full JS. Only replace title, nav items, breadcrumb, sub-header title, and `<!-- Page content goes here -->`.

If not available: build the shell from CLAUDE.md shell structure rules — topbar + collapsible left nav + sticky sub-header + content body.

## Step 3 — Apply persona rules

- **ciso**: KPI cards first (max 5), trend charts, one dominant CTA
- **grc**: Compliance tables, control status visible, export button
- **security-architect**: CVSSv3 scores, technical detail, asset context
- **security-engineer**: Dense CVE table, bulk toolbar, SLA column, pagination
- **soc-analyst**: Alert queue first, severity sorted, row quick-actions on hover

## Step 4 — Build content

Use component patterns from CLAUDE.md. Follow every hard rule and hard don't.
Charts: use `charts.md` functions verbatim if available, otherwise build SVG charts per CLAUDE.md chart rules.

## Step 5 — Save the file

Write complete HTML to `[kebab-case-name].html` in current directory.

Report: filename · persona applied · 2–3 key design decisions
