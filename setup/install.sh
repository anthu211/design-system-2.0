#!/bin/bash
# Prevalent AI — Claude Code Setup
# Via zip:  bash claude-setup/install.sh
# Via curl: curl -fsSLk https://anthu211.github.io/design-system-2.0/setup/install.sh | bash

BASE="https://anthu211.github.io/design-system-2.0"

mkdir -p .claude/commands

# Detect if running from zip (BASH_SOURCE points to a real file)
# or via curl pipe (BASH_SOURCE is empty or /dev/stdin)
if [[ -n "${BASH_SOURCE[0]}" && "${BASH_SOURCE[0]}" != "/dev/stdin" && -f "${BASH_SOURCE[0]}" ]]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  LOCAL_CMDS="$SCRIPT_DIR/.claude/commands"
  if [ -f "$LOCAL_CMDS/new-page.md" ]; then
    echo "Installing from local zip..."
    cp "$LOCAL_CMDS/new-page.md"            .claude/commands/new-page.md
    cp "$LOCAL_CMDS/new-component.md"       .claude/commands/new-component.md
    cp "$LOCAL_CMDS/new-react-component.md" .claude/commands/new-react-component.md
    cp "$LOCAL_CMDS/ux-review.md"           .claude/commands/ux-review.md
    cp "$LOCAL_CMDS/persona-check.md"       .claude/commands/persona-check.md
    cp "$LOCAL_CMDS/audit-page.md"          .claude/commands/audit-page.md
    cp "$SCRIPT_DIR/CLAUDE.md"              .claude/CLAUDE.md
    echo "Done. Open project in Claude Code."
    exit 0
  fi
fi

echo "Installing from $BASE..."
curl -fsSLk "$BASE/commands/new-page.md"            -o .claude/commands/new-page.md
curl -fsSLk "$BASE/commands/new-component.md"       -o .claude/commands/new-component.md
curl -fsSLk "$BASE/commands/new-react-component.md" -o .claude/commands/new-react-component.md
curl -fsSLk "$BASE/commands/ux-review.md"           -o .claude/commands/ux-review.md
curl -fsSLk "$BASE/commands/persona-check.md"       -o .claude/commands/persona-check.md
curl -fsSLk "$BASE/commands/audit-page.md"          -o .claude/commands/audit-page.md
curl -fsSLk "$BASE/.claude/CLAUDE.md"               -o .claude/CLAUDE.md
echo "Done. Open project in Claude Code."
