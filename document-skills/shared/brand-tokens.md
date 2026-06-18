# Prevalent AI — Brand Tokens for Document Generation

**Scope:** Word (.docx) and PowerPoint (.pptx) documents only.
**These are NOT the web DS colors.** Web DS uses `#6360D8` etc. — those must never appear in generated documents.

---

## Colors

### Primary document palette

| Role | Hex | Usage in documents |
|---|---|---|
| Primary brand dark (dk1) | `#372355` | Cover titles, dark backgrounds, **table header row fill** |
| Dark purple (accent1) | `#4D2E58` | H1–H4 headings, subtitles, section header text |
| Medium purple (accent2) | `#81718F` | Supporting text on dark backgrounds |
| Slate (accent3) | `#959AA8` | H3 headings, captions, TOC heading |
| Light slate (accent4) | `#C4C6CE` | Subtle fills, borders, alternating row tints |
| Deep red-orange (accent5) | `#BB4728` | Emphasis, alerts, critical callouts |
| Orange-red (accent6) | `#D25B30` | Hyperlinks, secondary emphasis |
| Black (dk2) | `#000000` | Body text |
| White (lt1) | `#FFFFFF` | Text on dark backgrounds, table header text |

### Table heading fill — critical rule

> **Table header row background MUST be `#372355`.** Apply via `w:shd fill` XML directly — do not use theme color references, they resolve incorrectly. White (`#FFFFFF`) text on top using `Table Heading - 10pt` style.

### Severity / Status palette

| Severity | Text | Background | Usage |
|---|---|---|---|
| Critical | `#D12329` | `#F9EEEE` | Risk badges, critical findings |
| High | `#D98B1D` | `#FEF3C7` | High-risk items |
| Medium | `#6360D8` | `#F0F0FC` | Medium-risk items (web accent — only for status badges, not headings/fills) |
| Low | `#31A56D` | `#EFF7ED` | Low-risk / positive status |

---

## Typography

**Word / PowerPoint font:** Calibri Light (headings) / Calibri (body)
**Never use:** Arial, Times New Roman, Inter, or any web font

### Type scale (pt for Office)

| Role | Size | Weight | Usage |
|---|---|---|---|
| Cover title | 42pt | Bold | Cover page main title (`Title - 42pt`) |
| Interior page title | 28pt | Regular | Interior page title (`Title - 28pt`) |
| Subtitle | 18pt | Regular | Cover subtitle (`Subtitle - 18pt`) |
| Heading 1 | 14pt | Regular | Major section headings |
| Heading 2 | 12pt | Regular | Sub-section headings |
| Heading 3 | 10pt | Bold | Sub-sub-section headings |
| Body copy | 10pt | Regular | All body paragraphs |
| Table heading | 10pt | Regular (Calibri Light) | Column headers — white on `#372355` |
| Table body | 10pt | Regular | Table body cells |
| Caption | 6.5pt | Regular | Figure / table captions |

---

## Spacing (4pt grid — translated to pt for Office)

| Token | px | Office pt |
|---|---|---|
| xs | 4px | 3pt |
| sm | 8px | 6pt |
| md | 12px | 9pt |
| lg | 16px | 12pt |
| xl | 20px | 15pt |
| 2xl | 24px | 18pt |
| 3xl | 32px | 24pt |
| 4xl | 48px | 36pt |

---

## Logo rules

- Always use the PAI logo as an **image** — never type "Prevalent AI" as text in logo position.
- On dark backgrounds (cover, section dividers): use the white/reversed logo variant.
- Minimum clear space: 16px (12pt) on all sides.
- Never resize below minimum or distort proportions.

---

## Chart series color order

1. `#372355` — Primary
2. `#4D2E58` — Secondary
3. `#D25B30` — Accent
4. `#BB4728` — Alert
5. `#81718F` — Supporting
6. `#959AA8` — Neutral

Never use Office's default chart color scheme.

---

## Border radius

| Element | Document rule |
|---|---|
| Tables | Square corners — Office default, no radius |
| Callout boxes | 0.05" rounded corner or square |
| Status badges | Colored cell shading only — no shape outlines |

---

## What NOT to do

- Never use web DS colors (`#6360D8`, `#504BB8`, `#131313` etc.) in documents — those are for the web platform only.
- Never hardcode colors outside this palette.
- Never use Arial, Times New Roman, or Inter as document fonts.
- Never recreate a document from scratch — always fill the provided template.
- Never restyle template elements; only fill placeholders with content.
