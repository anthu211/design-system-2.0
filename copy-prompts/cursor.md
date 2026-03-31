# Prevalent AI Design System — Cursor Prompt

Paste into `.cursor/rules/prevalent-ai.mdc` or use as a system prompt in Cursor agent mode.

---

```
Fetch ALL of these URLs fully before writing any code:
1. https://anthu211.github.io/design-system-2.0/ds/context.json
2. https://anthu211.github.io/design-system-2.0/ds-core.md
3. https://anthu211.github.io/design-system-2.0/page-spec.md
4. https://anthu211.github.io/design-system-2.0/charts.md

---

My request: $YOUR_REQUEST_HERE

---

Follow every rule in ds-core.md exactly. Copy shells from page-spec.md verbatim — only replace title, breadcrumb, nav icons, and content slot. Copy chart functions from charts.md verbatim. Apply the persona from ds-core.md that best matches the request.

Do not finish until every BUILD CHECKLIST item in the fetched files is complete.
```
