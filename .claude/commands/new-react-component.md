Fetch ALL of these URLs fully before doing anything:
1. https://anthu211.github.io/design-system-2.0/ds/rules.json
2. https://anthu211.github.io/design-system-2.0/ds/tokens/colors.json
3. https://anthu211.github.io/design-system-2.0/ds/tokens/spacing.json
4. https://anthu211.github.io/design-system-2.0/ds/tokens/typography.json
5. https://anthu211.github.io/design-system-2.0/ds/patterns/shells.json
6. https://anthu211.github.io/design-system-2.0/ds/patterns/navigation.json
7. https://anthu211.github.io/design-system-2.0/ds/components/buttons.json
8. https://anthu211.github.io/design-system-2.0/ds/components/cards.json
9. https://anthu211.github.io/design-system-2.0/ds/components/tables.json
10. https://anthu211.github.io/design-system-2.0/ds/components/badges.json
11. https://anthu211.github.io/design-system-2.0/ds/components/inputs.json
12. https://anthu211.github.io/design-system-2.0/ds/components/modals.json
13. https://anthu211.github.io/design-system-2.0/ds/components/feedback.json
14. https://anthu211.github.io/design-system-2.0/ds/components/charts.json
15. https://anthu211.github.io/design-system-2.0/ds-core.txt
16. https://anthu211.github.io/design-system-2.0/react.txt

Do not proceed until every URL above is fully fetched and read. Use exact token values, class names, and Tailwind patterns from these files — do not guess or invent any values.

The user's requirement is: $ARGUMENTS

Generate a React component and save it as a `.tsx` file in the current directory.

---

## Tech Stack (always — no substitutes)
- React 18 + TypeScript — proper interfaces, no `any`
- Tailwind CSS — no inline styles, no CSS modules
- Radix UI — Dialog, DropdownMenu, Select, Tooltip, Popover, Checkbox, RadioGroup, Switch
- Lucide React — all icons; never emoji or text symbols
- Recharts — charts only: AreaChart, BarChart, LineChart; never canvas or D3

---

## Step 1 — Parse the requirement
- **Component**: what is being built
- **Persona**: infer from persona table in ds-core.txt
- **Filename**: PascalCase (e.g. `AlertsTable.tsx`)

## Step 2 — Apply design system rules

Use exact component patterns from react.txt. Apply all rules from ds-core.txt and the component JSONs fetched above.

If building a full page/dashboard:
- Use `Shell`, `NavItem`, `SubHeader` exactly as shown in react.txt
- Topbar: PAI logo `<img>` only — NO "Prevalent AI" text
- Nav header: workspace name (e.g. "EM Dashboard") — NOT "Prevalent AI"
- SubHeader title: `text-[12px] font-medium` — never `<h1>` or 18px

Token usage:
- Colors: exact CSS variable names from tokens/colors.json — never hardcode hex
- Spacing: 4pt grid only — 4, 8, 12, 16, 20, 24, 32, 48px. Any other value is a bug.
- Typography: exact font sizes and weights from tokens/typography.json

## Step 3 — Build component

Follow all React rules in ds-core.txt and react.txt. Named + default export both.
Use exact class names and patterns from the component JSONs — do not invent class names.

## Step 4 — Save the file

Write to `[PascalCaseName].tsx` in the current directory.

Report: filename · persona · Radix primitives used · key decisions
