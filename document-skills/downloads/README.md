# Document Skills — Downloads & Local Setup

If you're using **Claude web** and want to generate actual `.pptx` and `.docx` files, follow this guide to set up document generation on your local machine using Claude Code.

---

## What you need

- [Claude Code](https://claude.ai/code) installed (desktop app or VS Code extension)
- Python 3.8+
- This repository cloned locally

---

## Setup (one time)

```bash
# 1. Clone the repo (if you haven't already)
git clone https://github.com/anthu211/design-system-2.0.git
cd design-system-2.0

# 2. Install Python dependencies
pip3 install -r document-skills/downloads/requirements.txt
```

That's it. The slash commands are already registered — they live in `.claude/commands/` which Claude Code picks up automatically when you open this repo.

---

## How to use

Open this repo in Claude Code (desktop app or VS Code), then type:

### Generate a PowerPoint deck
```
/generate-deck [describe what you want]
```

**Examples:**
```
/generate-deck Q3 vendor risk summary — 10 slides, 3 critical findings, audience is the board
```
```
/generate-deck Sales pitch for Acme Corp — cover, agenda, our solution, pricing, next steps
```

### Generate a Word document
```
/generate-doc [describe what you want]
```

**Examples:**
```
/generate-doc Vendor risk assessment report for TechCorp — 5 findings, severity high to low
```
```
/generate-doc Internal memo to InfoSec team about new vendor access policy effective June 2025
```

---

## Where files are saved

All generated files land in:

```
document-skills/downloads/output/
```

Named as:
- `pai-deck-[topic]-YYYY-MM-DD.pptx`
- `pai-[type]-[subject]-YYYY-MM-DD.docx`

---

## How it works

When you run `/generate-deck` or `/generate-doc`, Claude Code:

1. Reads the relevant `SKILL.md` (brand rules, template path, layout details)
2. Writes a python-pptx / python-docx script tailored to your content
3. Runs it immediately via the terminal
4. The branded file appears in `downloads/output/`

The actual PAI templates are used — so output matches the real brand exactly, not an approximation.

---

## Templates used

| Command | Template file |
|---|---|
| `/generate-deck` | `document-skills/pitch-deck-skill/templates/Template_PAI_Presentation (2).pptx` |
| `/generate-doc` | `document-skills/document-skill/templates/Prevalent AI - Word Template with Cover Page - 01.08.17.dotx` |

---

## Troubleshooting

**`ModuleNotFoundError: No module named 'pptx'`**
```bash
pip3 install python-pptx
```

**`ModuleNotFoundError: No module named 'docx'`**
```bash
pip3 install python-docx
```

**Claude Code doesn't recognise `/generate-deck`**
Make sure you opened Claude Code inside the repo root — slash commands are loaded from `.claude/commands/` in the current project directory.
