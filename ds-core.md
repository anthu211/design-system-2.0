# Prevalent AI — Design System Core Reference

Single-file reference for all commands. Contains: tokens, shell, type ramp, every component HTML pattern + CSS class, form controls, error states, chart rules, React rules, personas, UX laws.
For HTML pages: also fetch `shell.md` (copy verbatim) and `charts.md`. For React: also fetch `react.md`.

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
- Buttons (CTA/text): `44px` (pill) — NEVER 6, 8, 12px
- Icon-only buttons: `50%` (circle) or borderless
- Cards, table wrappers, panels, chart wrappers: `4px` ONLY — NEVER 8, 10, 12, 16px
- Inputs, dropdowns: `8px`
- Modals, drawers: `12px`
- Badges, tags: `4px`
- Nav active item: `6px`
- Callouts: `4px`

### Spacing
4px scale ONLY: `4, 8, 12, 16, 20, 24, 32, 48px`.
NEVER use: `3, 5, 6, 7, 10, 11, 13, 15px`.

### Type Ramp
| Name | Size/Weight | Use |
|------|------------|-----|
| page-title | 18px / 700 | Full-page error headings only |
| heading-md | 14px / 600 | Section headings, modal titles |
| body-md | 12px / 400 | Default body text |
| body-sm | 11px / 400 | Breadcrumbs, meta, captions |
| overline | 10px / 500 uppercase | Label overlines |

Sub-header title: `12px / 500` — NEVER `<h1>` or 18px.

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
Nav sections collapsed by default (Hick's Law). Nav icons: 14×14px, stroke-width 2.

**Sub-header (sticky, white, below topbar):**
Left: page title (12px/500) + breadcrumb below (11px, last crumb `color:#6360D8`).
Right: "Explore in" button → flex spacer → Add circle button (`background:#6360D8`, 32px) → Active Filters pill (on hover: popover with filter chips, each removable) → divider → Filter button (`background:#e0dff7; color:#504bb8`).
NEVER an `<h1>` or 18px title in the sub-header.

**Content body:** `padding:24px; background:var(--shell-bg)`. Content starts directly — no decorative dividers, no hero sections.

---

## Component Patterns

### Buttons
Classes: `ds-btn` + size (`sz-sm`=24px / `sz-md`=32px / `sz-lg`=40px) + variant.
Variants: `t-primary` / `t-outline` / `t-secondary` / `t-tertiary` / `t-danger` / `t-success` / `t-special`.
- NEVER set custom `background-color` or `color` on a button — use variant classes only
- Minimum height `sz-md` (32px) for any clickable action; `sz-sm` for count badges/labels only
- Max 1 primary CTA per section (Hick's Law)
- Disabled state: `opacity:0.4; cursor:not-allowed` — NEVER hide disabled buttons
- `:hover` is mandatory on every button

```html
<button class="ds-btn sz-md t-primary">Save</button>
<button class="ds-btn sz-md t-outline">Cancel</button>
<button class="ds-btn sz-md t-danger">Delete</button>
<button class="ds-btn sz-sm t-special"><span class="btn-text">Navigator</span></button>
<button class="ds-icon-btn" title="Edit"><!-- 14×14 SVG --></button>
```

### Toggle Switch
```html
<!-- Single toggle -->
<label class="ds-toggle-wrap">
  <input type="checkbox" class="ds-toggle-input">
  <span class="ds-toggle-track"><span class="ds-toggle-thumb"></span></span>
  <span class="ds-toggle-label">Enable feature</span>
</label>

<!-- Dual toggle (two labels, one control) -->
<div class="ds-dual-toggle">
  <span class="dual-label">Off</span>
  <label class="ds-toggle-wrap">
    <input type="checkbox" class="ds-toggle-input">
    <span class="ds-toggle-track"><span class="ds-toggle-thumb"></span></span>
  </label>
  <span class="dual-label">On</span>
</div>
```

### KPI Cards
```html
<div class="ds-kpi-row">   <!-- flex row, gap:8px, flex-wrap:wrap -->
  <div class="ds-kpi-card">
    <div class="kpi-value">1,284</div>
    <div class="kpi-label">Total Assets</div>
    <div class="kpi-delta up-good">↑ 12% vs last month</div>
  </div>
  <div class="ds-kpi-card">
    <div class="kpi-value">47</div>
    <div class="kpi-label">Critical Findings</div>
    <div class="kpi-delta up-bad">↑ 3 since yesterday</div>
  </div>
</div>
```
Delta classes: `up-good` (green up) · `down-good` (green down) · `up-bad` (red up) · `down-bad` (red down).
- Max 5 cards in a row · `gap:8px` · `padding:8px 12px` · `border-radius:4px`
- Content = value + label + delta ONLY — NEVER add icons, colored borders, box-shadow, custom backgrounds
- Always include trend/delta — never omit

### Badges & Status
```html
<span class="ds-badge success">Active</span>
<span class="ds-badge danger">Critical</span>
<span class="ds-badge warning">High</span>
<span class="ds-badge caution">Medium-High</span>
<span class="ds-badge info">Medium</span>
<span class="ds-badge neutral">Low</span>

<!-- With dot indicator -->
<span class="ds-badge success dot">Running</span>
<span class="ds-badge danger dot">Failed</span>
```
- NEVER use inline `background` or `color` on badges
- Severity MUST be visible in default table column — NEVER tooltip-only
- Border-radius: `4px`. Font: `11px / 600`. Max 2 words per label.
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
        <td class="ds-td col-actions">
          <div class="row-actions">      <!-- hidden by default via CSS only -->
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
- Sort indicators on all sortable columns; pagination + row-count selector always present
- Keep table header visible in empty and error states

### Tabs
```html
<!-- Underline variant (default) -->
<div class="ds-tabs-list">
  <button class="ds-tab active">Overview</button>
  <button class="ds-tab">Details</button>
  <button class="ds-tab">History</button>
</div>
<div class="ds-tab-panel"><!-- content --></div>

<!-- Pill variant -->
<div class="ds-tabs-list ds-tabs-pill">
  <button class="ds-tab active">All</button>
  <button class="ds-tab">Active</button>
  <button class="ds-tab">Resolved</button>
</div>
```
NEVER add page-level tabs unless the user explicitly requests them. Do not infer tabs from names like "Overview", "Assets", "Findings". Left nav already handles section navigation. Max 5 visible tabs.

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
- Destructive actions ALWAYS need a confirmation modal — name the specific item, state the consequence
- Destructive confirm button: `t-danger` (red #dc2626) — NEVER purple
- Cancel is ALWAYS left of Confirm; overlay click closes modal
- React: use Radix `Dialog` — never custom modal
- Border-radius on modal card: `12px`

### Form Modal (with sections)
```html
<div class="ds-modal-overlay">
  <div class="ds-modal-card" style="width:520px;">
    <div class="ds-modal-header ds-modal-header-form">
      <span class="ds-modal-title">Add Integration</span>
      <button class="ds-modal-close">×</button>
    </div>
    <div class="ds-modal-body">
      <div class="ds-form-section">
        <div class="ds-form-section-label">Connection Details</div>
        <!-- form fields -->
      </div>
    </div>
    <div class="ds-modal-footer">
      <button class="ds-btn sz-md t-outline">Cancel</button>
      <button class="ds-btn sz-md t-primary">Save</button>
    </div>
  </div>
</div>
```

### Form Controls
```html
<!-- Text input -->
<div class="ds-input-wrap">
  <label class="ds-input-label">API Key <span style="color:#dc2626">*</span></label>
  <input type="text" class="ds-input-field" placeholder="Enter API key">
</div>

<!-- Input with error state -->
<div class="ds-input-wrap error">
  <label class="ds-input-label">Email</label>
  <input type="email" class="ds-input-field" style="border-color:#dc2626;">
  <span class="ds-field-error"><!-- ⓘ SVG --> Enter a valid email address</span>
</div>

<!-- Textarea -->
<div class="ds-input-wrap">
  <label class="ds-input-label">Description</label>
  <textarea class="ds-textarea-field" rows="4" placeholder="Describe the issue..."></textarea>
</div>

<!-- Checkbox (custom) -->
<label class="ds-checkbox-wrap">
  <input type="checkbox" class="ds-checkbox-input">
  <span class="ds-checkbox-box"></span>
  <span class="ds-checkbox-label">Enable notifications</span>
</label>

<!-- Radio group -->
<div class="ds-radio-group">
  <label class="ds-radio-wrap">
    <input type="radio" name="severity" class="ds-radio-input" value="critical">
    <span class="ds-radio-dot"></span>
    <span class="ds-radio-label">Critical</span>
  </label>
  <label class="ds-radio-wrap">
    <input type="radio" name="severity" class="ds-radio-input" value="high">
    <span class="ds-radio-dot"></span>
    <span class="ds-radio-label">High</span>
  </label>
</div>
```
- Input/dropdown border-radius: `8px`
- Error: red border `1.5px solid #dc2626` + ⓘ icon + message below (11px, #dc2626)
- Required fields: asterisk `*` in red after label text
- Labels always visible — never placeholder-only
- Validate on blur only — NEVER per keystroke
- Scroll to and focus first invalid field on form submit
- Preserve user's entered value on error — never clear the field

### Dropdown / Select
```html
<div class="ds-dropdown">
  <button class="ds-dropdown-trigger ds-btn sz-md t-outline">
    <span>Select option</span>
    <svg><!-- chevron-down --></svg>
  </button>
  <div class="ds-dropdown-panel" style="display:none;">
    <div class="ds-dropdown-options">
      <div class="ds-dropdown-option">Option A</div>
      <div class="ds-dropdown-option">Option B</div>
      <div class="ds-dropdown-option selected">Option C</div>
    </div>
  </div>
</div>
```
Dropdowns with 10+ items: add a search input inside the panel (Hick's Law).

### Filter Bar
```html
<div class="ds-filter-bar">
  <button class="ds-filter-btn">
    <svg><!-- filter icon --></svg> Filter
  </button>
  <!-- Active filter chips -->
  <div class="ds-active-filters-wrap">
    <span class="ds-filter-chip">
      <span class="ds-chip-key">Severity</span>
      <span class="ds-chip-value">Critical</span>
      <button class="ds-chip-close">×</button>
    </span>
    <span class="ds-filter-chip">
      <span class="ds-chip-key">Status</span>
      <span class="ds-chip-value">Open</span>
      <button class="ds-chip-close">×</button>
    </span>
  </div>
  <!-- Active Filters popover trigger in sub-header -->
  <div class="ds-active-filters-popover" style="display:none;">
    <!-- filter chips listed here on hover -->
  </div>
</div>
```
Filter button in sub-header: `background:#e0dff7; color:#504bb8; border-radius:44px`.

### Callouts
```html
<div class="ds-callout ds-callout-info">Info message here.</div>
<div class="ds-callout ds-callout-warning">Warning message here.</div>
<div class="ds-callout ds-callout-error">Error message here.</div>
<div class="ds-callout ds-callout-success">Success message here.</div>

<!-- Dark variants (for dark-bg sections) -->
<div class="ds-callout ds-callout-error-dark">Error in dark context.</div>
<div class="ds-callout ds-callout-success-dark">Success in dark context.</div>
<div class="ds-callout ds-callout-warning-dark">Warning in dark context.</div>
```
- NEVER invent custom alert/banner styling — always use `.ds-callout-[variant]`
- Include icon + message + recovery action when relevant
- Border-radius: `4px`. Gap: `8px`.

### Toast Notifications
```html
<div class="ds-toast-container"><!-- bottom-right --></div>

<!-- JS: inject these into container -->
<div class="ds-toast success">
  <span>Integration connected successfully.</span>
  <button class="ds-toast-dismiss">×</button>
</div>
<div class="ds-toast error">
  <span>Connection failed. Check your API key.</span>
  <button class="ds-toast-dismiss">×</button>
</div>
<div class="ds-toast warning">...</div>
<div class="ds-toast info">...</div>
```
- Class pattern: `.ds-toast [variant]` — space-separated, NOT `.ds-toast-success`
- Success/Info: auto-dismiss after 3s. Error/Warning: persist until user dismisses.
- Max 3 stacked at once. Bottom-right corner. Always include `ds-toast-dismiss` button.
- NEVER use toast for decisions or critical confirmations.

### Tooltip
```html
<div class="ds-tooltip-wrap">
  <button class="ds-icon-btn"><!-- info SVG --></button>
  <div class="ds-tooltip">Tooltip text appears here on hover.</div>
</div>
```
CSS-only tooltip — no JS required. NEVER use tooltip as the only place to show severity/status.

### Accordion
```html
<div class="ds-accordion">
  <div class="ds-accordion-item">
    <button class="ds-accordion-trigger">
      <span>Section Title</span>
      <svg><!-- chevron --></svg>
    </button>
    <div class="ds-accordion-content">
      Content goes here.
    </div>
  </div>
</div>
```

### Progress Bar
```html
<!-- Determinate -->
<div class="ds-progress">
  <div class="ds-progress-bar" style="width:65%;"></div>
</div>

<!-- Danger/critical color -->
<div class="ds-progress">
  <div class="ds-progress-bar danger" style="width:90%;"></div>
</div>

<!-- Indeterminate (loading) -->
<div class="ds-progress indeterminate">
  <div class="ds-progress-bar"></div>
</div>
```

### Pagination (standalone)
```html
<div class="ds-pagination">
  <button class="ds-page-btn" disabled>‹ Prev</button>
  <button class="ds-page-btn active">1</button>
  <button class="ds-page-btn">2</button>
  <button class="ds-page-btn">3</button>
  <button class="ds-page-btn">Next ›</button>
</div>
```

### Breadcrumbs
```html
<nav class="ds-breadcrumb">
  <a href="#">Home</a>
  <span class="ds-bc-sep">›</span>
  <a href="#">Assets</a>
  <span class="ds-bc-sep">›</span>
  <span class="ds-bc-current">server-01.prod</span>  <!-- last crumb: color:#6360D8 -->
</nav>
```

### Step Progress
```html
<div class="ds-steps">
  <div class="ds-step completed">
    <div class="ds-step-icon">✓</div>
    <div class="ds-step-label">Connect</div>
  </div>
  <div class="ds-step active">
    <div class="ds-step-icon">2</div>
    <div class="ds-step-label">Configure</div>
  </div>
  <div class="ds-step">
    <div class="ds-step-icon">3</div>
    <div class="ds-step-label">Review</div>
  </div>
</div>
```

### Avatars
```html
<!-- Single avatar (initials) -->
<div class="ds-avatar" style="background:#6360D8;">JD</div>

<!-- Size variants -->
<div class="ds-avatar ds-avatar-sm">AB</div>
<div class="ds-avatar ds-avatar-lg">CD</div>

<!-- Avatar group (overlapping) -->
<div class="ds-avatar-group">
  <div class="ds-avatar" style="background:#6360D8;">JD</div>
  <div class="ds-avatar" style="background:#31A56D;">MK</div>
  <div class="ds-avatar" style="background:#D98B1D;">+3</div>
</div>
```

### Skeleton Loaders
```html
<div class="ds-skeleton" style="width:100%;height:16px;border-radius:4px;"></div>
<div class="ds-skeleton" style="width:60%;height:12px;border-radius:4px;margin-top:8px;"></div>
<!-- Animated shimmer via CSS animation -->
```

### Side Panel / Drawer
```html
<div class="ds-panel-overlay"></div>
<div class="ds-panel">
  <div class="ds-panel-header">
    <span class="ds-panel-title">Asset Details</span>
    <button class="ds-modal-close">×</button>
  </div>
  <div class="ds-panel-body">
    <!-- panel content -->
  </div>
  <div class="ds-panel-footer">
    <button class="ds-btn sz-md t-outline">Cancel</button>
    <button class="ds-btn sz-md t-primary">Save</button>
  </div>
</div>
```
Panel slides in from right. Border-radius: `12px` on left corners only (or overall `12px`).

---

## Charts

- HTML: ALWAYS copy `buildLineChart`, `buildDonutChart`, `buildVerticalBarChart`, `buildStackedBarChart`, `buildMultiLineChart` from `charts.md` **verbatim**. NEVER `<canvas>`, Chart.js, D3, ECharts.
- ALWAYS include Chart Tooltip HTML + JS from `charts.md` — charts will break without it.
- Every multi-series chart needs `<div class="chart-legend">` with `chart-legend-dot` (`border-radius:50%`) per series, centered below chart.
- Chart dots: `8×8px` circle (border-radius:50%). Markers: circles only — NEVER dashes/squares.
- Always include chart title + axis labels + hover tooltips. Max 6–7 series.
- Severity colors match badge colors: critical=#D12329, high=#D98B1D, medium=#6360D8, low=#31A56D.
- React: Recharts only — `AreaChart`, `BarChart`, `LineChart`.

---

## Error & Empty State Patterns

**Decision tree:**
- Entire page cannot render → Pattern 1 (Full-page error)
- One widget/section fails → Pattern 2 (Section error)
- Query returns 0 rows (user action, not system error) → Pattern 3 (Table empty)
- Form field fails validation → Pattern 4 (Inline field error)
- Transient feedback after user action → Pattern 5 (Toast)

### Pattern 1 — Full-Page System Error
```html
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;position:relative;overflow:hidden;">
  <div style="position:absolute;font-size:90px;font-weight:700;color:#101010;opacity:0.08;letter-spacing:8px;user-select:none;">ERROR</div>
  <div style="font-size:40px;margin-bottom:16px;">🚧</div>
  <div style="font-size:18px;font-weight:600;color:var(--shell-text);margin-bottom:8px;">Oops! That Wasn't Supposed to Happen</div>
  <div style="font-size:12px;color:#a3a5af;margin-bottom:24px;">We ran into an unexpected issue. Try refreshing — it usually helps.</div>
  <button class="ds-btn sz-md t-primary" onclick="location.reload()">Refresh Page</button>
</div>
```
Rules: Keep topbar/nav visible. Refresh always present. No stack traces or HTTP codes. NEVER use 🚦 here. NEVER auto-redirect.

### Pattern 2 — Section / Data Retrieval Error
```html
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;">
  <div style="font-size:30px;margin-bottom:12px;">🚧</div>
  <div style="font-size:14px;font-weight:600;color:var(--shell-text);margin-bottom:8px;">Data Retrieval Failed</div>
  <div style="font-size:12px;color:#a3a5af;margin-bottom:20px;">We couldn't load this section. Other parts of the page are still functional.</div>
  <button class="ds-btn sz-md t-primary" onclick="retrySection()">Refresh</button>
</div>
```
Rules: No "ERROR" watermark. Refresh button present. Other sections remain functional. NEVER redirect entire page.

### Pattern 3 — Table Empty State
```html
<tbody>
  <tr>
    <td colspan="100%" style="text-align:center;padding:48px 24px;">
      <div style="font-size:28px;margin-bottom:12px;">🚦</div>
      <div style="font-size:14px;font-weight:600;color:var(--shell-text);margin-bottom:8px;">No Data… For Now!</div>
      <div style="font-size:12px;color:#a3a5af;">No records match your current filters. Try adjusting your search.</div>
    </td>
  </tr>
</tbody>
```
Rules: 🚦 NOT 🚧. No Refresh button. Keep table `<thead>` and pagination visible. NEVER "No records found" without guidance. NEVER hide the header row.

### Pattern 4 — Inline Field Validation Error
```html
<div class="ds-input-wrap">
  <label class="ds-input-label">Email</label>
  <input type="email" class="ds-input-field" style="border:1.5px solid #dc2626;">
  <span style="display:flex;align-items:center;gap:4px;font-size:11px;color:#dc2626;margin-top:4px;">
    <svg width="11" height="11"><!-- ⓘ icon --></svg>
    Enter a valid email address.
  </span>
</div>
```
Rules: Always pair red border with a specific message. Validate on blur only. Scroll/focus first invalid on submit. Preserve user's entered value.

### Pattern 5 — Toast Notification
```html
<!-- Inject via JS into .ds-toast-container (bottom-right) -->
<div class="ds-toast success">Integration saved. <button class="ds-toast-dismiss">×</button></div>
<div class="ds-toast error">Save failed — check your API key. <button class="ds-toast-dismiss">×</button></div>
```
Rules: Success/Info auto-dismiss 3s. Error/Warning persist. Max 3 stacked. NEVER use for decisions.

---

## Status Color Reference

| Status | Badge class | Light bg | Light text |
|--------|-------------|----------|------------|
| Critical | `ds-badge danger` | #F9EEEE | #D12329 |
| High | `ds-badge warning` | #FEF3C7 | #D98B1D |
| Medium-High | `ds-badge caution` | #FFF3E0 | #E57B1D |
| Medium | `ds-badge info` | #f0f0fc | #6360D8 |
| Low | `ds-badge neutral` | #EFF7ED | #31A56D |
| Active/Good | `ds-badge success` | #EFF7ED | #31A56D |

---

## React Quick Rules

Full React component code is in `react.md`. Apply these rules for all React output:

- **Stack:** React 18 + TypeScript + Tailwind CSS + Radix UI + Lucide React icons + Recharts
- **Shell:** use `<Shell navItems={[...]} subHeader={<SubHeader .../>}>` from `react.md`
- **Topbar:** PAI logo `<img>` only — no "Prevalent AI" text. Navigator gradient button.
- **Nav header:** workspace name (e.g. "EM Dashboard") — NOT "Prevalent AI". Collapses to 52px icon-only mode.
- **SubHeader title:** `text-[12px] font-medium` — NEVER `<h1>` or 18px
- **Buttons:** `rounded-[44px]` always. Never `rounded-md`, `rounded-lg`, `rounded-full` on a button
- **Cards/panels:** `rounded-[4px]` only. Never `rounded-xl`, `rounded-2xl`, `shadow-lg`
- **Spacing:** `p-1 p-2 p-3 p-4 p-5 p-6 p-8` only (4px scale)
- **KPI cards:** no icons, no colored borders, no box-shadow. Delta: `up-good/down-good/up-bad/down-bad`.
- **Tables:** checkbox first → data cols → status → actions (last, `opacity-0 group-hover:opacity-100`)
- **No inline styles** except Navigator gradient text
- **Radix:** Dialog (modals), Select, Checkbox, DropdownMenu, Popover, Tabs, Switch
- **No inferred tabs** — only when explicitly requested. Max 5 visible tabs.
- **Severity badges:** critical=`bg-[#F9EEEE] text-[#D12329]`, high=`bg-[#FEF3C7] text-[#D98B1D]`, medium=`bg-[#f0f0fc] text-[#6360D8]`, low=`bg-[#EFF7ED] text-[#31A56D]`
- **Charts:** Recharts only. `AreaChart`, `BarChart`, `LineChart`. Legend centered below.
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

### Persona content rules
- **ciso**: KPI cards first (max 5), trend visible, one dominant CTA
- **grc**: Compliance tables, control status always visible, export button
- **security-architect**: Technical detail visible, CVSSv3 scores, asset context
- **security-engineer**: Dense CVE table, bulk toolbar, SLA column, pagination
- **soc-analyst**: Alert queue first, severity always visible, quick row actions

---

## UX Laws

- **Hick's:** 1 primary CTA per section. Nav collapsed by default. Dropdowns with 10+ items need search.
- **Fitts's:** Row actions on `tr:hover`. All interactive controls min 32px height. CTAs top-right of sub-header or bottom-right of modal.
- **Miller's:** Max 5 KPI cards. Max 7 nav items. Max 7 table columns default. 4 severity levels only.
- **Jakob's:** Checkboxes leftmost column. Pagination bottom-right. Cancel left of Confirm. Destructive = red.

---

## Hard Don'ts (violations = bugs)

- ❌ `<canvas>` or any external chart library in HTML pages (Chart.js, D3, ECharts)
- ❌ Custom `background-color` or `color` on a button element — use variant classes only
- ❌ Severity/status in tooltip only — must be visible in table column
- ❌ Page-level tabs unless explicitly requested
- ❌ `style="display:flex"` on `.row-actions` inline — CSS only
- ❌ Action icons mixed into the status badge cell
- ❌ `border-radius` other than 44px on CTA buttons, 4px on cards/table-wraps
- ❌ "Prevalent AI" text in the topbar or as nav header label
- ❌ `<h1>` below the sub-header or 18px title in sub-header
- ❌ KPI cards with icons, colored borders, or box-shadow
- ❌ Arbitrary spacing — must be 4px scale: 4/8/12/16/20/24/32/48px
- ❌ `rounded-md`, `rounded-lg`, `rounded-xl` on any button or card in React
- ❌ Two primary buttons in one section
- ❌ Toast for destructive confirmations or decisions
- ❌ 🚧 emoji in table empty states (use 🚦 only)
- ❌ Refresh button in table empty state
- ❌ Red border on form field without an error message below it
- ❌ Per-keystroke form validation
- ❌ Auto-dismiss error toasts
- ❌ Icons, colored left-borders, or box-shadow on KPI cards
- ❌ Off-scale spacing values: 3, 5, 6, 7, 10, 11, 13, 15px
