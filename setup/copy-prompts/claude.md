# Prevalent AI Design System — Claude Prompt

Paste at the start of any Claude.ai conversation before describing what to build.

---

```
You are building UI for Prevalent AI — a cybersecurity risk & exposure management platform. Follow every rule below exactly.

---

## TOKENS

Font: Inter. Base: 12px. Theme: <html class="theme-light"> by default.
Topbar: always background:#131313 — never changes.
Accent: #6360D8. Destructive: #dc2626.

Light theme CSS variables:
--shell-bg:#F7F9FC  --shell-border:#E6E6E6  --shell-text:#101010  --shell-text-2:#282828
--shell-text-muted:#6E6E6E  --shell-accent:#6360D8  --shell-hover:rgba(0,0,0,0.04)
--shell-raised:#F5F5F5  --shell-elevated:#EBEBEB  --ctrl-bg:#FFFFFF  --ctrl-border:#CFCFCF
--card-bg:#FFFFFF  --card-border:#E6E6E6  --table-th-bg:#F5F5F5  --table-border:#E6E6E6

Dark theme CSS variables:
--shell-bg:#0E0E0E  --shell-border:#272727  --shell-text:#F9F9F9  --shell-text-2:#D1D1D1
--shell-text-muted:#696969  --shell-raised:#1a1a1a  --shell-elevated:#1F1F1F
--ctrl-bg:#1a1a1a  --ctrl-border:#3B3A3A  --card-bg:#131313  --card-border:#272727

Border radius: Buttons & badges/tags: 44px (pill) · Cards/tables/panels: 4px · Inputs: 8px · Modals: 12px
Spacing (4pt grid only): 4, 8, 12, 16, 20, 24, 32, 48px — any other value is a bug.
Type: heading 14px/600 · body 12px/400 · meta 11px/400 · sub-header title 12px/500

---

## SHELL STRUCTURE (every page)

Topbar (52px, #131313): PAI logo <img src="https://design-system-2-0.pages.dev/icons/pai-logo.svg" style="height:26px"> → spacer → Last Updated → bell → avatar → Navigator t-special button. NEVER "Prevalent AI" text.
Left nav (220px, collapses to 52px): workspace name + subtitle. Active sub-item: color:#6360D8; background:rgba(99,96,216,0.08); border-radius:6px. Sub-items: padding-left:30px.
Sub-header (sticky): Line 1: page title div 12px/500 (NEVER <h1>). Line 2: breadcrumb 11px, last crumb color:#6360D8.
Content body: padding:24px.

---

## COMPONENTS

### Buttons
class="ds-btn" + sz-sm(24px) / sz-md(32px) / sz-lg(40px) + t-primary / t-outline / t-secondary / t-tertiary / t-danger / t-success / t-special
border-radius:44px ALWAYS. NEVER custom background/color on a button.

### Badges & Tags
<span class="ds-badge danger">Critical</span>
Variants: danger / warning / caution / info / success / neutral
border-radius:44px (pill). NEVER inline background/color. Severity MUST be visible in table column.
Severity map: critical=danger · high=warning · medium=info · low=neutral/success

### KPI Cards (ONLY if user explicitly requests them)
<div class="ds-kpi-row">
  <div class="ds-kpi-card">
    <div class="ds-kpi-value">1,284</div>       <!-- 14px/600 -->
    <div class="ds-kpi-label">Total Assets</div> <!-- 11px/500 muted -->
    <div class="ds-kpi-trend">
      <span class="ds-kpi-delta up-good">↑ 12%</span>
      <span class="ds-kpi-period">vs last month</span>
    </div>
  </div>
</div>
padding:12px 16px · gap:8px · border-radius:4px · max 5 cards · NEVER icons/colored borders/box-shadow

### Tables
Column order: [checkbox] → [data] → [status] → [actions]
.row-actions { display:flex; visibility:hidden; gap:4px; }
tr:hover .row-actions { visibility:visible; }
NEVER display:none on .row-actions. Status badge and actions in separate <td> always.

### Progress Bar
Label above. Bar + value inline to the right:
<div style="font-size:12px;color:var(--shell-text-muted);margin-bottom:6px;">Label</div>
<div style="display:flex;align-items:center;gap:10px;">
  <div class="ds-progress" style="flex:1;"><div class="ds-progress-bar" style="width:65%;"></div></div>
  <span style="font-size:12px;font-weight:600;min-width:32px;">65%</span>
</div>

### Modals (destructive actions)
<div class="ds-modal-overlay"><div class="ds-modal">
  <div class="ds-modal-header"><span class="ds-modal-title">Delete "Item Name"?</span><button class="ds-modal-close">×</button></div>
  <div class="ds-modal-body">This will permanently remove... [state consequence]</div>
  <div class="ds-modal-footer">
    <button class="ds-btn sz-md t-outline">Cancel</button>   <!-- always left -->
    <button class="ds-btn sz-md t-danger">Delete</button>    <!-- always right -->
  </div>
</div></div>

### Charts (SVG only — NEVER canvas, Chart.js, D3, ECharts)
Severity colors (RAG): critical=#D12329 · high=#D98B1D · medium=#F5B700 · low=#31A56D
Normal colors (10, non-RAG): #6760d8 #47adcb #2ea8a8 #5c6bc0 #8F8DDE #3a7fcb #7a9e7e #b87fba #c47e5a #7b95b4
Every multi-series chart needs <div class="chart-legend"> with chart-legend-dot (border-radius:50%) per series.

### Filter Bar
Filter button: background:#e0dff7; color:#504bb8; border-radius:44px
Chips: .ds-filter-chip > .ds-chip-key + .ds-chip-value + .ds-chip-close

---

## PERSONAS

ciso → trend charts + summary table · 1 dominant CTA · KPI cards ONLY if explicitly requested
grc → compliance table · control status visible · export button
security-architect → CVSSv3 scores · technical detail · asset context
security-engineer → dense CVE table · bulk toolbar · SLA column · pagination
soc-analyst → alert queue first · severity sorted · quick row actions on hover

---

## HARD RULES (violations = bugs)

NEVER:
- <canvas> or any external chart library
- Custom background/color on buttons — variant classes only
- Page-level tabs unless explicitly requested
- display:none on .row-actions — use visibility:hidden
- Action icons in the same <td> as status badge
- <h1> below sub-header or 18px title in sub-header
- Icons, colored borders, or box-shadow on KPI cards
- Off-scale spacing: 3/5/6/7/10/11/13/15px
- Border-radius other than 44px on buttons/badges, 4px on cards
- "Prevalent AI" text in topbar or nav header
- Tooltip-only severity — always visible in table column
- KPI cards unless explicitly requested
- Two primary buttons in one section
- Auto-dismiss error/warning toasts
- 🚧 in table empty states — use 🚦 only

ALWAYS:
- CSS variables only — zero hardcoded hex or px
- Confirmation modal for every destructive action — name the item + state consequence
- Pagination + row count on every table
- Severity visible in table column
- Validate forms on blur only, preserve entered value on error

---

## EMPTY & ERROR STATES

Full-page error: 🚧 · "Oops! That Wasn't Supposed to Happen" · Refresh button · keep nav visible
Section error: 🚧 · "Data Retrieval Failed" · Refresh button · no page redirect
Table empty: 🚦 · "No Data… For Now!" · NO Refresh button · keep thead + pagination
Field error: red border 1.5px #dc2626 + ⓘ icon + message below · validate on blur

---

My request: $YOUR_REQUEST_HERE

---

Do not finish until ALL of these are complete:
- Persona identified and layout applied
- CSS variables only — no hardcoded hex
- All interactive states: hover, active, focus, disabled
- Row actions use visibility:hidden / visibility:visible — never display:none
- Severity visible in table column — never tooltip-only
- Destructive actions have confirmation modal naming item + consequence
- Charts use SVG only — never canvas, Chart.js, D3, ECharts
- KPI cards included ONLY if explicitly requested
```
