import { useState, useRef, useEffect } from 'react';
import { colors, borderRadius } from '../../tokens/design-tokens';

/**
 * Textarea — auto-resize or fixed, with optional char count.
 *
 * @param {string} [value]
 * @param {function} [onChange]
 * @param {string} [placeholder]
 * @param {string} [label]
 * @param {string} [helper]
 * @param {string} [error]
 * @param {boolean} [disabled]
 * @param {boolean} [readOnly]
 * @param {number} [rows=3]
 * @param {number} [maxLength]
 * @param {boolean} [autoResize=false]
 * @param {'none'|'vertical'|'both'} [resize='vertical']
 */
export default function Textarea({
  value = '',
  onChange,
  placeholder = '',
  label,
  helper,
  error,
  disabled = false,
  readOnly = false,
  rows = 3,
  maxLength,
  autoResize = false,
  resize = 'vertical',
}) {
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize logic
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value, autoResize]);

  const borderColor = error
    ? colors.danger.text
    : focused
      ? colors.primary.default
      : colors.neutral.borderLight;

  const boxShadow = focused
    ? `0 0 0 3px ${error ? colors.danger.text : colors.primary.default}22`
    : 'none';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', fontFamily: 'Inter, sans-serif' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 500, color: colors.neutral.text }}>
          {label}
        </label>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: `1px solid ${borderColor}`,
          borderRadius: borderRadius.input,
          background: disabled ? colors.neutral.bg : readOnly ? colors.neutral.bg : '#ffffff',
          padding: '8px 12px',
          fontSize: '14px',
          color: colors.neutral.text,
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.5',
          outline: 'none',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          boxShadow,
          opacity: disabled ? 0.6 : 1,
          resize: autoResize ? 'none' : resize,
          width: '100%',
          boxSizing: 'border-box',
          minHeight: autoResize ? undefined : undefined,
        }}
      />

      {/* Bottom row */}
      {(error || helper || maxLength) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: error ? colors.danger.text : colors.neutral.disabled }}>
            {error || helper || ''}
          </span>
          {maxLength && (
            <span style={{ fontSize: '11px', color: colors.neutral.disabled }}>
              {(value || '').length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────
import { useState } from 'react';
export function TextareaDemo() {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('This textarea auto-resizes as you type more content. Try adding a few lines!');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '360px' }}>
      <Textarea label="Standard" value={v1} onChange={setV1} placeholder="Enter description…" rows={4} maxLength={300} helper="Max 300 characters" />
      <Textarea label="Auto-resize" value={v2} onChange={setV2} placeholder="Start typing…" autoResize />
      <Textarea label="Error" value="" onChange={() => {}} placeholder="Required field…" error="Description is required" />
      <Textarea label="Disabled" value="Cannot edit this." onChange={() => {}} disabled />
    </div>
  );
}
