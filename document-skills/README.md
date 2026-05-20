# Document Skills

Branded document generation skills for Prevalent AI. These skills enable Claude Code / Claude Cowork to generate `.docx` and `.pptx` files that are consistent with the Prevalent AI brand — using the same design tokens as the web design system.

---

## Purpose

The web design system (`ds/`) defines the visual language for the Prevalent AI platform (colors, typography, spacing). This folder extends that language to **offline document outputs** — Word documents and PowerPoint decks — so that all customer-facing and internal documents are visually and tonally consistent.

---

## Folder structure

```
document-skills/
├── README.md                        ← this file
├── shared/
│   ├── brand-tokens.md              ← colors, fonts, spacing — mirrored from ds/tokens/
│   └── voice-and-tone.md            ← writing style guidelines for all document types
├── document-skill/
│   ├── SKILL.md                     ← skill definition for all .docx generation
│   ├── templates/                   ← upload the .docx template file here
│   └── examples/                   ← example generated documents (for reference)
└── pitch-deck-skill/
    ├── SKILL.md                     ← skill definition for .pptx generation
    ├── templates/                   ← Template_PAI_Presentation (2).pptx + PPT graphics.pptx
    └── examples/                   ← example generated decks (for reference)
```

---

## How these skills work

Each skill folder contains a `SKILL.md` that tells Claude:

- **When to invoke** this skill (and when not to)
- **Which template file** to load — skills always fill a template, never generate from scratch
- **Hard guardrails** — brand colors, fonts, and structural rules
- **Content structure** — required sections, slide order, placeholder names
- **Generation approach** — python-docx / python-pptx code patterns

When Claude is asked to generate a document, it reads the relevant `SKILL.md`, loads the template, fills the designated placeholders, and saves the output — without restyling or recreating the document structure.

---

## How to use with Claude Code

1. Ensure the template file is uploaded to the relevant `templates/` folder.
2. Give Claude the content (findings, data, talking points).
3. Claude will:
   - Read the `SKILL.md` for the relevant document type
   - Load the template using python-docx or python-pptx
   - Fill placeholders with your content
   - Apply brand-consistent styling for any dynamic elements (charts, status badges)
   - Save the output file

**Example prompts:**

```
Generate a vendor risk report for Acme Corp with these findings: [...]
```

```
Create a 10-slide executive pitch deck for the Q3 board meeting.
```

```
Write a memo to the InfoSec team about the new vendor access policy.
```

---

## Brand token source of truth

The shared tokens in `shared/brand-tokens.md` are derived from:

- `ds/tokens/colors.json` — color palette and semantic roles
- `ds/tokens/typography.json` — type scale and font family
- `ds/tokens/spacing.json` — spacing scale and component defaults

**Do not define new brand values in this folder.** If the design system tokens change, update `shared/brand-tokens.md` to match.

---

## How to add a new skill

1. Create a new folder: `document-skills/[skill-name]/`
2. Add sub-folders: `templates/`, `examples/`
3. Copy the structure from an existing `SKILL.md` and adapt it.
4. Upload the branded template file into `templates/`.
5. Inspect the template to fill in the `<!-- TEMPLATE_DETAILS -->` placeholders in `SKILL.md`.
6. Add an entry to this README.

Do not add anything to `.claude/` until the template has been inspected and the `SKILL.md` is fully populated.

---

## Skill status

| Skill | Output | Template | SKILL.md | Status |
|---|---|---|---|---|
| document-skill | `.docx` | ✅ Inspected | ✅ Complete | Ready |
| pitch-deck-skill | `.pptx` | ✅ Inspected | ✅ Complete | Ready |
