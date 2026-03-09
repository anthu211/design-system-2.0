import { useState, useRef, useEffect, useCallback } from 'react';
import { colors, borderRadius } from '../../tokens/design-tokens';

const SIZE_MAP = {
  sm: { height: '28px', fontSize: '12px', padding: '0 10px', chipFontSize: '11px' },
  md: { height: '36px', fontSize: '14px', padding: '0 12px', chipFontSize: '12px' },
};

/**
 * Dropdown — searchable, single/multi-select with keyboard navigation.
 *
 * @param {Array<{label:string,value:string}>} options
 * @param {string|string[]} value — string for single, string[] for multi
 * @param {function} onChange
 * @param {string} [placeholder]
 * @param {boolean} [disabled]
 * @param {boolean} [searchable]
 * @param {boolean} [multi]
 * @param {'sm'|'md'} [size='md']
 * @param {string} [error]
 * @param {string} [label]
 */
export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = 'Select…',
  disabled = false,
  searchable = false,
  multi = false,
  size = 'md',
  error,
  label,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const sz = SIZE_MAP[size] || SIZE_MAP.md;

  const selected = multi
    ? (Array.isArray(value) ? value : [])
    : value;

  const filtered = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setSearch('');
        setFocusedIdx(-1);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Focus search input when opening
  useEffect(() => {
    if (open && searchable && searchRef.current) {
      searchRef.current.focus();
    }
    if (open) setFocusedIdx(-1);
  }, [open, searchable]);

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIdx >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-option]');
      items[focusedIdx]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIdx]);

  function toggleOpen() {
    if (!disabled) {
      setOpen(o => !o);
      setSearch('');
    }
  }

  function selectOption(opt) {
    if (multi) {
      const arr = Array.isArray(value) ? value : [];
      const next = arr.includes(opt.value)
        ? arr.filter(v => v !== opt.value)
        : [...arr, opt.value];
      onChange(next);
    } else {
      onChange(opt.value);
      setOpen(false);
      setSearch('');
      setFocusedIdx(-1);
    }
  }

  function removeChip(val, e) {
    e.stopPropagation();
    onChange((value || []).filter(v => v !== val));
  }

  function handleKeyDown(e) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setSearch('');
      setFocusedIdx(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && focusedIdx >= 0 && filtered[focusedIdx]) {
      e.preventDefault();
      selectOption(filtered[focusedIdx]);
    }
  }

  // Trigger display
  function renderTrigger() {
    if (multi) {
      const chips = (Array.isArray(value) ? value : [])
        .map(v => options.find(o => o.value === v))
        .filter(Boolean);

      if (chips.length === 0) {
        return <span style={{ color: colors.neutral.disabled, fontSize: sz.fontSize }}>{placeholder}</span>;
      }
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', flex: 1, minWidth: 0 }}>
          {chips.map(opt => (
            <span
              key={opt.value}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '3px',
                background: '#f0f0fc', color: colors.primary.default,
                borderRadius: '12px', padding: '1px 8px',
                fontSize: sz.chipFontSize, fontWeight: 500,
              }}
            >
              {opt.label}
              <span
                onClick={e => removeChip(opt.value, e)}
                style={{ cursor: 'pointer', lineHeight: 1, opacity: 0.7 }}
              >×</span>
            </span>
          ))}
        </div>
      );
    }

    const found = options.find(o => o.value === value);
    return (
      <span style={{ fontSize: sz.fontSize, color: found ? colors.neutral.text : colors.neutral.disabled, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {found ? found.label : placeholder}
      </span>
    );
  }

  const borderColor = error
    ? colors.danger.text
    : open
      ? colors.primary.default
      : colors.neutral.borderLight;

  return (
    <div
      ref={containerRef}
      style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', fontFamily: 'Inter, sans-serif', position: 'relative' }}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 500, color: colors.neutral.text }}>
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={toggleOpen}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          minHeight: sz.height, padding: sz.padding,
          border: `1px solid ${borderColor}`,
          borderRadius: borderRadius.input,
          background: disabled ? colors.neutral.bg : '#ffffff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          outline: 'none',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
          boxShadow: open && !error ? `0 0 0 3px ${colors.primary.default}22` : 'none',
          minWidth: '160px',
        }}
        onFocus={e => {
          if (!open) e.currentTarget.style.borderColor = error ? colors.danger.text : colors.primary.default;
        }}
        onBlur={e => {
          if (!open) e.currentTarget.style.borderColor = error ? colors.danger.text : colors.neutral.borderLight;
        }}
      >
        {renderTrigger()}
        {/* Chevron */}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={colors.neutral.disabled} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms ease' }}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Error message */}
      {error && (
        <span style={{ fontSize: '12px', color: colors.danger.text }}>{error}</span>
      )}

      {/* Dropdown panel */}
      {open && (
        <div
          style={{
            position: 'absolute', top: `calc(${sz.height} + ${label ? '28px' : '0px'} + 6px)`,
            left: 0, right: 0,
            background: '#ffffff',
            border: `1px solid ${colors.neutral.borderLight}`,
            borderRadius: borderRadius.input,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            zIndex: 50,
            overflow: 'hidden',
          }}
        >
          {/* Search input */}
          {searchable && (
            <div style={{ padding: '8px', borderBottom: `1px solid ${colors.neutral.bg}` }}>
              <input
                ref={searchRef}
                value={search}
                onChange={e => { setSearch(e.target.value); setFocusedIdx(0); }}
                placeholder="Search…"
                style={{
                  width: '100%', border: `1px solid ${colors.neutral.borderLight}`,
                  borderRadius: '4px', padding: '4px 8px', fontSize: '13px',
                  outline: 'none', fontFamily: 'Inter, sans-serif',
                  boxSizing: 'border-box',
                }}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIdx(i => Math.min(i + 1, filtered.length - 1)); }
                  if (e.key === 'ArrowUp')   { e.preventDefault(); setFocusedIdx(i => Math.max(i - 1, 0)); }
                  if (e.key === 'Enter' && focusedIdx >= 0 && filtered[focusedIdx]) { e.preventDefault(); selectOption(filtered[focusedIdx]); }
                  if (e.key === 'Escape') { setOpen(false); setSearch(''); }
                }}
              />
            </div>
          )}

          {/* Options list */}
          <div
            ref={listRef}
            role="listbox"
            style={{ maxHeight: '220px', overflowY: 'auto' }}
          >
            {filtered.length === 0 ? (
              <div style={{ padding: '10px 12px', fontSize: '13px', color: colors.neutral.disabled, textAlign: 'center' }}>
                No options
              </div>
            ) : (
              filtered.map((opt, idx) => {
                const isSelected = multi
                  ? (Array.isArray(value) ? value.includes(opt.value) : false)
                  : opt.value === value;
                const isFocused = idx === focusedIdx;

                return (
                  <div
                    key={opt.value}
                    data-option
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => selectOption(opt)}
                    onMouseEnter={() => setFocusedIdx(idx)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', fontSize: sz.fontSize,
                      cursor: 'pointer',
                      background: isFocused
                        ? colors.neutral.bg
                        : isSelected && !multi
                          ? '#f0f0fc'
                          : 'transparent',
                      color: isSelected && !multi ? colors.primary.default : colors.neutral.text,
                      fontWeight: isSelected && !multi ? 500 : 400,
                    }}
                  >
                    {multi && (
                      <span style={{
                        width: '14px', height: '14px', flexShrink: 0,
                        border: `2px solid ${isSelected ? colors.primary.default : colors.neutral.border}`,
                        borderRadius: '3px',
                        background: isSelected ? colors.primary.default : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isSelected && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                            <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    )}
                    {opt.label}
                    {isSelected && !multi && (
                      <svg style={{ marginLeft: 'auto' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary.default} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Demo ──────────────────────────────────────────────────────────────────────
import { useState } from 'react';
export function DropdownDemo() {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [v3, setV3] = useState([]);
  const opts = [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Reports', value: 'reports' },
    { label: 'Settings', value: 'settings' },
    { label: 'Team', value: 'team' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Dropdown options={opts} value={v1} onChange={setV1} placeholder="Select a page" label="Standard" />
      <Dropdown options={opts} value={v2} onChange={setV2} placeholder="Search pages…" label="Searchable" searchable />
      <Dropdown options={opts} value={v3} onChange={setV3} placeholder="Pick multiple…" label="Multi-select" multi searchable />
      <Dropdown options={opts} value="" onChange={() => {}} label="Disabled" disabled />
      <Dropdown options={opts} value="" onChange={() => {}} label="Error state" error="This field is required" />
    </div>
  );
}
