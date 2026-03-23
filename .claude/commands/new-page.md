Fetch and read ALL of these URLs in full before doing anything else. Do not skip any.

1. Design tokens + rules: https://anthu211.github.io/design-system-2.0/spec.md
2. Page shell (mandatory, copy verbatim): https://anthu211.github.io/design-system-2.0/shell.md
3. UI component patterns: https://anthu211.github.io/design-system-2.0/components.md
4. Chart patterns (ALWAYS required): https://anthu211.github.io/design-system-2.0/charts.md
5. UX context (personas + UX laws): https://anthu211.github.io/design-system-2.0/ux-context.md

---

The user's requirement is: $ARGUMENTS

Generate a complete HTML page for this requirement and save it as a file in the current working directory.

---

## Step 1 — Parse the requirement

- **Screen/feature**: what is being built
- **Persona**: infer from content if not stated:
  - Dashboard / overview / board / executive / risk posture → `ciso`
  - Compliance / GRC / audit / framework / control / policy → `grc`
  - Architecture / attack surface / topology / system design → `security-architect`
  - Vulnerability / CVE / patch / remediation / scan / asset / SecOps → `security-engineer`
  - Alert / incident / triage / threat / SOC / monitoring → `soc-analyst`
- **Filename**: kebab-case from the requirement (e.g. `alerts-dashboard.html`)

---

## Step 2 — Build the shell from shell.md

Copy the shell HTML template from `shell.md` exactly. Only replace these placeholder values:
- `Page Title — Prevalent AI` → actual page title
- `Dashboard Name` (nav header) → module name (e.g. "Risk Management")
- `Module / Product Area` → product area subtitle
- Nav items → real items for this module (use actual SVG icons from shell.md icon table, never `<!-- icon -->`)
- `Page Title` in sub-header → actual page title
- Breadcrumb segments → actual breadcrumb path
- `<!-- Page content goes here -->` → actual page content

**Do NOT add any `<h1>`, heading, or description below the sub-header. Content body starts directly with page content.**

---

## Step 3 — Apply persona rules from ux-context.md

Read the persona definition for the inferred persona. Apply their UI implications:

- **ciso**: KPI cards first (max 5), trend direction visible, no dense tables on first view, one dominant CTA
- **grc**: Compliance framework tables, control status columns always visible, export button always present
- **security-architect**: Technical detail visible by default, CVSSv3 scores in table, asset topology context
- **security-engineer**: Dense CVE/CVSS table, bulk action toolbar, remediation SLA column, pagination
- **soc-analyst**: Alert queue table first, severity always visible, quick row actions, SLA timer column

---

## Step 4 — Build the content

Use component patterns from `components.md`. Use chart patterns from `charts.md` if needed. Apply all rules from `spec.md`.

Non-negotiable rules (double-check before saving):
1. Topbar is always `#131313`
2. Accent is `#6360D8`. Filter CTAs use `#504bb8`
3. CTA/text buttons pill-shaped (`border-radius:44px`). Icon-only = circle (`50%`) or borderless
4. Font is Inter — Google Fonts link is in the shell
5. Light theme (`<html class="theme-light">`) is default
6. Status/severity is always visible — never tooltip-only
7. Destructive actions need confirmation modals (name the item + consequence + red button)
8. Tables for list data — not cards
9. Content body starts DIRECTLY with content — no extra heading/description
10. Spacing is strict 4px scale: 4, 8, 12, 16, 20, 24, 32, 48px ONLY. Never 3, 5, 6, 10, 11, 14px
11. ⚠ Charts MUST use inline SVG — NEVER `<canvas>`, Chart.js, D3, or any chart library. Use patterns from charts.md
12. Action buttons minimum height 32px (`sz-md`). Never use `sz-sm` for clickable actions
13. Data tables must have: checkbox column (col 1), row hover actions, pagination footer with row count

---

## Step 5 — Save the file

Save as `[kebab-case-name].html` in the current directory.

Report:
- Filename saved
- Persona applied and why
- 2–3 key design decisions made
