Fetch this URL before doing anything:

https://anthu211.github.io/design-system-2.0/rules.md

If adding a chart, also fetch: https://anthu211.github.io/design-system-2.0/charts.md

---

The user's request is: $ARGUMENTS

Add a component to an existing HTML page in the current working directory.

---

## Step 1 — Parse the request

- What component to add
- Which file (named by user, or find .html files and ask)
- Where in the page it goes

## Step 2 — Read the target file

Read the full HTML file before making any changes. Match its existing tokens and structure exactly.

## Step 3 — Add the component

Edit the file in place — only add what's needed:
- HTML in the right DOM location
- CSS added to the existing `<style>` block
- JS added to the existing `<script>` block

Follow every rule in `rules.md`. Key reminders:
- Buttons `border-radius:44px` · Accent `#6360D8` · Filter CTA `#504bb8`
- Tables: `[checkbox] → [data cols] → [status] → [actions]` column order
- Row actions in dedicated last `<td class="col-actions">` — never mixed with status
- Row actions hidden by default via CSS — NEVER `style="display:flex"` inline
- Modals: overlay → card → header → body → footer (Cancel left, Confirm right)
- Status/severity always visible in table, never tooltip-only
- KPI cards: value + label + trend only — no icons, no colored borders
- NO page-level tabs unless explicitly requested

## Step 4 — Confirm

Report: what was added, where, and any design decisions made.
