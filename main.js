// ─── Splash Screen ───
(function() {
  var splash  = document.getElementById('ds-splash');
  var counter = document.getElementById('ds-splash-counter');
  var reveal  = document.getElementById('ds-splash-logo-reveal');
  if (!splash || !counter || !reveal) return;

  var start    = performance.now();
  var duration = 2400; // ms to count 0→100
  var pct      = 0;

  function ease(t) {
    // ease-in-out: slow start, fast middle, slow at 100
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function tick(now) {
    var elapsed = now - start;
    var raw     = Math.min(elapsed / duration, 1);
    pct         = Math.round(ease(raw) * 100);

    counter.textContent = pct + '%';
    reveal.style.width  = pct + '%';

    if (raw < 1) {
      requestAnimationFrame(tick);
    } else {
      // Reached 100 — short pause then fade out
      setTimeout(function() {
        splash.classList.add('ds-splash-out');
        setTimeout(function() {
          splash.classList.add('ds-splash-done');
        }, 520);
      }, 180);
    }
  }

  requestAnimationFrame(tick);
})();

// ─── Design System Version (single source of truth) ───
var DS_VERSION = 'v2.1.110';
(function() {
  var el = document.getElementById('whats-new-version');
  if (el) el.textContent = DS_VERSION + ' \u2014 Latest';
  var badge = document.getElementById('whats-new-title-version');
  if (badge) badge.textContent = DS_VERSION;
})();

// ─── Top nav view switching ───
var dsLayout = document.querySelector('.ds-layout');
var _topnavItems = document.querySelectorAll('.ds-topnav-item');
_topnavItems.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var targetPage = btn.dataset.page;
    // Mark active tab
    _topnavItems.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    // Switch to view-ds
    document.querySelectorAll('.ds-view').forEach(function(v) { v.classList.remove('active'); });
    document.getElementById('view-ds').classList.add('active');
    // Sidebar only for Design System tab
    if (targetPage === 'home') {
      dsLayout.classList.remove('no-sidebar');
    } else {
      dsLayout.classList.add('no-sidebar');
    }
    // Navigate to the target page
    var navItem = document.querySelector('.nav-item[data-page="' + targetPage + '"]');
    if (navItem) {
      navItem.click();
    } else {
      document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
      var page = document.getElementById('page-' + targetPage);
      if (page) page.classList.add('active');
    }
  });
});

// ─── Global theme ───
var _globalThemeBtns = document.querySelectorAll('.theme-btn-global');
(function() {
  var saved = localStorage.getItem('ds-theme') || 'light';
  if (saved === 'light') document.documentElement.classList.add('theme-light');
  _globalThemeBtns.forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.globalTheme === saved);
  });
})();

_globalThemeBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    var theme = btn.dataset.globalTheme;
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('ds-theme', theme);
    _globalThemeBtns.forEach(function(b) {
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

let currentTheme = localStorage.getItem('ds-theme') || 'light';

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

// Nav accordion
function navAccOpen(acc) {
  if (!acc) return;
  acc.classList.add('open');
}
function navAccClose(acc) {
  if (!acc) return;
  acc.classList.remove('open');
}
function navAccToggle(acc) {
  acc.classList.toggle('open');
}
// Restore accordion state from localStorage
(function() {
  var saved = JSON.parse(localStorage.getItem('ds-acc') || '{}');
  document.querySelectorAll('.nav-accordion').forEach(function(acc) {
    var key = acc.dataset.acc;
    // Default open: foundation and components
    var isOpen = key in saved ? saved[key] : (key === 'foundation' || key === 'components');
    if (isOpen) navAccOpen(acc);
  });
})();
document.querySelectorAll('.nav-acc-toggle').forEach(function(toggle) {
  toggle.addEventListener('click', function() {
    var key = toggle.dataset.target;
    var acc = document.querySelector('.nav-accordion[data-acc="' + key + '"]');
    navAccToggle(acc);
    // Persist state
    var saved = JSON.parse(localStorage.getItem('ds-acc') || '{}');
    saved[key] = acc.classList.contains('open');
    localStorage.setItem('ds-acc', JSON.stringify(saved));
  });
});

// Page nav
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    // Auto-open accordion that contains this item
    var parentAcc = item.closest('.nav-accordion');
    if (parentAcc) navAccOpen(parentAcc);
    var page = document.getElementById('page-' + item.dataset.page);
    page.classList.add('active');
    // Re-init dual toggle indicators now that the page is visible
    page.querySelectorAll('.ds-dual-toggle').forEach(function(dt) {
      var indicator = dt.querySelector('.dt-indicator');
      var active = dt.querySelector('.dt-btn.active');
      if (indicator && active) {
        var dtRect = dt.getBoundingClientRect();
        var btnRect = active.getBoundingClientRect();
        indicator.style.left = (btnRect.left - dtRect.left) + 'px';
        indicator.style.width = btnRect.width + 'px';
      }
    });
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
// RAG scheme — severity/criticality only (Critical → High → Medium → Low)
const CHART_COLORS_RAG = ['#D12329', '#D98B1D', '#F5B700', '#31A56D'];
// Normal scheme — non-RAG colours for category/entity breakdowns
const CHART_COLORS_NORMAL = ['#6760d8', '#47adcb', '#2ea8a8', '#5c6bc0', '#8F8DDE', '#3a7fcb', '#7a9e7e', '#b87fba', '#c47e5a', '#7b95b4'];
// Default fallback (kept for backward compat)
const CHART_COLORS = CHART_COLORS_NORMAL;

// ─── Chart Tooltip ───────────────────────────────────────────────────────────
var _ctEl = null;
function _ct() { if (!_ctEl) _ctEl = document.getElementById('chart-tooltip'); return _ctEl; }

function showChartTooltip(e, title, rows, borderColor) {
  var el = _ct(); if (!el) return;
  var rowsHtml = rows.map(function(r) {
    var dot = r.color ? '<span class="ct-dot" style="background:' + r.color + ';"></span>' : '';
    var valStyle = r.active ? 'color:' + r.color + ';' : '';
    return '<div class="ct-row' + (r.active ? ' ct-active' : '') + '">' +
      '<span class="ct-label">' + dot + r.label + '</span>' +
      '<span class="ct-val" style="' + valStyle + '">' + r.value + '</span>' +
    '</div>';
  }).join('');
  el.innerHTML =
    '<div class="ct-arrow-outer" style="border-bottom:7px solid ' + borderColor + ';"></div>' +
    '<div class="ct-arrow-inner"></div>' +
    '<div class="ct-title">' + title + '</div>' +
    '<div class="ct-rows">' + rowsHtml + '</div>';
  el.style.border = '1px solid ' + borderColor;
  el.style.display = 'block';
  positionChartTooltip(e);
}

function positionChartTooltip(e) {
  var el = _ct(); if (!el || el.style.display === 'none') return;
  var tw = el.offsetWidth, th = el.offsetHeight;
  var x = e.clientX - tw / 2;
  var y = e.clientY + 18;
  var vw = window.innerWidth, vh = window.innerHeight;
  if (x + tw > vw - 8) x = vw - tw - 8;
  if (x < 8) x = 8;
  if (y + th > vh - 8) y = e.clientY - th - 18;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
}

function hideChartTooltip() { var el = _ct(); if (el) el.style.display = 'none'; }

// Converts polar coordinates to Cartesian. 0° = top (12 o'clock); angles increase clockwise.
function polarToCartesian(cx, cy, r, angleDeg) {
  var rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Returns an SVG arc path string from startAngle to endAngle (degrees, clockwise from top).
// Used by buildDonutChart to draw individual donut segments.
function describeArc(cx, cy, r, startAngle, endAngle) {
  var start = polarToCartesian(cx, cy, r, endAngle);
  var end = polarToCartesian(cx, cy, r, startAngle);
  var largeArc = (endAngle - startAngle) <= 180 ? '0' : '1';
  return 'M ' + start.x + ' ' + start.y + ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 0 ' + end.x + ' ' + end.y;
}

function buildDonutChart(containerId, data, size, colors) {
  size = size || 160;
  colors = colors || CHART_COLORS_NORMAL;
  var cx = size / 2, cy = size / 2;
  var outerR = size / 2 - 2;
  var strokeW = outerR * 0.12;
  var total = data.reduce(function(s, d) { return s + d.value; }, 0);
  var startAngle = 0;
  var paths = data.map(function(d, i) {
    var sweep = (d.value / total) * 360;
    var endAngle = startAngle + sweep - 8;
    var path = describeArc(cx, cy, outerR - strokeW / 2, startAngle, endAngle);
    startAngle += sweep;
    return '<path d="' + path + '" fill="none" stroke="' + colors[i % colors.length] + '" stroke-width="' + strokeW + '" stroke-linecap="round" style="cursor:pointer;" data-di="' + i + '"></path>';
  }).join('');
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" style="overflow:visible;">' + paths + '</svg>';
  el.querySelectorAll('path[data-di]').forEach(function(path) {
    var i = parseInt(path.dataset.di);
    var d = data[i], color = colors[i % colors.length];
    var pct = Math.round(d.value / total * 100) + '%';
    path.addEventListener('mouseover', function(e) {
      showChartTooltip(e, d.label, [
        { label: 'Value', value: d.value.toLocaleString(), color: color, active: false },
        { label: 'Share', value: pct, color: color, active: true }
      ], color);
    });
    path.addEventListener('mousemove', positionChartTooltip);
    path.addEventListener('mouseleave', hideChartTooltip);
  });
}

// ─── Legend with Values ───────────────────────────────────────────────────────
function hexToRgba(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function buildLegendTable(containerId, data) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var total = data.reduce(function(s, d) { return s + d.value; }, 0);
  var html = '';
  data.forEach(function(d) {
    var pct = total > 0 ? (d.value / total * 100) : 0;
    var pctStr = pct < 1 ? '<1%' : Math.round(pct) + '%';
    html += '<div class="chart-legend-row">' +
      '<div class="chart-legend-icon" style="background:' + hexToRgba(d.color, 0.12) + ';color:' + d.color + ';">' +
        (d.icon || '') +
      '</div>' +
      '<span class="chart-legend-name">' + d.label + '</span>' +
      '<span class="chart-legend-count">' + d.value.toLocaleString() + '</span>' +
      '<span class="chart-legend-pct">' + pctStr + '</span>' +
    '</div>';
  });
  el.innerHTML = html;
}

function buildVerticalBarChart(containerId, series, groups, colors) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var W = el.offsetWidth || 700;
  var H = 220;
  var pad = { top: 16, right: 16, bottom: 36, left: 44 };
  var innerW = W - pad.left - pad.right;
  var innerH = H - pad.top - pad.bottom;

  var allVals = [];
  series.forEach(function(s) { s.values.forEach(function(v) { allVals.push(v); }); });
  var maxVal = Math.max.apply(null, allVals);
  var yMax = Math.ceil(maxVal / 5) * 5 || 10;

  var numTicks = 5;
  var gridLines = '', yLabels = '';
  for (var t = 0; t <= numTicks; t++) {
    var val = Math.round((t / numTicks) * yMax);
    var gy = pad.top + innerH - (val / yMax) * innerH;
    gridLines += '<line x1="' + pad.left + '" y1="' + gy + '" x2="' + (pad.left + innerW) + '" y2="' + gy + '" stroke="var(--shell-border)" stroke-width="1"/>';
    yLabels += '<text x="' + (pad.left - 6) + '" y="' + (gy + 4) + '" text-anchor="end" class="chart-axis-label">' + val + '</text>';
  }

  var groupW = innerW / groups.length;
  var serCount = series.length;
  var barW = Math.max(6, Math.min(18, (groupW * 0.72) / serCount - 3));
  var barGap = 3;
  var bars = '', xLabels = '';

  groups.forEach(function(grp, gi) {
    var groupCX = pad.left + gi * groupW + groupW / 2;
    var totalBarsW = serCount * barW + (serCount - 1) * barGap;
    var startX = groupCX - totalBarsW / 2;
    series.forEach(function(s, si) {
      var v = s.values[gi];
      var bh = Math.max(2, (v / yMax) * innerH);
      var bx = startX + si * (barW + barGap);
      var by = pad.top + innerH - bh;
      bars += '<rect x="' + bx + '" y="' + by + '" width="' + barW + '" height="' + bh + '" fill="' + (colors[si] || CHART_COLORS[si]) + '" rx="2" class="chart-bar" data-gi="' + gi + '" data-si="' + si + '"></rect>';
    });
    xLabels += '<text x="' + groupCX + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + grp + '</text>';
  });

  var axes = '<line x1="' + pad.left + '" y1="' + pad.top + '" x2="' + pad.left + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>' +
    '<line x1="' + pad.left + '" y1="' + (pad.top + innerH) + '" x2="' + (pad.left + innerW) + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>';

  el.innerHTML = '<svg class="chart-bar-svg" width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">' +
    gridLines + axes + bars + yLabels + xLabels + '</svg>';

  el.querySelectorAll('.chart-bar').forEach(function(bar) {
    bar.addEventListener('mouseover', function(e) {
      var gi = parseInt(this.dataset.gi), si = parseInt(this.dataset.si);
      var color = colors[si] || CHART_COLORS[si];
      showChartTooltip(e, groups[gi], [
        { label: series[si].label, value: series[si].values[gi].toLocaleString(), color: color, active: true }
      ], color);
    });
    bar.addEventListener('mousemove', positionChartTooltip);
    bar.addEventListener('mouseleave', hideChartTooltip);
  });
}

function buildLineChart(containerId, data, labels) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var W = el.offsetWidth || 700;
  var H = 170;
  var pad = { top: 16, right: 20, bottom: 32, left: 44 };
  var innerW = W - pad.left - pad.right;
  var innerH = H - pad.top - pad.bottom;
  var max = Math.max.apply(null, data);
  var yMax = Math.ceil(max / 10) * 10 || 10;
  var step = innerW / (data.length - 1);

  var numTicks = 4;
  var gridLines = '', yLabels = '';
  for (var t = 0; t <= numTicks; t++) {
    var val = Math.round((t / numTicks) * yMax);
    var gy = pad.top + innerH - (val / yMax) * innerH;
    gridLines += '<line x1="' + pad.left + '" y1="' + gy + '" x2="' + (pad.left + innerW) + '" y2="' + gy + '" stroke="var(--shell-border)" stroke-width="1"/>';
    yLabels += '<text x="' + (pad.left - 6) + '" y="' + (gy + 4) + '" text-anchor="end" class="chart-axis-label">' + val + '</text>';
  }

  var pts = data.map(function(v, i) {
    return (pad.left + i * step).toFixed(1) + ',' + (pad.top + innerH - (v / yMax) * innerH).toFixed(1);
  }).join(' ');

  var areaFirst = pad.left + ',' + (pad.top + innerH);
  var areaLast = (pad.left + (data.length - 1) * step).toFixed(1) + ',' + (pad.top + innerH);
  var areaPts = areaFirst + ' ' + pts + ' ' + areaLast;

  var xLabels = labels.map(function(l, i) {
    var x = (pad.left + i * step).toFixed(1);
    return '<text x="' + x + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + l + '</text>';
  }).join('');

  var dotStroke = document.body.classList.contains('theme-light') ? '#FFFFFF' : '#0E0E0E';

  // Visible dots (pointer-events:none — hit detection handled by overlay circles)
  var pointCoords = data.map(function(v, i) {
    return { x: parseFloat((pad.left + i * step).toFixed(1)), y: parseFloat((pad.top + innerH - (v / yMax) * innerH).toFixed(1)) };
  });
  var visibleDots = pointCoords.map(function(p) {
    return '<circle cx="' + p.x + '" cy="' + p.y + '" r="5" fill="#6760d8" stroke="' + dotStroke + '" stroke-width="1.5" pointer-events="none"></circle>';
  }).join('');
  // Invisible overlay circles — r=16 gives 32px hit area (Fitts's Law)
  var overlayDots = pointCoords.map(function(p, i) {
    return '<circle cx="' + p.x + '" cy="' + p.y + '" r="16" fill="transparent" style="cursor:pointer;" data-li="' + i + '"></circle>';
  }).join('');

  var axes = '<line x1="' + pad.left + '" y1="' + pad.top + '" x2="' + pad.left + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>' +
    '<line x1="' + pad.left + '" y1="' + (pad.top + innerH) + '" x2="' + (pad.left + innerW) + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>';

  el.innerHTML = '<svg width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" style="overflow:visible;">' +
    '<defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6760d8" stop-opacity="0.25"/><stop offset="100%" stop-color="#6760d8" stop-opacity="0"/></linearGradient></defs>' +
    gridLines + axes +
    '<polygon points="' + areaPts + '" fill="url(#lg1)"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="#6760d8" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
    visibleDots + xLabels + yLabels + overlayDots + '</svg>';

  // Overlay circles handle hover — snaps tooltip to exact dot position
  el.querySelectorAll('circle[data-li]').forEach(function(circle) {
    var i = parseInt(circle.dataset.li);
    circle.addEventListener('mouseover', function() {
      // Synthesise event at exact dot position so tooltip caret aligns to the point
      var svgEl = circle.closest('svg');
      var rect = svgEl.getBoundingClientRect();
      var scaleX = rect.width / W;
      var syntheticE = { clientX: rect.left + pointCoords[i].x * scaleX, clientY: rect.top + pointCoords[i].y * (rect.height / H) };
      showChartTooltip(syntheticE, labels[i], [
        { label: 'Total Findings', value: data[i].toLocaleString(), color: '#6760d8', active: true }
      ], '#6760d8');
    });
    circle.addEventListener('mousemove', positionChartTooltip);
    circle.addEventListener('mouseleave', hideChartTooltip);
  });
}

// Builds a multi-series line chart with optional reference line, axis labels, and hover tooltips.
// Each series in `series` is { label, values[], color }. `labels` are the x-axis tick labels.
// opts: { refLine: { value, color, label }, yAxisLabel, xAxisLabel, stat: { value, label } }
function buildMultiLineChart(containerId, series, labels, opts) {
  opts = opts || {};
  var el = document.getElementById(containerId);
  if (!el) return;
  var W = el.offsetWidth || 700;
  var H = 240;
  var pad = { top: 20, right: 24, bottom: 36, left: 52 };
  var innerW = W - pad.left - pad.right;
  var innerH = H - pad.top - pad.bottom;

  var allVals = [];
  series.forEach(function(s) { s.values.forEach(function(v) { allVals.push(v); }); });
  if (opts.refLine) allVals.push(opts.refLine.value);
  var yMax = Math.ceil(Math.max.apply(null, allVals) * 1.1 / 50) * 50 || 10;
  var step = innerW / (labels.length - 1);
  var numTicks = 5;
  var gridLines = '', yLabels = '';
  for (var t = 0; t <= numTicks; t++) {
    var val = Math.round((t / numTicks) * yMax);
    var gy = pad.top + innerH - (val / yMax) * innerH;
    gridLines += '<line x1="' + pad.left + '" y1="' + gy.toFixed(1) + '" x2="' + (pad.left + innerW) + '" y2="' + gy.toFixed(1) + '" stroke="var(--shell-border)" stroke-width="1"/>';
    yLabels += '<text x="' + (pad.left - 8) + '" y="' + (gy + 4).toFixed(1) + '" text-anchor="end" class="chart-axis-label">' + val + '</text>';
  }

  // Y-axis label (rotated)
  var yAxisLabelSvg = '';
  if (opts.yAxisLabel) {
    yAxisLabelSvg = '<text x="12" y="' + (pad.top + innerH / 2) + '" text-anchor="middle" class="chart-axis-label" transform="rotate(-90,12,' + (pad.top + innerH / 2) + ')">' + opts.yAxisLabel + '</text>';
  }

  var xLabels = labels.map(function(l, i) {
    var show = labels.length <= 8 || i % Math.ceil(labels.length / 8) === 0 || i === labels.length - 1;
    if (!show) return '';
    return '<text x="' + (pad.left + i * step).toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + l + '</text>';
  }).join('');

  // X-axis label
  var xAxisLabelSvg = '';
  if (opts.xAxisLabel) {
    xAxisLabelSvg = '<text x="' + (pad.left + innerW / 2) + '" y="' + (H + 14) + '" text-anchor="middle" class="chart-axis-label">' + opts.xAxisLabel + '</text>';
  }

  var axes =
    '<line x1="' + pad.left + '" y1="' + pad.top + '" x2="' + pad.left + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>' +
    '<line x1="' + pad.left + '" y1="' + (pad.top + innerH) + '" x2="' + (pad.left + innerW) + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>';

  // Reference line (dashed)
  var refLineSvg = '';
  if (opts.refLine) {
    var ry = (pad.top + innerH - (opts.refLine.value / yMax) * innerH).toFixed(1);
    var rc = opts.refLine.color || '#D12329';
    refLineSvg = '<line x1="' + pad.left + '" y1="' + ry + '" x2="' + (pad.left + innerW) + '" y2="' + ry + '" stroke="' + rc + '" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.8"/>';
  }

  var dotStroke = document.documentElement.classList.contains('theme-light') ? '#FFFFFF' : '#131313';
  var defs = '<defs>';
  var seriesSvg = '';
  var allPointCoords = [];

  series.forEach(function(s, si) {
    var uid = 'mlg' + Date.now() + si;
    var coords = s.values.map(function(v, i) {
      return { x: parseFloat((pad.left + i * step).toFixed(1)), y: parseFloat((pad.top + innerH - (v / yMax) * innerH).toFixed(1)) };
    });
    allPointCoords.push(coords);
    var pts = coords.map(function(p) { return p.x + ',' + p.y; }).join(' ');

    // Subtle area fill for first series only
    if (si === 0) {
      defs += '<linearGradient id="' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="' + s.color + '" stop-opacity="0.12"/>' +
        '<stop offset="100%" stop-color="' + s.color + '" stop-opacity="0"/>' +
        '</linearGradient>';
      var af = pad.left + ',' + (pad.top + innerH);
      var al = (pad.left + (s.values.length - 1) * step).toFixed(1) + ',' + (pad.top + innerH);
      seriesSvg += '<polygon points="' + af + ' ' + pts + ' ' + al + '" fill="url(#' + uid + ')"/>';
    }

    seriesSvg += '<polyline points="' + pts + '" fill="none" stroke="' + s.color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
    seriesSvg += coords.map(function(p) {
      return '<circle cx="' + p.x + '" cy="' + p.y + '" r="4" fill="' + s.color + '" stroke="' + dotStroke + '" stroke-width="1.5" pointer-events="none"></circle>';
    }).join('');
  });

  // Hover overlay — vertical slices per x-position
  var overlays = labels.map(function(_l, i) {
    var ox = (pad.left + i * step).toFixed(1);
    return '<rect x="' + (parseFloat(ox) - step / 2) + '" y="' + pad.top + '" width="' + step + '" height="' + innerH + '" fill="transparent" style="cursor:pointer;" data-mli="' + i + '"></rect>';
  }).join('');

  defs += '</defs>';
  el.innerHTML = '<svg width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" style="overflow:visible;">' +
    defs + gridLines + refLineSvg + axes + seriesSvg + yLabels + xLabels + yAxisLabelSvg + xAxisLabelSvg + overlays + '</svg>';

  // Hover — show all series values at that x-index
  el.querySelectorAll('rect[data-mli]').forEach(function(rect) {
    var i = parseInt(rect.dataset.mli);
    rect.addEventListener('mouseover', function(e) {
      var rows = series.map(function(s) {
        return { label: s.label, value: s.values[i].toLocaleString(), color: s.color, active: false };
      });
      showChartTooltip(e, labels[i], rows, series[0].color);
    });
    rect.addEventListener('mousemove', positionChartTooltip);
    rect.addEventListener('mouseleave', hideChartTooltip);
  });

  // Stat summary below chart
  if (opts.stat) {
    var statEl = document.getElementById(containerId + '-stat');
    if (statEl) {
      statEl.innerHTML =
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>' +
        '<strong>' + opts.stat.value + '</strong> ' + opts.stat.label;
    }
  }
}

function buildStackedBarChart(containerId, rows, xLabel) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var W  = el.offsetWidth || 560;
  var LW = 80;
  var CW = W - LW;
  var BH = 10;
  var RH = 36;
  var AH = 24;
  var PT = 6;
  var H  = PT + rows.length * RH + AH;
  var COLORS = ['#d12329','#e15252','#d98b1d','#31a56d'];
  var KEYS   = ['critical','high','medium','low'];
  var out = '<svg width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" overflow="visible">';
  [0,20,40,60,80,100].forEach(function(p) {
    var gx = LW + (p / 100) * CW;
    out += '<line x1="' + gx + '" y1="' + PT + '" x2="' + gx + '" y2="' + (H - AH) + '" stroke="var(--card-border,#e6e6e6)" stroke-width="1"/>';
    out += '<text x="' + gx + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + (p === 0 ? '0' : p + '%') + '</text>';
  });
  out += '<line x1="' + LW + '" y1="' + (H - AH) + '" x2="' + W + '" y2="' + (H - AH) + '" stroke="var(--card-border,#e6e6e6)" stroke-width="1"/>';
  rows.forEach(function(row, ri) {
    var by = PT + ri * RH + (RH - BH) / 2;
    var cy = PT + ri * RH + RH / 2;
    var lines = row.label.split('\n');
    if (lines.length === 1) {
      out += '<text x="' + (LW - 6) + '" y="' + (cy + 4) + '" text-anchor="end" class="chart-axis-label">' + row.label + '</text>';
    } else {
      var ly = cy - (lines.length - 1) * 7;
      lines.forEach(function(line, li) {
        out += '<text x="' + (LW - 6) + '" y="' + (ly + li * 13) + '" text-anchor="end" class="chart-axis-label">' + line + '</text>';
      });
    }
    out += '<rect x="' + LW + '" y="' + by + '" width="' + CW + '" height="' + BH + '" fill="#f5f5f5" rx="3"/>';
    var xo = 0;
    KEYS.forEach(function(k, ki) {
      var v = +row[k] || 0;
      if (v <= 0) return;
      var sw = (v / 100) * CW;
      out += '<rect x="' + (LW + xo) + '" y="' + by + '" width="' + sw + '" height="' + BH + '" fill="' + COLORS[ki] + '" rx="2"/>';
      if (xo > 0) out += '<rect x="' + (LW + xo) + '" y="' + by + '" width="3" height="' + BH + '" fill="' + COLORS[ki] + '"/>';
      if (ki < KEYS.length - 1 && (+row[KEYS[ki + 1]] || 0) > 0)
        out += '<rect x="' + (LW + xo + sw - 3) + '" y="' + by + '" width="3" height="' + BH + '" fill="' + COLORS[ki] + '"/>';
      xo += sw;
    });
    out += '<rect x="' + LW + '" y="' + by + '" width="' + CW + '" height="' + BH + '" fill="transparent" style="cursor:pointer;"' +
      ' data-label="' + row.label.replace('\n',' ') + '"' +
      ' data-critical="' + (row.critical||0) + '" data-high="' + (row.high||0) + '"' +
      ' data-medium="' + (row.medium||0) + '" data-low="' + (row.low||0) + '"/>';
  });
  if (xLabel) out += '<text x="' + ((LW + W) / 2) + '" y="' + (H + 4) + '" text-anchor="middle" class="chart-axis-label">' + xLabel + '</text>';
  out += '</svg>';
  el.innerHTML = out;
  el.querySelectorAll('rect[data-label]').forEach(function(r) {
    r.addEventListener('mouseover', function(e) {
      showChartTooltip(e, r.dataset.label, [
        { label: 'Critical', value: r.dataset.critical + '%', color: '#d12329', active: false },
        { label: 'High',     value: r.dataset.high     + '%', color: '#e15252', active: false },
        { label: 'Medium',   value: r.dataset.medium   + '%', color: '#d98b1d', active: false },
        { label: 'Low',      value: r.dataset.low      + '%', color: '#31a56d', active: true  }
      ], '#d12329');
    });
    r.addEventListener('mousemove', positionChartTooltip);
    r.addEventListener('mouseleave', hideChartTooltip);
  });
}

function initCharts() {
  buildVerticalBarChart('vbar-chart-1',
    [
      { label: 'Critical', values: [14, 11, 18, 9, 12, 6] },
      { label: 'High',     values: [17, 18, 15, 13, 11, 10] },
      { label: 'Medium',   values: [20, 16, 19, 14, 13, 11] },
      { label: 'Low',      values: [8,  10, 12, 16, 18, 20] }
    ],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    ['#D12329', '#D98B1D', '#6760d8', '#31A56D']
  );
  buildDonutChart('donut-chart-1', [
    { label: 'Critical', value: 12 },
    { label: 'High', value: 28 },
    { label: 'Medium', value: 45 },
    { label: 'Low', value: 15 }
  ], 180, CHART_COLORS_RAG);
  // Legend with values — Normal color scheme
  var _iconLaptop = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>';
  var _iconServer = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>';
  var _iconNetwork = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5.5" y2="16"/><line x1="12" y1="8" x2="18.5" y2="16"/></svg>';
  var _iconMobile = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
  var _iconOther = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>';
  var _legendData = [
    { label: 'Workstation', value: 1730006, color: '#6760d8', icon: _iconLaptop },
    { label: 'Server',      value: 1425134, color: '#47adcb', icon: _iconServer },
    { label: 'Network',     value: 44564,   color: '#2ea8a8', icon: _iconNetwork },
    { label: 'Mobile',      value: 19264,   color: '#5c6bc0', icon: _iconMobile },
    { label: 'Others',      value: 68000,   color: '#8F8DDE', icon: _iconOther }
  ];
  buildDonutChart('donut-legend-1', _legendData, 160, CHART_COLORS_NORMAL);
  buildLegendTable('legend-table-1', _legendData);
  buildLineChart('line-chart-1',
    [24, 38, 30, 52, 47, 61, 55, 73, 68, 82, 76, 90],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  );
  buildMultiLineChart('multiline-chart-1', [
    { label: 'Control Gap',          color: '#8F8DDE', values: [490, 370, 380, 440, 450, 420, 390, 460, 500, 540, 590, 670] },
    { label: 'Software Vulnerability', color: '#3a7fcb', values: [490, 370, 360, 390, 430, 460, 430, 480, 540, 570, 600, 620] }
  ], ['29 May','02 Jun','06 Jun','10 Jun','14 Jun','18 Jun','22 Jun','26 Jun','30 Jun','04 Jul','08 Jul','12 Jul'], {
    refLine: { value: 500, color: '#D12329' },
    yAxisLabel: 'Score',
    xAxisLabel: 'Days',
    stat: { value: '0.95%', label: 'Average Rate of Change' }
  });
  buildStackedBarChart('stacked-bar-chart-1', [
    { label: 'Device',    critical: 37, high: 6,  medium: 19, low: 38 },
    { label: 'Cloud',     critical: 9,  high: 8,  medium: 47, low: 36 },
    { label: 'Identity',  critical: 3,  high: 1,  medium: 2,  low: 94 },
    { label: 'Network',   critical: 21, high: 14, medium: 33, low: 32 },
    { label: 'App',       critical: 15, high: 28, medium: 41, low: 16 }
  ], '% of Asset Count');
  // Horizontal bar chart hover
  document.querySelectorAll('.css-hbar-row').forEach(function(row) {
    var bar = row.querySelector('.css-hbar');
    var labelEl = row.querySelector('.css-hbar-label');
    var valEl = row.querySelector('.css-hbar-val');
    if (!bar || !labelEl || !valEl) return;
    var color = bar.style.background;
    var label = labelEl.textContent.trim();
    var value = valEl.textContent.trim();
    row.addEventListener('mouseover', function(e) {
      showChartTooltip(e, label, [
        { label: 'Count', value: value, color: color, active: true }
      ], color);
    });
    row.addEventListener('mousemove', positionChartTooltip);
    row.addEventListener('mouseleave', hideChartTooltip);
  });
}

// ─── Icons ───
var ICONS = [
  { file: 'CEI ID.svg', label: 'CEI ID', cat: 'general' },
  { file: 'CEI Title.svg', label: 'CEI Title', cat: 'general' },
  { file: 'CEI status.svg', label: 'CEI status', cat: 'status' },
  { file: 'Count.svg', label: 'Count', cat: 'data' },
  { file: 'FileText-1.svg', label: 'FileText-1', cat: 'general' },
  { file: 'FileText.svg', label: 'FileText', cat: 'general' },
  { file: 'KPI.svg', label: 'KPI', cat: 'data' },
  { file: 'Link.svg', label: 'Link', cat: 'general' },
  { file: 'SOX Control.svg', label: 'SOX Control', cat: 'general' },
  { file: 'activity-status-1.svg', label: 'activity-status-1', cat: 'status' },
  { file: 'activity-status.svg', label: 'activity-status', cat: 'status' },
  { file: 'activity.svg', label: 'activity', cat: 'general' },
  { file: 'add-circle.svg', label: 'add-circle', cat: 'actions' },
  { file: 'add.svg', label: 'add', cat: 'actions' },
  { file: 'agentic-mode.svg', label: 'agentic-mode', cat: 'general' },
  { file: 'ai.svg', label: 'ai', cat: 'general' },
  { file: 'arrows-1.svg', label: 'arrows-1', cat: 'navigation' },
  { file: 'arrows-2.svg', label: 'arrows-2', cat: 'navigation' },
  { file: 'arrows-3.svg', label: 'arrows-3', cat: 'navigation' },
  { file: 'arrows-4.svg', label: 'arrows-4', cat: 'navigation' },
  { file: 'arrows-5.svg', label: 'arrows-5', cat: 'navigation' },
  { file: 'arrows-in.svg', label: 'arrows-in', cat: 'navigation' },
  { file: 'arrows-out.svg', label: 'arrows-out', cat: 'navigation' },
  { file: 'arrows-up-down.svg', label: 'arrows-up-down', cat: 'navigation' },
  { file: 'arrows.svg', label: 'arrows', cat: 'navigation' },
  { file: 'assessment-add.svg', label: 'assessment-add', cat: 'actions' },
  { file: 'assessment-name.svg', label: 'assessment-name', cat: 'general' },
  { file: 'assessment.svg', label: 'assessment', cat: 'general' },
  { file: 'bookmark.svg', label: 'bookmark', cat: 'general' },
  { file: 'business-unit.svg', label: 'business-unit', cat: 'general' },
  { file: 'calendar-add.svg', label: 'calendar-add', cat: 'actions' },
  { file: 'calendar-delete.svg', label: 'calendar-delete', cat: 'actions' },
  { file: 'calendar.svg', label: 'calendar', cat: 'general' },
  { file: 'canvas.svg', label: 'canvas', cat: 'general' },
  { file: 'card-collapse.svg', label: 'card-collapse', cat: 'navigation' },
  { file: 'card-expand.svg', label: 'card-expand', cat: 'navigation' },
  { file: 'check-circle.svg', label: 'check-circle', cat: 'status' },
  { file: 'check-cor.svg', label: 'check-cor', cat: 'status' },
  { file: 'check.svg', label: 'check', cat: 'status' },
  { file: 'class.svg', label: 'class', cat: 'general' },
  { file: 'clock.svg', label: 'clock', cat: 'status' },
  { file: 'close-circle.svg', label: 'close-circle', cat: 'status' },
  { file: 'close.svg', label: 'close', cat: 'actions' },
  { file: 'color.svg', label: 'color', cat: 'general' },
  { file: 'combination.svg', label: 'combination', cat: 'general' },
  { file: 'compare-trend.svg', label: 'compare-trend', cat: 'data' },
  { file: 'compliance-standard.svg', label: 'compliance-standard', cat: 'general' },
  { file: 'compliance-threshold.svg', label: 'compliance-threshold', cat: 'general' },
  { file: 'contribution.svg', label: 'contribution', cat: 'data' },
  { file: 'control-gap.svg', label: 'control-gap', cat: 'general' },
  { file: 'control.svg', label: 'control', cat: 'general' },
  { file: 'count-vf.svg', label: 'count-vf', cat: 'data' },
  { file: 'criticality.svg', label: 'criticality', cat: 'general' },
  { file: 'dasboard-edit.svg', label: 'dasboard-edit', cat: 'actions' },
  { file: 'database-search.svg', label: 'database-search', cat: 'data' },
  { file: 'deep-dive.svg', label: 'deep-dive', cat: 'general' },
  { file: 'default-assessment.svg', label: 'default-assessment', cat: 'general' },
  { file: 'delete.svg', label: 'delete', cat: 'actions' },
  { file: 'display-label.svg', label: 'display-label', cat: 'actions' },
  { file: 'donut.svg', label: 'donut', cat: 'data' },
  { file: 'download-values.svg', label: 'download-values', cat: 'actions' },
  { file: 'download.svg', label: 'download', cat: 'actions' },
  { file: 'downloads.svg', label: 'downloads', cat: 'actions' },
  { file: 'drag-widget.svg', label: 'drag-widget', cat: 'navigation' },
  { file: 'drag.svg', label: 'drag', cat: 'navigation' },
  { file: 'duplicate-filter.svg', label: 'duplicate-filter', cat: 'actions' },
  { file: 'duplicate.svg', label: 'duplicate', cat: 'actions' },
  { file: 'edit.svg', label: 'edit', cat: 'actions' },
  { file: 'entity-add.svg', label: 'entity-add', cat: 'actions' },
  { file: 'entity-error.svg', label: 'entity-error', cat: 'general' },
  { file: 'entity-ticket.svg', label: 'entity-ticket', cat: 'general' },
  { file: 'explicit-exclude.svg', label: 'explicit-exclude', cat: 'general' },
  { file: 'explore-in.svg', label: 'explore-in', cat: 'navigation' },
  { file: 'fail.svg', label: 'fail', cat: 'status' },
  { file: 'file-error.svg', label: 'file-error', cat: 'general' },
  { file: 'file.svg', label: 'file', cat: 'general' },
  { file: 'filter.svg', label: 'filter', cat: 'actions' },
  { file: 'findings-kpi.svg', label: 'findings-kpi', cat: 'data' },
  { file: 'fix.svg', label: 'fix', cat: 'actions' },
  { file: 'fragments.svg', label: 'fragments', cat: 'general' },
  { file: 'framework-mapping.svg', label: 'framework-mapping', cat: 'actions' },
  { file: 'general.svg', label: 'general', cat: 'general' },
  { file: 'hide.svg', label: 'hide', cat: 'actions' },
  { file: 'history.svg', label: 'history', cat: 'general' },
  { file: 'horizontal bar.svg', label: 'horizontal bar', cat: 'data' },
  { file: 'human-exposure.svg', label: 'human-exposure', cat: 'general' },
  { file: 'icon-explore.svg', label: 'icon-explore', cat: 'general' },
  { file: 'icon-vlan.svg', label: 'icon-vlan', cat: 'general' },
  { file: 'implicit-include.svg', label: 'implicit-include', cat: 'general' },
  { file: 'info-general.svg', label: 'info-general', cat: 'general' },
  { file: 'info.svg', label: 'info', cat: 'general' },
  { file: 'infrastructure-type.svg', label: 'infrastructure-type', cat: 'general' },
  { file: 'insights-kpi.svg', label: 'insights-kpi', cat: 'data' },
  { file: 'insights.svg', label: 'insights', cat: 'data' },
  { file: 'instructions-edit.svg', label: 'instructions-edit', cat: 'actions' },
  { file: 'interactive-mode.svg', label: 'interactive-mode', cat: 'general' },
  { file: 'iot.svg', label: 'iot', cat: 'general' },
  { file: 'key.svg', label: 'key', cat: 'status' },
  { file: 'layers.svg', label: 'layers', cat: 'general' },
  { file: 'line.svg', label: 'line', cat: 'data' },
  { file: 'list.svg', label: 'list', cat: 'general' },
  { file: 'lock.svg', label: 'lock', cat: 'status' },
  { file: 'menu.svg', label: 'menu', cat: 'navigation' },
  { file: 'misconfiguration.svg', label: 'misconfiguration', cat: 'general' },
  { file: 'move.svg', label: 'move', cat: 'navigation' },
  { file: 'navbar-KG-DQ.svg', label: 'navbar-KG-DQ', cat: 'navigation' },
  { file: 'navbar-KG-kg.svg', label: 'navbar-KG-kg', cat: 'navigation' },
  { file: 'navbar-campaign progress.svg', label: 'navbar-campaign progress', cat: 'navigation' },
  { file: 'navbar-ccm.svg', label: 'navbar-ccm', cat: 'navigation' },
  { file: 'navbar-ciso.svg', label: 'navbar-ciso', cat: 'navigation' },
  { file: 'navbar-cloud.svg', label: 'navbar-cloud', cat: 'navigation' },
  { file: 'navbar-compliance.svg', label: 'navbar-compliance', cat: 'navigation' },
  { file: 'navbar-dashboard.svg', label: 'navbar-dashboard', cat: 'navigation' },
  { file: 'navbar-data quality.svg', label: 'navbar-data quality', cat: 'navigation' },
  { file: 'navbar-device.svg', label: 'navbar-device', cat: 'navigation' },
  { file: 'navbar-discover.svg', label: 'navbar-discover', cat: 'navigation' },
  { file: 'navbar-exposure.svg', label: 'navbar-exposure', cat: 'navigation' },
  { file: 'navbar-findings-1.svg', label: 'navbar-findings-1', cat: 'navigation' },
  { file: 'navbar-findings.svg', label: 'navbar-findings', cat: 'navigation' },
  { file: 'navbar-history.svg', label: 'navbar-history', cat: 'navigation' },
  { file: 'navbar-home.svg', label: 'navbar-home', cat: 'navigation' },
  { file: 'navbar-identity.svg', label: 'navbar-identity', cat: 'navigation' },
  { file: 'navbar-in depth.svg', label: 'navbar-in depth', cat: 'navigation' },
  { file: 'navbar-kg.svg', label: 'navbar-kg', cat: 'navigation' },
  { file: 'navbar-overview-1.svg', label: 'navbar-overview-1', cat: 'navigation' },
  { file: 'navbar-overview.svg', label: 'navbar-overview', cat: 'navigation' },
  { file: 'navbar-recommendations.svg', label: 'navbar-recommendations', cat: 'navigation' },
  { file: 'navbar-remediation.svg', label: 'navbar-remediation', cat: 'navigation' },
  { file: 'navbar-report.svg', label: 'navbar-report', cat: 'navigation' },
  { file: 'navbar-trend.svg', label: 'navbar-trend', cat: 'navigation' },
  { file: 'navbar-workspace.svg', label: 'navbar-workspace', cat: 'navigation' },
  { file: 'navigation.svg', label: 'navigation', cat: 'navigation' },
  { file: 'new-thread.svg', label: 'new-thread', cat: 'actions' },
  { file: 'newly-added.svg', label: 'newly-added', cat: 'actions' },
  { file: 'notification-alert.svg', label: 'notification-alert', cat: 'status' },
  { file: 'notification-edit.svg', label: 'notification-edit', cat: 'status' },
  { file: 'notifications-new.svg', label: 'notifications-new', cat: 'status' },
  { file: 'notifications.svg', label: 'notifications', cat: 'status' },
  { file: 'null.svg', label: 'null', cat: 'status' },
  { file: 'open-ticket-SOX.svg', label: 'open-ticket-SOX', cat: 'navigation' },
  { file: 'open-tickets-PCI.svg', label: 'open-tickets-PCI', cat: 'navigation' },
  { file: 'open-tickets.svg', label: 'open-tickets', cat: 'navigation' },
  { file: 'open.svg', label: 'open', cat: 'navigation' },
  { file: 'operational-exposure.svg', label: 'operational-exposure', cat: 'general' },
  { file: 'origin.svg', label: 'origin', cat: 'general' },
  { file: 'os-family.svg', label: 'os-family', cat: 'general' },
  { file: 'pass.svg', label: 'pass', cat: 'status' },
  { file: 'patch.svg', label: 'patch', cat: 'actions' },
  { file: 'pause.svg', label: 'pause', cat: 'actions' },
  { file: 'people.svg', label: 'people', cat: 'general' },
  { file: 'pin.svg', label: 'pin', cat: 'actions' },
  { file: 'play.svg', label: 'play', cat: 'actions' },
  { file: 'premise.svg', label: 'premise', cat: 'general' },
  { file: 'preview.svg', label: 'preview', cat: 'actions' },
  { file: 'printer.svg', label: 'printer', cat: 'actions' },
  { file: 'project-item-selected.svg', label: 'project-item-selected', cat: 'general' },
  { file: 'project-item.svg', label: 'project-item', cat: 'general' },
  { file: 'project-new.svg', label: 'project-new', cat: 'general' },
  { file: 'projects.svg', label: 'projects', cat: 'general' },
  { file: 'publish.svg', label: 'publish', cat: 'actions' },
  { file: 'redo.svg', label: 'redo', cat: 'actions' },
  { file: 'refresh.svg', label: 'refresh', cat: 'actions' },
  { file: 'reset.svg', label: 'reset', cat: 'actions' },
  { file: 'resize.svg', label: 'resize', cat: 'navigation' },
  { file: 'retry.svg', label: 'retry', cat: 'actions' },
  { file: 'save-filter.svg', label: 'save-filter', cat: 'actions' },
  { file: 'save.svg', label: 'save', cat: 'actions' },
  { file: 'scope.svg', label: 'scope', cat: 'general' },
  { file: 'search.svg', label: 'search', cat: 'actions' },
  { file: 'security-control.svg', label: 'security-control', cat: 'general' },
  { file: 'send.svg', label: 'send', cat: 'actions' },
  { file: 'settings.svg', label: 'settings', cat: 'actions' },
  { file: 'severity.svg', label: 'severity', cat: 'general' },
  { file: 'share.svg', label: 'share', cat: 'actions' },
  { file: 'sidebar-1.svg', label: 'sidebar-1', cat: 'navigation' },
  { file: 'sidebar-2.svg', label: 'sidebar-2', cat: 'navigation' },
  { file: 'sidebar-3.svg', label: 'sidebar-3', cat: 'navigation' },
  { file: 'sidebar.svg', label: 'sidebar', cat: 'navigation' },
  { file: 'skip.svg', label: 'skip', cat: 'actions' },
  { file: 'software.svg', label: 'software', cat: 'general' },
  { file: 'sort-ascending.svg', label: 'sort-ascending', cat: 'general' },
  { file: 'sort-by.svg', label: 'sort-by', cat: 'general' },
  { file: 'sort-default.svg', label: 'sort-default', cat: 'general' },
  { file: 'sort-descending.svg', label: 'sort-descending', cat: 'general' },
  { file: 'sox systems.svg', label: 'sox systems', cat: 'general' },
  { file: 'stack-dashboard.svg', label: 'stack-dashboard', cat: 'data' },
  { file: 'stack-horizontal bar.svg', label: 'stack-horizontal bar', cat: 'data' },
  { file: 'stack-vertical bar.svg', label: 'stack-vertical bar', cat: 'data' },
  { file: 'star-graph.svg', label: 'star-graph', cat: 'data' },
  { file: 'star.svg', label: 'star', cat: 'general' },
  { file: 'status.svg', label: 'status', cat: 'status' },
  { file: 'stop.svg', label: 'stop', cat: 'actions' },
  { file: 'sum-of-exposure.svg', label: 'sum-of-exposure', cat: 'general' },
  { file: 'table.svg', label: 'table', cat: 'data' },
  { file: 'template-add.svg', label: 'template-add', cat: 'actions' },
  { file: 'threat-detection.svg', label: 'threat-detection', cat: 'general' },
  { file: 'threat.svg', label: 'threat', cat: 'general' },
  { file: 'thumbs-down.svg', label: 'thumbs-down', cat: 'general' },
  { file: 'thumbs-up.svg', label: 'thumbs-up', cat: 'general' },
  { file: 'ticket-breach.svg', label: 'ticket-breach', cat: 'general' },
  { file: 'ticket-check.svg', label: 'ticket-check', cat: 'status' },
  { file: 'ticket-new.svg', label: 'ticket-new', cat: 'general' },
  { file: 'total-assets.svg', label: 'total-assets', cat: 'data' },
  { file: 'total-findings.svg', label: 'total-findings', cat: 'data' },
  { file: 'tree-graph.svg', label: 'tree-graph', cat: 'data' },
  { file: 'trend-dashboard.svg', label: 'trend-dashboard', cat: 'data' },
  { file: 'trend-down.svg', label: 'trend-down', cat: 'data' },
  { file: 'trend-exposure.svg', label: 'trend-exposure', cat: 'data' },
  { file: 'trend-up.svg', label: 'trend-up', cat: 'data' },
  { file: 'type-application.svg', label: 'type-application', cat: 'general' },
  { file: 'type.svg', label: 'type', cat: 'general' },
  { file: 'undo.svg', label: 'undo', cat: 'actions' },
  { file: 'unpin.svg', label: 'unpin', cat: 'actions' },
  { file: 'upload-values.svg', label: 'upload-values', cat: 'actions' },
  { file: 'upload.svg', label: 'upload', cat: 'actions' },
  { file: 'user.svg', label: 'user', cat: 'general' },
  { file: 'validation-status.svg', label: 'validation-status', cat: 'status' },
  { file: 'vertical bar.svg', label: 'vertical bar', cat: 'data' },
  { file: 'virtual-machine.svg', label: 'virtual-machine', cat: 'general' },
  { file: 'vulnerability-management.svg', label: 'vulnerability-management', cat: 'general' },
  { file: 'warning.svg', label: 'warning', cat: 'status' },
  { file: 'widget edit.svg', label: 'widget edit', cat: 'actions' },
  { file: 'zoom-in.svg', label: 'zoom-in', cat: 'navigation' },
  { file: 'zoom-out.svg', label: 'zoom-out', cat: 'navigation' },
  { file: 'account.svg', label: 'account', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'application.svg', label: 'application', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'cloud-account.svg', label: 'cloud-account', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'cloud-cluster.svg', label: 'cloud-cluster', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'cloud-container.svg', label: 'cloud-container', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'cloud-storage.svg', label: 'cloud-storage', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'navbar-device.svg', label: 'navbar-device', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'navbar-findings.svg', label: 'navbar-findings', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'navbar-identity.svg', label: 'navbar-identity', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'network-interface.svg', label: 'network-interface', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'network-services.svg', label: 'network-services', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'network.svg', label: 'network', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'person.svg', label: 'person', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'vulnerability.svg', label: 'vulnerability', cat: 'entities-outline', folder: 'icons/icons/entities/icons' },
  { file: 'Frame 1618875519-1.svg', label: 'Frame 1618875519-1', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-10.svg', label: 'Frame 1618875519-10', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-11.svg', label: 'Frame 1618875519-11', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-12.svg', label: 'Frame 1618875519-12', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-13.svg', label: 'Frame 1618875519-13', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-14.svg', label: 'Frame 1618875519-14', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-2.svg', label: 'Frame 1618875519-2', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-3.svg', label: 'Frame 1618875519-3', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-4.svg', label: 'Frame 1618875519-4', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-5.svg', label: 'Frame 1618875519-5', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-6.svg', label: 'Frame 1618875519-6', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-7.svg', label: 'Frame 1618875519-7', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-8.svg', label: 'Frame 1618875519-8', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519-9.svg', label: 'Frame 1618875519-9', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'Frame 1618875519.svg', label: 'Frame 1618875519', cat: 'entities-filled', folder: 'icons/icons/entities' },
  { file: 'assessment.svg', label: 'assessment', cat: 'entities-filled', folder: 'icons/icons/entities' },
];

var iconFilter = 'all';
var iconSearch = '';

function renderIcons() {
  var grid = document.getElementById('icon-grid');
  if (!grid) return;
  var filtered = ICONS.filter(function(ic) {
    var matchCat = iconFilter === 'all' || ic.cat === iconFilter;
    var matchSearch = ic.label.toLowerCase().indexOf(iconSearch.toLowerCase()) !== -1;
    return matchCat && matchSearch;
  });
  var count = document.getElementById('icon-count');
  if (count) count.textContent = filtered.length + ' icons';
  grid.innerHTML = filtered.map(function(ic) {
    var enc = ic.file.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
    var lbl = ic.label.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
    var folder = ic.folder || 'icons/icons';
    return '<button class="icon-card" data-label="' + lbl + '" onclick="copyIcon(this,\'' + ic.label.replace(/'/g,"\\'") + '\')">' +
      '<img src="' + folder + '/' + enc + '" width="24" height="24" alt="" style="object-fit:contain;">' +
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

// Icon/Logo tab switcher
document.querySelectorAll('#icon-tab-bar [data-icontab]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('#icon-tab-bar [data-icontab]').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var tab = btn.dataset.icontab;
    document.getElementById('icon-panel').style.display = tab === 'icons' ? '' : 'none';
    document.getElementById('logo-panel').style.display = tab === 'logos' ? '' : 'none';
    if (tab === 'icons') renderIcons();
    if (tab === 'logos') renderLogos();
  });
});

// Render icons on load
renderIcons();

// ─── Logos (Data Sources + Frameworks) ───
var LOGOS = [
  { file: 'AWS Cloudtrail ConsoleLogin.svg', label: 'AWS Cloudtrail ConsoleLogin', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS Describe Config Rules.svg', label: 'AWS Describe Config Rules', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS Describe Standards Controls.svg', label: 'AWS Describe Standards Controls', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS EC2 Instance.svg', label: 'AWS EC2 Instance', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS ECS Task Container.svg', label: 'AWS ECS Task Container', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS EKS Container.svg', label: 'AWS EKS Container', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS EMR Cluster.svg', label: 'AWS EMR Cluster', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS EMR EC2 Fleet.svg', label: 'AWS EMR EC2 Fleet', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS EMR EC2 Instance.svg', label: 'AWS EMR EC2 Instance', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS Get Enabled Standards.svg', label: 'AWS Get Enabled Standards', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS IAM Center.svg', label: 'AWS IAM Center', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS IAM Users.svg', label: 'AWS IAM Users', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS IAM.svg', label: 'AWS IAM', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS List Security Control Definitions.svg', label: 'AWS List Security Control Definitions', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS List Standards Control Associations.svg', label: 'AWS List Standards Control Associations', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS Organizations List Accounts-1.svg', label: 'AWS Organizations List Accounts-1', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS Organizations List Accounts.svg', label: 'AWS Organizations List Accounts', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS Organizations.svg', label: 'AWS Organizations', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS Resource Details.svg', label: 'AWS Resource Details', cat: 'datasource', folder: 'data soruces' },
  { file: 'AWS SH.svg', label: 'AWS SH', cat: 'datasource', folder: 'data soruces' },
  { file: 'BMS.svg', label: 'BMS', cat: 'datasource', folder: 'data soruces' },
  { file: 'BambooHR HR Report Pull.svg', label: 'BambooHR HR Report Pull', cat: 'datasource', folder: 'data soruces' },
  { file: 'CISA Known Exploited Vulnerabilities.svg', label: 'CISA Known Exploited Vulnerabilities', cat: 'datasource', folder: 'data soruces' },
  { file: 'Cortex.svg', label: 'Cortex', cat: 'datasource', folder: 'data soruces' },
  { file: 'CrowdStrike Host List.svg', label: 'CrowdStrike Host List', cat: 'datasource', folder: 'data soruces' },
  { file: 'CrowdStrike Host.svg', label: 'CrowdStrike Host', cat: 'datasource', folder: 'data soruces' },
  { file: 'CrowdStrike ZeroTrustAssessment.svg', label: 'CrowdStrike ZeroTrustAssessment', cat: 'datasource', folder: 'data soruces' },
  { file: 'Default-1.svg', label: 'Default-1', cat: 'datasource', folder: 'data soruces' },
  { file: 'Default.svg', label: 'Default', cat: 'datasource', folder: 'data soruces' },
  { file: 'EPSS Score API.svg', label: 'EPSS Score API', cat: 'datasource', folder: 'data soruces' },
  { file: 'GlobalProtect Connection Logs.svg', label: 'GlobalProtect Connection Logs', cat: 'datasource', folder: 'data soruces' },
  { file: 'GlobalProtect GlobalProtect.svg', label: 'GlobalProtect GlobalProtect', cat: 'datasource', folder: 'data soruces' },
  { file: 'GlobalProtect.svg', label: 'GlobalProtect', cat: 'datasource', folder: 'data soruces' },
  { file: 'Heimdal.svg', label: 'Heimdal', cat: 'datasource', folder: 'data soruces' },
  { file: 'Horizon3ai Assets Page.svg', label: 'Horizon3ai Assets Page', cat: 'datasource', folder: 'data soruces' },
  { file: 'Horizon3ai.svg', label: 'Horizon3ai', cat: 'datasource', folder: 'data soruces' },
  { file: 'Infoblox.svg', label: 'Infoblox', cat: 'datasource', folder: 'data soruces' },
  { file: 'Jira List Assets.svg', label: 'Jira List Assets', cat: 'datasource', folder: 'data soruces' },
  { file: 'Jira.svg', label: 'Jira', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure ACI Container.svg', label: 'MS Azure ACI Container', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AD Device Groups.svg', label: 'MS Azure AD Device Groups', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AD Devices.svg', label: 'MS Azure AD Devices', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AD Directory Members.svg', label: 'MS Azure AD Directory Members', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AD Registered Users.svg', label: 'MS Azure AD Registered Users', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AD Sign-in Logs.svg', label: 'MS Azure AD Sign-in Logs', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AD User Registration Details.svg', label: 'MS Azure AD User Registration Details', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AD User Registration.svg', label: 'MS Azure AD User Registration', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AD Users.svg', label: 'MS Azure AD Users', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure AKS Container.svg', label: 'MS Azure AKS Container', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Blob Storage Container.svg', label: 'MS Azure Blob Storage Container', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure File Share.svg', label: 'MS Azure File Share', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Queue Storage.svg', label: 'MS Azure Queue Storage', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Resource Details.svg', label: 'MS Azure Resource Details', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Resource List.svg', label: 'MS Azure Resource List', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Security Center Alerts.svg', label: 'MS Azure Security Center Alerts', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Security Resources.svg', label: 'MS Azure Security Resources', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Subscriptions.svg', label: 'MS Azure Subscriptions', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Table Storage.svg', label: 'MS Azure Table Storage', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure VDI.svg', label: 'MS Azure VDI', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Azure Virtual Machine.svg', label: 'MS Azure Virtual Machine', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Defender Device Events.svg', label: 'MS Defender Device Events', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Defender Device List.svg', label: 'MS Defender Device List', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Defender.svg', label: 'MS Defender', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Intune MDM-1.svg', label: 'MS Intune MDM-1', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Intune MDM.svg', label: 'MS Intune MDM', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Intune Managed Device Encryption State.svg', label: 'MS Intune Managed Device Encryption State', cat: 'datasource', folder: 'data soruces' },
  { file: 'MS Intune Managed Device.svg', label: 'MS Intune Managed Device', cat: 'datasource', folder: 'data soruces' },
  { file: 'Mega List Applications.svg', label: 'Mega List Applications', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure ACI Container.svg', label: 'Microsoft Azure ACI Container', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure AKS Container.svg', label: 'Microsoft Azure AKS Container', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure Blob Storage Container.svg', label: 'Microsoft Azure Blob Storage Container', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure File Share.svg', label: 'Microsoft Azure File Share', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure Queue Storage.svg', label: 'Microsoft Azure Queue Storage', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure Resource Details.svg', label: 'Microsoft Azure Resource Details', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure Resource List.svg', label: 'Microsoft Azure Resource List', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure Security Center Alerts.svg', label: 'Microsoft Azure Security Center Alerts', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure Security Resources.svg', label: 'Microsoft Azure Security Resources', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure Table Storage.svg', label: 'Microsoft Azure Table Storage', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure VDI.svg', label: 'Microsoft Azure VDI', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Azure Virtual Machine.svg', label: 'Microsoft Azure Virtual Machine', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device Events.svg', label: 'Microsoft Defender For Endpoint Device Events', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device List.svg', label: 'Microsoft Defender For Endpoint Device List', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device Software Inventory-1.svg', label: 'Microsoft Defender For Endpoint Device Software Inventory-1', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device Software Inventory-2.svg', label: 'Microsoft Defender For Endpoint Device Software Inventory-2', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device Software Inventory-3.svg', label: 'Microsoft Defender For Endpoint Device Software Inventory-3', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device Software Inventory-4.svg', label: 'Microsoft Defender For Endpoint Device Software Inventory-4', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device Software Inventory-5.svg', label: 'Microsoft Defender For Endpoint Device Software Inventory-5', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device Software Inventory.svg', label: 'Microsoft Defender For Endpoint Device Software Inventory', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device Software Vulnerability.svg', label: 'Microsoft Defender For Endpoint Device Software Vulnerability', cat: 'datasource', folder: 'data soruces' },
  { file: 'Microsoft Defender For Endpoint Device TVM Secure Config.svg', label: 'Microsoft Defender For Endpoint Device TVM Secure Config', cat: 'datasource', folder: 'data soruces' },
  { file: 'NVD CVE API.svg', label: 'NVD CVE API', cat: 'datasource', folder: 'data soruces' },
  { file: 'Prevalent Assessment.svg', label: 'Prevalent Assessment', cat: 'datasource', folder: 'data soruces' },
  { file: 'Prevalent Finding.svg', label: 'Prevalent Finding', cat: 'datasource', folder: 'data soruces' },
  { file: 'Puppy Graph.svg', label: 'Puppy Graph', cat: 'datasource', folder: 'data soruces' },
  { file: 'Qualys Host List.svg', label: 'Qualys Host List', cat: 'datasource', folder: 'data soruces' },
  { file: 'Qualys Host Summary.svg', label: 'Qualys Host Summary', cat: 'datasource', folder: 'data soruces' },
  { file: 'Qualys Host Vulnerability.svg', label: 'Qualys Host Vulnerability', cat: 'datasource', folder: 'data soruces' },
  { file: 'Qualys KnowledgeBase.svg', label: 'Qualys KnowledgeBase', cat: 'datasource', folder: 'data soruces' },
  { file: 'Rapid7 InsightVM Asset Group Assets.svg', label: 'Rapid7 InsightVM Asset Group Assets', cat: 'datasource', folder: 'data soruces' },
  { file: 'Rapid7 InsightVM Assets.svg', label: 'Rapid7 InsightVM Assets', cat: 'datasource', folder: 'data soruces' },
  { file: 'Rapid7 InsightVM Site Assets.svg', label: 'Rapid7 InsightVM Site Assets', cat: 'datasource', folder: 'data soruces' },
  { file: 'Rapid7 InsightVM Tag Assets.svg', label: 'Rapid7 InsightVM Tag Assets', cat: 'datasource', folder: 'data soruces' },
  { file: 'Rapid7 InsightVM Vulnerabilities.svg', label: 'Rapid7 InsightVM Vulnerabilities', cat: 'datasource', folder: 'data soruces' },
  { file: 'Rapid7 InsightVM.svg', label: 'Rapid7 InsightVM', cat: 'datasource', folder: 'data soruces' },
  { file: 'Saviynt IGA Accounts.svg', label: 'Saviynt IGA Accounts', cat: 'datasource', folder: 'data soruces' },
  { file: 'Saviynt IGA Users.svg', label: 'Saviynt IGA Users', cat: 'datasource', folder: 'data soruces' },
  { file: 'Saviynt IGA.svg', label: 'Saviynt IGA', cat: 'datasource', folder: 'data soruces' },
  { file: 'SentinelOne Agents.svg', label: 'SentinelOne Agents', cat: 'datasource', folder: 'data soruces' },
  { file: 'SentinelOne.svg', label: 'SentinelOne', cat: 'datasource', folder: 'data soruces' },
  { file: 'ServiceNow ITSM.svg', label: 'ServiceNow ITSM', cat: 'datasource', folder: 'data soruces' },
  { file: 'ServiceNow Service Catalog.svg', label: 'ServiceNow Service Catalog', cat: 'datasource', folder: 'data soruces' },
  { file: 'SuccessFactors HR.svg', label: 'SuccessFactors HR', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tanium CVE Findings.svg', label: 'Tanium CVE Findings', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tanium Endpoints Extended Host List Report.svg', label: 'Tanium Endpoints Extended Host List Report', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tanium Endpoints.svg', label: 'Tanium Endpoints', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tanium.svg', label: 'Tanium', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tenable.io Asset.svg', label: 'Tenable.io Asset', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tenable.io Assets.svg', label: 'Tenable.io Assets', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tenable.io Vulnerabilities.svg', label: 'Tenable.io Vulnerabilities', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tenable.io Vulnerability-1.svg', label: 'Tenable.io Vulnerability-1', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tenable.io Vulnerability.svg', label: 'Tenable.io Vulnerability', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tenable.sc Analysis.svg', label: 'Tenable.sc Analysis', cat: 'datasource', folder: 'data soruces' },
  { file: 'Tenable.sc Assets.svg', label: 'Tenable.sc Assets', cat: 'datasource', folder: 'data soruces' },
  { file: 'WinEvents 4624.svg', label: 'WinEvents 4624', cat: 'datasource', folder: 'data soruces' },
  { file: 'WinEvents 4725.svg', label: 'WinEvents 4725', cat: 'datasource', folder: 'data soruces' },
  { file: 'WinEvents 4726.svg', label: 'WinEvents 4726', cat: 'datasource', folder: 'data soruces' },
  { file: 'Wiz Cloud Resource.svg', label: 'Wiz Cloud Resource', cat: 'datasource', folder: 'data soruces' },
  { file: 'Wiz Vulnerability-1.svg', label: 'Wiz Vulnerability-1', cat: 'datasource', folder: 'data soruces' },
  { file: 'Wiz Vulnerability.svg', label: 'Wiz Vulnerability', cat: 'datasource', folder: 'data soruces' },
  { file: 'apache kyuubi.svg', label: 'apache kyuubi', cat: 'datasource', folder: 'data soruces' },
  { file: 'iTOP PC.svg', label: 'iTOP PC', cat: 'datasource', folder: 'data soruces' },
  { file: 'iTOP Server.svg', label: 'iTOP Server', cat: 'datasource', folder: 'data soruces' },
  { file: 'iTOP VMware.svg', label: 'iTOP VMware', cat: 'datasource', folder: 'data soruces' },
  { file: 'iceberg.svg', label: 'iceberg', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-aws-cloud-trail.svg', label: 'logo-aws-cloud-trail', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-aws-identity-store.svg', label: 'logo-aws-identity-store', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-aws.svg', label: 'logo-aws', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-azure-1.svg', label: 'logo-azure-1', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-azure.svg', label: 'logo-azure', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-bamboo-hr.svg', label: 'logo-bamboo-hr', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-cisa-vulnernich.svg', label: 'logo-cisa-vulnernich', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-crowdstrike.svg', label: 'logo-crowdstrike', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-direct-cloudaccount.svg', label: 'logo-direct-cloudaccount', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-endpoint-central.svg', label: 'logo-endpoint-central', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-epss.svg', label: 'logo-epss', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-globalprotect-vpn.svg', label: 'logo-globalprotect-vpn', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-intunes.svg', label: 'logo-intunes', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-itop.svg', label: 'logo-itop', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-lansweeper.svg', label: 'logo-lansweeper', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-mega-software.svg', label: 'logo-mega-software', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-nessus-pro.svg', label: 'logo-nessus-pro', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-nessus.svg', label: 'logo-nessus', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-nvd.svg', label: 'logo-nvd', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-qualys.svg', label: 'logo-qualys', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-rapid7.svg', label: 'logo-rapid7', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-saviynt.svg', label: 'logo-saviynt', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-sentinel-one.svg', label: 'logo-sentinel-one', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-service-now.svg', label: 'logo-service-now', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-success-factor.svg', label: 'logo-success-factor', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-tenable.svg', label: 'logo-tenable', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-vectra.svg', label: 'logo-vectra', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-windows-security-log.svg', label: 'logo-windows-security-log', cat: 'datasource', folder: 'data soruces' },
  { file: 'logo-wiz.svg', label: 'logo-wiz', cat: 'datasource', folder: 'data soruces' },
  { file: 'CIS AWS Foundations Benchmark v1.4.0.svg', label: 'CIS AWS Foundations Benchmark v1.4.0', cat: 'framework', folder: 'framework' },
  { file: 'CIS Microsoft Azure Foundations Benchmark v1.3.0.svg', label: 'CIS Microsoft Azure Foundations Benchmark v1.3.0', cat: 'framework', folder: 'framework' },
  { file: 'CIS v8.1.svg', label: 'CIS v8.1', cat: 'framework', folder: 'framework' },
  { file: 'CMMC 2.0 Level 1.svg', label: 'CMMC 2.0 Level 1', cat: 'framework', folder: 'framework' },
  { file: 'CMMC 2.0 Level 2.svg', label: 'CMMC 2.0 Level 2', cat: 'framework', folder: 'framework' },
  { file: 'COBIT 2019.svg', label: 'COBIT 2019', cat: 'framework', folder: 'framework' },
  { file: 'COSO v2017.svg', label: 'COSO v2017', cat: 'framework', folder: 'framework' },
  { file: 'CSA CCM v4.svg', label: 'CSA CCM v4', cat: 'framework', folder: 'framework' },
  { file: 'CSA IoT Security Controls v2.svg', label: 'CSA IoT Security Controls v2', cat: 'framework', folder: 'framework' },
  { file: 'CSCRF.svg', label: 'CSCRF', cat: 'framework', folder: 'framework' },
  { file: 'DEFSTAN 05-138.svg', label: 'DEFSTAN 05-138', cat: 'framework', folder: 'framework' },
  { file: 'DORA V1.0.svg', label: 'DORA V1.0', cat: 'framework', folder: 'framework' },
  { file: 'Default.svg', label: 'Default', cat: 'framework', folder: 'framework' },
  { file: 'E8 Maturity Level One.svg', label: 'E8 Maturity Level One', cat: 'framework', folder: 'framework' },
  { file: 'E8 Maturity Level Three.svg', label: 'E8 Maturity Level Three', cat: 'framework', folder: 'framework' },
  { file: 'E8 Maturity Level Two.svg', label: 'E8 Maturity Level Two', cat: 'framework', folder: 'framework' },
  { file: 'FedRAMP R5 - High.svg', label: 'FedRAMP R5 - High', cat: 'framework', folder: 'framework' },
  { file: 'FedRAMP R5 - Moderate.svg', label: 'FedRAMP R5 - Moderate', cat: 'framework', folder: 'framework' },
  { file: 'Fedramp R5.svg', label: 'Fedramp R5', cat: 'framework', folder: 'framework' },
  { file: 'GAPP 2011.svg', label: 'GAPP 2011', cat: 'framework', folder: 'framework' },
  { file: 'HIPAA - HICP Large Practice.svg', label: 'HIPAA - HICP Large Practice', cat: 'framework', folder: 'framework' },
  { file: 'HIPAA - HICP Medium Practice.svg', label: 'HIPAA - HICP Medium Practice', cat: 'framework', folder: 'framework' },
  { file: 'HIPAA - HICP Small Practice.svg', label: 'HIPAA - HICP Small Practice', cat: 'framework', folder: 'framework' },
  { file: 'HISF 2025.svg', label: 'HISF 2025', cat: 'framework', folder: 'framework' },
  { file: 'HISF.svg', label: 'HISF', cat: 'framework', folder: 'framework' },
  { file: 'MPA Content Security Program v5.1.svg', label: 'MPA Content Security Program v5.1', cat: 'framework', folder: 'framework' },
  { file: 'NIST 800-53 rev5.svg', label: 'NIST 800-53 rev5', cat: 'framework', folder: 'framework' },
  { file: 'NIST AI RMF v1.0 TEST.svg', label: 'NIST AI RMF v1.0 TEST', cat: 'framework', folder: 'framework' },
  { file: 'NIST AI RMF v1.0.svg', label: 'NIST AI RMF v1.0', cat: 'framework', folder: 'framework' },
  { file: 'PCI DSS v4.0.1.svg', label: 'PCI DSS v4.0.1', cat: 'framework', folder: 'framework' },
  { file: 'SCF 2025.1.1.svg', label: 'SCF 2025.1.1', cat: 'framework', folder: 'framework' },
  { file: 'SPARTA V3.1.svg', label: 'SPARTA V3.1', cat: 'framework', folder: 'framework' },
  { file: 'StateRAMP Low Category 1.svg', label: 'StateRAMP Low Category 1', cat: 'framework', folder: 'framework' },
  { file: 'StateRAMP Low+ Category 2.svg', label: 'StateRAMP Low+ Category 2', cat: 'framework', folder: 'framework' },
  { file: 'StateRAMP Moderate Category 3.svg', label: 'StateRAMP Moderate Category 3', cat: 'framework', folder: 'framework' },
  { file: 'pai.svg', label: 'pai', cat: 'framework', folder: 'framework' },
];

var logoSearch = '';
var logoFilter = 'all';

function renderLogos() {
  var grid = document.getElementById('logo-grid');
  if (!grid) return;
  var q = logoSearch.toLowerCase();
  var filtered = LOGOS.filter(function(lg) {
    var matchCat = logoFilter === 'all' || lg.cat === logoFilter;
    var matchSearch = lg.label.toLowerCase().indexOf(q) !== -1;
    return matchCat && matchSearch;
  });
  var count = document.getElementById('logo-count');
  if (count) count.textContent = filtered.length + ' logos';
  grid.innerHTML = filtered.map(function(lg) {
    var enc = lg.file.replace(/&/g,'&amp;').replace(/"/g,'&quot;');
    return '<button class="icon-card" onclick="copyIcon(this,\'' + lg.label.replace(/'/g,"\\'") + '\')">' +
      '<img src="icons/' + lg.folder + '/' + enc + '" width="32" height="32" alt="" style="object-fit:contain;">' +
      '<span class="icon-card-label">' + lg.label + '</span></button>';
  }).join('');
}

document.querySelectorAll('.logo-cat-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.logo-cat-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    logoFilter = btn.dataset.logocat;
    renderLogos();
  });
});

var logoSearchInput = document.getElementById('logo-search');
if (logoSearchInput) {
  logoSearchInput.addEventListener('input', function() {
    logoSearch = logoSearchInput.value;
    renderLogos();
  });
}

renderLogos();

// Re-init charts and icons when switching to those pages
document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
  item.addEventListener('click', function() {
    if (item.dataset.page === 'charts') {
      setTimeout(initCharts, 60);
    }
    if (item.dataset.page === 'icons') {
      renderIcons();
      renderLogos();
    }
    if (item.dataset.page === 'table') {
      initTable();
      setTimeout(initPaginators, 0);
    }
    if (item.dataset.page === 'panels') {
      setTimeout(function() {
        var el = document.getElementById('demo-chips');
        if (el && !_demoChipsHTML) _demoChipsHTML = el.innerHTML;
      }, 0);
    }
  });
});

// Init charts if starting on charts page
if (document.querySelector('#page-charts.active')) {
  setTimeout(initCharts, 60);
}

// ─── Modal ───
function openModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('ds-modal-overlay')) {
    e.target.classList.remove('open');
  }
});
// Close on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.ds-modal-overlay.open').forEach(function(m) { m.classList.remove('open'); });
  }
});

// ─── Collapsible ───
function toggleCollapsible(id) {
  var el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

// ─── Multi-Select Dropdown ───
function dsMsToggle(id) {
  var panel = document.getElementById(id);
  if (!panel) return;
  var isOpen = panel.classList.contains('open');
  // close all others
  document.querySelectorAll('.ds-ms-panel.open').forEach(function(p) { p.classList.remove('open'); });
  if (!isOpen) panel.classList.add('open');
}
function dsMsClose(id) {
  var panel = document.getElementById(id);
  if (panel) panel.classList.remove('open');
}
function dsMsApply(id) {
  var panel = document.getElementById(id);
  if (!panel) return;
  var countEl = document.getElementById(id + '-count');
  _dsMsUpdateCount(id + '-list', countEl);
  panel.classList.remove('open');
}
// Close on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.ds-ms-wrap')) {
    document.querySelectorAll('.ds-ms-panel.open').forEach(function(p) { p.classList.remove('open'); });
  }
});
// Segmented control
function dsMsSegment(btn) {
  var ctrl = btn.closest('.ds-segmented-ctrl');
  if (!ctrl) return;
  ctrl.querySelectorAll('.ds-seg-item').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
}
// Search filter
function dsMsSearch(input, panelId) {
  var list = document.getElementById(panelId + '-list');
  if (!list) return;
  var q = input.value.toLowerCase();
  list.querySelectorAll('.ds-ms-item:not(.select-all)').forEach(function(item) {
    var text = item.textContent.trim().toLowerCase();
    item.style.display = text.includes(q) ? '' : 'none';
  });
}
// Internal helper: count checked items and update Select All state
function _dsMsSync(listId, countId) {
  var list = document.getElementById(listId);
  if (!list) return;
  var items = list.querySelectorAll('.ds-ms-item:not(.select-all)');
  var total = 0, checked = 0;
  items.forEach(function(item) {
    if (item.style.display === 'none') return;
    total++;
    if (item.querySelector('.ds-ms-cb').classList.contains('checked')) checked++;
  });
  var allCb = list.querySelector('.ds-ms-item.select-all .ds-ms-cb');
  if (allCb) {
    allCb.classList.remove('checked', 'indeterminate');
    if (checked === 0) { /* unchecked */ }
    else if (checked === total) allCb.classList.add('checked');
    else allCb.classList.add('indeterminate');
  }
  // update trigger count badge
  if (countId) {
    var countEl = document.getElementById(countId);
    if (countEl) {
      var allItems = list.querySelectorAll('.ds-ms-item:not(.select-all)');
      var totalChecked = 0;
      allItems.forEach(function(i) { if (i.querySelector('.ds-ms-cb').classList.contains('checked')) totalChecked++; });
      if (totalChecked > 0) { countEl.textContent = totalChecked; countEl.style.display = ''; }
      else countEl.style.display = 'none';
    }
  }
}
function _dsMsUpdateCount(listId, countEl) {
  var list = document.getElementById(listId);
  if (!list || !countEl) return;
  var total = 0;
  list.querySelectorAll('.ds-ms-item:not(.select-all)').forEach(function(i) {
    if (i.querySelector('.ds-ms-cb').classList.contains('checked')) total++;
  });
  if (total > 0) { countEl.textContent = total; countEl.style.display = ''; }
  else countEl.style.display = 'none';
}
// Individual item click
function dsMsItem(row, listId, countId) {
  var cb = row.querySelector('.ds-ms-cb');
  if (!cb) return;
  cb.classList.toggle('checked');
  _dsMsSync(listId, countId);
}
// Select All click
function dsMsSelectAll(row, listId, countId) {
  var allCb = row.querySelector('.ds-ms-cb');
  if (!allCb) return;
  var list = document.getElementById(listId);
  if (!list) return;
  // if fully checked → uncheck all; otherwise → check all
  var doCheck = !allCb.classList.contains('checked');
  list.querySelectorAll('.ds-ms-item:not(.select-all)').forEach(function(item) {
    if (item.style.display === 'none') return;
    var cb = item.querySelector('.ds-ms-cb');
    cb.classList.remove('checked');
    if (doCheck) cb.classList.add('checked');
  });
  allCb.classList.remove('checked', 'indeterminate');
  if (doCheck) allCb.classList.add('checked');
  _dsMsSync(listId, countId);
}
// Select Inverse
function dsMsInverse(listId, countId) {
  var list = document.getElementById(listId);
  if (!list) return;
  list.querySelectorAll('.ds-ms-item:not(.select-all)').forEach(function(item) {
    if (item.style.display === 'none') return;
    var cb = item.querySelector('.ds-ms-cb');
    cb.classList.toggle('checked');
  });
  _dsMsSync(listId, countId);
}

// ─── Toast ───
// Shared icon SVG strings for all toast types — used by showToast and showDemoToast
var TOAST_ICONS = {
  success: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  error:   '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  warning: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  info:    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
};

function showToast(type, message) {
  var container = document.getElementById('toast-container');
  if (!container) return;
  var icons = TOAST_ICONS;
  var toast = document.createElement('div');
  toast.className = 'ds-toast ' + type;
  toast.innerHTML = (icons[type] || '') + '<span>' + message + '</span><button class="ds-toast-dismiss" onclick="this.closest(\'.ds-toast\').remove()">×</button>';
  container.appendChild(toast);
  setTimeout(function() {
    toast.style.transition = 'opacity 300ms, transform 300ms';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 320);
  }, 3500);
}

// ─── Toast — demo (top-right, feels real) ───
function showDemoToast(type, message) {
  var container = document.getElementById('toast-demo-container');
  if (!container) return;
  var icons = TOAST_ICONS;
  var toast = document.createElement('div');
  toast.className = 'ds-toast ' + type;
  toast.style.animation = 'ds-toast-drop 250ms ease';
  function dismiss() {
    toast.style.transition = 'opacity 250ms, transform 250ms';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-8px)';
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 270);
  }
  toast.innerHTML = (icons[type] || '') + '<span>' + message + '</span><button class="ds-toast-dismiss">×</button>';
  toast.querySelector('.ds-toast-dismiss').addEventListener('click', dismiss);
  container.appendChild(toast);
  setTimeout(dismiss, 5000);
}

// ─── Tabs ───
document.querySelectorAll('.ds-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    var tabsId = tab.dataset.tabs;
    var panelId = tab.dataset.panel;
    var tabsEl = document.getElementById(tabsId);
    if (!tabsEl) return;
    tabsEl.querySelectorAll('.ds-tab').forEach(function(t) { t.classList.remove('active'); });
    tabsEl.querySelectorAll('.ds-tab-panel').forEach(function(p) { p.classList.remove('active'); });
    tab.classList.add('active');
    var panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  });
});

// ─── Accordion ───
function toggleAccordion(trigger) {
  var item = trigger.closest('.ds-accordion-item');
  var content = item.querySelector('.ds-accordion-content');
  var isOpen = trigger.classList.contains('open');
  trigger.classList.toggle('open', !isOpen);
  content.classList.toggle('open', !isOpen);
}

// ─── Tree Table Accordion ───
function treeToggle(id) {
  var tbody = document.getElementById('tree-tbody');
  if (!tbody) return;
  var toggleRow = tbody.querySelector('[data-tree-id="' + id + '"]');
  if (!toggleRow) return;
  var isOpen = toggleRow.dataset.treeOpen === 'true';
  var nowOpen = !isOpen;
  toggleRow.dataset.treeOpen = nowOpen ? 'true' : 'false';
  var btn = toggleRow.querySelector('.ds-tree-toggle');
  if (btn) btn.classList.toggle('open', nowOpen);

  // Show/hide all descendant rows
  var allRows = tbody.querySelectorAll('.ds-tree-row');
  // Build a set of visible parent IDs
  function isAncestorOpen(row) {
    var parentId = row.dataset.treeParent;
    if (!parentId) return true;
    var parentRow = tbody.querySelector('[data-tree-id="' + parentId + '"]');
    if (!parentRow) return false;
    if (parentRow.dataset.treeOpen !== 'true') return false;
    return isAncestorOpen(parentRow);
  }
  allRows.forEach(function(row) {
    if (!row.dataset.treeParent) return; // top-level always visible
    var visible = isAncestorOpen(row);
    row.classList.toggle('ds-tree-hidden', !visible);
  });
}

// ─── Step Progress ───
var currentStep = 3; // 1-indexed, starts at Analysis (step 3)
function updateSteps() {
  var steps = document.querySelectorAll('#steps-demo .ds-step');
  var lines = document.querySelectorAll('#steps-demo .ds-step-line');
  steps.forEach(function(step, i) {
    step.classList.remove('active', 'completed');
    var dot = step.querySelector('.ds-step-dot');
    if (i + 1 < currentStep) {
      step.classList.add('completed');
      dot.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (i + 1 === currentStep) {
      step.classList.add('active');
      dot.innerHTML = '<span>' + (i + 1) + '</span>';
    } else {
      dot.innerHTML = '<span>' + (i + 1) + '</span>';
    }
  });
  lines.forEach(function(line, i) {
    line.classList.toggle('completed', i + 1 < currentStep);
  });
}
function stepForward() {
  var steps = document.querySelectorAll('#steps-demo .ds-step');
  if (currentStep < steps.length) { currentStep++; updateSteps(); }
}
function stepBack() {
  if (currentStep > 1) { currentStep--; updateSteps(); }
}

// ─── Table ───
var TABLE_DATA = [
  { target: 'api.example.com',      vuln: 'SQL Injection',         severity: 'Critical', status: 'Open',     date: '2025-03-01' },
  { target: 'auth.example.com',     vuln: 'Broken Authentication', severity: 'High',     status: 'In Review',date: '2025-02-28' },
  { target: 'app.example.com',      vuln: 'XSS Reflected',         severity: 'Medium',   status: 'Open',     date: '2025-02-26' },
  { target: 'api.example.com',      vuln: 'CSRF Token Missing',    severity: 'Medium',   status: 'Resolved', date: '2025-02-25' },
  { target: 'cdn.example.com',      vuln: 'Outdated TLS 1.0',      severity: 'Low',      status: 'Resolved', date: '2025-02-22' },
  { target: 'admin.example.com',    vuln: 'Path Traversal',        severity: 'Critical', status: 'Open',     date: '2025-02-20' },
  { target: 'legacy.example.com',   vuln: 'RCE via Deserialization',severity: 'Critical',status: 'In Review',date: '2025-02-18' },
  { target: 'portal.example.com',   vuln: 'IDOR on User IDs',       severity: 'High',    status: 'Open',     date: '2025-02-15' },
  { target: 'api.example.com',      vuln: 'Sensitive Data Exposure',severity: 'High',    status: 'Resolved', date: '2025-02-10' },
  { target: 'app.example.com',      vuln: 'Open Redirect',          severity: 'Low',     status: 'Open',     date: '2025-02-08' },
];
var tableSortCol = -1, tableSortAsc = true, tableFilter = '', tablePage = 1;
var TABLE_PAGE_SIZE = 10;

function severityOrder(s) {
  return { Critical: 0, High: 1, Medium: 2, Low: 3 }[s] || 4;
}
function statusBadge(s) {
  var map = { Open: 'danger', 'In Review': 'warning', Resolved: 'success' };
  return '<span class="ds-badge ' + (map[s] || 'neutral') + '">' + s + '</span>';
}
function renderTable(data) {
  var tbody = document.getElementById('table-body');
  var countEl = document.getElementById('table-count');
  var pager = document.getElementById('table-pager');
  if (!tbody) return;

  var total = data.length;
  var totalPages = Math.max(1, Math.ceil(total / TABLE_PAGE_SIZE));
  tablePage = Math.max(1, Math.min(tablePage, totalPages));
  var start = (tablePage - 1) * TABLE_PAGE_SIZE;
  var pageData = data.slice(start, start + TABLE_PAGE_SIZE);

  if (countEl) {
    var end = Math.min(start + TABLE_PAGE_SIZE, total);
    countEl.textContent = total === 0 ? '0 findings' :
      (start + 1) + '–' + end + ' of ' + total + ' finding' + (total !== 1 ? 's' : '');
  }

  tbody.innerHTML = pageData.map(function(row) {
    return '<tr>' +
      '<td class="ds-td">' + row.target + '</td>' +
      '<td class="ds-td">' + row.vuln + '</td>' +
      '<td class="ds-td">' + statusBadge(row.severity) + '</td>' +
      '<td class="ds-td">' + statusBadge(row.status) + '</td>' +
      '<td class="ds-td">' + row.date + '</td>' +
      '<td class="ds-td"><button class="ds-table-action" title="View" onclick="showToast(\'info\',\'Viewing: ' + row.vuln.replace(/'/g, '') + '\')">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' +
      '</button></td>' +
      '</tr>';
  }).join('');

  if (pager) {
    pager.dataset.total = totalPages;
    pager.dataset.current = tablePage;
    buildPaginator('table-pager');
  }
}
function getFilteredSorted() {
  var data = TABLE_DATA.filter(function(row) {
    if (!tableFilter) return true;
    var q = tableFilter.toLowerCase();
    return row.target.toLowerCase().includes(q) || row.vuln.toLowerCase().includes(q) ||
      row.severity.toLowerCase().includes(q) || row.status.toLowerCase().includes(q);
  });
  if (tableSortCol >= 0) {
    var keys = ['target', 'vuln', 'severity', 'status', 'date'];
    var key = keys[tableSortCol];
    data.sort(function(a, b) {
      var va = key === 'severity' ? severityOrder(a[key]) : a[key];
      var vb = key === 'severity' ? severityOrder(b[key]) : b[key];
      if (va < vb) return tableSortAsc ? -1 : 1;
      if (va > vb) return tableSortAsc ? 1 : -1;
      return 0;
    });
  }
  return data;
}
function sortTable(col) {
  if (tableSortCol === col) { tableSortAsc = !tableSortAsc; }
  else { tableSortCol = col; tableSortAsc = true; }
  document.querySelectorAll('.ds-th').forEach(function(th) {
    th.classList.remove('sort-asc', 'sort-desc');
    if (parseInt(th.dataset.col) === col) th.classList.add(tableSortAsc ? 'sort-asc' : 'sort-desc');
  });
  renderTable(getFilteredSorted());
}
function filterTable(q) {
  tableFilter = q;
  tablePage = 1;
  renderTable(getFilteredSorted());
}
function initTable() {
  renderTable(getFilteredSorted());
}
function downloadTableCSV() {
  var headers = ['Target', 'Vulnerability', 'Severity', 'Status', 'Date'];
  var rows = TABLE_DATA.map(function(row) {
    return [row.target, row.vuln, row.severity, row.status, row.date].map(function(v) {
      return '"' + String(v).replace(/"/g, '""') + '"';
    }).join(',');
  });
  var csv = [headers.join(',')].concat(rows).join('\n');
  var blob = new Blob([csv], { type: 'text/csv' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = 'security-findings.csv'; a.click();
  URL.revokeObjectURL(url);
}
// Init table if starting on that page
if (document.querySelector('#page-table.active')) { initTable(); }

// ─── Pagination ───
function buildPaginator(id) {
  var nav = document.getElementById(id);
  if (!nav) return;
  var total = parseInt(nav.dataset.total) || 1;
  var current = parseInt(nav.dataset.current) || 1;
  var html = '';
  html += '<button class="ds-page-btn" onclick="changePage(\'' + id + '\',' + (current - 1) + ')" ' + (current <= 1 ? 'disabled' : '') + '>‹</button>';
  for (var p = 1; p <= total; p++) {
    if (total > 7 && p > 2 && p < total - 1 && Math.abs(p - current) > 1) {
      if (p === 3 || p === total - 2) html += '<span class="ds-page-ellipsis">…</span>';
      continue;
    }
    html += '<button class="ds-page-btn ' + (p === current ? 'active' : '') + '" onclick="changePage(\'' + id + '\',' + p + ')">' + p + '</button>';
  }
  html += '<button class="ds-page-btn" onclick="changePage(\'' + id + '\',' + (current + 1) + ')" ' + (current >= total ? 'disabled' : '') + '>›</button>';
  nav.innerHTML = html;
}
function changePage(id, page) {
  var nav = document.getElementById(id);
  if (!nav) return;
  var total = parseInt(nav.dataset.total) || 1;
  page = Math.max(1, Math.min(total, page));
  nav.dataset.current = page;
  if (id === 'table-pager') {
    tablePage = page;
    renderTable(getFilteredSorted());
  } else {
    buildPaginator(id);
  }
}
function initPaginators() {
  buildPaginator('pager-1');
  buildPaginator('pager-2');
  buildPaginator('pager-3');
}

// ─── Toggle Switch ───
function dsToggle(el) {
  el.classList.toggle('on');
}

// ─── Select / Dropdown ───
function dsSelectToggle(trigger) {
  var wrap = trigger.parentNode;
  var dropdown = wrap.querySelector('.ds-select-dropdown');
  var isOpen = trigger.classList.contains('open');
  // Close all open dropdowns
  document.querySelectorAll('.ds-select.open').forEach(function(s) { s.classList.remove('open'); });
  document.querySelectorAll('.ds-select-dropdown.open').forEach(function(d) { d.classList.remove('open'); });
  if (!isOpen) {
    trigger.classList.add('open');
    dropdown.classList.add('open');
    setTimeout(function() {
      document.addEventListener('click', function handler(e) {
        if (!wrap.contains(e.target)) {
          trigger.classList.remove('open');
          dropdown.classList.remove('open');
          document.removeEventListener('click', handler);
        }
      });
    }, 0);
  }
}
function dsSelectPick(option) {
  var dropdown = option.closest('.ds-select-dropdown');
  var wrap = dropdown.parentNode;
  var trigger = wrap.querySelector('.ds-select');
  trigger.querySelector('span').textContent = option.textContent.trim();
  trigger.classList.remove('ds-select-placeholder', 'open');
  dropdown.classList.remove('open');
  dropdown.querySelectorAll('.ds-select-option').forEach(function(o) { o.classList.remove('selected'); });
  option.classList.add('selected');
}

// ─── Left Nav helpers ───
function dsNavCollapseSubEl(sub) {
  if (!sub || sub.style.display !== 'flex') return;
  sub.style.display = 'none';
  sub.querySelectorAll('.ds-nav-sub-active').forEach(function(a) { a.classList.remove('ds-nav-sub-active'); });
  // Walk backwards to find the controlling row
  var prev = sub.previousElementSibling;
  while (prev) {
    if (prev.classList.contains('ds-nav-item-row')) {
      prev.classList.remove('ds-nav-expanded');
      var c = prev.querySelector('.ds-nav-chevron');
      if (c) c.classList.remove('ds-nav-chevron-open');
      break;
    }
    prev = prev.previousElementSibling;
  }
}

// ─── Left Nav Sub-item Select ───
// ─── Nav menu demo collapse toggle ───
function dsNavMenuToggleCollapse() {
  var navmenu = document.getElementById('demo-navmenu');
  var icon = document.getElementById('demo-nav-collapse-icon');
  var btn = document.getElementById('demo-nav-collapse-btn');
  if (!navmenu) return;
  var collapsed = navmenu.classList.toggle('nav-collapsed');
  if (collapsed) {
    // Lock hover-expand immediately after click-collapse
    navmenu.classList.add('nav-click-collapsed');
    navmenu.addEventListener('mouseleave', function onLeave() {
      navmenu.classList.remove('nav-click-collapsed');
      navmenu.removeEventListener('mouseleave', onLeave);
    });
  }
  if (icon) {
    icon.innerHTML = collapsed
      ? '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="11 8 15 12 11 16"/>'
      : '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 8 11 12 15 16"/>';
  }
  if (btn) btn.title = collapsed ? 'Expand nav' : 'Collapse to icon rail';
}

function dsNavSubSelect(el) {
  var navmenu = el.closest('.ds-navmenu');
  if (!navmenu) return;
  var parentSub = el.closest('.ds-nav-subitems');
  // Clear all active sub-items
  navmenu.querySelectorAll('.ds-nav-sub-active').forEach(function(s) {
    s.classList.remove('ds-nav-sub-active');
  });
  el.classList.add('ds-nav-sub-active');
  // Collapse all other open sections
  navmenu.querySelectorAll('.ds-nav-subitems').forEach(function(sub) {
    if (sub !== parentSub) dsNavCollapseSubEl(sub);
  });
}

// ─── Left Nav Toggle ───
function dsNavToggle(row, subId) {
  var sub = document.getElementById(subId);
  if (!sub) return;
  var isOpen = sub.style.display === 'flex';
  var navmenu = row.closest('.ds-navmenu');
  // Collapse all other open sections (accordion)
  if (navmenu) {
    navmenu.querySelectorAll('.ds-nav-subitems').forEach(function(s) {
      if (s.id !== subId) dsNavCollapseSubEl(s);
    });
  }
  var chevron = row.querySelector('.ds-nav-chevron');
  if (isOpen) {
    dsNavCollapseSubEl(sub);
  } else {
    sub.style.display = 'flex';
    row.classList.add('ds-nav-expanded');
    if (chevron) chevron.classList.add('ds-nav-chevron-open');
  }
}

// ─── Side Panel ───
function openPanel(id) {
  var panel = document.getElementById(id);
  var overlay = document.getElementById(id + '-overlay');
  if (panel) { panel.classList.add('open'); }
  if (overlay) { overlay.classList.add('open'); }
  document.body.style.overflow = 'hidden';
}
function closePanel(id) {
  var panel = document.getElementById(id);
  var overlay = document.getElementById(id + '-overlay');
  if (panel) { panel.classList.remove('open'); }
  if (overlay) { overlay.classList.remove('open'); }
  document.body.style.overflow = '';
}
function openFilterPanel() { openPanel('demo-panel'); }

function toggleFilterPanel() {
  var panel = document.getElementById('filter-side-panel');
  var btn = document.getElementById('filter-panel-toggle');
  if (!panel) return;
  var isOpen = panel.classList.toggle('open');
  if (btn) btn.classList.toggle('active', isOpen);
}

function toggleWidgetPanel() {
  var panel = document.getElementById('widget-settings-panel');
  var btn = document.getElementById('widget-settings-toggle');
  if (!panel) return;
  var isOpen = panel.classList.toggle('open');
  if (btn) btn.classList.toggle('active', isOpen);
}

function widgetPanelTab(btn, targetId) {
  var container = btn.closest('.ds-filter-side-panel');
  container.querySelectorAll('.ds-panel-tab').forEach(function(b) { b.classList.remove('ds-panel-tab-active'); });
  btn.classList.add('ds-panel-tab-active');
  ['wpanel-general','wpanel-data'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var target = document.getElementById(targetId);
  if (target) target.style.display = 'flex';
}

// ─── Panel Tabs ───
function panelTab(btn, targetId) {
  var panel = btn.closest('.ds-panel');
  panel.querySelectorAll('.ds-panel-tab').forEach(function(b) {
    b.classList.remove('ds-panel-tab-active');
  });
  btn.classList.add('ds-panel-tab-active');
  var body = panel.querySelector('.ds-panel-body');
  body.querySelectorAll('[id^="panel-tab-"]').forEach(function(el) { el.style.display = 'none'; });
  var target = document.getElementById(targetId);
  if (target) target.style.display = 'flex';
}

// ─── Filter Chips ───
var _demoChipsHTML = '';
function removeChip(btn) {
  var chip = btn.closest('.ds-filter-chip');
  chip.style.transition = 'opacity .15s, transform .15s';
  chip.style.opacity = '0';
  chip.style.transform = 'scale(.85)';
  setTimeout(function() { chip.remove(); }, 150);
}
function resetFilterChips() {
  var el = document.getElementById('demo-chips');
  if (el && _demoChipsHTML) el.innerHTML = _demoChipsHTML;
}
(function() {
  var el = document.getElementById('demo-chips');
  if (el) _demoChipsHTML = el.innerHTML;
})();


// ─── Download CLAUDE.md ───
function downloadClaudeMd() {
  var btn = document.getElementById('claude-dl-btn') || document.querySelector('[onclick="downloadClaudeMd()"]');
  fetch('https://anthu211.github.io/design-system-2.0/CLAUDE.md')
    .then(function(r) {
      if (!r.ok) throw new Error('fetch failed');
      return r.text();
    })
    .then(function(text) {
      var blob = new Blob([text], { type: 'text/plain' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'CLAUDE.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
      showToast('success', 'CLAUDE.md downloaded — place it in your project root and run: claude');
      if (btn) {
        var orig = btn.innerHTML;
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Downloaded!';
        setTimeout(function() { btn.innerHTML = orig; }, 2500);
      }
    })
    .catch(function() {
      showToast('error', 'Download failed — try right-clicking and saving from: anthu211.github.io/design-system-2.0/CLAUDE.md');
    });
}

// ─── Download Full Claude Setup (claude-setup.zip) ───
function downloadClaudeSetup() {
  var btn = document.getElementById('claude-setup-dl-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg> Downloading…';
  }
  fetch('https://anthu211.github.io/design-system-2.0/setup/claude-setup.zip')
    .then(function(r) {
      if (!r.ok) throw new Error('fetch failed');
      return r.blob();
    })
    .then(function(blob) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'claude-setup.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
      showToast('success', 'claude-setup.zip downloaded — unzip in your project root and run: claude');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Downloaded!';
        setTimeout(function() { btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download claude-setup.zip'; btn.disabled = false; }, 3000);
      }
    })
    .catch(function() {
      showToast('error', 'Download failed — try again or get it from: anthu211.github.io/design-system-2.0/setup/claude-setup.zip');
      if (btn) { btn.disabled = false; btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download claude-setup.zip'; }
    });
}

// ─── Copy AI Prompt for Claude Code ───
function copyAiPrompt() {
  var prompt = [
    'Build UI for Prevalent AI — B2B cybersecurity platform for enterprise security teams.',
    '',
    'Read these design system files fully before responding:',
    'https://anthu211.github.io/design-system-2.0/page-spec.txt',
    'https://anthu211.github.io/design-system-2.0/charts.txt',
    '',
    'REQUIRED — copy these verbatim, never rewrite or shorten:',
    '• Shell HTML template from page-spec.txt — full <style> block, full <script> block',
    '• shellNavToggle() JS — left nav collapse/expand (id="shell-nav", id="shell-nav-btn" required)',
    '• Chart JS from charts.txt — buildVerticalBarChart / buildLineChart / buildMultiLineChart / buildDonutChart / buildStackedBarChart',
    '• Tooltip JS — showChartTooltip / positionChartTooltip / hideChartTooltip + <div id="chart-tooltip"> at end of <body>',
    '• Init charts: document.addEventListener("DOMContentLoaded", function() { setTimeout(initCharts, 60); })',
    '',
    'REQUIRED interactions — all must work:',
    '• Left nav collapses and expands via shellNavToggle()',
    '• Every chart shows hover tooltip (segment, bar, dot, row)',
    '• Table row actions visible on tr:hover via CSS only — never style="display:flex" inline',
    '• Filter chips use .ds-filter-chip > .ds-chip-key + .ds-chip-value + .ds-chip-close',
    '• Toasts: success/info auto-dismiss 3s, error/warning persist until dismissed',
    '',
    'Persona (keep one, delete rest): ciso · grc · security-architect · security-engineer · soc-analyst',
    '',
    'Describe the screen you want to build:',
  ].join('\n');

  function onCopied() {
    showToast('success', 'Prompt copied — paste it into any AI coding tool to get started');
    var btn = document.querySelector('[onclick="copyAiPrompt()"]');
    if (btn) {
      var orig = btn.innerHTML;
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      btn.style.background = '#31a56d';
      setTimeout(function() { btn.innerHTML = orig; btn.style.background = ''; }, 2000);
    }
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(prompt).then(onCopied).catch(function() {
      var ta = document.createElement('textarea');
      ta.value = prompt; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      onCopied();
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = prompt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    onCopied();
  }
}


// ─── Copy Screen Shell Template ───
function copyShellTemplate() {
  var tpl = [
    '<!DOCTYPE html>',
    '<html lang="en" class="theme-light">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>Page Title — Prevalent AI</title>',
    '  <link rel="preconnect" href="https://fonts.googleapis.com">',
    '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">',
    '  <style>',
    '    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }',
    '    body { font-family: \'Inter\', sans-serif; background: #F7F9FC; color: #101010; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }',
    '    a { text-decoration: none; } button { font-family: inherit; cursor: pointer; }',
    '    /* ── Left nav collapse ── */',
    '    #shell-nav { transition: width 0.22s ease, padding 0.22s ease; }',
    '    #shell-nav.nav-collapsed { width: 52px !important; padding: 16px 8px !important; overflow: hidden; }',
    '    #shell-nav.nav-collapsed .nav-hdr-info { display: none; }',
    '    #shell-nav.nav-collapsed .nav-hdr { flex-direction: column; align-items: center; border-bottom: none !important; padding-bottom: 4px; margin-bottom: 0; }',
    '    #shell-nav.nav-collapsed .nav-row { justify-content: center; }',
    '    #shell-nav.nav-collapsed .nav-lbl { display: none; }',
    '    #shell-nav.nav-collapsed .nav-chev { display: none; }',
    '    #shell-nav.nav-collapsed .nav-sub { display: none; }',
    '    #shell-nav.nav-collapsed .nav-sub.nav-active { display: flex; justify-content: center; padding: 8px !important; background: rgba(99,96,216,0.08); border-radius: 6px; }',
    '    #shell-nav.nav-collapsed .nav-sub.nav-active .nav-lbl { display: none; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover { width: 220px !important; padding: 16px !important; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-hdr-info { display: block; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-hdr { flex-direction: row; align-items: flex-start; border-bottom: 1px solid #467fcd !important; padding-bottom: 8px; margin-bottom: 12px; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-row { justify-content: space-between; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-lbl { display: flex; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-chev { display: block; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub { display: flex; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub.nav-active { padding: 8px 8px 8px 30px !important; }',
    '    #shell-nav.nav-collapsed:not(.click-collapsed):hover .nav-sub.nav-active .nav-lbl { display: flex; }',
    '    .ds-btn.t-special svg { stroke: url(#t-special-grad); }',
    '    .chart-legend { display:flex;flex-wrap:wrap;gap:12px;margin-top:12px;justify-content:center; }',
    '    .chart-legend-item { display:flex;align-items:center;gap:6px;font-size:12px;color:var(--shell-text-2); }',
    '    .chart-legend-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0; }',
    '  </style>',
    '</head>',
    '<body>',
    '',
    '  <!-- TOPBAR — always #131313, never changes with theme -->',
    '  <div style="height:52px;background:#131313;border-bottom:1px solid #272727;display:flex;align-items:center;padding:0 16px;gap:12px;flex-shrink:0;z-index:100;">',
    '    <img src="https://anthu211.github.io/design-system-2.0/icons/pai-logo.svg" style="height:26px;" alt="Prevalent AI">',
    '    <span style="flex:1;"></span>',
    '    <span style="font-size:12px;color:#9ca3af;">Last Updated: 2h ago</span>',
    '    <button style="background:none;border:none;color:#9ca3af;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;">',
    '      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    '    </button>',
    '    <div style="width:32px;height:32px;border-radius:50%;background:#6360D8;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;flex-shrink:0;">A</div>',
    '    <button style="background:linear-gradient(to right,#467fcd,#47adcb);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;border:1px solid #b1b8f5;border-radius:44px;font-size:12px;font-weight:500;padding:5px 14px;font-family:inherit;cursor:pointer;">Navigator</button>',
    '  </div>',
    '',
    '  <!-- SHELL -->',
    '  <div style="display:flex;flex:1;overflow:hidden;">',
    '',
    '    <!-- LEFT NAV — collapsible to 52px icon rail; hover expands; button click collapses immediately -->',
    '    <nav id="shell-nav" style="width:220px;background:#fff;border-right:0.5px solid #d8d9dd;overflow-y:auto;flex-shrink:0;display:flex;flex-direction:column;padding:16px;gap:0;">',
    '      <!-- Nav header: blue accent bottom border -->',
    '      <div class="nav-hdr" style="display:flex;align-items:flex-start;justify-content:space-between;padding:0 8px 8px 12px;border-bottom:1px solid #467fcd;margin-bottom:12px;flex-shrink:0;">',
    '        <div class="nav-hdr-info">',
    '          <div style="display:flex;align-items:center;gap:4px;font-size:14px;font-weight:500;color:#101010;">',
    '            Prevalent AI',
    '            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
    '          </div>',
    '          <div style="font-size:12px;color:#6e6e6e;margin-top:2px;">Exposure Management</div>',
    '        </div>',
    '        <!-- Collapse toggle: click to collapse to icon rail -->',
    '        <button id="shell-nav-btn" onclick="shellNavToggle()" style="background:none;border:none;color:#6e6e6e;padding:0;cursor:pointer;display:flex;align-items:center;" title="Collapse sidebar">',
    '          <svg id="shell-nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 8 11 12 15 16"/></svg>',
    '        </button>',
    '      </div>',
    '      <!-- Nav items -->',
    '      <div style="display:flex;flex-direction:column;gap:12px;flex:1;">',
    '        <!-- Default nav item: icon+label left, chevron right -->',
    '        <div class="nav-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;background:#fff;cursor:pointer;">',
    '          <div style="display:flex;align-items:center;gap:8px;">',
    '            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><!-- icon --></svg>',
    '            <span class="nav-lbl" style="display:flex;font-size:14px;color:#6e6e6e;font-weight:400;">Nav Item</span>',
    '          </div>',
    '          <svg class="nav-chev" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
    '        </div>',
    '        <!-- Expanded section: grey bg #f5f5f5, chevron flips up, GREY text — only active child gets blue -->',
    '        <div>',
    '          <div class="nav-row" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border-radius:6px;background:#f5f5f5;cursor:pointer;">',
    '            <div style="display:flex;align-items:center;gap:8px;">',
    '              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><!-- icon --></svg>',
    '              <span class="nav-lbl" style="display:flex;font-size:14px;color:#6e6e6e;font-weight:400;">Active Section</span>',
    '            </div>',
    '            <svg class="nav-chev" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>',
    '          </div>',
    '          <!-- Active sub-item: indent 30px, #6360d8 + bg tint — parent stays grey. In collapsed rail: only this icon shows in accent color -->',
    '          <a href="#" class="nav-sub nav-active" style="display:flex;align-items:center;gap:4px;padding:8px 8px 8px 30px;text-decoration:none;background:rgba(99,96,216,0.08);border-radius:6px;">',
    '            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6360d8" stroke-width="2"><!-- icon --></svg>',
    '            <span class="nav-lbl" style="display:flex;font-size:14px;color:#6360d8;font-weight:400;">Active Sub Item</span>',
    '          </a>',
    '          <!-- Default sub-item -->',
    '          <a href="#" class="nav-sub" style="display:flex;align-items:center;gap:4px;padding:8px 8px 8px 30px;text-decoration:none;">',
    '            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" stroke-width="2"><!-- icon --></svg>',
    '            <span class="nav-lbl" style="display:flex;font-size:14px;color:#6e6e6e;font-weight:400;">Sub Item</span>',
    '          </a>',
    '        </div>',
    '      </div>',
    '    </nav>',
    '',
    '    <!-- CONTENT AREA -->',
    '    <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">',
    '',
    '      <!-- Sticky sub-header -->',
    '      <div style="position:sticky;top:0;z-index:50;background:#fff;border-bottom:1px solid #e6e6e6;border-radius:0 0 8px 8px;padding:10px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,0.04);">',
    '        <div style="min-width:0;">',
    '          <div style="font-size:12px;font-weight:500;color:#101010;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Page Title</div>',
    '          <div style="font-size:11px;color:#9ca3af;display:flex;align-items:center;gap:3px;white-space:nowrap;">',
    '            <span>Dashboard</span><span>›</span><span>Section</span><span>›</span>',
    '            <span style="color:#6360D8;">Current Page</span>',
    '          </div>',
    '        </div>',
    '        <button style="background:none;border:1px solid #e6e6e6;border-radius:44px;color:#6e6e6e;font-size:12px;padding:5px 14px;display:flex;align-items:center;gap:6px;white-space:nowrap;flex-shrink:0;">',
    '          Explore in <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
    '        </button>',
    '        <span style="flex:1;"></span>',
    '        <button style="width:32px;height:32px;border-radius:50%;background:#6360D8;border:none;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;">',
    '          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    '        </button>',
    '        <button style="background:none;border:1px solid #504bb8;border-radius:44px;color:#504bb8;font-size:12px;font-weight:500;padding:5px 14px;display:flex;align-items:center;gap:6px;flex-shrink:0;">',
    '          Active Filters',
    '          <span style="background:#504bb8;color:#fff;font-size:10px;font-weight:600;min-width:16px;height:16px;border-radius:44px;display:flex;align-items:center;justify-content:center;padding:0 4px;">0</span>',
    '        </button>',
    '        <div style="width:1px;height:20px;background:#e6e6e6;flex-shrink:0;"></div>',
    '        <button style="background:#e0dff7;border:none;border-radius:44px;color:#504bb8;font-size:12px;font-weight:500;padding:5px 14px;flex-shrink:0;">Filter</button>',
    '      </div>',
    '',
    '      <!-- Main content -->',
    '      <div style="flex:1;padding:24px;background:#F7F9FC;">',
    '        <!-- YOUR CONTENT HERE -->',
    '      </div>',
    '',
    '    </div>',
    '  </div>',
    '',
    '  <script>',
    '    function shellNavToggle() {',
    '      var nav = document.getElementById(\'shell-nav\');',
    '      var icon = document.getElementById(\'shell-nav-icon\');',
    '      var btn = document.getElementById(\'shell-nav-btn\');',
    '      if (!nav) return;',
    '      var collapsed = nav.classList.toggle(\'nav-collapsed\');',
    '      if (collapsed) {',
    '        nav.classList.add(\'click-collapsed\');',
    '        nav.addEventListener(\'mouseleave\', function onLeave() {',
    '          nav.classList.remove(\'click-collapsed\');',
    '          nav.removeEventListener(\'mouseleave\', onLeave);',
    '        });',
    '      }',
    '      if (icon) icon.innerHTML = collapsed',
    '        ? \'<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="11 8 15 12 11 16"/>\'',
    '        : \'<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><polyline points="15 8 11 12 15 16"/>\';',
    '      if (btn) btn.title = collapsed ? \'Expand sidebar\' : \'Collapse sidebar\';',
    '    }',
    '  </script>',
    '  <svg width="0" height="0" style="position:absolute;overflow:hidden;pointer-events:none;"><defs><linearGradient id="t-special-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#467fcd"/><stop offset="100%" stop-color="#47adcb"/></linearGradient></defs></svg>',
    '</body>',
    '</html>',
  ].join('\n');

  function onCopied() {
    showToast('success', 'Screen shell template copied — paste into your HTML file');
    var btn = document.querySelector('[onclick="copyShellTemplate()"]');
    if (btn) {
      var orig = btn.innerHTML;
      btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      btn.style.background = '#31a56d';
      setTimeout(function() { btn.innerHTML = orig; btn.style.background = ''; }, 2000);
    }
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(tpl).then(onCopied).catch(function() {
      var ta = document.createElement('textarea');
      ta.value = tpl; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      onCopied();
    });
  } else {
    var ta = document.createElement('textarea');
    ta.value = tpl; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    onCopied();
  }
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 1 — Global Search / Command Palette
// ═══════════════════════════════════════════════════════════════════
var SEARCH_INDEX = [
  { t:'Colors', p:'colors', cat:'Foundation', d:'Full palette, dark/light tokens, semantic status colors', k:'color palette token theme dark light' },
  { t:'Resolutions', p:'resolutions', cat:'Foundation', d:'Desktop-only, 1024px minimum, breakpoint system', k:'resolution breakpoint screen desktop viewport' },
  { t:'Spacing & Grid', p:'spacing', cat:'Foundation', d:'4px base unit, 12-column grid, margins and gutters', k:'spacing grid margin padding gap column layout' },
  { t:'Typography', p:'typography', cat:'Foundation', d:'Inter type scale, heading levels, body and code styles', k:'typography font text heading body size weight inter' },
  { t:'Avatar', p:'avatars', cat:'Component', d:'User avatars, initials, image fallbacks, stacked groups', k:'avatar user profile image initials group' },
  { t:'Badge & Status', p:'badges', cat:'Component', d:'Severity badges, count indicators, dismissible tags', k:'badge status tag label count indicator pill severity' },
  { t:'Breadcrumb & Pagination', p:'breadnav', cat:'Component', d:'Navigation breadcrumbs and page pagination controls', k:'breadcrumb pagination nav page next previous' },
  { t:'Buttons & Toggles', p:'buttons', cat:'Component', d:'Primary, secondary, outline, ghost — all sizes and states', k:'button cta action primary secondary outline ghost danger' },
  { t:'Callout', p:'callout', cat:'Component', d:'Info, warning, error, success callout banners', k:'callout alert banner info warning error success' },
  { t:'Charts', p:'charts', cat:'Component', d:'Bar, line, donut charts with SVG axes', k:'chart graph bar line donut pie data visualization' },
  { t:'Form Controls', p:'forms', cat:'Component', d:'Inputs, checkboxes, radio buttons, search fields', k:'form input field text checkbox radio search' },
  { t:'Icons', p:'icons', cat:'Component', d:'Full SVG icon library', k:'icon svg symbol glyph' },
  { t:'Modal', p:'overlays', cat:'Component', d:'Confirmation dialogs, destructive actions, and form overlays', k:'modal dialog overlay popup alert confirmation destructive' },
  { t:'Tooltip', p:'tooltip', cat:'Component', d:'UI hover tooltips and chart data tooltips', k:'tooltip hover hint label chart data ui position' },
  { t:'Navigation', p:'navmenu', cat:'Component', d:'Left sidebar nav with collapsible sections', k:'navigation nav sidebar menu left collapse' },
  { t:'Panels & Filters', p:'panels', cat:'Component', d:'Side drawers, filter bars, applied filter chips', k:'panel filter drawer side chip apply' },
  { t:'Progress & Slider', p:'progress', cat:'Component', d:'Progress bars, loading indicators, range sliders', k:'progress bar slider loading indicator range' },
  { t:'Table', p:'table', cat:'Component', d:'Sortable, filterable data table with pagination and export', k:'table data row column sort filter paginate export csv' },
  { t:'Tabs', p:'tabs', cat:'Component', d:'Horizontal tab navigation for sibling views — default and pill variants', k:'tab navigation panel switch view sibling' },
  { t:'Accordion', p:'accordion', cat:'Component', d:'Collapsible accordion sections and tree-table accordion for hierarchical data', k:'accordion collapse expand section tree table hierarchy compliance framework control' },
  { t:'KPI Cards', p:'kpi', cat:'Component', d:'Key performance indicator cards with trend delta and direction', k:'kpi card metric value delta trend performance indicator dashboard' },
  { t:'Toggle & Select', p:'toggleselect', cat:'Component', d:'Toggle switches and dropdown select controls', k:'toggle switch select dropdown' },
  { t:'States', p:'states', cat:'Component', d:'Loading skeleton, empty, and error state patterns', k:'state loading skeleton empty error section table field validation spinner' },
  { t:'Screen Shell', p:'screenshell', cat:'Template', d:'Mandatory full-page layout: topbar, left nav, sticky sub-header, content body', k:'screen shell layout template topbar nav breadcrumb structure page' },
  { t:'--shell-accent', p:'colors', cat:'Token', d:'#6360D8 · Primary CTA, buttons, focus rings', k:'accent purple cta primary button' },
  { t:'--shell-bg', p:'colors', cat:'Token', d:'App background color', k:'background bg surface' },
  { t:'--shell-raised', p:'colors', cat:'Token', d:'Card and sidebar background', k:'card sidebar raised surface' },
  { t:'--shell-border', p:'colors', cat:'Token', d:'Primary border and divider color', k:'border divider stroke' },
  { t:'--shell-text', p:'colors', cat:'Token', d:'Primary text color', k:'text color primary body' },
  { t:'--shell-text-muted', p:'colors', cat:'Token', d:'Secondary muted text', k:'text muted secondary label caption' },
  { t:'--status-critical', p:'badges', cat:'Token', d:'#D12329 · Critical severity', k:'critical error red danger high severity' },
  { t:'--status-high', p:'badges', cat:'Token', d:'High severity indicator', k:'high severity warning' },
  { t:'--status-medium', p:'badges', cat:'Token', d:'Medium severity indicator', k:'medium severity yellow caution' },
  { t:'--status-low', p:'badges', cat:'Token', d:'Low severity / success color', k:'low severity success green resolved' },
];

var _cmdOpen = false;
var _cmdSelected = -1;
var _cmdResults = [];

function openCmdPalette() {
  var overlay = document.getElementById('cmd-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  _cmdOpen = true;
  _cmdSelected = -1;
  var inp = document.getElementById('cmd-input');
  if (inp) { inp.value = ''; inp.focus(); }
  renderCmdResults('');
}

function closeCmdPalette() {
  var overlay = document.getElementById('cmd-overlay');
  if (overlay) overlay.classList.remove('open');
  _cmdOpen = false;
}

// Scores a search index item against a query string.
// Returns 2 if the full query is a substring match, 1 if any individual word matches, 0 for no match.
// Searches across item title (t), description (d), keywords (k), and category (cat).
function fuzzyScore(item, query) {
  var q = query.toLowerCase();
  var haystack = (item.t + ' ' + item.d + ' ' + item.k + ' ' + item.cat).toLowerCase();
  if (haystack.indexOf(q) !== -1) return 2;
  var words = q.split(' ').filter(Boolean);
  var score = 0;
  words.forEach(function(w) { if (haystack.indexOf(w) !== -1) score++; });
  return score > 0 ? 1 : 0;
}

function renderCmdResults(query) {
  var container = document.getElementById('cmd-results');
  if (!container) return;

  var results;
  if (!query.trim()) {
    results = SEARCH_INDEX.slice(0, 15);
  } else {
    results = SEARCH_INDEX
      .map(function(item) { return { item: item, score: fuzzyScore(item, query) }; })
      .filter(function(r) { return r.score > 0; })
      .sort(function(a, b) { return b.score - a.score; })
      .map(function(r) { return r.item; })
      .slice(0, 20);
  }

  _cmdResults = results;
  _cmdSelected = -1;

  if (results.length === 0) {
    container.innerHTML = '<div class="cmd-empty">No results for "' + query + '"</div>';
    return;
  }

  var groups = {};
  results.forEach(function(item) {
    if (!groups[item.cat]) groups[item.cat] = [];
    groups[item.cat].push(item);
  });

  var catIcons = {
    Foundation: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    Component:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    Token:      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>'
  };

  var catOrder = ['Foundation', 'Component', 'Token'];
  var html = '';
  var idx = 0;
  catOrder.forEach(function(cat) {
    if (!groups[cat]) return;
    html += '<div class="cmd-section-label">' + cat + '</div>';
    groups[cat].forEach(function(item) {
      html += '<div class="cmd-result-item" data-page="' + item.p + '" data-idx="' + idx + '">' +
        '<div class="cmd-result-icon">' + (catIcons[item.cat] || '') + '</div>' +
        '<div class="cmd-result-content">' +
          '<div class="cmd-result-title">' + item.t + '</div>' +
          '<div class="cmd-result-desc">' + item.d + '</div>' +
        '</div>' +
        '<span class="cmd-result-cat">' + item.cat + '</span>' +
        '</div>';
      idx++;
    });
  });

  container.innerHTML = html;

  container.querySelectorAll('.cmd-result-item').forEach(function(el) {
    el.addEventListener('click', function() {
      navigateToPage(el.dataset.page);
      closeCmdPalette();
    });
    el.addEventListener('mouseenter', function() {
      _cmdSelected = parseInt(el.dataset.idx);
      updateCmdSelection();
    });
  });
}

function updateCmdSelection() {
  var items = document.querySelectorAll('.cmd-result-item');
  items.forEach(function(el) {
    el.classList.toggle('selected', parseInt(el.dataset.idx) === _cmdSelected);
  });
  var sel = document.querySelector('.cmd-result-item.selected');
  if (sel) sel.scrollIntoView({ block: 'nearest' });
}

function navigateToPage(page) {
  var navItem = document.querySelector('.nav-item[data-page="' + page + '"]');
  if (navItem) {
    // Ensure the Design System topnav tab is active (shows sidebar, switches view)
    var dsTab = document.querySelector('.ds-topnav-item[data-page="home"]');
    if (dsTab) {
      document.querySelectorAll('.ds-topnav-item').forEach(function(b) { b.classList.remove('active'); });
      dsTab.classList.add('active');
      document.querySelectorAll('.ds-view').forEach(function(v) { v.classList.remove('active'); });
      document.getElementById('view-ds').classList.add('active');
      var dsLayout = document.querySelector('.ds-layout');
      if (dsLayout) dsLayout.classList.remove('no-sidebar');
    }
    navItem.click();
    // Scroll content to top
    var content = document.querySelector('.ds-content');
    if (content) content.scrollTop = 0;
  }
}

// Trigger
var cmdTrigger = document.getElementById('cmd-trigger');
if (cmdTrigger) cmdTrigger.addEventListener('click', openCmdPalette);

// Overlay click to close
var cmdOverlay = document.getElementById('cmd-overlay');
if (cmdOverlay) {
  cmdOverlay.addEventListener('click', function(e) {
    if (e.target === cmdOverlay) closeCmdPalette();
  });
}

// Input handler
var cmdInput = document.getElementById('cmd-input');
if (cmdInput) {
  cmdInput.addEventListener('input', function() {
    renderCmdResults(cmdInput.value);
  });
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 3 — Component Status Badges
// ═══════════════════════════════════════════════════════════════════
var COMPONENT_STATUS = {
  buttons:'stable', forms:'stable', charts:'stable', icons:'stable',
  callout:'stable', badges:'stable', overlays:'stable', tooltip:'stable', tabs:'stable',
  progress:'stable', table:'stable', breadnav:'stable', avatars:'stable',
  toggleselect:'beta', navmenu:'beta', panels:'beta',
  colors:'stable', typography:'stable', spacing:'stable', resolutions:'stable'
};

function initStatusBadges() {
  document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
    var page = item.dataset.page;
    var status = COMPONENT_STATUS[page];
    if (status && status !== 'stable') {
      // Only inject once
      if (!item.querySelector('.nav-status')) {
        var badge = document.createElement('span');
        badge.className = 'nav-status ' + status;
        badge.textContent = status;
        item.appendChild(badge);
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 2 — Copy-paste Code Snippets
// ═══════════════════════════════════════════════════════════════════
function stripEventAttrs(html) {
  return html.replace(/\s+on\w+="[^"]*"/g, '').replace(/\s+on\w+='[^']*'/g, '');
}

function initCopyButtons() {
  document.querySelectorAll('.comp-card-header').forEach(function(header) {
    // Skip if already has a copy button
    if (header.querySelector('.copy-btn')) return;

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var card = header.closest('.comp-card');
      if (!card) return;
      var row = card.querySelector('.comp-row');
      if (!row) return;
      var raw = row.innerHTML;
      var clean = stripEventAttrs(raw)
        .replace(/\s+/g, ' ')
        .trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(clean).then(function() {
          btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied';
          btn.classList.add('copied');
          setTimeout(function() {
            btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
            btn.classList.remove('copied');
          }, 1800);
        });
      }
    });

    header.appendChild(btn);
  });
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 4 — Design Token Export
// ═══════════════════════════════════════════════════════════════════
var EXPORT_TOKENS = {
  '--shell-bg':           { dark:'#0E0E0E',  light:'#F7F9FC' },
  '--shell-raised':       { dark:'#131313',  light:'#FFFFFF' },
  '--shell-border':       { dark:'#272727',  light:'#E6E6E6' },
  '--shell-border-2':     { dark:'#3B3A3A',  light:'#D8D9DD' },
  '--shell-text':         { dark:'#F9F9F9',  light:'#101010' },
  '--shell-text-muted':   { dark:'#8A8A8A',  light:'#6E6E6E' },
  '--shell-text-dim':     { dark:'#696969',  light:'#A3A5AF' },
  '--shell-accent':       { dark:'#6360D8',  light:'#6360D8' },
  '--shell-accent-hover': { dark:'#504BB8',  light:'#504BB8' },
  '--ctrl-bg':            { dark:'#1C1C1C',  light:'#FFFFFF' },
  '--ctrl-border':        { dark:'#333333',  light:'#D8D9DD' },
  '--status-critical':    { dark:'#D12329',  light:'#D12329' },
  '--status-high':        { dark:'#E15252',  light:'#E15252' },
  '--status-medium':      { dark:'#D98B1D',  light:'#D98B1D' },
  '--status-low':         { dark:'#31A56D',  light:'#31A56D' },
  '--status-info':        { dark:'#6360D8',  light:'#6360D8' },
};

function initTokenExport() {
  var page = document.getElementById('page-colors');
  if (!page || page.querySelector('.token-export-bar')) return;

  var bar = document.createElement('div');
  bar.className = 'token-export-bar';
  bar.innerHTML =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="3" x2="12" y2="21"/></svg>' +
    '<span>Export design tokens</span>' +
    '<button class="ds-btn t-outline sz-sm" id="export-css-btn">CSS Variables</button>' +
    '<button class="ds-btn t-outline sz-sm" id="export-json-btn">JSON</button>';

  // Insert before first child of the page
  page.insertBefore(bar, page.firstChild);

  document.getElementById('export-css-btn').addEventListener('click', function() {
    var darkLines = [];
    var lightLines = [];
    Object.keys(EXPORT_TOKENS).forEach(function(k) {
      var t = EXPORT_TOKENS[k];
      darkLines.push('  ' + k + ': ' + t.dark + ';');
      if (t.light !== t.dark) lightLines.push('  ' + k + ': ' + t.light + ';');
    });
    var css = ':root {\n' + darkLines.join('\n') + '\n}\n\nhtml.theme-light {\n' + lightLines.join('\n') + '\n}';
    downloadText(css, 'pai-design-tokens.css', 'text/css');
    showToast('success', 'CSS variables downloaded');
  });

  document.getElementById('export-json-btn').addEventListener('click', function() {
    var dark = {}, light = {};
    Object.keys(EXPORT_TOKENS).forEach(function(k) {
      var snakeKey = k.replace(/^--/, '').replace(/-/g, '_');
      dark[snakeKey] = EXPORT_TOKENS[k].dark;
      light[snakeKey] = EXPORT_TOKENS[k].light;
    });
    var json = JSON.stringify({ dark: dark, light: light }, null, 2);
    downloadText(json, 'pai-design-tokens.json', 'application/json');
    showToast('success', 'JSON tokens downloaded');
  });
}

function downloadText(content, filename, type) {
  var blob = new Blob([content], { type: type });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ═══════════════════════════════════════════════════════════════════
// FEATURE 5 — Interactive Button Playground
// ═══════════════════════════════════════════════════════════════════
var _playgroundInited = false;

function initPlayground() {
  if (_playgroundInited) return;
  var page = document.getElementById('page-buttons');
  if (!page) return;

  _playgroundInited = true;

  var section = document.createElement('div');
  section.className = 'comp-section';
  section.innerHTML =
    '<div class="comp-section-title">Interactive Playground</div>' +
    '<div class="playground-wrap">' +
      '<div class="playground-header">Button Playground <span>Live Preview</span></div>' +
      '<div class="playground-body">' +
        '<div class="playground-controls">' +
          '<div>' +
            '<div class="pg-ctrl-label">Variant</div>' +
            '<div class="pg-options" id="pg-variant">' +
              '<label class="pg-option"><input type="radio" name="pg-v" value="primary" checked> Primary</label>' +
              '<label class="pg-option"><input type="radio" name="pg-v" value="secondary"> Secondary</label>' +
              '<label class="pg-option"><input type="radio" name="pg-v" value="outline"> Outline</label>' +
              '<label class="pg-option"><input type="radio" name="pg-v" value="tertiary"> Ghost</label>' +
              '<label class="pg-option"><input type="radio" name="pg-v" value="danger"> Danger</label>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="pg-ctrl-label">Size</div>' +
            '<div class="pg-options" id="pg-size">' +
              '<label class="pg-option"><input type="radio" name="pg-s" value="sm"> Small</label>' +
              '<label class="pg-option"><input type="radio" name="pg-s" value="md" checked> Medium</label>' +
              '<label class="pg-option"><input type="radio" name="pg-s" value="lg"> Large</label>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="pg-ctrl-label">Label</div>' +
            '<input type="text" class="pg-text-input" id="pg-label" value="Click me">' +
          '</div>' +
          '<div>' +
            '<label class="pg-option"><input type="checkbox" id="pg-disabled"> Disabled</label>' +
          '</div>' +
        '</div>' +
        '<div class="playground-preview">' +
          '<div class="playground-live" id="pg-live"></div>' +
          '<div class="playground-code">' +
            '<code id="pg-snippet"></code>' +
            '<button class="pg-copy-btn" id="pg-copy-btn">Copy</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  page.appendChild(section);

  function updatePlayground() {
    var variant = (document.querySelector('input[name="pg-v"]:checked') || {}).value || 'primary';
    var size = (document.querySelector('input[name="pg-s"]:checked') || {}).value || 'md';
    var label = document.getElementById('pg-label').value || 'Button';
    var disabled = document.getElementById('pg-disabled').checked;

    var classes = 'ds-btn t-' + variant + ' sz-' + size;
    var disabledAttr = disabled ? ' disabled' : '';
    var snippet = '<button class="' + classes + '"' + disabledAttr + '>' + label + '</button>';

    var live = document.getElementById('pg-live');
    if (live) {
      var btn = document.createElement('button');
      btn.className = classes;
      btn.textContent = label;
      if (disabled) btn.setAttribute('disabled', '');
      live.innerHTML = '';
      live.appendChild(btn);
    }

    var snipEl = document.getElementById('pg-snippet');
    if (snipEl) snipEl.textContent = snippet;
  }

  document.querySelectorAll('input[name="pg-v"], input[name="pg-s"]').forEach(function(r) {
    r.addEventListener('change', updatePlayground);
  });
  var pgLabel = document.getElementById('pg-label');
  if (pgLabel) pgLabel.addEventListener('input', updatePlayground);
  var pgDisabled = document.getElementById('pg-disabled');
  if (pgDisabled) pgDisabled.addEventListener('change', updatePlayground);

  var pgCopyBtn = document.getElementById('pg-copy-btn');
  if (pgCopyBtn) {
    pgCopyBtn.addEventListener('click', function() {
      var snip = document.getElementById('pg-snippet');
      if (!snip || !navigator.clipboard) return;
      navigator.clipboard.writeText(snip.textContent).then(function() {
        pgCopyBtn.textContent = 'Copied!';
        pgCopyBtn.classList.add('copied');
        setTimeout(function() {
          pgCopyBtn.textContent = 'Copy';
          pgCopyBtn.classList.remove('copied');
        }, 1800);
      });
    });
  }

  updatePlayground();
}

// ═══════════════════════════════════════════════════════════════════
// KEYBOARD HANDLER — extends existing keydown listener
// ═══════════════════════════════════════════════════════════════════
document.addEventListener('keydown', function(e) {
  // Ctrl+K or Cmd+K
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (_cmdOpen) { closeCmdPalette(); } else { openCmdPalette(); }
    return;
  }

  if (_cmdOpen) {
    if (e.key === 'Escape') {
      closeCmdPalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      _cmdSelected = Math.min(_cmdSelected + 1, _cmdResults.length - 1);
      updateCmdSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _cmdSelected = Math.max(_cmdSelected - 1, 0);
      updateCmdSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (_cmdSelected >= 0 && _cmdResults[_cmdSelected]) {
        navigateToPage(_cmdResults[_cmdSelected].p);
        closeCmdPalette();
      }
    }
  }
});

// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════
initTokenExport();

// Inject playground when buttons page is visited (deferred)
(function patchNavForPlayground() {
  document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
    item.addEventListener('click', function() {
      if (item.dataset.page === 'buttons') {
        setTimeout(function() {
          initPlayground();
        }, 50);
      }
    });
  });
})();

// If already on buttons page on load, init playground immediately
if (document.querySelector('#page-buttons.active')) {
  initPlayground();
}

// Init multi-select badge counts on load
(function() {
  document.querySelectorAll('.ds-ms-panel').forEach(function(panel) {
    var listId = panel.id + '-list';
    var countId = panel.id + '-count';
    _dsMsSync(listId, countId);
  });
})();

// ─── AI Setup page: copy prompt ───
function copyPrompt(cardId, btn) {
  var card = document.getElementById(cardId);
  if (!card) return;
  var pre = card.querySelector('.ai-prompt-body');
  if (!pre) return;
  // Decode HTML entities before copying
  var ta = document.createElement('textarea');
  ta.value = pre.textContent;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  btn.classList.add('copied');
  btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
  setTimeout(function() {
    btn.classList.remove('copied');
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
  }, 2000);
}

// ═══════════════════════════════════════════════════════════════════
// 1.1 — GENERIC COMPONENT PLAYGROUND ENGINE
// ═══════════════════════════════════════════════════════════════════
function createComponentPlayground(cfg) {
  var page = document.getElementById('page-' + cfg.pageId);
  if (!page || page.querySelector('.playground-wrap')) return;

  var uid = cfg.pageId;

  function buildControls(controls) {
    return controls.map(function(ctrl) {
      var id = uid + '-' + ctrl.id;
      if (ctrl.type === 'radio') {
        var opts = ctrl.options.map(function(o) {
          var checked = o.value === ctrl.default ? ' checked' : '';
          return '<label class="pg-option"><input type="radio" name="' + id + '" value="' + o.value + '"' + checked + '> ' + o.label + '</label>';
        }).join('');
        return '<div><div class="pg-ctrl-label">' + ctrl.label + '</div><div class="pg-options">' + opts + '</div></div>';
      }
      if (ctrl.type === 'text') {
        return '<div><div class="pg-ctrl-label">' + ctrl.label + '</div><input type="text" class="pg-text-input" id="' + id + '" value="' + (ctrl.default || '') + '"></div>';
      }
      if (ctrl.type === 'checkbox') {
        var chk = ctrl.default ? ' checked' : '';
        return '<div><label class="pg-option"><input type="checkbox" id="' + id + '"' + chk + '> ' + ctrl.label + '</label></div>';
      }
      return '';
    }).join('');
  }

  function getValues(controls) {
    var vals = {};
    controls.forEach(function(ctrl) {
      var id = uid + '-' + ctrl.id;
      if (ctrl.type === 'radio') {
        var checked = page.querySelector('input[name="' + id + '"]:checked');
        vals[ctrl.id] = checked ? checked.value : ctrl.default;
      } else if (ctrl.type === 'text') {
        var el = page.querySelector('#' + id);
        vals[ctrl.id] = el ? el.value : (ctrl.default || '');
      } else if (ctrl.type === 'checkbox') {
        var el = page.querySelector('#' + id);
        vals[ctrl.id] = el ? el.checked : !!ctrl.default;
      }
    });
    return vals;
  }

  var section = document.createElement('div');
  section.className = 'comp-section';
  section.innerHTML =
    '<div class="comp-section-title">Interactive Playground</div>' +
    '<div class="playground-wrap">' +
      '<div class="playground-header">' + cfg.title + ' <span>Live Preview</span></div>' +
      '<div class="playground-body">' +
        '<div class="playground-controls">' + buildControls(cfg.controls) + '</div>' +
        '<div class="playground-preview">' +
          '<div class="playground-live" id="pg-live-' + uid + '"></div>' +
          '<div class="playground-code">' +
            '<code id="pg-snip-' + uid + '"></code>' +
            '<button class="pg-copy-btn" id="pg-copy-' + uid + '">Copy</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  page.appendChild(section);

  function update() {
    var vals = getValues(cfg.controls);
    var result = cfg.render(vals);
    var live = page.querySelector('#pg-live-' + uid);
    var snip = page.querySelector('#pg-snip-' + uid);
    if (live) {
      live.innerHTML = result.html;
      // Re-wire toggle interactions inside the live preview
      live.querySelectorAll('.ds-toggle-wrap').forEach(function(wrap) {
        wrap.addEventListener('click', function() {
          if (wrap.classList.contains('is-disabled')) return;
          var track = wrap.querySelector('.ds-toggle-track');
          if (track) track.classList.toggle('on');
        });
      });
      // Re-wire checkbox interactions inside the live preview
      live.querySelectorAll('.ds-checkbox-item').forEach(function(item) {
        item.addEventListener('click', function() {
          if (item.classList.contains('disabled')) return;
          var box = item.querySelector('.ds-checkbox-box');
          if (box) box.classList.toggle('checked');
        });
      });
    }
    if (snip) snip.textContent = result.snippet;
  }

  page.addEventListener('input', function(e) {
    if (e.target.closest('.playground-controls')) update();
  });
  page.addEventListener('change', function(e) {
    if (e.target.closest('.playground-controls')) update();
  });

  var copyBtn = page.querySelector('#pg-copy-' + uid);
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      var snip = page.querySelector('#pg-snip-' + uid);
      if (!snip || !navigator.clipboard) return;
      navigator.clipboard.writeText(snip.textContent).then(function() {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(function() { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1800);
      });
    });
  }

  update();
}

// ── Badge Playground ──────────────────────────────────────────────
var _badgePgInited = false;
function initBadgePlayground() {
  if (_badgePgInited) return; _badgePgInited = true;
  createComponentPlayground({
    pageId: 'badges',
    title: 'Badge Playground',
    controls: [
      { type: 'radio', id: 'variant', label: 'Variant', default: 'danger',
        options: [
          {value:'danger',  label:'Danger (Critical)'},
          {value:'warning', label:'Warning (High)'},
          {value:'caution', label:'Caution (Medium-High)'},
          {value:'info',    label:'Info (Medium)'},
          {value:'success', label:'Success (Low/Active)'},
          {value:'neutral', label:'Neutral (Inactive)'}
        ]},
      { type: 'text',     id: 'label',  label: 'Label',          default: 'Critical' },
      { type: 'checkbox', id: 'dot',    label: 'Dot indicator',  default: false }
    ],
    render: function(v) {
      var cls = 'ds-badge ' + v.variant + (v.dot ? ' dot' : '');
      var html = '<span class="' + cls + '">' + (v.label || 'Badge') + '</span>';
      return { html: html, snippet: html };
    }
  });
}

// ── Callout Playground ────────────────────────────────────────────
var _calloutPgInited = false;
function initCalloutPlayground() {
  if (_calloutPgInited) return; _calloutPgInited = true;
  createComponentPlayground({
    pageId: 'callout',
    title: 'Callout Playground',
    controls: [
      { type: 'radio', id: 'variant', label: 'Variant', default: 'info',
        options: [
          {value:'info',    label:'Info'},
          {value:'warning', label:'Warning'},
          {value:'error',   label:'Error'},
          {value:'success', label:'Success'}
        ]},
      { type: 'text', id: 'message', label: 'Message', default: 'This integration requires re-authentication.' }
    ],
    render: function(v) {
      var cls = 'ds-callout ds-callout-' + v.variant;
      var html = '<div class="' + cls + '">' + (v.message || 'Message') + '</div>';
      return { html: html, snippet: html };
    }
  });
}

// ── Form / Input Playground ───────────────────────────────────────
var _formPgInited = false;
function initFormPlayground() {
  if (_formPgInited) return; _formPgInited = true;
  createComponentPlayground({
    pageId: 'forms',
    title: 'Input Playground',
    controls: [
      { type: 'radio', id: 'type', label: 'Type', default: 'text',
        options: [
          {value:'text',     label:'Text Input'},
          {value:'textarea', label:'Textarea'},
          {value:'checkbox', label:'Checkbox'},
          {value:'toggle',   label:'Toggle'}
        ]},
      { type: 'text',     id: 'label',       label: 'Label',       default: 'API Key' },
      { type: 'text',     id: 'placeholder', label: 'Placeholder', default: 'Enter value' },
      { type: 'checkbox', id: 'error',       label: 'Error state', default: false },
      { type: 'checkbox', id: 'disabled',    label: 'Disabled',    default: false }
    ],
    render: function(v) {
      var lbl = v.label || 'Label';
      var ph  = v.placeholder || '';
      var html, snip;
      if (v.type === 'text') {
        var fieldCls = 'ds-input-field' + (v.error ? ' has-error' : '') + (v.disabled ? ' disabled' : '');
        html = '<div class="ds-input-wrap" style="width:280px;">' +
          '<label class="ds-input-label">' + lbl + (v.error ? ' <span style="color:var(--color-danger,#dc2626)">*</span>' : '') + '</label>' +
          '<div class="' + fieldCls + '"><input type="text" placeholder="' + ph + '"' + (v.disabled ? ' disabled' : '') + '></div>' +
          (v.error ? '<span style="font-size:11px;color:var(--color-danger,#dc2626);margin-top:4px;display:block;">This field is required</span>' : '') +
          '</div>';
        snip = '<div class="ds-input-wrap">\n  <label class="ds-input-label">' + lbl + '</label>\n  <div class="ds-input-field"><input type="text" placeholder="' + ph + '"></div>\n</div>';
      } else if (v.type === 'textarea') {
        var taCls = 'ds-textarea-field' + (v.error ? ' has-error' : '');
        html = '<div class="ds-input-wrap" style="width:280px;">' +
          '<label class="ds-input-label">' + lbl + '</label>' +
          '<textarea class="' + taCls + '" rows="3" placeholder="' + ph + '"' + (v.disabled ? ' disabled' : '') + '></textarea>' +
          '</div>';
        snip = '<div class="ds-input-wrap">\n  <label class="ds-input-label">' + lbl + '</label>\n  <textarea class="ds-textarea-field" rows="3" placeholder="' + ph + '"></textarea>\n</div>';
      } else if (v.type === 'checkbox') {
        var cbCls = 'ds-checkbox-item' + (v.disabled ? ' disabled' : '');
        html = '<label class="' + cbCls + '">' +
          '<span class="ds-checkbox-box sz-md">' +
            '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="chk"><polyline points="20 6 9 17 4 12"/></svg>' +
            '<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="dash"><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '</span>' +
          '<span class="ds-checkbox-text">' + lbl + '</span>' +
          '</label>';
        snip = '<label class="ds-checkbox-item">\n  <span class="ds-checkbox-box sz-md"><svg class="chk">...</svg></span>\n  <span class="ds-checkbox-text">' + lbl + '</span>\n</label>';
      } else {
        var toggleWrapCls = 'ds-toggle-wrap' + (v.disabled ? ' is-disabled' : '');
        html = '<label class="' + toggleWrapCls + '">' +
          '<span class="ds-toggle-track sz-sm"><span class="ds-toggle-thumb"></span></span>' +
          '<span class="ds-toggle-label">' + lbl + '</span>' +
          '</label>';
        snip = '<label class="ds-toggle-wrap">\n  <span class="ds-toggle-track sz-sm"><span class="ds-toggle-thumb"></span></span>\n  <span class="ds-toggle-label">' + lbl + '</span>\n</label>';
      }
      return { html: html, snippet: snip };
    }
  });
}

// ── KPI Card Playground ───────────────────────────────────────────
var _kpiPgInited = false;
function initKpiPlayground() {
  if (_kpiPgInited) return; _kpiPgInited = true;
  createComponentPlayground({
    pageId: 'kpi',
    title: 'KPI Card Playground',
    controls: [
      { type: 'text',  id: 'value',  label: 'Value',  default: '1,284' },
      { type: 'text',  id: 'label',  label: 'Label',  default: 'Total Assets' },
      { type: 'text',  id: 'delta',  label: 'Delta',  default: '↑ 12%' },
      { type: 'radio', id: 'dir',    label: 'Direction', default: 'up-good',
        options: [
          {value:'up-good',   label:'Up — Good (e.g. uptime ↑)'},
          {value:'down-good', label:'Down — Good (e.g. findings ↓)'},
          {value:'up-bad',    label:'Up — Bad (e.g. critical ↑)'},
          {value:'down-bad',  label:'Down — Bad (e.g. score ↓)'}
        ]},
      { type: 'text',  id: 'period', label: 'Period', default: 'vs last month' }
    ],
    render: function(v) {
      var html =
        '<div class="ds-kpi-row" style="display:flex;">' +
          '<div class="ds-kpi-card">' +
            '<div class="ds-kpi-value">' + (v.value || '—') + '</div>' +
            '<div class="ds-kpi-label">' + (v.label || 'Metric') + '</div>' +
            '<div class="ds-kpi-trend">' +
              '<span class="ds-kpi-delta ' + v.dir + '">' + (v.delta || '—') + '</span>' +
              '<span class="ds-kpi-period">' + (v.period || '') + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
      var snip =
        '<div class="ds-kpi-row">\n  <div class="ds-kpi-card">\n' +
        '    <div class="ds-kpi-value">' + (v.value || '—') + '</div>\n' +
        '    <div class="ds-kpi-label">' + (v.label || 'Metric') + '</div>\n' +
        '    <div class="ds-kpi-trend">\n' +
        '      <span class="ds-kpi-delta ' + v.dir + '">' + (v.delta || '—') + '</span>\n' +
        '      <span class="ds-kpi-period">' + (v.period || '') + '</span>\n' +
        '    </div>\n  </div>\n</div>';
      return { html: html, snippet: snip };
    }
  });
}

// ── Avatar Playground ─────────────────────────────────────────────
var _avatarPgInited = false;
function initAvatarPlayground() {
  if (_avatarPgInited) return; _avatarPgInited = true;
  createComponentPlayground({
    pageId: 'avatars',
    title: 'Avatar Playground',
    controls: [
      { type: 'radio', id: 'size', label: 'Size', default: 'md',
        options: [
          {value:'xs',  label:'XSmall (22px)'},
          {value:'sm',  label:'Small (28px)'},
          {value:'md',  label:'Medium (36px)'},
          {value:'lg',  label:'Large (48px)'}
        ]},
      { type: 'text', id: 'initials', label: 'Initials', default: 'JD' },
      { type: 'radio', id: 'color', label: 'Color', default: 'purple',
        options: [
          {value:'purple',  label:'Purple'},
          {value:'teal',    label:'Teal'},
          {value:'green',   label:'Green'},
          {value:'red',     label:'Red'},
          {value:'amber',   label:'Amber'}
        ]}
    ],
    render: function(v) {
      var sizeMap = { xs:'22px', sm:'28px', md:'36px', lg:'48px' };
      var fsMap   = { xs:'9px',  sm:'11px', md:'13px', lg:'16px' };
      var colorMap = { purple:'#6760d8', teal:'#47adcb', green:'#31A56D', red:'#D12329', amber:'#D98B1D' };
      var sz = sizeMap[v.size] || '36px';
      var fs = fsMap[v.size] || '13px';
      var bg = colorMap[v.color] || '#6760d8';
      var text = (v.initials || 'JD').slice(0,2).toUpperCase();
      var html = '<div class="ds-avatar" style="width:' + sz + ';height:' + sz + ';font-size:' + fs + ';background:' + bg + ';">' + text + '</div>';
      return { html: html, snippet: '<div class="ds-avatar" style="width:' + sz + ';height:' + sz + ';font-size:' + fs + ';background:' + bg + ';">' + text + '</div>' };
    }
  });
}

// ── Progress Playground ───────────────────────────────────────────
var _progressPgInited = false;
function initProgressPlayground() {
  if (_progressPgInited) return; _progressPgInited = true;
  createComponentPlayground({
    pageId: 'progress',
    title: 'Progress Bar Playground',
    controls: [
      { type: 'text',  id: 'value',  label: 'Value (0–100)', default: '65' },
      { type: 'text',  id: 'label',  label: 'Label',         default: 'Scanning…' },
      { type: 'radio', id: 'variant', label: 'Variant', default: 'default',
        options: [
          {value:'default', label:'Default (accent)'},
          {value:'success', label:'Success'},
          {value:'danger',  label:'Danger'},
          {value:'warning', label:'Warning'}
        ]}
    ],
    render: function(v) {
      var pct  = Math.min(100, Math.max(0, parseInt(v.value) || 0));
      var colorMap = { default:'var(--shell-accent)', success:'#31A56D', danger:'#D12329', warning:'#D98B1D' };
      var barColor = colorMap[v.variant] || 'var(--shell-accent)';
      var html =
        '<div style="width:260px;">' +
          (v.label ? '<div style="font-size:12px;color:var(--shell-text-2);margin-bottom:6px;display:flex;justify-content:space-between;"><span>' + v.label + '</span><span style="color:var(--shell-text-muted);">' + pct + '%</span></div>' : '') +
          '<div class="ds-progress"><div class="ds-progress-bar" style="width:' + pct + '%;background:' + barColor + ';"></div></div>' +
        '</div>';
      var snip = '<div class="ds-progress"><div class="ds-progress-bar" style="width:' + pct + '%;background:' + barColor + ';"></div></div>';
      return { html: html, snippet: snip };
    }
  });
}

// ── Tabs Playground ───────────────────────────────────────────────
var _tabsPgInited = false;
function initTabsPlayground() {
  if (_tabsPgInited) return; _tabsPgInited = true;
  createComponentPlayground({
    pageId: 'tabs',
    title: 'Tabs Playground',
    controls: [
      { type: 'radio', id: 'style', label: 'Style', default: 'underline',
        options: [
          {value:'underline', label:'Underline'},
          {value:'pill',      label:'Pill'}
        ]},
      { type: 'radio', id: 'active', label: 'Active Tab', default: '0',
        options: [
          {value:'0', label:'Tab 1'},
          {value:'1', label:'Tab 2'},
          {value:'2', label:'Tab 3'}
        ]}
    ],
    render: function(v) {
      var labels = ['Overview', 'Findings', 'History'];
      var isPill = v.style === 'pill';
      var wrapCls = isPill ? 'ds-tabs ds-tabs-pill' : 'ds-tabs';
      var tabs = labels.map(function(lbl, i) {
        return '<button class="ds-tab' + (String(i) === v.active ? ' active' : '') + '">' + lbl + '</button>';
      }).join('');
      var html = '<div class="' + wrapCls + '"><div class="ds-tabs-list">' + tabs + '</div></div>';
      return { html: html, snippet: html };
    }
  });
}

// ── Toggle & Select Playground ────────────────────────────────────
var _toggleSelectPgInited = false;
function initToggleSelectPlayground() {
  if (_toggleSelectPgInited) return; _toggleSelectPgInited = true;
  createComponentPlayground({
    pageId: 'toggleselect',
    title: 'Toggle Playground',
    controls: [
      { type: 'radio', id: 'size', label: 'Size', default: 'sm',
        options: [
          {value:'sm', label:'Small'},
          {value:'md', label:'Medium'}
        ]},
      { type: 'radio', id: 'state', label: 'State', default: 'off',
        options: [
          {value:'off', label:'Off'},
          {value:'on',  label:'On'}
        ]},
      { type: 'text',     id: 'label',    label: 'Label',    default: 'Enable alerts' },
      { type: 'checkbox', id: 'disabled', label: 'Disabled', default: false }
    ],
    render: function(v) {
      var trackCls = 'ds-toggle-track sz-' + v.size + (v.state === 'on' ? ' on' : '');
      var wrapCls  = 'ds-toggle-wrap' + (v.disabled ? ' is-disabled' : '');
      var dis = v.disabled ? ' style="opacity:0.45;cursor:not-allowed;"' : '';
      var html =
        '<label class="' + wrapCls + '"' + dis + '>' +
          '<input type="checkbox" class="ds-toggle-input"' + (v.state === 'on' ? ' checked' : '') + (v.disabled ? ' disabled' : '') + ' style="display:none;">' +
          '<span class="' + trackCls + '"><span class="ds-toggle-thumb"></span></span>' +
          '<span class="ds-toggle-label" style="font-size:13px;color:var(--shell-text);">' + (v.label || '') + '</span>' +
        '</label>';
      var snip =
        '<label class="ds-toggle-wrap">\n' +
        '  <input type="checkbox" class="ds-toggle-input">\n' +
        '  <span class="ds-toggle-track sz-' + v.size + '"><span class="ds-toggle-thumb"></span></span>\n' +
        '  <span class="ds-toggle-label">' + (v.label || '') + '</span>\n' +
        '</label>';
      return { html: html, snippet: snip };
    }
  });
}

// ── Breadcrumb Playground ─────────────────────────────────────────
var _breadnavPgInited = false;
function initBreadnavPlayground() {
  if (_breadnavPgInited) return; _breadnavPgInited = true;
  createComponentPlayground({
    pageId: 'breadnav',
    title: 'Breadcrumb Playground',
    controls: [
      { type: 'radio', id: 'depth', label: 'Depth', default: '3',
        options: [
          {value:'2', label:'2 levels'},
          {value:'3', label:'3 levels'},
          {value:'4', label:'4 levels'}
        ]},
      { type: 'text', id: 'current', label: 'Current page', default: 'Risk Assessment' }
    ],
    render: function(v) {
      var ancestors = ['Home', 'Vendors', 'Acme Corp', 'Reports'];
      var depth = parseInt(v.depth) || 3;
      var crumbs = ancestors.slice(0, depth - 1);
      var current = v.current || 'Current Page';
      var sep = '<span class="ds-breadcrumb-sep">/</span>';
      var parts = crumbs.map(function(c) {
        return '<a href="#" onclick="return false;">' + c + '</a>' + sep;
      });
      parts.push('<span class="ds-breadcrumb-current">' + current + '</span>');
      var html = '<nav class="ds-breadcrumb">' + parts.join('') + '</nav>';
      return { html: html, snippet: html };
    }
  });
}

// ── Modal Playground ──────────────────────────────────────────────
var _overlaysPgInited = false;
function initOverlaysPlayground() {
  if (_overlaysPgInited) return; _overlaysPgInited = true;
  createComponentPlayground({
    pageId: 'overlays',
    title: 'Modal Playground',
    controls: [
      { type: 'radio', id: 'type', label: 'Type', default: 'confirm',
        options: [
          {value:'confirm',     label:'Confirmation'},
          {value:'destructive', label:'Destructive'},
          {value:'info',        label:'Info / Alert'}
        ]},
      { type: 'text', id: 'title',  label: 'Title',  default: 'Confirm Action' },
      { type: 'text', id: 'body',   label: 'Body',   default: 'Are you sure you want to proceed?' }
    ],
    render: function(v) {
      var isDestructive = v.type === 'destructive';
      var confirmCls = isDestructive ? 'ds-btn sz-sm t-danger' : 'ds-btn sz-sm t-primary';
      var confirmLbl = isDestructive ? 'Delete' : 'Confirm';
      var html =
        '<div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;padding:24px;max-width:380px;box-shadow:0 8px 32px rgba(0,0,0,.18);">' +
          '<div style="font-size:14px;font-weight:600;color:var(--shell-text);margin-bottom:8px;">' + (v.title || 'Confirm') + '</div>' +
          '<div style="font-size:12px;color:var(--shell-text-muted);margin-bottom:20px;">' + (v.body || '') + '</div>' +
          '<div style="display:flex;justify-content:flex-end;gap:8px;">' +
            '<button class="ds-btn sz-sm t-outline">Cancel</button>' +
            '<button class="' + confirmCls + '">' + confirmLbl + '</button>' +
          '</div>' +
        '</div>';
      return { html: html, snippet: html };
    }
  });
}

// ── Tooltip Playground ────────────────────────────────────────────
var _tooltipPgInited = false;
function initTooltipPlayground() {
  if (_tooltipPgInited) return; _tooltipPgInited = true;
  createComponentPlayground({
    pageId: 'tooltip',
    title: 'Tooltip Playground',
    controls: [
      { type: 'radio', id: 'pos', label: 'Position', default: 'top',
        options: [
          {value:'top',    label:'Top'},
          {value:'bottom', label:'Bottom'},
          {value:'left',   label:'Left'},
          {value:'right',  label:'Right'}
        ]},
      { type: 'text', id: 'text', label: 'Tooltip text', default: 'Additional context here' }
    ],
    render: function(v) {
      var text = v.text || 'Tooltip';
      var html =
        '<div style="position:relative;display:inline-block;padding:24px;">' +
          '<button class="ds-btn sz-sm t-outline ds-tooltip" data-tip="' + text + '" data-tip-pos="' + v.pos + '">Hover me</button>' +
          '<div class="ds-tip ds-tip-' + v.pos + '" style="position:absolute;background:#1a1a1a;color:#f9f9f9;font-size:11px;padding:5px 8px;border-radius:4px;white-space:nowrap;pointer-events:none;' +
            (v.pos === 'top'    ? 'bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);' : '') +
            (v.pos === 'bottom' ? 'top:calc(100% + 6px);left:50%;transform:translateX(-50%);' : '') +
            (v.pos === 'left'   ? 'right:calc(100% + 6px);top:50%;transform:translateY(-50%);' : '') +
            (v.pos === 'right'  ? 'left:calc(100% + 6px);top:50%;transform:translateY(-50%);' : '') +
          '">' + text + '</div>' +
        '</div>';
      var snip = '<button class="ds-btn sz-sm t-outline ds-tooltip" data-tip="' + text + '" data-tip-pos="' + v.pos + '">Hover me</button>';
      return { html: html, snippet: snip };
    }
  });
}

// ── Wire all playgrounds to nav clicks ────────────────────────────
(function() {
  var pgMap = {
    avatars:      initAvatarPlayground,
    badges:       initBadgePlayground,
    breadnav:     initBreadnavPlayground,
    callout:      initCalloutPlayground,
    forms:        initFormPlayground,
    kpi:          initKpiPlayground,
    overlays:     initOverlaysPlayground,
    progress:     initProgressPlayground,
    tabs:         initTabsPlayground,
    toggleselect: initToggleSelectPlayground,
    tooltip:      initTooltipPlayground
  };
  document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
    item.addEventListener('click', function() {
      var fn = pgMap[item.dataset.page];
      if (fn) setTimeout(fn, 50);
    });
  });
  Object.keys(pgMap).forEach(function(pg) {
    if (document.querySelector('#page-' + pg + '.active')) pgMap[pg]();
  });
})();


// ═══════════════════════════════════════════════════════════════════
// 1.2 — TOKEN EXPORT
// ═══════════════════════════════════════════════════════════════════
var _DS_TOKENS = {
  colors: {
    '--color-accent':          '#6360D8',
    '--color-accent-filter':   '#504bb8',
    '--color-accent-light':    '#f0f0fc',
    '--color-accent-tint':     '#e0dff7',
    '--color-severity-critical': '#D12329',
    '--color-severity-high':     '#D98B1D',
    '--color-severity-medium':   '#6360D8',
    '--color-severity-low':      '#31A56D',
    '--color-success-bg':        '#EFF7ED',
    '--color-warning-bg':        '#FEF3C7',
    '--color-danger-bg':         '#F9EEEE',
    '--color-topbar':            '#131313'
  },
  spacing: { '--spacing-2xs':'4px','--spacing-xs':'8px','--spacing-sm':'12px','--spacing-md':'16px','--spacing-lg':'20px','--spacing-xl':'24px','--spacing-2xl':'32px','--spacing-3xl':'48px' },
  radius:  { '--radius-button':'44px','--radius-card':'4px','--radius-badge':'4px','--radius-input':'8px','--radius-modal':'12px' },
  typography: { '--font-base-size':'12px','--font-weight-normal':400,'--font-weight-medium':500,'--font-weight-semibold':600,'--font-weight-bold':700 }
};

function downloadTokenExport(format) {
  var content, filename, mime;

  if (format === 'css') {
    var lines = ['/* Prevalent AI Design System — Token Export */\n:root {'];
    [_DS_TOKENS.colors, _DS_TOKENS.spacing, _DS_TOKENS.radius, _DS_TOKENS.typography].forEach(function(group) {
      lines.push('');
      Object.entries(group).forEach(function(e) { lines.push('  ' + e[0] + ': ' + e[1] + ';'); });
    });
    lines.push('}');
    content = lines.join('\n');
    filename = 'pai-tokens.css';
    mime = 'text/css';

  } else if (format === 'json') {
    var flat = {};
    [_DS_TOKENS.colors, _DS_TOKENS.spacing, _DS_TOKENS.radius, _DS_TOKENS.typography].forEach(function(group) {
      Object.entries(group).forEach(function(e) { flat[e[0].replace(/^--/, '')] = e[1]; });
    });
    content = JSON.stringify(flat, null, 2);
    filename = 'pai-tokens.json';
    mime = 'application/json';

  } else if (format === 'tailwind') {
    content = [
      '// Prevalent AI Design System — Tailwind Token Config',
      '/** @type {import("tailwindcss").Config} */',
      'module.exports = {',
      '  theme: {',
      '    extend: {',
      '      colors: {',
      '        accent:    \'' + _DS_TOKENS.colors['--color-accent'] + '\',',
      '        \'accent-filter\': \'' + _DS_TOKENS.colors['--color-accent-filter'] + '\',',
      '        \'accent-light\':  \'' + _DS_TOKENS.colors['--color-accent-light'] + '\',',
      '        critical:  \'' + _DS_TOKENS.colors['--color-severity-critical'] + '\',',
      '        high:      \'' + _DS_TOKENS.colors['--color-severity-high'] + '\',',
      '        medium:    \'' + _DS_TOKENS.colors['--color-severity-medium'] + '\',',
      '        low:       \'' + _DS_TOKENS.colors['--color-severity-low'] + '\',',
      '      },',
      '      spacing: {',
      '        \'2xs\': \'4px\', xs: \'8px\', sm: \'12px\', md: \'16px\',',
      '        lg: \'20px\', xl: \'24px\', \'2xl\': \'32px\', \'3xl\': \'48px\',',
      '      },',
      '      borderRadius: {',
      '        button: \'44px\', card: \'4px\', badge: \'4px\',',
      '        input: \'8px\', modal: \'12px\',',
      '      },',
      '      fontSize: {',
      '        \'2xs\': [\'10px\',{lineHeight:\'14px\'}], xs: [\'11px\',{lineHeight:\'15px\'}],',
      '        sm:   [\'12px\',{lineHeight:\'16px\'}], base:[\'13px\',{lineHeight:\'19px\'}],',
      '        md:   [\'14px\',{lineHeight:\'20px\'}],',
      '      },',
      '    },',
      '  },',
      '};'
    ].join('\n');
    filename = 'tailwind.pai-tokens.js';
    mime = 'text/javascript';
  }

  var blob = new Blob([content], { type: mime });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  showToast('success', filename + ' downloaded');
}


// ═══════════════════════════════════════════════════════════════════
// 1.3 — STATES PAGE INIT
// ═══════════════════════════════════════════════════════════════════
var _statesPgInited = false;
function initStatesPage() {
  if (_statesPgInited) return; _statesPgInited = true;
  var page = document.getElementById('page-states');
  if (!page) return;

  // Skeleton loader demo — activate on toggle
  page.querySelectorAll('.states-skeleton-demo').forEach(function(wrap) {
    var btn = wrap.querySelector('.states-demo-toggle');
    var skels = wrap.querySelectorAll('.ds-skeleton');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var loading = btn.dataset.state !== 'loading';
      btn.dataset.state = loading ? 'loading' : '';
      btn.textContent = loading ? 'Show Content' : 'Show Skeleton';
      skels.forEach(function(s) { s.style.display = loading ? '' : 'none'; });
      wrap.querySelectorAll('.states-content-slot').forEach(function(c) {
        c.style.display = loading ? 'none' : '';
      });
    });
  });
}

(function() {
  document.querySelectorAll('.nav-item[data-page]').forEach(function(item) {
    item.addEventListener('click', function() {
      if (item.dataset.page === 'states') setTimeout(initStatesPage, 50);
    });
  });
  if (document.querySelector('#page-states.active')) initStatesPage();
})();

/* ══════════════════════════════════════════════════
   DETAIL DRAWER — ds-drawer-* namespace
   Triggered by table row clicks.
   Populates header, sidebar stats, entity graph,
   and General/Security field grids from row data.
══════════════════════════════════════════════════ */
(function() {

  // ── Severity helpers ──
  var SEV_BADGE = {
    critical: 'danger', high: 'warning', medium: 'info', low: 'success'
  };
  var SEV_COLOR = {
    critical: '#D12329', high: '#D98B1D', medium: '#6360D8', low: '#31A56D'
  };

  // ── Open / Close ──
  window.openDetailDrawer = function(data) {
    var overlay  = document.getElementById('ds-drawer-overlay');
    var drawer   = document.getElementById('ds-drawer');
    if (!overlay || !drawer) return;

    // Populate header
    document.getElementById('ds-drawer-title').textContent    = data.asset || 'Unknown';
    document.getElementById('ds-drawer-type-badge').textContent = data.type  || 'Host';
    document.getElementById('ds-drawer-score').textContent    = data.score || '—';

    var sevBadge = document.getElementById('ds-drawer-sev-badge');
    var sev = (data.sev || 'low').toLowerCase();
    sevBadge.className = 'ds-badge ' + (SEV_BADGE[sev] || 'neutral');
    sevBadge.textContent = sev.charAt(0).toUpperCase() + sev.slice(1);

    // Populate General fields
    var gf = document.getElementById('ds-drawer-general-fields');
    if (gf) {
      gf.innerHTML = dsDrawerField('Display Label', data.asset) +
        dsDrawerField('OS', data.os || 'Linux') +
        dsDrawerField('Data Source', '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>&nbsp;3 sources', true) +
        dsDrawerField('Hardware Serial Name', 'SN' + Math.random().toString(36).substr(2,10).toUpperCase()) +
        dsDrawerField('Business Unit', data.bu || '—') +
        dsDrawerField('Role', 'Web Server, Database') +
        dsDrawerField('FQDN', '<span class="ds-drawer-field-value accent">' + (data.asset.replace(/\.[^.]+$/, '') + '-local.acme.com') + '</span>', true) +
        dsDrawerField('A&amp;D Device ID', '<span style="font-size:10px;">' + dsUUID() + '</span>', true) +
        dsDrawerField('Type', data.type || 'Server') +
        dsDrawerField('MAC Address', '<span style="font-family:monospace;">' + dsMac() + '</span>', true) +
        dsDrawerField('Internet Facing', '<span class="true-val">True</span>', true) +
        dsDrawerField('Environment', 'Production');
    }

    // Populate Security fields
    var sf = document.getElementById('ds-drawer-security-fields');
    if (sf) {
      sf.innerHTML =
        dsDrawerField('Defender Risk Score', '<span class="ds-drawer-field-pill high">High</span>', true) +
        dsDrawerField('Defender Health Status', '<span class="ds-drawer-field-pill true">TRUE</span>', true) +
        dsDrawerField('EDR Onboarding Status', '<span class="ds-drawer-field-pill true">TRUE</span>', true) +
        dsDrawerField('VM Onboarding Status', '<span class="ds-drawer-field-pill true">TRUE</span>', true) +
        dsDrawerField('FW Enabled', '<span class="ds-drawer-field-pill true">TRUE</span>', true);
    }

    // Activate first tab
    dsDrawerTab(document.querySelector('#ds-drawer .ds-drawer-tab'), 'summary');

    // Init traversal stack with the root entity
    _travStack = [{ label: data.asset, type: data.type || 'Host' }];
    dsDrawerBuildTraversal();

    // Open
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Draw entity graph
    setTimeout(dsDrawerDrawGraph, 60);
  };

  window.closeDetailDrawer = function() {
    var overlay = document.getElementById('ds-drawer-overlay');
    var drawer  = document.getElementById('ds-drawer');
    if (overlay) overlay.classList.remove('open');
    if (drawer)  drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.dsDrawerOverlayClick = function(e) {
    if (e.target === document.getElementById('ds-drawer-overlay')) closeDetailDrawer();
  };

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var d = document.getElementById('ds-drawer');
      if (d && d.classList.contains('open')) closeDetailDrawer();
    }
  });

  // ── Field builder ──
  function dsDrawerField(label, value, raw) {
    return '<div class="ds-drawer-field">' +
      '<div class="ds-drawer-field-label">' + label + '</div>' +
      '<div class="ds-drawer-field-value">' + (raw ? value : escHtml(String(value))) + '</div>' +
      '</div>';
  }
  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function dsUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c==='x'?r:(r&0x3|0x8);
      return v.toString(16);
    });
  }
  function dsMac() {
    return Array.from({length:6},function(){return('0'+Math.floor(Math.random()*256).toString(16)).slice(-2).toUpperCase()}).join(':');
  }

  // ── Tabs ──
  window.dsDrawerTab = function(btn, panelId) {
    document.querySelectorAll('#ds-drawer .ds-drawer-tab').forEach(function(b) {
      b.classList.remove('active');
    });
    document.querySelectorAll('#ds-drawer .ds-drawer-tab-panel').forEach(function(p) {
      p.classList.remove('active');
    });
    if (btn) btn.classList.add('active');
    var panel = document.getElementById('ds-drawer-panel-' + panelId);
    if (panel) panel.classList.add('active');
    // Render SVG diagrams lazily
    if (panelId === 'contributing') setTimeout(dsContribDraw, 60);
    if (panelId === 'resolution')   setTimeout(dsEresDraw, 60);
  };

  // ── Attribute Timeline switcher ──
  window.dsDrawerAttrTimeline = function(attr) {
    var data = {
      os:   [{date:'Jan 12, 2023',val:'Windows 10 Pro',muted:true},{date:'Mar 5, 2024',val:'Windows 11 Pro',changed:true},{date:'Jan 23, 2025',val:'Windows 11 Pro',muted:false}],
      ip:   [{date:'Jan 12, 2023',val:'10.0.1.11',muted:true},{date:'Jun 3, 2023',val:'10.0.1.42',changed:true},{date:'Jan 23, 2025',val:'10.0.1.42',muted:false}],
      fqdn: [{date:'Jan 12, 2023',val:'desktop-a7k2b.acme.com',muted:false},{date:'Jan 23, 2025',val:'desktop-a7k2b.acme.com',muted:false}],
      bu:   [{date:'Jan 12, 2023',val:'Engineering',muted:true},{date:'Sep 1, 2023',val:'Finance',changed:true},{date:'Jan 23, 2025',val:'Finance',muted:false}]
    };
    var events = data[attr] || data.os;
    var container = document.getElementById('ds-tl-attr-events');
    if (!container) return;
    container.innerHTML = events.map(function(e) {
      return '<div class="ds-tl-event' + (e.muted ? ' muted' : '') + '">' +
        '<div class="ds-tl-dot"></div>' +
        '<div class="ds-tl-event-date">' + e.date + '</div>' +
        '<div class="ds-tl-event-desc">' + e.val + (e.changed ? '<br><span style="font-size:9px;color:var(--shell-accent);">Changed</span>' : '') + '</div>' +
        '</div>';
    }).join('');
  };

  // ── Evolution tab scroll ──
  window.dsEvoScroll = function(dir) {
    var el = document.getElementById('ds-evo-table-scroll');
    if (!el) return;
    el.scrollBy({ left: dir * 160, behavior: 'smooth' });
    setTimeout(function() {
      var leftBtn  = document.getElementById('ds-evo-left');
      var rightBtn = document.getElementById('ds-evo-right');
      if (leftBtn)  leftBtn.style.display  = el.scrollLeft > 0 ? 'flex' : 'none';
      if (rightBtn) rightBtn.style.display = el.scrollLeft + el.clientWidth < el.scrollWidth - 4 ? 'flex' : 'none';
    }, 250);
  };

  // ── Contributing Sources Sankey ──
  function dsContribDraw() {
    var canvas = document.getElementById('ds-contrib-canvas');
    var svg    = document.getElementById('ds-contrib-svg');
    if (!canvas || !svg) return;
    svg.innerHTML = '';
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    // Helper: get node mid-right and mid-left points relative to canvas
    function midRight(id) {
      var el = document.getElementById(id);
      if (!el) return null;
      var cr = canvas.getBoundingClientRect();
      var er = el.getBoundingClientRect();
      return { x: er.right - cr.left, y: er.top + er.height / 2 - cr.top };
    }
    function midLeft(id) {
      var el = document.getElementById(id);
      if (!el) return null;
      var cr = canvas.getBoundingClientRect();
      var er = el.getBoundingClientRect();
      return { x: er.left - cr.left, y: er.top + er.height / 2 - cr.top };
    }

    var connections = [
      { from:'ds-cn-azure',    to:'ds-cn-unique',       color:'rgba(245,158,11,0.2)' },
      { from:'ds-cn-azure',    to:'ds-cn-corroborated', color:'rgba(245,158,11,0.15)' },
      { from:'ds-cn-defender', to:'ds-cn-unique',       color:'rgba(124,58,237,0.2)' },
      { from:'ds-cn-defender', to:'ds-cn-corroborated', color:'rgba(124,58,237,0.15)' },
      { from:'ds-cn-nvd',      to:'ds-cn-corroborated', color:'rgba(99,96,216,0.2)' },
      { from:'ds-cn-unique',   to:'ds-cn-host',         color:'rgba(49,165,109,0.2)' },
      { from:'ds-cn-unique',   to:'ds-cn-vuln',         color:'rgba(49,165,109,0.15)' },
      { from:'ds-cn-corroborated','to':'ds-cn-host',    color:'rgba(59,130,246,0.2)' },
      { from:'ds-cn-corroborated','to':'ds-cn-vuln',    color:'rgba(59,130,246,0.15)' }
    ];

    connections.forEach(function(c) {
      var p1 = midRight(c.from), p2 = midLeft(c.to);
      if (!p1 || !p2) return;
      var cx = (p1.x + p2.x) / 2;
      var path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d', 'M'+p1.x+','+p1.y+' C'+cx+','+p1.y+' '+cx+','+p2.y+' '+p2.x+','+p2.y);
      path.setAttribute('fill','none');
      path.setAttribute('stroke', c.color);
      path.setAttribute('stroke-width','10');
      svg.appendChild(path);
    });
  }

  // ── Entity Resolution graph ──
  function dsEresDraw() {
    var canvas = document.getElementById('ds-eres-canvas');
    var svg    = document.getElementById('ds-eres-svg');
    if (!canvas || !svg) return;
    svg.innerHTML = '';
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    function midRight(id) {
      var el = document.getElementById(id);
      if (!el) return null;
      var cr = canvas.getBoundingClientRect();
      var er = el.getBoundingClientRect();
      return { x: er.right - cr.left, y: er.top + er.height / 2 - cr.top };
    }
    function midLeft(id) {
      var el = document.getElementById(id);
      if (!el) return null;
      var cr = canvas.getBoundingClientRect();
      var er = el.getBoundingClientRect();
      return { x: er.left - cr.left, y: er.top + er.height / 2 - cr.top };
    }

    // Keys → Fragments
    var kf = [
      { from:'ds-eres-ip',     to:'ds-eres-f1', color:'rgba(220,38,38,0.25)' },
      { from:'ds-eres-ip',     to:'ds-eres-f2', color:'rgba(220,38,38,0.15)' },
      { from:'ds-eres-host',   to:'ds-eres-f1', color:'rgba(220,38,38,0.2)' },
      { from:'ds-eres-host',   to:'ds-eres-f2', color:'rgba(220,38,38,0.2)' },
      { from:'ds-eres-host',   to:'ds-eres-f3', color:'rgba(220,38,38,0.15)' },
      { from:'ds-eres-serial', to:'ds-eres-f1', color:'rgba(220,38,38,0.2)' },
      { from:'ds-eres-mac',    to:'ds-eres-f2', color:'rgba(220,38,38,0.2)' }
    ];
    // Fragments → Resolved
    var fr = [
      { from:'ds-eres-f1', to:'ds-eres-resolved', color:'rgba(20,184,166,0.35)' },
      { from:'ds-eres-f2', to:'ds-eres-resolved', color:'rgba(20,184,166,0.35)' },
      { from:'ds-eres-f3', to:'ds-eres-resolved', color:'rgba(20,184,166,0.25)' }
    ];

    kf.concat(fr).forEach(function(c) {
      var p1 = midRight(c.from), p2 = midLeft(c.to);
      if (!p1 || !p2) return;
      var cx = (p1.x + p2.x) / 2;
      var path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d', 'M'+p1.x+','+p1.y+' C'+cx+','+p1.y+' '+cx+','+p2.y+' '+p2.x+','+p2.y);
      path.setAttribute('fill','none');
      path.setAttribute('stroke', c.color);
      path.setAttribute('stroke-width','2');
      svg.appendChild(path);
    });
  }

  // ── Graph toggle ──
  window.dsDrawerToggleGraph = function() {
    var section = document.getElementById('ds-drawer-graph-section');
    var toggle  = document.getElementById('ds-drawer-graph-toggle');
    if (!section) return;
    var collapsed = section.classList.toggle('collapsed');
    if (toggle) {
      toggle.innerHTML = collapsed
        ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg> Expand'
        : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg> Collapse';
    }
  };

  // ── Dynamic traversal path ──
  var _travStack = [];

  var _travIcons = {
    Host:          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    Server:        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
    Vulnerability: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    Findings:      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    Person:        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    Identity:      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    Application:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="9" height="9"/><rect x="13" y="2" width="9" height="9"/><rect x="2" y="13" width="9" height="9"/><rect x="13" y="13" width="9" height="9"/></svg>',
    Network:       '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    Workstation:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  };
  function dsGetTravIcon(type) {
    return _travIcons[type] || _travIcons.Host;
  }

  // Render the sidebar from _travStack
  function dsDrawerBuildTraversal() {
    var container = document.getElementById('ds-drawer-trav-nodes');
    if (!container) return;
    var html = '';
    _travStack.forEach(function(node, i) {
      var isLast = (i === _travStack.length - 1);
      var canClick = !isLast; // clicking current node does nothing
      if (i > 0) html += '<div class="ds-drawer-trav-gap"></div>';
      html +=
        '<div class="ds-drawer-trav-node' + (isLast ? ' active' : ' past') + '"' +
        ' title="' + node.label + '"' +
        (canClick ? ' onclick="dsDrawerTravClick(' + i + ')"' : '') +
        '>' +
        '<div class="ds-drawer-trav-circle">' + dsGetTravIcon(node.type) + '</div>' +
        '<span class="ds-drawer-trav-label">' + node.type + '</span>' +
        '</div>';
    });
    container.innerHTML = html;
  }

  // Click on traversal node at index → truncate everything below it
  window.dsDrawerTravClick = function(index) {
    if (index >= _travStack.length - 1) return; // already current
    _travStack = _travStack.slice(0, index + 1);
    dsDrawerBuildTraversal();
    // Update drawer header to reflect new current entity
    var current = _travStack[_travStack.length - 1];
    var titleEl = document.getElementById('ds-drawer-title');
    if (titleEl) titleEl.textContent = current.label;
    var typeEl = document.getElementById('ds-drawer-type-badge');
    if (typeEl) typeEl.textContent = current.type;
  };

  // Push a new entity onto the traversal stack (called from graph node clicks)
  window.dsDrawerPushTrav = function(label, type) {
    // Don't push duplicate of current top
    if (_travStack.length > 0) {
      var top = _travStack[_travStack.length - 1];
      if (top.label === label && top.type === type) return;
    }
    _travStack.push({ label: label, type: type });
    dsDrawerBuildTraversal();
    // Update drawer header
    var titleEl = document.getElementById('ds-drawer-title');
    if (titleEl) titleEl.textContent = label;
    var typeEl = document.getElementById('ds-drawer-type-badge');
    if (typeEl) typeEl.textContent = type;
    // Scroll sidebar to bottom so new node is visible
    var sidebar = document.getElementById('ds-drawer-sidebar');
    if (sidebar) sidebar.scrollTop = sidebar.scrollHeight;
  };

  // ── Entity relationship graph — zoom/pan state ──
  var _graphScale = 1, _graphTx = 0, _graphTy = 0;
  var _graphDragging = false, _graphDragStart = null;
  var _graphDragMoved = false; // true if pointer moved while dragging (suppress node click)

  function dsGraphApplyTransform() {
    var g = document.getElementById('ds-drawer-graph-group');
    if (g) g.setAttribute('transform', 'translate('+_graphTx+','+_graphTy+') scale('+_graphScale+')');
  }

  window.dsGraphZoom = function(delta) {
    var canvas = document.getElementById('ds-drawer-graph-canvas');
    if (!canvas) return;
    var W = canvas.offsetWidth, H = canvas.offsetHeight;
    var newScale = Math.min(4, Math.max(0.3, _graphScale + delta));
    // Zoom toward center of canvas
    var originX = W / 2, originY = H / 2;
    _graphTx = originX - (originX - _graphTx) * (newScale / _graphScale);
    _graphTy = originY - (originY - _graphTy) * (newScale / _graphScale);
    _graphScale = newScale;
    dsGraphApplyTransform();
  };

  window.dsGraphReset = function() {
    _graphScale = 1; _graphTx = 0; _graphTy = 0;
    dsGraphApplyTransform();
  };

  function dsGraphInitInteraction() {
    var canvas = document.getElementById('ds-drawer-graph-canvas');
    if (!canvas || canvas._graphInteractionBound) return;
    canvas._graphInteractionBound = true;

    // Mouse wheel zoom
    canvas.addEventListener('wheel', function(e) {
      e.preventDefault();
      var rect = canvas.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;
      var delta = e.deltaY < 0 ? 0.15 : -0.15;
      var newScale = Math.min(4, Math.max(0.3, _graphScale + delta));
      _graphTx = mx - (mx - _graphTx) * (newScale / _graphScale);
      _graphTy = my - (my - _graphTy) * (newScale / _graphScale);
      _graphScale = newScale;
      dsGraphApplyTransform();
    }, { passive: false });

    // Drag to pan
    canvas.addEventListener('mousedown', function(e) {
      if (e.button !== 0) return;
      _graphDragging = true;
      _graphDragMoved = false;
      _graphDragStart = { x: e.clientX - _graphTx, y: e.clientY - _graphTy };
      canvas.classList.add('dragging');
    });
    window.addEventListener('mousemove', function(e) {
      if (!_graphDragging || !_graphDragStart) return;
      _graphDragMoved = true;
      _graphTx = e.clientX - _graphDragStart.x;
      _graphTy = e.clientY - _graphDragStart.y;
      dsGraphApplyTransform();
    });
    window.addEventListener('mouseup', function() {
      if (!_graphDragging) return;
      _graphDragging = false;
      _graphDragStart = null;
      var canvas2 = document.getElementById('ds-drawer-graph-canvas');
      if (canvas2) canvas2.classList.remove('dragging');
      // Reset _graphDragMoved after a tick so click handlers can check it
      setTimeout(function() { _graphDragMoved = false; }, 10);
    });

    // Touch pan
    var _touchStart = null;
    canvas.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        _touchStart = { x: e.touches[0].clientX - _graphTx, y: e.touches[0].clientY - _graphTy };
      }
    }, { passive: true });
    canvas.addEventListener('touchmove', function(e) {
      if (e.touches.length === 1 && _touchStart) {
        e.preventDefault();
        _graphTx = e.touches[0].clientX - _touchStart.x;
        _graphTy = e.touches[0].clientY - _touchStart.y;
        dsGraphApplyTransform();
      }
    }, { passive: false });
    canvas.addEventListener('touchend', function() { _touchStart = null; }, { passive: true });
  }

  // ── Entity relationship graph — horizontal left-to-right flow ──
  function dsDrawerDrawGraph() {
    var svg    = document.getElementById('ds-drawer-graph-svg');
    var canvas = document.getElementById('ds-drawer-graph-canvas');
    var g      = document.getElementById('ds-drawer-graph-group');
    if (!svg || !canvas || !g) return;

    var W = canvas.offsetWidth || 700;
    var H = 300;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    g.innerHTML = '';

    _graphScale = 1; _graphTx = 0; _graphTy = 0;
    dsGraphApplyTransform();

    var NS = 'http://www.w3.org/2000/svg';
    function mkEl(tag) { return document.createElementNS(NS, tag); }

    // ── Icon paths (24×24 viewBox) ──
    var ICONS = {
      globe:   'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 0v20M2 12h20M12 2C8.5 6.5 8.5 17.5 12 22M12 2c3.5 4.5 3.5 15.5 0 20',
      grid:    'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
      monitor: 'M20 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 21h8M12 17v4',
      server:  'M4 2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 14h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2zM6 7h.01M6 18h.01',
      person:  'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
      shield:  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4M12 16h.01',
      search:  'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
      network: 'M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18',
      vm:      'M20 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8 21h8M12 17v4M7 8h10M7 12h6',
    };

    // ── Entity type → style map ──
    var TYPE_STYLE = {
      Host:          { icon: 'monitor', fill: '#C4728A', ring: 'rgba(196,114,138,0.25)' },
      Server:        { icon: 'server',  fill: '#C4728A', ring: 'rgba(196,114,138,0.25)' },
      Workstation:   { icon: 'monitor', fill: '#C4728A', ring: 'rgba(196,114,138,0.25)' },
      Network:       { icon: 'network', fill: '#5A8FC4', ring: 'rgba(90,143,196,0.25)'  },
      Scanner:       { icon: 'search',  fill: '#8B82C4', ring: 'rgba(139,130,196,0.25)' },
      Person:        { icon: 'person',  fill: '#7A95B8', ring: 'rgba(122,149,184,0.25)' },
      Identity:      { icon: 'person',  fill: '#7A95B8', ring: 'rgba(122,149,184,0.25)' },
      Account:       { icon: 'person',  fill: '#7A95B8', ring: 'rgba(122,149,184,0.25)' },
      Vulnerability: { icon: 'shield',  fill: '#C4728A', ring: 'rgba(196,114,138,0.25)' },
      Findings:      { icon: 'search',  fill: '#9B8EC4', ring: 'rgba(155,142,196,0.25)' },
      Application:   { icon: 'grid',    fill: '#B09060', ring: 'rgba(176,144,96,0.25)'  },
    };

    // ── Helpers ──
    function drawIcon(parent, iconKey, cx, cy, nodeR) {
      var d = ICONS[iconKey] || ICONS.monitor;
      var iconSize = nodeR * 1.05;
      var s = iconSize / 12;
      var grp = mkEl('g');
      grp.setAttribute('transform', 'translate('+(cx-12*s)+','+(cy-12*s)+') scale('+s+')');
      grp.style.pointerEvents = 'none';
      var p = mkEl('path');
      p.setAttribute('d', d);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', 'rgba(255,255,255,0.88)');
      p.setAttribute('stroke-width', String(1.8 / s));
      p.setAttribute('stroke-linecap', 'round');
      p.setAttribute('stroke-linejoin', 'round');
      grp.appendChild(p);
      parent.appendChild(grp);
    }

    function drawNode(parent, cx, cy, r, style, typeLabel, instanceLabel) {
      // Outer glow ring
      var ring = mkEl('circle');
      ring.setAttribute('cx', cx); ring.setAttribute('cy', cy);
      ring.setAttribute('r', r + 5);
      ring.setAttribute('fill', style.ring || 'rgba(99,96,216,0.15)');
      ring.setAttribute('stroke', 'none');
      parent.appendChild(ring);
      // Main circle
      var circ = mkEl('circle');
      circ.setAttribute('cx', cx); circ.setAttribute('cy', cy);
      circ.setAttribute('r', r);
      circ.setAttribute('fill', style.fill);
      circ.setAttribute('stroke', 'none');
      parent.appendChild(circ);
      // Icon
      drawIcon(parent, style.icon, cx, cy, r * 0.52);
      // Type label below
      var lbl = mkEl('text');
      lbl.setAttribute('x', cx); lbl.setAttribute('y', cy + r + 14);
      lbl.setAttribute('text-anchor', 'middle');
      lbl.setAttribute('font-size', '10');
      lbl.setAttribute('font-weight', '600');
      lbl.setAttribute('fill', 'var(--shell-text)');
      lbl.setAttribute('font-family', 'Inter,sans-serif');
      lbl.style.pointerEvents = 'none';
      lbl.textContent = typeLabel;
      parent.appendChild(lbl);
      // Instance sub-label
      if (instanceLabel) {
        var sub = mkEl('text');
        sub.setAttribute('x', cx); sub.setAttribute('y', cy + r + 26);
        sub.setAttribute('text-anchor', 'middle');
        sub.setAttribute('font-size', '8.5');
        sub.setAttribute('fill', 'var(--shell-text-muted)');
        sub.setAttribute('font-family', 'Inter,sans-serif');
        sub.style.pointerEvents = 'none';
        // Truncate long hostnames
        var short = instanceLabel.length > 22 ? instanceLabel.substring(0, 20) + '…' : instanceLabel;
        sub.textContent = short;
        parent.appendChild(sub);
      }
      return circ;
    }

    function drawCountBadge(parent, cx, cy, nodeR, count) {
      var badgeR = count > 9 ? 10 : 8;
      var bx = cx + nodeR * 0.6, by = cy - nodeR * 0.6;
      var bc = mkEl('circle');
      bc.setAttribute('cx', bx); bc.setAttribute('cy', by);
      bc.setAttribute('r', badgeR);
      bc.setAttribute('fill', 'var(--card-bg)');
      bc.setAttribute('stroke', 'var(--shell-border)');
      bc.setAttribute('stroke-width', '1');
      parent.appendChild(bc);
      var bt = mkEl('text');
      bt.setAttribute('x', bx); bt.setAttribute('y', by + 3.5);
      bt.setAttribute('text-anchor', 'middle');
      bt.setAttribute('font-size', '8');
      bt.setAttribute('font-weight', '700');
      bt.setAttribute('fill', 'var(--shell-text)');
      bt.setAttribute('font-family', 'Inter,sans-serif');
      bt.style.pointerEvents = 'none';
      bt.textContent = count;
      parent.appendChild(bt);
    }

    function drawCurve(parent, x1, y1, x2, y2, color, sw) {
      var cpx = (x1 + x2) / 2;
      var path = mkEl('path');
      path.setAttribute('d', 'M'+x1+','+y1+' C'+cpx+','+y1+' '+cpx+','+y2+' '+x2+','+y2);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', sw || '1.5');
      path.setAttribute('stroke-linecap', 'round');
      parent.appendChild(path);
    }

    // ── Layout constants ──
    var cy   = H / 2;
    var rL   = 26;  // left-path node radius
    var rC   = 30;  // center (current entity) radius
    var rR   = 22;  // right (related) node radius
    var padL = 48;
    var padR = 72;  // leave room for zoom panel

    // X positions: distribute 3 left-chain nodes across ~55% of width
    var xI  = padL + rL;                      // Internet
    var xA  = padL + rL + (W * 0.18);         // Application Endpoint
    var xC  = padL + rL + (W * 0.36);         // Current entity
    var xR  = W - padR - rR;                  // Right nodes column

    // Current entity data
    var curNode  = _travStack.length ? _travStack[_travStack.length - 1] : { label: 'Entity', type: 'Host' };
    var curStyle = TYPE_STYLE[curNode.type] || TYPE_STYLE.Host;

    // Right-side related nodes
    var rightNodes = [
      { type: 'Person',        label: 'Person',        instance: null,         badge: 1,  color: '#7A95B8', ring: 'rgba(122,149,184,0.22)', line: 'rgba(122,149,184,0.5)',  lw: 1.5 },
      { type: 'Account',       label: 'Account',       instance: null,         badge: 2,  color: '#7A95B8', ring: 'rgba(122,149,184,0.22)', line: 'rgba(122,149,184,0.5)',  lw: 1.8 },
      { type: 'Vulnerability', label: 'Vulnerability', instance: null,         badge: 8,  color: '#C4728A', ring: 'rgba(196,114,138,0.22)', line: 'rgba(196,114,138,0.55)', lw: 2.0 },
      { type: 'Findings',      label: 'Findings',      instance: null,         badge: 43, color: '#9B8EC4', ring: 'rgba(155,142,196,0.22)', line: 'rgba(155,142,196,0.55)', lw: 2.2 },
    ];

    // Vertical spread for right nodes
    var spread = H * 0.70;
    var rTop   = (H - spread) / 2;
    var rStep  = spread / (rightNodes.length - 1);
    rightNodes.forEach(function(n, i) { n.cy = rTop + i * rStep; });

    // ── 1. Draw connection curves (behind everything) ──
    // Left chain: Internet → App Endpoint → Current entity
    drawCurve(g, xI + rL, cy, xA - rL, cy, 'rgba(140,160,200,0.45)', 2);
    drawCurve(g, xA + rL, cy, xC - rC, cy, 'rgba(140,160,200,0.45)', 2);
    // Fan-out: current entity → each right node
    rightNodes.forEach(function(n) {
      drawCurve(g, xC + rC, cy, xR - rR, n.cy, n.line, n.lw);
    });

    // ── 2. Draw static left-chain nodes ──
    drawNode(g, xI, cy, rL,
      { fill: '#4A6B42', ring: 'rgba(74,107,66,0.2)', icon: 'globe' },
      'Internet', null);
    drawNode(g, xA, cy, rL,
      { fill: '#B09060', ring: 'rgba(176,144,96,0.2)', icon: 'grid' },
      'Application', 'Endpoint');

    // ── 3. Draw current entity (center) ──
    drawNode(g, xC, cy, rC, curStyle, curNode.type, curNode.label);

    // ── 4. Draw right related nodes (clickable) ──
    rightNodes.forEach(function(n) {
      var nStyle = { fill: n.color, ring: n.ring, icon: (TYPE_STYLE[n.type] || {}).icon || 'search' };

      // Invisible large hit area (drawn first, behind everything)
      var hit = mkEl('circle');
      hit.setAttribute('cx', xR); hit.setAttribute('cy', n.cy);
      hit.setAttribute('r', rR + 10);
      hit.setAttribute('fill', 'transparent');
      hit.style.cursor = 'pointer';
      g.appendChild(hit);

      // Visual node
      drawNode(g, xR, n.cy, rR, nStyle, n.label, n.instance);

      // Count badge
      if (n.badge !== null) drawCountBadge(g, xR, n.cy, rR, n.badge);

      // Hover: brighten ring
      function hoverOn() {
        hit.setAttribute('fill', n.ring);
      }
      function hoverOff() {
        hit.setAttribute('fill', 'transparent');
      }
      hit.addEventListener('mouseenter', hoverOn);
      hit.addEventListener('mouseleave', hoverOff);

      // Click → push traversal
      hit.addEventListener('click', function(e) {
        if (_graphDragMoved) return;
        e.stopPropagation();
        dsDrawerPushTrav(n.label + (n.badge > 1 ? ' ×'+n.badge : ''), n.type);
      });
    });

    dsGraphInitInteraction();
  }

  // ── Wire up demo table rows ──
  document.addEventListener('click', function(e) {
    var row = e.target.closest('.drawer-demo-row');
    if (!row) return;
    openDetailDrawer({
      asset: row.dataset.asset,
      type:  row.dataset.type,
      bu:    row.dataset.bu,
      os:    row.dataset.os,
      score: row.dataset.score,
      sev:   row.dataset.sev
    });
  });


})();

/* ══════════════════════════════════════════════════
   FILTER POPUP — ds-fp-* namespace
══════════════════════════════════════════════════ */
(function() {
  // ── Data ──
  var FP_ATTRS = {
    host:          ['Asset Criticality','Business Unit','Compliance','Display Label','Infrastructure Type','Purpose','Score','Type'],
    application:   ['Application Name','Business Unit','Compliance','Environment','Framework','Owner','Risk Level','Status'],
    vulnerability: ['CVSSv3 Score','Category','Exploit Available','First Seen','Last Seen','Patch Available','Severity','State'],
    user:          ['Business Unit','Department','Last Login','Privilege Level','Role','Status'],
    cve:           ['CVE ID','CVSSv3 Score','Exploit Maturity','Published Date','Severity','Vendor']
  };
  var FP_VALS = {
    'Type':               ['Server','Workstation','Mobile','Network','Printer','Scanner','Others'],
    'Infrastructure Type':['On-Premises','Cloud','Hybrid','Container','Virtual Machine'],
    'Asset Criticality':  ['Critical','High','Medium','Low'],
    'Severity':           ['Critical','High','Medium','Low','Informational'],
    'Business Unit':      ['Engineering','Finance','HR','Infrastructure','Legal','Operations','Sales','Security'],
    'Status':             ['Active','Inactive','Decommissioned','Under Review'],
    'Compliance':         ['GDPR','HIPAA','ISO 27001','PCI DSS','SOC 2'],
    'Environment':        ['Development','Production','Staging','Testing'],
    'Purpose':            ['Analytics','Authentication','Database','File Storage','Load Balancer','Web Server'],
    'Privilege Level':    ['Admin','Operator','Read-Only','Super Admin'],
    'Role':               ['Analyst','Developer','Engineer','Manager','Owner'],
    'State':              ['Active','Fixed','Accepted Risk','In Progress'],
    'Exploit Available':  ['Yes','No'],
    'Patch Available':    ['Yes','No'],
    'Exploit Maturity':   ['Functional','High','Proof of Concept','Unproven']
  };

  // ── State ──
  var fp = {
    entity: 'host',
    attr:   null,
    mode:   'include',
    sortAsc: true,
    checked: {},       // key = "entity::attr::val" → bool
    applied: []        // [{entity,attr,values,mode}]
  };

  // ── Open / Close ──
  window.openDsFilterPopup = function() {
    document.getElementById('ds-fp-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    dsFpSelectEntity('host', true);
    setTimeout(dsFpDrawLines, 60);
  };
  window.closeDsFilterPopup = function() {
    document.getElementById('ds-fp-overlay').classList.remove('open');
    document.body.style.overflow = '';
  };
  window.dsFpOverlayClick = function(e) {
    if (e.target === document.getElementById('ds-fp-overlay')) closeDsFilterPopup();
  };
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('ds-fp-overlay').classList.contains('open')) {
      closeDsFilterPopup();
    }
  });

  // ── Entity selection ──
  window.dsFpSelectEntity = function(key, autoAttr) {
    fp.entity = key;
    document.querySelectorAll('.ds-fp-node').forEach(function(n) {
      n.classList.toggle('active', n.dataset.entity === key);
    });
    var label = key.charAt(0).toUpperCase() + key.slice(1);
    document.getElementById('ds-fp-entity-label').textContent = label;
    document.getElementById('ds-fp-attr-search').value = '';
    fp.attr = null;
    dsFpRenderAttrs(FP_ATTRS[key] || []);
    dsFpClearValGrid();
    if (autoAttr !== false && (FP_ATTRS[key] || []).length) {
      dsFpSelectAttr((FP_ATTRS[key] || [])[0]);
    }
  };

  // ── Attribute list ──
  function dsFpRenderAttrs(list) {
    var el = document.getElementById('ds-fp-attr-list');
    el.innerHTML = '';
    if (!list.length) {
      el.innerHTML = '<div style="padding:16px;font-size:12px;color:var(--shell-text-muted);">No attributes found.</div>';
      return;
    }
    list.forEach(function(attr) {
      var row = document.createElement('label');
      row.className = 'ds-fp-attr-opt' + (attr === fp.attr ? ' active' : '');
      row.dataset.attr = attr;
      row.innerHTML = '<input type="radio" name="ds-fp-attr"' + (attr === fp.attr ? ' checked' : '') + '> ' + attr +
        (attr === fp.attr ? '<span class="ds-fp-attr-dot"></span>' : '');
      row.addEventListener('click', function() { dsFpSelectAttr(attr); });
      el.appendChild(row);
    });
  }

  window.dsFpFilterAttrs = function(q) {
    var all = FP_ATTRS[fp.entity] || [];
    dsFpRenderAttrs(q ? all.filter(function(a) { return a.toLowerCase().indexOf(q.toLowerCase()) > -1; }) : all);
  };

  window.dsFpSelectAttr = function(attr) {
    fp.attr = attr;
    document.querySelectorAll('.ds-fp-attr-opt').forEach(function(o) {
      var sel = o.dataset.attr === attr;
      o.classList.toggle('active', sel);
      var r = o.querySelector('input[type="radio"]');
      if (r) r.checked = sel;
      var dot = o.querySelector('.ds-fp-attr-dot');
      if (sel && !dot) { var d = document.createElement('span'); d.className = 'ds-fp-attr-dot'; o.appendChild(d); }
      else if (!sel && dot) dot.remove();
    });
    document.getElementById('ds-fp-val-search').value = '';
    document.getElementById('ds-fp-sel-all').checked = false;
    dsFpRenderVals(dsFpGetVals(attr));
  };

  // ── Values ──
  function dsFpGetVals(attr) {
    return FP_VALS[attr] || ['Value A','Value B','Value C','Value D','Value E','Value F'];
  }

  function dsFpRenderVals(list) {
    var grid = document.getElementById('ds-fp-val-grid');
    grid.innerHTML = '';
    var sorted = fp.sortAsc ? list.slice().sort() : list.slice().sort().reverse();
    sorted.forEach(function(val) {
      var key = fp.entity + '::' + fp.attr + '::' + val;
      var checked = !!fp.checked[key];
      var item = document.createElement('div');
      item.className = 'ds-fp-val-opt' + (checked ? ' checked' : '');
      item.dataset.key = key;
      item.innerHTML = '<div class="ds-fp-val-box">' +
        (checked ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '') +
        '</div><span class="ds-fp-val-name">' + val + '</span>';
      item.addEventListener('click', function() { dsFpToggleVal(key, val, item); });
      grid.appendChild(item);
    });
  }

  function dsFpToggleVal(key, val, item) {
    fp.checked[key] = !fp.checked[key];
    var c = fp.checked[key];
    item.classList.toggle('checked', c);
    item.querySelector('.ds-fp-val-box').innerHTML = c
      ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'
      : '';
    // sync select-all checkbox
    var all = dsFpGetVals(fp.attr);
    var allChecked = all.every(function(v) { return !!fp.checked[fp.entity + '::' + fp.attr + '::' + v]; });
    document.getElementById('ds-fp-sel-all').checked = allChecked;
  }

  function dsFpClearValGrid() {
    var g = document.getElementById('ds-fp-val-grid');
    if (g) g.innerHTML = '<div style="padding:24px 16px;font-size:12px;color:var(--shell-text-muted);">Select an attribute to view values.</div>';
  }

  window.dsFpFilterVals = function(q) {
    if (!fp.attr) return;
    var all = dsFpGetVals(fp.attr);
    dsFpRenderVals(q ? all.filter(function(v) { return v.toLowerCase().indexOf(q.toLowerCase()) > -1; }) : all);
  };

  window.dsFpSelectAll = function(checked) {
    if (!fp.attr) return;
    dsFpGetVals(fp.attr).forEach(function(v) {
      fp.checked[fp.entity + '::' + fp.attr + '::' + v] = checked;
    });
    dsFpRenderVals(dsFpGetVals(fp.attr));
  };

  window.dsFpToggleSort = function() {
    fp.sortAsc = !fp.sortAsc;
    document.getElementById('ds-fp-sort-lbl').textContent = fp.sortAsc ? 'A-Z' : 'Z-A';
    if (fp.attr) dsFpRenderVals(dsFpGetVals(fp.attr));
  };

  window.dsFpSetMode = function(mode) {
    fp.mode = mode;
    document.getElementById('ds-fp-inc').classList.toggle('active', mode === 'include');
    document.getElementById('ds-fp-exc').classList.toggle('active', mode === 'exclude');
  };

  // ── Apply ──
  window.dsFpApply = function() {
    var groups = {};
    Object.keys(fp.checked).forEach(function(key) {
      if (!fp.checked[key]) return;
      var parts = key.split('::');
      var gk = parts[0] + '::' + parts[1];
      if (!groups[gk]) groups[gk] = { entity: parts[0], attr: parts[1], values: [], mode: fp.mode };
      groups[gk].values.push(parts[2]);
    });
    fp.applied = Object.values ? Object.values(groups) : Object.keys(groups).map(function(k) { return groups[k]; });
    dsFpRenderChips();
    closeDsFilterPopup();
    var total = fp.applied.reduce(function(n, g) { return n + g.values.length; }, 0);
    if (total > 0) showToast('success', total + ' filter(s) applied');
  };

  function dsFpRenderChips() {
    var bar = document.getElementById('ds-fp-active-bar');
    var row = document.getElementById('ds-fp-chip-row');
    if (!bar || !row) return;
    row.innerHTML = '';
    if (!fp.applied.length) { bar.classList.add('hidden'); return; }
    bar.classList.remove('hidden');
    fp.applied.forEach(function(g, gi) {
      g.values.forEach(function(val) {
        var chip = document.createElement('div');
        chip.className = 'ds-fp-chip';
        chip.innerHTML = '<span class="ds-fp-chip-key">' + g.attr + ':</span>' +
          '<span class="ds-fp-chip-value">' + val + '</span>' +
          '<button class="ds-fp-chip-x" title="Remove">' +
          '<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
        chip.querySelector('.ds-fp-chip-x').addEventListener('click', function() {
          dsFpRemoveVal(gi, val);
        });
        row.appendChild(chip);
      });
    });
  }

  function dsFpRemoveVal(gi, val) {
    var g = fp.applied[gi];
    if (!g) return;
    fp.checked[g.entity + '::' + g.attr + '::' + val] = false;
    g.values = g.values.filter(function(v) { return v !== val; });
    if (!g.values.length) fp.applied.splice(gi, 1);
    dsFpRenderChips();
  }

  window.dsFpClearAll = function() {
    fp.checked = {};
    fp.applied = [];
    dsFpRenderChips();
    showToast('info', 'All filters cleared');
  };

  // ── SVG connection lines ──
  function dsFpDrawLines() {
    var canvas = document.getElementById('ds-fp-canvas');
    var svg = document.getElementById('ds-fp-svg');
    if (!canvas || !svg) return;
    var cr = canvas.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + cr.width + ' ' + cr.height);
    svg.innerHTML = '';
    var center = document.querySelector('.ds-fp-node[data-entity="host"]');
    if (!center) return;
    var ccr = center.getBoundingClientRect();
    var cx = ccr.left - cr.left + ccr.width / 2;
    var cy = ccr.top  - cr.top  + ccr.height / 2;
    document.querySelectorAll('.ds-fp-node:not([data-entity="host"])').forEach(function(node) {
      var nr = node.getBoundingClientRect();
      var nx = nr.left - cr.left + nr.width / 2;
      var ny = nr.top  - cr.top  + nr.height / 2;
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', nx); line.setAttribute('y2', ny);
      line.setAttribute('stroke', 'var(--ctrl-border)');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('stroke-dasharray', '4 4');
      svg.appendChild(line);
    });
  }
  window.addEventListener('resize', function() {
    if (document.getElementById('ds-fp-overlay').classList.contains('open')) dsFpDrawLines();
  });
})();

// ── Navigator: Mode dropdown ──
(function() {
  var MODE_ICONS = {
    Analysis: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="17" y="13" width="4" height="8"/></svg>',
    Research:  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    Summary:   '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    Compare:   '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="18"/><rect x="14" y="3" width="7" height="18"/></svg>'
  };

  function initNavMode(btn) {
    var dropdown = btn.querySelector('.nav-mode-dropdown');
    var label    = btn.querySelector('.nav-mode-label');
    var icon     = btn.querySelector('.nav-mode-icon');
    if (!dropdown) return;

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('is-open');
    });

    dropdown.querySelectorAll('.nav-mode-option').forEach(function(opt) {
      opt.addEventListener('click', function(e) {
        e.stopPropagation();
        var mode = opt.getAttribute('data-mode');
        label.textContent = mode;
        icon.innerHTML = MODE_ICONS[mode] || '';
        dropdown.querySelectorAll('.nav-mode-option').forEach(function(o) {
          o.classList.toggle('nav-mode-option--active', o === opt);
        });
        dropdown.classList.remove('is-open');
      });
    });
  }

  document.querySelectorAll('[data-nav-mode]').forEach(initNavMode);

  document.addEventListener('click', function() {
    document.querySelectorAll('.nav-mode-dropdown.is-open').forEach(function(d) {
      d.classList.remove('is-open');
    });
  });
})();
