# Prevalent AI — Design System Core Reference

Single-file reference for all commands. Contains: tokens, hard rules, component patterns, React rules, personas, UX laws.
For HTML pages: also fetch `shell.md` (copy verbatim). For React: also fetch `react.md`. For charts: also fetch `charts.md`.

---

## Tokens

**Font:** Inter — load via Google Fonts. Base size 12px.
**Theme:** `<html class="theme-light">` by default.
**Topbar:** always `background:#131313` — never changes with theme.
**Accent:** `#6360D8` (CTAs, active states, links). Filter/ActiveFilters CTA: `#504bb8`.

### Light theme (default)
```
--shell-bg:#F7F9FC      --shell-border:#E6E6E6    --shell-text:#101010
--shell-text-2:#282828  --shell-text-muted:#6E6E6E --shell-accent:#6360D8
--shell-hover:rgba(0,0,0,0.04)  --shell-active:rgba(99,96,216,0.08)
--shell-raised:#F5F5F5  --shell-elevated:#EBEBEB
--ctrl-bg:#FFFFFF       --ctrl-border:#CFCFCF      --ctrl-placeholder:#9CA3AF
--card-bg:#FFFFFF       --card-border:#E6E6E6
--table-th-bg:#F5F5F5   --table-border:#E6E6E6
```

### Dark theme
```
--shell-bg:#0E0E0E      --shell-border:#272727    --shell-text:#F9F9F9
--shell-text-2:#D1D1D1  --shell-text-muted:#696969 --shell-accent:#6360D8
--shell-hover:rgba(255,255,255,0.04)  --shell-active:rgba(99,96,216,0.12)
--shell-raised:#1a1a1a  --shell-elevated:#1F1F1F
--ctrl-bg:#1a1a1a       --ctrl-border:#3B3A3A      --ctrl-placeholder:#696969
--card-bg:#131313       --card-border:#272727
--table-th-bg:#131313   --table-border:#1F1F1F
```

### Border radius
- Buttons (CTA/text): `44px` (pill) — NEVER 6, 8, 12px
- Icon-only buttons: `50%` (circle) or borderless
- Cards, table wrappers, panels, chart wrappers: `4px` ONLY — NEVER 8, 10, 12, 16px
- Inputs, dropdowns: `8px`
- Modals, drawers: `12px`
- Badges, tags: `4px`
- Nav active item: `6px`

### Spacing
4px scale ONLY: `4, 8, 12, 16, 20, 24, 32, 48px`.
NEVER use: `3, 5, 6, 7, 10, 11, 13, 15px`.

---

## Shell Structure

Every page uses the shell from `shell.md` — copy it verbatim. Only replace title, nav items, breadcrumb, and content.

**Topbar (always #131313, left → right):**
PAI logo `<img src="https://anthu211.github.io/design-system-2.0/icons/pai-logo.svg" height="26">` → flex spacer → "Last Updated: Xh ago" text → bell icon button → avatar circle (`background:#6360D8`, initials) → Navigator button (`t-special` class, gradient text).
**NEVER add "Prevalent AI" text to the topbar. The logo image IS the branding.**

**Left nav (white, 220px, collapsible to 52px):**
Nav header contains workspace/context name (e.g. "EM Dashboard") + "Exposure Management" subtitle + collapse toggle button. NOT "Prevalent AI".
Active sub-item: `color:#6360D8; background:rgba(99,96,216,0.08); border-radius:6px`.
Expanded parent row stays grey `#f5f5f5` — NEVER blue.
Sub-items: `padding-left:30px; font-size:14px`.
Nav labels: `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`.

**Sub-header (sticky, white, below topbar):**
Left: page title (12px/500) + breadcrumb below (11px, last crumb `color:#6360D8`).
Right: "Explore in" button → flex spacer → Add circle button (`background:#6360D8`, 32px) → Active Filters pill (on hover: popover with filter chips, each removable) → divider → Filter button (`background:#e0dff7; color:#504bb8`).
NEVER an `<h1>` or 18px title in the sub-header.

**Content body:** `padding:24px; background:var(--shell-bg)`. Content starts directly — no decorative dividers, no hero sections.

---

## Component Rules & Patterns

### Buttons
Classes: `ds-btn` + size (`sz-sm`=24px / `sz-md`=32px / `sz-lg`=40px) + variant (`t-primary` / `t-outline` / `t-secondary` / `t-tertiary` / `t-danger` / `t-success` / `t-special`).
- NEVER set custom `background-color` or `color` on a button — use variant classes only
- Minimum height `sz-md` (32px) for any clickable action; `sz-sm` for count badges/labels only
- `:hover` is mandatory on every button

```html
<button class="ds-btn sz-md t-primary">Save</button>
<button class="ds-btn sz-md t-outline">Cancel</button>
<button class="ds-btn sz-md t-danger">Delete</button>
<button class="ds-btn sz-sm t-special"><span class="btn-text">Navigator</span></button>
```

### KPI Cards
```html
<div style="display:flex;gap:8px;flex-wrap:wrap;">
  <div class="ds-kpi-card">        <!-- no style="" attribute -->
    <div class="kpi-value">1,284</div>
    <div class="kpi-label">Total Assets</div>
    <div class="kpi-trend up">↑ 12% vs last month</div>  <!-- or class="down" -->
  </div>
</div>
```
- Max 5 cards in a row · `gap:8px` · `padding:8px 12px` · `border-radius:4px`
- Content = value + label + trend ONLY — NEVER add icons, colored borders, box-shadow, custom backgrounds
- React: `rounded-[4px]` plain border only — no `border-t-*`, no custom bg

### Badges & Status
```html
<span class="ds-badge success">Active</span>
<span class="ds-badge danger">Critical</span>
<span class="ds-badge warning">High</span>
<span class="ds-badge info">Medium</span>
<span class="ds-badge neutral">Low</span>
```
- NEVER use inline `background` or `color` on badges
- Severity MUST be visible in default table column — NEVER tooltip-only
- React severity: critical=`bg-[#F9EEEE] text-[#D12329]`, high=`bg-[#FEF3C7] text-[#D98B1D]`, medium=`bg-[#f0f0fc] text-[#6360D8]`, low=`bg-[#EFF7ED] text-[#31A56D]`

### Tables
Column order: `[checkbox] → [data columns] → [status] → [actions]`. Max 7 columns.

```html
<div class="ds-table-wrap">
  <table class="ds-table">
    <thead>
      <tr>
        <th class="ds-th" style="width:40px;"><input type="checkbox"></th>
        <th class="ds-th">Name</th>
        <th class="ds-th">Severity</th>
        <th class="ds-th">Status</th>  <!-- status second-to-last -->
        <th class="ds-th"></th>         <!-- actions: EMPTY header, no label -->
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="ds-td"><input type="checkbox"></td>
        <td class="ds-td">Finding name</td>
        <td class="ds-td"><span class="ds-badge danger">Critical</span></td>
        <td class="ds-td"><span class="ds-badge warning">Open</span></td>
        <td class="ds-td col-actions">   <!-- dedicated actions cell -->
          <div class="row-actions">      <!-- hidden by default via CSS -->
            <button class="ds-icon-btn" title="View"><!-- eye SVG --></button>
            <button class="ds-icon-btn" title="Delete"><!-- trash SVG --></button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- Pagination footer — always present -->
  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;font-size:11px;color:var(--shell-text-muted);border-top:1px solid var(--table-border);">
    <span>Showing 1–25 of 148</span>
    <div style="display:flex;gap:4px;"><!-- prev/next buttons --></div>
  </div>
</div>
```
- NEVER put action icons in the same `<td>` as a status badge
- `.row-actions` hidden by default (`display:none`) — CSS reveals on `tr:hover`; NEVER `style="display:flex"` inline
- React: `group-hover:opacity-100` on actions div, `opacity-0` default

### Modals (destructive actions)
```html
<div class="ds-modal-overlay">
  <div class="ds-modal-card">
    <div class="ds-modal-header">
      <span class="ds-modal-title">Delete "CVE-2024-1234"?</span>
      <button class="ds-modal-close">×</button>
    </div>
    <div class="ds-modal-body">This will permanently remove the finding and all associated notes.</div>
    <div class="ds-modal-footer">
      <button class="ds-btn sz-md t-outline">Cancel</button>   <!-- Cancel ALWAYS left -->
      <button class="ds-btn sz-md t-danger">Delete</button>    <!-- Confirm ALWAYS right -->
    </div>
  </div>
</div>
```
- Destructive actions ALWAYS need a confirmation modal — name the item, state the consequence
- React: use Radix `Dialog` — never custom modal
- Cancel is ALWAYS left of Confirm

### Callouts
```html
<div class="ds-callout ds-callout-warning">Warning message here.</div>
<div class="ds-callout ds-callout-error">Error message here.</div>
<div class="ds-callout ds-callout-info">Info message here.</div>
<div class="ds-callout ds-callout-success">Success message here.</div>
```
NEVER invent custom alert/banner styling.

### Error & Empty States

| Scope | Emoji | Heading | Refresh? |
|-------|-------|---------|----------|
| Full-page error | 🚧 40px | "Oops! That Wasn't Supposed to Happen" (18px/600) | ✅ + "ERROR" watermark (90px, opacity 8%) |
| Section error | 🚧 30px | "Data Retrieval Failed" (14px/600) | ✅ no watermark |
| Table empty | 🚦 28px | "No Data… For Now!" (14px/600) | ❌ keep table header + pagination |
| Field error | — | message below field (11px, `#dc2626`) | — |

Subtext for errors: 12px, `#a3a5af`. Refresh button: `background:#6360d8; border-radius:4px; height:32px`.
Table empty state: NEVER use 🚧, NEVER hide header row, NEVER show Refresh button.

### Charts
- HTML: ALWAYS copy `buildLineChart`, `buildDonutChart`, `buildVerticalBarChart`, `buildStackedBarChart`, `buildMultiLineChart` from `charts.md` **verbatim**. NEVER `<canvas>`, Chart.js, D3, ECharts.
- ALWAYS include Chart Tooltip HTML + JS from `charts.md` — charts will break without it.
- Every multi-series chart needs `<div class="chart-legend">` with `chart-legend-dot` (`border-radius:50%`) per series, centered.
- React: Recharts only — `AreaChart`, `BarChart`, `LineChart`.

### Tabs
NEVER add page-level tabs unless the user explicitly requests them. Do not infer tabs from names like "Overview", "Assets", "Findings". Left nav already handles section navigation.

### Hover States
Mandatory on EVERY interactive element: buttons, nav rows, sub-items, pagination, breadcrumb links, row actions, modal close, filter chips, icon buttons.
Use `var(--shell-hover)` for hover backgrounds. React: every clickable element needs a `hover:` Tailwind class.

---

## React Quick Rules

Full React component code is in `react.md`. Apply these rules for all React output:

- **Stack:** React 18 + TypeScript + Tailwind CSS + Radix UI + Lucide React icons
- **Shell:** use `<Shell navItems={[...]} subHeader={<SubHeader .../>}>` from `react.md`
- **Topbar:** PAI logo `<img>` only — no "Prevalent AI" text. Navigator gradient button.
- **Nav header:** workspace name (e.g. "EM Dashboard") — NOT "Prevalent AI"
- **SubHeader title:** `text-[12px] font-medium` — NEVER `<h1>` or 18px
- **Buttons:** `rounded-[44px]` always. Never `rounded-md`, `rounded-lg`, `rounded-full` on a button
- **Cards/panels:** `rounded-[4px]` only. Never `rounded-xl`, `rounded-2xl`, `shadow-lg`
- **Spacing:** `p-1 p-2 p-3 p-4 p-5 p-6 p-8` only
- **KPI cards:** no icons, no colored borders, no box-shadow
- **Tables:** checkbox first → data cols → status → actions (last, `opacity-0 group-hover:opacity-100`)
- **No inline styles** except Navigator gradient text
- **Radix:** Dialog (modals), Select, Checkbox, DropdownMenu, Popover, Tabs, Switch
- **No inferred tabs** — only when explicitly requested
- TypeScript: proper interfaces, no `any`. Named + default export both.

---

## Personas (quick reference)

| Persona | Trigger words | Lead with | Key rule |
|---------|--------------|-----------|----------|
| **ciso** | dashboard, overview, executive, risk | KPI cards (max 5) + trend charts | 1 dominant CTA, no jargon |
| **grc** | compliance, audit, framework, control | Framework status table | Export button prominent, filter by framework |
| **security-architect** | architecture, attack surface, topology | Technical detail visible | CVSSv3 scores, asset relationships, no dumbing down |
| **security-engineer** | vulnerability, CVE, patch, asset, scan | Dense CVE table | Bulk toolbar, SLA column, pagination |
| **soc-analyst** | alert, incident, triage, threat, SOC | Alert queue, severity sorted | Row quick-actions on hover, filter bar always visible |

### UX Laws
- **Hick's:** 1 primary CTA per section. Nav collapsed by default. Dropdowns with 10+ items need search.
- **Fitts's:** Row actions on `tr:hover`. All interactive controls min 32px height. CTAs top-right of sub-header or bottom-right of modal.
- **Miller's:** Max 5 KPI cards. Max 7 nav items. Max 7 table columns default. 4 severity levels only.
- **Jakob's:** Checkboxes leftmost column. Pagination bottom-right. Cancel left of Confirm. Destructive = red.

---

## Hard Don'ts (violations = bugs)

- ❌ `<canvas>` or any external chart library in HTML pages
- ❌ Custom `background-color` or `color` on a button element
- ❌ Severity/status in tooltip only — must be visible in table column
- ❌ Page-level tabs unless explicitly requested
- ❌ `style="display:flex"` on `.row-actions` inline — CSS only
- ❌ Action icons mixed into the status badge cell
- ❌ `border-radius` other than 44px on CTA buttons, 4px on cards
- ❌ "Prevalent AI" text in the topbar or as nav header label
- ❌ `<h1>` below the sub-header or 18px title in sub-header
- ❌ KPI cards with icons, colored borders, or box-shadow
- ❌ Arbitrary spacing (must be 4px scale: 4/8/12/16/20/24/32/48px)
- ❌ `rounded-md`, `rounded-lg`, `rounded-xl` on any button or card in React
