Fetch ALL of these URLs fully before doing anything:
1. https://anthu211.github.io/design-system-2.0/ds/rules.json
2. https://anthu211.github.io/design-system-2.0/ds/tokens/colors.json
3. https://anthu211.github.io/design-system-2.0/ds/tokens/spacing.json
4. https://anthu211.github.io/design-system-2.0/ds/tokens/typography.json
5. https://anthu211.github.io/design-system-2.0/ds/components/buttons.json
6. https://anthu211.github.io/design-system-2.0/ds/components/tables.json
7. https://anthu211.github.io/design-system-2.0/ds/components/badges.json
8. https://anthu211.github.io/design-system-2.0/ds/components/modals.json
9. https://anthu211.github.io/design-system-2.0/ds-core.txt

Do not proceed until every URL above is fully fetched and read.

---

Review this screen against the Prevalent AI design system and UX laws:

$ARGUMENTS

---

Return a `✅ PASS` / `❌ FAIL` checklist using the fetched files as the source of truth. For every FAIL, give the exact fix referencing the specific rule or token.

## Shell & Structure
- [ ] Topbar `#131313` with PAI logo image — no "Prevalent AI" text
- [ ] Nav header shows workspace name, not "Prevalent AI"
- [ ] Left nav + sticky sub-header + content body present
- [ ] Sub-header title 12px/500 (not `<h1>` or 18px), breadcrumb 11px below

## Tokens & Styling
- [ ] Accent `#6360D8` · Filter CTA `#504bb8`
- [ ] All CTA/text buttons `border-radius:44px`
- [ ] Cards, table wrappers `border-radius:4px` only
- [ ] Inter font · `<html class="theme-light">`
- [ ] Spacing 4px scale only for margin, padding, gap — flag off-scale values there only. border-radius is NOT spacing and is not restricted to the 4pt grid.

## Tables
- [ ] Column order: checkbox → data → status → actions (empty `<th>`)
- [ ] Row actions in own `col-actions` cell — NOT mixed with status badge
- [ ] Row actions CSS-hidden by default — no `style="display:flex"` inline
- [ ] Status/severity visible in column — not tooltip-only
- [ ] Pagination footer present

## Components
- [ ] KPI cards ≤ 5, no icons, no colored borders, correct delta classes
- [ ] Table columns ≤ 7
- [ ] Destructive actions have confirmation modal (item name + consequence + red confirm)
- [ ] No page-level tabs unless explicitly requested
- [ ] Error/empty states present where needed

## UX Laws
- [ ] Hick's: 1 primary CTA per section
- [ ] Fitts's: row actions on hover, min 32px height on controls
- [ ] Miller's: ≤5 KPIs · ≤7 table columns
- [ ] Jakob's: checkboxes leftmost · Cancel left of Confirm

## Persona
- [ ] Layout matches primary persona (state which one)
- [ ] No frustration triggers for that persona

---

**Summary**: X PASS · X FAIL · most critical fix
