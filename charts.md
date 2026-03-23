# Prevalent AI — Charts

**Implementation rule:** All charts use inline SVG. Never use `<canvas>`, Chart.js, D3, or any external library.

Hosted at: `https://anthu211.github.io/design-system-2.0/`

---

## Chart Wrapper

Every chart lives inside a content card:
```html
<div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:12px;padding:20px 24px;">
  <div style="font-size:13px;font-weight:600;color:var(--shell-text);margin-bottom:2px;">Chart Title</div>
  <div style="font-size:11px;color:var(--shell-text-muted);margin-bottom:16px;">Subtitle or date range</div>
  <div id="my-chart" style="width:100%;"></div>
</div>
```

---

## Shared Visual Tokens (all chart types)

| Element | Value |
|---------|-------|
| Grid lines | `stroke: var(--shell-border)` · `stroke-width: 1` · `stroke-dasharray: 4 4` |
| Axis lines | `stroke: var(--shell-border)` · `stroke-width: 1` · solid |
| Axis labels | `font-size: 11px` · `fill: var(--shell-text-muted)` · `font-family: inherit` |
| Y-axis label | `text-anchor: end` · 6px gap from axis |
| X-axis label | `text-anchor: middle` · 6px below bottom axis |
| Y-tick count | 4–5 ticks — never more than 6 |
| Chart padding | `top: 16` · `right: 20` · `bottom: 36` · `left: 44` |
| Series colors | Critical `#D12329` · High `#D98B1D` · Accent/primary `#6760d8` · Success `#31A56D` |
| Single-series | Always use accent `#6760d8` for line/bars |

---

## Line Chart

```
Line:       stroke:#6760d8  stroke-width:2  stroke-linecap:round  stroke-linejoin:round
Area fill:  linearGradient  top stop-opacity:0.20  bottom stop-opacity:0
Dots:       r:5  fill:#6760d8  stroke:#fff  stroke-width:1.5  pointer-events:none
Hover area: r:16  fill:transparent  cursor:pointer  (sits on top of visible dot)
```

```html
<div id="line-chart" style="width:100%;"></div>
<script>
(function() {
  var el = document.getElementById('line-chart');
  var W = el.offsetWidth || 600, H = 200;
  var pad = { top: 16, right: 20, bottom: 36, left: 44 };
  var iW = W - pad.left - pad.right, iH = H - pad.top - pad.bottom;

  var data   = [912, 888, 871, 854, 848, 831];
  var labels = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  var yMax = Math.ceil(Math.max.apply(null, data) / 10) * 10;
  var yMin = Math.floor(Math.min.apply(null, data) / 10) * 10;
  var yRange = yMax - yMin || 10;
  var step = iW / (data.length - 1);

  function yPos(v) { return pad.top + iH - ((v - yMin) / yRange) * iH; }

  var ticks = 4, grid = '', yLbls = '';
  for (var t = 0; t <= ticks; t++) {
    var v = yMin + (t / ticks) * yRange, gy = yPos(v);
    grid  += '<line x1="' + pad.left + '" y1="' + gy + '" x2="' + (pad.left + iW) + '" y2="' + gy + '" stroke="var(--shell-border)" stroke-width="1" stroke-dasharray="4 4"/>';
    yLbls += '<text x="' + (pad.left - 6) + '" y="' + (gy + 4) + '" text-anchor="end" style="font-size:11px;fill:var(--shell-text-muted);font-family:inherit;">' + Math.round(v) + '</text>';
  }

  var coords = data.map(function(v, i) {
    return { x: parseFloat((pad.left + i * step).toFixed(1)), y: parseFloat(yPos(v).toFixed(1)) };
  });
  var linePts = coords.map(function(p) { return p.x + ',' + p.y; }).join(' ');
  var areaPts = (pad.left + ',') + (pad.top + iH) + ' ' + linePts + ' ' + (pad.left + iW) + ',' + (pad.top + iH);
  var xLbls = labels.map(function(l, i) {
    return '<text x="' + coords[i].x + '" y="' + (H - 6) + '" text-anchor="middle" style="font-size:11px;fill:var(--shell-text-muted);font-family:inherit;">' + l + '</text>';
  }).join('');

  var visDots = coords.map(function(p) {
    return '<circle cx="' + p.x + '" cy="' + p.y + '" r="5" fill="#6760d8" stroke="#ffffff" stroke-width="1.5" pointer-events="none"/>';
  }).join('');
  var hitDots = coords.map(function(p, i) {
    return '<circle cx="' + p.x + '" cy="' + p.y + '" r="16" fill="transparent" style="cursor:pointer;" data-i="' + i + '"/>';
  }).join('');

  var uid = 'lg' + Date.now();
  el.innerHTML =
    '<svg width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" style="overflow:visible;">' +
    '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#6760d8" stop-opacity="0.20"/>' +
      '<stop offset="100%" stop-color="#6760d8" stop-opacity="0"/>' +
    '</linearGradient></defs>' +
    grid +
    '<line x1="' + pad.left + '" y1="' + pad.top + '" x2="' + pad.left + '" y2="' + (pad.top + iH) + '" stroke="var(--shell-border)" stroke-width="1"/>' +
    '<polygon points="' + areaPts + '" fill="url(#' + uid + ')"/>' +
    '<polyline points="' + linePts + '" fill="none" stroke="#6760d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    visDots + xLbls + yLbls + hitDots +
    '</svg>';

  el.querySelectorAll('circle[data-i]').forEach(function(c) {
    var i = parseInt(c.dataset.i);
    c.addEventListener('mouseover', function() {
      var svg = c.closest('svg'), r = svg.getBoundingClientRect();
      var sx = r.width / W, sy = r.height / H;
      showChartTooltip(
        { clientX: r.left + coords[i].x * sx, clientY: r.top + coords[i].y * sy },
        labels[i], [{ label: 'Risk Score', value: data[i].toLocaleString(), color: '#6760d8', active: true }], '#6760d8'
      );
    });
    c.addEventListener('mousemove', positionChartTooltip);
    c.addEventListener('mouseleave', hideChartTooltip);
  });
})();
</script>
```

**Rules:**
- `yMin` must be calculated from actual data — never hardcode 0 as baseline unless data starts near 0
- Use `stroke-dasharray:"4 4"` on grid lines — not solid

---

## Donut Chart

```
stroke-linecap="round"  (mandatory for rounded segment ends)
8° gap between segments (subtract 8 from sweep angle)
strokeWidth = outerRadius × 0.28
Center label: total in font-size:22px font-weight:700, subtitle font-size:11px
```

```html
<div style="position:relative;width:160px;height:160px;">
  <svg id="my-donut" width="160" height="160" viewBox="0 0 160 160" style="overflow:visible;"></svg>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;">
    <span style="font-size:22px;font-weight:700;color:var(--shell-text);line-height:1;">332</span>
    <span style="font-size:11px;color:var(--shell-text-muted);margin-top:2px;">total</span>
  </div>
</div>

<script>
function polarToCartesian(cx, cy, r, angleDeg) {
  var rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  var s = polarToCartesian(cx, cy, r, endAngle);
  var e = polarToCartesian(cx, cy, r, startAngle);
  var largeArc = (endAngle - startAngle) <= 180 ? '0' : '1';
  return 'M ' + s.x + ' ' + s.y + ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 0 ' + e.x + ' ' + e.y;
}

var segments = [
  { label: 'Critical', value: 24,  color: '#D12329' },
  { label: 'High',     value: 90,  color: '#D98B1D' },
  { label: 'Medium',   value: 143, color: '#6760d8' },
  { label: 'Low',      value: 75,  color: '#31A56D' }
];
var size = 160, cx = 80, cy = 80;
var outerR  = size / 2 - 4;
var strokeW = outerR * 0.28;
var r = outerR - strokeW / 2;
var total = segments.reduce(function(s, d) { return s + d.value; }, 0);
var startAngle = 0;
var svgEl = document.getElementById('my-donut');

svgEl.innerHTML = segments.map(function(d) {
  var sweep    = (d.value / total) * 360;
  var endAngle = startAngle + sweep - 8;
  var path     = describeArc(cx, cy, r, startAngle, endAngle);
  startAngle  += sweep;
  return '<path d="' + path + '" fill="none" stroke="' + d.color + '" stroke-width="' + strokeW + '" stroke-linecap="round" style="cursor:pointer;" data-label="' + d.label + '" data-value="' + d.value + '" data-pct="' + Math.round(d.value/total*100) + '" data-color="' + d.color + '"></path>';
}).join('');

svgEl.querySelectorAll('path').forEach(function(path) {
  path.addEventListener('mouseover', function(e) {
    showChartTooltip(e, path.dataset.label, [
      { label: 'Count', value: path.dataset.value, color: path.dataset.color, active: false },
      { label: 'Share', value: path.dataset.pct + '%', color: path.dataset.color, active: true }
    ], path.dataset.color);
  });
  path.addEventListener('mousemove', positionChartTooltip);
  path.addEventListener('mouseleave', hideChartTooltip);
});
</script>
```

**Severity color order (always):** Critical `#D12329` → High `#D98B1D` → Medium `#6760d8` → Low `#31A56D`

---

## Grouped Bar Chart

```
Bar shape:   rx:3 (slightly rounded top corners)
Bar width:   auto — fit to group width, min 6px max 18px
Bar gap:     3px between bars in the same group
Grid lines:  horizontal only, dashed (stroke-dasharray:"4 4")
Hover:       darken fill by 15% OR add stroke:same-color stroke-width:1.5
```

Series colors (in order): `#D12329` · `#D98B1D` · `#6760d8` · `#31A56D`

---

## Horizontal Bar Chart

```
Bar height:  16px
Bar radius:  4px (right end only)
Track:       full-width rect, fill:var(--shell-raised), height:16px, rx:4
Label:       left-aligned, font-size:13px, min-width:120px
Value:       right-aligned, font-size:12px, font-weight:600, color matches fill
Row height:  40px (16px bar + 12px padding top/bottom)
```

---

## Chart Tooltip

Place once at the end of `<body>`. Wire to every interactive chart element.

```html
<div id="chart-tooltip" style="position:fixed;z-index:1000;pointer-events:none;display:none;
     background:var(--card-bg);border-radius:8px;padding:12px 13px;min-width:180px;
     box-shadow:0 4px 16px rgba(0,0,0,0.14);font-family:inherit;"></div>

<script>
var _ctEl = null;
function _ct() { if (!_ctEl) _ctEl = document.getElementById('chart-tooltip'); return _ctEl; }

function showChartTooltip(e, title, rows, borderColor) {
  var el = _ct(); if (!el) return;
  var rowsHtml = rows.map(function(r) {
    var dot = r.color ? '<span style="width:8px;height:8px;border-radius:50%;background:' + r.color + ';flex-shrink:0;display:inline-block;"></span>' : '';
    var fw = r.active ? '700' : '500', vc = r.active ? r.color : 'inherit';
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
</script>
```

**Wire tooltip to any chart element:**
```js
element.addEventListener('mouseover', function(e) {
  showChartTooltip(e,
    'Group Label',
    [{ label: 'Series A', value: '42', color: '#6360D8', active: true }],
    '#6360D8'
  );
});
element.addEventListener('mousemove', positionChartTooltip);
element.addEventListener('mouseleave', hideChartTooltip);
```

**Tooltip rules:**
- Border + dot color must match the hovered series color
- Hovered series row: `font-weight:700`, value `color:<series-color>`
- Tooltip is mandatory on all chart hovers — never skip it
