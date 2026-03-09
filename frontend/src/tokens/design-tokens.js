// Design System Tokens — Prevalent AI v2.5
// Source: Figma Design System

export const colors = {
  primary: {
    default:  '#6760d8',
    hover:    '#5754c2',
    pressed:  '#6760d8',
    disabled: '#f3f3f3',
    light:    '#f0f0fc',
    border:   '#8280e0',
  },
  primarySpecial: {
    gradientFrom:  '#467fcd',
    gradientTo:    '#47adcb',
    border:        '#b1b8f5',
    hoverBg:       'rgba(177,184,245,0.2)',
    pressedBg:     'rgba(177,184,245,0.3)',
    pressedBorder: '#7e8aee',
  },
  secondary: {
    default:    '#f0f0fc',
    hover:      '#e0dff7',
    text:       '#6760d8',
    hoverText:  '#504bb8',
    pressed:    '#6360d8',
  },
  success: {
    default:       '#e6f6eb',
    hover:         '#d6f1df',
    pressed:       '#d6f1df',
    pressedBorder: '#2fa76d',
    text:          '#1a7549',
    pressedText:   '#0a4a2c',
  },
  danger: {
    default:       '#feebec',
    hover:         '#ffdbdc',
    pressed:       '#ffdbdc',
    pressedBorder: '#eb8e90',
    text:          '#d12329',
    pressedText:   '#931b1f',
  },
  neutral: {
    text:        '#282828',
    textDark:    '#101010',
    disabled:    '#9f9f9f',
    border:      '#c1c1c1',
    borderLight: '#cfcfcf',
    bg:          '#f3f3f3',
    bgDark:      '#e8e8e8',
  },
  white: '#f0f0fc',
};

export const typography = {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  button: {
    sm: { fontSize: '12px', fontWeight: 500, lineHeight: '16px' },
    md: { fontSize: '14px', fontWeight: 500, lineHeight: '16px' },
    lg: { fontSize: '16px', fontWeight: 600, lineHeight: '24px' },
  },
};

export const spacing = {
  '2xs': '4px',
  xs:    '8px',
  sm:    '12px',
};

export const borderRadius = {
  button: '24px',
  card:   '8px',
  input:  '6px',
};

export const chartColors = ['#6760d8', '#47adcb', '#2fa76d', '#d12329', '#f59e0b'];

export const chartTheme = {
  tooltip: {
    bg:     '#ffffff',
    border: '#cfcfcf',
    text:   '#282828',
    radius: '4px',
  },
  axis: {
    tick:   '#9f9f9f',
    grid:   '#f3f3f3',
  },
  legend: {
    dotSize: 8,
    text:    '#282828',
    fontSize: '12px',
  },
};
