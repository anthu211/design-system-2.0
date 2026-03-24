Fetch these URLs fully before doing anything:

1. https://anthu211.github.io/design-system-2.0/spec.md
2. https://anthu211.github.io/design-system-2.0/components.md
3. https://anthu211.github.io/design-system-2.0/ux-context.md

---

The user's requirement is: $ARGUMENTS

Generate a React component and save it as a `.tsx` file in the current directory.

---

## Tech Stack (always use these — no substitutes)

- **React 18** + **TypeScript**
- **Tailwind CSS** for all styling — no inline styles, no CSS modules
- **Radix UI** for interactive primitives (Dialog, DropdownMenu, Select, Tooltip, Popover, Checkbox, RadioGroup, Switch, etc.)
- **Lucide React** for all icons
- **Recharts** for any charts (AreaChart, BarChart, LineChart — never canvas or D3)
- **React Hot Toast** for notifications (`toast.success`, `toast.error`)
- **React Router DOM** for navigation (`useNavigate`, `Link`)

---

## Step 1 — Parse the requirement

- **Component**: what is being built
- **Persona** (infer if not stated):
  - Dashboard / overview / executive / risk → `ciso`
  - Compliance / GRC / audit / framework / control → `grc`
  - Architecture / attack surface / topology → `security-architect`
  - Vulnerability / CVE / patch / asset / scan → `security-engineer`
  - Alert / incident / triage / threat / SOC → `soc-analyst`
- **Filename**: PascalCase (e.g. `AlertsTable.tsx`, `KpiCards.tsx`)

## Step 2 — Design system tokens (apply via Tailwind)

Map spec tokens to Tailwind classes:

| Token | Value | Tailwind approach |
|-------|-------|-------------------|
| Accent | `#6360D8` | `bg-[#6360D8]` / `text-[#6360D8]` |
| Filter CTA | `#504bb8` | `bg-[#504bb8]` |
| Topbar | `#131313` | `bg-[#131313]` |
| Button radius | 44px | `rounded-[44px]` |
| Card radius | 4px | `rounded-[4px]` |
| Font | Inter | `font-['Inter']` (assume loaded globally) |
| Spacing | 4px scale | `p-2 p-3 p-4 p-5 p-6 p-8` only |

## Step 3 — Component rules (non-negotiable)

1. All buttons `rounded-[44px]` — never `rounded-md`, `rounded-lg`, or `rounded-full`
2. Cards and table wrappers `rounded-[4px]` — never `rounded-xl`, `rounded-2xl`
3. Status/severity always visible — never tooltip-only
4. Use Radix primitives for: modals, dropdowns, selects, tooltips, checkboxes, radios, toggles
5. Destructive actions must use a Radix `Dialog` with item name + consequence + red confirm button
6. Tables: checkbox col first, row hover actions, pagination footer
7. Charts: Recharts only — `AreaChart`, `BarChart`, or `LineChart`
8. Icons: Lucide React only — never emoji or text symbols
9. TypeScript: proper interfaces for all props, no `any`
10. Export: named export + default export both

### NEVER do these:
- **KPI cards**: no colored borders (`border-t-red-500` etc.), no custom bg — plain `bg-[var(--card-bg)] border rounded-[4px]` only. Trend color comes from text class only.
- **Buttons**: never `bg-blue-500`, `bg-red-400` or any Tailwind color — only `bg-[#6760d8]`, `bg-[#504bb8]`, `bg-[#d12329]` from design tokens. Always `rounded-[44px]`.
- **Badges**: never inline color `style` — use severity-mapped classes: critical=`bg-red-50 text-[#D12329]`, high=`bg-orange-50 text-[#D98B1D]`, medium=`bg-[#f0f0fc] text-[#6760d8]`, low=`bg-green-50 text-[#31A56D]`
- **Cards**: `rounded-[4px]` only — never `rounded-xl`, no `shadow-lg`, no gradient backgrounds
- **Tables**: always include checkbox column, row hover `group-hover`, pagination footer — never bare `<table>`
- **Spacing**: 4px scale only — use `p-1 p-2 p-3 p-4 p-5 p-6 p-8` — never `p-2.5`, `p-3.5`, arbitrary values
- **No decorative additions**: no hero sections, no illustration placeholders, no extra section headings beyond sub-header

## Step 4 — Structure

```tsx
import React from 'react'
import { ... } from 'lucide-react'
import { ... } from '@radix-ui/react-...'
// other imports

interface ComponentNameProps {
  // typed props
}

export function ComponentName({ ... }: ComponentNameProps) {
  return (
    // JSX with Tailwind classes
  )
}

export default ComponentName
```

## Step 5 — Save the file

Write to `[PascalCaseName].tsx` in the current directory.

Report: filename · persona applied · Radix primitives used · key design decisions
