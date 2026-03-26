The user's request is: $ARGUMENTS

The full design system rules are already loaded from CLAUDE.md. If `charts.md` exists in the working directory, read it and use chart functions verbatim when adding charts.

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
- Any new CSS into the existing `<style>` block
- Any new JS into the existing `<script>` block

Apply all component patterns and hard rules from CLAUDE.md:
- Buttons `border-radius:44px` · Accent `#6360D8` · Filter CTA `#504bb8`
- Tables: `[checkbox] → [data cols] → [status] → [actions]` — empty `<th>` for actions
- Row actions in dedicated `col-actions` cell — NEVER mixed with status badge
- Row actions hidden by default via CSS — NEVER `style="display:flex"` inline
- Modals: overlay → card → header → body → footer (Cancel left, Confirm right)
- Status/severity always visible in table column, never tooltip-only
- KPI cards: value + label + delta only — no icons, no colored borders
- NEVER add page-level tabs unless explicitly requested
- Charts: use `charts.md` functions if available, otherwise SVG per CLAUDE.md rules

## Step 4 — Confirm

Report: what was added, where, and any design decisions made.
