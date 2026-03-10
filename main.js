// ─── Global theme ───
(function() {
  var saved = localStorage.getItem('ds-theme') || 'dark';
  if (saved === 'light') document.body.classList.add('theme-light');
  document.querySelectorAll('.theme-btn-global').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.globalTheme === saved);
  });
})();

document.querySelectorAll('.theme-btn-global').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var theme = btn.dataset.globalTheme;
    document.body.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('ds-theme', theme);
    document.querySelectorAll('.theme-btn-global').forEach(function(b) {
      b.classList.toggle('active', b.dataset.globalTheme === theme);
    });
    // Sync Colors page local toggle
    var localTheme = theme;
    document.querySelectorAll('.theme-btn').forEach(function(b) {
      b.classList.toggle('active', b.dataset.theme === localTheme);
    });
    currentTheme = localTheme;
    renderAll();
    // Re-render charts if on charts page
    if (document.querySelector('#page-charts.active')) {
      setTimeout(initCharts, 60);
    }
  });
});

// ─── Color data ───
const COLORS = {
  text: [
    { token: 'text-primary',      light: '101010', dark: 'F9F9F9', usage: 'Body text, headings' },
    { token: 'text-secondary',    light: '6E6E6E', dark: 'D1D1D1', usage: 'Labels, metadata, captions' },
    { token: 'text-disabled',     light: 'A3A5AF', dark: '696969', usage: 'Disabled state text' },
    { token: 'text-red-critical', light: 'D12329', dark: 'D12329', usage: 'Critical alerts, errors' },
    { token: 'text-red',          light: 'E15252', dark: 'E15252', usage: 'Warning text, risk indicators' },
    { token: 'text-green',        light: '31A56D', dark: '31A56D', usage: 'Success, resolved, active' },
    { token: 'text-dark-green',   light: '1A7D4D', dark: '1A7D4D', usage: 'Confirmed safe, passed' },
    { token: 'text-orange',       light: 'D98B1D', dark: 'D98B1D', usage: 'Medium risk, warnings' },
    { token: 'text-yellow',       light: 'CDB900', dark: 'CDB900', usage: 'Caution, informational' },
  ],
  bg: [
    { token: 'color-primary-bg',    light: 'F7F9FC', dark: '0E0E0E', usage: 'App background' },
    { token: 'color-secondary-bg',  light: 'FFFFFF', dark: '131313', usage: 'Card, sidebar background' },
    { token: 'color-table-header',  light: 'F5F5F5', dark: '1F1F1F', usage: 'Table header rows' },
    { token: 'color-header-bar',    light: '131313', dark: '131313', usage: 'Top navigation bar' },
  ],
  stroke: [
    { token: 'color-stroke-1', light: 'E6E6E6', dark: '272727', usage: 'Primary dividers, card borders' },
    { token: 'color-stroke-2', light: 'D8D9DD', dark: '3B3A3A', usage: 'Subtle borders, input outlines' },
  ],
  cta: [
    { token: 'color-cta-primary',  light: '6360D8', dark: '6360D8', usage: 'Primary buttons, links, focus rings' },
  ],
  tags: [
    { token: 'color-tag-bg-green',  light: 'EFF7ED', dark: '192C15', usage: 'Success / Active tag bg' },
    { token: 'color-tag-bg-yellow', light: 'F2EDDB', dark: '2C2613', usage: 'Warning tag background' },
    { token: 'color-tag-bg-red',    light: 'F9EEEE', dark: '260808', usage: 'Critical / Error tag bg' },
    { token: 'color-tag-bg-orange', light: 'F7F6EB', dark: '514B09', usage: 'Medium risk tag bg' },
  ],
  mono: [
    { token: 'color-mono-white', light: 'FFFFFF', dark: '000000', usage: 'Pure white / inverted surface' },
    { token: 'color-mono-black', light: '000000', dark: 'FFFFFF', usage: 'Pure black / inverted text' },
  ],
};

let currentTheme = localStorage.getItem('ds-theme') || 'dark';

function luminance(hex) {
  const r = parseInt(hex.slice(0,2),16)/255;
  const g = parseInt(hex.slice(2,4),16)/255;
  const b = parseInt(hex.slice(4,6),16)/255;
  return 0.2126*r + 0.7152*g + 0.0722*b;
}

function renderColorGrid(containerId, tokens) {
  const el = document.getElementById(containerId);
  el.innerHTML = tokens.map(t => {
    const hex = currentTheme === 'dark' ? t.dark : t.light;
    const needsCheck = hex.toLowerCase() === 'ffffff' || hex.toLowerCase() === '000000' || hex.toLowerCase() === 'f7f9fc';
    return `
      <div class="color-card">
        <div class="color-swatch${needsCheck ? ' checkered' : ''}">
          <div class="swatch-inner" style="background:#${hex};"></div>
        </div>
        <div class="color-info">
          <div class="color-token">--${t.token}</div>
          <div class="color-hex">#${hex}</div>
          <div class="color-usage">${t.usage}</div>
        </div>
      </div>`;
  }).join('');
}

function renderAll() {
  renderColorGrid('color-grid-text',   COLORS.text);
  renderColorGrid('color-grid-bg',     COLORS.bg);
  renderColorGrid('color-grid-stroke', COLORS.stroke);
  renderColorGrid('color-grid-cta',    COLORS.cta);
  renderColorGrid('color-grid-tags',   COLORS.tags);
  renderColorGrid('color-grid-mono',   COLORS.mono);

  // Tag previews
  document.getElementById('tag-preview-dark').style.display  = currentTheme === 'dark'  ? 'flex' : 'none';
  document.getElementById('tag-preview-light').style.display = currentTheme === 'light' ? 'flex' : 'none';
}

// Build grid preview
function buildGridPreview() {
  const el = document.getElementById('grid-preview-12');
  el.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const col = document.createElement('div');
    col.className = 'grid-col';
    el.appendChild(col);
  }
}

// Theme toggle
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTheme = btn.dataset.theme;
    renderAll();
  });
});

// Page nav
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('page-' + item.dataset.page).classList.add('active');
  });
});

// Init — sync local toggle state with persisted theme
document.querySelectorAll('.theme-btn').forEach(function(b) {
  b.classList.toggle('active', b.dataset.theme === currentTheme);
});
renderAll();
buildGridPreview();

// ─── Toggle switch ───
document.querySelectorAll('.ds-toggle-wrap').forEach(function(wrap) {
  wrap.addEventListener('click', function() {
    if (wrap.classList.contains('is-disabled')) return;
    var track = wrap.querySelector('.ds-toggle-track');
    if (track) track.classList.toggle('on');
  });
});

// ─── Dual toggle ───
document.querySelectorAll('.ds-dual-toggle').forEach(function(dt) {
  var btns = dt.querySelectorAll('.dt-btn');
  var indicator = dt.querySelector('.dt-indicator');
  if (!indicator) return;

  function moveIndicator(btn) {
    var dtRect = dt.getBoundingClientRect();
    var btnRect = btn.getBoundingClientRect();
    indicator.style.left = (btnRect.left - dtRect.left) + 'px';
    indicator.style.width = btnRect.width + 'px';
  }

  var activeBtn = dt.querySelector('.dt-btn.active');
  if (activeBtn) setTimeout(function() { moveIndicator(activeBtn); }, 0);

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (dt.dataset.disabled === 'true') return;
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      moveIndicator(btn);
    });
  });
});

// ─── Dropdown ───
document.querySelectorAll('.ds-dropdown').forEach(function(dd) {
  var trigger = dd.querySelector('.ds-dropdown-trigger');
  var panel = dd.querySelector('.ds-dropdown-panel');
  if (!trigger || !panel) return;

  var isMulti = dd.dataset.multi === 'true';
  var triggerText = dd.querySelector('.ds-dropdown-trigger-text');
  var searchInput = dd.querySelector('.ds-dropdown-search input');
  var options = Array.from(dd.querySelectorAll('.ds-dropdown-option'));
  var selected = new Set();

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    var isOpen = dd.dataset.open === 'true';
    document.querySelectorAll('.ds-dropdown[data-open="true"]').forEach(function(other) {
      if (other !== dd) other.dataset.open = 'false';
    });
    dd.dataset.open = isOpen ? 'false' : 'true';
    if (dd.dataset.open === 'true' && searchInput) searchInput.focus();
  });

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var q = searchInput.value.toLowerCase();
      options.forEach(function(opt) {
        opt.style.display = opt.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  options.forEach(function(opt) {
    opt.addEventListener('click', function(e) {
      e.stopPropagation();
      var val = opt.dataset.value;
      if (isMulti) {
        if (selected.has(val)) {
          selected.delete(val);
          opt.classList.remove('selected');
        } else {
          selected.add(val);
          opt.classList.add('selected');
        }
        updateMultiTrigger();
      } else {
        options.forEach(function(o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        if (triggerText) {
          triggerText.textContent = opt.textContent.trim();
          triggerText.classList.remove('placeholder');
        }
        dd.dataset.open = 'false';
      }
    });
  });

  function updateMultiTrigger() {
    var chipsWrap = dd.querySelector('.ds-chips-wrap');
    if (!chipsWrap) return;
    chipsWrap.innerHTML = '';
    if (selected.size === 0) {
      if (triggerText) { triggerText.textContent = dd.dataset.placeholder || 'Select…'; triggerText.classList.add('placeholder'); }
    } else {
      if (triggerText) triggerText.textContent = '';
      selected.forEach(function(val) {
        var chip = document.createElement('span');
        chip.className = 'ds-chip';
        chip.innerHTML = val + ' <span class="ds-chip-x" data-val="' + val + '">\u00d7</span>';
        chipsWrap.appendChild(chip);
      });
    }
  }

  dd.addEventListener('click', function(e) {
    if (e.target.classList.contains('ds-chip-x')) {
      e.stopPropagation();
      var val = e.target.dataset.val;
      selected.delete(val);
      dd.querySelectorAll('.ds-dropdown-option').forEach(function(o) {
        if (o.dataset.value === val) o.classList.remove('selected');
      });
      updateMultiTrigger();
    }
  });
});

document.addEventListener('click', function() {
  document.querySelectorAll('.ds-dropdown[data-open="true"]').forEach(function(dd) {
    dd.dataset.open = 'false';
  });
});

// ─── Radio ───
document.querySelectorAll('.ds-radio-item').forEach(function(item) {
  item.addEventListener('click', function() {
    if (item.classList.contains('disabled')) return;
    var group = item.closest('.ds-radio-group');
    group.querySelectorAll('.ds-radio-dot').forEach(function(d) { d.classList.remove('checked'); });
    var dot = item.querySelector('.ds-radio-dot');
    if (dot) dot.classList.add('checked');
  });
});

// ─── Checkbox ───
document.querySelectorAll('.ds-checkbox-item').forEach(function(item) {
  item.addEventListener('click', function() {
    if (item.classList.contains('disabled')) return;
    var box = item.querySelector('.ds-checkbox-box');
    if (!box) return;
    if (box.classList.contains('indeterminate')) {
      box.classList.remove('indeterminate');
      box.classList.add('checked');
    } else if (box.classList.contains('checked')) {
      box.classList.remove('checked');
    } else {
      box.classList.add('checked');
    }
  });
});

// ─── Input focus state ───
document.querySelectorAll('.ds-input-field').forEach(function(field) {
  var input = field.querySelector('input');
  if (!input) return;
  input.addEventListener('focus', function() { field.classList.add('focused'); });
  input.addEventListener('blur', function() { field.classList.remove('focused'); });
});

// ─── Password toggle ───
document.querySelectorAll('.ds-pw-toggle').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var field = btn.closest('.ds-input-field');
    var input = field && field.querySelector('input');
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
    } else {
      input.type = 'password';
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    }
  });
});

// ─── Textarea char count ───
document.querySelectorAll('.ds-textarea-field[data-max]').forEach(function(ta) {
  var max = parseInt(ta.dataset.max);
  var wrap = ta.closest('.ds-textarea-wrap');
  var counter = wrap && wrap.querySelector('.ds-input-count');
  if (!counter) return;
  counter.textContent = '0 / ' + max;
  ta.addEventListener('input', function() {
    if (ta.value.length > max) ta.value = ta.value.slice(0, max);
    counter.textContent = ta.value.length + ' / ' + max;
  });
});

// ─── Charts ───
var CHART_COLORS = ['#6760d8', '#47adcb', '#2fa76d', '#d12329', '#f59e0b'];

function polarToCartesian(cx, cy, r, angleDeg) {
  var rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  var start = polarToCartesian(cx, cy, r, endAngle);
  var end = polarToCartesian(cx, cy, r, startAngle);
  var largeArc = (endAngle - startAngle) <= 180 ? '0' : '1';
  return 'M ' + start.x + ' ' + start.y + ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 0 ' + end.x + ' ' + end.y;
}

function buildDonutChart(containerId, data, size) {
  size = size || 160;
  var cx = size / 2, cy = size / 2;
  var outerR = size / 2 - 6;
  var strokeW = outerR * 0.36;
  var total = data.reduce(function(s, d) { return s + d.value; }, 0);
  var startAngle = 0;
  var paths = data.map(function(d, i) {
    var sweep = (d.value / total) * 360;
    var endAngle = startAngle + sweep - 1.5;
    var path = describeArc(cx, cy, outerR - strokeW / 2, startAngle, endAngle);
    startAngle += sweep;
    return '<path d="' + path + '" fill="none" stroke="' + CHART_COLORS[i % CHART_COLORS.length] + '" stroke-width="' + strokeW + '" stroke-linecap="round"/>';
  }).join('');
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' + paths + '</svg>';
}

function buildLineChart(containerId, data, labels) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var W = el.offsetWidth || 600, H = 150;
  var pad = { top: 12, right: 16, bottom: 28, left: 40 };
  var innerW = W - pad.left - pad.right;
  var innerH = H - pad.top - pad.bottom;
  var max = Math.max.apply(null, data);
  var step = innerW / (data.length - 1);

  var pts = data.map(function(v, i) {
    return (pad.left + i * step) + ',' + (pad.top + innerH - (v / max) * innerH);
  }).join(' ');

  var areaFirst = pad.left + ',' + (pad.top + innerH);
  var areaLast = (pad.left + (data.length - 1) * step) + ',' + (pad.top + innerH);
  var areaPts = areaFirst + ' ' + pts + ' ' + areaLast;

  var xLabels = labels.map(function(l, i) {
    var x = pad.left + i * step;
    return '<text x="' + x + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + l + '</text>';
  }).join('');

  var dots = data.map(function(v, i) {
    var x = pad.left + i * step;
    var y = pad.top + innerH - (v / max) * innerH;
    return '<circle cx="' + x + '" cy="' + y + '" r="3.5" fill="#6760d8" stroke="#0E0E0E" stroke-width="1.5"/>';
  }).join('');

  var yLabels = [0, Math.round(max / 2), max].map(function(v) {
    var y = pad.top + innerH - (v / max) * innerH;
    return '<text x="' + (pad.left - 6) + '" y="' + (y + 4) + '" text-anchor="end" class="chart-axis-label">' + v + '</text>';
  }).join('');

  el.innerHTML = '<svg width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">' +
    '<defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6760d8" stop-opacity="0.3"/><stop offset="100%" stop-color="#6760d8" stop-opacity="0"/></linearGradient></defs>' +
    '<polygon points="' + areaPts + '" fill="url(#lg1)"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="#6760d8" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
    dots + xLabels + yLabels + '</svg>';
}

function initCharts() {
  buildDonutChart('donut-chart-1', [
    { label: 'Critical', value: 12 },
    { label: 'High', value: 28 },
    { label: 'Medium', value: 45 },
    { label: 'Low', value: 15 }
  ], 160);
  buildLineChart('line-chart-1',
    [24, 38, 30, 52, 47, 61, 55, 73, 68, 82, 76, 90],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  );
}

// ─── Icons ───
var ICONS = [
  { label: 'home', cat: 'navigation', path: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
  { label: 'chevron-right', cat: 'navigation', path: '<polyline points="9 18 15 12 9 6"/>' },
  { label: 'chevron-left', cat: 'navigation', path: '<polyline points="15 18 9 12 15 6"/>' },
  { label: 'chevron-up', cat: 'navigation', path: '<polyline points="18 15 12 9 6 15"/>' },
  { label: 'chevron-down', cat: 'navigation', path: '<polyline points="6 9 12 15 18 9"/>' },
  { label: 'arrow-right', cat: 'navigation', path: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>' },
  { label: 'arrow-left', cat: 'navigation', path: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>' },
  { label: 'arrow-up', cat: 'navigation', path: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>' },
  { label: 'arrow-down', cat: 'navigation', path: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>' },
  { label: 'external-link', cat: 'navigation', path: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>' },
  { label: 'menu', cat: 'navigation', path: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>' },
  { label: 'sidebar', cat: 'navigation', path: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>' },
  { label: 'plus', cat: 'actions', path: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>' },
  { label: 'minus', cat: 'actions', path: '<line x1="5" y1="12" x2="19" y2="12"/>' },
  { label: 'x', cat: 'actions', path: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' },
  { label: 'check', cat: 'actions', path: '<polyline points="20 6 9 17 4 12"/>' },
  { label: 'edit', cat: 'actions', path: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>' },
  { label: 'trash', cat: 'actions', path: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>' },
  { label: 'copy', cat: 'actions', path: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' },
  { label: 'download', cat: 'actions', path: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>' },
  { label: 'upload', cat: 'actions', path: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>' },
  { label: 'refresh', cat: 'actions', path: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>' },
  { label: 'search', cat: 'actions', path: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
  { label: 'filter', cat: 'actions', path: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>' },
  { label: 'settings', cat: 'actions', path: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>' },
  { label: 'share', cat: 'actions', path: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>' },
  { label: 'user', cat: 'actions', path: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  { label: 'users', cat: 'actions', path: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
  { label: 'mail', cat: 'actions', path: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' },
  { label: 'alert-circle', cat: 'status', path: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' },
  { label: 'alert-triangle', cat: 'status', path: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>' },
  { label: 'check-circle', cat: 'status', path: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' },
  { label: 'info', cat: 'status', path: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>' },
  { label: 'bell', cat: 'status', path: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>' },
  { label: 'shield', cat: 'status', path: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { label: 'lock', cat: 'status', path: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' },
  { label: 'eye', cat: 'status', path: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>' },
  { label: 'tag', cat: 'status', path: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>' },
  { label: 'flag', cat: 'status', path: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>' },
  { label: 'bar-chart', cat: 'data', path: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
  { label: 'pie-chart', cat: 'data', path: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>' },
  { label: 'trending-up', cat: 'data', path: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>' },
  { label: 'trending-down', cat: 'data', path: '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>' },
  { label: 'database', cat: 'data', path: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>' },
  { label: 'table', cat: 'data', path: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>' },
  { label: 'layers', cat: 'data', path: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>' },
  { label: 'file', cat: 'data', path: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>' },
  { label: 'calendar', cat: 'data', path: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>' },
  { label: 'clock', cat: 'data', path: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
  { label: 'image', cat: 'media', path: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>' },
  { label: 'video', cat: 'media', path: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>' },
  { label: 'play', cat: 'media', path: '<polygon points="5 3 19 12 5 21 5 3"/>' },
  { label: 'pause', cat: 'media', path: '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>' },
  { label: 'volume', cat: 'media', path: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>' },
  { label: 'camera', cat: 'media', path: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>' },
  { label: 'mic', cat: 'media', path: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>' },
  { label: 'headphones', cat: 'media', path: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>' }
];

var iconFilter = 'all';
var iconSearch = '';

function renderIcons() {
  var grid = document.getElementById('icon-grid');
  if (!grid) return;
  var filtered = ICONS.filter(function(ic) {
    var matchCat = iconFilter === 'all' || ic.cat === iconFilter;
    var matchSearch = ic.label.indexOf(iconSearch.toLowerCase()) !== -1;
    return matchCat && matchSearch;
  });
  var count = document.getElementById('icon-count');
  if (count) count.textContent = filtered.length + ' icons';
  grid.innerHTML = filtered.map(function(ic) {
    return '<button class="icon-card" data-label="' + ic.label + '" onclick="copyIcon(this,\'' + ic.label + '\')">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + ic.path + '</svg>' +
      '<span class="icon-card-label">' + ic.label + '</span></button>';
  }).join('');
}

function copyIcon(el, label) {
  el.classList.add('copied');
  el.querySelector('.icon-card-label').textContent = 'Copied!';
  if (navigator.clipboard) navigator.clipboard.writeText(label);
  setTimeout(function() {
    el.classList.remove('copied');
    el.querySelector('.icon-card-label').textContent = label;
  }, 1200);
}

var iconSearchInput = document.getElementById('icon-search');
if (iconSearchInput) {
  iconSearchInput.addEventListener('input', function() {
    iconSearch = iconSearchInput.value;
    renderIcons();
  });
}

document.querySelectorAll('.icon-cat-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.icon-cat-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    iconFilter = btn.dataset.cat;
    renderIcons();
  });
});

// Render icons on load
renderIcons();

// Re-init charts and icons when switching to those pages
document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
  item.addEventListener('click', function() {
    if (item.dataset.page === 'charts') {
      setTimeout(initCharts, 60);
    }
    if (item.dataset.page === 'icons') {
      renderIcons();
    }
  });
});

// Init charts if starting on charts page
if (document.querySelector('#page-charts.active')) {
  setTimeout(initCharts, 60);
}
