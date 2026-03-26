# Prevalent AI — Design System

This file is loaded automatically by Claude Code at the start of every session. All design system rules are embedded here — no fetching, no external files required.

Prevalent AI is a cybersecurity risk and exposure management platform. You are generating UI for enterprise security teams.

---

## Tokens

**Font:** Inter — load via Google Fonts. Base size 12px.
**Theme:** `<html class="theme-light">` by default.
**Topbar:** always `background:#131313` — never changes with theme.
**Accent:** `#6360D8` (CTAs, active states, links). Filter/ActiveFilters CTA: `#504bb8`. Destructive: `#dc2626`.

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
- Buttons (CTA/text): `44px` pill — NEVER 6, 8, 12px
- Icon-only buttons: `50%` circle
- Cards, table wrappers, panels, chart wrappers: `4px` ONLY
- Inputs, dropdowns: `8px`
- Modals, drawers: `12px`
- Badges, tags, callouts: `4px`
- Nav active item: `6px`

### Spacing — 4px scale ONLY
`4, 8, 12, 16, 20, 24, 32, 48px` — NEVER: `3, 5, 6, 7, 10, 11, 13, 15px`

### Type ramp
- `18px/700` — full-page error headings only
- `14px/600` — section headings, modal titles
- `12px/500` — sub-header page title
- `12px/400` — default body
- `11px/400` — breadcrumbs, meta, captions

---

## Shell Structure

**Every page must have:** topbar → left nav → sub-header → content body.

**Topbar (#131313, left → right):**
PAI logo `<img src="https://anthu211.github.io/design-system-2.0/icons/pai-logo.svg" height="26">` → flex spacer → "Last Updated: Xh ago" → bell icon button → avatar circle (`background:#6360D8`, initials) → Navigator button (`t-special` class, gradient text).
**NEVER add "Prevalent AI" text to the topbar.**

**Left nav (white, 220px, collapsible to 52px icon-only):**
Nav header: workspace name (e.g. "EM Dashboard") + "Exposure Management" subtitle + collapse toggle. NOT "Prevalent AI".
Active sub-item: `color:#6360D8; background:rgba(99,96,216,0.08); border-radius:6px`.
Expanded parent stays `#f5f5f5` — NEVER blue. Sub-items: `padding-left:30px; font-size:14px`.
Sections collapsed by default (Hick's Law). Nav icons: 14×14px, stroke-width 2.

**Sub-header (sticky, white):**
Left: page title `12px/500` + breadcrumb `11px` below (last crumb `color:#6360D8`).
Right: "Explore in" button → spacer → Add circle button (`background:#6360D8`, 32px) → Active Filters pill (hover: popover with removable filter chips) → divider → Filter button (`background:#e0dff7; color:#504bb8; border-radius:44px`).
NEVER `<h1>` or 18px in sub-header.

**Content body:** `padding:24px; background:var(--shell-bg)`. No decorative dividers, no hero sections.

---

## Component Patterns

### Buttons
Classes: `ds-btn` + size (`sz-sm`/`sz-md`/`sz-lg`) + variant (`t-primary`/`t-outline`/`t-secondary`/`t-tertiary`/`t-danger`/`t-success`/`t-special`).
NEVER set custom `background-color` or `color` on a button. Min height `sz-md` (32px). Max 1 primary CTA per section.
```html
<button class="ds-btn sz-md t-primary">Save</button>
<button class="ds-btn sz-md t-outline">Cancel</button>
<button class="ds-btn sz-md t-danger">Delete</button>
<button class="ds-icon-btn" title="Edit"><!-- 14×14 SVG --></button>
```

### KPI Cards
```html
<div class="ds-kpi-row">
  <div class="ds-kpi-card">
    <div class="kpi-value">1,284</div>
    <div class="kpi-label">Total Assets</div>
    <div class="kpi-delta up-good">↑ 12% vs last month</div>
  </div>
</div>
```
Delta classes: `up-good` · `down-good` · `up-bad` · `down-bad`. Max 5 cards. No icons, no colored borders, no box-shadow.

### Badges
```html
<span class="ds-badge danger">Critical</span>    <!-- #D12329 -->
<span class="ds-badge warning">High</span>        <!-- #D98B1D -->
<span class="ds-badge caution">Medium-High</span>
<span class="ds-badge info">Medium</span>         <!-- #6360D8 -->
<span class="ds-badge neutral">Low</span>         <!-- #31A56D -->
<span class="ds-badge success dot">Running</span> <!-- dot modifier -->
```
NEVER inline `background`/`color` on badges. Severity always visible in table column — NEVER tooltip-only.

### Tables
Column order: `[checkbox] → [data cols] → [status] → [actions]`. Max 7 columns.
```html
<div class="ds-table-wrap">
  <table class="ds-table">
    <thead><tr>
      <th class="ds-th" style="width:40px;"><input type="checkbox"></th>
      <th class="ds-th">Name</th>
      <th class="ds-th">Status</th>
      <th class="ds-th"></th>  <!-- actions: empty header -->
    </tr></thead>
    <tbody><tr>
      <td class="ds-td"><input type="checkbox"></td>
      <td class="ds-td">Item name</td>
      <td class="ds-td"><span class="ds-badge danger">Critical</span></td>
      <td class="ds-td col-actions">
        <div class="row-actions">  <!-- hidden by default via CSS only, revealed on tr:hover -->
          <button class="ds-icon-btn" title="View"><!-- SVG --></button>
          <button class="ds-icon-btn" title="Delete"><!-- SVG --></button>
        </div>
      </td>
    </tr></tbody>
  </table>
  <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 16px;font-size:11px;color:var(--shell-text-muted);border-top:1px solid var(--table-border);">
    <span>Showing 1–25 of 148</span>
    <div style="display:flex;gap:4px;"><!-- prev/next --></div>
  </div>
</div>
```
`.row-actions` hidden via CSS (`display:none`) — NEVER `style="display:flex"` inline. NEVER mix actions + status badge in same `<td>`.

### Modals
```html
<div class="ds-modal-overlay">
  <div class="ds-modal-card">
    <div class="ds-modal-header">
      <span class="ds-modal-title">Delete "CVE-2024-1234"?</span>
      <button class="ds-modal-close">×</button>
    </div>
    <div class="ds-modal-body">This will permanently remove the finding and all notes.</div>
    <div class="ds-modal-footer">
      <button class="ds-btn sz-md t-outline">Cancel</button>  <!-- ALWAYS left -->
      <button class="ds-btn sz-md t-danger">Delete</button>   <!-- ALWAYS right -->
    </div>
  </div>
</div>
```
Destructive confirm: `t-danger` (red) — NEVER purple. Cancel always left. Name the item, state the consequence. Modal border-radius: `12px`.

### Form Controls
```html
<div class="ds-input-wrap">
  <label class="ds-input-label">API Key <span style="color:#dc2626">*</span></label>
  <input type="text" class="ds-input-field" placeholder="Enter value">
</div>
<!-- Error state -->
<div class="ds-input-wrap">
  <label class="ds-input-label">Email</label>
  <input type="email" class="ds-input-field" style="border:1.5px solid #dc2626;">
  <span style="font-size:11px;color:#dc2626;margin-top:4px;display:flex;gap:4px;">ⓘ Enter a valid email address.</span>
</div>
<textarea class="ds-textarea-field" rows="4"></textarea>
<label class="ds-checkbox-wrap"><input type="checkbox" class="ds-checkbox-input"><span class="ds-checkbox-box"></span><span class="ds-checkbox-label">Label</span></label>
```
Input radius: `8px`. Validate on blur only. Always pair red border with specific error message. Preserve user value on error.

### Tabs
```html
<div class="ds-tabs-list">
  <button class="ds-tab active">Tab A</button>
  <button class="ds-tab">Tab B</button>
</div>
<!-- Pill variant -->
<div class="ds-tabs-list ds-tabs-pill">...</div>
```
NEVER add page-level tabs unless explicitly requested. Max 5 tabs.

### Callouts
```html
<div class="ds-callout ds-callout-info">Info message.</div>
<div class="ds-callout ds-callout-warning">Warning message.</div>
<div class="ds-callout ds-callout-error">Error message.</div>
<div class="ds-callout ds-callout-success">Success message.</div>
<div class="ds-callout ds-callout-error-dark">Dark variant.</div>
```

### Toasts
```html
<!-- Inject into .ds-toast-container (bottom-right) -->
<div class="ds-toast success">Saved. <button class="ds-toast-dismiss">×</button></div>
<div class="ds-toast error">Failed. <button class="ds-toast-dismiss">×</button></div>
```
Class: `.ds-toast [variant]` (space-separated). Success/Info auto-dismiss 3s. Error/Warning persist. Max 3 stacked.

### Filter Bar
```html
<div class="ds-filter-bar">
  <button class="ds-filter-btn">Filter</button>
  <span class="ds-filter-chip"><span class="ds-chip-key">Severity</span><span class="ds-chip-value">Critical</span><button class="ds-chip-close">×</button></span>
</div>
```

### Other components
- Toggle: `ds-toggle-wrap` > `ds-toggle-input` + `ds-toggle-track` > `ds-toggle-thumb` + `ds-toggle-label`
- Tooltip: `ds-tooltip-wrap` > trigger + `ds-tooltip`
- Accordion: `ds-accordion` > `ds-accordion-item` > `ds-accordion-trigger` + `ds-accordion-content`
- Progress: `ds-progress` > `ds-progress-bar` (add `danger` class for red; `indeterminate` on parent for loading)
- Pagination: `ds-pagination` > `ds-page-btn`
- Steps: `ds-steps` > `ds-step` (add `completed`/`active` modifier)
- Avatar: `ds-avatar` (initials, `background:#6360D8`); group: `ds-avatar-group`
- Skeleton: `ds-skeleton` (CSS shimmer animation)
- Side panel: `ds-panel-overlay` + `ds-panel` > `ds-panel-header` + `ds-panel-body` + `ds-panel-footer`

---

## Error & Empty States

| Pattern | Emoji | Heading | Refresh? |
|---------|-------|---------|----------|
| Full-page error | 🚧 40px | "Oops! That Wasn't Supposed to Happen" 18px/600 | ✅ + "ERROR" watermark (90px, opacity 8%) |
| Section error | 🚧 30px | "Data Retrieval Failed" 14px/600 | ✅ no watermark |
| Table empty | 🚦 28px | "No Data… For Now!" 14px/600 | ❌ keep header + pagination |
| Field error | — | message below field (11px, #dc2626) | — |
| Toast | — | bottom-right, variant class | — |

- Table empty: NEVER 🚧, NEVER Refresh button, NEVER hide header row
- Full-page: NEVER auto-redirect, keep topbar/nav visible
- Field error: ALWAYS pair red border with message, validate on blur only

---

## Charts

NEVER use `<canvas>`, Chart.js, D3, or ECharts.
If `charts.md` is available locally, read it and copy chart functions verbatim.
Otherwise build SVG charts manually using these rules:
- Line/area charts: SVG `<polyline>` or `<path>`, no canvas
- Donut charts: SVG `<circle>` stroke-dasharray technique
- Bar charts: SVG `<rect>` elements
- Always include: chart title, axis labels, hover tooltip div, centered legend below with `border-radius:50%` dots
- Max 6–7 series. Severity colors: critical=#D12329, high=#D98B1D, medium=#6360D8, low=#31A56D
- React: Recharts only — AreaChart, BarChart, LineChart

---

## Personas

| Persona | Trigger words | Lead with | Key rule |
|---------|--------------|-----------|----------|
| **ciso** | dashboard, overview, executive, risk | KPI cards (max 5) + trend charts | 1 dominant CTA, no jargon |
| **grc** | compliance, audit, framework, control | Framework status table | Export button, filter by framework |
| **security-architect** | architecture, attack surface, topology | Technical detail visible | CVSSv3 scores, asset context |
| **security-engineer** | vulnerability, CVE, patch, scan | Dense CVE table | Bulk toolbar, SLA column, pagination |
| **soc-analyst** | alert, incident, triage, threat, SOC | Alert queue, severity sorted | Row quick-actions on hover, filter bar |

---

## UX Laws

- **Hick's:** 1 primary CTA per section. Nav collapsed by default. Dropdowns 10+ items need search.
- **Fitts's:** Row actions on `tr:hover`. All controls min 32px height. CTAs top-right sub-header or bottom-right modal.
- **Miller's:** Max 5 KPI cards. Max 7 nav items. Max 7 table columns. 4 severity levels only.
- **Jakob's:** Checkboxes leftmost. Pagination bottom-right. Cancel left of Confirm. Destructive = red.

---

## React Rules

Stack: React 18 + TypeScript + Tailwind + Radix UI + Lucide React + Recharts.
If `react.md` is available locally, read it for Shell/NavItem/SubHeader verbatim component code.
- Buttons: `rounded-[44px]` always — never `rounded-md/lg/full`
- Cards/panels: `rounded-[4px]` only — never `rounded-xl/2xl`
- Spacing: `p-1` through `p-8` only (4px scale)
- KPI: no icons, no colored borders. Delta: `up-good/down-good/up-bad/down-bad`
- Tables: checkbox → data → status → actions (`opacity-0 group-hover:opacity-100`)
- No inline styles except Navigator gradient text
- Radix: Dialog, Select, Checkbox, DropdownMenu, Popover, Tabs, Switch
- No inferred tabs. TypeScript: proper interfaces, no `any`. Named + default export.

---

## Hard Don'ts

- ❌ "Prevalent AI" text in topbar or nav header label
- ❌ `<canvas>` or external chart libraries (Chart.js, D3, ECharts)
- ❌ Custom `background-color`/`color` on a button — use variant classes
- ❌ Severity/status in tooltip only — must be visible in table column
- ❌ Page-level tabs unless explicitly requested
- ❌ `style="display:flex"` on `.row-actions` — CSS only
- ❌ Actions and status badge in the same `<td>`
- ❌ `border-radius` other than 44px on buttons, 4px on cards/wrappers
- ❌ `<h1>` or 18px title in sub-header
- ❌ KPI cards with icons, colored borders, or box-shadow
- ❌ Off-scale spacing: 3, 5, 6, 7, 10, 11, 13, 15px
- ❌ Two primary buttons in one section
- ❌ 🚧 emoji in table empty state (use 🚦)
- ❌ Refresh button in table empty state
- ❌ Red border on form field without error message
- ❌ Auto-dismiss error/warning toasts
- ❌ `rounded-md/lg/xl` on buttons or cards in React

---

## Slash Commands

Type these commands in Claude Code to build UI instantly:

### `/new-page [describe the screen]`
Creates a complete HTML page. Claude infers persona, generates full shell + content, saves as `kebab-case.html`.
```
/new-page alerts dashboard for the SOC analyst team
/new-page executive risk summary with KPI cards
/new-page vulnerability findings for a specific asset
```

### `/new-component [describe what to add]`
Adds a component to an existing HTML page in place.
```
/new-component add a filter bar to alerts-dashboard.html
/new-component add a delete confirmation modal to the findings table
/new-component add KPI cards at the top of risk-overview.html
```

### `/new-react-component [describe the component]`
Generates a React/TypeScript component using the PAI design system.
```
/new-react-component alerts table with bulk actions
/new-react-component CISO dashboard with KPI cards and trend chart
```

### `/ux-review [paste HTML or describe screen]`
Reviews a screen against design system rules. Returns pass/fail checklist with exact fixes.

### `/persona-check [feature description]`
Identifies primary persona, surfaces goals/frustrations, flags design conflicts.
