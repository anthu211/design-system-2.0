Fetch these two URLs before doing anything:

1. https://anthu211.github.io/design-system-2.0/react.md
2. https://anthu211.github.io/design-system-2.0/rules.md

---

The user's requirement is: $ARGUMENTS

Generate a React component and save it as a `.tsx` file in the current directory.

---

## Tech Stack (always use these — no substitutes)

- **React 18** + **TypeScript**
- **Tailwind CSS** for all styling — no inline styles, no CSS modules
- **Radix UI** for interactive primitives (Dialog, DropdownMenu, Select, Tooltip, Popover, Checkbox, RadioGroup, Switch)
- **Lucide React** for all icons — never emoji or text symbols
- **Recharts** for charts (AreaChart, BarChart, LineChart — never canvas or D3)

---

## Step 1 — Parse the requirement

- **Component**: what is being built
- **Persona**: dashboard/risk → `ciso` · compliance → `grc` · architecture → `security-architect` · vuln/CVE → `security-engineer` · alert/SOC → `soc-analyst`
- **Filename**: PascalCase (e.g. `AlertsTable.tsx`)

## Step 2 — Shell structure (if building a full page)

Use `Shell`, `NavItem`, `SubHeader` components exactly as shown in `react.md`.

**Topbar (left → right):** PAI logo `<img>` → spacer → "Last Updated" → bell → avatar → Navigator button.
**Never put "Prevalent AI" text in the topbar.** The logo image IS the branding.
**Nav header:** workspace name (e.g. `"EM Dashboard"`) + "Exposure Management" subtitle.
**SubHeader title:** 12px/500 — never `<h1>` or 18px.

## Step 3 — Build component

Use the exact component patterns from `react.md`. Follow every rule in `rules.md` React section:
- All buttons `rounded-[44px]` (pill)
- Cards/panels `rounded-[4px]`
- Spacing `p-1 p-2 p-3 p-4 p-5 p-6 p-8` only
- Tables: checkbox first → data cols → status → actions (last, hidden until `group-hover`)
- KPI cards: value + label + trend only — no icons, no colored borders
- Never infer page-level tabs
- TypeScript: proper interfaces, no `any`
- Named export + default export both

## Step 4 — Save the file

Write to `[PascalCaseName].tsx` in the current directory.

Report: filename · persona · shell components used · Radix primitives used
