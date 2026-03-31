Fetch ALL of these URLs fully before doing anything:
1. https://anthu211.github.io/design-system-2.0/ds/context.json
2. https://anthu211.github.io/design-system-2.0/ds-core.md
3. https://anthu211.github.io/design-system-2.0/charts.md

The user's request is: $ARGUMENTS

If $ARGUMENTS is empty, ask: "What component? Which file? What variants does it need?"
Wait for the answer. Then read the target HTML file in full before making any changes.

BUILD CHECKLIST — complete every item in order:

[ ] 1. READ TARGET FILE — read the full HTML file first. Match its existing CSS variable names, class names, and JS structure exactly.

[ ] 2. HTML — add component HTML in the correct DOM location only. Do not restructure surrounding elements.

[ ] 3. CSS — add into the existing <style> block only. CSS variables only — zero hardcoded hex or px values.
       Use only spacing from 4pt scale: 4, 8, 12, 16, 20, 24, 32, 48px.

[ ] 4. JS — add into the existing <script> block only.

[ ] 5. ALL STATES — verify every interactive element has: hover, active, focus, disabled.

[ ] 6. CHARTS (if adding a chart):
       Copy the required function from charts.md VERBATIM — never rewrite.
       Ensure <div id="chart-tooltip"> exists in <body>. If missing, add it.
       Ensure showChartTooltip, positionChartTooltip, hideChartTooltip are present. If missing, add from charts.md.
       Wrap init in setTimeout(fn, 60).

[ ] 7. HARD RULES — verify from ds-core.md:
       - Buttons border-radius:44px · Cards/table-wrappers 4px · Inputs 8px
       - .row-actions: CSS-hidden, revealed on tr:hover — never style="display:flex" inline
       - Actions and status badge in separate <td> — never same cell
       - Modals: Cancel left (t-outline), Confirm right (t-primary or t-danger for destructive)
       - KPI cards: value + label + delta only — no icons, no colored borders, no box-shadow
       - Severity always visible in table column — never tooltip-only
       - No page-level tabs unless explicitly requested

After completing all items, output:
"Done. Added: [component]. File: [filename]. States: [list]. Interactions working: [list]."

Do not finish until every checklist item is complete.
