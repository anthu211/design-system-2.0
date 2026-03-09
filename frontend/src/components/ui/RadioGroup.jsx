import { colors } from '../../tokens/design-tokens';

const SIZE_MAP = {
  sm: { dot: 14, inner: 6, fontSize: '12px', gap: '6px' },
  md: { dot: 18, inner: 8, fontSize: '14px', gap: '8px' },
};

/**
 * RadioGroup — single-select group, vertical or horizontal layout.
 *
 * @param {Array<{label:string, value:string, description?:string}>} options
 * @param {string} value
 * @param {function} onChange
 * @param {'vertical'|'horizontal'} [layout='vertical']
 * @param {'sm'|'md'} [size='md']
 * @param {boolean} [disabled]
 * @param {string} [label]
 * @param {string} [error]
 */
export default function RadioGroup({
  options = [],
  value,
  onChange,
  layout = 'vertical',
  size = 'md',
  disabled = false,
  label,
  error,
}) {
  const s = SIZE_MAP[size] || SIZE_MAP.md;

  function handleKeyDown(e, optValue) {
    const idx = options.findIndex(o => o.value === optValue);
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = options[(idx + 1) % options.length];
      if (next) onChange(next.value);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = options[(idx - 1 + options.length) % options.length];
      if (prev) onChange(prev.value);
    }
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(optValue);
    }
  }

  return (
    <div
      role="radiogroup"
      style={{ display: 'inline-flex', flexDirection: 'column', gap: '6px', fontFamily: 'Inter, sans-serif' }}
    >
      {label && (
        <span style={{ fontSize: '13px', fontWeight: 500, color: colors.neutral.text }}>{label}</span>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: layout === 'horizontal' ? 'row' : 'column',
          gap: layout === 'horizontal' ? '16px' : '10px',
          flexWrap: 'wrap',
        }}
      >
        {options.map(opt => {
          const isChecked = opt.value === value;
          const isDisabled = disabled;

          return (
            <label
              key={opt.value}
              style={{
                display: 'inline-flex', alignItems: 'flex-start', gap: s.gap,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
                userSelect: 'none',
              }}
            >
              {/* Radio button */}
              <span
                role="radio"
                aria-checked={isChecked}
                tabIndex={isChecked ? 0 : -1}
                onKeyDown={e => !isDisabled && handleKeyDown(e, opt.value)}
                onClick={() => !isDisabled && onChange(opt.value)}
                style={{
                  flexShrink: 0,
                  marginTop: '1px',
                  width: s.dot,
                  height: s.dot,
                  borderRadius: '50%',
                  border: `2px solid ${isChecked ? colors.primary.default : colors.neutral.border}`,
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color 150ms ease',
                  outline: 'none',
                }}
                onFocus={e => { e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary.default}33`; }}
                onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {isChecked && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: s.inner,
                      height: s.inner,
                      borderRadius: '50%',
                      background: colors.primary.default,
                      transition: 'transform 150ms ease',
                    }}
                  />
                )}
              </span>

              {/* Label area */}
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: s.fontSize, color: colors.neutral.text, lineHeight: '1.4' }}>
                  {opt.label}
                </span>
                {opt.description && (
                  <span style={{ fontSize: '12px', color: colors.neutral.disabled, lineHeight: '1.4' }}>
                    {opt.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {error && (
        <span style={{ fontSize: '12px', color: colors.danger.text }}>{error}</span>
      )}
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────
import { useState } from 'react';
export function RadioGroupDemo() {
  const [v1, setV1] = useState('designer');
  const [v2, setV2] = useState('');
  const roles = [
    { label: 'Designer', value: 'designer', description: 'Can view and edit design files' },
    { label: 'Developer', value: 'developer', description: 'Can view and export code' },
    { label: 'QA', value: 'qa', description: 'Can view and test components' },
  ];
  const sizes = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <RadioGroup options={roles} value={v1} onChange={setV1} label="Role (vertical, md)" />
      <RadioGroup options={sizes} value={v2} onChange={setV2} label="Size (horizontal, sm)" layout="horizontal" size="sm" />
      <RadioGroup options={roles} value="designer" onChange={() => {}} label="Disabled" disabled />
      <RadioGroup options={roles} value="" onChange={() => {}} label="With error" error="Please select a role" />
    </div>
  );
}
