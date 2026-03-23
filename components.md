# Prevalent AI — UI Components

All component patterns for Prevalent AI. Use inline styles with CSS custom properties. No external CSS frameworks.

Hosted at: `https://anthu211.github.io/design-system-2.0/`

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

### KPI Card
```html
<!-- KPI row: gap:8px, max 5 cards -->
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;">
  <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:8px;padding:16px 20px;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
      <span style="font-size:12px;font-weight:500;color:var(--shell-text-muted);">Metric Name</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--shell-text-muted)" stroke-width="2"><!-- icon path --></svg>
    </div>
    <div style="font-size:24px;font-weight:700;color:var(--shell-text);line-height:1;">842</div>
    <div style="font-size:12px;color:var(--shell-text-muted);margin-top:4px;">Trend or subtitle</div>
  </div>
</div>
```

---

### Buttons

**All buttons use `border-radius:44px` (pill) — never `6px` on a button.**

```html
<!-- Primary (CTA) -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:#6360D8;color:#fff;border:none;border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">Label</button>

<!-- Primary Special — gradient text (Navigator, hero CTAs) -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:linear-gradient(to right,#467fcd,#47adcb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;border:1px solid #b1b8f5;border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">Navigator</button>

<!-- Outline -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:transparent;color:#6360D8;border:1px solid #6360D8;border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">Label</button>

<!-- Outline neutral -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:transparent;color:var(--shell-text);border:1px solid var(--ctrl-border);border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">Label</button>

<!-- Ghost / text -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:transparent;color:var(--shell-text-muted);border:none;border-radius:44px;font-size:13px;font-weight:400;font-family:inherit;cursor:pointer;">Label</button>

<!-- Small pill -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:5px 14px;background:#6360D8;color:#fff;border:none;border-radius:44px;font-size:12px;font-weight:500;font-family:inherit;cursor:pointer;">Label</button>

<!-- Large pill -->
<button style="display:inline-flex;align-items:center;gap:6px;padding:11px 28px;background:#6360D8;color:#fff;border:none;border-radius:44px;font-size:14px;font-weight:500;font-family:inherit;cursor:pointer;">Label</button>

<!-- Icon-only circle (neutral) -->
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

Trigger + 309px panel with search, AND/OR/EXACT segmented control, scrollable checkbox list, footer with Cancel/Apply.

```html
<div style="position:relative;display:inline-block;">
  <button id="ms-trigger" onclick="dsMsToggle('ms-panel')"
          style="display:inline-flex;align-items:center;gap:8px;height:36px;padding:0 12px;border:1px solid var(--shell-border);border-radius:8px;background:var(--card-bg);color:var(--shell-text);font-size:13px;cursor:pointer;font-family:inherit;">
    Filter Origin
    <span id="ms-count" style="display:none;background:#6760d8;color:#fff;border-radius:99px;font-size:11px;font-weight:600;padding:1px 6px;"></span>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  </button>

  <div id="ms-panel" style="display:none;position:absolute;top:calc(100% + 6px);left:0;z-index:300;width:309px;background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;box-shadow:0 16px 36px -20px rgba(0,6,46,.2),0 12px 60px rgba(0,0,0,.15);flex-direction:column;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 12px 0;">
      <span style="font-size:16px;font-weight:600;color:var(--shell-text);">Filter Origin</span>
      <button onclick="document.getElementById('ms-panel').style.display='none'" style="width:26px;height:26px;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);display:flex;align-items:center;justify-content:center;border-radius:6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
<div onclick="var on=this.dataset.on==='1';this.dataset.on=on?'0':'1';this.style.background=on?'var(--ctrl-border)':'#6360D8';this.firstElementChild.style.transform=on?'translateX(2px)':'translateX(18px)'"
     data-on="0"
     style="width:38px;height:22px;border-radius:11px;background:var(--ctrl-border);cursor:pointer;position:relative;transition:background .15s;flex-shrink:0;">
  <div style="position:absolute;top:3px;left:0;width:16px;height:16px;border-radius:50%;background:#fff;transform:translateX(2px);transition:transform .15s;box-shadow:0 1px 3px rgba(0,0,0,.3);"></div>
</div>
```

---

### Badge / Status Tag

**Light theme (default):**
```html
<!-- Success / Active -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#EFF7ED;color:#1A7D4D;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">
  <span style="width:5px;height:5px;border-radius:50%;background:#31A56D;flex-shrink:0;"></span>Active
</span>

<!-- Critical -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#F9EEEE;color:#D12329;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Critical</span>

<!-- Warning -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#F2EDDB;color:#D98B1D;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Warning</span>

<!-- Caution -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#F7F6EB;color:#CDB900;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Caution</span>

<!-- Neutral / Info -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:#F5F5F5;color:#6E6E6E;border-radius:20px;font-size:11px;font-weight:500;white-space:nowrap;">Inactive</span>

<!-- Count badge -->
<span style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 5px;background:#6360D8;color:#fff;border-radius:20px;font-size:11px;font-weight:600;">4</span>
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
  <button onclick="switchTab(this,'tab-one')"
          style="padding:10px 16px;background:none;border:none;border-bottom:2px solid #6360D8;margin-bottom:-1px;font-size:13px;font-weight:600;color:#6360D8;cursor:pointer;font-family:inherit;">Tab One</button>
  <button onclick="switchTab(this,'tab-two')"
          style="padding:10px 16px;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;font-size:13px;font-weight:400;color:var(--shell-text-muted);cursor:pointer;font-family:inherit;">Tab Two</button>
</div>
<div id="tab-one"><!-- tab one content --></div>
<div id="tab-two" style="display:none;"><!-- tab two content --></div>
<script>
function switchTab(btn, targetId) {
  btn.parentElement.querySelectorAll('button').forEach(function(b){b.style.borderBottomColor='transparent';b.style.color='var(--shell-text-muted)';b.style.fontWeight='400';});
  btn.style.borderBottomColor='#6360D8';btn.style.color='#6360D8';btn.style.fontWeight='600';
  var target=document.getElementById(targetId);if(!target)return;
  target.parentElement.querySelectorAll(':scope > [id]').forEach(function(el){el.style.display='none';});
  target.style.display='block';
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

<!-- Error -->
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

### Inline Side Panel
```html
<div style="display:flex;border:1px solid var(--card-border);border-radius:10px;overflow:hidden;min-height:320px;background:var(--card-bg);">
  <div style="flex:1;min-width:0;padding:16px;">
    <button id="panel-toggle-btn"
            onclick="var p=document.getElementById('side-panel');var open=p.style.width!=='300px';p.style.width=open?'300px':'0';this.style.background=open?'#6360D8':'';this.style.color=open?'#fff':'';"
            style="display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:44px;background:rgba(99,96,216,0.1);color:#6360D8;border:none;cursor:pointer;font-size:12px;font-weight:500;font-family:inherit;">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
      Filter
    </button>
  </div>
  <div id="side-panel" style="width:0;overflow:hidden;flex-shrink:0;border-left:1px solid var(--card-border);background:var(--card-bg);display:flex;flex-direction:column;transition:width .25s ease;">
    <div style="padding:14px 16px;border-bottom:1px solid var(--card-border);display:flex;align-items:center;gap:8px;flex-shrink:0;">
      <span style="flex:1;font-size:14px;font-weight:600;color:var(--shell-text);">Panel Title</span>
      <button onclick="document.getElementById('side-panel').style.width='0'" style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);padding:4px;display:flex;align-items:center;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:16px;"></div>
    <div style="border-top:1px solid var(--card-border);padding:14px 16px;display:flex;gap:8px;flex-shrink:0;">
      <button onclick="document.getElementById('side-panel').style.width='0'" style="flex:1;padding:8px;border-radius:44px;background:transparent;border:1px solid var(--ctrl-border);color:var(--shell-text);cursor:pointer;font-size:13px;font-family:inherit;">Cancel</button>
      <button style="flex:1;padding:8px;border-radius:44px;background:#6360D8;border:none;color:#fff;cursor:pointer;font-size:13px;font-weight:500;font-family:inherit;">Apply</button>
    </div>
  </div>
</div>
```

---

### Modal — Standard
```html
<button onclick="document.getElementById('my-modal-overlay').style.display='flex'" style="padding:8px 20px;background:#6360D8;color:#fff;border:none;border-radius:44px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;">Open Modal</button>

<div id="my-modal-overlay" onclick="if(event.target===this)this.style.display='none'"
     style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;align-items:center;justify-content:center;padding:24px;">
  <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;width:100%;max-width:440px;overflow:hidden;">
    <div style="padding:16px 20px;border-bottom:1px solid var(--card-border);display:flex;align-items:center;gap:8px;">
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--shell-text);">Modal Title</span>
      <button onclick="document.getElementById('my-modal-overlay').style.display='none'" style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);padding:4px;display:flex;align-items:center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="padding:20px;font-size:13px;color:var(--shell-text-muted);line-height:1.6;">Modal content goes here.</div>
    <div style="padding:14px 20px;border-top:1px solid var(--card-border);display:flex;justify-content:flex-end;gap:8px;">
      <button onclick="document.getElementById('my-modal-overlay').style.display='none'" style="padding:8px 20px;background:transparent;border:1px solid var(--ctrl-border);color:var(--shell-text);border-radius:44px;font-size:13px;cursor:pointer;font-family:inherit;">Cancel</button>
      <button style="padding:8px 20px;background:#6360D8;border:none;color:#fff;border-radius:44px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;">Confirm</button>
    </div>
  </div>
</div>
```

### Destructive Confirmation Modal
```html
<!-- Use for any delete/remove action — name the item, state the consequence, red confirm button -->
<div id="del-modal-overlay" onclick="if(event.target===this)this.style.display='none'"
     style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;align-items:center;justify-content:center;padding:24px;">
  <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;width:100%;max-width:400px;overflow:hidden;">
    <div style="padding:16px 20px;border-bottom:1px solid var(--card-border);display:flex;align-items:center;gap:8px;">
      <span style="flex:1;font-size:15px;font-weight:600;color:var(--shell-text);">Delete Item?</span>
      <button onclick="document.getElementById('del-modal-overlay').style.display='none'" style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);padding:4px;display:flex;align-items:center;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="padding:20px;font-size:13px;color:var(--shell-text-muted);line-height:1.6;">
      Are you sure you want to delete <strong style="color:var(--shell-text);">Item Name</strong>? This action cannot be undone.
    </div>
    <div style="padding:14px 20px;border-top:1px solid var(--card-border);display:flex;justify-content:flex-end;gap:8px;">
      <button onclick="document.getElementById('del-modal-overlay').style.display='none'" style="padding:8px 20px;background:transparent;border:1px solid var(--ctrl-border);color:var(--shell-text);border-radius:44px;font-size:13px;cursor:pointer;font-family:inherit;">Cancel</button>
      <button style="padding:8px 20px;background:#D12329;border:none;color:#fff;border-radius:44px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;">Delete</button>
    </div>
  </div>
</div>
```

### Form Dialogue Modal (Create/Edit pattern)

Grey header (`#f5f5f5`), `border-radius:20px 20px 0 0`, section labels with dividers, pill footer buttons.

```html
<div id="create-alert-overlay" onclick="if(event.target===this)this.style.display='none'"
     style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:500;align-items:center;justify-content:center;padding:24px;">
  <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:20px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px rgba(0,0,0,.5);">
    <!-- Grey header -->
    <div style="display:flex;align-items:center;gap:10px;padding:0 20px;height:58px;background:#f5f5f5;border-radius:20px 20px 0 0;border-bottom:1px solid var(--shell-border);flex-shrink:0;">
      <div style="width:32px;height:32px;border-radius:8px;background:var(--card-bg);display:flex;align-items:center;justify-content:center;color:var(--shell-text-2);flex-shrink:0;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      </div>
      <span style="flex:1;font-size:16px;font-weight:500;color:var(--shell-text);">Create Alert</span>
      <button onclick="document.getElementById('create-alert-overlay').style.display='none'" style="width:28px;height:28px;border-radius:6px;border:none;background:transparent;cursor:pointer;color:var(--shell-text-muted);display:flex;align-items:center;justify-content:center;">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <!-- Body with sections -->
    <div style="padding:20px;display:flex;flex-direction:column;gap:0;">
      <div style="margin-bottom:16px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <span style="font-size:12px;font-weight:600;color:#101010;white-space:nowrap;">Section Label</span>
          <span style="flex:1;height:1px;background:var(--shell-border);"></span>
        </div>
        <!-- form fields here -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;">
          <select style="height:42px;padding:0 10px;border:1px solid var(--shell-border);border-radius:4px;background:var(--card-bg);color:var(--shell-text);font-size:13px;cursor:pointer;font-family:inherit;"><option>Select When</option></select>
          <select style="height:42px;padding:0 10px;border:1px solid var(--shell-border);border-radius:4px;background:var(--card-bg);color:var(--shell-text);font-size:13px;cursor:pointer;font-family:inherit;"><option>Operator</option></select>
          <select style="height:42px;padding:0 10px;border:1px solid var(--shell-border);border-radius:4px;background:var(--card-bg);color:var(--shell-text);font-size:13px;cursor:pointer;font-family:inherit;"><option>Condition</option></select>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div style="padding:14px 20px;border-top:1px solid var(--shell-border);display:flex;align-items:center;justify-content:flex-end;gap:8px;">
      <button onclick="document.getElementById('create-alert-overlay').style.display='none'" style="height:32px;min-width:72px;padding:0 16px;border:1px solid #cfcfcf;border-radius:20px;background:transparent;cursor:pointer;font-size:13px;font-weight:500;color:var(--shell-text-2);font-family:inherit;">Cancel</button>
      <button style="height:32px;min-width:72px;padding:0 16px;border:none;border-radius:20px;background:#6360d8;cursor:pointer;font-size:13px;font-weight:500;color:#fff;font-family:inherit;">Next</button>
    </div>
  </div>
</div>
```

---

### Toast Notification
```html
<div id="toast-container" style="position:fixed;bottom:24px;right:24px;z-index:999;display:flex;flex-direction:column;gap:8px;"></div>
<script>
function showToast(type, message) {
  var colors={success:'#31A56D',error:'#D12329',warning:'#D98B1D',info:'#6360D8'};
  var color=colors[type]||colors.info;
  var t=document.createElement('div');
  t.style.cssText='display:flex;align-items:center;gap:10px;padding:12px 16px;background:var(--card-bg);border:1px solid var(--card-border);border-left:3px solid '+color+';border-radius:8px;font-size:13px;color:var(--shell-text);box-shadow:0 4px 16px rgba(0,0,0,.2);min-width:240px;';
  t.innerHTML='<span style="color:'+color+';font-weight:600;text-transform:capitalize;">'+type+'</span> '+message;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(function(){t.remove();},3500);
}
</script>
```

---

### Filter Chips (applied filters display)
```html
<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
  <span style="font-size:12px;color:var(--shell-text);">Show</span>
  <div style="display:inline-flex;align-items:center;gap:4px;background:var(--shell-raised);border:1px solid var(--card-border);border-radius:8px;padding:4px 8px;font-size:12px;">
    <span style="color:var(--shell-text-muted);font-weight:500;">Entity</span>
    <span style="background:var(--ctrl-bg);border-radius:4px;padding:1px 6px;color:var(--shell-text);">Host</span>
    <button onclick="this.closest('div').remove()" style="background:none;border:none;cursor:pointer;color:var(--shell-text-muted);font-size:14px;padding:0 2px;line-height:1;">×</button>
  </div>
  <span style="color:#6360D8;font-size:12px;font-weight:500;">where</span>
</div>
```

---

### Avatar
```html
<!-- Initials -->
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
<div class="skeleton" style="height:14px;width:60%;border-radius:4px;"></div>
<div class="skeleton" style="height:14px;width:35%;border-radius:4px;margin-top:8px;"></div>
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
```

---

## Status Colors

| Status   | Light BG   | Light Text | Dark BG    | Dark Text  |
|----------|------------|------------|------------|------------|
| Active   | `#EFF7ED`  | `#1A7D4D`  | `#192C15`  | `#31A56D`  |
| Warning  | `#F2EDDB`  | `#D98B1D`  | `#2C2613`  | `#D98B1D`  |
| Critical | `#F9EEEE`  | `#D12329`  | `#260808`  | `#D12329`  |
| Caution  | `#F7F6EB`  | `#CDB900`  | `#514B09`  | `#CDB900`  |
| Info     | `rgba(99,96,216,0.1)` | `#6360D8` | same | `#6360D8` |
| Neutral  | `#F5F5F5`  | `#6E6E6E`  | `var(--shell-raised)` | `var(--shell-text-muted)` |
