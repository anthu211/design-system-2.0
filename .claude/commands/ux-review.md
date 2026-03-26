Fetch this URL before doing anything:

https://anthu211.github.io/design-system-2.0/ds-core.md

---

Review this screen against the Prevalent AI design system and UX laws:

$ARGUMENTS

---

Return a `✅ PASS` / `❌ FAIL` checklist using `ds-core.md` as the source of truth. For every FAIL, give the exact fix.

## Shell & Structure
- [ ] Topbar `#131313` with PAI logo image — no "Prevalent AI" text in topbar
- [ ] Nav header shows workspace name (e.g. "EM Dashboard"), not "Prevalent AI"
- [ ] Left nav + sticky sub-header + content body present
- [ ] Sub-header title 12px/500 (not `<h1>` or 18px), breadcrumb 11px below

## Tokens & Styling
- [ ] Accent `#6360D8` · Filter/ActiveFilters CTA `#504bb8`
- [ ] All CTA/text buttons `border-radius:44px` — no 6/8/12px
- [ ] Cards, table wrappers `border-radius:4px` only
- [ ] Inter font · `<html class="theme-light">`
- [ ] Spacing 4px scale only — none of: 3, 5, 6, 7, 10, 11, 13, 15px

## Tables
- [ ] Column order: checkbox → data cols → status → actions (empty `<th>`)
- [ ] Row actions in own `col-actions` cell — NOT mixed with status badge
- [ ] Row actions CSS-hidden by default — no `style="display:flex"` inline
- [ ] Status/severity visible in default column — not tooltip-only
- [ ] Pagination footer present

## Components
- [ ] List data in tables, not cards
- [ ] KPI cards ≤ 5 per row, no icons, no colored borders
- [ ] Table columns ≤ 7 default
- [ ] Destructive actions have confirmation modal (item name + consequence + red confirm)
- [ ] No page-level tabs unless explicitly requested
- [ ] Error/empty states follow correct pattern from ds-core.md

## UX Laws
- [ ] Hick's: 1 primary CTA per section
- [ ] Fitts's: row actions on hover, min 32px height on all interactive controls
- [ ] Miller's: ≤5 KPIs · ≤7 table columns
- [ ] Jakob's: checkboxes leftmost · Cancel left of Confirm · pagination bottom-right

## Persona
- [ ] Layout matches primary persona's goals (state which persona)
- [ ] No frustration triggers for that persona

---

**Summary**: X PASS · X FAIL · most critical fix (if any)
