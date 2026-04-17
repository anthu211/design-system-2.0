#!/bin/bash
# Prevalent AI — Claude Code Setup Package Builder
# Run from the design-system repo root to generate claude-setup.zip
# Usage: bash download-claude-setup.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "Building claude-setup.zip..."

# Remove existing zip and staging dir
rm -f claude-setup.zip
rm -rf /tmp/claude-setup-stage

# Stage into a named folder so Finder extracts to "claude-setup/" not hidden dirs
STAGE=/tmp/claude-setup-stage/claude-setup
mkdir -p "$STAGE/.claude/commands"

cp .claude/commands/new-page.md            "$STAGE/.claude/commands/new-page.md"
cp .claude/commands/new-component.md       "$STAGE/.claude/commands/new-component.md"
cp .claude/commands/new-react-component.md "$STAGE/.claude/commands/new-react-component.md"
cp .claude/commands/ux-review.md           "$STAGE/.claude/commands/ux-review.md"
cp .claude/commands/persona-check.md       "$STAGE/.claude/commands/persona-check.md"
cp .claude/CLAUDE.md                       "$STAGE/CLAUDE.md"
cp install.sh                              "$STAGE/install.sh"

# Build zip from inside staging parent so paths start with "claude-setup/"
cd /tmp/claude-setup-stage
zip -r "$SCRIPT_DIR/claude-setup.zip" claude-setup/ --exclude "*.DS_Store"

cd "$SCRIPT_DIR"
rm -rf /tmp/claude-setup-stage

echo ""
echo "✓ claude-setup.zip created successfully"
echo ""
echo "Contents:"
zip -sf claude-setup.zip
echo ""
echo "Install instructions for developers:"
echo "  1. Download claude-setup.zip"
echo "  2. Open Terminal, cd into your project root"
echo "  3. Run: unzip -o ~/Downloads/claude-setup.zip -d /tmp/cs && bash /tmp/cs/claude-setup/install.sh"
echo "  4. Open project in Claude Code — design system loads automatically"
