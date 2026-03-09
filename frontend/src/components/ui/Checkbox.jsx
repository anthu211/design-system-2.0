import { colors } from '../../tokens/design-tokens';

const SIZE_MAP = {
  sm: { box: 14, fontSize: '12px', gap: '6px', checkStroke: 1.8 },
  md: { box: 18, fontSize: '14px', gap: '8px', checkStroke: 2 },
};

/**
 * Checkbox — checked / unchecked / indeterminate states.
 *
 * @param {boolean} checked
 * @param {function} onChange
 * @param {boolean} [indeterminate]
 * @param {string} [label]
 * @param {string} [description]
 * @param {'sm'|'md'} [size='md']
 * @param {boolean} [disabled]
 * @param {string} [error]
 */
export default function Checkbox({
  checked = false,
  onChange,
  indeterminate = false,
  label,
  description,
  size = 'md',
  disabled = false,
  error,
}) {
  const s = SIZE_MAP[size] || SIZE_MAP.md;
  const isActive = checked || indeterminate;

  function handleClick() {
    if (!disabled) onChange(!checked);
  }

  function handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', fontFamily: 'Inter, sans-serif' }}>
      <label
        style={{
          display: 'inline-flex', alignItems: 'flex-start', gap: s.gap,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          userSelect: 'none',
        }}
      >
        {/* Box */}
        <span
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : checked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          style={{
            flexShrink: 0,
            marginTop: '1px',
            width: s.box,
            height: s.box,
            borderRadius: '3px',
            border: `2px solid ${isActive ? colors.primary.default : colors.neutral.border}`,
            background: isActive ? colors.primary.default : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 150ms ease, border-color 150ms ease',
            outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary.default}33`; }}
          onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
        >
          {indeterminate ? (
            /* Indeterminate dash */
            <svg
              aria-hidden="true"
              width={s.box - 4} height={s.box - 4}
              viewBox="0 0 10 10"
              fill="none"
            >
              <line x1="2" y1="5" x2="8" y2="5" stroke="#fff" strokeWidth={s.checkStroke} strokeLinecap="round" />
            </svg>
          ) : checked ? (
            /* Checkmark */
            <svg
              aria-hidden="true"
              width={s.box - 4} height={s.box - 4}
              viewBox="0 0 10 8"
              fill="none"
            >
              <path d="M1 4L3.8 7L9 1" stroke="#fff" strokeWidth={s.checkStroke} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
        </span>

        {/* Text */}
        {(label || description) && (
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {label && (
              <span style={{ fontSize: s.fontSize, color: colors.neutral.text, lineHeight: '1.4' }}>
                {label}
              </span>
            )}
            {description && (
              <span style={{ fontSize: '12px', color: colors.neutral.disabled, lineHeight: '1.4' }}>
                {description}
              </span>
            )}
          </span>
        )}
      </label>

      {error && (
        <span style={{ fontSize: '12px', color: colors.danger.text, marginLeft: s.box + parseInt(s.gap) + 'px' }}>
          {error}
        </span>
      )}
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────
import { useState } from 'react';
export function CheckboxDemo() {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(true);
  const [c3, setC3] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Checkbox checked={c1} onChange={setC1} label="Unchecked / checked" size="md" />
      <Checkbox checked={c2} onChange={setC2} label="Pre-checked" description="This option is enabled by default" size="md" />
      <Checkbox checked={false} onChange={() => {}} indeterminate label="Indeterminate" size="md" />
      <Checkbox checked={c3} onChange={setC3} label="Small size" size="sm" />
      <Checkbox checked={true} onChange={() => {}} label="Disabled checked" disabled />
      <Checkbox checked={false} onChange={() => {}} label="With error" error="You must accept the terms" />
    </div>
  );
}
