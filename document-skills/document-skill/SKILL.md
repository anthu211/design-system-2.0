# Skill: Document Generation (.docx)

## Name
`document-skill`

## Description
Generates branded Prevalent AI Word documents (.docx) by filling a pre-defined template with structured content. Use this skill whenever a user asks to create any Word document — reports, memos, assessments, briefing notes, or any other .docx output.

---

## When to use

- User asks for a Word document or .docx file
- User asks to generate a report, memo, assessment, executive summary, briefing note, or any formal written document
- User has provided content (findings, data, talking points) and needs it formatted into a Prevalent AI branded document

## When NOT to use

- User wants a PowerPoint presentation → use `pitch-deck-skill`
- User wants an HTML/web page → use the `/ds` design system commands instead
- The output will not be a .docx file

---

## Template file

```
document-skills/document-skill/templates/Prevalent AI - Word Template with Cover Page - 01.08.17.dotx
```

> **Important:** The template is a `.dotx` file (Word template format). `python-docx` cannot open it directly with `Document(path)` — it will raise a `ValueError`. Always copy it to a `.docx` first, then open the copy. See Generation approach below.

---

## Hard rules

1. **Template is mandatory.** Always copy the `.dotx` to a temp `.docx` and open that. Never call `Document()` with no arguments.
2. **Never restyle.** Do not change paragraph styles, font sizes, colors, margins, or header/footer layout. Only replace content within existing styled paragraphs.
3. **Set text via runs, not paragraph.text.** Setting `para.text` directly destroys run-level formatting. Always iterate `para.runs`.
4. **Brand colors only.** For any programmatically inserted colored elements (table header fills, callout shading), use the palette below. Never use Office default theme colors.
5. **Font: Calibri / Calibri Light.** Match the embedded template fonts. Never substitute another font.
6. **Logo: image only.** The logo is embedded as an image in the template (EMF format). Do not add duplicate logo images or type "Prevalent AI" as a text substitute.
7. **Running header must be updated.** The header reads `Prevalent AI — Document Title — [page]`. Replace "Document Title" with the actual document title.
8. **Severity and status labels must be visible.** Any risk ratings or status values in tables must appear as visible text or colored cell shading — never as a tooltip or hidden field.
9. **Confirmation before overwrite.** If generating would overwrite an existing file, confirm with the user first.

---

## Page setup

| Setting | Value |
|---|---|
| Page size | A4 — 8.26" × 11.69" |
| Margins | top=0.98", bottom=1.38", left=0.63", right=0.63" |
| Header | `Prevalent AI — Document Title — [page number]` |
| Footer | Empty (page numbers handled by header field) |
| Orientation | Portrait |

---

## Brand palette (from theme1.xml — same as pitch-deck-skill)

| Role | Hex | Usage |
|---|---|---|
| Primary dark (dk1) | `#372355` | Cover title, primary headings |
| Dark purple (accent1) | `#4D2E58` | H1–H4 headings, subtitles |
| Medium purple (accent2) | `#81718F` | Supporting text on dark backgrounds |
| Slate (accent3) | `#959AA8` | H3 headings, captions, TOC heading |
| Light slate (accent4) | `#C4C6CE` | Subtle fills, borders |
| Deep red-orange (accent5) | `#BB4728` | Emphasis, alerts |
| Orange-red (accent6) | `#D25B30` | Hyperlinks, secondary emphasis |
| Black (dk2) | `#000000` | Body text |
| White (lt1) | `#FFFFFF` | Table header text, text on dark backgrounds |

### Chart series color order (if inserting charts)
1. `#372355` — Primary
2. `#4D2E58` — Secondary
3. `#D25B30` — Accent
4. `#BB4728` — Alert
5. `#81718F` — Supporting
6. `#959AA8` — Neutral

---

## Font scheme

| Role | Typeface |
|---|---|
| Major (headings, titles) | Calibri Light |
| Minor (body, bullets, tables) | Calibri |

---

## Paragraph styles — complete reference

Use these exact style names when applying or matching styles in python-docx.

### Title / Cover styles

| Style name | Size | Color | Usage |
|---|---|---|---|
| `Title - 42pt` | 42pt Bold | `#000000` | Cover page main title |
| `Title - 28pt` | 28pt | `#4D2E58` | Interior page title |
| `Subtitle - 18pt` | 18pt | `#000000` | Cover page subtitle |
| `Subtitle - 16pt` | 16pt | `#4D2E58` | Interior subtitle / section label |
| `Subtitle - 14pt` | 14pt | `#372355` | Tertiary subtitle |
| `Document Date` | 11pt | `#4D2E58` | Date line on cover and interior pages |

### Heading styles

| Style name | Size | Color | Usage |
|---|---|---|---|
| `Heading 1 - 14pt` | 14pt | `#4D2E58` | Major section headings |
| `Heading 2 - 12pt` | 12pt | `#4D2E58` | Sub-section headings |
| `Heading 3 - 10pt` | 10pt Bold | `#959AA8` | Sub-sub-section headings |
| `Heading 4 - 8pt` | 8pt | — | Deep sub-headings |
| `Appendix Heading - 14pt` | 14pt | `#4D2E58` | Appendix section titles |

### Body styles

| Style name | Size | Usage |
|---|---|---|
| `Body Copy - 10pt` | 10pt | Default body paragraphs |
| `Body Copy - 8pt` | 8pt (Calibri Light) | Dense / secondary body text |
| `Body Copy Bold - 10pt` | 10pt Bold | Emphasis within body |
| `Body Copy Italics - 10pt` | 10pt Italic | Quotations, definitions |
| `Bocy Copy - White 10 pt` | 10pt | Body text on dark/colored backgrounds (note: typo in style name — use as-is) |
| `Body Copy - White 8 pt` | 8pt | Small text on dark backgrounds |
| `Intro Body Copy - 12pt` | 12pt (Arial) | Introduction / lead paragraph |

### List styles

| Style name | Size | Usage |
|---|---|---|
| `Bulleted List - 10pt` | 10pt | Standard bullet lists |
| `Bulleted List - 8pt` | 8pt | Dense bullet lists |
| `Bulleted List (within table) - 10pt` | 10pt | Bullets inside table cells |
| `Bulleted List (within table) - 8pt` | 8pt | Dense bullets in table cells |
| `Numbered List - 10pt` | 10pt | Ordered / action item lists |
| `Numbered List - 8pt` | 8pt | Dense numbered lists |

### Table styles

| Style name | Size | Color | Usage |
|---|---|---|---|
| `Table Heading - 10pt` | 10pt (Calibri Light) | `#FFFFFF` white text | Table column headers — white text, `#372355` background fill |
| `Table Heading - 8 pt` | 8pt | `#FFFFFF` white text | Dense table headers — white text, `#372355` background fill |

**Table header fill: `#372355` — this is the ONLY correct color for table header row backgrounds.** Do not use `#4D2E58` or any other purple variant for table headers.

### Utility styles

| Style name | Size | Color | Usage |
|---|---|---|---|
| `Captions - 6.5pt` | 6.5pt (Calibri) | `#959AA8` | Figure / table captions |
| `Hyperlink` | 10pt Bold (Calibri Light) | `#D25B30` | Hyperlinks |
| `TOC Heading` | 18pt (Calibri Light) | `#959AA8` | Table of contents heading |
| `toc 1` | 11pt Bold | — | TOC level 1 entries |
| `toc 2` | 11pt | — | TOC level 2 entries |
| `toc 3` | 11pt | — | TOC level 3 entries |

---

## Document structure

### Cover page section
The template has two cover page variants. Use the first:

| Placeholder text in template | Style | Replace with |
|---|---|---|
| `Document title – 42 pt` | `Title - 42pt` | Document title |
| `Document subtitle – 18pt` | `Subtitle - 16pt` | Document subtitle or classification |
| `Month 2017` | `Document Date` | Formatted date (e.g. `May 2025`) |

### Table of Contents
Leave the TOC section intact — Word will regenerate it on first open. Do not replace TOC entries manually.

### Body section
After the TOC, the template provides a full style showcase page (Title-28pt, H1–H4, body, lists, tables). Use this section as the starting point for document content.

### Typical document structure for generated content

1. **Cover** — title, subtitle, date (fill cover placeholders above)
2. **Table of Contents** — leave intact; Word regenerates
3. **Executive Summary** — `Heading 1 - 14pt` + `Body Copy - 10pt`
4. **Section content** — `Heading 1/2/3` + body / lists / tables as needed
5. **Appendix** (optional) — `Appendix Heading - 14pt` + body

---

## Generation approach

```python
import shutil, os, urllib.request
from docx import Document
from docx.shared import RGBColor, Pt
from docx.oxml.ns import qn

TEMPLATE_URL = "https://raw.githubusercontent.com/anthu211/design-system-2.0/develop/document-skills/document-skill/templates/Prevalent%20AI%20-%20Word%20Template%20with%20Cover%20Page%20-%2001.08.17.dotx"
TEMPLATE = "/tmp/PAI_Word_Template.dotx"

# Download template if not already present (works in Claude web and locally)
if not os.path.exists(TEMPLATE):
    urllib.request.urlretrieve(TEMPLATE_URL, TEMPLATE)

def generate_document(output_path, doc_data):
    # dotx cannot be opened directly — copy to temp .docx first
    tmp = output_path.replace('.docx', '_tmp.docx')
    shutil.copy(TEMPLATE, tmp)

    doc = Document(tmp)   # open the copy

    # Replace placeholder text in body paragraphs
    replacements = {
        "Document title – 42 pt":   doc_data.get("title", ""),
        "Document subtitle – 18pt": doc_data.get("subtitle", ""),
        "Month 2017":               doc_data.get("date", ""),
    }

    for para in doc.paragraphs:
        for run in para.runs:
            for old, new in replacements.items():
                if old in run.text:
                    run.text = run.text.replace(old, new)

    # Update running header — find "Document Title" in header paragraphs
    for section in doc.sections:
        for para in section.header.paragraphs:
            for run in para.runs:
                if "Document Title" in run.text:
                    run.text = run.text.replace("Document Title", doc_data.get("title", ""))

    # Add body content after the showcase section
    # Use add_paragraph with the named style:
    # doc.add_paragraph("Section heading text", style="Heading 1 - 14pt")
    # doc.add_paragraph("Body text here.", style="Body Copy - 10pt")

    doc.save(output_path)
    os.remove(tmp)   # clean up temp copy
```

**Rules:**
- Always copy the `.dotx` to a `.docx` before opening — never open the template directly.
- Replace text by iterating `para.runs` — never set `para.text` directly.
- Add new paragraphs with `doc.add_paragraph(text, style="<style name>")` using the style names from this file.
- For tables, always set the table style to `Prevalent AI Table Style` — this applies the `#372355` header fill automatically to the first row.
- For table header cells, apply paragraph style `Table Heading - 10pt` (white text). The cell background fill MUST be `#372355`. Set it explicitly on each header cell using the XML snippet below — do not rely on theme colors, do not use `#4D2E58`.

```python
from docx.oxml.ns import qn
from lxml import etree

def set_cell_bg(cell, hex_color):
    """Set table cell background fill to a solid RGB hex color."""
    tc = cell._tc
    tcPr = tc.find(qn('w:tcPr'))
    if tcPr is None:
        tcPr = etree.SubElement(tc, qn('w:tcPr'))
    shd = tcPr.find(qn('w:shd'))
    if shd is None:
        shd = etree.SubElement(tcPr, qn('w:shd'))
    shd.set(qn('w:val'), 'clear')
    shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_color)  # e.g. '372355'

# Usage: apply to every cell in the header row
for cell in table.rows[0].cells:
    set_cell_bg(cell, '372355')
    cell.paragraphs[0].style = doc.styles['Table Heading - 10pt']
```
- Delete the style-showcase section from the template before saving if it is not needed in the output.
- Never modify the cover page image or logo shapes.

---

## Output

- File format: `.docx`
- Naming convention: `pai-[type]-[subject]-[date].docx`
  - Examples: `pai-report-acme-2025-05-20.docx`, `pai-memo-vendor-access-2025-05-20.docx`
- Save to: path specified by the user, or current working directory if unspecified
