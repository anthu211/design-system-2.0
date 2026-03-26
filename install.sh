#!/bin/bash
# Prevalent AI — Claude Code Setup Installer
# Run this from your project root: bash install.sh

set -e

echo "Installing Prevalent AI Claude Code setup..."

# Create .claude/commands directory if it doesn't exist
mkdir -p .claude/commands

# Get the directory where this script lives
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Copy command files
cp "$SCRIPT_DIR/.claude/commands/new-page.md"            .claude/commands/new-page.md
cp "$SCRIPT_DIR/.claude/commands/new-component.md"       .claude/commands/new-component.md
cp "$SCRIPT_DIR/.claude/commands/new-react-component.md" .claude/commands/new-react-component.md
cp "$SCRIPT_DIR/.claude/commands/ux-review.md"           .claude/commands/ux-review.md
cp "$SCRIPT_DIR/.claude/commands/persona-check.md"       .claude/commands/persona-check.md

# Copy CLAUDE.md to project root
cp "$SCRIPT_DIR/CLAUDE.md" ./CLAUDE.md

echo ""
echo "✓ Done! Files installed:"
echo "  .claude/commands/new-page.md"
echo "  .claude/commands/new-component.md"
echo "  .claude/commands/new-react-component.md"
echo "  .claude/commands/ux-review.md"
echo "  .claude/commands/persona-check.md"
echo "  CLAUDE.md"
echo ""
echo "Open this project in Claude Code and the design system will load automatically."
