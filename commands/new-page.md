Fetch ALL of these URLs fully before doing anything else:
1. https://anthu211.github.io/design-system-2.0/ds/rules.json
2. https://anthu211.github.io/design-system-2.0/ds/tokens/colors.json
3. https://anthu211.github.io/design-system-2.0/ds/tokens/spacing.json
4. https://anthu211.github.io/design-system-2.0/ds/tokens/typography.json
5. https://anthu211.github.io/design-system-2.0/ds/patterns/shells.json
6. https://anthu211.github.io/design-system-2.0/ds/patterns/navigation.json
7. https://anthu211.github.io/design-system-2.0/ds/components/buttons.json
8. https://anthu211.github.io/design-system-2.0/ds/components/cards.json
9. https://anthu211.github.io/design-system-2.0/ds/components/tables.json
10. https://anthu211.github.io/design-system-2.0/ds/components/badges.json
11. https://anthu211.github.io/design-system-2.0/ds/components/inputs.json
12. https://anthu211.github.io/design-system-2.0/ds/components/modals.json
13. https://anthu211.github.io/design-system-2.0/ds/components/feedback.json
14. https://anthu211.github.io/design-system-2.0/ds/components/charts.json
15. https://anthu211.github.io/design-system-2.0/page-spec.txt
16. https://anthu211.github.io/design-system-2.0/charts.txt

Do not proceed until every URL above is fully fetched and read. Use exact token values, class names, and HTML patterns from these files — do not guess or invent any values.

The user's request is: $ARGUMENTS

If $ARGUMENTS is empty, ask ONE question: "What is this page called and who is its primary user?"
Wait for the answer. Then proceed.

BUILD CHECKLIST — complete every item in order:

[ ] 1. PERSONA — infer from request, apply layout:
       ciso → KPI cards first (max 5), trend charts, 1 dominant CTA
       grc → Compliance table, control status visible, export button
       security-architect → CVSSv3 scores, technical detail, asset context
       security-engineer → Dense CVE table, bulk toolbar, SLA column, pagination
       soc-analyst → Alert queue first, severity sorted, quick row actions on hover

[ ] 2. SHELL — copy the complete shell HTML from page-spec.txt VERBATIM.
       Copy the ENTIRE <style> block — do not skip or shorten any CSS.
       Copy the ENTIRE <script> block — do not skip or shorten any JS.
       Only replace: page <title>, nav SVG icons, breadcrumb + sub-header text, page content slot.

[ ] 3. TOKENS — use only values from tokens/colors.json, tokens/spacing.json, tokens/typography.json.
       CSS variables only — zero hardcoded hex or px values anywhere.
       Spacing: 4pt grid only — 4, 8, 12, 16, 20, 24, 32, 48px. Any other value is a bug.

[ ] 4. TOPBAR — PAI logo <img> only (height:26px). Never "Prevalent AI" text. Navigator button class="ds-btn sz-sm t-special".

[ ] 5. LEFT NAV — must include:
       - id="shell-nav" on the nav element
       - id="shell-nav-btn" on the toggle button
       - shellNavToggle() JS function from page-spec.txt — never remove or rewrite.

[ ] 6. SUB-HEADER — exactly TWO lines:
       Line 1: page title <div style="font-size:12px;font-weight:500"> — NEVER <h1>
       Line 2: breadcrumb <div style="font-size:11px"> — last crumb color:#6360D8
       Never merge into one line.

[ ] 7. CHARTS — copy each function from charts.txt VERBATIM: buildVerticalBarChart, buildLineChart, buildMultiLineChart, buildDonutChart, buildStackedBarChart.
       Add <div id="chart-tooltip"> at end of <body>.
       Copy showChartTooltip, positionChartTooltip, hideChartTooltip from charts.txt verbatim.
       Init: document.addEventListener('DOMContentLoaded', function() { setTimeout(initCharts, 60); });

[ ] 8. COMPONENTS — use exact HTML patterns from the component JSONs fetched above.
       Buttons: class names and border-radius:44px from components/buttons.json.
       Cards: border-radius:4px only, patterns from components/cards.json.
       Tables: column order, row-actions, badge placement from components/tables.json.
       Badges: exact class names from components/badges.json.
       Inputs: exact patterns from components/inputs.json.
       Modals: Cancel left (t-outline), Confirm right (t-primary or t-danger) from components/modals.json.

[ ] 9. TABLE INTERACTIONS — .row-actions hidden by default via CSS:
       tr .row-actions { display:none; }  tr:hover .row-actions { display:flex; gap:4px; }
       NEVER style="display:flex" inline. Status badge and actions in separate <td> always.
       Severity always visible in table column — never tooltip-only.

[ ] 10. FILTER BAR — Filter button: background:#e0dff7; color:#504bb8; border-radius:44px.
        Active filter chips: .ds-filter-chip > .ds-chip-key + .ds-chip-value + .ds-chip-close.

[ ] 11. TOASTS — success/info: auto-dismiss after 3s. error/warning: persist until dismissed.
        Class pattern: class="ds-toast success" — space-separated, never "ds-toast-success".

[ ] 12. ALL INTERACTIVE ELEMENTS — every button, input, row, tab must have hover, active, focus, disabled states.

[ ] 13. DESTRUCTIVE ACTIONS — any delete/remove must trigger a confirmation modal.
        Modal must name the item being deleted and state the consequence. Confirm button uses t-danger.

After completing all items, output:
"Done. Created: [filename]. Persona: [persona]. Working: nav-toggle · chart-tooltips · row-actions · filters · toasts."

Do not finish until every checklist item is complete.
