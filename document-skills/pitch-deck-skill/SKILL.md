# Skill: Pitch Deck Generation (.pptx)

## Name
`pitch-deck-skill`

## Description
Generates branded Prevalent AI PowerPoint presentations (.pptx) by populating a pre-defined slide template with structured content. Use this skill whenever a user asks to create, generate, or produce a pitch deck, executive presentation, board deck, sales presentation, or any .pptx output.

---

## When to use

- User asks for a PowerPoint file, .pptx, slide deck, or presentation
- User asks for an executive briefing, board update, sales deck, or partner presentation
- User has provided content (talking points, data, findings) and needs it formatted into branded slides

## When NOT to use

- User wants a Word document → use `report-skill`
- User wants a short internal memo → use `memo-skill`
- User wants an HTML/web page → use the `/ds` design system commands instead
- The output will not be a .pptx file

---

## Template files

Two files are in `templates/`:

| File | Purpose |
|---|---|
| `Template_PAI_Presentation (2).pptx` | **The working template** — load this for generation |
| `PPT graphics.pptx` | Brand asset library (logos, icons, layout references) — reference only, do NOT generate from this |

**Always load `Template_PAI_Presentation (2).pptx`.** Never generate from `PPT graphics.pptx` and never create a `Presentation()` from scratch.

---

## Hard rules

1. **Template is mandatory.** Load `Template_PAI_Presentation (2).pptx` using `python-pptx`. Never call `Presentation()` with no arguments.
2. **Never restyle.** Do not change slide master colors, font settings, background fills, logo positions, or layout geometry. Only place content in designated placeholders.
3. **One idea per slide.** Do not cram multiple topics onto one slide; duplicate a layout instead.
4. **Brand colors only.** Any manually inserted shapes or chart series must use the template palette defined in this file. Never use Office theme defaults and never substitute web design system colors (#6360D8 etc.) — those belong to the web platform only.
5. **Font: Calibri.** The template embeds Calibri Light (headings) and Calibri (body). Never substitute another font.
6. **Logo: image only.** The logo is baked into the slide master and cover image — do not add a second copy or type "Prevalent AI" as text.
7. **Cover slide = logo only. MANDATORY.** Slide 1 MUST use `4_Custom Layout`. Add NO text, NO textboxes, NO additional shapes. The PAI logo and background are baked into the layout — do not touch them. Any text on the cover slide is a hard violation.
8. **Slide 2 = purple title slide. MANDATORY.** The second slide (deck title / agenda heading) MUST use `11_Custom Layout` or `3_Custom Layout` — both have a dark purple background. Place the deck title in `idx=10`. Never use a white-background layout for slide 2.
9. **Pagination: bottom-right on every non-cover slide. MANDATORY.** Every slide except the cover and back cover must include the slide number placeholder (`idx=4`) at position `left=8.566", top=5.622", w=1.086", h=0.333"` with the format `<  [n]`. Do NOT skip, delete, or reposition this placeholder. Do NOT set it manually — it is an auto PowerPoint field; just ensure it is present on the slide.
10. **Bullet discipline.** Maximum 5 bullets per slide. Maximum 10 words per bullet. No sub-bullets beyond one level.
11. **Confirmation before overwrite.** If generating would overwrite an existing file, confirm with the user first.

---

## Page setup

| Setting | Value |
|---|---|
| Slide size | 10.00" × 6.25" (16:10) |
| Slide count in template | 8 |
| Notes pane | No speaker notes in template |
| Slide number format | `<  [n]` (auto-populated by PowerPoint field) |

---

## Brand palette (from theme1.xml — "Prevalent AI 18-04")

> **Rule:** Always use this palette for all dynamic color decisions — charts, shapes, callout fills, status indicators. The template palette is the single source of truth for .pptx output. Web design system colors (#6360D8 etc.) are for the web platform only and must never appear in generated presentations.

| Theme role | Hex | Usage |
|---|---|---|
| dk1 — Primary brand dark | `#372355` | Primary headings, dark backgrounds |
| lt1 — Light | `#FFFFFF` | Text on dark backgrounds, slide backgrounds |
| dk2 — Black | `#000000` | Body text, secondary elements |
| lt2 — Light gray | `#E9E8EC` | Subtle backgrounds, dividers |
| accent1 — Dark purple | `#4D2E58` | Section headers, key callouts |
| accent2 — Medium purple | `#81718F` | Supporting elements, secondary text on dark |
| accent3 — Slate | `#959AA8` | Tertiary elements, borders |
| accent4 — Light slate | `#C4C6CE` | Placeholder backgrounds, subtle fills |
| accent5 — Deep red-orange | `#BB4728` | Emphasis, alerts, highlight accent |
| accent6 — Orange-red | `#D25B30` | Secondary emphasis, chart accent |

### Chart series color order
1. `#372355` — Primary
2. `#4D2E58` — Secondary
3. `#D25B30` — Accent
4. `#BB4728` — Alert
5. `#81718F` — Supporting
6. `#959AA8` — Neutral

---

## Font scheme

| Role | Typeface | Usage |
|---|---|---|
| Major (headings) | Calibri Light | Slide titles, section headings |
| Minor (body) | Calibri | Body bullets, captions, table text |

From the layout placeholder hints embedded in the template:
- Callout / section slides: **Calibri Bold, 32–44pt** (size varies by layout)
- Body text: **Calibri, ~11pt**

---

## Slide layouts (used in template)

The template has 8 slides using 6 distinct layouts. Always select the closest matching layout for each new slide.

| Layout name | Index in `slide_layouts` | Placeholders | Typical use |
|---|---|---|---|
| `4_Custom Layout` | 1 | None (picture-based) | Cover slide, back cover — do not add text placeholders |
| `11_Custom Layout` | 2 | idx=10 (callout text, ~38pt bold), idx=4 (slide number) | Section divider — bold callout text |
| `3_Custom Layout` | 3 | idx=10 (callout text, ~44pt bold), idx=4 (slide number) | Section divider — large bold callout |
| `8_Custom Layout` | 7 | idx=10 (callout text, ~32pt bold), idx=4 (slide number) | Section divider — medium callout |
| `Blank with Title (1 line)` | 9 | idx=0 (title), idx=4 (slide number) | Content slide with title only — add body as text box |
| `Title (1 line) and Bullets (1 column)` | 11 | idx=0 (title), idx=12 (body bullets), idx=4 (slide number) | Standard content slide with title + bullets |

### Placeholder index reference

| idx | Placeholder name | Content |
|---|---|---|
| 0 | `Title 1` | Slide title text |
| 4 | `Slide Number Placeholder` | Auto slide number — do not set manually |
| 10 | `Text Placeholder 11` | Callout / section text (Custom Layouts) |
| 12 | `Text Placeholder 16` | Body bullets (content layouts) |

---

## Slide structure for a generated deck

Use this order when building a deck from scratch:

| Position | Layout to use | Content |
|---|---|---|
| **Slide 1 — Cover** | `4_Custom Layout` | **Logo only. No text, no shapes. MANDATORY.** The PAI logo and background are baked in — do not touch. |
| **Slide 2 — Title** | `11_Custom Layout` or `3_Custom Layout` | **Purple background. MANDATORY.** Place deck title/heading in `idx=10`. |
| Section break | `8_Custom Layout` or `11_Custom Layout` | Section divider — place section title in `idx=10` |
| Content slides | `Title (1 line) and Bullets (1 column)` | Title (`idx=0`) + bullets (`idx=12`) |
| Content + space | `Blank with Title (1 line)` | Title (`idx=0`) + freeform content |
| **Last — Back cover** | `4_Custom Layout` | **Logo only. No text, no shapes. MANDATORY.** Same rule as slide 1. |

### Pagination rule
Every slide **except slide 1 (cover) and the last slide (back cover)** must have `idx=4` present. Do not set it manually — it auto-populates as `<  [n]`. Position: `left=8.566", top=5.622"`, bottom-right corner.

---

## Generation approach

```python
from pptx import Presentation
from pptx.util import Pt, Emu
from pptx.dml.color import RGBColor
import lxml.etree as etree

TEMPLATE = "document-skills/pitch-deck-skill/templates/Template_PAI_Presentation (2).pptx"

def prepare_template(prs, tmp_path):
    """
    Strip the 6 middle content slides, keeping slide[0] (cover) and slide[-1] (back cover).
    Saves to tmp_path and returns a freshly-loaded Presentation.

    MANDATORY — call this immediately after Presentation(TEMPLATE) and use the returned
    object for all subsequent work. Do NOT continue using the original prs object.

    WHY the cover and back cover must be preserved:
    The PAI logo on both slides is a picture shape placed directly on the slide element,
    NOT inside the layout. Deleting those slides and recreating them with add_slide()
    produces a blank slide with only layout background images — the logo disappears.

    WHY the save+reload is required:
    Dropping relationships leaves orphaned slide parts in python-pptx's in-memory cache.
    When new slides are later added, python-pptx reuses freed slot names (e.g. slide8.xml),
    colliding with the back cover's filename. The zip ends up with two slide8.xml entries
    and the back cover is lost on reload. Saving and reloading flushes the orphaned parts
    so new slides get non-conflicting names.

    After reload the presentation has exactly 2 slides: [cover, back_cover].
    Insert all content slides between them using insert_slide_at().
    """
    rId_attr = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'
    sldIdLst = prs.slides._sldIdLst
    total = len(prs.slides)
    for i in range(total - 2, 0, -1):
        rId = sldIdLst[i].get(rId_attr)
        prs.part.drop_rel(rId)
        del sldIdLst[i]
    prs.save(tmp_path)
    return Presentation(tmp_path)   # reload — orphaned parts are gone


def insert_slide_at(prs, index, layout):
    """Add a new slide from layout and move it to position index."""
    slide = prs.slides.add_slide(layout)
    sldIdLst = prs.slides._sldIdLst
    last = sldIdLst[-1]
    sldIdLst.remove(last)
    sldIdLst.insert(index, last)
    return slide


def generate_deck(output_path, deck_data):
    import os
    tmp = output_path.replace('.pptx', '_tmp.pptx')

    prs = Presentation(TEMPLATE)  # always load template, never Presentation()

    # REQUIRED: strip middle slides, preserve cover + back cover, flush orphaned parts.
    # Returns a clean reloaded prs — use this object for everything below.
    prs = prepare_template(prs, tmp)
    # prs now has exactly 2 slides: index 0 = cover (logo), index 1 = back cover (logo)

    layouts = {layout.name: layout for layout in prs.slide_layouts}

    # deck_data["slides"] must contain ONLY interior slides.
    # Do NOT include cover or back cover — they are already in the template.
    for i, slide_spec in enumerate(deck_data["slides"], start=1):
        layout = layouts[slide_spec["layout"]]
        slide = insert_slide_at(prs, i, layout)

        for ph in slide.placeholders:
            idx = ph.placeholder_format.idx
            if idx == 4:
                continue  # slide number — auto-field, leave untouched
            if idx in slide_spec.get("content", {}):
                tf = ph.text_frame
                tf.clear()
                p = tf.paragraphs[0]
                run = p.add_run()
                run.text = slide_spec["content"][idx]

    prs.save(output_path)
    os.remove(tmp)
```

**Rules for python-pptx:**
- Always open with `Presentation(TEMPLATE)` — never `Presentation()`.
- **Always call `prepare_template(prs)` immediately after loading.** This preserves the cover and back cover (which carry the PAI logo as a slide-level picture shape) while clearing the 6 filler content slides.
- **Never include cover or back cover in `deck_data["slides"]`.** Those slides already exist in the template. Only list interior slides in the data structure.
- **Always use `insert_slide_at(prs, i, layout)` for interior slides**, not `prs.slides.add_slide()` directly — plain `add_slide()` appends after the back cover.
- Set text via runs, not `placeholder.text = ...` — direct assignment destroys run-level formatting.
- For placeholder idx=4 (slide number): skip — it is an auto PowerPoint field.
- For custom layouts (idx=10), write bold callout text respecting the 32–44pt size hint.
- For charts: apply the series color order from this file's Brand palette section.
- Never modify `prs.slide_master` or `prs.slide_layouts`.

---

## Output

- File format: `.pptx`
- Template: `Template_PAI_Presentation (2).pptx`
- Naming convention: `pai-deck-[topic]-[date].pptx` (e.g., `pai-deck-q3-risk-2025-05-20.pptx`)
- Save to: path specified by the user, or current working directory if unspecified
