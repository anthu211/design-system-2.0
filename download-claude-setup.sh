#!/bin/bash
# Prevalent AI — Claude Code Setup Package Builder
# Run from the design-system repo root to generate claude-setup.zip
# Usage: bash download-claude-setup.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "Building claude-setup.zip..."

# Remove existing zip
rm -f claude-setup.zip

# Create zip with the .claude directory and CLAUDE.md
zip -r claude-setup.zip \
  .claude/commands/new-page.md \
  .claude/commands/new-component.md \
  .claude/commands/new-react-component.md \
  .claude/commands/ux-review.md \
  .claude/commands/persona-check.md \
  CLAUDE.md

echo ""
echo "✓ claude-setup.zip created successfully"
echo ""
echo "Contents:"
zip -sf claude-setup.zip
echo ""
echo "Install instructions for developers:"
echo "  1. Copy claude-setup.zip into your project root"
echo "  2. unzip claude-setup.zip"
echo "  3. cd your-project && claude"
