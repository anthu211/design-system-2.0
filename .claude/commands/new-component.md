Fetch these URLs fully before doing anything:

1. https://anthu211.github.io/design-system-2.0/spec.md
2. https://anthu211.github.io/design-system-2.0/components.md
3. https://anthu211.github.io/design-system-2.0/ux-context.md
4. https://anthu211.github.io/design-system-2.0/rules.md
5. https://anthu211.github.io/design-system-2.0/best-practices.md

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

Follow every rule in `rules.md`. Key reminders:
- Match existing design tokens exactly
- Buttons `border-radius:44px` · Accent `#6360D8` · Filter CTA `#504bb8`
- Modals: overlay → card → header → body → footer (Cancel left, Confirm right)
- Status/severity always visible, never tooltip-only
- Destructive confirm buttons red

## Step 4 — Confirm

Report: what was added, where, and any design decisions made.
