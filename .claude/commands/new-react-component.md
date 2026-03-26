Fetch these URLs fully before doing anything:

1. https://anthu211.github.io/design-system-2.0/spec.md
2. https://anthu211.github.io/design-system-2.0/shell.md
3. https://anthu211.github.io/design-system-2.0/components.md
4. https://anthu211.github.io/design-system-2.0/ux-context.md
5. https://anthu211.github.io/design-system-2.0/rules.md
6. https://anthu211.github.io/design-system-2.0/best-practices.md

Also read `react.md` in the current project — it contains the authoritative React component patterns for Shell, NavItem, SubHeader, Button, DataTable, KPICard, Dialog, etc.

---

The user's requirement is: $ARGUMENTS

Generate a React component and save it as a `.tsx` file in the current directory.

---

## Tech Stack (always use these — no substitutes)

- **React 18** + **TypeScript**
- **Tailwind CSS** for all styling — no inline styles, no CSS modules
- **Radix UI** for interactive primitives (Dialog, DropdownMenu, Select, Tooltip, Popover, Checkbox, RadioGroup, Switch, etc.)
- **Lucide React** for all icons (never emoji, never text symbols, never custom SVG icons)
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

## Step 2 — Shell structure (if building a full page/dashboard)

If building a full page, use the `<Shell>` component from `react.md`. Key shell rules:

**Topbar (left → right):** PAI logo `<img src="https://anthu211.github.io/design-system-2.0/icons/pai-logo.svg">` → flex spacer → "Last Updated" text → bell button → avatar circle → Navigator gradient button.
- **NEVER** put "Prevalent AI" or "Exposure Management" text in the topbar
- **NEVER** put a custom logo box or placeholder in the topbar

**"Prevalent AI / Exposure Management"** is in the left nav header — rendered by `<Shell>` automatically.

**Left nav** collapses to 52px icon-only on button click; hovers back to 220px. Every nav item needs a Lucide icon.

**Sub-header** uses `<SubHeader>` component — title is 12px/500 (NOT `<h1>` or 18px). Right side: Explore In → spacer → Add circle → ActiveFilters popover → divider → Filter button.

## Step 3 — Design system tokens (apply via Tailwind)

| Token | Value | Tailwind |
|-------|-------|----------|
| Accent | `#6360D8` | `bg-[#6360D8]` / `text-[#6360D8]` |
| Filter CTA | `#504bb8` | `text-[#504bb8]` / `border-[#504bb8]` |
| Topbar | `#131313` | inline style `background:'#131313'` |
| Button radius | 44px | `rounded-[44px]` |
| Card radius | 4px | `rounded-[4px]` |
| Modal radius | 12px | `rounded-[12px]` |
| Spacing | 4px scale | `p-1 p-2 p-3 p-4 p-5 p-6 p-8` only |

## Step 4 — Build component

Follow every rule in `rules.md` (React-specific section) and all rules in `react.md`. Key reminders:
- All CTA/text buttons: `rounded-[44px]`
- Icon-only buttons: `rounded-full`
- Radix primitives for modals, dropdowns, selects, tooltips, checkboxes, radios, toggles
- Tables: checkbox col first, status col before actions col, group-hover row actions (hidden until hover), pagination footer always present
- KPI cards: value + label + trend only — NO icons, NO colored borders, NO box-shadow
- TypeScript: proper interfaces for all props, no `any`
- Named export + default export both
- Never infer page-level tabs unless explicitly requested

## Step 5 — Structure

```tsx
'use client' // if Next.js

import { useState } from 'react'
import { SomeLucideIcon } from 'lucide-react'
import * as RadixPrimitive from '@radix-ui/react-...'

interface ComponentNameProps {
  // typed props — no `any`
}

export function ComponentName({ ... }: ComponentNameProps) {
  return (
    // JSX with Tailwind classes only — no inline styles except Navigator gradient
  )
}

export default ComponentName
```

## Step 6 — Save the file

Write to `[PascalCaseName].tsx` in the current directory.

Report: filename · persona applied · shell components used · Radix primitives used · key design decisions
