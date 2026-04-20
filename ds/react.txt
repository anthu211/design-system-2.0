# Prevalent AI — React / Developer Reference

Stack: React 18 + TypeScript + Tailwind CSS + Radix UI + Lucide React + Recharts. Read `ds-core.txt` alongside this file for tokens, rules, and personas.

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

Left nav items — always include an SVG icon. Active item gets accent color. Supports `collapsed` prop (icon-only mode when sidebar is collapsed).

```tsx
// src/components/shell/NavItem.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface NavItemProps {
  label: string
  icon: ReactNode
  active?: boolean
  collapsed?: boolean   // true when sidebar is collapsed — renders icon only
  onClick?: () => void
}

export function NavItem({ label, icon, active, collapsed, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={cn(
        'w-full flex items-center gap-2 rounded-[6px] text-[12px] font-medium transition-colors text-left border-none cursor-pointer',
        collapsed ? 'justify-center p-2' : 'px-3 py-2',
        active
          ? 'bg-[rgba(99,96,216,0.08)] text-[#6360D8]'
          : 'bg-transparent text-[#6e6e6e] hover:bg-[rgba(0,0,0,0.04)] hover:text-[#101010]'
      )}
    >
      <span className={cn('flex-shrink-0 w-4 h-4', active ? 'text-[#6360D8]' : 'text-[#9ca3af]')}>
        {icon}
      </span>
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  )
}
export default NavItem
```

---

### SubHeader

Sticky content sub-header — sits directly below the topbar. Left: page title (12px) + breadcrumb (11px). Right: Explore In button → spacer → Add (+) circle → Active Filters popover → divider → Filter button.
**NEVER use an `<h1>` or 18px title here — the title is 12px/500.**

```tsx
// src/components/shell/SubHeader.tsx
import { useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ActiveFilter {
  id: string
  label: string       // e.g. "Severity"
  values: string[]    // e.g. ["Critical", "High"]
}

interface SubHeaderProps {
  title: string
  breadcrumb: { label: string }[]   // [{label:'Dashboard'},{label:'Attack Surface'}]
  activeFilters?: ActiveFilter[]
  onRemoveFilter?: (id: string) => void
  onClearFilters?: () => void
  onFilterClick?: () => void
  onAddClick?: () => void
  exploreLabel?: string
}

export function SubHeader({
  title,
  breadcrumb,
  activeFilters = [],
  onRemoveFilter,
  onClearFilters,
  onFilterClick,
  onAddClick,
  exploreLabel = 'Explore in',
}: SubHeaderProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6] rounded-b-[8px] px-4 py-3 flex items-center gap-2.5 flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">

      {/* Left: title + breadcrumb */}
      <div className="min-w-0">
        <div className="text-[12px] font-medium text-[#101010] whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
          {title}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#9ca3af] whitespace-nowrap mt-0.5">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-[#d1d5db]">›</span>}
              <span className={i === breadcrumb.length - 1 ? 'text-[#6360D8]' : ''}>
                {crumb.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Explore in */}
      <button className="border border-[#e6e6e6] rounded-[44px] text-[#6e6e6e] text-[12px] px-3.5 py-[7px] flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 bg-transparent cursor-pointer hover:bg-gray-50 transition-colors">
        {exploreLabel}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <span className="flex-1" />

      {/* Add button — circle accent */}
      <button
        onClick={onAddClick}
        className="w-8 h-8 rounded-full bg-[#6360D8] border-none text-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-[#504bb8] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      {/* Active Filters pill + hover popover */}
      {activeFilters.length > 0 && (
        <div
          className="relative flex-shrink-0"
          onMouseEnter={() => setShowFilters(true)}
          onMouseLeave={() => setShowFilters(false)}
        >
          <button className="border border-[#504bb8] rounded-[44px] text-[#504bb8] text-[12px] font-medium px-3.5 py-[7px] flex items-center gap-1.5 whitespace-nowrap bg-transparent cursor-pointer">
            Active Filters
            <span className="bg-[#504bb8] text-white text-[10px] font-semibold min-w-[16px] h-4 rounded-[44px] flex items-center justify-center px-1">
              {activeFilters.length}
            </span>
          </button>

          {showFilters && (
            <div className="absolute top-[calc(100%+8px)] left-0 z-[250] bg-white border border-[#e6e6e6] rounded-[8px] p-3.5 min-w-[300px] shadow-[0_8px_28px_rgba(0,0,0,0.14)]">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#6e6e6e] mb-2.5">
                Active Filters
              </div>
              <div className="flex flex-col gap-1.5">
                {activeFilters.map(f => (
                  <div key={f.id} className="inline-flex items-center gap-1.5 bg-[#f5f5f5] rounded-[8px] px-2 py-1 text-[12px] border border-[#e6e6e6]">
                    <span className="text-[#6e6e6e] font-medium">{f.label}</span>
                    {f.values.map((v, i) => (
                      <span key={i} className="bg-white rounded-[4px] px-1.5 py-px text-[#101010]">{v}</span>
                    ))}
                    <button
                      onClick={() => onRemoveFilter?.(f.id)}
                      className="text-[#9ca3af] text-[13px] leading-none hover:text-[#6e6e6e] ml-0.5 bg-transparent border-none cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={onClearFilters}
                className="mt-2.5 text-[12px] font-medium text-[#6360D8] cursor-pointer bg-transparent border-none p-0 font-[inherit] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="w-px h-5 bg-[#e6e6e6] flex-shrink-0" />

      {/* Filter button */}
      <button
        onClick={onFilterClick}
        className="bg-[#e0dff7] border-none rounded-[44px] text-[#504bb8] text-[12px] font-medium px-3.5 py-[7px] flex-shrink-0 cursor-pointer hover:bg-[#d4d2f2] transition-colors"
      >
        Filter
      </button>
    </div>
  )
}
export default SubHeader
```

---

### Shell Layout

Full page shell — topbar + collapsible left nav + sticky sub-header + content body.

**Topbar structure (left → right):** PAI logo image → flex spacer → "Last Updated" text → bell button → avatar circle → Navigator gradient button.
**Nav header shows workspace/context name (e.g. "EM Dashboard") + "Exposure Management" subtitle. NEVER "Prevalent AI" — that is the topbar logo only.**
**The topbar is always `#131313` — never theme-switched.**

Left nav collapses to 52px icon-only on toggle; hovers back to 220px when collapsed.

```tsx
// src/components/shell/Shell.tsx
import { useState, ReactNode } from 'react'
import { NavItem } from './NavItem'

interface NavItemDef {
  label: string
  icon: ReactNode
  active?: boolean
  onClick?: () => void
}

interface ShellProps {
  navItems: NavItemDef[]
  subHeader: ReactNode
  children: ReactNode
  orgLabel?: string       // nav header workspace/context name — default 'EM Dashboard', NOT 'Prevalent AI'
  orgSub?: string         // nav header subtitle — default 'Exposure Management'
  userInitials?: string   // avatar initials — default 'A'
  lastUpdated?: string    // topbar timestamp — default 'Just now'
}

export function Shell({
  navItems,
  subHeader,
  children,
  orgLabel = 'EM Dashboard',
  orgSub = 'Exposure Management',
  userInitials = 'A',
  lastUpdated = 'Just now',
}: ShellProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Expanded when: not collapsed, OR collapsed but hovering
  const isExpanded = !collapsed || hovered

  const handleCollapseToggle = () => {
    setCollapsed(c => !c)
    setHovered(false)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans bg-[#F7F9FC]">

      {/* ── Topbar: always #131313 ── */}
      <header
        className="h-[52px] flex-shrink-0 z-[100] flex items-center px-4 gap-3"
        style={{ background: '#131313', borderBottom: '1px solid #272727' }}
      >
        {/* PAI logo — use actual SVG asset, never a placeholder box */}
        <img
          src="https://pai-ux.netlify.app/icons/pai-logo.svg"
          height={26}
          alt="Prevalent AI"
        />
        <span className="flex-1" />
        {/* Last updated timestamp */}
        <span className="text-[12px] text-[#9ca3af]">Last Updated: {lastUpdated}</span>
        {/* Notification bell */}
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#9ca3af] hover:bg-white/10 transition-colors border-none bg-transparent cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        {/* Avatar circle */}
        <div className="w-8 h-8 rounded-full bg-[#6360D8] flex items-center justify-center text-[12px] font-semibold text-white flex-shrink-0 select-none">
          {userInitials}
        </div>
        {/* Navigator gradient button */}
        <button className="inline-flex items-center justify-center h-6 px-3 rounded-[44px] text-[12px] font-medium border border-[#b1b8f5] bg-transparent hover:bg-[rgba(177,184,245,0.12)] transition-colors cursor-pointer">
          <span style={{
            background: 'linear-gradient(to right,#467fcd,#47adcb)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
            Navigator
          </span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Left nav: white, collapsible ── */}
        <nav
          onMouseEnter={() => collapsed && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: isExpanded ? '220px' : '52px',
            padding: isExpanded ? '16px' : '8px',
            transition: 'width 0.22s ease, padding 0.22s ease',
            flexShrink: 0,
            background: '#ffffff',
            borderRight: '0.5px solid #d8d9dd',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {/* Nav header: org name + collapse toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: isExpanded ? '0 8px 8px 12px' : '0 0 8px',
            borderBottom: isExpanded ? '1px solid #467fcd' : 'none',
            marginBottom: isExpanded ? '12px' : '8px',
            flexShrink: 0,
          }}>
            {isExpanded && (
              <div>
                <div className="flex items-center gap-1 text-[14px] font-medium text-[#101010]">
                  {orgLabel}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                <div className="text-[12px] text-[#6e6e6e] mt-0.5">{orgSub}</div>
              </div>
            )}
            {/* Collapse / expand toggle */}
            <button
              onClick={handleCollapseToggle}
              className="flex items-center justify-center text-[#6e6e6e] hover:text-[#101010] transition-colors bg-transparent border-none cursor-pointer p-0"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
                {!isExpanded
                  ? <polyline points="11 8 15 12 11 16"/>
                  : <polyline points="15 8 11 12 15 16"/>
                }
              </svg>
            </button>
          </div>

          {/* Nav items */}
          <div className="flex flex-col gap-0.5 flex-1">
            {navItems.map((item, i) => (
              <NavItem
                key={i}
                label={item.label}
                icon={item.icon}
                active={item.active}
                collapsed={!isExpanded}
                onClick={item.onClick}
              />
            ))}
          </div>
        </nav>

        {/* ── Content area ── */}
        <div className="flex-1 overflow-y-auto flex flex-col min-w-0">
          {subHeader}
          <div className="flex-1 p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
export default Shell
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

1. **All CTA/text buttons use `rounded-[44px]` (pill)** — never `rounded-md`, `rounded-lg`, `rounded-full` on a button.
2. **Accent is `#6360D8`**. Filter / Active Filters CTA is `#504bb8`. Never use other purples.
3. **Topbar is always `#131313`** — never theme-switched, never any other colour.
4. **Topbar content (left → right):** PAI logo `<img>` → flex spacer → "Last Updated" text → bell → avatar → Navigator gradient button. NO text branding in the topbar other than the logo image.
5. **Nav header shows the workspace/context name** (e.g. `"EM Dashboard"`) with dropdown chevron + `"Exposure Management"` subtitle. NEVER "Prevalent AI" — that is only the logo in the topbar. Use `orgLabel` prop on `<Shell>` (default `'EM Dashboard'`).
6. **Left nav is collapsible** — collapses to 52px icon-only on toggle, hovers back to 220px. Use `<Shell>` with `navItems` array; it manages collapse state internally.
7. **Nav items always have icons** — pass `icon={<SomeLucideIcon size={16}/>}` to every `NavItem`. Never a nav item without an icon.
8. **Sub-header always uses `<SubHeader>`** — never freeform the sticky header. It handles breadcrumb, Add button, ActiveFilters popover, and Filter button.
9. **SubHeader title is 12px/500** — never an `<h1>`, never 18px or larger for the sub-header title.
10. **ActiveFilters popover** — pass `activeFilters` array to `<SubHeader>`; the component renders the hover popover automatically.
11. **KPI cards never have icons** — content = value + label + trend only. No icon prop, no decorative borders, no box-shadow.
12. **KPI rows: max 5 cards** (Miller's Law).
13. **Tables over cards** for list data — `DataTable` for items, `KPICard` only for aggregate metrics.
14. **Table column order:** `[checkbox] → [data cols] → [status] → [actions]`. Max 7 columns.
15. **Row actions always in a dedicated last column** — never mixed with status badge or any other cell content. Empty `<th>` header. Hidden by default, `group-hover:opacity-100`.
16. **Status is never tooltip-only** — `SeverityBadge` / `StatusBadge` must be visible in default table columns.
17. **Never infer tabs** — only add `<Tabs>` when the user explicitly asks for a tabbed layout.
18. **Destructive confirm** — wrap delete actions in a `Dialog` with item name, consequence text, and `variant="danger"` confirm button. Cancel is left of Confirm.
19. **Inter font** — set in `tailwind.config.ts` `fontFamily.sans` and load via Google Fonts link.
20. **Border radius:**
    - Buttons → `rounded-[44px]`
    - Cards / table wrappers / panels → `rounded-[4px]`
    - Modals / drawers → `rounded-[12px]`
    - Inputs / selects → `rounded-[8px]`
    - Badges / tags → `rounded-[3px]`
21. **Spacing:** `p-1 p-2 p-3 p-4 p-5 p-6 p-8` only — never `p-2.5`, `p-3.5`, `p-7`, or arbitrary values.
22. **Radix package names:**
    - Dialog → `@radix-ui/react-dialog`
    - Select → `@radix-ui/react-select`
    - Checkbox → `@radix-ui/react-checkbox`
    - Tabs → `@radix-ui/react-tabs`
    - DropdownMenu → `@radix-ui/react-dropdown-menu`
    - Popover → `@radix-ui/react-popover`
23. **Output individual component files** — one component per file, named exactly as shown, placed in `src/components/ui/` or `src/components/shell/`. Always export both named and default.
