# Prevalent AI — UI Design System Specification
**Version 2.0 · Organization-wide standard for all AI-generated dashboards**

Read this entire document before generating any UI. Every component, token, and layout must conform to this spec.

---

## Visual Identity

- **Font:** Inter (load from Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`)
- **Accent color:** `#6360D8` (purple-blue — used for CTA buttons, active states, links, focus rings)
- **Default theme:** Dark. Light theme applies class `theme-light` on `<html>`.
- **Topbar:** Always `background: #0a0a0a`, white logo — never changes with theme switching.
- **Border radius scale:** inputs/cards `8px`, buttons `6px`, large cards `12px`, pill buttons `44px+`
- **Spacing unit:** 4px base — use multiples: 4, 8, 12, 16, 20, 24, 32, 48

---

## Design Tokens

All values are CSS custom properties. Use these names consistently so dark/light switching works.

### Dark Theme (default)
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

### Light Theme (html.theme-light overrides)
```
--shell-bg: #F7F9FC
--shell-sidebar: #FFFFFF
--shell-border: #E6E6E6
--shell-text: #101010
--shell-text-muted: #6E6E6E
--shell-accent: #6360D8
--shell-raised: #F5F5F5
--ctrl-bg: #FFFFFF
--ctrl-border: #cfcfcf
--ctrl-text: #282828
--card-bg: #FFFFFF
--card-border: #E6E6E6
--table-th-bg: #F5F5F5
--table-border: #E6E6E6
```

---

## Page Shell

Every dashboard uses this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Prevalent AI</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
  <style>
    /* paste full styles.css content here, OR define tokens + component styles inline */
  </style>
</head>
<body style="margin:0;font-family:'Inter',sans-serif;background:var(--shell-bg);color:var(--shell-text);display:flex;flex-direction:column;height:100vh;">

  <!-- Topbar — always dark, never theme-switched -->
  <div style="height:52px;background:#0a0a0a;border-bottom:1px solid #1e1e1e;display:flex;align-items:center;padding:0 16px;gap:10px;flex-shrink:0;z-index:100;">
    <img src="pai-logo.svg" style="height:28px;" alt="Prevalent AI">
    <span style="flex:1;"></span>
    <!-- topbar right actions here -->
  </div>

  <!-- Shell: sidebar + main -->
  <div style="display:flex;flex:1;overflow:hidden;">

    <!-- Left Navigation -->
    <nav style="width:220px;background:var(--shell-sidebar);border-right:1px solid var(--shell-border);overflow-y:auto;flex-shrink:0;padding:12px 0;">
      <!-- nav content -->
    </nav>

    <!-- Main Content -->
    <main style="flex:1;overflow-y:auto;padding:28px 32px;">
      <!-- page content -->
    </main>

  </div>
</body>
</html>
```

---

## Components

### Navigation Item
```html
<!-- Active state -->
<a href="#" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;margin:2px 8px;background:rgba(99,96,216,0.12);color:#6360D8;font-size:13px;font-weight:500;text-decoration:none;">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><!-- icon --></svg>
  Page Name
</a>

<!-- Default state -->
<a href="#" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;margin:2px 8px;color:var(--shell-text-muted);font-size:13px;font-weight:400;text-decoration:none;">
  Page Name
</a>

<!-- Section label -->
<div style="padding:8px 20px 4px;font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--shell-text-muted);">Section Name</div>
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

```html
<!-- Primary (CTA) -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:#6360D8;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">
  Label
</button>

<!-- Outline -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:transparent;color:var(--shell-text);border:1px solid var(--ctrl-border);border-radius:6px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">
  Label
</button>

<!-- Ghost / text -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 12px;background:transparent;color:var(--shell-text-muted);border:none;border-radius:6px;font-size:13px;font-weight:400;font-family:inherit;cursor:pointer;">
  Label
</button>

<!-- Small -->
<button style="padding:5px 12px;font-size:12px;border-radius:6px;/* + same bg/color/border as above */">Label</button>

<!-- Large -->
<button style="padding:11px 22px;font-size:14px;border-radius:6px;/* + same bg/color/border as above */">Label</button>

<!-- Pill / rounded -->
<button style="border-radius:44px;/* + other styles */">Label</button>

<!-- Icon-only button -->
<button style="width:32px;height:32px;padding:0;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:1px solid var(--ctrl-border);border-radius:6px;cursor:pointer;color:var(--shell-text-muted);">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><!-- icon --></svg>
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
```html
<!-- Success / Active -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#192C15;color:#31A56D;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">
  <span style="width:5px;height:5px;border-radius:50%;background:#31A56D;flex-shrink:0;"></span>Active
</span>

<!-- Danger / Critical -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#260808;color:#D12329;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Critical</span>

<!-- Warning -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#2C2613;color:#D98B1D;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Warning</span>

<!-- Caution / Yellow -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#514B09;color:#CDB900;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Caution</span>

<!-- Neutral / Info -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:var(--shell-raised);color:var(--shell-text-muted);border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Inactive</span>

<!-- Count badge (number pill) -->
<span style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;background:#6360D8;color:#fff;border-radius:20px;font-size:11px;font-weight:600;">4</span>
```

---

### Data Table
```html
<div style="border:1px solid var(--card-border);border-radius:10px;overflow:hidden;">
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
            style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:44px;background:rgba(99,96,216,0.1);color:#6360D8;border:none;cursor:pointer;font-size:13px;font-weight:500;font-family:inherit;">
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
              style="flex:1;padding:8px;border-radius:24px;background:transparent;border:1px solid var(--ctrl-border);color:var(--shell-text);cursor:pointer;font-size:13px;font-family:inherit;">Cancel</button>
      <button style="flex:1;padding:8px;border-radius:24px;background:#6360D8;border:none;color:#fff;cursor:pointer;font-size:13px;font-weight:500;font-family:inherit;">Apply</button>
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
              style="padding:8px 16px;background:transparent;border:1px solid var(--ctrl-border);color:var(--shell-text);border-radius:6px;font-size:13px;cursor:pointer;font-family:inherit;">Cancel</button>
      <button style="padding:8px 16px;background:#6360D8;border:none;color:#fff;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;">Confirm</button>
    </div>
  </div>
</div>
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

| Status   | Background | Text     |
|----------|------------|----------|
| Active   | `#192C15`  | `#31A56D`|
| Warning  | `#2C2613`  | `#D98B1D`|
| Critical | `#260808`  | `#D12329`|
| Caution  | `#514B09`  | `#CDB900`|
| Info     | `rgba(99,96,216,0.1)` | `#6360D8` |
| Neutral  | `var(--shell-raised)` | `var(--shell-text-muted)` |

---

## Rules

1. **Never invent new colors** — use only the tokens above.
2. **Topbar is always `#0a0a0a`** regardless of theme.
3. **Accent `#6360D8`** is the only CTA/primary action color.
4. **All interactive elements must work standalone** — use onclick inline or a `<script>` block in the output.
5. **No external CSS framework** (no Bootstrap, Tailwind, etc.) — inline styles only, using the variables above.
6. **Tables:** style `th` and `td` directly — no wrapper class required.
7. **Every output is a complete, self-contained HTML file** unless the user explicitly asks for a snippet.
8. **Dark theme is the default** — generate for dark first. If light is needed, wrap in `<html class="theme-light">`.
9. **Font must always be Inter** — include the Google Fonts link tag in every generated file.
10. **Spacing:** stick to the 4px scale — 4, 8, 12, 16, 20, 24, 32, 48px.
