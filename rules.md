# Prevalent AI — Hard Rules

**Read this file in full before generating any UI.** These rules override any design judgment. Violations are bugs.

Hosted at: `https://anthu211.github.io/design-system-2.0/`

---

## Shell & Layout

- Copy shell HTML from `shell.md` **verbatim** — full `<style>` block, full JS, no shortcuts
- **Nav header is always fixed** — always `Prevalent AI` / `Exposure Management`. NEVER change per page. Only nav items change.
- No `<h1>` or extra heading below the sub-header — content starts directly
- No decorative dividers, hero sections, or illustration placeholders
- Light theme default: `<html class="theme-light">`
- Topbar always `background:#131313`

---

## Tabs

- **NEVER add page-level tabs unless the user explicitly asks for them** — do not infer tabs from page names like "Overview", "Assets", "Findings"
- Tabs are only added when the user describes a multi-view or tabbed layout in their requirement
- If the requirement describes a single page/screen, generate that page's content directly without tabs
- Nav items in the left sidebar already provide page-level navigation — do not duplicate this with in-page tabs

---

## Spacing

- **4px scale only** — 4, 8, 12, 16, 20, 24, 32, 48px
- NEVER use 3, 5, 6, 7, 10, 11, 13, 15px

---

## Buttons

- All CTA/text buttons: `border-radius:44px` (pill) — NEVER `6px`, `8px`, `12px`
- Icon-only buttons: `border-radius:50%` or borderless
- Use ONLY `t-primary`, `t-outline`, `t-secondary`, `t-tertiary`, `t-danger`, `t-success`, `t-special` classes
- NEVER set custom `background-color` or `color` on a button
- Minimum height `sz-md` (32px) for any clickable action — `sz-sm` is for badges/labels only
- **React:** use `rounded-[44px]` — never `rounded-md`, `rounded-lg`, `rounded-full`
- **React:** button colors from tokens only — `bg-[#6360D8]`, `bg-[#504bb8]`, `bg-[#D12329]`

---

## KPI Cards

- Use ONLY `<div class="ds-kpi-card">` — no `style=""` attribute
- NEVER add `border-top`, `border-left`, or any colored/decorative border
- NEVER add custom `background`, `box-shadow`, or icon decorations
- Content = value + label + trend delta only — nothing else inside the card
- Max 5 cards in a row · `gap:8px` · `padding:8px 12px` · `border-radius:4px`
- **React:** no `border-t-*`, no custom bg — plain `border rounded-[4px]` only

---

## Badges & Status

- NEVER use inline `background` or `color` on badges
- Use ONLY `ds-badge success` / `warning` / `danger` / `info` / `neutral`
- Severity must always be visible in the default table column — NEVER tooltip-only
- **React:** critical=`bg-red-50 text-[#D12329]`, high=`bg-orange-50 text-[#D98B1D]`, medium=`bg-[#f0f0fc] text-[#6360d8]`, low=`bg-green-50 text-[#31A56D]`

---

## Tables

- ALWAYS wrap in `<div class="ds-table-wrap">`
- Use `ds-table`, `ds-th`, `ds-td` classes — NEVER raw `<table>` with custom styles
- ALWAYS include: (a) checkbox column leftmost, (b) row hover actions on `tr:hover`, (c) pagination footer `Showing X–Y of Z`
- Max 7 columns by default
- **React:** always include checkbox column, `group-hover` row actions, pagination footer

---

## Cards & Containers

- `border-radius:4px` ONLY on cards, table wrappers, panels, chart wrappers
- NEVER `8px`, `10px`, `12px`, `16px` on a card
- NEVER add `box-shadow` unless it is a modal overlay
- NEVER use gradient backgrounds on content cards
- **React:** `rounded-[4px]` only — never `rounded-xl`, `rounded-2xl`, no `shadow-lg`

---

## Callouts

- ONLY `ds-callout` + `ds-callout-warning` / `ds-callout-error` / `ds-callout-info` / `ds-callout-success`
- NEVER invent custom alert/banner styling

---

## Charts (HTML)

- ALWAYS copy `buildLineChart`, `buildMultiLineChart`, `buildVerticalBarChart`, `buildDonutChart`, or `buildStackedBarChart` from `charts.md` **verbatim**
- NEVER use `<canvas>`, Chart.js, D3, Recharts, ECharts, or any external chart library
- ALWAYS include the Chart Tooltip HTML + JS from the "Chart Tooltip" section of `charts.md` once per page — chart hovers will be broken without it
- Every multi-series chart MUST include a `<div class="chart-legend">` with one `chart-legend-dot` (circle, `border-radius:50%`) per series
- Chart legend is always centered (`justify-content:center`)
- Chart wrappers: `border-radius:4px` only

---

## Charts (React)

- Use **Recharts** only — `AreaChart`, `BarChart`, or `LineChart`
- NEVER `<canvas>`, D3, or custom SVG chart logic

---

## Hover States

- `:hover` is **mandatory** on every interactive element
- Buttons, tabs, nav rows, nav sub-items, pagination buttons, breadcrumb links, table row actions, modal close, filter buttons, chips, icon buttons — ALL must have `:hover`
- Use `var(--shell-hover)` for hover backgrounds · `var(--shell-text)` for text · `var(--shell-accent)` for accent interactions
- **React:** every clickable element must have a `hover:` Tailwind class

---

## Modals & Destructive Actions

- Destructive actions ALWAYS need a confirmation modal — name the item, state the consequence, red confirm button
- Modal structure: overlay → card → header → body → footer (Cancel left, Confirm right)
- **React:** use Radix `Dialog` for all modals

---

## Navigation

- Nav header: always `Prevalent AI` / `Exposure Management` — locked, never changes per page
- Expanded parent: `background:#f5f5f5`, text stays `#6e6e6e` — NEVER blue
- Active sub-item only: `color:#6360D8`, `background:rgba(99,96,216,0.08)`, `border-radius:6px`
- Sub-items: `padding-left:30px`, `font-size:14px`

---

## Error Handling States

**Choose the right pattern based on scope:**

| State | Emoji | Heading | Refresh Button? | Watermark? |
|-------|-------|---------|-----------------|------------|
| Full-page system error | 🚧 | "Oops! That Wasn't Supposed to Happen" | ✅ Yes | ✅ Yes — "ERROR", opacity 8% |
| Section data error | 🚧 | "Data Retrieval Failed" | ✅ Yes | ❌ No |
| Table empty state | 🚦 | "No Data… For Now!" | ❌ No | ❌ No |
| Inline field error | — | error message below field | — | — |
| Toast | — | short action feedback | — | — |

**Full-page system error** (`background: var(--shell-bg)`, shell remains visible):
- Watermark: `font-size:90px; font-weight:800; opacity:0.08; color:#a3a5af; position:absolute; letter-spacing:14px`
- 🚧 emoji, 40px centred
- Heading 18px/600, `#101010`: "Oops! That Wasn't Supposed to Happen"
- Subtext 12px, `#a3a5af`: "Well, this is awkward.. Something broke on our end. We're fixing it ASAP!"
- Refresh button: `background:#6360d8; border-radius:4px; height:32px; padding:6px 16px`
- NEVER: expose stack trace, remove nav, use 🚦 here, auto-redirect

**Section data error** (inside a widget/section container):
- No watermark — lower visual weight than full-page
- 🚧 emoji, 30px
- Heading 14px/600: "Data Retrieval Failed"
- Subtext 12px: "We're having trouble loading this data. Try refreshing or check back later."
- Refresh button (same style)
- NEVER: redirect entire page, collapse the container, omit Refresh

**Table empty state** (inside `<td colspan="n">`):
- 🚦 emoji, 28px — signals "wait, not broken"
- Heading 14px/600: "No Data… For Now!"
- Subtext 12px: "Try adjusting your filters or check back later."
- NO Refresh button — this is a user-driven state
- Table header row and pagination MUST remain visible
- NEVER: use 🚧 here, hide the header row, show Refresh

**Inline field error**:
- `border: 1.5px solid #dc2626` on the input
- Below: ⓘ icon (11px, `#dc2626`) + specific message text (11px, `#dc2626`)
- Validate on blur only (not every keystroke)
- NEVER: red border alone, vague messages ("Invalid"), clear field value on error

**Toast**:
- Success/Info: auto-dismiss 3s | Error/Warning: persist until dismissed
- Position: bottom-right | Max 3 stacked
- NEVER: use for errors requiring decisions (use modal), auto-dismiss errors

---

## React-Specific

- **Styling**: Tailwind CSS only — no inline styles, no CSS modules
- **Interactive primitives**: Radix UI (Dialog, DropdownMenu, Select, Tooltip, Popover, Checkbox, RadioGroup, Switch)
- **Icons**: Lucide React only — never emoji or text symbols
- **TypeScript**: proper interfaces for all props, no `any`
- **Exports**: named export + default export both
- **Spacing**: `p-1 p-2 p-3 p-4 p-5 p-6 p-8` only — never `p-2.5`, `p-3.5`, or arbitrary values
