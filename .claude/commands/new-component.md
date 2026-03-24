Fetch these URLs fully before doing anything:

1. https://anthu211.github.io/design-system-2.0/spec.md
2. https://anthu211.github.io/design-system-2.0/components.md
3. https://anthu211.github.io/design-system-2.0/ux-context.md

If adding a chart: https://anthu211.github.io/design-system-2.0/charts.md

---

The user's request is: $ARGUMENTS

Add a component to an existing HTML page in the current working directory.

## Step 1 — Parse the request

- What component to add
- Which file (named by user, or find .html files and ask)
- Where in the page it goes

## Step 2 — Read the target file

Read the full HTML file before making changes.

## Step 3 — Add the component

Edit the file in place — only add what's needed:
- HTML in the right DOM location
- CSS added to the existing `<style>` block
- JS added to the existing `<script>` block

Rules:
- Match existing design tokens exactly
- Buttons `border-radius:44px` · Accent `#6360D8` · Filter CTA `#504bb8`
- 4px spacing scale only: 4,8,12,16,20,24,32,48px — never 3,5,7,10,11,14,15px
- Modals: overlay → card → header → body → footer (Cancel left, Confirm right)
- Status/severity always visible, never tooltip-only
- Destructive confirm buttons red

### NEVER do these:
- **KPI cards**: no colored borders, no custom background — `<div class="ds-kpi-card">` only, no `style=""`
- **Buttons**: only `t-primary/t-outline/t-secondary/t-tertiary/t-danger/t-special` — no custom colors, always `44px` radius
- **Badges**: only `ds-badge success/warning/danger/info/neutral` — no inline color overrides
- **Tables**: always `ds-table-wrap` + `ds-table` + `ds-th` + `ds-td` — no raw `<table>` with custom styles
- **Cards**: `border-radius:4px` only — no `12px`, no `box-shadow`, no gradient backgrounds
- **Callouts**: only `ds-callout ds-callout-warning/error/info/success` — never custom styled banners
- **Charts**: copy from `charts.md` verbatim — never `<canvas>`, never write chart logic from scratch
- **Hover states**: NEVER omit `:hover` on any interactive element — buttons, tabs, nav rows, pagination, breadcrumb links, table row actions, modal close, filter buttons, chips, icon buttons. Use `var(--shell-hover)` for backgrounds.

## Step 4 — Confirm

Report: what was added, where, and any design decisions made.
