Fetch ALL of these URLs fully before doing anything:
1. https://anthu211.github.io/design-system-2.0/ds/rules.json
2. https://anthu211.github.io/design-system-2.0/ds/tokens/colors.json
3. https://anthu211.github.io/design-system-2.0/ds/tokens/spacing.json
4. https://anthu211.github.io/design-system-2.0/ds/tokens/typography.json
5. https://anthu211.github.io/design-system-2.0/ds/components/buttons.json
6. https://anthu211.github.io/design-system-2.0/ds/components/cards.json
7. https://anthu211.github.io/design-system-2.0/ds/components/tables.json
8. https://anthu211.github.io/design-system-2.0/ds/components/badges.json
9. https://anthu211.github.io/design-system-2.0/ds/components/inputs.json
10. https://anthu211.github.io/design-system-2.0/ds/components/modals.json
11. https://anthu211.github.io/design-system-2.0/ds/components/feedback.json
12. https://anthu211.github.io/design-system-2.0/ds/components/charts.json
13. https://anthu211.github.io/design-system-2.0/ds-core.txt
14. https://anthu211.github.io/design-system-2.0/charts.txt

Do not proceed until every URL above is fully fetched and read. Use exact token values, class names, and HTML patterns from these files — do not guess or invent any values.

The user's request is: $ARGUMENTS

If $ARGUMENTS is empty, ask: "What component? Which file? What variants does it need?"
Wait for the answer. Then read the target HTML file in full before making any changes.

BUILD CHECKLIST — complete every item in order:

[ ] 1. READ TARGET FILE — read the full HTML file first. Match its existing CSS variable names, class names, and JS structure exactly.

[ ] 2. HTML — add component HTML in the correct DOM location only. Do not restructure surrounding elements.
       Use exact HTML patterns from the relevant component JSON fetched above.

[ ] 3. CSS — add into the existing <style> block only. CSS variables only — zero hardcoded hex or px values.
       Use only spacing from 4pt scale: 4, 8, 12, 16, 20, 24, 32, 48px.
       Use exact variable names from tokens/colors.json and tokens/spacing.json.

[ ] 4. JS — add into the existing <script> block only.

[ ] 5. ALL STATES — verify every interactive element has: hover, active, focus, disabled.

[ ] 6. CHARTS (if adding a chart):
       Copy the required function from charts.txt VERBATIM — never rewrite.
       Ensure <div id="chart-tooltip"> exists in <body>. If missing, add it.
       Ensure showChartTooltip, positionChartTooltip, hideChartTooltip are present. If missing, add from charts.txt.
       Wrap init in setTimeout(fn, 60).

[ ] 7. HARD RULES — verify from ds-core.txt and component JSONs:
       - Buttons border-radius:44px · Cards/table-wrappers 4px · Inputs 8px
       - .row-actions: CSS-hidden, revealed on tr:hover — never style="display:flex" inline
       - Actions and status badge in separate <td> — never same cell
       - Severity always visible in table column — never tooltip-only
       - Modals: Cancel left (t-outline), Confirm right (t-primary or t-danger for destructive)
       - KPI cards: value + label + delta only — no icons, no colored borders, no box-shadow
       - No page-level tabs unless explicitly requested
       - Destructive actions require confirmation modal — name the item, state the consequence

After completing all items, output:
"Done. Added: [component]. File: [filename]. States: [list]. Interactions working: [list]."

Do not finish until every checklist item is complete.
