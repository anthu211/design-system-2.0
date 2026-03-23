# Prevalent AI — React / Developer Reference

> Stack: React + TypeScript + Tailwind CSS + Radix UI
> Read spec.md, shell.md, components.md, and ux-context.md before using these patterns.
> Hosted at: https://anthu211.github.io/design-system-2.0/

---

### Tailwind Config — Token Mapping

Add these values to `tailwind.config.ts` to lock design tokens to Tailwind utility classes:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent:        '#6360D8',  // primary CTA, active nav, links
        'accent-dark': '#504bb8',  // filter / active-filters CTA, hover
        topbar:        '#131313',  // always fixed — never theme-switched
        critical:      '#E15252',
        high:          '#F97316',
        medium:        '#EAB308',
        low:           '#3B82F6',
        success:       '#31A56D',
      },
      borderRadius: {
        pill: '44px',   // ALL buttons — never use rounded-md on a button
        card: '12px',
        modal: '20px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
} satisfies Config
```

---

### cn() utility

All component patterns use `cn()` (clsx + tailwind-merge). Install once:

```bash
npm i clsx tailwind-merge
```

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

---

### Button

```tsx
// src/components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'danger' | 'filter'
type Size    = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  outline: 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300',
  ghost:   'bg-accent/10 text-accent hover:bg-accent/15',
  danger:  'bg-red-500 text-white hover:bg-red-600',
  filter:  'bg-[#e0dff7] text-accent-dark hover:bg-[#d4d2f2]',
}

const sizes: Record<Size, string> = {
  sm:   'px-3.5 py-1.5 text-xs',
  md:   'px-5 py-2 text-[13px]',
  lg:   'px-7 py-2.5 text-sm',
  icon: 'w-8 h-8 rounded-full p-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors',
        'disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
)
Button.displayName = 'Button'
```

---

### StatusBadge / SeverityBadge

Status must always be visible in default table views — never tooltip-only.

```tsx
// src/components/ui/StatusBadge.tsx
import { cn } from '@/lib/utils'

type Severity = 'critical' | 'high' | 'medium' | 'low'
type Status   = 'active' | 'resolved' | 'in_progress' | 'pending'

const severityStyles: Record<Severity, string> = {
  critical: 'bg-[#F9EEEE] text-[#991B1B] border-[#fecaca]',
  high:     'bg-[#FEF3C7] text-[#92400E] border-[#fde68a]',
  medium:   'bg-[#F2EDDB] text-[#78350F] border-[#fde68a]',
  low:      'bg-[#EFF7ED] text-[#065F46] border-[#a7f3d0]',
}

const statusStyles: Record<Status, string> = {
  active:      'bg-[#EFF7ED] text-[#065F46] border-[#a7f3d0]',
  resolved:    'bg-gray-100 text-gray-500 border-gray-200',
  in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
  pending:     'bg-yellow-50 text-yellow-700 border-yellow-200',
}

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border',
      severityStyles[severity], className
    )}>
      {severity}
    </span>
  )
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold capitalize border',
      statusStyles[status], className
    )}>
      {status.replace('_', ' ')}
    </span>
  )
}
```

---

### KPICard

KPI rows must contain 3–5 cards maximum (Miller's Law). Use only for aggregate metrics, not individual items.

```tsx
// src/components/ui/KPICard.tsx
import { cn } from '@/lib/utils'

interface KPICardProps {
  label: string
  value: string | number
  trend?: { value: string; direction: 'up' | 'down'; positive: boolean }
  className?: string
}

export function KPICard({ label, value, trend, className }: KPICardProps) {
  return (
    <div className={cn('flex flex-col gap-1.5 p-4 bg-white border border-gray-200 rounded-card min-w-0', className)}>
      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider truncate">{label}</span>
      <span className="text-2xl font-bold text-gray-900 leading-none">{value}</span>
      {trend && (
        <span className={cn('flex items-center gap-1 text-[11px] font-medium', trend.positive ? 'text-success' : 'text-critical')}>
          {trend.direction === 'up'
            ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          }
          {trend.value}
        </span>
      )}
    </div>
  )
}
```

---

### Dialog (Radix)

Destructive-action dialogs must name the item, state the consequence, and use `variant="danger"` on the confirm button.

```tsx
// src/components/ui/Dialog.tsx
import * as RadixDialog from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

export function Dialog({ open, onOpenChange, title, children, footer, size = 'md' }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <RadixDialog.Content className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
          'w-full bg-white rounded-card shadow-xl flex flex-col overflow-hidden',
          sizes[size]
        )}>
          {/* Grey form-header pattern */}
          <div className="flex items-center justify-between px-5 h-[58px] bg-[#f5f5f5] border-b border-gray-200 rounded-t-modal flex-shrink-0">
            <RadixDialog.Title className="text-sm font-semibold text-gray-900">{title}</RadixDialog.Title>
            <RadixDialog.Close className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </RadixDialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer && (
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100 bg-white">
              {footer}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
```

---

### Select (Radix)

Dropdowns with 10+ options must include a search field (Hick's Law).

```tsx
// src/components/ui/Select.tsx
import * as RadixSelect from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

interface SelectOption { value: string; label: string }
interface SelectProps {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function Select({ options, value, onValueChange, placeholder = 'Select…', className }: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger className={cn(
        'inline-flex items-center justify-between gap-2 w-full h-8 px-3',
        'border border-gray-200 rounded bg-white text-[13px] text-gray-700',
        'hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent/40',
        'data-[placeholder]:text-gray-400',
        className
      )}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="z-[200] bg-white border border-gray-200 rounded shadow-lg overflow-hidden min-w-[160px]">
          <RadixSelect.Viewport className="p-1">
            {options.map(opt => (
              <RadixSelect.Item key={opt.value} value={opt.value}
                className="flex items-center px-3 py-1.5 text-[13px] text-gray-700 rounded cursor-pointer hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent outline-none data-[state=checked]:text-accent data-[state=checked]:font-medium"
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
```

---

### Checkbox (Radix)

Supports `checked`, `unchecked`, and `indeterminate` (for Select All in tables).

```tsx
// src/components/ui/Checkbox.tsx
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { cn } from '@/lib/utils'

interface CheckboxProps {
  id: string
  checked?: boolean | 'indeterminate'
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
  label?: string
  className?: string
}

export function Checkbox({ id, checked, onCheckedChange, label, className }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <RadixCheckbox.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'w-4 h-4 rounded border border-gray-300 bg-white flex-shrink-0',
          'data-[state=checked]:bg-accent data-[state=checked]:border-accent',
          'data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent',
          'focus:outline-none focus:ring-1 focus:ring-accent/40',
          className
        )}
      >
        <RadixCheckbox.Indicator className="flex items-center justify-center text-white">
          {checked === 'indeterminate'
            ? <svg width="8" height="2" viewBox="0 0 8 2" fill="currentColor"><rect width="8" height="2" rx="1"/></svg>
            : <svg width="9" height="7" viewBox="0 0 9 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 3.5 3.5 6 8 1"/></svg>
          }
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label htmlFor={id} className="text-[13px] text-gray-700 cursor-pointer select-none">{label}</label>
      )}
    </div>
  )
}
```

---

### Tabs (Radix)

```tsx
// src/components/ui/Tabs.tsx
import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface Tab { value: string; label: string; content: ReactNode }
interface TabsProps { tabs: Tab[]; defaultValue?: string; className?: string }

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  return (
    <RadixTabs.Root defaultValue={defaultValue ?? tabs[0]?.value} className={cn('flex flex-col', className)}>
      <RadixTabs.List className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <RadixTabs.Trigger key={tab.value} value={tab.value}
            className="px-4 py-2.5 text-[13px] font-medium text-gray-500 border-b-2 border-transparent -mb-px hover:text-gray-700 transition-colors data-[state=active]:text-accent data-[state=active]:border-accent"
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map(tab => (
        <RadixTabs.Content key={tab.value} value={tab.value} className="flex-1 pt-4 outline-none">
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
```

---

### DataTable

Visible columns 5–7 by default (Miller's Law). Row actions appear on hover (Fitts's Law). Checkboxes in leftmost column (Jakob's Law).

```tsx
// src/components/ui/DataTable.tsx
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Checkbox } from './Checkbox'

type SortDir = 'asc' | 'desc' | null

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  onRowAction?: (action: 'view' | 'edit' | 'delete', row: T) => void
}

export function DataTable<T extends { id: string }>({ columns, data, onRowAction }: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const allSelected  = data.length > 0 && selected.size === data.length
  const someSelected = selected.size > 0 && !allSelected

  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(data.map(r => r.id)))
  const toggleRow = (id: string) =>
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const handleSort = (key: keyof T) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]))
    return sortDir === 'asc' ? cmp : -cmp
  })

  return (
    <div className="overflow-x-auto rounded-card border border-gray-200 bg-white">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="w-10 px-3 py-2.5">
              <Checkbox id="select-all" checked={someSelected ? 'indeterminate' : allSelected} onCheckedChange={toggleAll} />
            </th>
            {columns.map(col => (
              <th key={String(col.key)}
                onClick={() => col.sortable && handleSort(col.key)}
                className={cn(
                  'px-3 py-2.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap',
                  col.sortable && 'cursor-pointer hover:text-gray-600 select-none'
                )}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {sortDir === 'asc' ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
                    </svg>
                  )}
                </span>
              </th>
            ))}
            <th className="w-16 px-3 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {sorted.map(row => (
            <tr key={row.id}
              className={cn('border-b border-gray-100 last:border-0 group hover:bg-gray-50 transition-colors', selected.has(row.id) && 'bg-accent/5')}
            >
              <td className="px-3 py-2.5">
                <Checkbox id={`row-${row.id}`} checked={selected.has(row.id)} onCheckedChange={() => toggleRow(row.id)} />
              </td>
              {columns.map(col => (
                <td key={String(col.key)} className="px-3 py-2.5 text-gray-700">
                  {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                </td>
              ))}
              {/* Row actions: hover-visible per Fitts's Law */}
              <td className="px-3 py-2.5">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onRowAction?.('view', row)}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-400 hover:text-gray-700">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button onClick={() => onRowAction?.('delete', row)}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 text-gray-400 hover:text-red-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

### Shell Layout

```tsx
// src/components/shell/Shell.tsx
import { ReactNode } from 'react'

interface ShellProps {
  nav: ReactNode        // left nav content
  subHeader: ReactNode  // sticky content sub-header
  children: ReactNode   // page body
}

export function Shell({ nav, subHeader, children }: ShellProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans">
      {/* Topbar — always bg-topbar (#131313), never theme-switched */}
      <header className="h-[52px] bg-topbar border-b border-[#272727] flex items-center px-4 gap-3 flex-shrink-0 z-[100]">
        <img src="/icons/pai-logo.svg" className="h-[26px]" alt="Prevalent AI" />
        <span className="flex-1" />
        <span className="text-xs text-gray-400">Last Updated: 2h ago</span>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">A</div>
        {/* Navigator button — gradient text, can't be expressed as plain Tailwind */}
        <button className="px-3.5 py-1.5 rounded-pill border border-[#b1b8f5] text-xs font-medium"
          style={{ background: 'linear-gradient(to right,#467fcd,#47adcb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Navigator
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left nav — always white in light theme */}
        <nav className="w-[220px] bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0 flex flex-col">
          {nav}
        </nav>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Sticky sub-header */}
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200 rounded-b-lg px-4 py-2.5 flex items-center gap-2.5 flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {subHeader}
          </div>
          {/* Page body */}
          <div className="flex-1 p-6 bg-[#F7F9FC]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

### React Rules (apply without being asked)

1. **All buttons use `rounded-pill`** — never `rounded-md` or `rounded-lg` on a button.
2. **Accent is always `bg-accent` / `text-accent` (`#6360D8`)**. Filter CTA uses `accent-dark` (`#504bb8`).
3. **Topbar is always `bg-topbar` (`#131313`)** — never theme-switched.
4. **Inter font** — set in `tailwind.config.ts` `fontFamily.sans` and load via `<link>` in the HTML entry or `next/font/google`.
5. **Status is never tooltip-only** — `SeverityBadge` / `StatusBadge` must be visible in default table columns.
6. **Tables over cards** for list data — `DataTable` for items, `KPICard` only for aggregate metrics.
7. **Row actions appear on hover** via `group-hover:opacity-100` — not on right-click.
8. **Destructive confirm** — wrap delete actions in a `Dialog` with item name, consequence text, and `variant="danger"` confirm button.
9. **KPI rows: 3–5 cards max** (Miller's Law).
10. **Table columns: 5–7 visible by default** — extras opt-in via Add Column.
11. **Radix package names:**
    - Dialog → `@radix-ui/react-dialog`
    - Select → `@radix-ui/react-select`
    - Checkbox → `@radix-ui/react-checkbox`
    - Tabs → `@radix-ui/react-tabs`
    - DropdownMenu → `@radix-ui/react-dropdown-menu`
    - Popover → `@radix-ui/react-popover`
12. **No inline styles** except the Navigator gradient text (CSS gradient cannot be expressed as a Tailwind class without a custom plugin).
13. **Output individual component files** — one component per file, named exactly as shown above, placed in `src/components/ui/`.
