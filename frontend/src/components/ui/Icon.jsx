import * as LucideIcons from 'lucide-react';

/**
 * Icon — dynamic wrapper around lucide-react.
 * Renders any lucide icon by name string.
 *
 * @param {string} name — lucide component name (e.g. 'ArrowRight', 'Settings')
 * @param {number} [size=16]
 * @param {string} [color='currentColor']
 * @param {number} [strokeWidth=2]
 * @param {string} [className]
 * @param {object} [style]
 */
export default function Icon({
  name,
  size = 16,
  color = 'currentColor',
  strokeWidth = 2,
  className,
  style,
  ...rest
}) {
  const LucideIcon = LucideIcons[name];

  if (!LucideIcon) {
    // Fallback: placeholder square
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        className={className}
        style={style}
        aria-hidden="true"
        {...rest}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
        <text x="12" y="14" textAnchor="middle" fontSize="8" fill={color} stroke="none" fontFamily="sans-serif">?</text>
      </svg>
    );
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      style={style}
      aria-hidden="true"
      {...rest}
    />
  );
}
