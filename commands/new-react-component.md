Fetch these files first:
1. https://anthu211.github.io/design-system-2.0/ds/tokens/colors.json
2. https://anthu211.github.io/design-system-2.0/ds/tokens/spacing.json
3. https://anthu211.github.io/design-system-2.0/ds/tokens/typography.json

Then read $ARGUMENTS and fetch only what the component needs:
- Table/list → tables.json + badges.json
- Form/input → inputs.json + modals.json
- Button/action → buttons.json
- Card/KPI → cards.json
- Chart → charts.json
- Modal/dialog → modals.json
- Badge/status → badges.json
- Toast/alert → feedback.json
- Full page/dashboard → ALSO fetch https://anthu211.github.io/design-system-2.0/react.txt

All JSON base URL: https://anthu211.github.io/design-system-2.0/ds/components/

Do not fetch files for component types not in the request.

The user's requirement is: $ARGUMENTS

Generate a React component and save it as a `.tsx` file in the current directory.

---

## Tech Stack (no substitutes)
- React 18 + TypeScript — proper interfaces, no `any`
- Tailwind CSS — no inline styles, no CSS modules
- Radix UI — Dialog, DropdownMenu, Select, Tooltip, Popover, Checkbox, RadioGroup, Switch
- Lucide React — all icons; never emoji or text symbols
- Recharts — charts only: AreaChart, BarChart, LineChart; never canvas or D3

## Design Rules (apply without fetching ds-core.txt)
- Colors: CSS variables only — never hardcode hex (use values from colors.json)
- Spacing: 4pt grid only — 4, 8, 12, 16, 20, 24, 32, 48px. Any other value is a bug.
- Buttons: `rounded-[44px]` always. Cards/wrappers: `rounded-[4px]` only.
- Topbar: PAI logo `<img>` only — never "Prevalent AI" text
- Sub-header title: `text-[12px] font-medium` — never `<h1>` or 18px
- Row actions: `visibility: hidden` by default, `visibility: visible` on row hover — NEVER `display: none`
- Status/severity: always visible in column — never tooltip-only
- Destructive actions: require confirmation modal naming the item and stating the consequence
- Modals: Cancel left, Confirm right; destructive confirm uses danger variant

## Persona Table
- ciso → KPI cards first (max 5), trend chart, 1 dominant CTA
- grc → Compliance table, control status visible, export button
- security-architect → CVSSv3 scores, technical detail, asset context
- security-engineer → Dense table, bulk toolbar, SLA column, pagination
- soc-analyst → Alert queue first, severity sorted, quick row actions on hover

## Steps
1. **Parse**: component name · persona (from table above) · filename (PascalCase .tsx)
2. **Build**: use exact class names and patterns from the fetched component JSONs. Named + default export both.
3. **Save**: write to `[PascalCaseName].tsx` in the current directory.

Report: filename · persona · Radix primitives used · key decisions
