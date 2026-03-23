Fetch these URLs fully before doing anything:

1. https://anthu211.github.io/design-system-2.0/spec.md
2. https://anthu211.github.io/design-system-2.0/ux-context.md

---

Review this screen against the Prevalent AI design system and UX laws:

$ARGUMENTS

---

Return a `✅ PASS` / `❌ FAIL` checklist. For every FAIL, give the exact fix (value, property, or pattern name).

## Shell & Structure
- [ ] Topbar + left nav + sub-header + content body present
- [ ] Topbar is `#131313`
- [ ] Sub-header is sticky with title + breadcrumb

## Tokens & Styling
- [ ] Accent `#6360D8` · Filter CTA `#504bb8`
- [ ] All buttons `border-radius:44px` (pill)
- [ ] Inter font · `<html class="theme-light">`
- [ ] Spacing on 4px scale only

## Components
- [ ] Status/severity visible in table — not tooltip-only
- [ ] List data in tables, not cards
- [ ] KPI cards ≤ 5 in a row
- [ ] Table columns ≤ 7 default
- [ ] Destructive actions have confirmation modal
- [ ] Error states have text message, not just red border

## UX Laws
- [ ] Hick's: 1 primary CTA per section · nav collapsed by default
- [ ] Fitts's: row actions on hover · CTAs min 32px · controls in sub-header
- [ ] Miller's: ≤5 KPIs · ≤7 nav items · ≤7 table columns
- [ ] Jakob's: checkboxes leftmost · Cancel left of Confirm · pagination bottom-right

## Persona
- [ ] Layout matches persona's primary goals (state which persona)
- [ ] No frustration triggers for that persona

---

**Summary**: X PASS · X FAIL · most critical fix (if any)
