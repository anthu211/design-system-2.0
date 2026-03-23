#!/bin/bash
# push.sh — called by the `git push` alias.
# Bumps the patch version in index.html, commits, then pushes.

REPO_ROOT="$(git rev-parse --show-toplevel)"
FILE="$REPO_ROOT/index.html"

# Read current version
CURRENT=$(grep -o 'v[0-9]\+\.[0-9]\+\.[0-9]\+' "$FILE" | head -1)

if [ -n "$CURRENT" ]; then
  MAJOR=$(echo "$CURRENT" | sed 's/v//' | cut -d. -f1)
  MINOR=$(echo "$CURRENT" | sed 's/v//' | cut -d. -f2)
  PATCH=$(echo "$CURRENT" | sed 's/v//' | cut -d. -f3)
  NEW_PATCH=$((PATCH + 1))
  NEW_VERSION="v${MAJOR}.${MINOR}.${NEW_PATCH}"

  sed -i '' "s/${CURRENT}/${NEW_VERSION}/g" "$FILE"
  git -C "$REPO_ROOT" add "$FILE"
  git -C "$REPO_ROOT" commit -m "chore: bump version to ${NEW_VERSION}"
  echo "[push] Version bumped: ${CURRENT} → ${NEW_VERSION}"
fi

# Push (--no-verify skips the no-op pre-push hook)
git push --no-verify "$@"
