# Prevalent AI — Design System Core Reference

Single-file reference for all commands. Contains: tokens, every component HTML pattern + CSS class, form controls, error states, chart rules, React rules, personas, UX laws.
For HTML pages: fetch `page-spec.md` instead (includes shell). For React: also fetch `react.md`.

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


---

## Shell HTML Template

**Copy this template verbatim for every new HTML page. Only replace: `<title>`, nav items, breadcrumb text, sub-header title, and `<!-- Page content goes here -->`.**

```html
<!DOCTYPE html>
<html lang="en" class="theme-light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Prevalent AI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    a { text-decoration: none; }
    :root {
      --shell-bg:#0E0E0E; --shell-border:#272727; --shell-text:#F9F9F9; --shell-text-2:#D1D1D1;
      --shell-text-muted:#696969; --shell-text-faint:#3B3A3A; --shell-accent:#6360D8;
      --shell-hover:rgba(255,255,255,0.04); --shell-active:rgba(99,96,216,0.12);
      --shell-raised:#1a1a1a; --shell-elevated:#1F1F1F;
      --ctrl-bg:#1a1a1a; --ctrl-border:#3B3A3A; --ctrl-text:#F9F9F9; --ctrl-text-2:#D1D1D1;
      --ctrl-placeholder:#696969; --ctrl-panel-bg:#1a1a1a; --ctrl-hover:#242424;
      --ctrl-focus:rgba(103,96,216,.22); --ctrl-selected-bg:rgba(99,96,216,0.15); --ctrl-selected-text:#8F8DDE;
      --card-bg:#131313; --card-border:#272727; --table-th-bg:#131313; --table-border:#1F1F1F;
    }
    html.theme-light {
      --shell-bg:#F7F9FC; --shell-border:#E6E6E6; --shell-text:#101010; --shell-text-2:#282828;
      --shell-text-muted:#6E6E6E; --shell-text-faint:#C0C0C0; --shell-accent:#6360D8;
      --shell-hover:rgba(0,0,0,0.04); --shell-active:rgba(99,96,216,0.08);
      --shell-raised:#F5F5F5; --shell-elevated:#EBEBEB;
      --ctrl-bg:#FFFFFF; --ctrl-border:#cfcfcf; --ctrl-text:#282828; --ctrl-text-2:#282828;
      --ctrl-placeholder:#9f9f9f; --ctrl-panel-bg:#FFFFFF; --ctrl-hover:#f3f3f3;
      --ctrl-focus:rgba(103,96,216,.15); --ctrl-selected-bg:#f0f0fc; --ctrl-selected-text:#6760d8;
      --card-bg:#FFFFFF; --card-border:#E6E6E6; --table-th-bg:#F5F5F5; --table-border:#E6E6E6;
    }
    body { font-family:'Inter',sans-serif; background:var(--shell-bg); color:var(--shell-text); display:flex; flex-direction:column; height:100vh; overflow:hidden; font-size:12px; line-height:1.5; }
    .ds-btn { display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;border-radius:44px;font-family:inherit;transition:background 150ms,color 150ms,border-color 150ms;white-space:nowrap;user-select:none;line-height:1;text-decoration:none; }
    .ds-btn:focus-visible { outline:2px solid #6760d8;outline-offset:2px; }
    .ds-btn[disabled] { cursor:not-allowed;pointer-events:none;opacity:0.4; }
    .ds-btn.sz-sm { height:24px;padding:0 12px;font-size:12px;font-weight:500; }
    .ds-btn.sz-md { height:32px;padding:0 12px;font-size:14px;font-weight:500; }
    .ds-btn.sz-lg { height:40px;padding:0 16px;font-size:16px;font-weight:600; }
    .ds-btn.t-primary { background:#6760d8;color:#f0f0fc; }
    .ds-btn.t-primary:hover { background:#5754c2; }
    .ds-btn.t-special { background:transparent;border:1px solid #b1b8f5; }
    .ds-btn.t-special .btn-text { background:linear-gradient(to right,#467fcd,#47adcb);-webkit-background-clip:text;background-clip:text;color:transparent; }
    .ds-btn.t-special:hover { background:rgba(177,184,245,0.12); }
    .ds-btn.t-secondary { background:rgba(99,96,216,0.15);color:#8F8DDE; }
    .ds-btn.t-secondary:hover { background:rgba(99,96,216,0.22);color:#a8a6e8; }
    html.theme-light .ds-btn.t-secondary { background:#f0f0fc;color:#6760d8; }
    html.theme-light .ds-btn.t-secondary:hover { background:#e0dff7;color:#504bb8; }
    .ds-btn.t-outline { background:transparent;border:1px solid var(--shell-border);color:var(--shell-text-2); }
    .ds-btn.t-outline:hover { border-color:var(--shell-text-muted);background:var(--shell-hover); }
    html.theme-light .ds-btn.t-outline { border-color:#c1c1c1;color:#282828; }
    html.theme-light .ds-btn.t-outline:hover { border-color:#404040;background:transparent; }
    .ds-btn.t-tertiary { background:transparent;color:var(--shell-text-2); }
    .ds-btn.t-tertiary:hover { background:var(--shell-hover); }
    .ds-btn.t-danger { background:rgba(105,31,31,0.25);color:#e87c7c;border:1px solid transparent; }
    .ds-btn.t-danger:hover { background:rgba(105,31,31,0.35); }
    html.theme-light .ds-btn.t-danger { background:#feebec;color:#d12329; }
    html.theme-light .ds-btn.t-danger:hover { background:#ffdbdc; }
    .ds-btn.t-success { background:rgba(31,105,69,0.25);color:#4eca8b;border:1px solid transparent; }
    .ds-btn.t-success:hover { background:rgba(31,105,69,0.35); }
    html.theme-light .ds-btn.t-success { background:#e6f6eb;color:#1a7549; }
    html.theme-light .ds-btn.t-success:hover { background:#d6f1df; }
    .ds-spinner { width:13px;height:13px;border-radius:50%;border:2px solid currentColor;border-top-color:transparent;animation:ds-spin .7s linear infinite;display:inline-block; }
    @keyframes ds-spin { to { transform:rotate(360deg); } }
    .ds-kpi-row { display:flex;gap:8px; }
    .ds-kpi-card { flex:1;min-width:0;background:var(--card-bg);border:1px solid var(--card-border);border-radius:4px;padding:8px 12px;min-height:90px;display:flex;flex-direction:column;justify-content:space-between; }
    .ds-kpi-value { font-size:14px;font-weight:600;color:var(--shell-text);line-height:1.2;margin-bottom:4px; }
    .ds-kpi-label { font-size:12px;font-weight:500;color:var(--shell-text);line-height:1.3; }
    .ds-kpi-delta { display:inline-flex;align-items:center;gap:2px;font-size:10px;font-weight:400; }
    .ds-kpi-delta.up-good,.ds-kpi-delta.down-good { color:#31a56d; }
    .ds-kpi-delta.up-bad,.ds-kpi-delta.down-bad { color:#e15252; }
    .ds-kpi-delta.neutral { color:var(--shell-text-muted); }
    .chart-legend { display:flex;flex-wrap:wrap;gap:12px;margin-top:12px;justify-content:center; }
    .chart-legend-item { display:flex;align-items:center;gap:6px;font-size:12px;color:var(--shell-text-2); }
    .chart-legend-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0; }
    .ds-callout { display:flex;align-items:center;gap:8px;padding:12px 16px;border-radius:4px;font-size:13px;line-height:1.6;flex-shrink:0; }
    .ds-callout-error   { background:#F9EEEE;color:#D12329;border:1px solid rgba(209,35,41,0.2); }
    .ds-callout-success { background:#EFF7ED;color:#1A7D4D;border:1px solid rgba(49,165,109,0.2); }
    .ds-callout-warning { background:#F7F6EB;color:#D98B1D;border:1px solid rgba(217,139,29,0.2); }
    .ds-callout-info    { background:rgba(99,96,216,0.08);color:#8F8DDE;border:1px solid rgba(99,96,216,0.2); }
    .ds-callout-error-dark   { background:rgba(225,82,82,0.28);color:#F9F9F9;border:1px solid rgba(225,82,82,0.35); }
    .ds-callout-success-dark { background:rgba(49,165,109,0.28);color:#F9F9F9;border:1px solid rgba(49,165,109,0.35); }
    .ds-callout-warning-dark { background:rgba(217,139,29,0.28);color:#F9F9F9;border:1px solid rgba(217,139,29,0.35); }
    .ds-badge { display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;letter-spacing:0.03em; }
    .ds-badge.success  { background:rgba(49,165,109,0.14);color:#31A56D; }
    .ds-badge.warning  { background:rgba(217,139,29,0.14);color:#D98B1D; }
    .ds-badge.danger   { background:rgba(209,35,41,0.14);color:#D12329; }
    .ds-badge.info     { background:rgba(99,96,216,0.14);color:#8F8DDE; }
    .ds-badge.neutral  { background:rgba(255,255,255,0.07);color:var(--shell-text-muted); }
    .ds-badge.caution  { background:rgba(205,185,0,0.14);color:#CDB900; }
    html.theme-light .ds-badge.neutral { background:#F0F0F0;color:#6E6E6E; }
    .ds-badge.dot::before { content:'';width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0; }
    .ds-table-wrap { width:100%;overflow-x:auto; }
    .ds-table { width:100%;border-collapse:collapse;font-size:13px; }
    .ds-th,.ds-table th { padding:8px 16px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--shell-text-muted);background:var(--table-th-bg);border-bottom:1px solid var(--shell-border);white-space:nowrap; }
    .ds-td,.ds-table td { padding:12px 16px;border-bottom:1px solid var(--table-border);color:var(--shell-text-2);vertical-align:middle; }
    .ds-table tbody tr:last-child td { border-bottom:none; }
    .ds-table tbody tr:hover td { background:var(--shell-hover); }
    .col-actions { width:80px; }
    .row-actions { display:none;align-items:center;gap:4px; }
    .ds-table tbody tr:hover .row-actions { display:flex; }
    .ds-pagination { display:flex;align-items:center;gap:4px;flex-wrap:wrap; }
    .ds-page-btn { min-width:32px;height:32px;border-radius:44px;border:1px solid var(--shell-border);background:var(--card-bg);color:var(--shell-text-2);cursor:pointer;font-size:13px;font-family:inherit;padding:0 6px;display:flex;align-items:center;justify-content:center;transition:all 120ms; }
    .ds-page-btn:hover { background:var(--shell-hover);color:var(--shell-text); }
    .ds-page-btn.active { background:var(--shell-accent);color:#fff;border-color:var(--shell-accent);font-weight:600; }
    .ds-page-btn:disabled { opacity:.3;cursor:not-allowed;pointer-events:none; }
    .ds-modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.7);display:none;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(2px); }
    .ds-modal-overlay.open { display:flex; }
    .ds-modal { background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;width:100%;max-width:440px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px rgba(0,0,0,.5); }
    .ds-modal-header { display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px;border-bottom:1px solid var(--shell-border); }
    .ds-modal-title { font-size:14px;font-weight:600;color:var(--shell-text); }
    .ds-modal-close { width:28px;height:28px;border-radius:6px;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);display:flex;align-items:center;justify-content:center; }
    .ds-modal-close:hover { background:var(--shell-hover);color:var(--shell-text); }
    .ds-modal-body { padding:20px; }
    .ds-modal-footer { padding:14px 20px;border-top:1px solid var(--shell-border);display:flex;justify-content:flex-end;gap:8px; }
    .ds-filter-bar { display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
    .ds-filter-btn { display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:44px;background:#e0dff7;color:#504bb8;font-size:14px;font-weight:500;border:none;cursor:pointer;white-space:nowrap;transition:background .12s; }
    .ds-filter-btn:hover { background:#d4d2f5; }
    .ds-filter-chips { display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
    .ds-filter-chip { display:flex;align-items:center;gap:4px;background:#f4f4f5;border-radius:4px;padding:4px 8px;font-size:12px; }
    .ds-chip-key { color:#5f5f6e;font-weight:500;white-space:nowrap; }
    .ds-chip-value { background:var(--ctrl-bg);border-radius:4px;padding:3px 8px;color:var(--shell-text);white-space:nowrap; }
    .ds-chip-close { background:var(--ctrl-bg);border:1px solid var(--ctrl-border);border-radius:10px;width:18px;height:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;color:var(--shell-text-muted);line-height:1;padding:0; }
    .ds-chip-close:hover { color:var(--shell-text); }
    .ds-icon-btn { display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;border:none;background:transparent;color:var(--shell-text-muted);cursor:pointer;transition:background .12s,color .12s;flex-shrink:0; }
    .ds-icon-btn:hover { background:var(--shell-hover);color:var(--shell-text); }
    .ds-tabs-list { display:flex;border-bottom:1px solid var(--shell-border); }
    .ds-tab { padding:8px 16px;font-size:13px;font-weight:500;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);border-bottom:2px solid transparent;margin-bottom:-1px;font-family:inherit;transition:color 150ms,border-color 150ms;white-space:nowrap; }
    .ds-tab:hover { color:var(--shell-text); }
    .ds-tab.active { color:var(--shell-accent);border-bottom-color:var(--shell-accent);font-weight:600; }
    .ds-tab-panel { display:none;padding:20px; }
    .ds-tab-panel.active { display:block; }
    .ds-panel-overlay { display:none;position:fixed;inset:0;background:rgba(0,0,0,.32);z-index:300; }
    .ds-panel-overlay.open { display:block; }
    .ds-panel { position:fixed;top:0;right:0;bottom:0;width:360px;background:var(--card-bg);border-left:1px solid var(--card-border);border-radius:4px 0 0 4px;display:flex;flex-direction:column;z-index:301;transform:translateX(100%);transition:transform .25s ease; }
    .ds-panel.open { transform:translateX(0); }
    .ds-panel-header { display:flex;align-items:center;gap:8px;padding:14px 16px 13px;flex-shrink:0;border-bottom:1px solid var(--card-border); }
    .ds-panel-title { flex:1;font-size:14px;font-weight:600;color:var(--shell-text); }
    .ds-panel-body { flex:1;overflow-y:auto;padding:16px; }
    .ds-panel-footer { border-top:1px solid var(--card-border);padding:14px 16px;display:flex;gap:8px;flex-shrink:0; }
    .nav-lbl { white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px; }
    #shell-nav { transition:width 0.22s ease,padding 0.22s ease; }
    #shell-nav.nav-collapsed { width:52px !important;padding:16px 8px !important;overflow:hidden; }
    #shell-nav.nav-collapsed .nav-hdr-info { display:none; }
    #shell-nav.nav-collapsed .nav-hdr { flex-direction:column;align-items:center;border-bottom:none !important;padding-bottom:4px;margin-bottom:0; }
    #shell-nav.nav-collapsed .nav-row { justify-content:center; }
    #shell-nav.nav-collapsed .nav-lbl { display:none; }
    #shell-nav.nav-collapsed .nav-chev { display:none; }
    #shell-nav.nav-collapsed .nav-sub { display:none; }
    #shell-nav.nav-collapsed .nav-sub.nav-active { display:flex;justify-content:center;padding:8px !important;background:rgba(99,96,216,0.08);border-radius:6px; }
    #shell-nav.nav-collapsed .nav-sub.nav-active .nav-lbl { display:none; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover { width:220px !important;padding:16px !important; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-hdr-info { display:block; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-hdr { flex-direction:row;align-items:flex-start;border-bottom:1px solid #467fcd !important;padding-bottom:8px;margin-bottom:12px; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-row { justify-content:space-between; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-lbl { display:flex; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-chev { display:block; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub { display:flex; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub.nav-active { padding:8px 8px 8px 30px !important; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub.nav-active .nav-lbl { display:flex; }
    .nav-row { transition:background .12s,color .12s; }
    .nav-row:hover { background:#f5f5f5 !important; }
    .nav-row:hover .nav-lbl { color:#101010 !important; }
    .nav-row:hover svg { stroke:#101010 !important; }
    .nav-sub { transition:background .12s,color .12s; }
    .nav-sub:hover { background:#f5f5f5 !important; }
    .nav-sub:hover .nav-lbl { color:#6360d8 !important; }
    html:not(.theme-light) .nav-row:hover { background:rgba(255,255,255,0.06) !important; }
    html:not(.theme-light) .nav-row:hover .nav-lbl { color:#F9F9F9 !important; }
    html:not(.theme-light) .nav-sub:hover { background:rgba(255,255,255,0.06) !important; }
    html:not(.theme-light) .nav-sub:hover .nav-lbl { color:#8F8DDE !important; }
    .ds-toast-container { position:fixed;bottom:24px;right:24px;z-index:500;display:flex;flex-direction:column;gap:8px;align-items:flex-end; }
    .ds-toast { display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:8px;font-size:13px;min-width:280px;max-width:400px;box-shadow:0 4px 16px rgba(0,0,0,.18);animation:ds-toast-in .2s ease; }
    @keyframes ds-toast-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
    .ds-toast.success { background:#EFF7ED;color:#1A7D4D;border:1px solid rgba(49,165,109,0.3); }
    .ds-toast.error   { background:#F9EEEE;color:#D12329;border:1px solid rgba(209,35,41,0.3); }
    .ds-toast.warning { background:#F7F6EB;color:#D98B1D;border:1px solid rgba(217,139,29,0.3); }
    .ds-toast.info    { background:rgba(99,96,216,0.08);color:#8F8DDE;border:1px solid rgba(99,96,216,0.2); }
    .ds-toast-dismiss { margin-left:auto;background:none;border:none;cursor:pointer;color:inherit;opacity:0.6;font-size:16px;line-height:1;padding:0 2px; }
    .ds-toast-dismiss:hover { opacity:1; }
  </style>
</head>
<body>

  <!-- TOPBAR — always #131313, never changes with theme -->
  <div style="height:52px;background:#131313;border-bottom:1px solid #272727;display:flex;align-items:center;padding:0 16px;gap:12px;flex-shrink:0;z-index:100;">
    <img src="https://anthu211.github.io/design-system-2.0/icons/pai-logo.svg" style="height:26px;" alt="Prevalent AI">
    <span style="flex:1;"></span>
    <span style="font-size:12px;color:#9ca3af;">Last Updated: 2h ago</span>
    <button style="background:none;border:none;color:#9ca3af;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;" aria-label="Notifications">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    </button>
    <div style="width:32px;height:32px;border-radius:50%;background:#6360D8;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;flex-shrink:0;">A</div>
    <button class="ds-btn sz-sm t-special"><span class="btn-text">Navigator</span></button>
  </div>

  <!-- SHELL: sidebar + content -->
  <div style="display:flex;flex:1;overflow:hidden;">

    <!-- LEFT NAV — collapsible to 52px icon rail -->
    <nav id="shell-nav" style="width:220px;background:#fff;border-right:0.5px solid #d8d9dd;overflow-y:auto;flex-shrink:0;display:flex;flex-direction:column;padding:16px;gap:0;">
      <div class="nav-hdr" style="display:flex;align-items:flex-start;justify-content:space-between;padding:0 8px 8px 12px;border-bottom:1px solid #467fcd;margin-bottom:12px;flex-shrink:0;">
        <div class="nav-hdr-info">
          <div style="display:flex;align-items:center;gap:4px;font-size:14px;font-weight:500;color:#101010;">
            EM Dashboard
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style="font-size:12px;color:#6e6e6e;margin-top:2px;">Exposure Management</div>
        </div>
        <button id="shell-nav-btn" onclick="shellNavToggle()" style="background:none;border:none;color:#6e6e6e;padding:0;display:flex;align-items:center;cursor:pointer;" title="Collapse sidebar">
          <svg id="shell-nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 8 11 12 15 16"/></svg>
        </button>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;flex:1;">
        <!-- REPLACE these nav items with real items for the page -->
        <div class="nav-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;cursor:pointer;color:#6e6e6e;">
          <div style="display:flex;align-items:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            <span class="nav-lbl" style="font-size:14px;font-weight:400;">Dashboard</span>
          </div>
          <svg class="nav-chev" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div>
          <div class="nav-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;background:#f5f5f5;cursor:pointer;color:#6e6e6e;">
            <div style="display:flex;align-items:center;gap:8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span class="nav-lbl" style="font-size:14px;font-weight:400;">Section Name</span>
            </div>
            <svg class="nav-chev" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
          </div>
          <a href="#" class="nav-sub nav-active" style="display:flex;align-items:center;gap:4px;padding:8px 8px 8px 30px;text-decoration:none;background:rgba(99,96,216,0.08);border-radius:6px;color:#6360d8;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="9" height="9" rx="1"/><rect x="13" y="3" width="9" height="9" rx="1"/><rect x="2" y="14" width="9" height="9" rx="1"/></svg>
            <span class="nav-lbl" style="font-size:14px;font-weight:400;">Active Page</span>
          </a>
          <a href="#" class="nav-sub" style="display:flex;align-items:center;gap:4px;padding:8px 8px 8px 30px;text-decoration:none;color:#6e6e6e;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
            <span class="nav-lbl" style="font-size:14px;font-weight:400;">Other Page</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- CONTENT AREA -->
    <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">

      <!-- Sticky sub-header -->
      <div style="position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e6e6e6;border-radius:0 0 8px 8px;padding:12px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <div style="min-width:0;">
          <div style="font-size:12px;font-weight:500;color:#101010;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Page Title</div>
          <div style="font-size:11px;color:#9ca3af;display:flex;align-items:center;gap:4px;white-space:nowrap;">
            <span>Dashboard</span><span>›</span><span>Section</span><span>›</span>
            <span style="color:#6360D8;">Current Page</span>
          </div>
        </div>
        <button style="background:none;border:1px solid #e6e6e6;border-radius:44px;color:#6e6e6e;font-size:12px;padding:8px 14px;display:flex;align-items:center;gap:6px;white-space:nowrap;flex-shrink:0;">
          Explore in <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <span style="flex:1;"></span>
        <button style="width:32px;height:32px;border-radius:50%;background:#6360D8;border:none;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <div style="position:relative;flex-shrink:0;"
             onmouseenter="this.querySelector('.af-pop').style.display='block'"
             onmouseleave="this.querySelector('.af-pop').style.display='none'">
          <button style="background:none;border:1px solid #504bb8;border-radius:44px;color:#504bb8;font-size:12px;font-weight:500;padding:8px 14px;display:flex;align-items:center;gap:6px;white-space:nowrap;">
            Active Filters
            <span style="background:#504bb8;color:#fff;font-size:10px;font-weight:600;min-width:16px;height:16px;border-radius:44px;display:flex;align-items:center;justify-content:center;padding:0 4px;">3</span>
          </button>
          <div class="af-pop" style="display:none;position:absolute;top:calc(100% + 8px);left:0;z-index:250;background:#fff;border:1px solid #e6e6e6;border-radius:8px;padding:14px;min-width:300px;box-shadow:0 8px 28px rgba(0,0,0,0.14);">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#6e6e6e;margin-bottom:10px;">Active Filters</div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div style="display:inline-flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px;border:1px solid #e6e6e6;">
                <span style="color:#6e6e6e;font-weight:500;">Severity</span>
                <span style="background:#fff;border-radius:4px;padding:1px 6px;color:#101010;">Critical</span>
                <button onclick="event.stopPropagation();this.closest('div[style]').remove()" style="background:none;border:none;cursor:pointer;color:#9ca3af;font-size:13px;padding:0 2px;line-height:1;">×</button>
              </div>
              <div style="display:inline-flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px;border:1px solid #e6e6e6;">
                <span style="color:#6e6e6e;font-weight:500;">Status</span>
                <span style="background:#fff;border-radius:4px;padding:1px 6px;color:#101010;">Open</span>
                <button onclick="event.stopPropagation();this.closest('div[style]').remove()" style="background:none;border:none;cursor:pointer;color:#9ca3af;font-size:13px;padding:0 2px;line-height:1;">×</button>
              </div>
            </div>
            <button style="margin-top:10px;background:none;border:none;font-size:12px;font-weight:500;color:#6360D8;cursor:pointer;padding:0;font-family:inherit;">Clear all filters</button>
          </div>
        </div>
        <div style="width:1px;height:20px;background:#e6e6e6;flex-shrink:0;"></div>
        <button style="background:#e0dff7;border:none;border-radius:44px;color:#504bb8;font-size:12px;font-weight:500;padding:8px 14px;flex-shrink:0;">Filter</button>
      </div>

      <!-- Main content body -->
      <div style="flex:1;padding:24px;background:#F7F9FC;">
        <!-- Page content goes here -->
      </div>

    </div>
  </div>

  <div class="ds-toast-container" id="toast-container"></div>

  <script>
    function shellNavToggle() {
      var nav = document.getElementById('shell-nav');
      var icon = document.getElementById('shell-nav-icon');
      var btn = document.getElementById('shell-nav-btn');
      if (!nav) return;
      var collapsed = nav.classList.toggle('nav-collapsed');
      if (collapsed) {
        nav.classList.add('click-collapsed');
        nav.addEventListener('mouseleave', function onLeave() {
          nav.classList.remove('click-collapsed');
          nav.removeEventListener('mouseleave', onLeave);
        });
      }
      if (icon) icon.innerHTML = collapsed
        ? '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="11 8 15 12 11 16"/>'
        : '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 8 11 12 15 16"/>';
      if (btn) btn.title = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    }
    function showToast(type, msg, duration) {
      var c = document.getElementById('toast-container'); if (!c) return;
      var t = document.createElement('div'); t.className = 'ds-toast ' + type;
      t.innerHTML = '<span>' + msg + '</span><button class="ds-toast-dismiss" onclick="this.parentElement.remove()">×</button>';
      c.appendChild(t);
      if (type === 'success' || type === 'info') setTimeout(function(){ if(t.parentElement) t.remove(); }, duration || 3000);
    }
  </script>
  <svg width="0" height="0" style="position:absolute;overflow:hidden;pointer-events:none;">
    <defs>
      <linearGradient id="t-special-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#467fcd"/>
        <stop offset="100%" stop-color="#47adcb"/>
      </linearGradient>
    </defs>
  </svg>
</body>
</html>
```
