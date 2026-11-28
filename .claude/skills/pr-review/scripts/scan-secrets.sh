#!/usr/bin/env bash
# Scan staged changes for leaked secrets.
#
# Looks only at lines being ADDED in the index (git diff --cached), so old
# history doesn't block new work. Exit 0 = clean, 1 = findings (printed).
#
# To allow a known false positive, put "pr-review:allow-secret" on that line.
set -uo pipefail

findings=0
report() { echo "  ✗ $1"; findings=$((findings + 1)); }

# 1. Files that should never be committed, whatever they contain.
while IFS= read -r f; do
  [ -z "$f" ] && continue
  base=$(basename "$f")
  case "$base" in
    .env.example|.env.sample|.env.template) ;;
    .env|.env.*|*.pem|*.key|*.p12|*.pfx|*.keystore|*.jks|id_rsa|id_ecdsa|id_ed25519|credentials.json|service-account*.json|.npmrc|.netrc)
      report "sensitive file staged: $f" ;;
  esac
done < <(git diff --cached --name-only --diff-filter=ACMR)

# 2. Secret-shaped strings in added lines.
patterns=(
  'AWS access key|(AKIA|ASIA)[0-9A-Z]{16}'
  'AWS secret key|aws_?secret_?access_?key[^A-Za-z0-9]{1,6}[A-Za-z0-9/+=]{40}'
  'GitHub token|(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{50,}'
  'Slack token|xox[abprs]-[A-Za-z0-9-]{10,}'
  'Stripe live key|(sk|rk)_live_[A-Za-z0-9]{20,}'
  'Razorpay live key|rzp_live_[A-Za-z0-9]{10,}'
  'Google API key|AIza[0-9A-Za-z_-]{35}'
  'OpenAI/Anthropic key|sk-(ant-|proj-)?[A-Za-z0-9_-]{32,}'
  'Private key block|-----BEGIN ([A-Z]+ )?PRIVATE KEY-----'
  'JWT|eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}'
  'Credentials in URL|[a-z][a-z0-9+.-]*://[^/[:space:]:@]+:[^/[:space:]@]{3,}@'
  'Hard-coded password/secret|(password|passwd|pwd|secret|api_?key|access_?token|auth_?token|client_?secret)["'"'"']?[[:space:]]*[:=][[:space:]]*["'"'"'][^"'"'"'[:space:]]{8,}["'"'"']'
)

current_file=""
while IFS= read -r line; do
  case "$line" in
    "+++ b/"*) current_file="${line#+++ b/}"; continue ;;
    "+++ "*|"---"*) continue ;;
    "+"*) ;;
    *) continue ;;
  esac
  added="${line#+}"
  [[ "$added" == *"pr-review:allow-secret"* ]] && continue
  for entry in "${patterns[@]}"; do
    label="${entry%%|*}"
    regex="${entry#*|}"
    if printf '%s' "$added" | grep -Eiq -- "$regex"; then
      snippet=$(printf '%s' "$added" | sed -E 's/^[[:space:]]+//' | cut -c1-100)
      report "$label in $current_file: $snippet"
    fi
  done
done < <(git diff --cached -U0 --no-color)

if [ "$findings" -gt 0 ]; then
  echo "Secret scan: $findings finding(s). Remove them (and rotate anything real) before committing."
  exit 1
fi
echo "Secret scan: clean"
