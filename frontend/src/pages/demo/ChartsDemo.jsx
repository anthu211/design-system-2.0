import { useState } from 'react';
import { DonutChartDemo } from '../../components/ui/DonutChart';
import { BarChartDemo } from '../../components/ui/BarChart';
import { HorizontalBarChartDemo } from '../../components/ui/HorizontalBarChart';
import { LineChartDemo } from '../../components/ui/LineChart';

import DonutChart from '../../components/ui/DonutChart';
import BarChart from '../../components/ui/BarChart';
import HorizontalBarChart from '../../components/ui/HorizontalBarChart';
import LineChart from '../../components/ui/LineChart';

function Section({ title, description, children }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#282828', margin: 0 }}>{title}</h2>
        {description && <p style={{ fontSize: '13px', color: '#9f9f9f', marginTop: 4, marginBottom: 0 }}>{description}</p>}
      </div>
      <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 24 }}>
        {children}
      </div>
    </section>
  );
}

// Interactive playground
function ChartPlayground() {
  const [chartType, setChartType] = useState('line');
  const [showArea, setShowArea] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [loading, setLoading] = useState(false);

  const lineData = [
    { month: 'Jan', a: 400, b: 240, c: 180 },
    { month: 'Feb', a: 300, b: 280, c: 220 },
    { month: 'Mar', a: 600, b: 350, c: 290 },
    { month: 'Apr', a: 500, b: 390, c: 310 },
    { month: 'May', a: 700, b: 430, c: 380 },
    { month: 'Jun', a: 650, b: 480, c: 420 },
  ];
  const donutData = [
    { name: 'Alpha', value: 35 },
    { name: 'Beta', value: 25 },
    { name: 'Gamma', value: 20 },
    { name: 'Delta', value: 12 },
    { name: 'Epsilon', value: 8 },
  ];
  const barData = [
    { q: 'Q1', rev: 42, cost: 28 },
    { q: 'Q2', rev: 38, cost: 31 },
    { q: 'Q3', rev: 55, cost: 35 },
    { q: 'Q4', rev: 61, cost: 40 },
  ];
  const series2 = [{ key: 'a', label: 'Series A' }, { key: 'b', label: 'Series B' }];
  const series3 = [...series2, { key: 'c', label: 'Series C' }];
  const barSeries = [{ key: 'rev', label: 'Revenue' }, { key: 'cost', label: 'Cost' }];

  const btnStyle = (active) => ({
    padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
    fontSize: '13px', fontWeight: 500,
    background: active ? '#6760d8' : '#f3f3f3',
    color: active ? '#fff' : '#282828',
    transition: 'all 150ms',
  });

  return (
    <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24, alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#9f9f9f', marginRight: 4 }}>Type:</span>
        {['line', 'bar', 'hbar', 'donut'].map(t => (
          <button key={t} style={btnStyle(chartType === t)} onClick={() => setChartType(t)}>
            {t === 'hbar' ? 'Horizontal' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: 8, fontSize: '13px', color: '#9f9f9f' }}>Options:</span>
        {chartType === 'line' && (
          <button style={btnStyle(showArea)} onClick={() => setShowArea(v => !v)}>Area fill</button>
        )}
        {(chartType === 'bar' || chartType === 'hbar') && (
          <button style={btnStyle(stacked)} onClick={() => setStacked(v => !v)}>Stacked</button>
        )}
        <button style={btnStyle(loading)} onClick={() => setLoading(v => !v)}>Loading</button>
      </div>

      {chartType === 'line' && (
        <LineChart data={lineData} xKey="month" series={series3} area={showArea} smooth loading={loading} height={280} />
      )}
      {chartType === 'bar' && (
        <BarChart data={barData} xKey="q" series={barSeries} stacked={stacked} loading={loading} height={280} />
      )}
      {chartType === 'hbar' && (
        <HorizontalBarChart data={barData} yKey="q" series={barSeries} stacked={stacked} loading={loading} height={280} />
      )}
      {chartType === 'donut' && (
        <DonutChart data={donutData} centerValue="100%" centerLabel="Total" loading={loading} height={280} />
      )}
    </div>
  );
}

export default function ChartsDemo() {
  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#282828', margin: 0 }}>Charts</h1>
          <p style={{ fontSize: '14px', color: '#9f9f9f', marginTop: 6 }}>
            Recharts-based chart components using Prevalent AI design tokens.
          </p>
        </div>

        <Section title="Interactive Playground" description="Toggle chart type and options.">
          <ChartPlayground />
        </Section>

        <Section title="Donut Chart" description="1–5 segments with center label, legend, and loading skeleton.">
          <DonutChartDemo />
        </Section>

        <Section title="Bar Chart" description="Vertical bars, single/multi-series, stacked variant.">
          <BarChartDemo />
        </Section>

        <Section title="Horizontal Bar Chart" description="Horizontal orientation, useful for ranked lists.">
          <HorizontalBarChartDemo />
        </Section>

        <Section title="Line Chart" description="2–4 lines with optional area fill, smooth curves, and dots.">
          <LineChartDemo />
        </Section>
      </div>
    </div>
  );
}
