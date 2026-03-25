Fetch these URLs fully before doing anything:

1. https://anthu211.github.io/design-system-2.0/spec.md
2. https://anthu211.github.io/design-system-2.0/components.md
3. https://anthu211.github.io/design-system-2.0/ux-context.md
4. https://anthu211.github.io/design-system-2.0/rules.md
5. https://anthu211.github.io/design-system-2.0/best-practices.md

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

| Token | Value | Tailwind |
|-------|-------|----------|
| Accent | `#6360D8` | `bg-[#6360D8]` / `text-[#6360D8]` |
| Filter CTA | `#504bb8` | `bg-[#504bb8]` |
| Topbar | `#131313` | `bg-[#131313]` |
| Button radius | 44px | `rounded-[44px]` |
| Card radius | 4px | `rounded-[4px]` |
| Spacing | 4px scale | `p-1 p-2 p-3 p-4 p-5 p-6 p-8` only |

## Step 3 — Build component

Follow every rule in `rules.md` (React-specific section applies). Key reminders:
- All buttons `rounded-[44px]`
- Radix primitives for modals, dropdowns, selects, tooltips, checkboxes, radios, toggles
- Tables: checkbox col first, group-hover row actions, pagination footer
- TypeScript: proper interfaces, no `any`
- Named export + default export both

## Step 4 — Structure

```tsx
import React from 'react'
import { ... } from 'lucide-react'
import { ... } from '@radix-ui/react-...'

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
