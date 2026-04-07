# Prevalent AI — Charts

**HARD RULE:** All charts use inline SVG (or CSS-flex for horizontal bar). NEVER `<canvas>`, Chart.js, D3, Recharts, ECharts. Copy patterns below verbatim — do not invent chart implementations.

---

## Required CSS Classes

Add these to your page `<style>` block. Charts will not render correctly without them.

```css
/* Chart axis labels — used by SVG text elements */
.chart-axis-label { font-size: 10px; fill: var(--shell-text-muted); font-family: inherit; }

/* Bar chart SVG container */
.chart-bar-svg { overflow: visible; display: block; }
.chart-bar-svg rect.chart-bar { transition: opacity 150ms; cursor: pointer; }
.chart-bar-svg rect.chart-bar:hover { opacity: 0.7; }
.chart-bar-svg text { font-family: inherit; }

/* Chart legend */
.chart-legend { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; justify-content: center; }
.chart-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--shell-text-2); }
.chart-legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

/* Horizontal bar chart (CSS-based) */
.css-hbar-chart { display: flex; flex-direction: column; gap: 8px; }
.css-hbar-row { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.css-hbar-label { width: 72px; font-size: 11px; color: var(--shell-text-muted); text-align: right; flex-shrink: 0; }
.css-hbar { height: 22px; border-radius: 0 3px 3px 0; transition: opacity 150ms; }
.css-hbar:hover { opacity: 0.78; }
.css-hbar-val { font-size: 11px; color: var(--shell-text-muted); margin-left: 4px; flex-shrink: 0; }
```

---

## Chart Wrapper

Every chart lives inside a content card:

```html
<div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:4px;padding:20px 24px;">
  <div style="font-size:13px;font-weight:600;color:var(--shell-text);margin-bottom:2px;">Chart Title</div>
  <div style="font-size:11px;color:var(--shell-text-muted);margin-bottom:16px;">Subtitle or date range</div>
  <div id="my-chart" style="width:100%;"></div>
</div>
```

---

## Color Schemes

Two mutually exclusive schemes. Never mix them in one chart.

### RAG — Criticality (`CHART_COLORS_RAG`)
Use **only** for severity/risk data (Critical → High → Medium → Low). Never apply RAG colors to entity or category breakdowns.

| Severity | Hex | Token |
|----------|-----|-------|
| Critical | `#D12329` | `--status-danger` |
| High | `#D98B1D` | `--status-warning` |
| Medium | `#F5B700` | — |
| Low | `#31A56D` | `--status-success` |

```js
var CHART_COLORS_RAG = ['#D12329', '#D98B1D', '#F5B700', '#31A56D'];
buildDonutChart('my-donut', data, 180, CHART_COLORS_RAG);
```

### Normal — Category (`CHART_COLORS_NORMAL`)
Use for entity types, asset categories, tool breakdowns, and any non-severity data. No red, amber, or green.

| Name | Hex |
|------|-----|
| Primary (purple) | `#6760d8` |
| Cyan | `#47adcb` |
| Teal | `#2ea8a8` |
| Indigo | `#5c6bc0` |
| Lavender | `#8F8DDE` |
| Blue | `#3a7fcb` |

```js
var CHART_COLORS_NORMAL = ['#6760d8', '#47adcb', '#2ea8a8', '#5c6bc0', '#8F8DDE', '#3a7fcb'];
buildDonutChart('my-donut', data, 180, CHART_COLORS_NORMAL); // default
```

---

## Shared Visual Tokens (all chart types)

| Element | Value |
|---------|-------|
| Grid lines | `stroke: var(--shell-border)` · `stroke-width: 1` · solid |
| Axis lines | `stroke: var(--shell-border)` · `stroke-width: 1` · solid |
| Axis labels | CSS class `chart-axis-label` → `font-size: 10px` · `fill: var(--shell-text-muted)` |
| Y-axis label | `text-anchor: end` · 6px gap from axis |
| X-axis label | `text-anchor: middle` · 6px below bottom axis |
| Y-tick count | 4–5 ticks — never more than 6 |
| Chart padding | `top: 16` · `right: 16` · `bottom: 36` · `left: 44` |
| Severity series | RAG scheme: Critical `#D12329` · High `#D98B1D` · Medium `#F5B700` · Low `#31A56D` |
| Single-series | Always use accent `#6760d8` for line/bars |

**Init timing:** Always call chart functions inside `setTimeout(initCharts, 60)` so elements have rendered width before SVG is drawn.

```js
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initCharts, 60);
});
function initCharts() {
  // call buildVerticalBarChart, buildLineChart, buildDonutChart here
}
```

---

## Grouped Bar Chart

```
Bar shape:   rx="2" (slightly rounded top corners)
Bar width:   auto — fit to group width, min 6px max 18px, gap 3px between bars
Grid lines:  horizontal only, solid stroke
Hover:       opacity 0.7 via CSS class chart-bar:hover
```

Series colors (in order): `#D12329` · `#D98B1D` · `#6760d8` · `#31A56D`

```html
<div id="vbar-chart" style="width:100%;"></div>

<script>
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
      bars += '<rect x="' + bx + '" y="' + by + '" width="' + barW + '" height="' + bh +
        '" fill="' + (colors[si] || '#6760d8') + '" rx="2" class="chart-bar"' +
        ' data-gi="' + gi + '" data-si="' + si + '"></rect>';
    });
    xLabels += '<text x="' + groupCX + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + grp + '</text>';
  });

  var axes =
    '<line x1="' + pad.left + '" y1="' + pad.top + '" x2="' + pad.left + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>' +
    '<line x1="' + pad.left + '" y1="' + (pad.top + innerH) + '" x2="' + (pad.left + innerW) + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>';

  el.innerHTML = '<svg class="chart-bar-svg" width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '">' +
    gridLines + axes + bars + yLabels + xLabels + '</svg>';

  el.querySelectorAll('.chart-bar').forEach(function(bar) {
    bar.addEventListener('mouseover', function(e) {
      var gi = parseInt(this.dataset.gi), si = parseInt(this.dataset.si);
      var color = colors[si] || '#6760d8';
      showChartTooltip(e, groups[gi], [
        { label: series[si].label, value: series[si].values[gi].toLocaleString(), color: color, active: true }
      ], color);
    });
    bar.addEventListener('mousemove', positionChartTooltip);
    bar.addEventListener('mouseleave', hideChartTooltip);
  });
}

// Usage — call inside setTimeout(initCharts, 60)
buildVerticalBarChart('vbar-chart',
  [
    { label: 'Critical', values: [14, 11, 18, 9, 12, 6] },
    { label: 'High',     values: [17, 18, 15, 13, 11, 10] },
    { label: 'Medium',   values: [20, 16, 19, 14, 13, 11] },
    { label: 'Low',      values: [8,  10, 12, 16, 18, 20] }
  ],
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  ['#D12329', '#D98B1D', '#6760d8', '#31A56D']
);
</script>
```

---

## Line Chart

```
Line:       stroke:#6760d8  stroke-width:2  stroke-linecap:round  stroke-linejoin:round
Area fill:  linearGradient  top stop-opacity:0.25  bottom stop-opacity:0
Dots:       r:5  fill:#6760d8  stroke:#fff (light) or #0E0E0E (dark)  stroke-width:1.5  pointer-events:none
Hover area: r:16  fill:transparent  cursor:pointer  (sits on top of visible dot — Fitts's Law)
Baseline:   always from 0 — do NOT use dynamic yMin
Grid lines: solid (not dashed)
Gradient ID: always use a unique ID per chart instance (Date.now() suffix) to avoid collision
```

```html
<div id="line-chart" style="width:100%;"></div>

<script>
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
  var areaLast  = (pad.left + (data.length - 1) * step).toFixed(1) + ',' + (pad.top + innerH);
  var areaPts   = areaFirst + ' ' + pts + ' ' + areaLast;

  var xLabels = labels.map(function(l, i) {
    var x = (pad.left + i * step).toFixed(1);
    return '<text x="' + x + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + l + '</text>';
  }).join('');

  // Theme-aware dot stroke: white on light, dark on dark
  var dotStroke = document.documentElement.classList.contains('theme-light') ? '#FFFFFF' : '#0E0E0E';

  var pointCoords = data.map(function(v, i) {
    return { x: parseFloat((pad.left + i * step).toFixed(1)), y: parseFloat((pad.top + innerH - (v / yMax) * innerH).toFixed(1)) };
  });
  var visibleDots = pointCoords.map(function(p) {
    return '<circle cx="' + p.x + '" cy="' + p.y + '" r="5" fill="#6760d8" stroke="' + dotStroke + '" stroke-width="1.5" pointer-events="none"></circle>';
  }).join('');
  // Large invisible hit area (r=16) for Fitts's Law compliance
  var overlayDots = pointCoords.map(function(p, i) {
    return '<circle cx="' + p.x + '" cy="' + p.y + '" r="16" fill="transparent" style="cursor:pointer;" data-li="' + i + '"></circle>';
  }).join('');

  var axes =
    '<line x1="' + pad.left + '" y1="' + pad.top + '" x2="' + pad.left + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>' +
    '<line x1="' + pad.left + '" y1="' + (pad.top + innerH) + '" x2="' + (pad.left + innerW) + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>';

  // Unique gradient ID prevents collision when multiple line charts are on one page
  var uid = 'lg' + Date.now();
  el.innerHTML = '<svg width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" style="overflow:visible;">' +
    '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#6760d8" stop-opacity="0.25"/>' +
      '<stop offset="100%" stop-color="#6760d8" stop-opacity="0"/>' +
    '</linearGradient></defs>' +
    gridLines + axes +
    '<polygon points="' + areaPts + '" fill="url(#' + uid + ')"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="#6760d8" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' +
    visibleDots + xLabels + yLabels + overlayDots + '</svg>';

  el.querySelectorAll('circle[data-li]').forEach(function(circle) {
    var i = parseInt(circle.dataset.li);
    circle.addEventListener('mouseover', function() {
      var svgEl = circle.closest('svg');
      var rect = svgEl.getBoundingClientRect();
      var syntheticE = { clientX: rect.left + pointCoords[i].x * (rect.width / W), clientY: rect.top + pointCoords[i].y * (rect.height / H) };
      showChartTooltip(syntheticE, labels[i], [
        { label: 'Value', value: data[i].toLocaleString(), color: '#6760d8', active: true }
      ], '#6760d8');
    });
    circle.addEventListener('mousemove', positionChartTooltip);
    circle.addEventListener('mouseleave', hideChartTooltip);
  });
}

// Usage — call inside setTimeout(initCharts, 60)
buildLineChart('line-chart',
  [24, 38, 30, 52, 47, 61, 55, 73, 68, 82, 76, 90],
  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
);
</script>
```

---

## Multi-Series Line Chart

Use this when you need 2+ lines on the same chart (e.g. Exposure Score vs Critical Findings). **Never invent a custom implementation — use this function.**

```
Same rules as single-series:  stroke-width:2  dots r:5  area fill opacity:0.15 (no area on secondary series)
Colors: series[0] uses #6760d8 · series[1] uses #D12329 · series[2] uses #31A56D
```

```html
<div id="multi-line-chart" style="width:100%;"></div>

<script>
// series = [{label:'Name', values:[...], color:'#6760d8'}, ...]
// labels = ['Oct','Nov','Dec',...]
function buildMultiLineChart(containerId, series, labels) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var W = el.offsetWidth || 700;
  var H = 220;
  var pad = { top: 16, right: 20, bottom: 32, left: 44 };
  var innerW = W - pad.left - pad.right;
  var innerH = H - pad.top - pad.bottom;

  var allVals = [];
  series.forEach(function(s) { s.values.forEach(function(v) { allVals.push(v); }); });
  var yMax = Math.ceil(Math.max.apply(null, allVals) / 10) * 10 || 10;
  var step = innerW / (labels.length - 1);

  var numTicks = 4;
  var gridLines = '', yLabels = '';
  for (var t = 0; t <= numTicks; t++) {
    var val = Math.round((t / numTicks) * yMax);
    var gy = pad.top + innerH - (val / yMax) * innerH;
    gridLines += '<line x1="' + pad.left + '" y1="' + gy + '" x2="' + (pad.left + innerW) + '" y2="' + gy + '" stroke="var(--shell-border)" stroke-width="1"/>';
    yLabels += '<text x="' + (pad.left - 6) + '" y="' + (gy + 4) + '" text-anchor="end" class="chart-axis-label">' + val + '</text>';
  }

  var xLabels = labels.map(function(l, i) {
    return '<text x="' + (pad.left + i * step).toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + l + '</text>';
  }).join('');

  var axes =
    '<line x1="' + pad.left + '" y1="' + pad.top + '" x2="' + pad.left + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>' +
    '<line x1="' + pad.left + '" y1="' + (pad.top + innerH) + '" x2="' + (pad.left + innerW) + '" y2="' + (pad.top + innerH) + '" stroke="var(--shell-border)" stroke-width="1"/>';

  var dotStroke = document.documentElement.classList.contains('theme-light') ? '#FFFFFF' : '#0E0E0E';
  var defs = '<defs>';
  var seriesSvg = '';

  series.forEach(function(s, si) {
    var uid = 'mlg' + Date.now() + si;
    var pts = s.values.map(function(v, i) {
      return (pad.left + i * step).toFixed(1) + ',' + (pad.top + innerH - (v / yMax) * innerH).toFixed(1);
    }).join(' ');
    // Area fill only on first series
    if (si === 0) {
      defs += '<linearGradient id="' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + s.color + '" stop-opacity="0.15"/><stop offset="100%" stop-color="' + s.color + '" stop-opacity="0"/></linearGradient>';
      var areaFirst = pad.left + ',' + (pad.top + innerH);
      var areaLast = (pad.left + (s.values.length - 1) * step).toFixed(1) + ',' + (pad.top + innerH);
      seriesSvg += '<polygon points="' + areaFirst + ' ' + pts + ' ' + areaLast + '" fill="url(#' + uid + ')"/>';
    }
    seriesSvg += '<polyline points="' + pts + '" fill="none" stroke="' + s.color + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
    seriesSvg += s.values.map(function(v, i) {
      var cx = (pad.left + i * step).toFixed(1);
      var cy = (pad.top + innerH - (v / yMax) * innerH).toFixed(1);
      return '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="' + s.color + '" stroke="' + dotStroke + '" stroke-width="1.5" pointer-events="none"></circle>';
    }).join('');
  });
  defs += '</defs>';

  el.innerHTML = '<svg width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" style="overflow:visible;">' +
    defs + gridLines + axes + seriesSvg + yLabels + xLabels + '</svg>';
}

// Usage — call inside setTimeout(initCharts, 60)
buildMultiLineChart('multi-line-chart',
  [
    { label: 'Exposure Score', values: [62,63,65,63,66,67,69,72,74,76,79,81], color: '#6760d8' },
    { label: 'Critical Findings', values: [41,44,47,43,49,51,48,53,55,58,60,63], color: '#D12329' }
  ],
  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
);
</script>
```

---

## Donut Chart

```
stroke-linecap="round"  (mandatory for rounded segment ends)
8° gap between segments (subtract 8 from sweep angle)
strokeWidth = outerRadius × 0.12  (thin ring — NOT 0.28)
Center label: total in font-size:22px font-weight:700, subtitle font-size:11px
```

**Severity color order (always):** Critical `#D12329` → High `#D98B1D` → Medium `#6760d8` → Low `#31A56D`

```html
<div style="display:inline-flex;align-items:center;gap:24px;">
  <div style="position:relative;width:160px;height:160px;">
    <svg id="my-donut" width="160" height="160" viewBox="0 0 160 160" style="overflow:visible;"></svg>
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;">
      <span style="font-size:22px;font-weight:700;color:var(--shell-text);line-height:1;" id="donut-total">332</span>
      <span style="font-size:11px;color:var(--shell-text-muted);margin-top:2px;">total</span>
    </div>
  </div>
  <!-- Legend -->
  <div class="chart-legend" style="flex-direction:column;">
    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#D12329;"></span>Critical</div>
    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#D98B1D;"></span>High</div>
    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#6760d8;"></span>Medium</div>
    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#31A56D;"></span>Low</div>
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

function buildDonutChart(containerId, data, size) {
  size = size || 160;
  var cx = size / 2, cy = size / 2;
  var outerR  = size / 2 - 2;
  var strokeW = outerR * 0.12;     // thin ring — use 0.12, not 0.28
  var r = outerR - strokeW / 2;
  var total = data.reduce(function(s, d) { return s + d.value; }, 0);
  var startAngle = 0;
  var COLORS = ['#D12329', '#D98B1D', '#6760d8', '#31A56D'];

  var paths = data.map(function(d, i) {
    var sweep    = (d.value / total) * 360;
    var endAngle = startAngle + sweep - 8;
    var path     = describeArc(cx, cy, r, startAngle, endAngle);
    startAngle  += sweep;
    return '<path d="' + path + '" fill="none" stroke="' + (COLORS[i % COLORS.length]) + '"' +
      ' stroke-width="' + strokeW + '" stroke-linecap="round" style="cursor:pointer;"' +
      ' data-label="' + d.label + '" data-value="' + d.value + '"' +
      ' data-pct="' + Math.round(d.value / total * 100) + '"' +
      ' data-color="' + COLORS[i % COLORS.length] + '"></path>';
  }).join('');

  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = paths;

  el.querySelectorAll('path').forEach(function(path) {
    path.addEventListener('mouseover', function(e) {
      showChartTooltip(e, path.dataset.label, [
        { label: 'Count', value: path.dataset.value, color: path.dataset.color, active: false },
        { label: 'Share', value: path.dataset.pct + '%', color: path.dataset.color, active: true }
      ], path.dataset.color);
    });
    path.addEventListener('mousemove', positionChartTooltip);
    path.addEventListener('mouseleave', hideChartTooltip);
  });
}

// Usage — call inside setTimeout(initCharts, 60)
buildDonutChart('my-donut', [
  { label: 'Critical', value: 24 },
  { label: 'High',     value: 90 },
  { label: 'Medium',   value: 143 },
  { label: 'Low',      value: 75 }
], 160);
</script>
```

---

## Horizontal Bar Chart (CSS-based)

This chart uses CSS flex — no SVG. Width is set as a percentage of the container.

```html
<div class="css-hbar-chart">
  <div class="css-hbar-row">
    <span class="css-hbar-label">Injection</span>
    <div class="css-hbar" style="width:78%;background:#6760d8;"></div>
    <span class="css-hbar-val">78</span>
  </div>
  <div class="css-hbar-row">
    <span class="css-hbar-label">Auth</span>
    <div class="css-hbar" style="width:62%;background:#D98B1D;"></div>
    <span class="css-hbar-val">62</span>
  </div>
  <div class="css-hbar-row">
    <span class="css-hbar-label">XSS</span>
    <div class="css-hbar" style="width:55%;background:#31A56D;"></div>
    <span class="css-hbar-val">55</span>
  </div>
  <div class="css-hbar-row">
    <span class="css-hbar-label">CSRF</span>
    <div class="css-hbar" style="width:41%;background:#D98B1D;"></div>
    <span class="css-hbar-val">41</span>
  </div>
</div>

<script>
// Wire tooltips to horizontal bar rows — call inside initCharts()
document.querySelectorAll('.css-hbar-row').forEach(function(row) {
  var bar    = row.querySelector('.css-hbar');
  var labelEl = row.querySelector('.css-hbar-label');
  var valEl   = row.querySelector('.css-hbar-val');
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
</script>
```

---

## Chart Legend

Use alongside any chart to explain series colors:

```html
<div class="chart-legend">
  <div class="chart-legend-item">
    <span class="chart-legend-dot" style="background:#D12329;"></span>Critical
  </div>
  <div class="chart-legend-item">
    <span class="chart-legend-dot" style="background:#D98B1D;"></span>High
  </div>
  <div class="chart-legend-item">
    <span class="chart-legend-dot" style="background:#6760d8;"></span>Medium
  </div>
  <div class="chart-legend-item">
    <span class="chart-legend-dot" style="background:#31A56D;"></span>Low
  </div>
</div>
```

---

## Stacked Horizontal Bar Chart

Shows how categories break down by severity as a percentage. Bars are stacked left (Critical) → right (Low), x-axis is 0–100%.

```html
<!-- Wrapper card -->
<div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:4px;padding:20px 24px;">
  <div style="font-size:13px;font-weight:600;color:var(--shell-text);margin-bottom:16px;">Asset Criticality by Attack Surface</div>
  <div id="stacked-bar-1"></div>
  <div class="chart-legend" style="margin-top:16px;">
    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#d12329;"></span>Critical</div>
    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#e15252;"></span>High</div>
    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#d98b1d;"></span>Medium</div>
    <div class="chart-legend-item"><span class="chart-legend-dot" style="background:#31a56d;"></span>Low</div>
  </div>
</div>

<script>
function buildStackedBarChart(containerId, rows, xLabel) {
  // rows: [{label, critical, high, medium, low}] — values are % that sum to 100
  var el = document.getElementById(containerId);
  if (!el) return;
  var W  = el.offsetWidth || 560;
  var LW = 80;   // label column width
  var CW = W - LW;
  var BH = 10;   // bar height px
  var RH = 36;   // row height px
  var AH = 24;   // x-axis area height
  var PT = 6;    // top padding
  var H  = PT + rows.length * RH + AH;
  var COLORS = ['#d12329','#e15252','#d98b1d','#31a56d'];
  var KEYS   = ['critical','high','medium','low'];
  var out = '<svg width="100%" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" overflow="visible">';

  // Grid lines + x-axis labels
  [0,20,40,60,80,100].forEach(function(p) {
    var gx = LW + (p / 100) * CW;
    out += '<line x1="' + gx + '" y1="' + PT + '" x2="' + gx + '" y2="' + (H - AH) + '" stroke="var(--card-border,#e6e6e6)" stroke-width="1"/>';
    out += '<text x="' + gx + '" y="' + (H - 6) + '" text-anchor="middle" class="chart-axis-label">' + (p === 0 ? '0' : p + '%') + '</text>';
  });
  // Baseline
  out += '<line x1="' + LW + '" y1="' + (H - AH) + '" x2="' + W + '" y2="' + (H - AH) + '" stroke="var(--card-border,#e6e6e6)" stroke-width="1"/>';

  // Rows
  rows.forEach(function(row, ri) {
    var by = PT + ri * RH + (RH - BH) / 2;
    var cy = PT + ri * RH + RH / 2;
    // Label — support \n for wrapping
    var lines = row.label.split('\n');
    if (lines.length === 1) {
      out += '<text x="' + (LW - 6) + '" y="' + (cy + 4) + '" text-anchor="end" class="chart-axis-label">' + row.label + '</text>';
    } else {
      var ly = cy - (lines.length - 1) * 7;
      lines.forEach(function(line, li) {
        out += '<text x="' + (LW - 6) + '" y="' + (ly + li * 13) + '" text-anchor="end" class="chart-axis-label">' + line + '</text>';
      });
    }
    // Background track
    out += '<rect x="' + LW + '" y="' + by + '" width="' + CW + '" height="' + BH + '" fill="#f5f5f5" rx="3"/>';
    // Stacked segments
    var xo = 0;
    KEYS.forEach(function(k, ki) {
      var v = +row[k] || 0;
      if (v <= 0) return;
      var sw = (v / 100) * CW;
      out += '<rect x="' + (LW + xo) + '" y="' + by + '" width="' + sw + '" height="' + BH + '" fill="' + COLORS[ki] + '" rx="2"/>';
      // Cancel left-side radius on non-first segments
      if (xo > 0) out += '<rect x="' + (LW + xo) + '" y="' + by + '" width="3" height="' + BH + '" fill="' + COLORS[ki] + '"/>';
      // Cancel right-side radius if another segment follows
      if (ki < KEYS.length - 1 && (+row[KEYS[ki + 1]] || 0) > 0)
        out += '<rect x="' + (LW + xo + sw - 3) + '" y="' + by + '" width="3" height="' + BH + '" fill="' + COLORS[ki] + '"/>';
      xo += sw;
    });
    // Tooltip overlay per row
    out += '<rect x="' + LW + '" y="' + by + '" width="' + CW + '" height="' + BH + '" fill="transparent" style="cursor:pointer;"' +
      ' data-label="' + row.label.replace('\n',' ') + '"' +
      ' data-critical="' + (row.critical||0) + '" data-high="' + (row.high||0) + '"' +
      ' data-medium="' + (row.medium||0) + '" data-low="' + (row.low||0) + '"/>';
  });

  // X-axis label
  if (xLabel) out += '<text x="' + ((LW + W) / 2) + '" y="' + (H + 4) + '" text-anchor="middle" class="chart-axis-label">' + xLabel + '</text>';

  out += '</svg>';
  el.innerHTML = out;

  // Wire tooltips
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

buildStackedBarChart('stacked-bar-1', [
  { label: 'Device',   critical: 37, high: 6,  medium: 19, low: 38 },
  { label: 'Cloud',    critical: 9,  high: 8,  medium: 47, low: 36 },
  { label: 'Identity', critical: 3,  high: 1,  medium: 2,  low: 94 }
], '% of Asset Count');
</script>
```

**Multi-line labels:** use `\n` in the label string — e.g. `{ label: 'Software\nVulnerability', critical:37, ... }`

**Severity colors (always use these):**
| Severity | Color |
|----------|-------|
| Critical | `#d12329` |
| High | `#e15252` |
| Medium | `#d98b1d` |
| Low | `#31a56d` |

---

## Chart Tooltip

Place **once** at the end of `<body>`. Wire to every interactive chart element.

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

**Tooltip rules:**
- Border + dot color must match the hovered series color
- Hovered series row: `font-weight:700`, value `color:<series-color>`
- Tooltip is mandatory on all chart hovers — never skip it

---

## Donut + Legend with Values

Combines a donut arc chart with a structured legend table. Use for part-to-whole breakdowns with entity context (asset types, categories). Always use **Normal** color scheme — never RAG for entity breakdowns.

**Layout:** donut centered above, legend table full-width below.  
**Percentages <1%:** display as `<1%`, never `0%`.  
**Max rows:** 6 — group smaller items into "Others".

### Required CSS

```css
.chart-legend-combo { display:flex; flex-direction:column; align-items:center; gap:20px; padding:8px 0; }
.chart-legend-combo-donut { display:flex; justify-content:center; }
.chart-legend-table { width:100%; max-width:480px; display:flex; flex-direction:column; }
.chart-legend-row { display:grid; grid-template-columns:28px 1fr auto auto; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--card-border); }
.chart-legend-row:last-child { border-bottom:none; }
.chart-legend-icon { width:28px; height:28px; border-radius:6px; display:flex; align-items:center; justify-content:center; }
.chart-legend-name { font-size:13px; font-weight:500; color:var(--shell-text); }
.chart-legend-count { font-size:12px; color:var(--shell-text-muted); font-variant-numeric:tabular-nums; }
.chart-legend-pct { font-size:13px; font-weight:700; color:var(--shell-text); min-width:36px; text-align:right; font-variant-numeric:tabular-nums; }
```

### JS Functions

```js
function hexToRgba(hex, alpha) {
  var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return 'rgba('+r+','+g+','+b+','+alpha+')';
}

function buildLegendTable(containerId, data) {
  var el = document.getElementById(containerId); if (!el) return;
  var total = data.reduce(function(s,d){ return s+d.value; }, 0);
  el.innerHTML = data.map(function(d) {
    var pct = total > 0 ? (d.value/total*100) : 0;
    var pctStr = pct < 1 ? '<1%' : Math.round(pct)+'%';
    return '<div class="chart-legend-row">'+
      '<div class="chart-legend-icon" style="background:'+hexToRgba(d.color,0.12)+';color:'+d.color+';">'+
        (d.icon||'')+
      '</div>'+
      '<span class="chart-legend-name">'+d.label+'</span>'+
      '<span class="chart-legend-count">'+d.value.toLocaleString()+'</span>'+
      '<span class="chart-legend-pct">'+pctStr+'</span>'+
    '</div>';
  }).join('');
}
```

### Usage

```html
<div class="chart-legend-combo">
  <div class="chart-legend-combo-donut">
    <div style="position:relative;display:inline-block;">
      <div id="donut-legend-1"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;pointer-events:none;">
        <div style="font-size:10px;color:var(--shell-text-muted);">Total</div>
        <div style="font-size:18px;font-weight:700;color:var(--shell-text);">3.28M</div>
      </div>
    </div>
  </div>
  <div class="chart-legend-table" id="legend-table-1"></div>
</div>

<script>
var data = [
  { label:'Workstation', value:1730006, color:'#6760d8', icon:'<!-- SVG -->' },
  { label:'Server',      value:1425134, color:'#47adcb', icon:'<!-- SVG -->' },
  { label:'Network',     value:44564,   color:'#2ea8a8', icon:'<!-- SVG -->' },
  { label:'Mobile',      value:19264,   color:'#5c6bc0', icon:'<!-- SVG -->' },
  { label:'Others',      value:68000,   color:'#8F8DDE', icon:'<!-- SVG -->' }
];
buildDonutChart('donut-legend-1', data, 160, CHART_COLORS_NORMAL);
buildLegendTable('legend-table-1', data);
</script>
```
