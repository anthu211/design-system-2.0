#!/bin/bash
# Prevalent AI — Claude Code Setup Installer
# Run this from your project root: bash claude-setup/install.sh

set -e

BASE="https://prevalent-ai.github.io/ux-pai"

echo "Installing Prevalent AI Claude Code setup..."
echo "Fetching latest command files from $BASE"
echo ""

mkdir -p .claude/commands

# Always pull from GitHub — never from local copies (prevents stale installs)
curl -fsSL "$BASE/commands/new-page.md"            -o .claude/commands/new-page.md
curl -fsSL "$BASE/commands/new-component.md"       -o .claude/commands/new-component.md
curl -fsSL "$BASE/commands/new-react-component.md" -o .claude/commands/new-react-component.md
curl -fsSL "$BASE/commands/ux-review.md"           -o .claude/commands/ux-review.md
curl -fsSL "$BASE/commands/persona-check.md"       -o .claude/commands/persona-check.md
curl -fsSL "$BASE/.claude/CLAUDE.md"               -o .claude/CLAUDE.md

echo "✓ Done! Files installed:"
echo "  .claude/CLAUDE.md"
echo "  .claude/commands/new-page.md"
echo "  .claude/commands/new-component.md"
echo "  .claude/commands/new-react-component.md"
echo "  .claude/commands/ux-review.md"
echo "  .claude/commands/persona-check.md"
echo ""
echo "Open this project in Claude Code and the design system will load automatically."
