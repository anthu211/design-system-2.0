# Prevalent AI — UI Design System Specification
**Version 2.0 · Organization-wide standard for all AI-generated dashboards**

Read this entire document before generating any UI. Every component, token, and layout must conform to this spec.

---

## Visual Identity

- **Font:** Inter (load from Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`)
- **Accent color:** `#6360D8` (purple-blue — used for CTA buttons, active states, links, focus rings)
- **Default theme:** Light. Dark theme is opt-in — remove class `theme-light` from `<html>` for dark.
- **Topbar:** Always `background: #131313`, white logo — never changes with theme switching.
- **Border radius scale:** inputs `8px`, cards `12px`, **buttons `44px` (always pill-shaped)**
- **Spacing unit:** 4px base — use multiples: 4, 8, 12, 16, 20, 24, 32, 48

---

## Design Tokens

All values are CSS custom properties. Use these names consistently so dark/light switching works.

### Dark Theme
```
--shell-bg: #0E0E0E
--shell-sidebar: #131313
--shell-border: #272727
--shell-text: #F9F9F9
--shell-text-2: #D1D1D1
--shell-text-muted: #696969
--shell-text-faint: #3B3A3A
--shell-accent: #6360D8
--shell-hover: rgba(255,255,255,0.04)
--shell-active: rgba(99,96,216,0.12)
--shell-raised: #1a1a1a
--shell-elevated: #1F1F1F
--ctrl-bg: #1a1a1a
--ctrl-border: #3B3A3A
--ctrl-text: #F9F9F9
--ctrl-placeholder: #696969
--ctrl-hover: #242424
--card-bg: #131313
--card-border: #272727
--table-th-bg: #131313
--table-border: #1F1F1F
```

### Light Theme — DEFAULT (html.theme-light overrides)
```
--shell-bg: #F7F9FC
--shell-sidebar: #FFFFFF
--shell-border: #E6E6E6
--shell-text: #101010
--shell-text-2: #282828
--shell-text-muted: #6E6E6E
--shell-accent: #6360D8
--shell-hover: rgba(0,0,0,0.04)
--shell-active: rgba(99,96,216,0.08)
--shell-raised: #F5F5F5
--shell-elevated: #EFEFEF
--ctrl-bg: #FFFFFF
--ctrl-border: #CFCFCF
--ctrl-text: #282828
--ctrl-placeholder: #9CA3AF
--ctrl-hover: #F5F5F5
--card-bg: #FFFFFF
--card-border: #E6E6E6
--table-th-bg: #F5F5F5
--table-border: #E6E6E6
```

---

## Page Shell

**This is the mandatory standard structure for every Prevalent AI dashboard.** Copy this template exactly — topbar is always `#131313`, left nav is 220px white, content has a sticky sub-header with breadcrumb and CTAs.

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
    <button style="background:linear-gradient(to right,#467fcd,#47adcb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;border:1px solid #b1b8f5;border-radius:44px;font-size:12px;font-weight:500;padding:5px 14px;font-family:inherit;cursor:pointer;">Navigator</button>
  </div>

  <!-- ── SHELL: sidebar + content ── -->
  <div style="display:flex;flex:1;overflow:hidden;">

    <!-- ── LEFT NAV — collapsible to 52px icon rail ── -->
    <!-- Collapsed: hides labels/chevrons/header info, shows only active sub-item icon in accent color -->
    <!-- Hover expands when collapsed (unless just click-collapsed — lock clears on mouseleave) -->
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
      <div style="position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e6e6e6;border-radius:0 0 8px 8px;padding:10px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
        <!-- Page title + breadcrumb -->
        <div style="min-width:0;">
          <div style="font-size:12px;font-weight:500;color:#101010;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Page Title</div>
          <div style="font-size:11px;color:#9ca3af;display:flex;align-items:center;gap:3px;white-space:nowrap;">
            <span>Dashboard</span><span>›</span><span>Section</span><span>›</span>
            <span style="color:#6360D8;">Current Page</span>
          </div>
        </div>
        <!-- Explore in dropdown pill -->
        <button style="background:none;border:1px solid #e6e6e6;border-radius:44px;color:#6e6e6e;font-size:12px;padding:5px 14px;display:flex;align-items:center;gap:6px;white-space:nowrap;flex-shrink:0;">
          Explore in <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <span style="flex:1;"></span>
        <!-- Add / primary CTA (purple circle) -->
        <button style="width:32px;height:32px;border-radius:50%;background:#6360D8;border:none;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <!-- Active Filters pill (outline #504bb8) -->
        <button style="background:none;border:1px solid #504bb8;border-radius:44px;color:#504bb8;font-size:12px;font-weight:500;padding:5px 14px;display:flex;align-items:center;gap:6px;flex-shrink:0;">
          Active Filters
          <span style="background:#504bb8;color:#fff;font-size:10px;font-weight:600;min-width:16px;height:16px;border-radius:44px;display:flex;align-items:center;justify-content:center;padding:0 4px;">3</span>
        </button>
        <div style="width:1px;height:20px;background:#e6e6e6;flex-shrink:0;"></div>
        <!-- Filter pill (light purple bg) -->
        <button style="background:#e0dff7;border:none;border-radius:44px;color:#504bb8;font-size:12px;font-weight:500;padding:5px 14px;flex-shrink:0;">Filter</button>
      </div>

      <!-- Main content body -->
      <div style="flex:1;padding:24px;background:#F7F9FC;">
        <!-- Page content goes here -->
      </div>

    </div>
  </div>

</body>
</html>
```

### Key Shell Rules
- **Topbar** is always `background:#131313` — never changes with theme
- **Left nav** is always 220px wide, `background:#fff`, `border-right:0.5px solid #d8d9dd`
- **Section header** at top of nav: section title with dropdown chevron + collapse icon + subtitle
- **Active sub-item** (leaf only — parent section stays grey): `color:#6360D8`, `background:rgba(99,96,216,0.08)`, `border-radius:6px`
- **Expanded parent**: `background:#f5f5f5`, text/icon stays `#6e6e6e` — never blue
- **Sub-items**: indent `padding-left:30px`, `font-size:14px`, `color:#6e6e6e`
- **Sticky sub-header**: white card, `border-radius:0 0 8px 8px`, `border-bottom:1px solid #e6e6e6` — always shown at top of content area
- **Breadcrumb**: last segment always `color:#6360D8`
- **Active Filters pill**: `border:1px solid #504bb8`, `color:#504bb8` with count badge
- **Filter pill**: `background:#e0dff7`, `color:#504bb8`, `border-radius:44px`
- **Content body**: `background:#F7F9FC`, `padding:24px`
- **Collapsible nav**: clicking the collapse button shrinks nav to 52px icon rail — all labels/chevrons hide; only the active sub-item icon shows in accent color `#6360d8` + `rgba(99,96,216,0.08)` bg; hover re-expands when collapsed

### Nav Collapse CSS (required in `<style>`)
```css
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
```

### Nav Collapse JS (required before `</body>`)
```html
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
```

---

## Components

### Navigation Item

Each item is `justify-content:space-between` — icon+label on the left, chevron always on the right.

```html
<!-- Default nav item -->
<div style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;background:#fff;cursor:pointer;">
  <div style="display:flex;align-items:center;gap:8px;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><!-- icon --></svg>
    <span style="font-size:14px;color:#6e6e6e;font-weight:400;">Nav Item</span>
  </div>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
</div>

<!-- Expanded section — grey bg #f5f5f5, chevron flips up, GREY text — parent never gets blue -->
<div style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;background:#f5f5f5;cursor:pointer;">
  <div style="display:flex;align-items:center;gap:8px;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><!-- icon --></svg>
    <span style="font-size:14px;color:#6e6e6e;font-weight:400;">Section Name</span>
  </div>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
</div>

<!-- Active sub-item: indent 30px, color #6360d8, bg tint — ONLY this gets blue, parent stays grey -->
<a href="#" style="display:flex;align-items:center;gap:8px;padding:8px 8px 8px 30px;text-decoration:none;background:rgba(99,96,216,0.08);border-radius:6px;">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6360d8" stroke-width="2"><!-- icon --></svg>
  <span style="font-size:14px;color:#6360d8;font-weight:400;">Active Sub Item</span>
</a>

<!-- Default sub-item -->
<a href="#" style="display:flex;align-items:center;gap:8px;padding:8px 8px 8px 30px;text-decoration:none;">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><!-- icon --></svg>
  <span style="font-size:14px;color:#6e6e6e;font-weight:400;">Sub Item</span>
</a>
```

---

### Page Header
```html
<div style="margin-bottom:28px;">
  <h1 style="font-size:22px;font-weight:700;color:var(--shell-text);margin:0 0 6px;">Page Title</h1>
  <p style="font-size:13px;color:var(--shell-text-muted);margin:0;">Page description or subtitle.</p>
</div>
```

---

### Card
```html
<div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;overflow:hidden;">
  <div style="padding:12px 16px;border-bottom:1px solid var(--card-border);font-size:13px;font-weight:600;color:var(--shell-text);">Card Title</div>
  <div style="padding:16px;">
    <!-- card body content -->
  </div>
</div>
```

---

### Buttons

**All buttons use `border-radius:44px` (pill shape) — this is the standard. Never use 6px on buttons.**

```html
<!-- Primary (CTA) — pill -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:#6360D8;color:#fff;border:none;border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">
  Label
</button>

<!-- Primary Special — gradient text pill (use for Navigator, hero CTAs) -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:linear-gradient(to right,#467fcd,#47adcb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;border:1px solid #b1b8f5;border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">
  Label
</button>

<!-- Outline — pill -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:transparent;color:#6360D8;border:1px solid #6360D8;border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">
  Label
</button>

<!-- Outline neutral — pill -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:transparent;color:var(--shell-text);border:1px solid var(--ctrl-border);border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">
  Label
</button>

<!-- Ghost / text -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:transparent;color:var(--shell-text-muted);border:none;border-radius:44px;font-size:13px;font-weight:400;font-family:inherit;cursor:pointer;">
  Label
</button>

<!-- Small — pill -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:5px 14px;background:#6360D8;color:#fff;border:none;border-radius:44px;font-size:12px;font-weight:500;font-family:inherit;cursor:pointer;">Label</button>

<!-- Large — pill -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:11px 28px;background:#6360D8;color:#fff;border:none;border-radius:44px;font-size:14px;font-weight:500;font-family:inherit;cursor:pointer;">Label</button>

<!-- Icon-only circle button -->
<button style="width:32px;height:32px;padding:0;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:1px solid var(--ctrl-border);border-radius:50%;cursor:pointer;color:var(--shell-text-muted);">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><!-- icon --></svg>
</button>

<!-- Icon-only circle CTA (accent) -->
<button style="width:32px;height:32px;padding:0;display:inline-flex;align-items:center;justify-content:center;background:#6360D8;border:none;border-radius:50%;cursor:pointer;color:#fff;">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
</button>
```

---

### Text Input
```html
<!-- Standard -->
<div style="display:flex;align-items:center;border:1px solid var(--ctrl-border);border-radius:8px;background:var(--ctrl-bg);padding:0 10px;height:36px;gap:6px;">
  <input type="text" placeholder="Placeholder…" style="flex:1;background:none;border:none;outline:none;color:var(--ctrl-text);font-size:13px;font-family:inherit;">
</div>

<!-- With search icon -->
<div style="display:flex;align-items:center;border:1px solid var(--ctrl-border);border-radius:8px;background:var(--ctrl-bg);padding:0 10px;height:36px;gap:6px;">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--shell-text-muted)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  <input type="text" placeholder="Search…" style="flex:1;background:none;border:none;outline:none;color:var(--ctrl-text);font-size:13px;font-family:inherit;">
</div>

<!-- Pill search input -->
<div style="display:flex;align-items:center;border:1px solid var(--ctrl-border);border-radius:60px;background:var(--ctrl-bg);padding:0 12px;height:34px;gap:6px;">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--shell-text-muted)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  <input type="text" placeholder="Search…" style="flex:1;background:none;border:none;outline:none;color:var(--ctrl-text);font-size:13px;font-family:inherit;">
</div>

<!-- Field label -->
<div style="font-size:12px;font-weight:500;color:var(--shell-text-muted);margin-bottom:6px;">Field Label</div>
```

---

### Dropdown / Select
```html
<div style="position:relative;">
  <div onclick="var d=this.nextElementSibling;d.style.display=d.style.display==='block'?'none':'block'"
       style="display:flex;align-items:center;justify-content:space-between;border:1px solid var(--ctrl-border);border-radius:8px;background:var(--ctrl-bg);padding:0 10px;height:36px;cursor:pointer;font-size:13px;color:var(--ctrl-text);user-select:none;">
    <span>Selected Option</span>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  </div>
  <div style="display:none;position:absolute;top:calc(100% + 4px);left:0;right:0;background:var(--ctrl-bg);border:1px solid var(--ctrl-border);border-radius:8px;z-index:50;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.2);">
    <div onclick="this.closest('div[style*=position]').querySelector('span').textContent=this.textContent;this.parentElement.style.display='none'"
         style="padding:8px 12px;font-size:13px;cursor:pointer;color:var(--ctrl-text);">Option A</div>
    <div onclick="this.closest('div[style*=position]').querySelector('span').textContent=this.textContent;this.parentElement.style.display='none'"
         style="padding:8px 12px;font-size:13px;cursor:pointer;color:var(--ctrl-text);">Option B</div>
  </div>
</div>
```

---

### Checkbox & Radio
```html
<!-- Checkbox row -->
<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--shell-text);cursor:pointer;">
  <input type="checkbox" style="width:15px;height:15px;accent-color:#6360D8;cursor:pointer;">
  Label text
</label>

<!-- Radio row -->
<label style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--shell-text);cursor:pointer;">
  <input type="radio" name="group" style="width:15px;height:15px;accent-color:#6360D8;cursor:pointer;">
  Label text
</label>
```

---

### Toggle Switch
```html
<div onclick="var on=this.dataset.on==='1';this.dataset.on=on?'0':'1';this.style.background=on?'var(--ctrl-border)':'#6360D8';this.firstElementChild.style.transform=on?'translateX(2px)':'translateX(18px)'"
     data-on="0"
     style="width:38px;height:22px;border-radius:11px;background:var(--ctrl-border);cursor:pointer;position:relative;transition:background .15s;flex-shrink:0;">
  <div style="position:absolute;top:3px;left:0;width:16px;height:16px;border-radius:50%;background:#fff;transform:translateX(2px);transition:transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.3);"></div>
</div>
<!-- On state: background:#6360D8, data-on="1", translateX(18px) -->
```

---

### Badge / Status Tag

Status badge colors differ between light and dark themes. Always use the correct set for the page theme.

**Light theme (default):**
```html
<!-- Success / Active -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#EFF7ED;color:#1A7D4D;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">
  <span style="width:5px;height:5px;border-radius:50%;background:#31A56D;flex-shrink:0;"></span>Active
</span>

<!-- Danger / Critical -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#F9EEEE;color:#D12329;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Critical</span>

<!-- Warning -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#F2EDDB;color:#D98B1D;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Warning</span>

<!-- Caution / Yellow -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#F7F6EB;color:#CDB900;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Caution</span>

<!-- Neutral / Info -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#F5F5F5;color:#6E6E6E;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Inactive</span>

<!-- Count badge (number pill) -->
<span style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;background:#6360D8;color:#fff;border-radius:20px;font-size:11px;font-weight:600;">4</span>
```

**Dark theme (html without class="theme-light"):**
```html
<!-- Active --> <span style="...background:#192C15;color:#31A56D;...">Active</span>
<!-- Critical --> <span style="...background:#260808;color:#D12329;...">Critical</span>
<!-- Warning --> <span style="...background:#2C2613;color:#D98B1D;...">Warning</span>
<!-- Caution --> <span style="...background:#514B09;color:#CDB900;...">Caution</span>
```

---

### Data Table
```html
<div style="border:1px solid var(--card-border);border-radius:12px;overflow:hidden;">
  <table style="width:100%;border-collapse:collapse;font-size:13px;">
    <thead>
      <tr>
        <th style="background:var(--table-th-bg,var(--shell-raised));padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--shell-text-muted);letter-spacing:.04em;text-transform:uppercase;border-bottom:1px solid var(--card-border);white-space:nowrap;">Column A</th>
        <th style="background:var(--table-th-bg,var(--shell-raised));padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--shell-text-muted);letter-spacing:.04em;text-transform:uppercase;border-bottom:1px solid var(--card-border);white-space:nowrap;">Column B</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid var(--card-border);">
        <td style="padding:10px 14px;color:var(--shell-text);">Value A</td>
        <td style="padding:10px 14px;color:var(--shell-text-muted);">Value B</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

### Tabs
```html
<div style="display:flex;border-bottom:1px solid var(--card-border);margin-bottom:20px;">
  <!-- Active tab -->
  <button onclick="switchTab(this,'tab-one')"
          style="padding:10px 16px;background:none;border:none;border-bottom:2px solid #6360D8;margin-bottom:-1px;font-size:13px;font-weight:600;color:#6360D8;cursor:pointer;font-family:inherit;">
    Tab One
  </button>
  <!-- Inactive tab -->
  <button onclick="switchTab(this,'tab-two')"
          style="padding:10px 16px;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;font-size:13px;font-weight:400;color:var(--shell-text-muted);cursor:pointer;font-family:inherit;">
    Tab Two
  </button>
</div>
<div id="tab-one"><!-- tab one content --></div>
<div id="tab-two" style="display:none;"><!-- tab two content --></div>
<script>
function switchTab(btn, targetId) {
  btn.parentElement.querySelectorAll('button').forEach(function(b) {
    b.style.borderBottomColor = 'transparent';
    b.style.color = 'var(--shell-text-muted)';
    b.style.fontWeight = '400';
  });
  btn.style.borderBottomColor = '#6360D8';
  btn.style.color = '#6360D8';
  btn.style.fontWeight = '600';
  var ids = ['tab-one','tab-two']; // update with actual tab ids
  ids.forEach(function(id) { var el=document.getElementById(id); if(el) el.style.display='none'; });
  var target = document.getElementById(targetId);
  if (target) target.style.display = 'block';
}
</script>
```

---

### Callout / Alert Banner
```html
<!-- Info -->
<div style="display:flex;gap:10px;padding:12px 14px;background:rgba(99,96,216,0.1);border:1px solid rgba(99,96,216,0.25);border-radius:8px;font-size:13px;color:var(--shell-text);">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6360D8" stroke-width="2" style="flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  <span>Informational message goes here.</span>
</div>

<!-- Warning -->
<div style="display:flex;gap:10px;padding:12px 14px;background:rgba(217,139,29,0.1);border:1px solid rgba(217,139,29,0.3);border-radius:8px;font-size:13px;color:var(--shell-text);">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D98B1D" stroke-width="2" style="flex-shrink:0;margin-top:1px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  <span>Warning message goes here.</span>
</div>

<!-- Error / Danger -->
<div style="display:flex;gap:10px;padding:12px 14px;background:rgba(209,35,41,0.08);border:1px solid rgba(209,35,41,0.25);border-radius:8px;font-size:13px;color:var(--shell-text);">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D12329" stroke-width="2" style="flex-shrink:0;margin-top:1px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
  <span>Error message goes here.</span>
</div>

<!-- Success -->
<div style="display:flex;gap:10px;padding:12px 14px;background:rgba(49,165,109,0.1);border:1px solid rgba(49,165,109,0.3);border-radius:8px;font-size:13px;color:var(--shell-text);">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#31A56D" stroke-width="2" style="flex-shrink:0;margin-top:1px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  <span>Success message goes here.</span>
</div>
```

---

### Inline Side Panel (no overlay — sits alongside content)
```html
<div style="display:flex;border:1px solid var(--card-border);border-radius:10px;overflow:hidden;min-height:320px;background:var(--card-bg);">

  <!-- Left: main content -->
  <div style="flex:1;min-width:0;padding:16px;">
    <button id="panel-toggle-btn"
            onclick="var p=document.getElementById('side-panel');var open=p.style.width!=='300px';p.style.width=open?'300px':'0';this.style.background=open?'#6360D8':'';this.style.color=open?'#fff':'';"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:44px;background:rgba(99,96,216,0.1);color:#6360D8;border:none;cursor:pointer;font-size:12px;font-weight:500;font-family:inherit;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
      Filter
    </button>
    <!-- main content here -->
  </div>

  <!-- Right: sliding panel -->
  <div id="side-panel" style="width:0;overflow:hidden;flex-shrink:0;border-left:1px solid var(--card-border);background:var(--card-bg);display:flex;flex-direction:column;transition:width .25s ease;">
    <!-- Header -->
    <div style="padding:14px 16px;border-bottom:1px solid var(--card-border);display:flex;align-items:center;gap:8px;flex-shrink:0;">
      <span style="flex:1;font-size:14px;font-weight:600;color:var(--shell-text);">Panel Title</span>
      <button onclick="document.getElementById('side-panel').style.width='0'"
              style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);padding:4px;display:flex;align-items:center;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <!-- Body -->
    <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:16px;">
      <!-- form fields -->
    </div>
    <!-- Footer -->
    <div style="border-top:1px solid var(--card-border);padding:14px 16px;display:flex;gap:8px;flex-shrink:0;">
      <button onclick="document.getElementById('side-panel').style.width='0'"
              style="flex:1;padding:8px;border-radius:44px;background:transparent;border:1px solid var(--ctrl-border);color:var(--shell-text);cursor:pointer;font-size:13px;font-family:inherit;">Cancel</button>
      <button style="flex:1;padding:8px;border-radius:44px;background:#6360D8;border:none;color:#fff;cursor:pointer;font-size:13px;font-weight:500;font-family:inherit;">Apply</button>
    </div>
  </div>

</div>
```

---

### Modal / Dialog
```html
<!-- Trigger -->
<button onclick="document.getElementById('my-modal-overlay').style.display='flex'" style="/* button styles */">Open</button>

<!-- Modal (place at end of body) -->
<div id="my-modal-overlay" onclick="if(event.target===this)this.style.display='none'"
     style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;align-items:center;justify-content:center;padding:24px;">
  <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;width:100%;max-width:440px;overflow:hidden;">
    <!-- Header -->
    <div style="padding:16px 20px;border-bottom:1px solid var(--card-border);display:flex;align-items:center;gap:8px;">
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--shell-text);">Modal Title</span>
      <button onclick="document.getElementById('my-modal-overlay').style.display='none'"
              style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);padding:4px;display:flex;align-items:center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <!-- Body -->
    <div style="padding:20px;font-size:13px;color:var(--shell-text-muted);line-height:1.6;">
      Modal content goes here.
    </div>
    <!-- Footer -->
    <div style="padding:14px 20px;border-top:1px solid var(--card-border);display:flex;justify-content:flex-end;gap:8px;">
      <button onclick="document.getElementById('my-modal-overlay').style.display='none'"
              style="padding:8px 20px;background:transparent;border:1px solid var(--ctrl-border);color:var(--shell-text);border-radius:44px;font-size:13px;cursor:pointer;font-family:inherit;">Cancel</button>
      <button style="padding:8px 20px;background:#6360D8;border:none;color:#fff;border-radius:44px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;">Confirm</button>
    </div>
  </div>
</div>
```

---

### Chart Tooltip

Shown on hover over any chart element (bar, donut segment, line dot, horizontal bar row). The tooltip floats below the cursor with a caret arrow at the top pointing up toward the chart.

**Structure:**
- `border: 1px solid <series-color>` — matches the hovered bar/segment/line color
- `border-radius: 8px`, `background: var(--card-bg)`, `padding: 12px 13px`, `min-width: 180px`
- Arrow caret at top-center: outer triangle in series color, inner triangle in `var(--card-bg)` to create outlined effect
- Title row: group/label name, `font-size: 14px`, `font-weight: 600`, `color: var(--shell-text)`
- Data rows: colored dot (8px circle) + label left-aligned · value right-aligned, `font-size: 14px`, `font-weight: 500`
- **Hovered series row**: label + value `font-weight: 700`, value `color: <series-color>`

**Behavior by chart type:**
- **Grouped bar chart**: title = x-axis group label (e.g. "Jan"); row = hovered bar's series label + value only (one row)
- **Donut chart**: title = segment label; rows = Value + Share %; active row = Share
- **Line chart**: title = x-axis label; row = metric name + value; active
- **Horizontal bar**: title = bar label; row = Count + value; active

```html
<!-- Place once at end of <body> -->
<div id="chart-tooltip" style="position:fixed;z-index:1000;pointer-events:none;display:none;
     background:var(--card-bg);border-radius:8px;padding:12px 13px;min-width:180px;
     box-shadow:0 4px 16px rgba(0,0,0,0.14);font-family:inherit;">
</div>

<script>
var _ctEl = null;
function _ct() { if (!_ctEl) _ctEl = document.getElementById('chart-tooltip'); return _ctEl; }

function showChartTooltip(e, title, rows, borderColor) {
  var el = _ct(); if (!el) return;
  var rowsHtml = rows.map(function(r) {
    var dot = r.color ? '<span style="width:8px;height:8px;border-radius:50%;background:' + r.color + ';flex-shrink:0;display:inline-block;"></span>' : '';
    var active = r.active;
    var fw = active ? '700' : '500';
    var vc = active ? r.color : 'inherit';
    return '<div style="display:flex;align-items:center;justify-content:space-between;gap:16px;font-size:14px;font-weight:' + fw + ';color:var(--shell-text);white-space:nowrap;">' +
      '<span style="display:flex;align-items:center;gap:6px;">' + dot + r.label + '</span>' +
      '<span style="color:' + vc + ';">' + r.value + '</span></div>';
  }).join('');
  el.innerHTML =
    '<div style="position:absolute;top:-7px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-bottom:7px solid ' + borderColor + ';"></div>' +
    '<div style="position:absolute;top:-5px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:5px solid var(--card-bg);"></div>' +
    '<div style="font-size:14px;font-weight:600;color:var(--shell-text);margin-bottom:8px;">' + title + '</div>' +
    '<div style="display:flex;flex-direction:column;gap:11px;">' + rowsHtml + '</div>';
  el.style.border = '1px solid ' + borderColor;
  el.style.display = 'block';
  positionChartTooltip(e);
}
function positionChartTooltip(e) {
  var el = _ct(); if (!el || el.style.display === 'none') return;
  var x = e.clientX - el.offsetWidth / 2, y = e.clientY + 18;
  if (x + el.offsetWidth > window.innerWidth - 8) x = window.innerWidth - el.offsetWidth - 8;
  if (x < 8) x = 8;
  if (y + el.offsetHeight > window.innerHeight - 8) y = e.clientY - el.offsetHeight - 18;
  el.style.left = x + 'px'; el.style.top = y + 'px';
}
function hideChartTooltip() { var el = _ct(); if (el) el.style.display = 'none'; }

// Attach to SVG bars:
// bar.addEventListener('mouseover', function(e) { showChartTooltip(e, groupLabel, rows, color); });
// bar.addEventListener('mousemove', positionChartTooltip);
// bar.addEventListener('mouseleave', hideChartTooltip);
</script>
```

---

### Toast Notification
```html
<!-- Place at end of body. Show by adding to #toast-container via JS -->
<div id="toast-container" style="position:fixed;bottom:24px;right:24px;z-index:999;display:flex;flex-direction:column;gap:8px;"></div>
<script>
function showToast(type, message) {
  var colors = { success:'#31A56D', error:'#D12329', warning:'#D98B1D', info:'#6360D8' };
  var color = colors[type] || colors.info;
  var t = document.createElement('div');
  t.style.cssText = 'display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--card-bg);border:1px solid var(--card-border);border-left:3px solid '+color+';border-radius:8px;font-size:13px;color:var(--shell-text);box-shadow:0 4px 16px rgba(0,0,0,.2);min-width:240px;animation:slideIn .2s ease;';
  t.innerHTML = '<span style="color:'+color+';font-weight:600;text-transform:capitalize;">'+type+'</span> '+message;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(function(){ t.remove(); }, 3500);
}
</script>
```

---

### Filter Chips (applied filters display)
```html
<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
  <span style="font-size:12px;color:var(--shell-text);">Show</span>
  <!-- Chip -->
  <div style="display:inline-flex;align-items:center;gap:4px;background:var(--shell-raised);border:1px solid var(--card-border);border-radius:8px;padding:4px 8px;font-size:12px;">
    <span style="color:var(--shell-text-muted);font-weight:500;">Entity</span>
    <span style="background:var(--ctrl-bg);border-radius:4px;padding:1px 6px;color:var(--shell-text);">Host</span>
    <button onclick="this.closest('div').remove()" style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);font-size:14px;padding:0 2px;line-height:1;">×</button>
  </div>
  <span style="color:#6360D8;font-size:12px;font-weight:500;">where</span>
  <!-- more chips... -->
</div>
```

---

### Avatar
```html
<!-- Image avatar -->
<div style="width:32px;height:32px;border-radius:50%;overflow:hidden;flex-shrink:0;background:var(--shell-raised);">
  <img src="avatar.jpg" style="width:100%;height:100%;object-fit:cover;" alt="Name">
</div>

<!-- Initials avatar -->
<div style="width:32px;height:32px;border-radius:50%;background:rgba(99,96,216,0.15);color:#6360D8;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0;">AB</div>

<!-- Sizes: sm=24px, md=32px, lg=40px, xl=48px -->
```

---

### Skeleton Loader
```html
<style>
@keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
.skeleton { background:linear-gradient(90deg,var(--shell-raised) 25%,var(--shell-elevated) 50%,var(--shell-raised) 75%);background-size:800px 100%;animation:shimmer 1.4s ease infinite;border-radius:4px; }
</style>

<!-- Text line -->
<div class="skeleton" style="height:14px;width:60%;border-radius:4px;"></div>
<!-- Short line -->
<div class="skeleton" style="height:14px;width:35%;border-radius:4px;margin-top:8px;"></div>
<!-- Rect block -->
<div class="skeleton" style="height:80px;width:100%;border-radius:8px;margin-top:12px;"></div>
```

---

## Typography Scale

```
Page title:     font-size:22px; font-weight:700; color:var(--shell-text)
Section title:  font-size:16px; font-weight:600; color:var(--shell-text)
Subsection:     font-size:13px; font-weight:600; color:var(--shell-text)
Body:           font-size:13px; font-weight:400; color:var(--shell-text)
Caption/muted:  font-size:12px; font-weight:400; color:var(--shell-text-muted)
Label:          font-size:12px; font-weight:500; color:var(--shell-text-muted)
Overline:       font-size:10px; font-weight:600; letter-spacing:.07em; text-transform:uppercase; color:var(--shell-text-muted)
Code:           font-family:'SFMono-Regular',Consolas,monospace; font-size:12px; background:var(--shell-raised); padding:1px 5px; border-radius:4px;
```

---

## Status Colors (semantic)

| Status   | Light BG   | Light Text | Dark BG    | Dark Text  |
|----------|------------|------------|------------|------------|
| Active   | `#EFF7ED`  | `#1A7D4D`  | `#192C15`  | `#31A56D`  |
| Warning  | `#F2EDDB`  | `#D98B1D`  | `#2C2613`  | `#D98B1D`  |
| Critical | `#F9EEEE`  | `#D12329`  | `#260808`  | `#D12329`  |
| Caution  | `#F7F6EB`  | `#CDB900`  | `#514B09`  | `#CDB900`  |
| Info     | `rgba(99,96,216,0.1)` | `#6360D8` | `rgba(99,96,216,0.1)` | `#6360D8` |
| Neutral  | `#F5F5F5`  | `#6E6E6E`  | `var(--shell-raised)` | `var(--shell-text-muted)` |

---

## Rules

1. **Never invent new colors** — use only the tokens above.
2. **Topbar is always `#131313`** regardless of theme.
3. **Accent `#6360D8`** is the only CTA/primary action color.
4. **All interactive elements must work standalone** — use onclick inline or a `<script>` block in the output.
5. **No external CSS framework** (no Bootstrap, Tailwind, etc.) — inline styles only, using the variables above.
6. **Tables:** style `th` and `td` directly — no wrapper class required.
7. **Every output is a complete, self-contained HTML file** unless the user explicitly asks for a snippet.
8. **Light theme is the default** — always generate for light theme first. Add class `theme-light` on `<html>`. Dark theme is opt-in (remove `theme-light` class).
9. **Font must always be Inter** — include the Google Fonts link tag in every generated file.
10. **Spacing:** stick to the 4px scale — 4, 8, 12, 16, 20, 24, 32, 48px.
11. **Button sizes — always pill (border-radius:44px):**
    - Small: `padding:5px 14px; font-size:12px`
    - Medium (default): `padding:8px 20px; font-size:13px`
    - Large: `padding:11px 28px; font-size:14px`
    - Icon-only: `width:32px; height:32px; border-radius:50%`
    - Shell buttons (topbar Navigator, sub-header Explore/Filter): always Small size
    - **Navigator button** uses Primary Special style: gradient text `#467fcd → #47adcb`, `border:1px solid #b1b8f5`
14. **Badge colors depend on theme** — use light theme colors (`#EFF7ED`, `#F9EEEE`, `#F2EDDB`, `#F7F6EB`) for light pages; dark colors (`#192C15`, `#260808`, `#2C2613`, `#514B09`) for dark pages.
12. **Nav item rules:**
    - Icon size: 18px · Label: 14px · Icon-label gap: 8px · Chevron always on right
    - Expanded parent: `background:#f5f5f5`, text `#6e6e6e` — never blue
    - Active sub-item only: `color:#6360D8`, `background:rgba(99,96,216,0.08)`, `padding-left:30px`
    - Only ONE item can be active at a time — accordion behavior
13. **Cards:** `border-radius:12px`, `border:1px solid var(--card-border)`, `background:var(--card-bg)`
14. **Badge colors depend on theme** — use light theme colors (`#EFF7ED`, `#F9EEEE`, `#F2EDDB`, `#F7F6EB`) for light pages; dark colors (`#192C15`, `#260808`, `#2C2613`, `#514B09`) for dark pages.
15. **Chart tooltips are mandatory** on all chart hovers (bars, donut segments, line dots, horizontal bar rows). Border + dot + active-value color must match the hovered series color. Include `#chart-tooltip` div and the three tooltip functions (`showChartTooltip`, `positionChartTooltip`, `hideChartTooltip`) in every file with charts.
