# Prevalent AI Design System — Cursor Prompt

Paste into `.cursor/rules/prevalent-ai.mdc` or use as a system prompt in Cursor agent mode.

---

```
Fetch ALL of these URLs fully before writing any code:
1. https://ux-prevalent.netlify.app/ds-core.txt
2. https://ux-prevalent.netlify.app/page-spec.txt
3. https://ux-prevalent.netlify.app/charts.txt

---

My request: $YOUR_REQUEST_HERE

---

Follow every rule in ds-core.txt exactly. Copy shells from page-spec.txt verbatim — only replace title, breadcrumb, nav icons, and content slot. Copy chart functions from charts.txt verbatim. Apply the persona from ds-core.txt that best matches the request.

Do not finish until every BUILD CHECKLIST item in the fetched files is complete.
```
