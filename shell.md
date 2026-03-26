# Prevalent AI — Page Shell

**This is the mandatory shell for every Prevalent AI page.** Copy the HTML template exactly — do not improvise the structure.

Hosted at: `https://anthu211.github.io/design-system-2.0/`

---

## Shell HTML Template

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
    /* ── Reset ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    a { text-decoration: none; }

    /* ── Design Tokens (dark default) ── */
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
    /* ── Light theme overrides ── */
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

    /* ── Body ── */
    body { font-family:'Inter',sans-serif; background:var(--shell-bg); color:var(--shell-text); display:flex; flex-direction:column; height:100vh; overflow:hidden; font-size:12px; line-height:1.5; }

    /* ── Buttons ── */
    .ds-btn { display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;border-radius:44px;font-family:inherit;transition:background 150ms,color 150ms,border-color 150ms;white-space:nowrap;user-select:none;line-height:1;text-decoration:none; }
    .ds-btn:focus-visible { outline:2px solid #6760d8;outline-offset:2px; }
    .ds-btn[disabled] { cursor:not-allowed;pointer-events:none;opacity:0.4; }
    .ds-btn.sz-sm { height:24px;padding:0 12px;font-size:12px;font-weight:500; }
    .ds-btn.sz-md { height:32px;padding:0 12px;font-size:14px;font-weight:500; }
    .ds-btn.sz-lg { height:40px;padding:0 16px;font-size:16px;font-weight:600; }
    .ds-btn.t-primary { background:#6760d8;color:#f0f0fc; }
    .ds-btn.t-primary:hover { background:#5754c2; }
    .ds-btn.t-primary:active { background:#4f4cb5; }
    .ds-btn.t-special { background:transparent;border:1px solid #b1b8f5; }
    .ds-btn.t-special .btn-text { background:linear-gradient(to right,#467fcd,#47adcb);-webkit-background-clip:text;background-clip:text;color:transparent; }
    .ds-btn.t-special svg { stroke:url(#t-special-grad); }
    .ds-btn.t-special:hover { background:rgba(177,184,245,0.12); }
    .ds-btn.t-special:active { background:rgba(177,184,245,0.22);border-color:#7e8aee; }
    .ds-btn.t-special .ds-spinner { border-color:#467fcd;border-top-color:transparent; }
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
    html.theme-light .ds-btn.t-tertiary { color:#282828; }
    html.theme-light .ds-btn.t-tertiary:hover { background:#f3f3f3; }
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

    /* ── KPI Cards ── */
    .ds-kpi-row { display:flex;gap:8px; }
    .ds-kpi-card { flex:1;min-width:0;background:var(--card-bg);border:1px solid var(--card-border);border-radius:4px;padding:8px 12px;min-height:90px;display:flex;flex-direction:column;justify-content:space-between; }
    .ds-kpi-value { font-size:14px;font-weight:600;color:var(--shell-text);line-height:1.2;margin-bottom:4px; }
    .ds-kpi-label { font-size:12px;font-weight:500;color:var(--shell-text);line-height:1.3; }
    .ds-kpi-trend { display:flex;align-items:center;gap:4px;margin-top:6px; }
    .ds-kpi-delta { display:inline-flex;align-items:center;gap:2px;font-size:10px;font-weight:400; }
    .ds-kpi-delta.up-good,.ds-kpi-delta.down-good { color:#31a56d; }
    .ds-kpi-delta.up-bad,.ds-kpi-delta.down-bad { color:#e15252; }
    .ds-kpi-delta.neutral { color:var(--shell-text-muted); }
    .ds-kpi-period { font-size:10px;color:var(--shell-text-muted); }

    /* ── Chart Legend ── */
    .chart-legend { display:flex;flex-wrap:wrap;gap:12px;margin-top:12px;justify-content:center; }
    .chart-legend-item { display:flex;align-items:center;gap:6px;font-size:12px;color:var(--shell-text-2); }
    .chart-legend-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0; }

    /* ── Callout / Alert Banner ── */
    .ds-callout { display:flex;align-items:center;gap:8px;padding:12px 16px;border-radius:4px;font-size:13px;line-height:1.6;flex-shrink:0; }
    .ds-callout svg { flex-shrink:0; }
    .ds-callout-error   { background:#F9EEEE;color:#D12329;border:1px solid rgba(209,35,41,0.2); }
    .ds-callout-success { background:#EFF7ED;color:#1A7D4D;border:1px solid rgba(49,165,109,0.2); }
    .ds-callout-warning { background:#F7F6EB;color:#D98B1D;border:1px solid rgba(217,139,29,0.2); }
    .ds-callout-info    { background:rgba(99,96,216,0.08);color:#8F8DDE;border:1px solid rgba(99,96,216,0.2); }
    .ds-callout-error-dark   { background:rgba(225,82,82,0.28);color:#F9F9F9;border:1px solid rgba(225,82,82,0.35); }
    .ds-callout-success-dark { background:rgba(49,165,109,0.28);color:#F9F9F9;border:1px solid rgba(49,165,109,0.35); }
    .ds-callout-warning-dark { background:rgba(217,139,29,0.28);color:#F9F9F9;border:1px solid rgba(217,139,29,0.35); }

    /* ── Badge / Status ── */
    .ds-badge { display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;letter-spacing:0.03em; }
    .ds-badge.success  { background:rgba(49,165,109,0.14);color:#31A56D; }
    .ds-badge.warning  { background:rgba(217,139,29,0.14);color:#D98B1D; }
    .ds-badge.danger   { background:rgba(209,35,41,0.14);color:#D12329; }
    .ds-badge.info     { background:rgba(99,96,216,0.14);color:#8F8DDE; }
    .ds-badge.neutral  { background:rgba(255,255,255,0.07);color:var(--shell-text-muted); }
    .ds-badge.caution  { background:rgba(205,185,0,0.14);color:#CDB900; }
    html.theme-light .ds-badge.neutral { background:#F0F0F0;color:#6E6E6E; }
    .ds-badge.dot::before { content:'';width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0; }
    .ds-status-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0; }
    .ds-status-dot.success { background:#31A56D;box-shadow:0 0 0 3px rgba(49,165,109,0.2); }
    .ds-status-dot.warning { background:#D98B1D;box-shadow:0 0 0 3px rgba(217,139,29,0.2);animation:ds-pulse 2s infinite; }
    .ds-status-dot.danger  { background:#D12329;box-shadow:0 0 0 3px rgba(209,35,41,0.2);animation:ds-pulse 1.4s infinite; }
    @keyframes ds-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }

    /* ── Table ── */
    .ds-table-wrap { width:100%;overflow-x:auto; }
    .ds-table { width:100%;border-collapse:collapse;font-size:13px; }
    .ds-th,.ds-table th { padding:8px 16px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--shell-text-muted);background:var(--table-th-bg);border-bottom:1px solid var(--shell-border);white-space:nowrap; }
    .ds-td,.ds-table td { padding:12px 16px;border-bottom:1px solid var(--table-border);color:var(--shell-text-2);vertical-align:middle; }
    .ds-table tbody tr:last-child .ds-td,.ds-table tbody tr:last-child td { border-bottom:none; }
    .ds-table tbody tr:hover .ds-td,.ds-table tbody tr:hover td { background:var(--shell-hover); }
    .ds-table-action { background:none;border:none;cursor:pointer;color:var(--shell-text-muted);padding:4px;border-radius:4px; }
    .ds-table-action:hover { color:var(--shell-text);background:var(--shell-hover); }

    /* ── Pagination ── */
    .ds-pagination { display:flex;align-items:center;gap:4px;flex-wrap:wrap; }
    .ds-page-btn { min-width:32px;height:32px;border-radius:44px;border:1px solid var(--shell-border);background:var(--card-bg);color:var(--shell-text-2);cursor:pointer;font-size:13px;font-family:inherit;padding:0 6px;display:flex;align-items:center;justify-content:center;transition:all 120ms; }
    .ds-page-btn:hover { background:var(--shell-hover);color:var(--shell-text); }
    .ds-page-btn.active { background:var(--shell-accent);color:#fff;border-color:var(--shell-accent);font-weight:600; }
    .ds-page-btn:disabled { opacity:.3;cursor:not-allowed;pointer-events:none; }

    /* ── Breadcrumb ── */
    .ds-breadcrumb { display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:13px; }
    .ds-breadcrumb a { color:var(--shell-text-muted);text-decoration:none; }
    .ds-breadcrumb a:hover { color:var(--shell-accent); }
    .ds-breadcrumb-sep { color:var(--shell-text-faint);font-size:14px; }
    .ds-breadcrumb-current { color:var(--shell-text);font-weight:500; }

    /* ── Modal ── */
    .ds-modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.7);display:none;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(2px); }
    .ds-modal-overlay.open { display:flex; }
    .ds-modal { background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;width:100%;max-width:440px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px rgba(0,0,0,.5);animation:ds-modal-in 150ms ease; }
    @keyframes ds-modal-in { from{opacity:0;transform:scale(.96) translateY(8px)} to{opacity:1;transform:none} }
    .ds-modal-header { display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px;border-bottom:1px solid var(--shell-border); }
    .ds-modal-title { font-size:14px;font-weight:600;color:var(--shell-text); }
    .ds-modal-close { width:28px;height:28px;border-radius:6px;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);display:flex;align-items:center;justify-content:center; }
    .ds-modal-close:hover { background:var(--shell-hover);color:var(--shell-text); }
    .ds-modal-body { padding:20px; }
    .ds-modal-footer { padding:14px 20px;border-top:1px solid var(--shell-border);display:flex;justify-content:flex-end;gap:8px; }

    /* ── Filter Bar ── */
    .ds-filter-bar { display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
    .ds-filter-count-btn { display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:44px;background:var(--ctrl-bg);border:1px solid var(--ctrl-border);color:#504bb8;font-size:14px;font-weight:500;cursor:pointer;white-space:nowrap;transition:background .12s; }
    .ds-filter-count-btn:hover { background:var(--ctrl-hover); }
    .ds-filter-count { background:#e0dff7;color:var(--shell-accent);border-radius:60px;padding:1px 5px;font-size:12px;min-width:18px;text-align:center;font-weight:500; }
    .ds-filter-btn { display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:44px;background:#e0dff7;color:#504bb8;font-size:14px;font-weight:500;border:none;cursor:pointer;white-space:nowrap;transition:background .12s; }
    .ds-filter-btn:hover { background:#d4d2f5; }
    .ds-filter-btn.active { background:var(--shell-accent);color:#fff; }
    .ds-active-filters-wrap { position:relative; }
    .ds-active-filters-popover { display:none;position:absolute;top:calc(100% + 8px);left:0;z-index:250;background:var(--card-bg);border:1px solid var(--shell-border);border-radius:4px;padding:14px;min-width:340px;box-shadow:0 8px 28px rgba(0,0,0,.22); }
    .ds-active-filters-wrap:hover .ds-active-filters-popover { display:block; }
    .ds-active-filters-popover-title { font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--shell-text-muted);margin-bottom:10px; }
    .ds-filter-chips { display:flex;align-items:center;gap:8px;flex-wrap:wrap; }
    .ds-filter-chip { display:flex;align-items:center;gap:4px;background:#f4f4f5;border-radius:4px;padding:4px 8px;font-size:12px; }
    html.theme-light .ds-filter-chip { background:#f0f0f0; }
    .ds-chip-key { color:#5f5f6e;font-weight:500;white-space:nowrap; }
    .ds-chip-value { background:var(--ctrl-bg);border-radius:4px;padding:3px 8px;color:var(--shell-text);white-space:nowrap; }
    .ds-chip-close { background:var(--ctrl-bg);border:1px solid var(--ctrl-border);border-radius:10px;width:18px;height:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;color:var(--shell-text-muted);line-height:1;padding:0; }
    .ds-chip-close:hover { color:var(--shell-text); }

    /* ── Side Drawer Panel ── */
    .ds-panel-overlay { display:none;position:fixed;inset:0;background:rgba(0,0,0,.32);z-index:300; }
    .ds-panel-overlay.open { display:block; }
    .ds-panel { position:fixed;top:0;right:0;bottom:0;width:360px;background:var(--card-bg);border-left:1px solid var(--card-border);border-radius:4px 0 0 4px;display:flex;flex-direction:column;z-index:301;transform:translateX(100%);transition:transform .25s ease; }
    .ds-panel.open { transform:translateX(0); }
    .ds-panel-header { display:flex;align-items:center;gap:8px;padding:14px 16px 13px;flex-shrink:0;border-bottom:1px solid var(--card-border); }
    .ds-panel-title { flex:1;font-size:14px;font-weight:600;color:var(--shell-text); }
    .ds-panel-body { flex:1;overflow-y:auto;padding:16px; }
    .ds-panel-footer { border-top:1px solid var(--card-border);padding:14px 16px;display:flex;gap:8px;flex-shrink:0; }

    /* ── Nav hover states ── */
    .nav-row { transition:background .12s,color .12s; }
    .nav-row:hover { background:#f5f5f5 !important; }
    .nav-row:hover .nav-lbl { color:#101010 !important; }
    .nav-row:hover svg { stroke:#101010 !important; }
    .nav-sub { transition:background .12s,color .12s; }
    .nav-sub:hover { background:#f5f5f5 !important; }
    .nav-sub:hover .nav-lbl { color:#6360d8 !important; }
    .nav-sub:hover svg { stroke:#6360d8 !important; }
    /* Dark theme nav hovers */
    html:not(.theme-light) .nav-row:hover { background:rgba(255,255,255,0.06) !important; }
    html:not(.theme-light) .nav-row:hover .nav-lbl { color:#F9F9F9 !important; }
    html:not(.theme-light) .nav-row:hover svg { stroke:#F9F9F9 !important; }
    html:not(.theme-light) .nav-sub:hover { background:rgba(255,255,255,0.06) !important; }
    html:not(.theme-light) .nav-sub:hover .nav-lbl { color:#8F8DDE !important; }
    html:not(.theme-light) .nav-sub:hover svg { stroke:#8F8DDE !important; }

    /* ── Icon button ── */
    .ds-icon-btn { display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;border:none;background:transparent;color:var(--shell-text-muted);cursor:pointer;transition:background .12s,color .12s;flex-shrink:0; }
    .ds-icon-btn:hover { background:var(--shell-hover);color:var(--shell-text); }

    /* ── Tabs ── */
    .ds-tabs-list { display:flex;border-bottom:1px solid var(--shell-border); }
    .ds-tab { padding:8px 16px;font-size:13px;font-weight:500;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);border-bottom:2px solid transparent;margin-bottom:-1px;font-family:inherit;transition:color 150ms,border-color 150ms;white-space:nowrap; }
    .ds-tab:hover { color:var(--shell-text); }
    .ds-tab.active { color:var(--shell-accent);border-bottom-color:var(--shell-accent);font-weight:600; }
    .ds-tab-panel { display:none;padding:20px; }
    .ds-tab-panel.active { display:block; }

    /* ── Tooltip ── */
    .ds-tooltip-wrap { position:relative;display:inline-flex; }
    .ds-tooltip-wrap::after { content:attr(data-tip);position:absolute;z-index:150;pointer-events:none;background:#1a1a1a;color:#F9F9F9;border:1px solid #272727;border-radius:4px;padding:4px 8px;font-size:12px;max-width:220px;white-space:normal;opacity:0;transition:opacity 150ms,transform 150ms; }
    html.theme-light .ds-tooltip-wrap::after { background:#1c1c1c;color:#f0f0f0; }
    .ds-tooltip-wrap[data-pos="top"]::after    { bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(4px); }
    .ds-tooltip-wrap[data-pos="bottom"]::after { top:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(-4px); }
    .ds-tooltip-wrap[data-pos="right"]::after  { left:calc(100% + 8px);top:50%;transform:translateY(-50%) translateX(-4px); }
    .ds-tooltip-wrap[data-pos="left"]::after   { right:calc(100% + 8px);top:50%;transform:translateY(-50%) translateX(4px); }
    .ds-tooltip-wrap:hover::after { opacity:1; }
    .ds-tooltip-wrap[data-pos="top"]:hover::after    { transform:translateX(-50%) translateY(0); }
    .ds-tooltip-wrap[data-pos="bottom"]:hover::after { transform:translateX(-50%) translateY(0); }
    .ds-tooltip-wrap[data-pos="right"]:hover::after  { transform:translateY(-50%) translateX(0); }
    .ds-tooltip-wrap[data-pos="left"]:hover::after   { transform:translateY(-50%) translateX(0); }

    /* ── Nav Collapse ── */
    .nav-lbl { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:140px; }
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
  </style>
</head>
<body>

  <!-- ── TOPBAR — always #131313, never changes with theme ── -->
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

  <!-- ── SHELL: sidebar + content ── -->
  <div style="display:flex;flex:1;overflow:hidden;">

    <!-- ── LEFT NAV — collapsible to 52px icon rail ── -->
    <nav id="shell-nav" style="width:220px;background:#fff;border-right:0.5px solid #d8d9dd;overflow-y:auto;flex-shrink:0;display:flex;flex-direction:column;padding:16px;gap:0;">

      <!-- Nav header: blue accent bottom border -->
      <div class="nav-hdr" style="display:flex;align-items:flex-start;justify-content:space-between;padding:0 8px 8px 12px;border-bottom:1px solid #467fcd;margin-bottom:12px;flex-shrink:0;">
        <div class="nav-hdr-info">
          <!-- DO NOT CHANGE: nav header is always fixed — only nav items change per page -->
          <div style="display:flex;align-items:center;gap:4px;font-size:14px;font-weight:500;color:#101010;">
            Prevalent AI
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style="font-size:12px;color:#6e6e6e;margin-top:2px;">Exposure Management</div>
        </div>
        <!-- Collapse toggle button -->
        <button id="shell-nav-btn" onclick="shellNavToggle()" style="background:none;border:none;color:#6e6e6e;padding:0;display:flex;align-items:center;cursor:pointer;" title="Collapse sidebar">
          <svg id="shell-nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 8 11 12 15 16"/></svg>
        </button>
      </div>

      <!-- Nav items: gap:12px between each -->
      <div style="display:flex;flex-direction:column;gap:12px;flex:1;">

        <!-- Default nav item — icon + label left, chevron right -->
        <div class="nav-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;cursor:pointer;color:#6e6e6e;">
          <div style="display:flex;align-items:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span class="nav-lbl" style="font-size:14px;font-weight:400;">Home</span>
          </div>
          <svg class="nav-chev" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        <!-- Expanded section — grey bg #f5f5f5, chevron up, grey text — only active child gets blue -->
        <div>
          <div class="nav-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;background:#f5f5f5;cursor:pointer;color:#6e6e6e;">
            <div style="display:flex;align-items:center;gap:8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span class="nav-lbl" style="font-size:14px;font-weight:400;">Section Name</span>
            </div>
            <svg class="nav-chev" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
          </div>
          <!-- Active sub-item: indent 30px, #6360d8 + bg tint. In collapsed rail: ONLY this icon shows in accent color -->
          <a href="#" class="nav-sub nav-active" style="display:flex;align-items:center;gap:4px;padding:8px 8px 8px 30px;text-decoration:none;background:rgba(99,96,216,0.08);border-radius:6px;color:#6360d8;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="9" height="9" rx="1"/><rect x="13" y="3" width="9" height="9" rx="1"/><rect x="2" y="14" width="9" height="9" rx="1"/></svg>
            <span class="nav-lbl" style="font-size:14px;font-weight:400;">Active Sub Item</span>
          </a>
          <!-- Default sub-item: hidden in collapsed rail -->
          <a href="#" class="nav-sub" style="display:flex;align-items:center;gap:4px;padding:8px 8px 8px 30px;text-decoration:none;color:#6e6e6e;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
            <span class="nav-lbl" style="font-size:14px;font-weight:400;">Default Sub Item</span>
          </a>
        </div>

      </div>
    </nav>

    <!-- ── CONTENT AREA ── -->
    <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">

      <!-- Sticky content sub-header (white, rounded bottom corners) -->
      <div style="position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e6e6e6;border-radius:0 0 8px 8px;padding:12px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <!-- Page title + breadcrumb -->
        <div style="min-width:0;">
          <div style="font-size:12px;font-weight:500;color:#101010;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Page Title</div>
          <div style="font-size:11px;color:#9ca3af;display:flex;align-items:center;gap:4px;white-space:nowrap;">
            <span>Dashboard</span><span>›</span><span>Section</span><span>›</span>
            <span style="color:#6360D8;">Current Page</span>
          </div>
        </div>
        <!-- Explore in dropdown pill -->
        <button style="background:none;border:1px solid #e6e6e6;border-radius:44px;color:#6e6e6e;font-size:12px;padding:8px 14px;display:flex;align-items:center;gap:6px;white-space:nowrap;flex-shrink:0;">
          Explore in <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <span style="flex:1;"></span>
        <!-- Add / primary CTA (purple circle) -->
        <button style="width:32px;height:32px;border-radius:50%;background:#6360D8;border:none;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <!-- Active Filters pill — hover shows popover with applied filter chips -->
        <!-- Replace the 3 filter chip values with filters actually active on this page -->
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
                <span style="font-size:10px;color:#9ca3af;">+</span>
                <span style="background:#fff;border-radius:4px;padding:1px 6px;color:#101010;">High</span>
                <button onclick="event.stopPropagation();this.closest('div[style]').remove()" style="background:none;border:none;cursor:pointer;color:#9ca3af;font-size:13px;padding:0 2px;line-height:1;border-radius:0;">×</button>
              </div>
              <div style="display:inline-flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px;border:1px solid #e6e6e6;">
                <span style="color:#6e6e6e;font-weight:500;">Status</span>
                <span style="background:#fff;border-radius:4px;padding:1px 6px;color:#101010;">Open</span>
                <button onclick="event.stopPropagation();this.closest('div[style]').remove()" style="background:none;border:none;cursor:pointer;color:#9ca3af;font-size:13px;padding:0 2px;line-height:1;border-radius:0;">×</button>
              </div>
              <div style="display:inline-flex;align-items:center;gap:6px;background:#f5f5f5;border-radius:8px;padding:4px 8px;font-size:12px;border:1px solid #e6e6e6;">
                <span style="color:#6e6e6e;font-weight:500;">Asset Group</span>
                <span style="background:#fff;border-radius:4px;padding:1px 6px;color:#101010;">Production</span>
                <button onclick="event.stopPropagation();this.closest('div[style]').remove()" style="background:none;border:none;cursor:pointer;color:#9ca3af;font-size:13px;padding:0 2px;line-height:1;border-radius:0;">×</button>
              </div>
            </div>
            <button style="margin-top:10px;background:none;border:none;font-size:12px;font-weight:500;color:#6360D8;cursor:pointer;padding:0;font-family:inherit;border-radius:0;">Clear all filters</button>
          </div>
        </div>
        <div style="width:1px;height:20px;background:#e6e6e6;flex-shrink:0;"></div>
        <!-- Filter pill (light purple bg) -->
        <button style="background:#e0dff7;border:none;border-radius:44px;color:#504bb8;font-size:12px;font-weight:500;padding:8px 14px;flex-shrink:0;">Filter</button>
      </div>

      <!-- Main content body — starts DIRECTLY with page content. NO h1/heading/description below sub-header -->
      <div style="flex:1;padding:24px;background:#F7F9FC;">
        <!-- Page content goes here -->
      </div>

    </div>
  </div>

  <!-- Nav Collapse JS (required) -->
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
  </script>

  <!-- SVG gradient definitions (used by t-special button icon) -->
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

---

## Key Shell Rules

- **Topbar** is always `background:#131313` — never changes with theme
- **Navigator button** (topbar, right side): always `class="ds-btn sz-sm t-special"` with `<span class="btn-text">Navigator</span>` inside — gradient text, `border:1px solid #b1b8f5`, pill shape
- **Left nav** is always 220px wide, `background:#fff`, `border-right:0.5px solid #d8d9dd`
- **Nav header** at top of nav: dashboard name with dropdown chevron + collapse icon + subtitle
- **Active sub-item** (leaf only): `color:#6360D8`, `background:rgba(99,96,216,0.08)`, `border-radius:6px`
- **Expanded parent**: `background:#f5f5f5`, text/icon stays `#6e6e6e` — never blue
- **Sub-items**: indent `padding-left:30px`, `font-size:14px`, `color:#6e6e6e`
- **Sticky sub-header**: white card, `border-radius:0 0 8px 8px`, `padding:12px 16px`, always at top of content area
- **Breadcrumb**: `gap:4px` between segments, last segment always `color:#6360D8`
- **Active Filters pill**: `border:1px solid #504bb8`, `color:#504bb8` with count badge, `padding:8px 14px` (min 32px height). Hover reveals a popover showing 2–3 applied filter chips (key + value). Replace chip values with filters actually active on the page. Chips use the same inline chip style: `background:#f5f5f5`, `border-radius:8px`, `padding:4px 8px`. Use `onmouseenter/onmouseleave` on the wrapper `<div>` to show/hide. Always include "Clear all filters" link at the bottom of the popover.
- **Filter pill**: `background:#e0dff7`, `color:#504bb8`, `border-radius:44px`
- **Content body**: `background:#F7F9FC`, `padding:24px` — content starts DIRECTLY here, no extra h1/description

---

## Nav Icon Paths

Replace the `<path>` content in the SVG wrapper `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2">` with the path below:

| Section | SVG path content |
|---------|-----------------|
| Risk Overview / Dashboard | `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>` |
| Findings / Vulnerabilities | `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>` |
| Assets | `<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>` |
| Reports / Documents | `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>` |
| Settings | `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>` |
| Users / Identity | `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>` |
| Integrations | `<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>` |
| Scan / Activity | `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>` |

**KPI card icons** — `width:16px; height:16px; color:var(--shell-text-muted)`:

| Metric | SVG path content |
|--------|-----------------|
| Risk Score | `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` |
| Critical Findings | `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>` |
| Assets at Risk | `<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>` |
| Remediation Rate | `<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>` |
| Exposure Score | `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>` |
