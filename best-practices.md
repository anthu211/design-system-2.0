# Prevalent AI — Best Practices & Error Handling Spec

This file is the authoritative reference for per-component dos/don'ts and all error handling patterns. It is used by Claude Code slash commands to generate compliant UI. Derived from the design system spec, UX context, and Figma designs.

---

## Quick Reference

| Rule | Value |
|------|-------|
| Button border-radius (CTA/text) | `44px` — pill shape, always |
| Button border-radius (icon-only) | `50%` — circle |
| Card / container border-radius | `4px` |
| Modal border-radius | `12px` |
| Input border-radius | `8px` |
| Accent colour | `#6360D8` |
| Filter/active filter CTA | `#504bb8` |
| Destructive action colour | `#dc2626` |
| Topbar background | `#131313` — never changes |
| Spacing scale | 4, 8, 12, 16, 20, 24, 32, 48px only |
| Font | Inter (Google Fonts) — no substitutions |
| Max KPI cards in a row | 5 (Miller's Law) |
| Max table columns visible | 7 (opt-in for more via "Add Column") |
| Max chart series | 6–7 |
| Toast auto-dismiss (success/info) | 3 seconds |
| Toast persist (error/warning) | Until manually dismissed |

---

## 1. Buttons

### ✅ Do
- **All CTA and text buttons**: `border-radius: 44px` (pill). No exceptions.
- **Icon-only buttons**: `border-radius: 50%` (circle). Add `title` attribute for accessibility.
- **Button hierarchy**: Max 1 primary button per view. Secondary = outline. Tertiary = ghost.
- **Destructive primary**: `background: #dc2626` — never use purple for destructive.
- **Disabled state**: `opacity: 0.4; cursor: not-allowed` — always visible, never `display: none`.
- **Loading state**: Replace label with spinner + "Loading…" text. Keep button disabled.

### ❌ Don't
- `border-radius: 6px` or `8px` on buttons — always 44px.
- Two primary buttons in the same view — creates visual ambiguity.
- Hide disabled buttons — always keep them visible at reduced opacity.
- Use purple (`#6360D8`) for destructive confirmations — use red (`#dc2626`).
- Icon-only buttons without a `title` attribute — accessibility violation.

### HTML Pattern
```html
<!-- Primary CTA -->
<button class="ds-btn t-primary sz-md">Save Changes</button>

<!-- Destructive CTA -->
<button class="ds-btn t-primary sz-md" style="background:#dc2626;">Delete Vendor</button>

<!-- Outline (secondary) -->
<button class="ds-btn t-outline sz-md">Cancel</button>

<!-- Ghost (tertiary) -->
<button class="ds-btn t-ghost sz-md">Learn more</button>

<!-- Icon-only -->
<button class="ds-icon-btn" title="Filter results">
  <svg ...></svg>
</button>
```

---

## 2. KPI Cards

### ✅ Do
- Max **5 KPI cards** in a single row (Miller's Law — cognitive chunk limit).
- Always include a **trend indicator**: arrow + delta value, or "No change".
- The **metric value** is the most visually dominant element on the card.
- Status-linked values use semantic colour: critical = `#dc2626`, high = `#f97316`, etc.
- Card `border-radius: 4px`.

### ❌ Don't
- 6+ KPI cards in one row — overwhelms and violates Miller's Law.
- Omit trend data — analysts need directional context to act.
- Use `border-radius: 8px` on KPI cards — always 4px.
- Show all values in black regardless of severity — colour carries meaning.

### HTML Pattern
```html
<div class="ds-kpi-row">
  <div class="ds-kpi-card">
    <div>
      <div class="ds-kpi-value" style="color:#D12329;">247</div>
      <div class="ds-kpi-label">Critical Findings</div>
    </div>
    <div class="ds-kpi-trend">
      <span class="ds-kpi-delta up-bad">↑ 12</span>
      <span class="ds-kpi-period">this week</span>
    </div>
  </div>
  <div class="ds-kpi-card">
    <div>
      <div class="ds-kpi-value">8.4</div>
      <div class="ds-kpi-label">Risk Score</div>
    </div>
    <div class="ds-kpi-trend">
      <span class="ds-kpi-delta down-good">↓ 0.3</span>
      <span class="ds-kpi-period">vs last month</span>
    </div>
  </div>
</div>
```

---

## 3. Badges & Status

### ✅ Do
- Status badges are **always visible inline** in table rows — never tooltip-only.
- CSS class pattern: `<span class="ds-badge [variant]">Label</span>`
- Variant → class mapping:
  - Critical → `danger` (red: `#D12329`)
  - High → `warning` (orange: `#D98B1D`)
  - Medium → `caution` (amber: `#CDB900`)
  - Low / Active / Healthy → `success` (green: `#31A56D`)
  - Info / Open → `info` (purple: `#8F8DDE`)
  - Resolved / Inactive / Neutral → `neutral` (grey)
  - Add `.dot` modifier for status with indicator dot: `ds-badge success dot`
- `border-radius: 4px` on all badges.
- Font: 11px, weight 600.

### ❌ Don't
- Uniform grey for all severity levels — colour is the primary signal.
- Status in tooltip only — violates accessibility and Fitts's Law.
- `border-radius: 12px` (pill) on badges — always 4px.
- More than 2 words in a badge label.

---

## 4. Tables

### ✅ Do
- Use **tables** (not cards) for all list-type operational data.
- Max **7 columns** visible by default. Extras opt-in via "Add Column" control.
- Severity/status badge **always visible inline** in its dedicated column.
- Row actions use **ghost buttons**, right-aligned or in an action column.
- Always include **pagination controls** and a row-count selector (5/10/25/50/100).
- Table header row remains visible even during empty or error states.
- Clicking a column header sorts the table; show a sort indicator arrow.

### ❌ Don't
- Cards for operational list data — reduces information density for power users.
- Status or severity visible only on hover or in a tooltip.
- More than 7 columns without an opt-in "Add Column" mechanism.
- Omit pagination — never let a table be "infinitely long".
- Primary buttons as row actions — use ghost buttons only.

### Empty State (inside table body)
See [Pattern 3: Table Empty State](#pattern-3--table-empty-state-no-data) in Error Handling section below.

---

## 5. Charts

### ✅ Do
- Legend is always **centred** below the chart: `justify-content: center`.
- Legend markers: `border-radius: 50%`, size 8×8px (circle dots).
- Always include a **chart title** and **axis labels**.
- Max **6–7 data series** per chart (Miller's Law).
- Hover tooltips show exact values.
- Severity colours match badge semantics exactly.

### ❌ Don't
- Left-align the legend.
- Rectangular dash markers — use circle dots.
- 8+ series in one chart — split or group.
- Omit chart title or axis labels.
- Charts with no hover tooltips.

### Available Chart Functions
```javascript
buildLineChart(containerId, series, labels)
buildMultiLineChart(containerId, series, labels)
buildVerticalBarChart(containerId, data, labels)
buildDonutChart(containerId, data, labels)
buildStackedBarChart(containerId, rows, xLabel)
```

---

## 6. Modals & Confirmations

### ✅ Do
- Modal `border-radius: 12px`.
- Title identifies the specific item: "Delete Vendor: Acme Corp" (not just "Delete").
- Body states the consequence AND irreversibility.
- **Destructive confirm** uses `background: #dc2626` (red).
- Cancel button is always present and visually quieter (outline or ghost).
- Clicking the overlay closes the modal (cancel semantics).
- All buttons inside modals still use `border-radius: 44px` (pill).

### ❌ Don't
- Vague "Are you sure?" — name the item and the consequence.
- Purple accent for destructive confirm.
- Label the action "OK" — use a specific verb ("Delete Vendor", "Revoke Access").
- Omit a Cancel path.
- `border-radius: 4px` or `6px` on the modal card — always 12px.

### HTML Pattern — Destructive Modal
```html
<div class="ds-modal-overlay" id="confirm-overlay"></div>
<div class="ds-modal" id="confirm-modal" role="dialog" aria-modal="true">
  <div class="ds-modal-header">
    <span class="ds-modal-title">Delete Vendor: Acme Corp</span>
    <button class="ds-icon-btn" onclick="closeModal('confirm-modal')" title="Close">×</button>
  </div>
  <div class="ds-modal-body">
    <p>This will permanently delete <strong>Acme Corp</strong> and all associated findings. This action cannot be undone.</p>
  </div>
  <div class="ds-modal-footer">
    <button class="ds-btn t-outline sz-md" onclick="closeModal('confirm-modal')">Cancel</button>
    <button class="ds-btn t-primary sz-md" style="background:#dc2626;" onclick="deleteVendor()">Delete Vendor</button>
  </div>
</div>
```

---

## 7. Form Controls

### ✅ Do
- Input `border-radius: 8px`.
- Error state: **red border (1.5px, `#dc2626`) + ⓘ icon + message text** below the field.
- Required fields: asterisk `*` in red after the label text.
- Labels **always visible** above the field — never placeholder-only.
- Validate on **blur**, not on every keystroke.
- On submit: scroll to and focus the first invalid field.
- Keep the user's entered value — never clear on error.

### ❌ Don't
- Red border without an error message — no actionable information.
- `border-radius: 4px` on inputs — always 8px.
- Placeholder text as the only label — disappears on focus.
- Validate on every keystroke — disruptive to users.
- Vague error messages ("Invalid" or "Error") — always specify what to fix.
- Clear the field value on error.

### HTML Pattern — Error State
```html
<div>
  <label style="display:block;font-size:12px;font-weight:500;margin-bottom:4px;">
    API Key <span style="color:#dc2626;">*</span>
  </label>
  <input class="ds-input-field" style="border-color:#dc2626;border-width:1.5px;" value="" placeholder="sk-…">
  <div style="display:flex;align-items:center;gap:4px;margin-top:4px;">
    <!-- error icon -->
    <svg width="11" height="11" ...></svg>
    <span style="font-size:11px;color:#dc2626;">API key is required</span>
  </div>
</div>
```

---

## 8. Callouts & Toasts

### ✅ Do
**Callouts** (persistent, in-page):
- `border-radius: 4px`, `gap: 8px`.
- Always: icon + meaningful message text.
- Link recovery action inline when possible.
- Class pattern: `<div class="ds-callout ds-callout-[variant]">` — variants: `ds-callout-warning`, `ds-callout-error`, `ds-callout-success`, `ds-callout-info` (light); `ds-callout-warning-dark`, `ds-callout-error-dark`, `ds-callout-success-dark` (dark theme).

**Toasts** (transient feedback):
- Success/Info: auto-dismiss after 3 seconds.
- Error/Warning: persist until manually dismissed.
- Always include a ✕ close button.
- Max 3 stacked at once — queue additional.
- Position: always bottom-right of viewport.

### ❌ Don't
- Left-border-only callout style — use `.ds-callout`.
- Vague messages ("Warning!" / "Something went wrong.") — always explain what and what to do.
- `border-radius: 8px` on callouts — always 4px.
- Toast for critical errors needing decisions — use a modal.
- Auto-dismiss error toasts.
- More than 3 simultaneous toasts.

---

## 9. Navigation

### ✅ Do
- Nav sections **collapsed by default** (Hick's Law — reduce visible choices).
- Active item: `background: #6360D8`, white text, `border-radius: 4px`.
- Section labels: 9–10px, uppercase, letter-spaced, muted, not interactive.
- Topbar text is always **"Prevalent AI"** — never customised or localised.
- Topbar icon buttons: `border-radius: 50%` (circle).
- Nav item icons: 14×14px, `stroke-width: 2`.
- Collapsed nav items show just icon + label on one line.

### ❌ Don't
- Expand all nav sections by default — violates Hick's Law.
- Left-border as active indicator — use background fill.
- Show all items flat without section grouping.
- Customise "Prevalent AI" or "Exposure Management" topbar text.
- Nav item icons larger than 16×16 or smaller than 12×12.

---

## 10. Spacing & Typography

### ✅ Do
- **Spacing scale (px only)**: 4, 8, 12, 16, 20, 24, 32, 48
- **Font**: Inter, loaded via Google Fonts. Always use `font-family: 'Inter', sans-serif`.
- **Type ramp**:
  - Page heading: 18px / 700
  - heading-md (card/modal titles): 14px / 600
  - body-md (body text): 12px / 400, line-height 1.5
  - body-sm / meta: 11px / 400
  - Label / badge: 11px / 500–600
- **Line-height**: 1.5 for body; 1.2 for headings.

### ❌ Don't
- Off-scale values: 3, 5, 6, 7, 10, 11, 13, 15px.
- Any font other than Inter.
- Font sizes outside the type ramp.
- Mix rem and px — use px throughout.

---

## 11. Error Handling Patterns

### Pattern 1 — Full-Page System Error

**When to use**: The entire page cannot render (server 500, auth failure, network down).

**Visual treatment**:
- Large "ERROR" watermark: `font-size: 90px+`, `font-weight: 800`, `opacity: 0.08`, `color: #a3a5af`, centred behind content
- 🚧 construction emoji: 40px, centred
- Heading: "Oops! That Wasn't Supposed to Happen" — friendly, non-technical, 18px SemiBold, `#101010`
- Subtext: "Well, this is awkward.. Something broke on our end. We're fixing it ASAP!" — 12px, `#a3a5af`
- Refresh button: `background: #6360d8`, `border-radius: 4px`, `height: 32px`, `padding: 6px 16px`
- Standard shell (topbar + nav) remains fully visible

**Rules**:
- ✅ Keep topbar and nav visible — users need an escape route
- ✅ Refresh button always present — retrying is the primary recovery action
- ❌ Never expose stack traces, HTTP codes, or error IDs
- ❌ Never use "500 Internal Server Error" as the heading
- ❌ Never remove the navigation shell
- ❌ Never use 🚦 (traffic light) here — that's for empty states only
- ❌ Never auto-redirect without first showing this state

```html
<div class="page-error-wrap" style="position:relative;display:flex;align-items:center;justify-content:center;min-height:400px;">
  <!-- Watermark -->
  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:90px;font-weight:800;letter-spacing:14px;color:#a3a5af;opacity:0.08;pointer-events:none;overflow:hidden;">ERROR</div>
  <!-- Content -->
  <div style="text-align:center;position:relative;z-index:1;">
    <div style="font-size:40px;margin-bottom:12px;">🚧</div>
    <h2 style="font-size:18px;font-weight:600;color:#101010;margin:0 0 8px;">Oops! That Wasn't Supposed to Happen</h2>
    <p style="font-size:12px;color:#a3a5af;margin:0 0 20px;">Well, this is awkward.. Something broke on our end. We're fixing it ASAP!</p>
    <button onclick="location.reload()" style="background:#6360d8;border:none;color:#fff;font-size:12px;font-weight:500;padding:6px 16px;border-radius:4px;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
      Refresh
    </button>
  </div>
</div>
```

---

### Pattern 2 — Section / Data Retrieval Error

**When to use**: One widget or section fails to load data. The rest of the page works normally.

**Visual treatment**:
- No watermark — contained failure, lower visual weight
- 🚧 emoji: 30px
- Heading: "Data Retrieval Failed" (or "[Widget Name] Unavailable")
- Subtext: "We're having trouble loading this data. Try refreshing or check back later."
- Refresh button: same style as Pattern 1

**Rules**:
- ✅ No "ERROR" watermark — this is section-scoped
- ✅ Include a Refresh button — section data is independently retryable
- ✅ All other page sections remain functional
- ❌ Never redirect the entire page for a section failure
- ❌ Never collapse or hide the widget container
- ❌ Never omit the Refresh button for section errors

```html
<div style="display:flex;align-items:center;justify-content:center;flex-direction:column;min-height:200px;gap:8px;text-align:center;padding:24px;">
  <div style="font-size:30px;">🚧</div>
  <div style="font-size:14px;font-weight:600;color:var(--shell-text);">Data Retrieval Failed</div>
  <div style="font-size:12px;color:var(--shell-text-muted);">We're having trouble loading this data. Try refreshing or check back later.</div>
  <button onclick="retryLoad()" style="margin-top:8px;background:#6360d8;border:none;color:#fff;font-size:11px;font-weight:500;padding:5px 14px;border-radius:4px;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:5px;">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
    Refresh
  </button>
</div>
```

---

### Pattern 3 — Table Empty State (No Data)

**When to use**: A query returns 0 rows. This is a user-driven state (filters too restrictive, data not yet ingested). Not a system error.

**Visual treatment**:
- 🚦 traffic light emoji: 28px — signals "wait, not broken"
- Heading: "No Data… For Now!"
- Subtext: "Try adjusting your filters or check back later."
- No Refresh button — user action is needed, not a system retry

**Rules**:
- ✅ 🚦 (not 🚧) — distinct from system error emoji
- ✅ Friendly, reassuring copy — not alarming
- ✅ Table header row and pagination remain visible
- ❌ Never show "No records found." without actionable guidance
- ❌ Never use 🚧 here — that's for system errors
- ❌ Never show a Refresh button for filter-driven empty state
- ❌ Never hide the table header row

```html
<tr>
  <td colspan="[n-columns]">
    <div style="display:flex;align-items:center;justify-content:center;flex-direction:column;padding:48px 24px;gap:8px;text-align:center;">
      <div style="font-size:28px;">🚦</div>
      <div style="font-size:14px;font-weight:600;color:var(--shell-text);">No Data… For Now!</div>
      <div style="font-size:12px;color:var(--shell-text-muted);">Try adjusting your filters or check back later.</div>
    </div>
  </td>
</tr>
```

---

### Pattern 4 — Inline Field Validation Error

**When to use**: A form field fails validation on blur or on form submit.

**Visual treatment**:
- Input: `border: 1.5px solid #dc2626`
- Below input: ⓘ icon (11px, `#dc2626`) + specific error message text (11px, `#dc2626`)
- Label and field value remain visible

**Rules**:
- ✅ Always pair red border with a text message
- ✅ Message is specific: "Must be between 0 and 10", not "Invalid"
- ✅ Validate on blur only (not on every keystroke)
- ✅ On submit: scroll to and focus first invalid field
- ✅ Preserve user's entered value
- ❌ Never red border alone
- ❌ Never clear the field value on error
- ❌ Never use vague messages ("Error", "Invalid input")

```html
<div>
  <label>API Key <span style="color:#dc2626;">*</span></label>
  <input class="ds-input-field" style="border-color:#dc2626;border-width:1.5px;" value="…">
  <div style="display:flex;align-items:center;gap:4px;margin-top:4px;">
    <!-- ⓘ icon SVG here -->
    <span style="font-size:11px;color:#dc2626;">API key is required</span>
  </div>
</div>
```

---

### Pattern 5 — Toast Notifications

**When to use**: Transient feedback after user actions (saved, deleted, exported, synced). Not for errors requiring decisions.

**Class pattern**: `<div class="ds-toast [variant]">` — variants: `success`, `error`, `warning`, `info` (no `t-` prefix). Close button uses class `ds-toast-dismiss`, not `ds-toast-close`.

**Rules**:
- ✅ Success / Info: auto-dismiss after 3 seconds
- ✅ Error / Warning: persist until manually dismissed
- ✅ Position: bottom-right of viewport
- ✅ Max 3 stacked; queue additional
- ✅ Always include a ✕ close button
- ✅ Message is specific: "1,240 records imported", not "Done"
- ❌ Never use toast for errors requiring a decision — use modal
- ❌ Never auto-dismiss error toasts
- ❌ Never stack more than 3

```javascript
// Trigger a toast
showToast('success', 'Integration synced — 1,240 records imported.');
showToast('error', 'Export failed. Check your permissions and try again.');
showToast('warning', 'Session expires in 5 minutes. Save your work.');
```

---

## Summary Decision Tree

```
User sees an error/empty state →

Is the entire page broken?
  YES → Pattern 1: Full-Page System Error (watermark + 🚧 + Refresh)

Is only one section/widget broken?
  YES → Pattern 2: Section Error (🚧 + "Data Retrieval Failed" + Refresh)

Did a query return 0 results?
  YES → Pattern 3: Table Empty State (🚦 + "No Data… For Now!" — no Refresh)

Did a form field fail validation?
  YES → Pattern 4: Inline Field Error (red border + icon + message)

Was a user action completed (save/delete/export)?
  YES → Pattern 5: Toast (auto-dismiss for success; persists for error)

Does the error require a decision before proceeding?
  YES → Use a Modal with a specific destructive confirm (red button, item name in title)
```
