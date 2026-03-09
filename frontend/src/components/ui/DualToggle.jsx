import { useState, useRef, useLayoutEffect } from 'react';
import { colors, borderRadius } from '../../tokens/design-tokens';

/**
 * DualToggle — two-option pill toggle with sliding indicator.
 *
 * @param {Array<{label: string, value: string}>} options
 * @param {string} value
 * @param {function} onChange
 * @param {boolean} [disabled]
 */
export default function DualToggle({ options = [], value, onChange, disabled = false }) {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useLayoutEffect(() => {
    const idx = options.findIndex(o => o.value === value);
    if (idx < 0 || !containerRef.current) return;
    const buttons = containerRef.current.querySelectorAll('[data-toggle-btn]');
    const btn = buttons[idx];
    if (!btn) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      width: btnRect.width,
      left: btnRect.left - parentRect.left,
    });
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Toggle options"
      style={{
        display: 'inline-flex',
        position: 'relative',
        background: colors.neutral.bg,
        borderRadius: borderRadius.button,
        padding: '3px',
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        userSelect: 'none',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Sliding indicator */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '3px',
          height: 'calc(100% - 6px)',
          borderRadius: borderRadius.button,
          background: '#ffffff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
          transition: 'left 200ms ease, width 200ms ease',
          pointerEvents: 'none',
          zIndex: 0,
          ...indicatorStyle,
        }}
      />
      {options.map(opt => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            data-toggle-btn
            role="radio"
            aria-checked={active}
            onClick={() => !disabled && onChange(opt.value)}
            onKeyDown={e => {
              if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange(opt.value); }
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                const idx = options.findIndex(o => o.value === value);
                onChange(options[(idx + 1) % options.length].value);
              }
              if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                const idx = options.findIndex(o => o.value === value);
                onChange(options[(idx - 1 + options.length) % options.length].value);
              }
            }}
            tabIndex={active ? 0 : -1}
            style={{
              position: 'relative',
              zIndex: 1,
              padding: '4px 16px',
              borderRadius: borderRadius.button,
              border: 'none',
              background: 'transparent',
              color: active ? colors.neutral.text : colors.neutral.disabled,
              fontSize: '14px',
              fontWeight: active ? 500 : 400,
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'color 200ms ease',
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => { e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary.default}55`; }}
            onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Demo ─────────────────────────────────────────────────────────────────────
export function DualToggleDemo() {
  const [v1, setV1] = useState('light');
  const [v2, setV2] = useState('month');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <DualToggle options={[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]} value={v1} onChange={setV1} />
      <DualToggle options={[{ label: 'Day', value: 'day' }, { label: 'Month', value: 'month' }, { label: 'Year', value: 'year' }]}
        // Note: DualToggle strictly takes 2 options per spec; this demonstrates adaptability
        value={v2} onChange={setV2} />
      <DualToggle options={[{ label: 'Table', value: 'table' }, { label: 'Chart', value: 'chart' }]} value="table" disabled />
    </div>
  );
}
