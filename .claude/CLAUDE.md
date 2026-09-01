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
1. Use `/ds [task]` for all design and build tasks — the command has the full DS embedded, no fetching needed.
2. For ad-hoc tasks (no slash command): the full DS context is in `.claude/commands/ds.md` — read it if needed.
3. Update ALL affected files — not just the main one.
4. Confirm filename · persona applied · key decisions when done.

## Slash commands — Design System (UX / web)
- `/ds new page [description]` — full HTML page
- `/ds new component [description]` — add component to existing page
- `/ds new react component [description]` — React/TS component
- `/ds ux review [description]` — audit against design system
- `/ds persona check [feature]` — identify persona, flag conflicts
- `/ds audit [file]` — code-level DS audit: hardcoded values, token drift, state violations, component misuse

All DS context (tokens, shell template, component patterns, chart functions) is embedded in `.claude/commands/ds.md`. Update that file when the DS updates.

## Slash commands — Document Generation (Word / PowerPoint)
- `/generate-deck [description]` — generate branded .pptx; auto-selects Pitch Deck (sales/executive) or Proposal Deck (client proposal/engagement) based on description
- `/generate-doc [description]` — generate branded .docx using the PAI Word template

Rules for document commands:
- Always read the relevant SKILL.md before generating (`document-skills/pitch-deck-skill/SKILL.md` or `document-skills/document-skill/SKILL.md`)
- Use the real template files — never generate from scratch
- Save output to `document-skills/downloads/output/`
- See `document-skills/downloads/README.md` for setup instructions
