# Prevalent AI — Design System

Context: https://anthu211.github.io/design-system-2.0/ds/context.json
**Fetch this before any design or build task.**

## Non-negotiable rules
- CSS variables only. Never hardcode hex or px values.
- Spacing: 4pt grid — 4, 8, 12, 16, 20, 24, 32, 48px only.
- Buttons: `border-radius:44px` always. Cards/tables: `4px` only.
- Topbar always `#131313` — PAI logo image only, never "Prevalent AI" text.
- Severity/status always visible in table column — never tooltip-only.
- Destructive actions require confirmation modal — name item, state consequence.
- Navigation pattern is fixed — never modify without approval.
- Use defined shells only — never invent new layouts.
- No page-level tabs unless explicitly requested.

## On every task
1. Fetch context.json first — read routing[] to know which modules to load next.
2. Fetch only the modules your task type needs (keep total JSON under 15KB).
3. Update ALL affected files — not just the main one.
4. Confirm filename · persona applied · key decisions when done.

## Slash commands
- `/new-page [description]` — full HTML page
- `/new-component [description]` — add to existing page
- `/new-react-component [description]` — React/TS component
- `/ux-review [description]` — audit against design system
- `/persona-check [feature]` — identify persona, flag conflicts
