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
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #F7F9FC; color: #101010; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
    a { text-decoration: none; }
    button { font-family: inherit; cursor: pointer; border-radius: 44px; }

    /* ── IMPORTANT: Paste the full Required CSS Classes block from components.md after this line ── */

    /* ── Navigator (t-special) button — always in topbar ── */
    .ds-btn { display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;border-radius:44px;font-family:inherit;transition:background 150ms,border-color 150ms;white-space:nowrap;user-select:none;line-height:1; }
    .ds-btn.sz-sm { height:32px;padding:0 12px;font-size:13px;font-weight:500; }
    .ds-btn.t-special { background:transparent;border:1px solid #b1b8f5; }
    .ds-btn.t-special .btn-text { background:linear-gradient(to right,#467fcd,#47adcb);-webkit-background-clip:text;background-clip:text;color:transparent; }
    .ds-btn.t-special:hover { background:rgba(177,184,245,0.12); }

    /* ── Nav Collapse CSS (required) ── */
    #shell-nav { transition: width 0.22s ease, padding 0.22s ease; }
    #shell-nav.nav-collapsed { width: 52px !important; padding: 16px 8px !important; overflow: hidden; }
    #shell-nav.nav-collapsed .nav-hdr-info { display: none; }
    #shell-nav.nav-collapsed .nav-hdr { flex-direction: column; align-items: center; border-bottom: none !important; padding-bottom: 6px; margin-bottom: 0; }
    #shell-nav.nav-collapsed .nav-row { justify-content: center; }
    #shell-nav.nav-collapsed .nav-lbl { display: none; }
    #shell-nav.nav-collapsed .nav-chev { display: none; }
    #shell-nav.nav-collapsed .nav-sub { display: none; }
    #shell-nav.nav-collapsed .nav-sub.nav-active { display: flex; justify-content: center; padding: 7px 8px !important; background: rgba(99,96,216,0.08); border-radius: 6px; }
    #shell-nav.nav-collapsed .nav-sub.nav-active .nav-lbl { display: none; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover { width: 220px !important; padding: 16px !important; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-hdr-info { display: block; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-hdr { flex-direction: row; align-items: flex-start; border-bottom: 1px solid #467fcd !important; padding-bottom: 8px; margin-bottom: 12px; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-row { justify-content: space-between; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-lbl { display: flex; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-chev { display: block; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub { display: flex; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub.nav-active { padding: 8px 8px 8px 30px !important; }
    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub.nav-active .nav-lbl { display: flex; }
  </style>
</head>
<body>

  <!-- ── TOPBAR — always #131313, never changes with theme ── -->
  <div style="height:52px;background:#131313;border-bottom:1px solid #272727;display:flex;align-items:center;padding:0 16px;gap:12px;flex-shrink:0;z-index:100;">
    <img src="https://anthu211.github.io/design-system-2.0/icons/pai-logo.svg" style="height:26px;" alt="Prevalent AI">
    <span style="flex:1;"></span>
    <span style="font-size:12px;color:#9ca3af;">Last Updated: 2h ago</span>
    <button style="background:none;border:none;color:#9ca3af;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
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
          <div style="display:flex;align-items:center;gap:4px;font-size:14px;font-weight:500;color:#101010;">
            Dashboard Name
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style="font-size:12px;color:#6e6e6e;margin-top:2px;">Module / Product Area</div>
        </div>
        <!-- Collapse toggle button -->
        <button id="shell-nav-btn" onclick="shellNavToggle()" style="background:none;border:none;color:#6e6e6e;padding:0;display:flex;align-items:center;cursor:pointer;" title="Collapse sidebar">
          <svg id="shell-nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 8 11 12 15 16"/></svg>
        </button>
      </div>

      <!-- Nav items: gap:12px between each -->
      <div style="display:flex;flex-direction:column;gap:12px;flex:1;">

        <!-- Default nav item — icon + label left, chevron right -->
        <div class="nav-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;background:#fff;cursor:pointer;">
          <div style="display:flex;align-items:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span class="nav-lbl" style="display:flex;font-size:14px;color:#6e6e6e;font-weight:400;">Home</span>
          </div>
          <svg class="nav-chev" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>

        <!-- Expanded section — grey bg #f5f5f5, chevron up, grey text — only active child gets blue -->
        <div>
          <div class="nav-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;background:#f5f5f5;cursor:pointer;">
            <div style="display:flex;align-items:center;gap:8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span class="nav-lbl" style="display:flex;font-size:14px;color:#6e6e6e;font-weight:400;">Section Name</span>
            </div>
            <svg class="nav-chev" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
          </div>
          <!-- Active sub-item: indent 30px, #6360d8 + bg tint. In collapsed rail: ONLY this icon shows in accent color -->
          <a href="#" class="nav-sub nav-active" style="display:flex;align-items:center;gap:4px;padding:8px 8px 8px 30px;text-decoration:none;background:rgba(99,96,216,0.08);border-radius:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6360d8" stroke-width="2"><rect x="2" y="3" width="9" height="9" rx="1"/><rect x="13" y="3" width="9" height="9" rx="1"/><rect x="2" y="14" width="9" height="9" rx="1"/></svg>
            <span class="nav-lbl" style="display:flex;font-size:14px;color:#6360d8;font-weight:400;">Active Sub Item</span>
          </a>
          <!-- Default sub-item: hidden in collapsed rail -->
          <a href="#" class="nav-sub" style="display:flex;align-items:center;gap:4px;padding:8px 8px 8px 30px;text-decoration:none;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
            <span class="nav-lbl" style="display:flex;font-size:14px;color:#6e6e6e;font-weight:400;">Default Sub Item</span>
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
