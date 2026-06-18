# Skill: Deck Generation (.pptx)

## Name
`pitch-deck-skill`

## Description
Generates branded Prevalent AI PowerPoint presentations (.pptx) from two templates:
1. **PAI Pitch Deck** — short sales/executive presentation, generated from scratch
2. **Master Proposal Deck** — full client engagement proposal, built by selecting and customising slides from a 56-slide master

Use this skill whenever a user asks to create, generate, or produce any .pptx, slide deck, presentation, pitch, or proposal.

---

## Template selection — intent detection

Read the user's request and pick the template automatically. Ask only if genuinely ambiguous.

| If the user says… | Use |
|---|---|
| pitch, sales deck, board deck, partner deck, executive briefing, investor deck | **Pitch Deck** |
| proposal, client presentation, client deck, engagement proposal, statement of work, RFP response, pilot proposal, "deck for [Client]" | **Proposal Deck** |
| Ambiguous → ask one question: *"Is this a sales pitch or a client proposal?"* | Clarify, then proceed |

---

## Template files

Both files are in `document-skills/pitch-deck-skill/templates/`:

| File | Template | Use |
|---|---|---|
| `PAI_PPT_Template_2026.pptx` | Pitch Deck | **Working template — load for pitch deck generation (2026 brand)** |
| `Template_PAI_Presentation (2).pptx` | Pitch Deck (legacy) | Old template — do NOT use for new decks |
| `PPT graphics.pptx` | — | Brand asset library — reference only, do NOT generate from this |
| `Master Proposal Deck.pptx` | Proposal Deck | **Working template — load for proposal deck generation** |

Never call `Presentation()` with no arguments. Always load from file.

---

---

# PART A — PAI PITCH DECK

---

## When to use the Pitch Deck

- User asks for a short sales deck, executive briefing, board update, partner presentation
- Output should be concise (10–15 slides max)
- Content is generated fresh — not drawn from a pre-existing library

---

## Hard rules (Pitch Deck)

1. **Template is mandatory.** Load `PAI_PPT_Template_2026.pptx`. Never call `Presentation()` with no arguments.
2. **Never restyle.** Do not change slide master colors, font settings, background fills, logo positions, or layout geometry.
3. **One idea per slide.** Do not cram multiple topics onto one slide.
4. **Brand colors only.** Any manually inserted shapes or chart series must use the 2026 template palette.
5. **Font: Aptos.** Never substitute another font.
6. **Cover slide uses placeholders.** Slide 1 uses `Cover Slide` layout — set deck title via `idx=0` and subtitle/date via `idx=10`. The PAI logo/background is baked in — do not add extra shapes.
7. **Back cover uses `Divider_Dark` with empty placeholders. MANDATORY.** The last template slide uses `Divider_Dark` — leave `idx=0` and `idx=10` empty. The PAI logo, dark navy background, and confidentiality footer are baked into the layout — do not add or modify anything.
8. **Slide number is built into the layouts — do not inject it.** The 2026 template embeds a user-drawn `fld type="slidenum"` text box directly in each interior layout (bottom-right, ~12.78", 7.15"). Any slide created from those layouts automatically shows the number. Never call `add_slide_number()` or inject a `ph type="sldNum"` element — that would duplicate or break the number.
9. **Bullet discipline.** Max 5 bullets per slide. Max 10 words per bullet. No sub-bullets beyond one level.
10. **Confirm before overwrite.**

---

## Page setup (Pitch Deck)

| Setting | Value |
|---|---|
| Slide size | 13.33" × 7.50" (16:9) |
| Slides in template | 6 (slide 1 = cover, slide 6 = back cover) |
| Slide numbers | Auto — built into layouts 1–4 as a `fld type="slidenum"` text box (bottom-right, Aptos 13pt, #595959). Cover and back cover layouts have none. |

---

## Brand palette (Pitch Deck — from theme1.xml "Custom 19", 2026 brand)

| Theme role | Hex | Usage |
|---|---|---|
| dk1 — Deep navy | `#060B25` | Primary headings, dark section bg |
| lt1 — Light gray | `#F2F2F2` | Master background, light surfaces |
| dk2 — Medium gray | `#595959` | Body text |
| lt2 — Cool light gray | `#ECECF2` | Subtle backgrounds, dividers |
| accent1 — Brand purple | `#6360D8` | Primary accent, highlights, callouts |
| accent2 — Blue | `#5B9BD5` | Supporting elements |
| accent3 — Darker blue | `#4472C4` | Tertiary elements |
| accent4 — White | `#FFFFFF` | Text on dark backgrounds |
| accent5 — Light gray | `#A6A6A6` | De-emphasized elements |
| accent6 — Near-white purple | `#F1F1FF` | Hover/subtle fill states |

### Layout background colors
- `Divider_Light`: `#E0DDF8` (soft lavender — section divider light)
- `Divider_Dark`: `#060B25` (deep navy — section divider dark + back cover)
- Master (all other layouts): `#F2F2F2`

### Chart series color order
1. `#060B25` 2. `#6360D8` 3. `#5B9BD5` 4. `#4472C4` 5. `#595959` 6. `#A6A6A6`

---

## Slide layouts (Pitch Deck — 2026 template)

| Layout name | Index | Background | Placeholders | Typical use |
|---|---|---|---|---|
| `Cover Slide` | 0 | Master (#F2F2F2) | idx=0 (Title), idx=10 (Text) | Cover — set deck title + subtitle/date |
| `Contents_Page` | 1 | Master (#F2F2F2) | idx=0 (Title), idx=10 (Text), idx=11 (Table) | Standard content slide — title + body + optional table |
| `Callout_Section` | 2 | Master (#F2F2F2) | idx=0 (Title), idx=10 (Text), idx=11 (Text), idx=12 (Text) | Split/callout layout — title + left + right + caption |
| `Divider_Light` | 3 | `#E0DDF8` lavender | idx=0 (Title), idx=10 (Text) | Section divider — soft lavender background |
| `Divider_Dark` | 4 | `#060B25` dark navy | idx=0 (Title), idx=10 (Text) | Section divider dark OR back cover (leave phs empty) |
| `Custom Layout` | 5 | Master (#F2F2F2) | None | Design asset library — do NOT use for slide generation |

### Placeholder index reference

| idx | Type | Content |
|---|---|---|
| 0 | Title | Slide title |
| 10 | Body/Text | Primary text body or callout |
| 11 | Body/Table | Secondary text or table area |
| 12 | Body | Tertiary text area (`Callout_Section` only) |

### Slide number
Layouts 1–4 (`Contents_Page`, `Callout_Section`, `Divider_Light`, `Divider_Dark`) each contain a user-drawn text box at `x=11686478, y=6542230 EMU` (bottom-right, 12.78", 7.15") with a `fld type="slidenum"` field — Aptos 13pt, color `#595959`. It is part of the layout, not the slide — renders automatically. Do not set or override it.

### `Divider_Dark` layout baked-in elements
The `Divider_Dark` layout has the following hardcoded in the layout XML (not the slide):
- PAI logo image (bottom-right)
- Dark navy rectangle covering the full slide
- "Confidential Materials. Do Not Distribute." text (bottom-centre)
- "Do not remove" placeholder shape
- Slide number field (`Holder 6`)

These are inherited by every slide using `Divider_Dark`, including the back cover. Never add shapes to override them.

---

## Pitch Deck — slide structure

| Position | Layout | Content |
|---|---|---|
| Slide 1 — Cover | `Cover Slide` | Deck title in `idx=0`; subtitle or date in `idx=10`. Logo/bg baked in — no extra shapes. |
| Section divider dark | `Divider_Dark` | Section label in `idx=0`; supporting text in `idx=10` |
| Section divider light | `Divider_Light` | Section label in `idx=0`; supporting text in `idx=10` |
| Standard content | `Contents_Page` | Title (`idx=0`) + body text (`idx=10`); table in `idx=11` if needed |
| Callout / split | `Callout_Section` | Title (`idx=0`) + left (`idx=10`) + right (`idx=11`) + caption (`idx=12`) |
| Last — Back cover | `Divider_Dark` | **Leave `idx=0` and `idx=10` EMPTY. Logo, navy bg, and footer baked into layout.** |

Slide numbers: appear automatically via the layout's built-in `fld type="slidenum"` text box. Cover and back cover layouts have none — correct behaviour. Do not inject anything manually.

---

## Pitch Deck — generation code

```python
from pptx import Presentation
from pptx.util import Pt, Emu
from pptx.dml.color import RGBColor

PITCH_TEMPLATE = "document-skills/pitch-deck-skill/templates/PAI_PPT_Template_2026.pptx"


def prepare_template(prs, tmp_path):
    """
    Strip the 4 middle sample slides (indices 1-4), keeping slide[0] (cover) and slide[5] (back cover).
    Saves to tmp_path and returns a freshly-loaded Presentation.

    MANDATORY — call this immediately after Presentation(PITCH_TEMPLATE).
    WHY: The template has 6 slides (cover + 4 sample + back cover). The sample slides must be
    stripped before inserting generated content. Save+reload flushes orphaned parts so new
    slides get non-conflicting XML part names.
    """
    rId_attr = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'
    sldIdLst = prs.slides._sldIdLst
    total = len(prs.slides)
    for i in range(total - 2, 0, -1):
        rId = sldIdLst[i].get(rId_attr)
        prs.part.drop_rel(rId)
        del sldIdLst[i]
    prs.save(tmp_path)
    return Presentation(tmp_path)


def insert_slide_at(prs, index, layout):
    """Add a new slide from layout and move it to position index."""
    slide = prs.slides.add_slide(layout)
    sldIdLst = prs.slides._sldIdLst
    last = sldIdLst[-1]
    sldIdLst.remove(last)
    sldIdLst.insert(index, last)
    return slide


def set_cover(slide, title, subtitle):
    """Set deck title (idx=0) and subtitle/date (idx=10) on the cover slide."""
    for ph in slide.placeholders:
        idx = ph.placeholder_format.idx
        tf = ph.text_frame
        tf.clear()
        p = tf.paragraphs[0]
        run = p.add_run()
        if idx == 0:
            run.text = title
        elif idx == 10:
            run.text = subtitle


def generate_pitch_deck(output_path, deck_data):
    """
    deck_data = {
        "cover": {"title": "Deck Title", "subtitle": "Month Year"},
        "slides": [
            {"layout": "Divider_Dark",   "content": {0: "Section One", 10: "Supporting text"}},
            {"layout": "Contents_Page",  "content": {0: "Slide Title", 10: "Body text..."}},
            {"layout": "Callout_Section","content": {0: "Callout Title", 10: "Left", 11: "Right", 12: "Caption"}},
            {"layout": "Divider_Light",  "content": {0: "Section Two", 10: "Sub-heading"}},
            ...
        ]
    }
    Do NOT include cover or back cover in deck_data["slides"] — they're already in the template.
    Back cover is the last slide (Divider_Dark with empty placeholders) — prepare_template() keeps it.
    """
    import os
    tmp = output_path.replace('.pptx', '_tmp.pptx')
    prs = Presentation(PITCH_TEMPLATE)
    prs = prepare_template(prs, tmp)
    layouts = {layout.name: layout for layout in prs.slide_layouts}

    # Update cover (slide index 0)
    cover_data = deck_data.get("cover", {})
    set_cover(prs.slides[0], cover_data.get("title", ""), cover_data.get("subtitle", ""))

    # Insert content slides between cover (0) and back cover (last)
    for i, slide_spec in enumerate(deck_data["slides"], start=1):
        layout = layouts[slide_spec["layout"]]
        slide = insert_slide_at(prs, i, layout)
        for ph in slide.placeholders:
            idx = ph.placeholder_format.idx
            if idx in slide_spec.get("content", {}):
                tf = ph.text_frame
                tf.clear()
                p = tf.paragraphs[0]
                run = p.add_run()
                run.text = slide_spec["content"][idx]

    prs.save(output_path)
    os.remove(tmp)
```

**Rules:**
- Always open with `Presentation(PITCH_TEMPLATE)` — never `Presentation()`.
- Always call `prepare_template()` immediately after loading.
- Use `set_cover()` to populate the cover slide via placeholders (`idx=0` title, `idx=10` subtitle).
- Never include cover or back cover in `deck_data["slides"]` — they're already in the template.
- Always use `insert_slide_at()` for interior slides — not `add_slide()` directly.
- Set text via runs, not `placeholder.text = ...`.
- Do NOT call `add_slide_number()` or inject any slide number XML — slide numbers are already built into layouts 1–4 and appear automatically.

---

## Pitch Deck — output

- Format: `.pptx`
- Naming: `pai-deck-[topic]-[date].pptx` (e.g. `pai-deck-q3-risk-2025-05-20.pptx`)
- Save to: path specified by user, or `document-skills/downloads/output/` if unspecified

---

---

# PART B — MASTER PROPOSAL DECK

---

## When to use the Proposal Deck

- User asks for a client proposal, engagement proposal, RFP response, pilot proposal
- Output is for a named client — needs client name and date customised
- Content is selected from the master 56-slide library, not generated from scratch

---

## Hard rules (Proposal Deck)

1. **Always load `Master Proposal Deck.pptx`.** Never create a `Presentation()` from scratch.
2. **Never restyle.** Do not change master/layout colors, fonts, logo, or layout geometry.
3. **Always remove graveyard slides.** Slides 33–37 (0-indexed: 32–36) are internal working slides ("Graveyard", "Inspo", "Other slides") — ALWAYS remove these before saving.
4. **Never remove the cover (slide 1).** Always keep it; update client name and date on it.
5. **Select sections based on the user's brief.** See the Section Catalog below.
6. **Confirm before overwrite.**

---

## Page setup (Proposal Deck)

| Setting | Value |
|---|---|
| Slide size | 13.33" × 7.50" (16:9) |
| Slides in master | 56 |
| Slide number format | `<  [n]` |

## Colors and fonts (Proposal Deck)

**Do not look up or apply a color palette for the proposal deck.** The master deck uses the generic Office theme — all actual PAI branding (dark purple backgrounds, brand colors, logos) is hardcoded as RGB values directly inside each shape, not driven by theme accent tokens.

Because generation only selects existing slides (never creates new shapes or slides from scratch), those hardcoded values are preserved automatically. There is no color decision to make.

- **Font**: Aptos (not Calibri — different from the pitch deck). Already embedded in slide text runs.
- **Colors**: All inside existing shapes. Preserved as-is when you keep a slide.
- **Rule**: Never create a new text box, shape, or color fill on a proposal slide. If content needs changing, only update existing text runs via `run.text = ...` — never add new shapes.

---

## Slide layouts (Proposal Deck)

| Layout name | Index | Placeholders | Typical use |
|---|---|---|---|
| `Custom Layout` | 1 | None (image-based) | Cover slide — update text shapes directly |
| `2_Body Alt 2` | 2/7/8 | None (all shapes) | Rich content slides — shapes only, no standard placeholders |
| `3_Custom Layout` | 12 | None (image-based) | Section divider with visual |
| `16_Custom Layout` | 19 | idx=10, idx=4 | Section title divider (dark bg) |
| `Title (1 line) and Bullets (1 column)` | 18 | idx=0, idx=12, idx=4 | Standard content — title + bullets |
| `Title (1 line) and Content (1 column)` | 20 | idx=0, idx=12, idx=4 | Standard content — title + content area |
| `Title (1 line) and Content (2 columns)` | 21 | idx=0, idx=12, idx=15, idx=4 | Two-column content slide |
| `Blank with Title (1 line)` | 22 | idx=0, idx=4 | Title + freeform content |

---

## Slide catalog and section map

Use this to decide which slides to include for a given client proposal.

### Core (always include — slides 1–16)

| Slide(s) | Content | Keep? |
|---|---|---|
| 1 | Cover — "Overview for [Client Name] [Month Year]" | Always — update client name + date |
| 2 | Company overview | Always |
| 3 | The Challenge | Always |
| 4 | The Solution | Always |
| 5 | Platform Foundation — Data Fabric | Always |
| 6 | Platform Foundation — 100+ Integrations | Always |
| 7 | Platform Overview — Automated Entity Resolution + KG | Always |
| 8 | Technology Architecture | Always |
| 9 | Platform Hosting — Deployment Models | Always |
| 10–11 | Exposure Management overview | Always |
| 12 | Executive Summary — The Proposal at a Glance | Always |
| 13–15 | Pilot — Pilot to Production, Proposed Scope | Always for pilot proposals; optional for direct production |
| 16 | Next Steps | Always |

### Optional — Competitive & Use Cases (slides 17–27)

| Slide(s) | Content | Include when |
|---|---|---|
| 17 | Why Prevalent AI — competitive differentiation | Competitive situation, early-stage prospect |
| 18 | Full-spectrum use case example | Client wants an end-to-end story |
| 19–20 | Use Case Alignment | Use case-heavy brief |
| 21 | Asset Management / CAASM | Client focus on asset visibility |
| 22 | Vulnerability Management | Client focus on VM |
| 23 | Privileged Access | Client focus on IAM/PAM |
| 24 | Identity and User360 | Client focus on identity |
| 25 | Cloud Posture and Baselines | Client focus on cloud |
| 26 | Continuous Controls Monitoring | Client focus on CCM |
| 27 | Data Source Requirements | Always when use cases are included |

### Optional — Case Studies (slides 28–32)

Include 1–3 case studies most relevant to the client's industry or size. Prefer closer industry match.

| Slide | Client | Themes |
|---|---|---|
| 28 | Global Payments Company | Visibility, automation, digital risk |
| 29 | Global Cosmetics Company | Continuous controls, data-driven resilience |
| 30 | Global Outsourcing Leader | Asset visibility, complexity |
| 31 | Leading International Bank | Cost reduction, risk reduction |
| 32 | Global Top 5 Bank | CISO Data Fabric, flexible deployment |

### ALWAYS REMOVE — Graveyard (slides 33–37)

| Slide | Content | Action |
|---|---|---|
| 33 | "Graveyard" | **Always remove** |
| 34 | "Inspo" | **Always remove** |
| 35–36 | Blank | **Always remove** |
| 37 | "Other slides" | **Always remove** |

### Optional — Supplementary / Deep-Dive (slides 38–56)

Use for technical audiences, competitive deep-dives, or extended discussions.

| Slide(s) | Content | Include when |
|---|---|---|
| 38 | Section divider: "Case Study" | When including alt case studies below |
| 39 | Case study: Leading International Bank (alt version) | Alt case study (more detail than slide 31) |
| 40–42 | One Platform / Databricks / SIEM cost reduction | Databricks or SIEM-focused conversations |
| 43 | Section divider: "AI within the Platform" | When including AI slides |
| 44–46 | AI in Data Fabric, Navigator, Differentiators/Competitors | Technical AI deep-dive |
| 47 | Knowledge Graph deep-dive | Technical audience |
| 48 | Section divider: "Exposure Management" | When including EM deep-dive |
| 49–52 | Exposure Management deep-dive | EM-focused brief |
| 53 | Finding Structure for Scoring (placeholder) | Only if content is ready |
| 54 | Section divider: "Delivery Model" | When including delivery slides |
| 55 | Typical Delivery Approach | Always useful to include |
| 56 | Section divider: "Case Studies" | When closing with case study section |

---

## Cover slide — client name update

Slide 1 uses `Custom Layout` with no standard placeholders. Client name and date are in a **text shape** (not a placeholder). Update them by finding the shape by name or by matching the placeholder text pattern.

```python
def update_cover(slide, client_name, month_year):
    """Update client name and date on cover slide."""
    for shape in slide.shapes:
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                for run in para.runs:
                    if '[*Client Name]' in run.text:
                        run.text = run.text.replace('[*Client Name]', client_name)
                    if '[*Month]' in run.text:
                        run.text = run.text.replace('[*Month]', month_year)
```

---

## Proposal Deck — generation code

```python
from pptx import Presentation

PROPOSAL_TEMPLATE = "document-skills/pitch-deck-skill/templates/Master Proposal Deck.pptx"

# Graveyard slides — ALWAYS remove (0-indexed)
GRAVEYARD_INDICES = [32, 33, 34, 35, 36]  # slides 33–37


def remove_slides(prs, indices_to_remove):
    """Remove slides by 0-based index (remove highest indices first to avoid shifting)."""
    rId_attr = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'
    sldIdLst = prs.slides._sldIdLst
    for i in sorted(indices_to_remove, reverse=True):
        rId = sldIdLst[i].get(rId_attr)
        prs.part.drop_rel(rId)
        del sldIdLst[i]


def update_cover(slide, client_name, month_year):
    """Update [*Client Name] and [*Month] tokens on the cover slide."""
    for shape in slide.shapes:
        if shape.has_text_frame:
            for para in shape.text_frame.paragraphs:
                for run in para.runs:
                    if '[*Client Name]' in run.text:
                        run.text = run.text.replace('[*Client Name]', client_name)
                    if '[*Month]' in run.text:
                        run.text = run.text.replace('[*Month]', month_year)


def generate_proposal_deck(output_path, client_name, month_year, slides_to_keep):
    """
    slides_to_keep: list of 1-based slide numbers to retain (from the Section Catalog).
    Graveyard slides (33–37) are always removed regardless of this list.
    Cover (slide 1) is always kept.

    Example: slides_to_keep = list(range(1, 17)) + [17, 28, 29, 55]
    """
    import os

    prs = Presentation(PROPOSAL_TEMPLATE)

    # Update cover before removing slides (index 0 = slide 1)
    update_cover(prs.slides[0], client_name, month_year)

    # Build removal list: anything NOT in slides_to_keep, plus always remove graveyard
    total = len(prs.slides)
    keep_set = set(slides_to_keep)
    keep_set.add(1)  # cover always kept

    to_remove = []
    for i in range(total):
        slide_number = i + 1
        if slide_number not in keep_set:
            to_remove.append(i)

    # Also force-remove graveyard regardless
    for gi in GRAVEYARD_INDICES:
        if gi not in to_remove:
            to_remove.append(gi)

    remove_slides(prs, list(set(to_remove)))

    prs.save(output_path)
    print(f"Saved: {output_path}")
```

**Rules:**
- Always open with `Presentation(PROPOSAL_TEMPLATE)` — never `Presentation()`.
- Always call `update_cover()` before removing slides (index 0 stays index 0 until we remove).
- Always remove graveyard slides (32–36 0-indexed), even if accidentally included in `slides_to_keep`.
- Do NOT use `insert_slide_at()` for proposal deck — you're selecting from an existing master, not building from scratch.
- Do NOT restyle any shapes. The master deck uses image-heavy layouts — Python cannot recreate them.
- For `2_Body Alt 2` slides (most content slides): all content is in free-floating shapes, not placeholders. Do not attempt to set placeholder text on these slides — they have none.

---

## Proposal Deck — output

- Format: `.pptx`
- Naming: `pai-proposal-[client]-[date].pptx` (e.g. `pai-proposal-techcorp-2025-05-20.pptx`)
- Save to: path specified by user, or `document-skills/downloads/output/` if unspecified
