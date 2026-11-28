#!/usr/bin/env bash
# Claude Code PreToolUse hook: stop `git commit` / `git push` unless the
# pr-review skill has approved the exact changes. Backstop for clones where the
# git hooks in .githooks/ haven't been installed yet.
set -uo pipefail

cmd=$(jq -r '.tool_input.command // ""')
gate="$CLAUDE_PROJECT_DIR/.claude/skills/pr-review/scripts/review-gate.sh"

# git, optionally with global options (-C dir, -c k=v, --no-pager), then the subcommand.
git_re='(^|[;&|(`[:space:]])git([[:space:]]+(-C[[:space:]]+[^[:space:]]+|-c[[:space:]]+[^[:space:]]+|--[a-z-]+))*[[:space:]]+'

if [[ "$cmd" =~ ${git_re}commit([[:space:]]|$) ]]; then
  if [[ "$cmd" =~ [[:space:]](--all|-[b-zA-Z]*a[a-zA-Z]*)([[:space:]]|$) ]]; then
    echo "Blocked: stage files explicitly and commit without -a, so the commit matches the reviewed changes." >&2
    exit 2
  fi
  bash "$gate" check-commit || exit 2
elif [[ "$cmd" =~ ${git_re}push([[:space:]]|$) ]]; then
  bash "$gate" check-push || exit 2
fi
exit 0
