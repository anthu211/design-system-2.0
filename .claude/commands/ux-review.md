Review this screen against the Prevalent AI design system and UX laws:

$ARGUMENTS

---

Return a `✅ PASS` / `❌ FAIL` checklist. For every FAIL, give the exact fix (value, property, or pattern name).

## Shell & Structure
- [ ] Topbar is `#131313` with PAI logo image (no "Prevalent AI" text in topbar)
- [ ] Nav header shows workspace name — not "Prevalent AI"
- [ ] Left nav + sub-header + content body present
- [ ] Sub-header: title 12px/500, breadcrumb 11px, ActiveFilters popover, Filter button

## Tokens & Styling
- [ ] Accent `#6360D8` · Filter/ActiveFilters CTA `#504bb8`
- [ ] All CTA/text buttons `border-radius:44px` (pill)
- [ ] Cards, table wrappers `border-radius:4px` only
- [ ] Inter font · `<html class="theme-light">`
- [ ] Spacing on 4px scale only (never 3, 5, 6, 10, 13, 15px)

## Tables
- [ ] Column order: checkbox → data cols → status → actions (last, empty `<th>`)
- [ ] Row actions in own `col-actions` cell — never mixed with status badge
- [ ] Row actions hidden by default, CSS-revealed on `tr:hover`
- [ ] Status/severity visible in table — not tooltip-only
- [ ] Pagination footer present

## Components
- [ ] List data in tables not cards
- [ ] KPI cards ≤ 5 in a row, no icons, no colored borders
- [ ] Table columns ≤ 7 default
- [ ] Destructive actions have confirmation modal (item name + consequence + red confirm)
- [ ] No page-level tabs unless explicitly requested

## UX Laws
- [ ] Hick's: 1 primary CTA per section · nav collapsed default for dense screens
- [ ] Fitts's: row actions on hover · CTAs min 32px height
- [ ] Miller's: ≤5 KPIs · ≤7 table columns
- [ ] Jakob's: checkboxes leftmost · Cancel left of Confirm · pagination bottom-right

## Persona
- [ ] Layout matches persona's primary goals (state which persona)
- [ ] No frustration triggers for that persona

---

**Summary**: X PASS · X FAIL · most critical fix (if any)
