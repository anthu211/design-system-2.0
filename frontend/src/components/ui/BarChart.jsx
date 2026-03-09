import {
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { chartColors, chartTheme } from '../../tokens/design-tokens';

/**
 * BarChart — vertical bars, optional stacked variant.
 *
 * @param {Array<object>} data
 * @param {Array<{key:string,label?:string}>} series — which keys to plot
 * @param {string} xKey — data key for X axis
 * @param {string} [title]
 * @param {boolean} [stacked]
 * @param {boolean} [loading]
 * @param {string[]} [colors]
 * @param {number} [height=260]
 */
export default function BarChart({
  data = [],
  series = [],
  xKey = 'name',
  title,
  stacked = false,
  loading = false,
  colors: customColors,
  height = 260,
}) {
  const palette = customColors || chartColors;

  if (loading) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        {title && <div style={{ height: 14, width: 100, background: '#e8e8e8', borderRadius: 4, marginBottom: 12 }} />}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: height - 40, padding: '0 16px' }}>
          {[60, 90, 40, 75, 55].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: '#e8e8e8', borderRadius: '3px 3px 0 0', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
          ))}
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
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.fill, flexShrink: 0 }} />
            <span>{p.name}: {p.value?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {title && <div style={{ fontSize: '13px', fontWeight: 600, color: '#282828', marginBottom: 8 }}>{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.axis.grid} vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: chartTheme.axis.tick, fontFamily: 'Inter, sans-serif' }}
            axisLine={{ stroke: chartTheme.axis.grid }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: chartTheme.axis.tick, fontFamily: 'Inter, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          {series.length > 1 && (
            <Legend
              iconType="circle" iconSize={chartTheme.legend.dotSize}
              formatter={v => <span style={{ fontSize: '11px', color: chartTheme.legend.text, fontFamily: 'Inter, sans-serif' }}>{v}</span>}
            />
          )}
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label || s.key}
              fill={palette[i % palette.length]}
              stackId={stacked ? 'stack' : undefined}
              radius={stacked ? undefined : [3, 3, 0, 0]}
              maxBarSize={56}
            />
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────
export function BarChartDemo() {
  const data = [
    { month: 'Jan', desktop: 420, mobile: 280 },
    { month: 'Feb', desktop: 380, mobile: 310 },
    { month: 'Mar', desktop: 510, mobile: 390 },
    { month: 'Apr', desktop: 460, mobile: 340 },
    { month: 'May', desktop: 590, mobile: 420 },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
      <div style={{ width: 380 }}>
        <BarChart
          data={data} xKey="month"
          series={[{ key: 'desktop', label: 'Desktop' }]}
          title="Single Series"
        />
      </div>
      <div style={{ width: 380 }}>
        <BarChart
          data={data} xKey="month"
          series={[{ key: 'desktop', label: 'Desktop' }, { key: 'mobile', label: 'Mobile' }]}
          title="Multi-series"
        />
      </div>
      <div style={{ width: 380 }}>
        <BarChart
          data={data} xKey="month"
          series={[{ key: 'desktop', label: 'Desktop' }, { key: 'mobile', label: 'Mobile' }]}
          stacked title="Stacked"
        />
      </div>
    </div>
  );
}
