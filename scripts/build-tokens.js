#!/usr/bin/env node
/**
 * build-tokens.js
 * Generates frontend/src/tokens/design-tokens.js from ds/tokens/*.json
 * Run: node scripts/build-tokens.js
 */

const fs   = require('fs');
const path = require('path');

const ROOT    = path.resolve(__dirname, '..');
const DS_DIR  = path.join(ROOT, 'ds', 'tokens');
const OUT_FILE = path.join(ROOT, 'frontend', 'src', 'tokens', 'design-tokens.js');

// ── Read sources ──────────────────────────────────────────────────────────────
const colors  = JSON.parse(fs.readFileSync(path.join(DS_DIR, 'colors.json'),     'utf8'));
const spacing = JSON.parse(fs.readFileSync(path.join(DS_DIR, 'spacing.json'),    'utf8'));
const typo    = JSON.parse(fs.readFileSync(path.join(DS_DIR, 'typography.json'), 'utf8'));

const p   = colors.primitives;
const sem = colors.semantic;
const lt  = colors.themes.light;

// ── Build output object ───────────────────────────────────────────────────────
const tokens = {
  colors: {
    primary: {
      default:  p['purple-500'],
      hover:    p['purple-600'],
      pressed:  p['purple-500'],
      disabled: p['gray-100'],
      light:    p['purple-50'],
      border:   p['purple-500'],
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
      default:   p['purple-50'],
      hover:     p['purple-100'],
      text:      p['purple-500'],
      hoverText: p['purple-600'],
      pressed:   p['purple-500'],
    },
    success: {
      default:       p['green-50'],
      hover:         '#d6f1df',
      pressed:       '#d6f1df',
      pressedBorder: p['green-500'],
      text:          '#1a7549',
      pressedText:   '#0a4a2c',
    },
    danger: {
      default:       p['red-50'],
      hover:         '#ffdbdc',
      pressed:       '#ffdbdc',
      pressedBorder: '#eb8e90',
      text:          p['red-700'],
      pressedText:   '#931b1f',
    },
    warning: {
      default: p['amber-50'],
      text:    p['amber-600'],
    },
    severity: {
      critical: { text: sem['color-severity-critical'].raw, bg: sem['color-severity-critical'].bg },
      high:     { text: sem['color-severity-high'].raw,     bg: sem['color-severity-high'].bg     },
      medium:   { text: sem['color-severity-medium'].raw,   bg: sem['color-severity-medium'].bg   },
      low:      { text: sem['color-severity-low'].raw,      bg: sem['color-severity-low'].bg      },
    },
    neutral: {
      text:        lt['--shell-text-2']    || p['gray-800'],
      textDark:    lt['--shell-text']      || p['gray-900'],
      disabled:    p['gray-400'],
      border:      lt['--ctrl-border']     || p['gray-300'],
      borderLight: lt['--card-border']     || p['gray-200'],
      bg:          lt['--ctrl-hover']      || p['gray-100'],
      bgDark:      lt['--shell-elevated']  || p['gray-200'],
    },
    shell: lt,  // full light-theme CSS variable map for reference
  },

  typography: {
    fontFamily: typo.font_family.sans.join(', '),
    monoFamily: typo.font_family.mono.join(', '),
    baseSize:   typo.base_size,
    scale: Object.fromEntries(
      Object.entries(typo.scale).map(([k, v]) => [k, { fontSize: v.size, fontWeight: v.weight }])
    ),
    tailwindScale: typo.tailwind_scale,
  },

  spacing: Object.fromEntries(
    spacing.scale.map(n => [
      n <= 8 ? (n === 4 ? '2xs' : 'xs') :
      n === 12 ? 'sm' :
      n === 16 ? 'md' :
      n === 20 ? 'lg' :
      n === 24 ? 'xl' :
      n === 32 ? '2xl' : '3xl',
      `${n}px`
    ])
  ),

  borderRadius: {
    button:   spacing.border_radius['button-cta'],
    card:     spacing.border_radius['card'],
    badge:    spacing.border_radius['badge'],
    input:    spacing.border_radius['input'],
    dropdown: spacing.border_radius['dropdown'],
    modal:    spacing.border_radius['modal'],
  },

  chartColors: [
    p['purple-500'],
    '#47adcb',
    p['green-500'],
    p['red-700'],
    p['amber-600'],
  ],

  chartTheme: {
    tooltip: {
      bg:     p['white'],
      border: p['gray-300'],
      text:   p['gray-800'],
      radius: spacing.border_radius['card'],
    },
    axis: {
      tick: p['gray-400'],
      grid: p['gray-100'],
    },
    legend: {
      dotSize:  8,
      text:     p['gray-800'],
      fontSize: typo.base_size,
    },
  },
};

// ── Serialise to ES module ────────────────────────────────────────────────────
function toJS(val, indent = 0) {
  const pad = ' '.repeat(indent);
  const pad2 = ' '.repeat(indent + 2);
  if (typeof val === 'string')  return `'${val}'`;
  if (typeof val === 'number')  return String(val);
  if (Array.isArray(val))       return `[${val.map(v => toJS(v)).join(', ')}]`;
  if (typeof val === 'object' && val !== null) {
    const entries = Object.entries(val)
      .map(([k, v]) => `${pad2}${/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `'${k}'`}: ${toJS(v, indent + 2)}`)
      .join(',\n');
    return `{\n${entries},\n${pad}}`;
  }
  return String(val);
}

const banner = `// Design System Tokens — Prevalent AI
// AUTO-GENERATED by scripts/build-tokens.js — do not edit manually
// Source: ds/tokens/colors.json · ds/tokens/spacing.json · ds/tokens/typography.json
// Run \`npm run build:tokens\` to regenerate after changing ds/tokens/*.json
`;

const body = Object.entries(tokens)
  .map(([key, val]) => `export const ${key} = ${toJS(val, 0)};`)
  .join('\n\n');

fs.writeFileSync(OUT_FILE, banner + '\n' + body + '\n');

// ── Report ────────────────────────────────────────────────────────────────────
console.log('✓ Generated:', path.relative(ROOT, OUT_FILE));

// Drift check: warn if key token values changed
const driftChecks = [
  ['borderRadius.button', tokens.borderRadius.button, '44px'],
  ['borderRadius.card',   tokens.borderRadius.card,   '4px'],
  ['borderRadius.input',  tokens.borderRadius.input,  '8px'],
];
let drifts = 0;
driftChecks.forEach(([name, actual, expected]) => {
  if (actual !== expected) {
    console.warn(`⚠  DRIFT: ${name} = '${actual}' (expected '${expected}') — check ds/tokens/spacing.json`);
    drifts++;
  }
});
if (drifts === 0) console.log('✓ No token drift detected.');
console.log(`✓ ${spacing.scale.length} spacing steps · ${Object.keys(tokens.borderRadius).length} border-radius values`);
console.log(`✓ ${Object.keys(tokens.colors).length} color groups · ${Object.keys(tokens.typography.scale).length} type styles`);
