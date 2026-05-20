#!/bin/bash
# Prevalent AI — Document Skills Setup
# Run this once after cloning the repo to install dependencies and register slash commands.

set -e

echo "Installing Python dependencies..."
pip3 install -r "$(dirname "$0")/requirements.txt"

echo "Registering slash commands with Claude Code..."
CLAUDE_CMD_DIR="$HOME/.claude/commands"
PROJ_CMD_DIR="$(cd "$(dirname "$0")/../.." && pwd)/.claude/commands"

# Claude Code first checks .claude/commands/ in the project root — already there.
# This script just ensures dependencies are installed.

echo ""
echo "Done. You can now use these slash commands in Claude Code:"
echo "  /generate-deck [description]   — create a branded .pptx"
echo "  /generate-doc  [description]   — create a branded .docx"
echo ""
echo "Generated files will appear in:"
echo "  document-skills/downloads/output/"
