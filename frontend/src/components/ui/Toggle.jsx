import { colors } from '../../tokens/design-tokens';

const SIZE_MAP = {
  sm: { track: { width: 32, height: 18 }, thumb: 14, thumbOff: 2, thumbOn: 16 },
  md: { track: { width: 44, height: 24 }, thumb: 18, thumbOff: 3, thumbOn: 23 },
  lg: { track: { width: 56, height: 30 }, thumb: 24, thumbOff: 3, thumbOn: 29 },
};

/**
 * Toggle — single-side on/off switch.
 *
 * @param {boolean} checked
 * @param {function} onChange
 * @param {string} [label]
 * @param {'sm'|'md'|'lg'} [size='md']
 * @param {boolean} [disabled]
 */
export default function Toggle({ checked = false, onChange, label, size = 'md', disabled = false }) {
  const s = SIZE_MAP[size] || SIZE_MAP.md;
  const thumbLeft = checked ? s.thumbOn : s.thumbOff;

  function handleClick() {
    if (!disabled) onChange(!checked);
  }

  function handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleClick(); }
  }

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        userSelect: 'none',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <span
        role="switch"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative',
          display: 'inline-block',
          width: s.track.width,
          height: s.track.height,
          borderRadius: s.track.height,
          background: checked ? colors.primary.default : colors.neutral.bgDark,
          transition: 'background 200ms ease',
          flexShrink: 0,
          outline: 'none',
        }}
        onFocus={e => { e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.primary.default}33`; }}
        onBlur={e => { e.currentTarget.style.boxShadow = 'none'; }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: thumbLeft,
            width: s.thumb,
            height: s.thumb,
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            transition: 'left 200ms ease',
          }}
        />
      </span>
      {label && (
        <span style={{ fontSize: '14px', color: colors.neutral.text }}>{label}</span>
      )}
    </label>
  );
}

// ── Demo ─────────────────────────────────────────────────────────────────────
import { useState } from 'react';
export function ToggleDemo() {
  const [states, setStates] = useState({ sm: false, md: true, lg: false });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {['sm', 'md', 'lg'].map(sz => (
        <div key={sz} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ width: 24, fontSize: 12, color: '#9f9f9f' }}>{sz}</span>
          <Toggle size={sz} checked={states[sz]} onChange={v => setStates(s => ({ ...s, [sz]: v }))} label={states[sz] ? 'On' : 'Off'} />
          <Toggle size={sz} checked={true} disabled label="Disabled on" />
          <Toggle size={sz} checked={false} disabled label="Disabled off" />
        </div>
      ))}
    </div>
  );
}
