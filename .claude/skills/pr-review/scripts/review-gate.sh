#!/usr/bin/env bash
# The gate that makes the pr-review skill compulsory.
#
#   review-gate.sh checks        run the automated checks on the staged changes
#   review-gate.sh mark          run the checks, then record the staged tree as reviewed
#   review-gate.sh check-commit  exit 1 unless the staged tree was reviewed
#   review-gate.sh check-push    exit 1 unless HEAD's tree was reviewed
#
# The approval is the git tree hash of what was reviewed, stored in
# .git/pr-review-approved (local, never committed). Committing the reviewed
# index produces a commit with that same tree, so one approval covers both the
# commit and the push. Any further change gives a different hash and needs a
# new review.
set -uo pipefail

cd "$(git rev-parse --show-toplevel)" || exit 1
SCRIPTS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARKER="$(git rev-parse --git-dir)/pr-review-approved"

blocked() {
  cat >&2 <<EOF
✋ Blocked: $1

This repository requires the PR review before every commit and push.
  • In Claude Code: ask Claude to "commit and push" (it runs the pr-review skill),
    or type /pr-review.
The review checks static errors, tests, leaked secrets, writes the PR
description and links open issues. It then approves exactly the reviewed changes.
EOF
  exit 1
}

run_checks() {
  local failed=0
  echo "── Secret scan"
  bash "$SCRIPTS/scan-secrets.sh" || failed=1

  if [ -f package.json ]; then
    if [ ! -d node_modules ]; then
      echo "node_modules missing: run npm install first" >&2
      return 1
    fi
    echo "── Lint"
    npm run --silent lint || failed=1
    if [ -f tsconfig.json ]; then
      echo "── Type check"
      npx --no-install tsc --noEmit && echo "Type check: clean" || failed=1
    fi
    if node -e 'process.exit(require("./package.json").scripts?.test ? 0 : 1)'; then
      echo "── Tests"
      npm test --silent || failed=1
    else
      echo "── Tests: no test script in package.json (skipped)"
    fi
  fi
  return $failed
}

case "${1:-}" in
  checks)
    run_checks ;;
  mark)
    if git diff --cached --quiet; then
      echo "Nothing staged. Stage the reviewed changes first." >&2
      exit 1
    fi
    run_checks || { echo "Checks failed: not approving." >&2; exit 1; }
    git write-tree > "$MARKER"
    echo "✓ Approved staged tree $(cut -c1-12 "$MARKER")" ;;
  check-commit)
    [ -f "$MARKER" ] || blocked "no PR review has been run."
    [ "$(git write-tree)" = "$(cat "$MARKER")" ] \
      || blocked "the staged changes differ from what was reviewed." ;;
  check-push)
    [ -f "$MARKER" ] || blocked "no PR review has been run."
    [ "$(git rev-parse 'HEAD^{tree}')" = "$(cat "$MARKER")" ] \
      || blocked "HEAD is not the commit that was reviewed." ;;
  *)
    echo "usage: $0 checks|mark|check-commit|check-push" >&2
    exit 2 ;;
esac
