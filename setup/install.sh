#!/bin/bash
# Prevalent AI — Claude Code Setup
# Run from your project root: bash claude-setup/install.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p .claude/commands

cp "$SCRIPT_DIR/.claude/commands/new-page.md"            .claude/commands/new-page.md
cp "$SCRIPT_DIR/.claude/commands/new-component.md"       .claude/commands/new-component.md
cp "$SCRIPT_DIR/.claude/commands/new-react-component.md" .claude/commands/new-react-component.md
cp "$SCRIPT_DIR/.claude/commands/ux-review.md"           .claude/commands/ux-review.md
cp "$SCRIPT_DIR/.claude/commands/persona-check.md"       .claude/commands/persona-check.md
cp "$SCRIPT_DIR/.claude/commands/audit-page.md"          .claude/commands/audit-page.md
cp "$SCRIPT_DIR/CLAUDE.md"                               .claude/CLAUDE.md

echo "Done. Open project in Claude Code."
