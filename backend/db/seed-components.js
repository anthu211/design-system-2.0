/**
 * seed-components.js
 * Seeds the design system UI components into the components table.
 * Run: node backend/db/seed-components.js
 */

const db = require('./db');

const ADMIN = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!ADMIN) {
  console.error('Admin user not found. Run seed.js first.');
  process.exit(1);
}

const adminId = ADMIN.id;
const now = new Date().toISOString();

const components = [
  {
    name: 'Button',
    description: '7 types × 3 sizes pill-shaped button implementing all Prevalent AI v2.5 CTAs. Types: Primary, Primary Special (gradient), Secondary, Outline, Tertiary, Success, Danger. Supports loading spinner and disabled state.',
    category: 'Buttons',
    tags: JSON.stringify(['button', 'cta', 'primary', 'interaction']),
    html: `<button class="btn-primary">Primary</button>`,
    css: `/* Uses design tokens from tokens/design-tokens.js */`,
    js: `import Button from './components/ui/Button';\n// <Button type="Primary" size="Medium" label="Click me" onClick={handler} />`,
  },
  {
    name: 'Toggle',
    description: 'Single on/off switch with sm, md, lg sizes. Animated thumb transition. Supports label, disabled state, and keyboard (Space/Enter) accessibility.',
    category: 'Form Controls',
    tags: JSON.stringify(['toggle', 'switch', 'boolean', 'form']),
    html: `<label class="toggle-label">\n  <input type="checkbox" class="toggle-input" />\n  <span class="toggle-track"></span>\n  On\n</label>`,
    css: `/* Animated thumb using design tokens */`,
    js: `import Toggle from './components/ui/Toggle';\n// <Toggle checked={value} onChange={setter} label="Enable" size="md" />`,
  },
  {
    name: 'DualToggle',
    description: 'Two-option pill toggle with animated sliding white indicator. Supports any number of options. Arrow key navigation. Implements useLayoutEffect for accurate indicator positioning.',
    category: 'Buttons',
    tags: JSON.stringify(['toggle', 'dual', 'segmented', 'pill']),
    html: `<div class="dual-toggle">\n  <button class="active">Option A</button>\n  <button>Option B</button>\n</div>`,
    css: `/* Sliding indicator animation */`,
    js: `import DualToggle from './components/ui/DualToggle';\n// <DualToggle options={[{label:'A',value:'a'},{label:'B',value:'b'}]} value={v} onChange={setV} />`,
  },
  {
    name: 'Dropdown',
    description: 'Feature-complete dropdown with single/multi-select, searchable filtering, chip display for multi, keyboard navigation (Arrow, Enter, Escape), and outside-click close. States: Default, Focus/Open, Error, Disabled.',
    category: 'Form Controls',
    tags: JSON.stringify(['dropdown', 'select', 'multi-select', 'searchable', 'form']),
    html: `<div class="dropdown">\n  <button class="dropdown-trigger">Select…</button>\n  <ul class="dropdown-panel">…</ul>\n</div>`,
    css: `/* z-index: 50, box-shadow for panel */`,
    js: `import Dropdown from './components/ui/Dropdown';\n// <Dropdown options={opts} value={v} onChange={setV} searchable multi label="Pick items" />`,
  },
  {
    name: 'RadioGroup',
    description: 'Single-select radio group with vertical or horizontal layout. sm/md sizes. Supports descriptions per option. Keyboard: Arrow keys to navigate. Error state.',
    category: 'Form Controls',
    tags: JSON.stringify(['radio', 'radiogroup', 'form', 'select']),
    html: `<div role="radiogroup">\n  <label><input type="radio" name="g" value="a" /> Option A</label>\n  <label><input type="radio" name="g" value="b" /> Option B</label>\n</div>`,
    css: `/* Custom radio indicator with scale transition */`,
    js: `import RadioGroup from './components/ui/RadioGroup';\n// <RadioGroup options={opts} value={v} onChange={setV} layout="horizontal" />`,
  },
  {
    name: 'Checkbox',
    description: 'Checkbox with checked, unchecked, and indeterminate states. sm/md sizes. Custom SVG checkmark and dash indicator. Focus ring, error message, description text.',
    category: 'Form Controls',
    tags: JSON.stringify(['checkbox', 'form', 'boolean', 'indeterminate']),
    html: `<label>\n  <input type="checkbox" />\n  Accept terms\n</label>`,
    css: `/* Custom box with SVG check */`,
    js: `import Checkbox from './components/ui/Checkbox';\n// <Checkbox checked={v} onChange={setV} label="Accept" indeterminate={partial} />`,
  },
  {
    name: 'Input',
    description: 'Text input supporting all types: text, email, password (with show/hide toggle), search (with clear button), number. Prefix/suffix icons, character counter, helper/error messages. sm/md/lg sizes.',
    category: 'Form Controls',
    tags: JSON.stringify(['input', 'text', 'password', 'search', 'form']),
    html: `<input type="text" class="input" placeholder="Enter value…" />`,
    css: `/* Focus ring using primary color */`,
    js: `import Input from './components/ui/Input';\n// <Input type="password" label="Password" value={v} onChange={setV} error={err} />`,
  },
  {
    name: 'Textarea',
    description: 'Multi-line text input with optional auto-resize (grows as content is typed), configurable resize handle, character counter, helper/error messages, and disabled/readonly states.',
    category: 'Form Controls',
    tags: JSON.stringify(['textarea', 'multiline', 'form', 'text']),
    html: `<textarea class="textarea" rows="4" placeholder="Enter description…"></textarea>`,
    css: `/* Auto-resize via JS scrollHeight */`,
    js: `import Textarea from './components/ui/Textarea';\n// <Textarea value={v} onChange={setV} autoResize maxLength={300} />`,
  },
  {
    name: 'DonutChart',
    description: 'Recharts-based donut chart for 1–5 segments. Center label with value and sublabel. Custom tooltip with percentage. Legend. Loading skeleton. Uses Prevalent AI chart color tokens.',
    category: 'Charts',
    tags: JSON.stringify(['chart', 'donut', 'pie', 'data-viz', 'recharts']),
    html: `<div class="chart-container"></div>`,
    css: `/* Loaded by recharts */`,
    js: `import DonutChart from './components/ui/DonutChart';\n// <DonutChart data={data} centerValue="88%" centerLabel="Score" title="Distribution" />`,
  },
  {
    name: 'BarChart',
    description: 'Vertical bar chart with single/multi-series and stacked variant. 3–5 bars. Custom tooltip. Legend for multi-series. Rounded bar tops. Gridlines use neutral token.',
    category: 'Charts',
    tags: JSON.stringify(['chart', 'bar', 'vertical', 'data-viz', 'recharts']),
    html: `<div class="chart-container"></div>`,
    css: `/* Loaded by recharts */`,
    js: `import BarChart from './components/ui/BarChart';\n// <BarChart data={data} xKey="month" series={[{key:'revenue',label:'Revenue'}]} stacked />`,
  },
  {
    name: 'HorizontalBarChart',
    description: 'Horizontal bar chart for ranked data. Single/multi-series. Stacked variant. Category labels on Y axis. Custom tooltip.',
    category: 'Charts',
    tags: JSON.stringify(['chart', 'horizontal-bar', 'ranking', 'data-viz', 'recharts']),
    html: `<div class="chart-container"></div>`,
    css: `/* Loaded by recharts */`,
    js: `import HorizontalBarChart from './components/ui/HorizontalBarChart';\n// <HorizontalBarChart data={data} yKey="category" series={[{key:'count',label:'Count'}]} />`,
  },
  {
    name: 'LineChart',
    description: '2–4 line chart with optional area fill and smooth curves. Configurable dots on data points. Custom tooltip. Uses AreaChart for area variant.',
    category: 'Charts',
    tags: JSON.stringify(['chart', 'line', 'area', 'trend', 'data-viz', 'recharts']),
    html: `<div class="chart-container"></div>`,
    css: `/* Loaded by recharts */`,
    js: `import LineChart from './components/ui/LineChart';\n// <LineChart data={data} xKey="date" series={series} area smooth dots />`,
  },
  {
    name: 'Icon',
    description: 'Dynamic wrapper around lucide-react. Renders any of 80+ categorized icons by name string. Falls back to a placeholder SVG for unknown icon names. Configurable size, color, strokeWidth.',
    category: 'Icons',
    tags: JSON.stringify(['icon', 'lucide', 'svg', 'ui']),
    html: `<!-- Icon rendered as SVG -->`,
    css: `/* Inherits color from parent */`,
    js: `import Icon from './components/ui/Icon';\n// <Icon name="ArrowRight" size={16} color="#6760d8" />`,
  },
];

const insert = db.prepare(`
  INSERT INTO components (name, description, category, tags, html, css, js, created_by, updated_by, created_at, updated_at)
  VALUES (@name, @description, @category, @tags, @html, @css, @js, @created_by, @updated_by, @created_at, @updated_at)
  ON CONFLICT(name) DO UPDATE SET
    description = excluded.description,
    category = excluded.category,
    tags = excluded.tags,
    html = excluded.html,
    css = excluded.css,
    js = excluded.js,
    updated_by = excluded.updated_by,
    updated_at = excluded.updated_at
`);

const seed = db.transaction(() => {
  let count = 0;
  for (const comp of components) {
    insert.run({
      ...comp,
      created_by: adminId,
      updated_by: adminId,
      created_at: now,
      updated_at: now,
    });
    count++;
  }
  return count;
});

try {
  const n = seed();
  console.log(`✓ Seeded/updated ${n} design system components.`);
} catch (err) {
  console.error('Seed failed:', err.message);
  process.exit(1);
}
