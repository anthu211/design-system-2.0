The user's requirement is: $ARGUMENTS

The full design system rules are already loaded from CLAUDE.md. If `react.md` exists in the working directory, read it for Shell/NavItem/SubHeader verbatim component code.

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
- **Persona**: infer from CLAUDE.md persona table
- **Filename**: PascalCase (e.g. `AlertsTable.tsx`)

## Step 2 — Apply design system rules

All rules are in CLAUDE.md. If building a full page/dashboard and `react.md` is available, use Shell/NavItem/SubHeader from it verbatim.

- Topbar: PAI logo `<img>` only — NO "Prevalent AI" text
- Nav header: workspace name (e.g. "EM Dashboard") — NOT "Prevalent AI"
- SubHeader title: `text-[12px] font-medium` — never `<h1>` or 18px
- Buttons: `rounded-[44px]` — never `rounded-md/lg/full`
- Cards: `rounded-[4px]` — never `rounded-xl/2xl`

## Step 3 — Build component

Follow all React rules from CLAUDE.md. Named + default export both.

## Step 4 — Save the file

Write to `[PascalCaseName].tsx` in the current directory.

Report: filename · persona · Radix primitives used · key decisions
