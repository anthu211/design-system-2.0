import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chartColors, chartTheme } from '../../tokens/design-tokens';

/**
 * DonutChart — 1–5 segments with center label, legend, loading skeleton.
 *
 * @param {Array<{name:string, value:number}>} data
 * @param {string} [centerLabel]
 * @param {string} [centerValue]
 * @param {string} [title]
 * @param {boolean} [loading]
 * @param {string[]} [colors]
 * @param {number} [height=260]
 */
export default function DonutChart({
  data = [],
  centerLabel,
  centerValue,
  title,
  loading = false,
  colors: customColors,
  height = 260,
}) {
  const palette = customColors || chartColors;

  if (loading) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        {title && <div style={{ height: 18, width: 120, background: '#e8e8e8', borderRadius: 4, marginBottom: 12, animation: 'pulse 1.5s ease-in-out infinite' }} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: height * 0.7, height: height * 0.7, borderRadius: '50%', background: 'conic-gradient(#e8e8e8 0deg, #f3f3f3 360deg)', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[80, 60, 70].map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e8e8e8' }} />
                <div style={{ width: w, height: 12, background: '#e8e8e8', borderRadius: 3 }} />
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0];
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
    return (
      <div style={{
        background: chartTheme.tooltip.bg,
        border: `1px solid ${chartTheme.tooltip.border}`,
        borderRadius: chartTheme.tooltip.radius,
        padding: '8px 12px',
        fontSize: '12px',
        color: chartTheme.tooltip.text,
        fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div>{value.toLocaleString()} ({pct}%)</div>
      </div>
    );
  };

  // Custom center label rendered inside SVG via label prop
  const renderCenterLabel = () => {
    if (!centerLabel && !centerValue) return null;
    return ({ cx, cy }) => (
      <g>
        {centerValue && (
          <text x={cx} y={cy - (centerLabel ? 8 : 0)} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '20px', fontWeight: 700, fill: '#282828', fontFamily: 'Inter, sans-serif' }}>
            {centerValue}
          </text>
        )}
        {centerLabel && (
          <text x={cx} y={cy + (centerValue ? 14 : 0)} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: '11px', fill: '#9f9f9f', fontFamily: 'Inter, sans-serif' }}>
            {centerLabel}
          </text>
        )}
      </g>
    );
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      {title && (
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#282828', marginBottom: 8 }}>{title}</div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="75%"
            paddingAngle={data.length > 1 ? 2 : 0}
            dataKey="value"
            labelLine={false}
            label={renderCenterLabel()}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={chartTheme.legend.dotSize}
            formatter={value => (
              <span style={{ fontSize: chartTheme.legend.fontSize, color: chartTheme.legend.text, fontFamily: 'Inter, sans-serif' }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────
export function DonutChartDemo() {
  const data = [
    { name: 'Primary', value: 42 },
    { name: 'Secondary', value: 28 },
    { name: 'Success', value: 18 },
    { name: 'Warning', value: 8 },
    { name: 'Danger', value: 4 },
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
      <div style={{ width: 320 }}>
        <DonutChart data={data} centerValue="100" centerLabel="Total" title="5-Segment Donut" />
      </div>
      <div style={{ width: 320 }}>
        <DonutChart data={data.slice(0, 3)} centerValue="88%" centerLabel="Score" title="3-Segment with Center" />
      </div>
      <div style={{ width: 320 }}>
        <DonutChart data={data} loading title="Loading skeleton" />
      </div>
    </div>
  );
}
