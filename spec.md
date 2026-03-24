# Prevalent AI — Design System Spec
**Version 2.0 · Organization-wide standard for all AI-generated dashboards**

Read this file for tokens and rules. Fetch the linked files for shell HTML, component patterns, charts, and React reference.

Hosted at: `https://anthu211.github.io/design-system-2.0/`

---

## Spec Files

| File | URL | Contents |
|------|-----|----------|
| **spec.md** (this file) | `/spec.md` | Design tokens, visual identity, non-negotiable rules |
| **shell.md** | `/shell.md` | Mandatory page shell HTML + nav collapse CSS/JS + nav icon paths |
| **components.md** | `/components.md` | All UI component patterns (buttons, inputs, table, modal, etc.) |
| **charts.md** | `/charts.md` | SVG chart patterns (line, donut, bar) + tooltip |
| **react.md** | `/react.md` | React + TypeScript + Tailwind component reference |
| **ux-context.md** | `/ux-context.md` | Personas, UX laws, product principles |
| **rules.md** | `/rules.md` | Hard negative rules — all components, layout, spacing, hover, React |

---

## Product Context

Prevalent AI is a **B2B cybersecurity exposure management platform** for enterprise security teams. Users are under pressure, data-heavy, and expert. UI must be fast, dense, and decisive — not decorative.

**Personas:** CISO · GRC · Security Architect · Security Engineer · SOC Analyst

---

## Visual Identity

- **Font:** Inter (Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`)
- **Accent color:** `#6360D8` (purple-blue — CTAs, active states, links, focus rings)
- **Filter/Active Filters CTA:** `#504bb8`
- **Default theme:** Light (`<html class="theme-light">`). Dark theme is opt-in.
- **Topbar:** Always `background: #131313` — never changes with theme.
- **Border radius:** inputs `8px` · cards `4px` · **buttons `44px` (always pill)** · modals `12px`
- **Spacing unit:** 4px base — use multiples: 4, 8, 12, 16, 20, 24, 32, 48

---

## Design Tokens

### Dark Theme
```
--shell-bg: #0E0E0E          --shell-sidebar: #131313       --shell-border: #272727
--shell-text: #F9F9F9        --shell-text-2: #D1D1D1        --shell-text-muted: #696969
--shell-text-faint: #3B3A3A  --shell-accent: #6360D8        --shell-hover: rgba(255,255,255,0.04)
--shell-active: rgba(99,96,216,0.12)  --shell-raised: #1a1a1a  --shell-elevated: #1F1F1F
--ctrl-bg: #1a1a1a           --ctrl-border: #3B3A3A         --ctrl-text: #F9F9F9
--ctrl-placeholder: #696969  --ctrl-hover: #242424
--card-bg: #131313           --card-border: #272727
--table-th-bg: #131313       --table-border: #1F1F1F
```

### Light Theme — DEFAULT (`html.theme-light`)
```
--shell-bg: #F7F9FC          --shell-sidebar: #FFFFFF       --shell-border: #E6E6E6
--shell-text: #101010        --shell-text-2: #282828        --shell-text-muted: #6E6E6E
--shell-accent: #6360D8      --shell-hover: rgba(0,0,0,0.04)
--shell-active: rgba(99,96,216,0.08)  --shell-raised: #F5F5F5  --shell-elevated: #EBEBEB
--ctrl-bg: #FFFFFF           --ctrl-border: #CFCFCF         --ctrl-text: #282828
--ctrl-placeholder: #9CA3AF  --ctrl-hover: #F5F5F5
--card-bg: #FFFFFF           --card-border: #E6E6E6
--table-th-bg: #F5F5F5       --table-border: #E6E6E6
```

---

## Non-Negotiable Rules

1. **Shell is mandatory** — every page uses the full shell from `shell.md`. Copy it verbatim.
2. **Topbar is always `#131313`** — never changes with theme.
3. **Accent `#6360D8`** is the only CTA/primary color. Filter CTAs use `#504bb8`.
4. **CTA/text buttons are pill-shaped** (`border-radius:44px`). Icon-only buttons: circle (`border-radius:50%`) or borderless (no background, no border — radius irrelevant). Never `6px` on a button that has a visible background or border.
5. **Font is always Inter** — include Google Fonts link in every file.
6. **Light theme is default** — generate with `<html class="theme-light">`.
7. **Output complete, self-contained HTML files** — no external dependencies other than Google Fonts and PAI logo.
8. **Status must always be visible** — never hide severity/status in a tooltip only.
9. **Tables before cards** for list data — analysts need density, not decoration.
10. **Destructive actions need confirmation modals** — name the item, state the consequence, red confirm button.
11. **No external CSS frameworks** — inline styles only, using the variables above.
12. **⚠ Charts use inline SVG ONLY** — NEVER `<canvas>`, Chart.js, D3, or any external chart library. Copy the exact patterns from `charts.md`. Available functions: `buildLineChart`, `buildMultiLineChart`, `buildVerticalBarChart`, `buildDonutChart`, `buildStackedBarChart`. If you write `<canvas>` you are violating this rule.
13. **Content body starts DIRECTLY with page content** — no extra `<h1>` or description paragraph below the sub-header.
14. **KPI cards:** max 5 in a row · `border-radius:4px` · `gap:8px` between cards · `padding:8px 12px`.
15. **Nav:** expanded parent stays grey (`#f5f5f5`) — only the active sub-item gets blue. One active item at a time.
16. **Spacing:** strict 4px scale only — 4, 8, 12, 16, 20, 24, 32, 48px. Never use 3px, 5px, 6px, 10px, 11px, 14px.
17. **Minimum interactive button height: 32px** — use `sz-md` (32px) or larger for all clickable actions. `sz-sm` (24px) is for count badges and inline labels only, not buttons users click to take action.
18. **Data tables must include:** (a) checkbox column as first `<th>`/`<td>` for row selection, (b) row hover actions revealed on `tr:hover`, (c) pagination footer with row count `Showing X–Y of Z` for any list.
19. **Fetch `charts.md`** whenever the page contains any chart — it is never optional.
20. **Hover states are mandatory on every interactive element** — buttons, tabs, nav rows, nav sub-items, pagination buttons, breadcrumb links, table row actions, modal close, filter buttons, chips, icon buttons, tooltips. Never omit `:hover`. Use `var(--shell-hover)` for backgrounds, `var(--shell-text)` for text, `var(--shell-accent)` for accent interactions.
21. **KPI cards have no decorative styling** — no `border-top`, `border-left`, or any colored border. No custom background. No icons beyond value+label+trend. Use `<div class="ds-kpi-card">` with no `style=""` attribute.
22. **No custom CSS for components** — never write inline styles or new CSS rules for `ds-kpi-card`, `ds-badge`, `ds-callout`, `ds-table`, `ds-btn`, or any `ds-*` component. Use only the classes defined in `shell.md` and `components.md`.
23. **Nav header is always fixed** — the nav header always reads `Prevalent AI` / `Exposure Management`. Never change it per page. Only nav items (menu rows and sub-items) change per page.
24. **Chart legends** — every multi-series chart must include a `<div class="chart-legend">` with `chart-legend-dot` (circle, `border-radius:50%`) per series. Legend is always center-aligned (`justify-content:center`).
