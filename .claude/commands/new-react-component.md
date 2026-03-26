Fetch these URLs before doing anything:

1. https://anthu211.github.io/design-system-2.0/ds-core.md
2. https://anthu211.github.io/design-system-2.0/react.md

---

The user's requirement is: $ARGUMENTS

Generate a React component and save it as a `.tsx` file in the current directory.

---

## Tech Stack (always use — no substitutes)

- **React 18** + **TypeScript** — proper interfaces, no `any`
- **Tailwind CSS** — no inline styles, no CSS modules
- **Radix UI** — Dialog, DropdownMenu, Select, Tooltip, Popover, Checkbox, RadioGroup, Switch
- **Lucide React** — all icons; never emoji or text symbols
- **Recharts** — charts only: AreaChart, BarChart, LineChart; never canvas or D3

---

## Step 1 — Parse the requirement

- **Component**: what is being built
- **Persona**: infer from `ds-core.md` persona table
- **Filename**: PascalCase (e.g. `AlertsTable.tsx`)

## Step 2 — Apply design system rules

Use the exact component patterns from `react.md`. Apply all rules from `ds-core.md`.

**If building a full page/dashboard:**
- Use `Shell`, `NavItem`, `SubHeader` exactly as shown in `react.md`
- Topbar: PAI logo `<img>` only — NO "Prevalent AI" text
- Nav header: workspace name (e.g. "EM Dashboard") — NOT "Prevalent AI"
- SubHeader title: `text-[12px] font-medium` — never `<h1>` or 18px

## Step 3 — Build component

Follow all React rules in `ds-core.md` and `react.md`. Named + default export both.

## Step 4 — Save the file

Write to `[PascalCaseName].tsx` in the current directory.

Report: filename · persona · shell components used · Radix primitives used · key decisions
