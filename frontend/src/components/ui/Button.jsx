import { useState } from 'react';
import { colors, typography, borderRadius } from '../../tokens/design-tokens';

// Spinner SVG
function Spinner({ color }) {
  return (
    <svg
      style={{ animation: 'spin 0.7s linear infinite' }}
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke={color || 'currentColor'} strokeWidth="2.5"
      aria-hidden="true"
    >
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
    </svg>
  );
}

// ── Size map ──────────────────────────────────────────────────────────────────
const SIZE = {
  Small: {
    height: '24px',
    padding: '0 12px',
    fontSize: typography.button.sm.fontSize,
    fontWeight: typography.button.sm.fontWeight,
    lineHeight: typography.button.sm.lineHeight,
    gap: '4px',
  },
  Medium: {
    height: '32px',
    padding: '0 12px',
    fontSize: typography.button.md.fontSize,
    fontWeight: typography.button.md.fontWeight,
    lineHeight: typography.button.md.lineHeight,
    gap: '8px',
  },
  Large: {
    height: '40px',
    padding: '0 16px',
    fontSize: typography.button.lg.fontSize,
    fontWeight: typography.button.lg.fontWeight,
    lineHeight: typography.button.lg.lineHeight,
    gap: '8px',
  },
};

// ── Style generators ─────────────────────────────────────────────────────────
function getStyles(type, pressed, hovered, disabled) {
  if (disabled) {
    return {
      background: type === 'Primary' ? colors.primary.disabled : 'transparent',
      color: colors.neutral.disabled,
      border: type === 'Outline'
        ? `1px solid ${colors.neutral.borderLight}`
        : type === 'Success' || type === 'Danger'
          ? `1px solid transparent`
          : 'none',
      opacity: 1,
    };
  }

  switch (type) {
    case 'Primary':
      return {
        background: pressed
          ? colors.primary.pressed
          : hovered
            ? colors.primary.hover
            : colors.primary.default,
        color: colors.primary.light,
        border: 'none',
      };

    case 'Primary Special': {
      const bg = pressed
        ? colors.primarySpecial.pressedBg
        : hovered
          ? colors.primarySpecial.hoverBg
          : 'transparent';
      const border = pressed
        ? `1px solid ${colors.primarySpecial.pressedBorder}`
        : `1px solid ${colors.primarySpecial.border}`;
      return {
        background: bg,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        backgroundImage: `linear-gradient(to right, ${colors.primarySpecial.gradientFrom}, ${colors.primarySpecial.gradientTo})`,
        border,
        // We'll handle gradient text with a wrapper
        _gradientText: true,
      };
    }

    case 'Secondary':
      return {
        background: pressed
          ? colors.secondary.pressed
          : hovered
            ? colors.secondary.hover
            : colors.secondary.default,
        color: pressed
          ? colors.primary.light
          : hovered
            ? colors.secondary.hoverText
            : colors.secondary.text,
        border: 'none',
      };

    case 'Outline':
      return {
        background: pressed ? colors.neutral.bg : 'transparent',
        color: colors.neutral.text,
        border: pressed
          ? `1px solid #878787`
          : hovered
            ? `1px solid #404040`
            : `1px solid ${colors.neutral.border}`,
      };

    case 'Tertiary':
      return {
        background: pressed
          ? colors.neutral.bgDark
          : hovered
            ? colors.neutral.bg
            : 'transparent',
        color: colors.neutral.text,
        border: 'none',
      };

    case 'Success':
      return {
        background: pressed
          ? colors.success.pressed
          : hovered
            ? colors.success.hover
            : colors.success.default,
        color: pressed ? colors.success.pressedText : colors.success.text,
        border: pressed
          ? `1px solid ${colors.success.pressedBorder}`
          : hovered
            ? `1px solid ${colors.success.hover}`
            : '1px solid transparent',
      };

    case 'Danger':
      return {
        background: pressed
          ? colors.danger.pressed
          : hovered
            ? colors.danger.hover
            : colors.danger.default,
        color: pressed ? colors.danger.pressedText : colors.danger.text,
        border: pressed
          ? `1px solid ${colors.danger.pressedBorder}`
          : hovered
            ? `1px solid ${colors.danger.hover}`
            : '1px solid transparent',
      };

    default:
      return {};
  }
}

/**
 * Button — implements all 7 types × 3 sizes from the Prevalent AI design system.
 *
 * @param {'Primary'|'Primary Special'|'Secondary'|'Outline'|'Tertiary'|'Success'|'Danger'} type
 * @param {'Small'|'Medium'|'Large'} size
 * @param {string} label
 * @param {React.ReactNode} [leadingIcon]
 * @param {React.ReactNode} [trailingIcon]
 * @param {function} [onClick]
 * @param {boolean} [loading]
 * @param {boolean} [disabled]
 * @param {string} [className]
 */
export default function Button({
  type = 'Primary',
  size = 'Medium',
  label = 'Button',
  leadingIcon,
  trailingIcon,
  onClick,
  loading = false,
  disabled = false,
  className = '',
  ...rest
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isDisabled = disabled || loading;
  const sz = SIZE[size] || SIZE.Medium;
  const styles = getStyles(type, pressed, hovered, isDisabled);

  // Primary Special uses gradient text — handled via a span with backgroundClip
  const isPrimarySpecial = type === 'Primary Special';
  const textStyle = isPrimarySpecial && !isDisabled
    ? {
        background: `linear-gradient(to right, ${colors.primarySpecial.gradientFrom}, ${colors.primarySpecial.gradientTo})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : {};

  const btnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sz.gap,
    height: sz.height,
    padding: sz.padding,
    fontSize: sz.fontSize,
    fontWeight: sz.fontWeight,
    lineHeight: sz.lineHeight,
    borderRadius: borderRadius.button,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'background 150ms ease, color 150ms ease, border 150ms ease, box-shadow 150ms ease',
    userSelect: 'none',
    outline: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'Inter, -apple-system, sans-serif',
    background: isPrimarySpecial && !isDisabled
      ? (pressed ? colors.primarySpecial.pressedBg : hovered ? colors.primarySpecial.hoverBg : 'transparent')
      : styles.background,
    color: isPrimarySpecial ? 'transparent' : styles.color,
    border: styles.border || 'none',
  };

  return (
    <button
      style={btnStyle}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      onMouseEnter={() => !isDisabled && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !isDisabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onFocus={() => !isDisabled && setHovered(true)}
      onBlur={() => { setHovered(false); setPressed(false); }}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={className}
      {...rest}
    >
      {loading ? (
        <Spinner color={isPrimarySpecial ? colors.primarySpecial.gradientFrom : styles.color} />
      ) : (
        <>
          {leadingIcon && (
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }} aria-hidden="true">
              {leadingIcon}
            </span>
          )}
          <span style={textStyle}>{label}</span>
          {trailingIcon && (
            <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }} aria-hidden="true">
              {trailingIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}

// ── Demo wrapper ─────────────────────────────────────────────────────────────
export function ButtonDemo() {
  const types = ['Primary', 'Primary Special', 'Secondary', 'Outline', 'Tertiary', 'Success', 'Danger'];
  const sizes = ['Small', 'Medium', 'Large'];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e8e8e8' }}>
      {/* Header */}
      <div style={{ background: '#1a1a2e', padding: '20px 24px', borderBottom: '1px solid #272727' }}>
        <h2 style={{ color: '#f9f9f9', fontSize: '18px', fontWeight: 600, margin: 0 }}>Button (CTA)</h2>
        <p style={{ color: '#9f9f9f', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>
          7 types × 3 sizes — hover and click to see interaction states
        </p>
      </div>

      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', gap: 0, borderBottom: '1px solid #e8e8e8', background: '#f9f9f9' }}>
        <div style={{ padding: '10px 12px', fontSize: '11px', fontWeight: 600, color: '#9f9f9f', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Size</div>
        {types.map(t => (
          <div key={t} style={{ padding: '10px 8px', fontSize: '11px', fontWeight: 600, color: '#282828', borderLeft: '1px solid #e8e8e8', textAlign: 'center' }}>
            {t}
          </div>
        ))}
      </div>

      {/* Rows */}
      {sizes.map((size, si) => (
        <div key={size}>
          {si > 0 && <div style={{ height: '1px', background: '#e8e8e8' }} />}
          <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', alignItems: 'center', padding: '16px 0', background: si % 2 === 0 ? '#fff' : '#fafafa' }}>
            <div style={{ padding: '0 12px', fontSize: '12px', fontWeight: 600, color: '#9f9f9f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{size}</div>
            {types.map(t => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', padding: '0 8px', borderLeft: '1px solid #e8e8e8' }}>
                <Button type={t} size={size} label={t === 'Primary Special' ? 'Special' : t.split(' ')[0]} />
                <Button type={t} size={size} label="Loading" loading />
                <Button type={t} size={size} label="Disabled" disabled />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
