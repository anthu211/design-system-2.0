# Prevalent AI — UI Components

All component patterns for Prevalent AI. Use CSS classes where they exist — they carry hover, focus, active, and disabled states that inline styles cannot. No external CSS frameworks.

Hosted at: `https://anthu211.github.io/design-system-2.0/`

---

## Required CSS Classes

Add to your page `<style>` block. Required for interactive states (hover, focus, disabled, animation).

```css
/* ── Buttons ── */
.ds-btn { display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;border-radius:24px;font-family:inherit;transition:background 150ms,color 150ms,border-color 150ms,box-shadow 150ms;white-space:nowrap;user-select:none;line-height:1;text-decoration:none; }
.ds-btn:focus-visible { outline:2px solid #6760d8;outline-offset:2px; }
.ds-btn[disabled] { cursor:not-allowed;pointer-events:none; }
.ds-btn.sz-sm { height:24px;padding:0 12px;font-size:12px;font-weight:500; }
.ds-btn.sz-md { height:32px;padding:0 12px;font-size:14px;font-weight:500; }
.ds-btn.sz-lg { height:40px;padding:0 16px;font-size:16px;font-weight:600; }
.ds-btn.t-primary { background:#6760d8;color:#f0f0fc; }
.ds-btn.t-primary:hover { background:#5754c2; }
.ds-btn.t-primary[disabled] { background:rgba(99,96,216,0.2);color:rgba(240,240,252,0.4); }
.ds-btn.t-secondary { background:rgba(99,96,216,0.15);color:#8F8DDE; }
.ds-btn.t-secondary:hover { background:rgba(99,96,216,0.22); }
html.theme-light .ds-btn.t-secondary { background:#f0f0fc;color:#6760d8; }
html.theme-light .ds-btn.t-secondary:hover { background:#e0dff7;color:#504bb8; }
.ds-btn.t-outline { background:transparent;border:1px solid var(--shell-border);color:var(--shell-text-2); }
.ds-btn.t-outline:hover { border-color:var(--shell-text-muted);background:var(--shell-hover); }
html.theme-light .ds-btn.t-outline { border-color:#c1c1c1;color:#282828; }
.ds-btn.t-tertiary { background:transparent;color:var(--shell-text-2); }
.ds-btn.t-tertiary:hover { background:var(--shell-hover); }
.ds-btn.t-special { background:transparent;border:1px solid #b1b8f5; }
.ds-btn.t-special .btn-text { background:linear-gradient(to right,#467fcd,#47adcb);-webkit-background-clip:text;background-clip:text;color:transparent; }
.ds-btn.t-special:hover { background:rgba(177,184,245,0.12); }
.ds-btn.t-danger { background:rgba(105,31,31,0.25);color:#e87c7c; }
.ds-btn.t-danger:hover { background:rgba(105,31,31,0.35); }
html.theme-light .ds-btn.t-danger { background:#feebec;color:#d12329; }
html.theme-light .ds-btn.t-danger:hover { background:#ffdbdc; }
.ds-btn.t-success { background:rgba(31,105,69,0.25);color:#4eca8b; }
.ds-btn.t-success:hover { background:rgba(31,105,69,0.35); }
html.theme-light .ds-btn.t-success { background:#e6f6eb;color:#1a7549; }
.ds-spinner { width:13px;height:13px;border-radius:50%;border:2px solid currentColor;border-top-color:transparent;animation:ds-spin .7s linear infinite;display:inline-block; }
@keyframes ds-spin { to { transform:rotate(360deg); } }

/* ── Toggle Switch ── */
.ds-toggle { position:relative;width:44px;height:24px;border-radius:99px;background:var(--shell-border);transition:background 200ms;flex-shrink:0;cursor:pointer; }
.ds-toggle.on { background:#6760d8; }
.ds-toggle .ds-toggle-thumb { position:absolute;top:50%;transform:translateY(-50%);left:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.35);transition:left 200ms;pointer-events:none; }
.ds-toggle.on .ds-toggle-thumb { left:23px; }

/* ── Dual Toggle (segmented 2-option) ── */
.ds-dual-toggle { display:inline-flex;position:relative;background:var(--shell-raised);border-radius:24px;padding:3px;user-select:none;font-family:inherit;border:1px solid var(--shell-border); }
.ds-dual-toggle .dt-indicator { position:absolute;top:3px;height:calc(100% - 6px);border-radius:24px;background:var(--shell-elevated);box-shadow:0 1px 4px rgba(0,0,0,.35);transition:left 200ms,width 200ms;pointer-events:none;z-index:0; }
.ds-dual-toggle .dt-btn { position:relative;z-index:1;border:none;background:transparent;border-radius:24px;padding:4px 16px;font-size:14px;cursor:pointer;transition:color 200ms;font-family:inherit; }
.ds-dual-toggle .dt-btn.active { color:var(--shell-text);font-weight:500; }
.ds-dual-toggle .dt-btn:not(.active) { color:var(--shell-text-muted); }
html.theme-light .ds-dual-toggle { background:#f3f3f3;border-color:#e0e0e0; }
html.theme-light .ds-dual-toggle .dt-indicator { background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.15); }

/* ── Badge / Status Tag ── */
.ds-badge { display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;letter-spacing:.03em; }
.ds-badge.success { background:rgba(49,165,109,0.14);color:#31A56D; }
.ds-badge.warning { background:rgba(217,139,29,0.14);color:#D98B1D; }
.ds-badge.danger  { background:rgba(209,35,41,0.14);color:#D12329; }
.ds-badge.info    { background:rgba(99,96,216,0.14);color:#8F8DDE; }
.ds-badge.neutral { background:rgba(255,255,255,0.07);color:var(--shell-text-muted); }
.ds-badge.caution { background:rgba(205,185,0,0.14);color:#CDB900; }
html.theme-light .ds-badge.neutral { background:#F0F0F0;color:#6E6E6E; }
.ds-badge.dot::before { content:'';width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0; }
/* Status dot (animated for active/warning/danger) */
.ds-status-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0; }
.ds-status-dot.success { background:#31A56D;box-shadow:0 0 0 3px rgba(49,165,109,0.2); }
.ds-status-dot.warning { background:#D98B1D;box-shadow:0 0 0 3px rgba(217,139,29,0.2);animation:ds-pulse 2s infinite; }
.ds-status-dot.danger  { background:#D12329;box-shadow:0 0 0 3px rgba(209,35,41,0.2);animation:ds-pulse 1.4s infinite; }
@keyframes ds-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
/* Dismissible tag */
.ds-tag { display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:4px;font-size:12px;font-weight:500;background:var(--shell-raised);color:var(--shell-text-2);border:1px solid var(--shell-border); }
.ds-tag-close { background:none;border:none;cursor:pointer;color:inherit;opacity:.6;font-size:14px;line-height:1;padding:0 0 0 2px; }
.ds-tag-close:hover { opacity:1; }
/* Count badge (use with position:relative parent) */
.ds-badge-count { position:absolute;top:-6px;right:-8px;min-width:18px;height:18px;border-radius:99px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;padding:0 4px;border:2px solid var(--card-bg); }
.ds-badge-count.danger { background:#D12329;color:#fff; }
.ds-badge-count.info   { background:#6760d8;color:#fff; }

/* ── Input Field ── */
.ds-input-wrap { display:inline-flex;flex-direction:column;gap:4px;font-family:inherit; }
.ds-input-label { font-size:13px;font-weight:500;color:var(--shell-text-2); }
.ds-input-field { display:flex;align-items:center;height:36px;border:1px solid var(--ctrl-border);border-radius:6px;background:var(--ctrl-bg);transition:border-color 150ms,box-shadow 150ms;overflow:hidden; }
.ds-input-field:focus-within { border-color:#6760d8;box-shadow:0 0 0 3px var(--ctrl-focus); }
.ds-input-field.has-error { border-color:#d12329; }
.ds-input-field.disabled { background:var(--ctrl-disabled-bg);opacity:.6; }
.ds-input-field input { flex:1;height:100%;border:none;outline:none;background:transparent;padding:0 12px;font-size:14px;font-family:inherit;color:var(--ctrl-text);min-width:0; }
.ds-input-field input::placeholder { color:var(--ctrl-placeholder); }
.ds-input-field .prefix,.ds-input-field .suffix { display:flex;align-items:center;padding:0 10px;color:var(--ctrl-placeholder);flex-shrink:0; }
.ds-input-field .prefix + input { padding-left:4px; }
.ds-input-helper { display:flex;justify-content:space-between; }
.ds-input-hint { font-size:12px;color:var(--ctrl-placeholder); }
.ds-input-hint.error { color:#d12329; }

/* ── Textarea ── */
.ds-textarea-field { border:1px solid var(--ctrl-border);border-radius:6px;background:var(--ctrl-bg);transition:border-color 150ms,box-shadow 150ms;padding:8px 12px;font-size:14px;font-family:inherit;color:var(--ctrl-text);line-height:1.5;outline:none;resize:vertical; }
.ds-textarea-field:focus { border-color:#6760d8;box-shadow:0 0 0 3px var(--ctrl-focus); }
.ds-textarea-field.has-error { border-color:#d12329; }
.ds-textarea-field::placeholder { color:var(--ctrl-placeholder); }

/* ── Dropdown (CSS-class version) ── */
.ds-dropdown { position:relative;display:inline-flex;flex-direction:column;gap:4px;font-family:inherit;min-width:180px; }
.ds-dropdown-trigger { display:flex;align-items:center;gap:6px;padding:0 12px;height:36px;border:1px solid var(--ctrl-border);border-radius:6px;background:var(--ctrl-bg);cursor:pointer;transition:border-color 150ms,box-shadow 150ms;font-size:14px;user-select:none;color:var(--ctrl-text); }
.ds-dropdown[data-open="true"] .ds-dropdown-trigger { border-color:#6760d8;box-shadow:0 0 0 3px var(--ctrl-focus); }
.ds-dropdown.has-error .ds-dropdown-trigger { border-color:#d12329; }
.ds-dropdown-trigger-text { flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.ds-dropdown-trigger-text.placeholder { color:var(--ctrl-placeholder); }
.ds-dropdown-chevron { flex-shrink:0;transition:transform 150ms;color:var(--ctrl-placeholder); }
.ds-dropdown[data-open="true"] .ds-dropdown-chevron { transform:rotate(180deg); }
.ds-dropdown-panel { position:absolute;top:calc(100% + 4px);left:0;right:0;background:var(--ctrl-bg);border:1px solid var(--ctrl-border);border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,.28);z-index:50;overflow:hidden;display:none; }
.ds-dropdown[data-open="true"] .ds-dropdown-panel { display:block; }
.ds-dropdown-options { max-height:220px;overflow-y:auto; }
.ds-dropdown-option { display:flex;align-items:center;gap:8px;padding:8px 12px;font-size:14px;cursor:pointer;transition:background 100ms;color:var(--shell-text-2); }
.ds-dropdown-option:hover { background:var(--ctrl-hover); }
.ds-dropdown-option.selected { color:var(--ctrl-selected-text);font-weight:500;background:var(--ctrl-selected-bg); }
.ds-dropdown-error { font-size:12px;color:#d12329; }

/* ── Select (native styled) ── */
.ds-select { width:100%;height:40px;border:1px solid var(--ctrl-border);border-radius:8px;background:var(--ctrl-bg);padding:0 10px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;font-size:14px;color:var(--shell-text);user-select:none;transition:border-color .15s; }
.ds-select:hover,.ds-select.open { border-color:var(--shell-accent); }

/* ── Callout / Alert Banner ── */
.ds-callout { display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:8px;font-size:13px;line-height:1.6;flex-shrink:0; }
.ds-callout svg { flex-shrink:0; }
.ds-callout-error   { background:#F9EEEE;color:#D12329;border:1px solid rgba(209,35,41,0.2); }
.ds-callout-success { background:#EFF7ED;color:#1A7D4D;border:1px solid rgba(49,165,109,0.2); }
.ds-callout-warning { background:#F7F6EB;color:#D98B1D;border:1px solid rgba(217,139,29,0.2); }
.ds-callout-info    { background:rgba(99,96,216,0.08);color:#8F8DDE;border:1px solid rgba(99,96,216,0.2); }
/* Dark context variants */
.ds-callout-error-dark   { background:rgba(225,82,82,0.28);color:#F9F9F9;border:1px solid rgba(225,82,82,0.35); }
.ds-callout-success-dark { background:rgba(49,165,109,0.28);color:#F9F9F9;border:1px solid rgba(49,165,109,0.35); }
.ds-callout-warning-dark { background:rgba(217,139,29,0.28);color:#F9F9F9;border:1px solid rgba(217,139,29,0.35); }

/* ── Data Table ── */
.ds-table-wrap { width:100%;overflow-x:auto; }
.ds-table { width:100%;border-collapse:collapse;font-size:13px; }
.ds-table th { padding:10px 16px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--shell-text-muted);background:var(--table-th-bg);border-bottom:1px solid var(--shell-border);white-space:nowrap; }
.ds-table td { padding:11px 16px;border-bottom:1px solid var(--table-border);color:var(--shell-text-2);vertical-align:middle; }
.ds-table tbody tr:last-child td { border-bottom:none; }
.ds-table tbody tr:hover td { background:var(--shell-hover); }
.ds-table-action { background:none;border:none;cursor:pointer;color:var(--shell-text-muted);padding:4px;border-radius:4px; }
.ds-table-action:hover { color:var(--shell-text);background:var(--shell-hover); }

/* ── Tabs ── */
.ds-tabs-list { display:flex;border-bottom:1px solid var(--shell-border);background:var(--shell-raised);padding:0 4px; }
.ds-tab { padding:10px 16px;font-size:13px;font-weight:500;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);border-bottom:2px solid transparent;margin-bottom:-1px;font-family:inherit;transition:color 150ms,border-color 150ms;white-space:nowrap; }
.ds-tab:hover { color:var(--shell-text); }
.ds-tab.active { color:var(--shell-accent);border-bottom-color:var(--shell-accent);font-weight:600; }
.ds-tab-panel { display:none;padding:20px; }
.ds-tab-panel.active { display:block; }
/* Pill tabs variant */
.ds-tabs-pill .ds-tabs-list { background:transparent;border-bottom:none;gap:4px;padding:0; }
.ds-tabs-pill .ds-tab { border-radius:20px;border-bottom:none;margin-bottom:0;padding:6px 14px;border:1px solid transparent; }
.ds-tabs-pill .ds-tab:hover { background:var(--shell-hover);border-color:var(--shell-border); }
.ds-tabs-pill .ds-tab.active { background:rgba(99,96,216,0.14);color:var(--shell-accent);border-color:rgba(99,96,216,0.3); }

/* ── Modal ── */
.ds-modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.7);display:none;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(2px); }
.ds-modal-overlay.open { display:flex; }
.ds-modal { background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;width:100%;max-width:440px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px rgba(0,0,0,.5);animation:ds-modal-in 150ms ease; }
@keyframes ds-modal-in { from{opacity:0;transform:scale(.96) translateY(8px)} to{opacity:1;transform:none} }
.ds-modal-header { display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px;border-bottom:1px solid var(--shell-border); }
.ds-modal-title { font-size:15px;font-weight:600;color:var(--shell-text); }
.ds-modal-close { width:28px;height:28px;border-radius:6px;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);display:flex;align-items:center;justify-content:center; }
.ds-modal-close:hover { background:var(--shell-hover);color:var(--shell-text); }
.ds-modal-body { padding:20px; }
.ds-modal-footer { padding:14px 20px;border-top:1px solid var(--shell-border);display:flex;justify-content:flex-end;gap:8px; }
/* Form Dialog modal header (grey, rounded top) */
.ds-modal-header-form { display:flex;align-items:center;gap:10px;padding:0 20px;height:58px;flex-shrink:0;background:#f5f5f5;border-radius:20px 20px 0 0;border-bottom:1px solid var(--shell-border); }
html.theme-dark .ds-modal-header-form { background:#2a2a2a; }
.ds-form-section { margin-bottom:16px; }
.ds-form-section-head { display:flex;align-items:center;gap:10px;margin-bottom:12px; }
.ds-form-section-label { font-size:12px;font-weight:600;color:#101010;white-space:nowrap; }
html.theme-dark .ds-form-section-label { color:var(--shell-text-2); }
.ds-form-section-line { flex:1;height:1px;background:var(--shell-border); }

/* ── Toast ── */
.ds-toast-container { position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:8px;z-index:300; }
.ds-toast { display:flex;align-items:center;gap:10px;min-width:280px;max-width:360px;padding:12px 16px;border-radius:8px;font-size:13px;box-shadow:0 8px 24px rgba(0,0,0,.35);animation:ds-toast-in 250ms ease; }
@keyframes ds-toast-in { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:none} }
.ds-toast.success { background:rgba(49,165,109,0.18);color:#31A56D;border:1px solid rgba(49,165,109,0.3); }
.ds-toast.error   { background:rgba(209,35,41,0.18);color:#D12329;border:1px solid rgba(209,35,41,0.3); }
.ds-toast.warning { background:rgba(217,139,29,0.18);color:#D98B1D;border:1px solid rgba(217,139,29,0.3); }
.ds-toast.info    { background:rgba(99,96,216,0.18);color:#8F8DDE;border:1px solid rgba(99,96,216,0.3); }
.ds-toast span { flex:1; }
.ds-toast-dismiss { background:none;border:none;cursor:pointer;color:inherit;opacity:.6;font-size:16px;padding:0;line-height:1;flex-shrink:0; }
.ds-toast-dismiss:hover { opacity:1; }

/* ── Tooltip (CSS-only, no JS) ── */
.ds-tooltip-wrap { position:relative;display:inline-flex; }
.ds-tooltip-wrap::after { content:attr(data-tip);position:absolute;z-index:150;pointer-events:none;background:#1a1a1a;color:#F9F9F9;border:1px solid #272727;border-radius:6px;padding:5px 10px;font-size:12px;max-width:220px;white-space:normal;opacity:0;transition:opacity 150ms,transform 150ms; }
.ds-tooltip-wrap[data-pos="top"]::after { bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(4px); }
.ds-tooltip-wrap[data-pos="bottom"]::after { top:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(-4px); }
.ds-tooltip-wrap[data-pos="right"]::after { left:calc(100% + 8px);top:50%;transform:translateY(-50%) translateX(-4px); }
.ds-tooltip-wrap[data-pos="left"]::after { right:calc(100% + 8px);top:50%;transform:translateY(-50%) translateX(4px); }
.ds-tooltip-wrap:hover::after { opacity:1; }
.ds-tooltip-wrap[data-pos="top"]:hover::after { transform:translateX(-50%) translateY(0); }
.ds-tooltip-wrap[data-pos="bottom"]:hover::after { transform:translateX(-50%) translateY(0); }
.ds-tooltip-wrap[data-pos="right"]:hover::after { transform:translateY(-50%) translateX(0); }
.ds-tooltip-wrap[data-pos="left"]:hover::after { transform:translateY(-50%) translateX(0); }

/* ── Accordion ── */
.ds-accordion { border:1px solid var(--shell-border);border-radius:10px;overflow:hidden; }
.ds-accordion-item { border-bottom:1px solid var(--shell-border); }
.ds-accordion-item:last-child { border-bottom:none; }
.ds-accordion-trigger { width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 18px;font-size:13px;font-weight:500;color:var(--shell-text);background:var(--card-bg);border:none;cursor:pointer;font-family:inherit;text-align:left;transition:background 150ms; }
.ds-accordion-trigger:hover { background:var(--shell-hover); }
.ds-accordion-trigger.open { background:var(--shell-raised); }
.ds-accordion-chevron { flex-shrink:0;transition:transform 250ms;color:var(--shell-text-muted); }
.ds-accordion-trigger.open .ds-accordion-chevron { transform:rotate(180deg); }
.ds-accordion-content { max-height:0;overflow:hidden;transition:max-height 250ms ease;background:var(--card-bg); }
.ds-accordion-content.open { max-height:400px; }
.ds-accordion-content p { padding:0 18px 16px;font-size:13px;color:var(--shell-text-2);line-height:1.7; }

/* ── Progress Bar ── */
.ds-progress { height:8px;border-radius:99px;background:var(--shell-raised);border:1px solid var(--shell-border);overflow:hidden; }
.ds-progress-bar { height:100%;border-radius:99px;background:var(--shell-accent);transition:width 400ms ease; }
.ds-progress-bar.indeterminate { width:40%;animation:ds-progress-move 1.4s ease-in-out infinite; }
@keyframes ds-progress-move { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }

/* ── Pagination ── */
.ds-pagination { display:flex;align-items:center;gap:4px;flex-wrap:wrap; }
.ds-page-btn { min-width:32px;height:32px;border-radius:6px;border:1px solid var(--shell-border);background:var(--card-bg);color:var(--shell-text-2);cursor:pointer;font-size:13px;font-family:inherit;padding:0 6px;display:flex;align-items:center;justify-content:center;transition:all 120ms; }
.ds-page-btn:hover { background:var(--shell-hover);color:var(--shell-text); }
.ds-page-btn.active { background:var(--shell-accent);color:#fff;border-color:var(--shell-accent);font-weight:600; }
.ds-page-btn:disabled { opacity:.3;cursor:not-allowed;pointer-events:none; }
.ds-page-ellipsis { color:var(--shell-text-muted);padding:0 4px;font-size:13px; }

/* ── Breadcrumb ── */
.ds-breadcrumb { display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:13px; }
.ds-breadcrumb a { color:var(--shell-text-muted);text-decoration:none; }
.ds-breadcrumb a:hover { color:var(--shell-accent);text-decoration:underline; }
.ds-breadcrumb-sep { color:var(--shell-text-faint);font-size:14px; }
.ds-breadcrumb-current { color:var(--shell-text);font-weight:500; }

/* ── Step Progress ── */
.ds-steps { display:flex;align-items:center; }
.ds-step { display:flex;flex-direction:column;align-items:center;gap:6px; }
.ds-step-dot { width:28px;height:28px;border-radius:50%;border:2px solid var(--shell-border);background:var(--card-bg);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--shell-text-muted);transition:all 200ms; }
.ds-step.active .ds-step-dot { border-color:var(--shell-accent);color:var(--shell-accent); }
.ds-step.completed .ds-step-dot { background:var(--shell-accent);border-color:var(--shell-accent);color:#fff; }
.ds-step-label { font-size:11px;color:var(--shell-text-muted);white-space:nowrap; }
.ds-step.active .ds-step-label { color:var(--shell-accent);font-weight:600; }
.ds-step.completed .ds-step-label { color:var(--shell-text-2); }
.ds-step-line { flex:1;height:2px;background:var(--shell-border);min-width:32px;margin:0 4px;margin-bottom:17px;transition:background 200ms; }
.ds-step-line.completed { background:var(--shell-accent); }

/* ── Skeleton Loader ── */
.ds-skeleton { background:linear-gradient(90deg,var(--shell-raised) 25%,var(--shell-elevated) 50%,var(--shell-raised) 75%);background-size:200% 100%;animation:ds-shimmer 1.5s infinite;border-radius:4px; }
@keyframes ds-shimmer { from{background-position:200% 0} to{background-position:-200% 0} }

/* ── Avatar ── */
.ds-avatar { display:inline-flex;align-items:center;justify-content:center;border-radius:50%;color:#fff;font-weight:600;flex-shrink:0;background-size:cover;background-position:center;user-select:none; }
.ds-avatar-group { display:flex; }
.ds-avatar-group .ds-avatar { margin-left:-8px; }
.ds-avatar-group .ds-avatar:first-child { margin-left:0; }

/* ── Icon Button ── */
.ds-icon-btn { display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:6px;border:none;background:transparent;color:var(--shell-text-muted);cursor:pointer;transition:background .12s,color .12s;flex-shrink:0; }
.ds-icon-btn:hover { background:var(--shell-hover);color:var(--shell-text); }
```

---

### Card
```html
<div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;overflow:hidden;">
  <div style="padding:12px 16px;border-bottom:1px solid var(--card-border);font-size:13px;font-weight:600;color:var(--shell-text);">Card Title</div>
  <div style="padding:16px;"><!-- card body --></div>
</div>
```

---

### KPI Card

Max 5 in a row. `border-radius:8px`, `gap:8px` between cards.

```html
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;">
  <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:8px;padding:16px 20px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <span style="font-size:12px;font-weight:500;color:var(--shell-text-muted);">Total Findings</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--shell-text-muted)" stroke-width="2"><!-- icon path --></svg>
    </div>
    <div style="font-size:24px;font-weight:700;color:var(--shell-text);line-height:1;">842</div>
    <div style="font-size:12px;color:#D12329;margin-top:4px;">↑ 12% vs last week</div>
  </div>
</div>
```

---

### Buttons

**All buttons use `border-radius:44px` (pill) — never `6px` on a button.**

Use CSS classes for proper hover/focus/disabled states:

```html
<!-- Primary -->
<button class="ds-btn sz-md t-primary">Save Changes</button>

<!-- Secondary (tonal) -->
<button class="ds-btn sz-md t-secondary">Export</button>

<!-- Outline (neutral) -->
<button class="ds-btn sz-md t-outline">Cancel</button>

<!-- Ghost / text -->
<button class="ds-btn sz-md t-tertiary">Learn more</button>

<!-- Special (gradient text — Navigator, hero CTAs) -->
<button class="ds-btn sz-md t-special"><span class="btn-text">Navigator</span></button>

<!-- Danger -->
<button class="ds-btn sz-md t-danger">Delete</button>

<!-- Success -->
<button class="ds-btn sz-md t-success">Approve</button>

<!-- With spinner (loading state) -->
<button class="ds-btn sz-md t-primary" disabled>
  <span class="ds-spinner"></span> Saving…
</button>

<!-- Sizes: sz-sm (24px) | sz-md (32px) | sz-lg (40px) -->

<!-- Icon-only circle (neutral) -->
<button style="width:32px;height:32px;padding:0;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:1px solid var(--ctrl-border);border-radius:50%;cursor:pointer;color:var(--shell-text-muted);">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><!-- icon --></svg>
</button>

<!-- Icon button (square, 28px) -->
<button class="ds-icon-btn">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><!-- icon --></svg>
</button>
```

---

### Text Input

```html
<!-- Standard with label, hint, error -->
<div class="ds-input-wrap" style="width:100%;">
  <label class="ds-input-label">Field Label</label>
  <div class="ds-input-field">
    <input type="text" placeholder="Enter value…">
  </div>
  <div class="ds-input-helper">
    <span class="ds-input-hint">Helper text</span>
  </div>
</div>

<!-- With error state -->
<div class="ds-input-wrap" style="width:100%;">
  <label class="ds-input-label">Email</label>
  <div class="ds-input-field has-error">
    <input type="email" placeholder="Enter email…">
  </div>
  <div class="ds-input-helper">
    <span class="ds-input-hint error">Invalid email address</span>
  </div>
</div>

<!-- With search icon (inline style version for quick use) -->
<div style="display:flex;align-items:center;border:1px solid var(--ctrl-border);border-radius:8px;background:var(--ctrl-bg);padding:0 10px;height:36px;gap:6px;">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--shell-text-muted)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  <input type="text" placeholder="Search…" style="flex:1;background:none;border:none;outline:none;color:var(--ctrl-text);font-size:13px;font-family:inherit;">
</div>

<!-- Pill search input -->
<div style="display:flex;align-items:center;border:1px solid var(--ctrl-border);border-radius:60px;background:var(--ctrl-bg);padding:0 12px;height:34px;gap:6px;">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--shell-text-muted)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  <input type="text" placeholder="Search…" style="flex:1;background:none;border:none;outline:none;color:var(--ctrl-text);font-size:13px;font-family:inherit;">
</div>
```

---

### Textarea

```html
<div class="ds-input-wrap" style="width:100%;">
  <label class="ds-input-label">Description</label>
  <textarea class="ds-textarea-field" rows="4" placeholder="Enter description…" style="width:100%;"></textarea>
  <div class="ds-input-helper">
    <span class="ds-input-hint">Max 500 characters</span>
  </div>
</div>
```

---

### Dropdown / Select

```html
<!-- JS-driven dropdown with CSS classes -->
<div class="ds-dropdown" data-open="false">
  <div class="ds-dropdown-trigger" onclick="var d=this.closest('.ds-dropdown');d.dataset.open=d.dataset.open==='true'?'false':'true'">
    <span class="ds-dropdown-trigger-text placeholder">Select option</span>
    <svg class="ds-dropdown-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  </div>
  <div class="ds-dropdown-panel">
    <div class="ds-dropdown-options">
      <div class="ds-dropdown-option" onclick="this.closest('.ds-dropdown').querySelector('.ds-dropdown-trigger-text').textContent=this.textContent;this.closest('.ds-dropdown').querySelector('.ds-dropdown-trigger-text').classList.remove('placeholder');this.closest('.ds-dropdown').dataset.open='false'">Option A</div>
      <div class="ds-dropdown-option" onclick="this.closest('.ds-dropdown').querySelector('.ds-dropdown-trigger-text').textContent=this.textContent;this.closest('.ds-dropdown').querySelector('.ds-dropdown-trigger-text').classList.remove('placeholder');this.closest('.ds-dropdown').dataset.open='false'">Option B</div>
      <div class="ds-dropdown-option" onclick="this.closest('.ds-dropdown').querySelector('.ds-dropdown-trigger-text').textContent=this.textContent;this.closest('.ds-dropdown').querySelector('.ds-dropdown-trigger-text').classList.remove('placeholder');this.closest('.ds-dropdown').dataset.open='false'">Option C</div>
    </div>
  </div>
</div>
```

---

### Checkbox & Radio

```html
<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--shell-text);cursor:pointer;">
  <input type="checkbox" style="width:15px;height:15px;accent-color:#6360D8;cursor:pointer;">
  Label text
</label>

<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--shell-text);cursor:pointer;">
  <input type="radio" name="group" style="width:15px;height:15px;accent-color:#6360D8;cursor:pointer;">
  Label text
</label>
```

---

### Dropdown — Tags (chips inside trigger)

```html
<div style="position:relative;min-width:260px;">
  <div onclick="var d=this.nextElementSibling;d.style.display=d.style.display==='block'?'none':'block'"
       style="display:flex;flex-wrap:wrap;align-items:center;gap:4px;border:1px solid var(--ctrl-border);border-radius:8px;background:var(--ctrl-bg);padding:4px 8px;min-height:36px;cursor:pointer;font-size:13px;color:var(--ctrl-text);user-select:none;">
    <span style="display:inline-flex;align-items:center;gap:4px;background:rgba(99,96,216,.12);color:#6360d8;border-radius:4px;padding:2px 6px;font-size:12px;font-weight:500;">
      SQL Injection
      <span onclick="event.stopPropagation();this.parentElement.remove()" style="cursor:pointer;line-height:1;font-size:14px;opacity:.7;">&times;</span>
    </span>
    <svg style="margin-left:auto;flex-shrink:0;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  </div>
  <div style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;background:var(--ctrl-bg);border:1px solid var(--ctrl-border);border-radius:8px;z-index:50;box-shadow:0 4px 16px rgba(0,0,0,.2);max-height:200px;overflow-y:auto;">
    <div style="padding:8px 12px;font-size:13px;cursor:pointer;color:#6360d8;display:flex;align-items:center;gap:8px;"><span>✓</span> SQL Injection</div>
    <div style="padding:8px 12px;font-size:13px;cursor:pointer;color:var(--ctrl-text);display:flex;align-items:center;gap:8px;"><span style="opacity:0;">✓</span> Auth Bypass</div>
  </div>
</div>
```

---

### Multi-Select Dropdown Panel

```html
<div style="position:relative;display:inline-block;">
  <button id="ms-trigger" onclick="dsMsToggle('ms-panel')"
          style="display:inline-flex;align-items:center;gap:8px;height:36px;padding:0 12px;border:1px solid var(--shell-border);border-radius:8px;background:var(--card-bg);color:var(--shell-text);font-size:13px;cursor:pointer;font-family:inherit;">
    Filter Origin
    <span id="ms-count" style="display:none;background:#6760d8;color:#fff;border-radius:99px;font-size:11px;font-weight:600;padding:1px 6px;"></span>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  </button>
  <div id="ms-panel" style="display:none;position:absolute;top:calc(100% + 6px);left:0;z-index:300;width:309px;background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;box-shadow:0 16px 36px -20px rgba(0,6,46,.2),0 12px 60px rgba(0,0,0,.15);flex-direction:column;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 12px 0;">
      <span style="font-size:16px;font-weight:600;color:var(--shell-text);">Filter Origin</span>
      <button onclick="document.getElementById('ms-panel').style.display='none'" style="width:26px;height:26px;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);display:flex;align-items:center;justify-content:center;border-radius:6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="padding:12px 12px 0;">
      <div style="display:flex;align-items:center;height:32px;border:1px solid var(--shell-border);border-radius:8px;background:var(--card-bg);overflow:hidden;">
        <input type="text" placeholder="Search" oninput="dsMsSearch(this,'ms-panel')" style="flex:1;border:none;background:transparent;outline:none;font-size:13px;color:var(--shell-text);padding:0 8px;font-family:inherit;">
        <button style="width:26px;height:26px;margin:2px;border:none;cursor:pointer;background:#f5f5f5;border-radius:4px;display:flex;align-items:center;justify-content:center;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </div>
    </div>
    <div id="ms-panel-seg" style="display:flex;align-items:center;height:32px;background:rgba(0,0,51,.059);border-radius:8px;margin:12px 12px 0;">
      <button onclick="dsMsSegment(this)" style="flex:1;border:none;background:transparent;font-size:13px;font-weight:500;color:var(--shell-text);cursor:pointer;height:100%;border-radius:8px;font-family:inherit;">AND</button>
      <button onclick="dsMsSegment(this)" style="flex:1;border:1px solid rgba(0,0,45,.09);background:var(--card-bg);font-size:13px;font-weight:500;color:var(--shell-text);cursor:pointer;height:100%;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.08);font-family:inherit;">OR</button>
      <button onclick="dsMsSegment(this)" style="flex:1;border:none;background:transparent;font-size:13px;font-weight:500;color:var(--shell-text);cursor:pointer;height:100%;border-radius:8px;font-family:inherit;">EXACT</button>
    </div>
    <div id="ms-panel-list" style="display:flex;flex-direction:column;padding:12px 12px 0;max-height:220px;overflow-y:auto;">
      <div onclick="dsMsSelectAll(this,'ms-panel-list','ms-count')" style="display:flex;align-items:center;gap:8px;padding:8px 0;cursor:pointer;user-select:none;font-size:14px;font-weight:700;color:#3c3c3c;">
        <div class="ms-cb" style="width:14px;height:14px;border-radius:3px;border:1px solid #a2a1f7;background:#f7f9fc;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg class="ms-dash" width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#6760d8" stroke-width="2.2" stroke-linecap="round"><line x1="2" y1="5" x2="8" y2="5"/></svg>
        </div>
        Select All
      </div>
      <div onclick="dsMsItem(this,'ms-panel-list','ms-count')" style="display:flex;align-items:center;gap:8px;padding:8px 0;cursor:pointer;user-select:none;font-size:14px;color:#3c3c3c;">
        <div class="ms-cb" data-checked="1" style="width:14px;height:14px;border-radius:3px;border:1px solid #6760d8;background:#6760d8;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg class="ms-chk" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 6 5 9 10 3"/></svg>
        </div>
        AWS
      </div>
      <div onclick="dsMsItem(this,'ms-panel-list','ms-count')" style="display:flex;align-items:center;gap:8px;padding:8px 0;cursor:pointer;user-select:none;font-size:14px;color:#3c3c3c;">
        <div class="ms-cb" data-checked="0" style="width:14px;height:14px;border-radius:3px;border:1px solid #e6e6e6;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg class="ms-chk" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><polyline points="2 6 5 9 10 3"/></svg>
        </div>
        Azure
      </div>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px;border-top:1px solid var(--shell-border);margin-top:12px;">
      <button onclick="dsMsInverse('ms-panel-list','ms-count')" style="font-size:14px;font-weight:500;color:#6360d8;background:none;border:none;cursor:pointer;padding:0;font-family:inherit;">Select Inverse</button>
      <div style="display:flex;gap:8px;">
        <button onclick="document.getElementById('ms-panel').style.display='none'" style="height:32px;padding:0 12px;border:1px solid #e6e6e6;border-radius:20px;background:transparent;cursor:pointer;font-size:14px;font-weight:500;color:#6e6e6e;font-family:inherit;">Cancel</button>
        <button onclick="dsMsApply('ms-panel')" style="height:32px;padding:0 12px;border:none;border-radius:20px;background:#6360d8;cursor:pointer;font-size:14px;font-weight:500;color:#fff;font-family:inherit;">Apply</button>
      </div>
    </div>
  </div>
</div>

<script>
function dsMsToggle(id){var p=document.getElementById(id);p.style.display=p.style.display==='flex'?'none':'flex';p.style.flexDirection='column';}
function dsMsSegment(btn){btn.closest('[id$="-seg"]').querySelectorAll('button').forEach(function(b){b.style.background='transparent';b.style.border='none';b.style.boxShadow='none';b.style.borderRadius='8px';});btn.style.background='var(--card-bg)';btn.style.border='1px solid rgba(0,0,45,.09)';btn.style.borderRadius='4px';btn.style.boxShadow='0 1px 3px rgba(0,0,0,.08)';}
function dsMsSearch(input,panelId){var list=document.getElementById(panelId+'-list')||document.getElementById(panelId).querySelector('[id$="-list"]');var q=input.value.toLowerCase();list.querySelectorAll('div[onclick*="dsMsItem"]').forEach(function(row){row.style.display=row.textContent.trim().toLowerCase().includes(q)?'':'none';});}
function dsMsItem(row,listId,countId){var cb=row.querySelector('.ms-cb'),chk=row.querySelector('.ms-chk');var checked=cb.dataset.checked==='1';if(checked){cb.dataset.checked='0';cb.style.background='#fff';cb.style.borderColor='#e6e6e6';if(chk)chk.style.display='none';}else{cb.dataset.checked='1';cb.style.background='#6760d8';cb.style.borderColor='#6760d8';if(chk){chk.style.display='';chk.setAttribute('stroke','#fff');}}_syncSelectAll(listId,countId);}
function dsMsSelectAll(row,listId,countId){var list=document.getElementById(listId);var allCb=row.querySelector('.ms-cb');var doCheck=allCb.dataset.checked!=='1';list.querySelectorAll('div[onclick*="dsMsItem"]').forEach(function(r){var cb=r.querySelector('.ms-cb'),chk=r.querySelector('.ms-chk');if(doCheck){cb.dataset.checked='1';cb.style.background='#6760d8';cb.style.borderColor='#6760d8';if(chk){chk.style.display='';chk.setAttribute('stroke','#fff');}}else{cb.dataset.checked='0';cb.style.background='#fff';cb.style.borderColor='#e6e6e6';if(chk)chk.style.display='none';}});_syncSelectAll(listId,countId);}
function dsMsInverse(listId,countId){document.getElementById(listId).querySelectorAll('div[onclick*="dsMsItem"]').forEach(function(row){dsMsItem(row,listId,countId);});}
function dsMsApply(panelId){document.getElementById(panelId).style.display='none';}
function _syncSelectAll(listId,countId){var list=document.getElementById(listId);var items=list.querySelectorAll('div[onclick*="dsMsItem"]');var total=items.length,checked=0;items.forEach(function(r){if(r.querySelector('.ms-cb').dataset.checked==='1')checked++;});var allRow=list.querySelector('div[onclick*="dsMsSelectAll"]');if(allRow){var allCb=allRow.querySelector('.ms-cb'),dash=allRow.querySelector('.ms-dash');allCb.dataset.checked=checked===total?'1':'0';if(checked===0){allCb.style.background='#f7f9fc';allCb.style.borderColor='#a2a1f7';if(dash)dash.style.display='none';}else if(checked===total){allCb.style.background='#6760d8';allCb.style.borderColor='#6760d8';if(dash)dash.style.display='none';}else{allCb.style.background='#f7f9fc';allCb.style.borderColor='#a2a1f7';if(dash)dash.style.display='';}}if(countId){var el=document.getElementById(countId);if(el){el.textContent=checked;el.style.display=checked>0?'':'none';}}}
</script>
```

---

### Toggle Switch

```html
<!-- Medium (44×24) — default -->
<div class="ds-toggle" onclick="this.classList.toggle('on');this.querySelector('.ds-toggle-thumb').style.left=this.classList.contains('on')?'23px':'3px'">
  <div class="ds-toggle-thumb"></div>
</div>

<!-- With label -->
<div style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;" onclick="var t=this.querySelector('.ds-toggle');t.classList.toggle('on');t.querySelector('.ds-toggle-thumb').style.left=t.classList.contains('on')?'23px':'3px'">
  <div class="ds-toggle">
    <div class="ds-toggle-thumb"></div>
  </div>
  <span style="font-size:13px;color:var(--shell-text-2);">Enable notifications</span>
</div>
```

---

### Dual Toggle (2-option segmented)

```html
<div class="ds-dual-toggle" id="dual-tg">
  <div class="dt-indicator" id="dual-tg-ind"></div>
  <button class="dt-btn active" onclick="dsDualToggle('dual-tg',this)">List</button>
  <button class="dt-btn"       onclick="dsDualToggle('dual-tg',this)">Grid</button>
</div>
<script>
function dsDualToggle(id, btn) {
  var wrap = document.getElementById(id);
  wrap.querySelectorAll('.dt-btn').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  var ind = wrap.querySelector('.dt-indicator');
  ind.style.left = btn.offsetLeft + 'px';
  ind.style.width = btn.offsetWidth + 'px';
}
// Init indicator on load
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.ds-dual-toggle').forEach(function(wrap){
    var active = wrap.querySelector('.dt-btn.active');
    var ind = wrap.querySelector('.dt-indicator');
    if(active && ind){ ind.style.left=active.offsetLeft+'px'; ind.style.width=active.offsetWidth+'px'; }
  });
});
</script>
```

---

### Badge / Status Tag

```html
<!-- Severity badges (always visible — never tooltip-only) -->
<span class="ds-badge danger">Critical</span>
<span class="ds-badge warning">High</span>
<span class="ds-badge info">Medium</span>
<span class="ds-badge success">Low</span>
<span class="ds-badge neutral">Inactive</span>
<span class="ds-badge caution">Caution</span>

<!-- With dot prefix -->
<span class="ds-badge success dot">Active</span>
<span class="ds-badge danger dot">Critical</span>

<!-- Animated status dot (use inline) -->
<div style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--shell-text);">
  <span class="ds-status-dot success"></span> Online
</div>
<div style="display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--shell-text);">
  <span class="ds-status-dot danger"></span> Critical
</div>

<!-- Dismissible tag -->
<span class="ds-tag">
  CVE-2024-1234
  <button class="ds-tag-close" onclick="this.parentElement.remove()">&times;</button>
</span>

<!-- Count badge (position:relative on parent) -->
<div style="position:relative;display:inline-flex;">
  <button class="ds-btn sz-md t-outline">Alerts</button>
  <span class="ds-badge-count danger">4</span>
</div>
```

---

### Data Table

```html
<div style="border:1px solid var(--card-border);border-radius:12px;overflow:hidden;">
  <div class="ds-table-wrap">
    <table class="ds-table">
      <thead>
        <tr>
          <th>Finding</th>
          <th>Severity</th>
          <th>Asset</th>
          <th>Status</th>
          <th style="width:40px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="color:var(--shell-text);font-weight:500;">SQL Injection in /api/login</td>
          <td><span class="ds-badge danger">Critical</span></td>
          <td style="color:var(--shell-text-muted);">prod-api-01</td>
          <td><span class="ds-badge warning dot">Open</span></td>
          <td>
            <button class="ds-table-action">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

### Tabs

```html
<!-- Underline tabs (default) -->
<div>
  <div class="ds-tabs-list">
    <button class="ds-tab active" onclick="dsTab(this,'tab-overview')">Overview</button>
    <button class="ds-tab"        onclick="dsTab(this,'tab-findings')">Findings</button>
    <button class="ds-tab"        onclick="dsTab(this,'tab-history')">History</button>
  </div>
  <div id="tab-overview" class="ds-tab-panel active"><!-- overview content --></div>
  <div id="tab-findings" class="ds-tab-panel"><!-- findings content --></div>
  <div id="tab-history"  class="ds-tab-panel"><!-- history content --></div>
</div>

<!-- Pill tabs variant — wrap with ds-tabs-pill class -->
<div class="ds-tabs-pill">
  <div class="ds-tabs-list">
    <button class="ds-tab active" onclick="dsTab(this,'ptab-all')">All</button>
    <button class="ds-tab"        onclick="dsTab(this,'ptab-open')">Open</button>
    <button class="ds-tab"        onclick="dsTab(this,'ptab-closed')">Closed</button>
  </div>
  <div id="ptab-all"    class="ds-tab-panel active"><!-- all content --></div>
  <div id="ptab-open"   class="ds-tab-panel"><!-- open content --></div>
  <div id="ptab-closed" class="ds-tab-panel"><!-- closed content --></div>
</div>

<script>
function dsTab(btn, targetId) {
  btn.closest('.ds-tabs-list').querySelectorAll('.ds-tab').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');
  var panel = document.getElementById(targetId);
  if (!panel) return;
  panel.closest('div').querySelectorAll('.ds-tab-panel').forEach(function(p){p.classList.remove('active');});
  panel.classList.add('active');
}
</script>
```

---

### Callout / Alert Banner

```html
<!-- Info -->
<div class="ds-callout ds-callout-info">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  <span>Informational message goes here.</span>
</div>

<!-- Warning -->
<div class="ds-callout ds-callout-warning">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  <span>Warning message goes here.</span>
</div>

<!-- Error -->
<div class="ds-callout ds-callout-error">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
  <span>Error message goes here.</span>
</div>

<!-- Success -->
<div class="ds-callout ds-callout-success">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  <span>Success message goes here.</span>
</div>
```

---

### Inline Side Panel

```html
<div style="display:flex;border:1px solid var(--card-border);border-radius:10px;overflow:hidden;min-height:320px;background:var(--card-bg);">
  <div style="flex:1;min-width:0;padding:16px;">
    <button onclick="var p=document.getElementById('side-panel');var open=p.style.width!=='300px';p.style.width=open?'300px':'0';this.style.background=open?'#6360D8':'';this.style.color=open?'#fff':'';"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:44px;background:rgba(99,96,216,0.1);color:#6360D8;border:none;cursor:pointer;font-size:12px;font-weight:500;font-family:inherit;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
      Filter
    </button>
  </div>
  <div id="side-panel" style="width:0;overflow:hidden;flex-shrink:0;border-left:1px solid var(--card-border);background:var(--card-bg);display:flex;flex-direction:column;transition:width .25s ease;">
    <div style="padding:14px 16px;border-bottom:1px solid var(--card-border);display:flex;align-items:center;gap:8px;flex-shrink:0;">
      <span style="flex:1;font-size:14px;font-weight:600;color:var(--shell-text);">Filters</span>
      <button onclick="document.getElementById('side-panel').style.width='0'" style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);padding:4px;display:flex;align-items:center;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:16px;"></div>
    <div style="border-top:1px solid var(--card-border);padding:14px 16px;display:flex;gap:8px;flex-shrink:0;">
      <button onclick="document.getElementById('side-panel').style.width='0'" class="ds-btn sz-md t-outline" style="flex:1;">Cancel</button>
      <button class="ds-btn sz-md t-primary" style="flex:1;">Apply</button>
    </div>
  </div>
</div>
```

---

### Modal — Standard

```html
<button class="ds-btn sz-md t-primary" onclick="document.getElementById('my-modal').classList.add('open')">Open Modal</button>

<div id="my-modal" class="ds-modal-overlay" onclick="if(event.target===this)this.classList.remove('open')">
  <div class="ds-modal">
    <div class="ds-modal-header">
      <span class="ds-modal-title">Modal Title</span>
      <button class="ds-modal-close" onclick="document.getElementById('my-modal').classList.remove('open')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="ds-modal-body" style="font-size:13px;color:var(--shell-text-muted);line-height:1.6;">
      Modal content goes here.
    </div>
    <div class="ds-modal-footer">
      <button class="ds-btn sz-md t-outline" onclick="document.getElementById('my-modal').classList.remove('open')">Cancel</button>
      <button class="ds-btn sz-md t-primary">Confirm</button>
    </div>
  </div>
</div>
```

### Destructive Confirmation Modal

```html
<!-- Always name the item + state the consequence + red button -->
<div id="del-modal" class="ds-modal-overlay" onclick="if(event.target===this)this.classList.remove('open')">
  <div class="ds-modal">
    <div class="ds-modal-header">
      <span class="ds-modal-title">Delete Finding?</span>
      <button class="ds-modal-close" onclick="document.getElementById('del-modal').classList.remove('open')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="ds-modal-body" style="font-size:13px;color:var(--shell-text-muted);line-height:1.6;">
      Are you sure you want to delete <strong style="color:var(--shell-text);">CVE-2024-1234 — SQL Injection</strong>?
      This action cannot be undone.
    </div>
    <div class="ds-modal-footer">
      <button class="ds-btn sz-md t-outline" onclick="document.getElementById('del-modal').classList.remove('open')">Cancel</button>
      <button class="ds-btn sz-md t-danger" style="background:#D12329;color:#fff;">Delete</button>
    </div>
  </div>
</div>
```

### Form Dialogue Modal (Create / Edit)

Grey header, `border-radius:20px`, section labels with dividers.

```html
<div id="create-modal" class="ds-modal-overlay" onclick="if(event.target===this)this.classList.remove('open')" style="z-index:500;">
  <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:20px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px rgba(0,0,0,.5);">
    <div class="ds-modal-header-form">
      <div style="width:32px;height:32px;border-radius:8px;background:var(--card-bg);display:flex;align-items:center;justify-content:center;color:var(--shell-text-2);flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </div>
      <span style="flex:1;font-size:16px;font-weight:500;color:var(--shell-text);">Create Alert</span>
      <button class="ds-modal-close" onclick="document.getElementById('create-modal').classList.remove('open')">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="padding:20px;">
      <div class="ds-form-section">
        <div class="ds-form-section-head">
          <span class="ds-form-section-label">Trigger Condition</span>
          <span class="ds-form-section-line"></span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          <select style="height:42px;padding:0 10px;border:1px solid var(--shell-border);border-radius:4px;background:var(--card-bg);color:var(--shell-text);font-size:13px;cursor:pointer;font-family:inherit;"><option>When</option></select>
          <select style="height:42px;padding:0 10px;border:1px solid var(--shell-border);border-radius:4px;background:var(--card-bg);color:var(--shell-text);font-size:13px;cursor:pointer;font-family:inherit;"><option>Operator</option></select>
          <select style="height:42px;padding:0 10px;border:1px solid var(--shell-border);border-radius:4px;background:var(--card-bg);color:var(--shell-text);font-size:13px;cursor:pointer;font-family:inherit;"><option>Value</option></select>
        </div>
      </div>
    </div>
    <div style="padding:14px 20px;border-top:1px solid var(--shell-border);display:flex;justify-content:flex-end;gap:8px;">
      <button class="ds-btn sz-md t-outline" onclick="document.getElementById('create-modal').classList.remove('open')">Cancel</button>
      <button class="ds-btn sz-md t-primary">Create</button>
    </div>
  </div>
</div>
```

---

### Toast Notification

```html
<!-- Place once in <body> -->
<div class="ds-toast-container" id="toast-container"></div>

<script>
function showToast(type, message) {
  var t = document.createElement('div');
  t.className = 'ds-toast ' + type;
  t.innerHTML = '<span>' + message + '</span><button class="ds-toast-dismiss" onclick="this.parentElement.remove()">&times;</button>';
  document.getElementById('toast-container').appendChild(t);
  setTimeout(function(){ t.remove(); }, 3500);
}
// Usage: showToast('success', 'Finding resolved.')
// Types: success | error | warning | info
</script>
```

---

### Tooltip (CSS-only — no JS needed)

```html
<div class="ds-tooltip-wrap" data-tip="Tooltip text here" data-pos="top">
  <button class="ds-btn sz-md t-outline">Hover me</button>
</div>

<!-- Positions: top | bottom | left | right -->
<div class="ds-tooltip-wrap" data-tip="Delete this item" data-pos="top">
  <button class="ds-icon-btn">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/></svg>
  </button>
</div>
```

---

### Accordion

```html
<div class="ds-accordion">
  <div class="ds-accordion-item">
    <button class="ds-accordion-trigger" onclick="var t=this;t.classList.toggle('open');t.nextElementSibling.classList.toggle('open')">
      Section One
      <svg class="ds-accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div class="ds-accordion-content">
      <p>Content for section one.</p>
    </div>
  </div>
  <div class="ds-accordion-item">
    <button class="ds-accordion-trigger" onclick="var t=this;t.classList.toggle('open');t.nextElementSibling.classList.toggle('open')">
      Section Two
      <svg class="ds-accordion-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div class="ds-accordion-content">
      <p>Content for section two.</p>
    </div>
  </div>
</div>
```

---

### Progress Bar

```html
<!-- Determinate -->
<div class="ds-progress">
  <div class="ds-progress-bar" style="width:65%;"></div>
</div>

<!-- Danger color -->
<div class="ds-progress">
  <div class="ds-progress-bar" style="width:92%;background:#D12329;"></div>
</div>

<!-- Indeterminate / loading -->
<div class="ds-progress">
  <div class="ds-progress-bar indeterminate"></div>
</div>
```

---

### Pagination

```html
<div class="ds-pagination">
  <button class="ds-page-btn" disabled>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <button class="ds-page-btn active">1</button>
  <button class="ds-page-btn">2</button>
  <button class="ds-page-btn">3</button>
  <span class="ds-page-ellipsis">…</span>
  <button class="ds-page-btn">12</button>
  <button class="ds-page-btn">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
  </button>
</div>
```

---

### Breadcrumb

```html
<nav class="ds-breadcrumb">
  <a href="#">Dashboard</a>
  <span class="ds-breadcrumb-sep">/</span>
  <a href="#">Risk Management</a>
  <span class="ds-breadcrumb-sep">/</span>
  <span class="ds-breadcrumb-current">Findings</span>
</nav>
```

---

### Step Progress

```html
<div class="ds-steps">
  <div class="ds-step completed">
    <div class="ds-step-dot">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <span class="ds-step-label">Configure</span>
  </div>
  <div class="ds-step-line completed"></div>
  <div class="ds-step active">
    <div class="ds-step-dot">2</div>
    <span class="ds-step-label">Review</span>
  </div>
  <div class="ds-step-line"></div>
  <div class="ds-step">
    <div class="ds-step-dot">3</div>
    <span class="ds-step-label">Deploy</span>
  </div>
</div>
```

---

### Filter Chips (applied filters display)

```html
<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
  <span style="font-size:12px;color:var(--shell-text);">Show</span>
  <div style="display:inline-flex;align-items:center;gap:4px;background:var(--shell-raised);border:1px solid var(--card-border);border-radius:8px;padding:4px 8px;font-size:12px;">
    <span style="color:var(--shell-text-muted);font-weight:500;">Severity</span>
    <span style="background:var(--ctrl-bg);border-radius:4px;padding:1px 6px;color:var(--shell-text);">Critical</span>
    <button onclick="this.closest('div').remove()" style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);font-size:14px;padding:0 2px;line-height:1;">×</button>
  </div>
  <div style="display:inline-flex;align-items:center;gap:4px;background:var(--shell-raised);border:1px solid var(--card-border);border-radius:8px;padding:4px 8px;font-size:12px;">
    <span style="color:var(--shell-text-muted);font-weight:500;">Status</span>
    <span style="background:var(--ctrl-bg);border-radius:4px;padding:1px 6px;color:var(--shell-text);">Open</span>
    <button onclick="this.closest('div').remove()" style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);font-size:14px;padding:0 2px;line-height:1;">×</button>
  </div>
  <button style="background:none;border:none;cursor:pointer;color:#6360D8;font-size:12px;font-weight:500;font-family:inherit;padding:0;">Clear all</button>
</div>
```

---

### Avatar

```html
<!-- Initials (sizes: 24px sm, 32px md, 40px lg, 48px xl) -->
<div class="ds-avatar" style="width:32px;height:32px;font-size:12px;background:rgba(99,96,216,0.15);color:#6360D8;">AB</div>

<!-- Avatar group (stacked) -->
<div class="ds-avatar-group">
  <div class="ds-avatar" style="width:28px;height:28px;font-size:11px;background:rgba(99,96,216,0.15);color:#6360D8;border:2px solid var(--card-bg);">AB</div>
  <div class="ds-avatar" style="width:28px;height:28px;font-size:11px;background:rgba(49,165,109,0.15);color:#31A56D;border:2px solid var(--card-bg);">CD</div>
  <div class="ds-avatar" style="width:28px;height:28px;font-size:11px;background:rgba(217,139,29,0.15);color:#D98B1D;border:2px solid var(--card-bg);">EF</div>
</div>
```

---

### Skeleton Loader

**Use class `.ds-skeleton` — not `.skeleton`.**

```html
<div class="ds-skeleton" style="height:14px;width:60%;"></div>
<div class="ds-skeleton" style="height:14px;width:35%;margin-top:8px;"></div>
<div class="ds-skeleton" style="height:80px;width:100%;border-radius:8px;margin-top:12px;"></div>

<!-- Table row skeletons -->
<tr>
  <td><div class="ds-skeleton" style="height:12px;width:80%;"></div></td>
  <td><div class="ds-skeleton" style="height:18px;width:60px;border-radius:10px;"></div></td>
  <td><div class="ds-skeleton" style="height:12px;width:50%;"></div></td>
</tr>
```

---

## Typography Scale

```
Page title:    font-size:22px; font-weight:700; color:var(--shell-text)
Section title: font-size:16px; font-weight:600; color:var(--shell-text)
Subsection:    font-size:13px; font-weight:600; color:var(--shell-text)
Body:          font-size:13px; font-weight:400; color:var(--shell-text)
Caption/muted: font-size:12px; font-weight:400; color:var(--shell-text-muted)
Label:         font-size:12px; font-weight:500; color:var(--shell-text-muted)
Overline:      font-size:10px; font-weight:600; letter-spacing:.07em; text-transform:uppercase; color:var(--shell-text-muted)
```

---

## Status Colors

| Status   | Light BG   | Light Text | Dark BG (class)              | Dark Text  |
|----------|------------|------------|------------------------------|------------|
| Active   | `#EFF7ED`  | `#1A7D4D`  | `rgba(49,165,109,0.14)`      | `#31A56D`  |
| Warning  | `#F2EDDB`  | `#D98B1D`  | `rgba(217,139,29,0.14)`      | `#D98B1D`  |
| Critical | `#F9EEEE`  | `#D12329`  | `rgba(209,35,41,0.14)`       | `#D12329`  |
| Caution  | `#F7F6EB`  | `#CDB900`  | `rgba(205,185,0,0.14)`       | `#CDB900`  |
| Info     | `rgba(99,96,216,0.08)` | `#6360D8` | `rgba(99,96,216,0.14)` | `#8F8DDE` |
| Neutral  | `#F0F0F0`  | `#6E6E6E`  | `rgba(255,255,255,0.07)`     | `var(--shell-text-muted)` |
