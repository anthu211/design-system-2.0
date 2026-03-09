import {
  LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { chartColors, chartTheme } from '../../tokens/design-tokens';

/**
 * LineChart — 2–4 lines with optional area fill and dots.
 *
 * @param {Array<object>} data
 * @param {Array<{key:string,label?:string}>} series
 * @param {string} xKey
 * @param {string} [title]
 * @param {boolean} [area] — fill area under lines
 * @param {boolean} [smooth] — curved lines
 * @param {boolean} [dots] — show dots on data points
 * @param {boolean} [loading]
 * @param {string[]} [colors]
 * @param {number} [height=260]
 */
export default function LineChart({
  data = [],
  series = [],
  xKey = 'name',
  title,
  area = false,
  smooth = true,
  dots = false,
  loading = false,
  colors: customColors,
  height = 260,
}) {
  const palette = customColors || chartColors;
  const curveType = smooth ? 'monotone' : 'linear';

  if (loading) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        {title && <div style={{ height: 14, width: 100, background: '#e8e8e8', borderRadius: 4, marginBottom: 12 }} />}
        <div style={{ position: 'relative', height: height - 40 }}>
          <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M0 150 Q50 100 100 120 Q150 140 200 80 Q250 20 300 60 Q350 100 400 40"
              fill="none" stroke="#e8e8e8" strokeWidth="2" />
          </svg>
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{
        background: chartTheme.tooltip.bg, border: `1px solid ${chartTheme.tooltip.border}`,
        borderRadius: chartTheme.tooltip.radius, padding: '8px 12px',
        fontSize: '12px', color: chartTheme.tooltip.text, fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
            <span>{p.name}: {p.value?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  const dotProps = dots
    ? { dot: { r: 3, strokeWidth: 2 }, activeDot: { r: 5 } }
    : { dot: false, activeDot: { r: 4 } };

  const sharedAxisProps = {
    xAxis: (
      <XAxis
        dataKey={xKey}
        tick={{ fontSize: 11, fill: chartTheme.axis.tick, fontFamily: 'Inter, sans-serif' }}
        axisLine={{ stroke: chartTheme.axis.grid }}
        tickLine={false}
      />
    ),
    yAxis: (
      <YAxis
        tick={{ fontSize: 11, fill: chartTheme.axis.tick, fontFamily: 'Inter, sans-serif' }}
        axisLine={false}
        tickLine={false}
      />
    ),
    grid: <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.axis.grid} vertical={false} />,
    tooltip: <Tooltip content={<CustomTooltip />} />,
    legend: series.length > 1 ? (
      <Legend
        iconType="circle" iconSize={chartTheme.legend.dotSize}
        formatter={v => <span style={{ fontSize: '11px', color: chartTheme.legend.text, fontFamily: 'Inter, sans-serif' }}>{v}</span>}
      />
    ) : null,
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {title && <div style={{ fontSize: '13px', fontWeight: 600, color: '#282828', marginBottom: 8 }}>{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        {area ? (
          <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            {sharedAxisProps.grid}
            {sharedAxisProps.xAxis}
            {sharedAxisProps.yAxis}
            {sharedAxisProps.tooltip}
            {sharedAxisProps.legend}
            {series.map((s, i) => (
              <Area
                key={s.key}
                type={curveType}
                dataKey={s.key}
                name={s.label || s.key}
                stroke={palette[i % palette.length]}
                fill={palette[i % palette.length]}
                fillOpacity={0.12}
                strokeWidth={2}
                {...dotProps}
              />
            ))}
          </AreaChart>
        ) : (
          <ReLineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
            {sharedAxisProps.grid}
            {sharedAxisProps.xAxis}
            {sharedAxisProps.yAxis}
            {sharedAxisProps.tooltip}
            {sharedAxisProps.legend}
            {series.map((s, i) => (
              <Line
                key={s.key}
                type={curveType}
                dataKey={s.key}
                name={s.label || s.key}
                stroke={palette[i % palette.length]}
                strokeWidth={2}
                {...dotProps}
              />
            ))}
          </ReLineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────
export function LineChartDemo() {
  const data = [
    { week: 'W1', views: 420, sessions: 280, conversions: 38 },
    { week: 'W2', views: 380, sessions: 310, conversions: 42 },
    { week: 'W3', views: 510, sessions: 390, conversions: 55 },
    { week: 'W4', views: 460, sessions: 340, conversions: 49 },
    { week: 'W5', views: 590, sessions: 420, conversions: 63 },
    { week: 'W6', views: 540, sessions: 480, conversions: 71 },
  ];
  const series2 = [
    { key: 'views', label: 'Views' },
    { key: 'sessions', label: 'Sessions' },
  ];
  const series3 = [
    { key: 'views', label: 'Views' },
    { key: 'sessions', label: 'Sessions' },
    { key: 'conversions', label: 'Conversions' },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
      <div style={{ width: 380 }}>
        <LineChart data={data} xKey="week" series={series2} title="2-line smooth" smooth />
      </div>
      <div style={{ width: 380 }}>
        <LineChart data={data} xKey="week" series={series3} title="3-line with dots" dots />
      </div>
      <div style={{ width: 380 }}>
        <LineChart data={data} xKey="week" series={series2} title="Area fill" area smooth />
      </div>
    </div>
  );
}
