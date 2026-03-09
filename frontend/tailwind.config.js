/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Prevalent AI design tokens
        shell: {
          bg:      '#0E0E0E',
          sidebar: '#131313',
          card:    '#1A1A1A',
          border:  '#272727',
          border2: '#3B3A3A',
          text:    '#F9F9F9',
          muted:   '#696969',
          subtle:  '#D1D1D1',
          hover:   'rgba(255,255,255,0.04)',
          active:  'rgba(99,96,216,0.12)',
          input:   '#1F1F1F',
        },
        accent: {
          DEFAULT: '#6360D8',
          light:   '#8F8DDE',
          dark:    '#4E4BB8',
          muted:   'rgba(99,96,216,0.2)',
        },
        status: {
          green:  '#31A56D',
          red:    '#E15252',
          orange: '#D98B1D',
          yellow: '#CDB900',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', '14px'],
        xs:    ['11px', '15px'],
        sm:    ['12px', '16px'],
        base:  ['13px', '19px'],
        md:    ['14px', '20px'],
        lg:    ['16px', '22px'],
        xl:    ['18px', '24px'],
        '2xl': ['22px', '28px'],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
      boxShadow: {
        card:   '0 1px 3px rgba(0,0,0,0.3)',
        pop:    '0 4px 12px rgba(0,0,0,0.4)',
        modal:  '0 8px 32px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
};
