# Prevalent AI — Brand Tokens for Document Generation

**Source of truth:** `ds/tokens/colors.json`, `ds/tokens/typography.json`, `ds/tokens/spacing.json`
**Do not redefine these values here — this file mirrors and translates them for Word/PowerPoint contexts.**

---

## Colors

### Primary palette

| Role | Hex | Usage in documents |
|---|---|---|
| Accent / Primary brand | `#6360D8` | Headings, hyperlinks, chart primary series, dividers, accent rules |
| Accent dark (filter) | `#504BB8` | Second chart series, sub-headings on dark backgrounds |
| Topbar / Near-black | `#131313` | Cover slide background, section divider slides |
| Body text | `#101010` | All body copy |
| Secondary text | `#282828` | Captions, footnotes |
| Muted text | `#6E6E6E` | Labels, metadata, table header text |
| White | `#FFFFFF` | Text on dark backgrounds, cover slide title |

### Surface palette

| Role | Hex | Usage in documents |
|---|---|---|
| Page background | `#F7F9FC` | Table alternating rows, light section backgrounds |
| Raised / surface | `#F5F5F5` | Table header fill |
| Card / section border | `#E6E6E6` | Table borders, divider lines |
| Control border | `#CFCFCF` | Subtle borders |

### Severity / Status palette

| Severity | Text | Background | Usage |
|---|---|---|---|
| Critical | `#D12329` | `#F9EEEE` | Risk badges, critical findings highlight |
| High | `#D98B1D` | `#FEF3C7` | High-risk items |
| Medium | `#6360D8` | `#F0F0FC` | Medium-risk items |
| Low | `#31A56D` | `#EFF7ED` | Low-risk / positive status |

### Destructive

| Role | Hex |
|---|---|
| Error / destructive | `#dc2626` |
| Error background | `#F9EEEE` |

---

## Typography

**Primary font:** Inter (variable weight 400–700)
**Fallback stack:** -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
**Monospace:** SF Mono, Fira Code, monospace (code snippets only)

> In Word/PowerPoint, map Inter to the closest embedded font. If Inter is not available in the template, use Calibri as the fallback — never Arial or Times New Roman.

### Type scale (translated to pt for Office)

| Role | Web size | Office equivalent | Weight | Usage |
|---|---|---|---|---|
| Document title / Cover heading | 18px | 18pt | Bold (700) | Cover page only |
| Section heading | 14px | 14pt | SemiBold (600) | Major section titles (Heading 1 style) |
| Sub-heading | 12px | 12pt | Medium (500) | Sub-section titles (Heading 2 style) |
| Body text | 12px | 11pt | Regular (400) | All body copy (Normal style) |
| Caption / meta | 11px | 10pt | Regular (400) | Table captions, footnotes, breadcrumbs |
| Table header | 11px | 10pt | Bold / Uppercase | Column headers in tables |

---

## Spacing (4pt grid)

The web DS uses a strict 4px grid. In Office documents translate as follows:

| Web token | px | Office pt equivalent |
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

- Always use the PAI logo image file — **never** type "Prevalent AI" as text in logo position.
- Logo files: `icons/pai-logo.svg` (color), `icons/pai-logo-black.svg` (black/dark backgrounds).
- On dark backgrounds (cover slide, section dividers): use `pai-logo.svg` or a white-reversed version.
- Minimum clear space around logo: 16px (12pt) on all sides.
- Never resize logo below the defined minimum or stretch disproportionately.

---

## Border radius (document approximations)

Office documents have limited border-radius support. Apply these rules:

| Element | Web rule | Document equivalent |
|---|---|---|
| Tables | 4px | Square corners (no radius) — Office default |
| Callout boxes | 4px | 0.05" rounded corner or square |
| Highlight chips / badges | 44px pill | Use colored text with background shading; avoid shape outlines |

---

## Chart colors

Use this series order for all data charts (bar, line, pie):

1. `#6360D8` — Primary (accent)
2. `#504BB8` — Secondary
3. `#31A56D` — Positive / Low
4. `#D98B1D` — Warning / High
5. `#D12329` — Critical
6. `#9CA3AF` — Neutral / N/A

Never use Office's default chart color schemes. Always apply the palette above.

---

## What NOT to do

- Never hardcode colors not in this palette.
- Never use Arial, Times New Roman, or Calibri as the primary font if Inter is embedded in the template.
- Never recreate a document from scratch — always fill the provided template.
- Never restyle template elements; only fill placeholders with content.
