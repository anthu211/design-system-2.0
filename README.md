# Prevalent AI Design System

Internal component library and reference dashboard.

## Purpose
- QA team reference UI components
- Developers reuse components
- Editable UI for admins

## Stack
Frontend: HTML / CSS / JS  
Backend: Node.js + Express  

## Run locally

Frontend
Open index.html with Live Server

Backend
cd backend
npm install
node server.js

---

## Document Skills

The `document-skills/` folder extends the design system to offline document outputs — branded `.docx` reports, `.pptx` pitch decks, and internal memos.

### Available skills

| Skill | Output | Template location |
|---|---|---|
| `document-skill` | `.docx` — reports, memos, assessments | `document-skills/document-skill/templates/` |
| `pitch-deck-skill` | `.pptx` executive presentation | `document-skills/pitch-deck-skill/templates/` |

### How to use with Claude Code

Give Claude a prompt describing the document you need and the content to fill it with. Claude reads the relevant `SKILL.md`, loads the branded template, fills placeholders, and saves the output — without restyling the template.

Example:
```
Generate a vendor risk report for Acme Corp. Use the report-skill.
Findings: [your findings here]
```

### Brand consistency

All skills share the same design tokens as the web platform — colors, typography, and spacing are sourced from `ds/tokens/` and translated for Office documents in `document-skills/shared/brand-tokens.md`.

See [`document-skills/README.md`](document-skills/README.md) for full documentation.
