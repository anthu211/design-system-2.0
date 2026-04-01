# Prevalent AI Design System — Claude Prompt

Paste at the start of any Claude.ai conversation before describing what to build.

---

```
Fetch ALL of these URLs fully before writing any code:
1. https://anthu211.github.io/design-system-2.0/ds-core.md
2. https://anthu211.github.io/design-system-2.0/page-spec.md
3. https://anthu211.github.io/design-system-2.0/charts.md

Then fetch only what your task needs:
- Page has charts → already fetched charts.md ✓
- Page has KPI cards → fetch https://anthu211.github.io/design-system-2.0/ds/components/cards.json
- Page has forms/inputs → fetch https://anthu211.github.io/design-system-2.0/ds/components/inputs.json
- Page has toasts/errors → fetch https://anthu211.github.io/design-system-2.0/ds/components/feedback.json

---

My request: $YOUR_REQUEST_HERE

---

Follow every rule in ds-core.md exactly. Copy the full shell HTML from page-spec.md verbatim — entire <style> and <script> blocks, do not skip or shorten. Only replace: page title, nav items, breadcrumb, sub-header text, and content slot. Copy chart functions from charts.md verbatim — never rewrite or shorten them.

Do not finish until all of these are complete:
- Persona identified and layout applied
- Shell copied verbatim from page-spec.md
- All tokens from ds-core.md used (CSS variables only, no hardcoded hex)
- All interactive states present: hover, active, focus, disabled
- Row actions use visibility:hidden / visibility:visible — never display:none
- Severity always visible in table column — never tooltip-only
- Destructive actions have confirmation modal naming the item and consequence
- Charts use only the 5 functions from charts.md — never canvas, Chart.js, D3, or ECharts
```
