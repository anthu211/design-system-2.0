import { useState } from 'react';
import { colors, borderRadius } from '../../tokens/design-tokens';

const SIZE_MAP = {
  sm: { height: '28px', fontSize: '12px', padding: '0 10px' },
  md: { height: '36px', fontSize: '14px', padding: '0 12px' },
  lg: { height: '44px', fontSize: '15px', padding: '0 14px' },
};

/**
 * Input — text, email, password (with reveal), search (with clear), number.
 * Supports prefix/suffix icons, character count, error/helper text.
 *
 * @param {'text'|'email'|'password'|'search'|'number'|'url'|'tel'} [type='text']
 * @param {string} [value]
 * @param {function} [onChange]
 * @param {string} [placeholder]
 * @param {string} [label]
 * @param {string} [helper]
 * @param {string} [error]
 * @param {React.ReactNode} [prefix]  — icon or text before input
 * @param {React.ReactNode} [suffix]  — icon or text after input
 * @param {boolean} [disabled]
 * @param {boolean} [readOnly]
 * @param {number} [maxLength]
 * @param {'sm'|'md'|'lg'} [size='md']
 */
export default function Input({
  type = 'text',
  value = '',
  onChange,
  placeholder = '',
  label,
  helper,
  error,
  prefix,
  suffix,
  disabled = false,
  readOnly = false,
  maxLength,
  size = 'md',
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const s = SIZE_MAP[size] || SIZE_MAP.md;

  const isPassword = type === 'password';
  const isSearch = type === 'search';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const borderColor = error
    ? colors.danger.text
    : focused
      ? colors.primary.default
      : colors.neutral.borderLight;

  const boxShadow = error
    ? (focused ? `0 0 0 3px ${colors.danger.text}22` : 'none')
    : (focused ? `0 0 0 3px ${colors.primary.default}22` : 'none');

  const hasSuffix = suffix || isPassword || (isSearch && value);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', fontFamily: 'Inter, sans-serif' }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 500, color: colors.neutral.text }}>
          {label}
        </label>
      )}

      <div
        style={{
          display: 'inline-flex', alignItems: 'center',
          height: s.height,
          border: `1px solid ${borderColor}`,
          borderRadius: borderRadius.input,
          background: disabled ? colors.neutral.bg : readOnly ? colors.neutral.bg : '#ffffff',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          boxShadow,
          opacity: disabled ? 0.6 : 1,
          overflow: 'hidden',
        }}
      >
        {/* Prefix */}
        {prefix && (
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingLeft: '10px', color: colors.neutral.disabled, flexShrink: 0,
          }}>
            {prefix}
          </span>
        )}

        {/* Search icon prefix */}
        {isSearch && (
          <span style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px', color: colors.neutral.disabled, flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        )}

        {/* Input field */}
        <input
          type={inputType}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, minWidth: 0,
            height: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: s.padding,
            paddingLeft: (prefix || isSearch) ? '6px' : undefined,
            paddingRight: hasSuffix ? '6px' : undefined,
            fontSize: s.fontSize,
            color: colors.neutral.text,
            fontFamily: 'Inter, sans-serif',
          }}
          {...rest}
        />

        {/* Clear button for search */}
        {isSearch && value && (
          <button
            type="button"
            onClick={() => onChange && onChange('')}
            tabIndex={-1}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 8px', height: '100%',
              border: 'none', background: 'transparent',
              color: colors.neutral.disabled, cursor: 'pointer', flexShrink: 0,
            }}
            aria-label="Clear"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Password reveal */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 10px', height: '100%',
              border: 'none', background: 'transparent',
              color: colors.neutral.disabled, cursor: 'pointer', flexShrink: 0,
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}

        {/* Suffix */}
        {suffix && !isPassword && (
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            paddingRight: '10px', color: colors.neutral.disabled, flexShrink: 0,
          }}>
            {suffix}
          </span>
        )}
      </div>

      {/* Bottom row: error/helper + char count */}
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
export function InputDemo() {
  const [vals, setVals] = useState({
    text: '', email: '', password: '', search: '', number: '', limited: '',
  });
  const set = key => v => setVals(s => ({ ...s, [key]: v }));

  const EmailIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input label="Text" value={vals.text} onChange={set('text')} placeholder="Enter text…" />
      <Input type="email" label="Email with prefix" value={vals.email} onChange={set('email')} placeholder="you@example.com" prefix={EmailIcon} />
      <Input type="password" label="Password" value={vals.password} onChange={set('password')} placeholder="Enter password…" />
      <Input type="search" label="Search with clear" value={vals.search} onChange={set('search')} placeholder="Search…" />
      <Input label="With character limit" value={vals.limited} onChange={set('limited')} placeholder="Max 100 chars…" maxLength={100} helper="Used for short descriptions" />
      <Input label="Error state" value="" onChange={() => {}} placeholder="Enter value…" error="This field is required" />
      <Input label="Disabled" value="Read-only value" onChange={() => {}} disabled />
    </div>
  );
}
