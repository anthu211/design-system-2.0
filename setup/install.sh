#!/bin/bash
# Prevalent AI — Claude Code Setup Installer
# Run from your project root:
#   Via zip:  bash /path/to/claude-setup/install.sh
#   Via curl: curl -fsSLk https://design-system-2-0.pages.dev/setup/install.sh | bash

set -e

BASE="https://design-system-2-0.pages.dev"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd || echo "")"
LOCAL_CMDS="$SCRIPT_DIR/.claude/commands"

echo "Installing Prevalent AI Claude Code setup..."
echo ""

mkdir -p .claude/commands

if [ -d "$LOCAL_CMDS" ] && [ -f "$LOCAL_CMDS/new-page.md" ]; then
  # Running from unzipped package — copy local files (no network needed)
  echo "Using local files from zip..."
  cp "$LOCAL_CMDS/new-page.md"            .claude/commands/new-page.md
  cp "$LOCAL_CMDS/new-component.md"       .claude/commands/new-component.md
  cp "$LOCAL_CMDS/new-react-component.md" .claude/commands/new-react-component.md
  cp "$LOCAL_CMDS/ux-review.md"           .claude/commands/ux-review.md
  cp "$LOCAL_CMDS/persona-check.md"       .claude/commands/persona-check.md
  cp "$LOCAL_CMDS/audit-page.md"          .claude/commands/audit-page.md
  cp "$SCRIPT_DIR/CLAUDE.md"              .claude/CLAUDE.md
else
  # Running via curl — fetch from hosted URL
  echo "Fetching latest files from $BASE..."
  curl -fsSLk "$BASE/commands/new-page.md"            -o .claude/commands/new-page.md
  curl -fsSLk "$BASE/commands/new-component.md"       -o .claude/commands/new-component.md
  curl -fsSLk "$BASE/commands/new-react-component.md" -o .claude/commands/new-react-component.md
  curl -fsSLk "$BASE/commands/ux-review.md"           -o .claude/commands/ux-review.md
  curl -fsSLk "$BASE/commands/persona-check.md"       -o .claude/commands/persona-check.md
  curl -fsSLk "$BASE/commands/audit-page.md"          -o .claude/commands/audit-page.md
  curl -fsSLk "$BASE/.claude/CLAUDE.md"               -o .claude/CLAUDE.md
fi

echo "✓ Done! Files installed:"
echo "  .claude/CLAUDE.md"
echo "  .claude/commands/new-page.md"
echo "  .claude/commands/new-component.md"
echo "  .claude/commands/new-react-component.md"
echo "  .claude/commands/ux-review.md"
echo "  .claude/commands/persona-check.md"
echo "  .claude/commands/audit-page.md"
echo ""
echo "Open this project in Claude Code and the design system will load automatically."
