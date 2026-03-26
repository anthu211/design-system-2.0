# Prevalent AI — React / Developer Reference

> Stack: React + TypeScript + Tailwind CSS + Radix UI
> Read spec.md, shell.md, components.md, and ux-context.md before using these patterns.
> Hosted at: https://anthu211.github.io/design-system-2.0/

---

### Tailwind Config — Token Mapping

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
        critical:      '#D12329',
        high:          '#D98B1D',
        medium:        '#6360D8',
        low:           '#31A56D',
        success:       '#31A56D',
      },
      borderRadius: {
        pill:  '44px',  // ALL CTA/text buttons — never use rounded-md on a button
        card:  '4px',   // cards, table wrappers, panels — NOT 8px, 10px, 12px
        modal: '12px',  // modals and drawers only
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

All buttons use `rounded-pill` (44px). NEVER `rounded-md`, `rounded-lg`, `rounded-full` on a button.

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
  outline: 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50',
  ghost:   'bg-accent/10 text-accent hover:bg-accent/15',
  danger:  'bg-[#dc2626] text-white hover:bg-red-700',
  filter:  'bg-[#e0dff7] text-accent-dark hover:bg-[#d4d2f2]',
}

const sizes: Record<Size, string> = {
  sm:   'h-6 px-3 text-[11px]',
  md:   'h-8 px-4 text-[12px]',
  lg:   'h-10 px-5 text-[14px]',
  icon: 'w-8 h-8 rounded-full p-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors',
        'disabled:opacity-40 disabled:pointer-events-none',
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
type Status   = 'active' | 'resolved' | 'in_progress' | 'pending' | 'open' | 'investigating'

const severityStyles: Record<Severity, string> = {
  critical: 'bg-[#F9EEEE] text-[#D12329]',
  high:     'bg-[#FEF3C7] text-[#D98B1D]',
  medium:   'bg-[#f0f0fc] text-[#6360D8]',
  low:      'bg-[#EFF7ED] text-[#31A56D]',
}

const statusStyles: Record<Status, string> = {
  active:        'bg-[#EFF7ED] text-[#31A56D]',
  open:          'bg-[#F9EEEE] text-[#D12329]',
  investigating: 'bg-[#FEF3C7] text-[#D98B1D]',
  in_progress:   'bg-[#f0f0fc] text-[#6360D8]',
  pending:       'bg-[#FEF3C7] text-[#D98B1D]',
  resolved:      'bg-gray-100 text-gray-500',
}

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] text-[11px] font-semibold',
      severityStyles[severity], className
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  )
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-[3px] text-[11px] font-semibold capitalize',
      statusStyles[status], className
    )}>
      {status.replace('_', ' ')}
    </span>
  )
}
```

---

### KPICard

Max 5 cards in a row (Miller's Law). Content = value + label + trend only.
**NEVER add icons, decorative borders, or colored left/top borders to KPI cards.**

```tsx
// src/components/ui/KPICard.tsx
import { cn } from '@/lib/utils'

interface KPICardProps {
  label: string
  value: string | number
  trend?: { value: string; direction: 'up' | 'down'; positive: boolean }
  className?: string
}

// ❌ DO NOT add icon prop — KPI cards never have icons
// ❌ DO NOT add border-top, border-left, or colored/decorative border
// ❌ DO NOT add box-shadow, gradient backgrounds, or icon decorations
export function KPICard({ label, value, trend, className }: KPICardProps) {
  return (
    <div className={cn(
      'flex flex-col gap-1.5 p-3 bg-white border border-gray-200 rounded-card min-w-0',
      className
    )}>
      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider truncate">{label}</span>
      <span className="text-2xl font-bold text-gray-900 leading-none">{value}</span>
      {trend && (
        <span className={cn(
          'flex items-center gap-1 text-[11px] font-medium',
          trend.positive ? 'text-[#31A56D]' : 'text-[#D12329]'
        )}>
          {trend.direction === 'up'
            ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            : <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          }
          {trend.value} <span className="text-gray-400 font-normal">vs last month</span>
        </span>
      )}
    </div>
  )
}
```

---

### NavItem

Left nav items — always include an SVG icon. Active item gets accent color + left border.

```tsx
// src/components/shell/NavItem.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface NavItemProps {
  label: string
  icon: ReactNode
  active?: boolean
  onClick?: () => void
}

export function NavItem({ label, icon, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-2 rounded-[6px] text-[13px] font-medium transition-colors text-left',
        'border-l-2',
        active
          ? 'bg-accent/8 text-accent border-accent'
          : 'text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-800'
      )}
    >
      <span className={cn('flex-shrink-0 w-4 h-4', active ? 'text-accent' : 'text-gray-400')}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  )
}
```

---

### SubHeader

Sticky content sub-header — sits below topbar, above page body. Contains breadcrumb on the left and primary CTAs on the right.

```tsx
// src/components/shell/SubHeader.tsx
import { ReactNode } from 'react'

interface SubHeaderProps {
  breadcrumb: { label: string; href?: string }[]  // e.g. [{label:'Exposure Management'},{label:'Attack Surface'}]
  title: string
  actions?: ReactNode
}

export function SubHeader({ breadcrumb, title, actions }: SubHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-0.5">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-gray-300">›</span>}
              <span className={i === breadcrumb.length - 1 ? 'text-gray-600 font-medium' : ''}>{crumb.label}</span>
            </span>
          ))}
        </div>
        {/* Page title */}
        <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">{title}</h1>
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      )}
    </div>
  )
}
```

---

### Shell Layout

Full page shell — topbar + left nav + sticky sub-header + content body.
**The topbar is always `bg-topbar` (`#131313`) — it NEVER changes with theme.**

```tsx
// src/components/shell/Shell.tsx
import { ReactNode } from 'react'

interface ShellProps {
  navItems: ReactNode      // use <NavItem> components
  subHeader: ReactNode     // use <SubHeader> component
  children: ReactNode      // page body content
  orgName?: string         // top-right org display name
  userInitials?: string    // avatar initials, default 'U'
}

export function Shell({ navItems, subHeader, children, orgName = 'Org', userInitials = 'U' }: ShellProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-[#F7F9FC]">

      {/* ── Topbar: always #131313, never theme-switched ── */}
      <header className="h-[52px] bg-topbar border-b border-[#272727] flex items-center px-4 gap-3 flex-shrink-0 z-[100]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent rounded flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-white text-[14px] font-semibold">Prevalent AI</span>
          <span className="text-[#444] mx-1">/</span>
          <span className="text-[#888] text-[13px]">Exposure Management</span>
        </div>
        <span className="flex-1" />
        {/* Notification bell */}
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </button>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[12px] font-semibold text-white flex-shrink-0">
          {userInitials}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left nav: white bg, 220px wide ── */}
        <nav className="w-[220px] bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0 flex flex-col py-4 px-3 gap-1">
          {navItems}
        </nav>

        {/* ── Content area ── */}
        <div className="flex-1 overflow-y-auto flex flex-col min-w-0">
          {/* Sticky sub-header */}
          {subHeader}
          {/* Page body */}
          <div className="flex-1 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

### Dialog (Radix)

Destructive-action dialogs must name the item, state the consequence, and use `variant="danger"` on the confirm button. Cancel is always left of Confirm.

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
          'w-full bg-white rounded-modal shadow-xl flex flex-col overflow-hidden',
          sizes[size]
        )}>
          {/* Modal header — grey bg */}
          <div className="flex items-center justify-between px-5 h-[52px] bg-[#f5f5f5] border-b border-gray-200 flex-shrink-0">
            <RadixDialog.Title className="text-[14px] font-semibold text-gray-900">{title}</RadixDialog.Title>
            <RadixDialog.Close className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </RadixDialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 text-[12px] text-gray-600 leading-relaxed">{children}</div>
          {footer && (
            /* Footer: Cancel always LEFT of Confirm */
            <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-gray-100">
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
        'border border-gray-200 rounded-[8px] bg-white text-[12px] text-gray-700',
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
        <RadixSelect.Content className="z-[200] bg-white border border-gray-200 rounded-[6px] shadow-lg overflow-hidden min-w-[160px]">
          <RadixSelect.Viewport className="p-1">
            {options.map(opt => (
              <RadixSelect.Item key={opt.value} value={opt.value}
                className="flex items-center px-3 py-1.5 text-[12px] text-gray-700 rounded cursor-pointer hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent outline-none data-[state=checked]:text-accent data-[state=checked]:font-medium"
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

Checkboxes are always in the leftmost column of tables (Jakob's Law).

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
        <label htmlFor={id} className="text-[12px] text-gray-700 cursor-pointer select-none">{label}</label>
      )}
    </div>
  )
}
```

---

### DataTable

Column order: `[checkbox] → [data cols] → [status] → [actions]`.
Row actions in a dedicated last column (empty `<th>`) — NEVER mixed with status cell.

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
  rowCount?: number   // total count for pagination label
}

export function DataTable<T extends { id: string }>({ columns, data, onRowAction, rowCount }: DataTableProps<T>) {
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
    <div className="border border-gray-200 rounded-[4px] bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {/* Checkbox col — always leftmost (Jakob's Law) */}
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
              {/* Actions col — empty header, dedicated last column */}
              <th className="w-20 px-3 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {sorted.map(row => (
              <tr key={row.id}
                className={cn('border-b border-gray-100 last:border-0 group hover:bg-gray-50 transition-colors', selected.has(row.id) && 'bg-accent/5')}
              >
                <td className="px-3 py-3">
                  <Checkbox id={`row-${row.id}`} checked={selected.has(row.id)} onCheckedChange={() => toggleRow(row.id)} />
                </td>
                {columns.map(col => (
                  <td key={String(col.key)} className="px-3 py-3 text-gray-700 align-middle">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
                {/* Row actions: ALWAYS in own col, NEVER mixed with status — revealed on group-hover */}
                <td className="px-3 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onRowAction?.('view', row)}
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button onClick={() => onRowAction?.('delete', row)}
                      className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 text-gray-400 hover:text-red-500">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination footer — always present, bottom-right (Jakob's Law) */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 text-[11px] text-gray-400">
        <span>Showing 1–{data.length} of {rowCount ?? data.length}</span>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40" disabled>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span className="w-7 h-7 rounded bg-accent text-white flex items-center justify-center text-[11px] font-medium">1</span>
          <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

### Tabs (Radix)

Only use tabs when explicitly requested — do NOT infer tabs from page names.

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
            className="px-4 py-2 text-[12px] font-medium text-gray-500 border-b-2 border-transparent -mb-px hover:text-gray-700 transition-colors data-[state=active]:text-accent data-[state=active]:border-accent"
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

### React Rules (apply without being asked)

1. **All CTA/text buttons use `rounded-pill` (44px)** — never `rounded-md`, `rounded-lg`, `rounded-full` on a button.
2. **Accent is always `bg-accent` / `text-accent` (`#6360D8`)**. Filter CTA uses `accent-dark` (`#504bb8`).
3. **Topbar is always `bg-topbar` (`#131313`)** — never theme-switched, never any other colour.
4. **Inter font** — set in `tailwind.config.ts` `fontFamily.sans` and load via Google Fonts link.
5. **Status is never tooltip-only** — `SeverityBadge` / `StatusBadge` must be visible in default table columns.
6. **Tables over cards** for list data — `DataTable` for items, `KPICard` only for aggregate metrics.
7. **Row actions always in a dedicated last column** — never mixed with status badge or any other cell content. Empty `<th>` header.
8. **KPI cards never have icons** — content = value + label + trend only. No icon prop, no decorative borders, no box-shadow.
9. **Destructive confirm** — wrap delete actions in a `Dialog` with item name, consequence text, and `variant="danger"` confirm button. Cancel is left of Confirm.
10. **KPI rows: max 5 cards** (Miller's Law).
11. **Table columns: 5–7 visible by default** — extras opt-in via Add Column.
12. **Never infer tabs** — only add `<Tabs>` when the user explicitly asks for a tabbed layout.
13. **Nav items always have icons** — use `<NavItem icon={...} label="..." active={...} />` for every left nav item.
14. **Sub-header always uses `<SubHeader>`** — never freeform the sticky header.
15. **Radix package names:**
    - Dialog → `@radix-ui/react-dialog`
    - Select → `@radix-ui/react-select`
    - Checkbox → `@radix-ui/react-checkbox`
    - Tabs → `@radix-ui/react-tabs`
    - DropdownMenu → `@radix-ui/react-dropdown-menu`
    - Popover → `@radix-ui/react-popover`
16. **Border radius:**
    - Buttons → `rounded-pill` (44px)
    - Cards / table wrappers / panels → `rounded-card` (4px)
    - Modals / drawers → `rounded-modal` (12px)
    - Inputs / selects → `rounded-[8px]`
    - Badges / tags → `rounded-[3px]`
17. **No inline styles** except the Navigator gradient text.
18. **Output individual component files** — one component per file, named exactly as shown, placed in `src/components/ui/` or `src/components/shell/`.
