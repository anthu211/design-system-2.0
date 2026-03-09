import { useState } from 'react';
import Icon from '../../components/ui/Icon';
import { ICON_REGISTRY, ALL_ICONS, CATEGORIES } from '../../utils/icons';

export default function IconsDemo() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedName, setCopiedName] = useState(null);
  const [previewSize, setPreviewSize] = useState(20);

  function copyToClipboard(name) {
    const snippet = `<Icon name="${name}" size={16} />`;
    navigator.clipboard.writeText(snippet).then(() => {
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 1500);
    });
  }

  const pool = activeCategory === 'All'
    ? ALL_ICONS
    : (ICON_REGISTRY[activeCategory] || []);

  const filtered = pool.filter(
    ic => search === '' || ic.label.toLowerCase().includes(search.toLowerCase()) || ic.name.toLowerCase().includes(search.toLowerCase())
  );

  const tabStyle = (active) => ({
    padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
    fontSize: '12px', fontWeight: 500,
    background: active ? '#6760d8' : '#f3f3f3',
    color: active ? '#fff' : '#282828',
    transition: 'all 150ms',
    whiteSpace: 'nowrap',
  });

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif', background: '#fafafa', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#282828', margin: 0 }}>Icons</h1>
          <p style={{ fontSize: '14px', color: '#9f9f9f', marginTop: 6 }}>
            {ALL_ICONS.length} icons from lucide-react, organized by category. Click any icon to copy its usage snippet.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20, alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 280 }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9f9f9f' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search icons…"
              style={{
                width: '100%', boxSizing: 'border-box',
                border: '1px solid #cfcfcf', borderRadius: 6, padding: '7px 10px 7px 30px',
                fontSize: '13px', outline: 'none', fontFamily: 'Inter, sans-serif',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#6760d8'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#cfcfcf'; }}
            />
          </div>

          {/* Size slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '12px', color: '#9f9f9f' }}>Size: {previewSize}px</span>
            <input
              type="range" min="12" max="32" step="2" value={previewSize}
              onChange={e => setPreviewSize(Number(e.target.value))}
              style={{ width: 80 }}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {['All', ...CATEGORIES].map(cat => (
            <button key={cat} style={tabStyle(activeCategory === cat)} onClick={() => setActiveCategory(cat)}>
              {cat}
              <span style={{ marginLeft: 4, opacity: 0.7 }}>
                {cat === 'All' ? ALL_ICONS.length : (ICON_REGISTRY[cat] || []).length}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ fontSize: '12px', color: '#9f9f9f', marginBottom: 12 }}>
          {filtered.length} icon{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Icon grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#9f9f9f', fontSize: '14px' }}>
            No icons found for "{search}"
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
            gap: 8,
          }}>
            {filtered.map(ic => {
              const copied = copiedName === ic.name;
              return (
                <button
                  key={ic.name}
                  onClick={() => copyToClipboard(ic.name)}
                  title={`Click to copy: <Icon name="${ic.name}" />`}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 6, padding: '12px 8px',
                    background: copied ? '#f0f0fc' : '#fff',
                    border: `1px solid ${copied ? '#6760d8' : '#e8e8e8'}`,
                    borderRadius: 8, cursor: 'pointer',
                    transition: 'all 150ms',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: 72,
                  }}
                  onMouseEnter={e => { if (!copied) e.currentTarget.style.borderColor = '#c1c1c1'; }}
                  onMouseLeave={e => { if (!copied) e.currentTarget.style.borderColor = '#e8e8e8'; }}
                >
                  <Icon name={ic.name} size={previewSize} color={copied ? '#6760d8' : '#282828'} />
                  <span style={{
                    fontSize: '10px', color: copied ? '#6760d8' : '#9f9f9f',
                    textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-all',
                    fontWeight: copied ? 600 : 400,
                  }}>
                    {copied ? 'Copied!' : ic.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
