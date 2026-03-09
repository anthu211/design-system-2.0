import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { chartColors, chartTheme } from '../../tokens/design-tokens';

/**
 * HorizontalBarChart — horizontal orientation.
 *
 * @param {Array<object>} data
 * @param {Array<{key:string,label?:string}>} series
 * @param {string} yKey — data key for Y axis (categories)
 * @param {string} [title]
 * @param {boolean} [stacked]
 * @param {boolean} [loading]
 * @param {string[]} [colors]
 * @param {number} [height=260]
 */
export default function HorizontalBarChart({
  data = [],
  series = [],
  yKey = 'name',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '8px 0' }}>
          {[75, 45, 90, 55, 65].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 48, height: 12, background: '#e8e8e8', borderRadius: 3 }} />
              <div style={{ width: `${w}%`, height: 18, background: '#e8e8e8', borderRadius: '0 3px 3px 0', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
            </div>
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
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
          barCategoryGap="30%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.axis.grid} horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: chartTheme.axis.tick, fontFamily: 'Inter, sans-serif' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            type="category"
            dataKey={yKey}
            width={80}
            tick={{ fontSize: 11, fill: chartTheme.axis.tick, fontFamily: 'Inter, sans-serif' }}
            axisLine={{ stroke: chartTheme.axis.grid }}
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
              radius={stacked ? undefined : [0, 3, 3, 0]}
              maxBarSize={36}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────
export function HorizontalBarChartDemo() {
  const data = [
    { category: 'React', count: 480, prev: 320 },
    { category: 'Vue', count: 290, prev: 240 },
    { category: 'Angular', count: 360, prev: 410 },
    { category: 'Svelte', count: 190, prev: 120 },
    { category: 'Solid', count: 140, prev: 80 },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
      <div style={{ width: 380 }}>
        <HorizontalBarChart
          data={data} yKey="category"
          series={[{ key: 'count', label: 'Current' }]}
          title="Single Series"
        />
      </div>
      <div style={{ width: 380 }}>
        <HorizontalBarChart
          data={data} yKey="category"
          series={[{ key: 'count', label: 'Current' }, { key: 'prev', label: 'Previous' }]}
          title="Comparison"
        />
      </div>
    </div>
  );
}
