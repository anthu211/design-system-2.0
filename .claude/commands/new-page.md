Fetch ALL of these URLs fully before doing anything:
1. https://anthu211.github.io/design-system-2.0/ds/context.json
2. https://anthu211.github.io/design-system-2.0/page-spec.md
3. https://anthu211.github.io/design-system-2.0/charts.md

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

[ ] 2. SHELL — copy the complete shell HTML from page-spec.md VERBATIM.
       Copy the ENTIRE <style> block — do not skip or shorten any CSS.
       Copy the ENTIRE <script> block — do not skip or shorten any JS.
       Only replace: page <title>, nav SVG icons, breadcrumb + sub-header text, page content slot.

[ ] 3. TOPBAR — PAI logo <img> only (height:26px). Never "Prevalent AI" text. Navigator button class="ds-btn sz-sm t-special".

[ ] 4. LEFT NAV — must include:
       - id="shell-nav" on the nav element
       - id="shell-nav-btn" on the toggle button
       - shellNavToggle() JS function from page-spec.md — never remove or rewrite.

[ ] 5. SUB-HEADER — exactly TWO lines:
       Line 1: page title <div style="font-size:12px;font-weight:500"> — NEVER <h1>
       Line 2: breadcrumb <div style="font-size:11px"> — last crumb color:#6360D8
       Never merge into one line.

[ ] 6. CHARTS — copy each function from charts.md VERBATIM: buildVerticalBarChart, buildLineChart, buildMultiLineChart, buildDonutChart, buildStackedBarChart.
       Add <div id="chart-tooltip"> at end of <body>.
       Copy showChartTooltip, positionChartTooltip, hideChartTooltip from charts.md verbatim.
       Init: document.addEventListener('DOMContentLoaded', function() { setTimeout(initCharts, 60); });

[ ] 7. TABLE INTERACTIONS — .row-actions hidden by default via CSS:
       tr .row-actions { display:none; }  tr:hover .row-actions { display:flex; gap:4px; }
       NEVER style="display:flex" inline. Status badge and actions in separate <td> always.

[ ] 8. FILTER BAR — Filter button: background:#e0dff7; color:#504bb8; border-radius:44px.
       Active filter chips: .ds-filter-chip > .ds-chip-key + .ds-chip-value + .ds-chip-close.

[ ] 9. TOASTS — success/info: auto-dismiss after 3s. error/warning: persist until dismissed.
       Class pattern: class="ds-toast success" — space-separated, never "ds-toast-success".

[ ] 10. ALL INTERACTIVE ELEMENTS — every button, input, row, tab must have hover, active, focus, disabled states.

After completing all items, output:
"Done. Created: [filename]. Persona: [persona]. Working: nav-toggle · chart-tooltips · row-actions · filters · toasts."

Do not finish until every checklist item is complete.
