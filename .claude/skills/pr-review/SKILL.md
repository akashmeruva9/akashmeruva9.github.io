---
name: pr-review
description: Compulsory pre-commit PR review for this repository. Reviews every change, runs lint/type-check/tests, scans for leaked passwords and keys, writes the PR description, links matching open GitHub issues, then commits, pushes and opens or updates the pull request. Use this whenever the user asks to commit, push, ship, "send it", open/raise a PR, or save their work to GitHub, even if they don't mention a review. In this repo `git commit` and `git push` are blocked until this skill approves the changes, so never try to commit or push any other way.
---

# PR review → commit → push → PR

Everyone in this repo runs this review before code reaches GitHub. Pushing to
`main` deploys the live site (`.github/workflows/deploy.yml`), so the review is
the last chance to catch a broken build or a leaked key before it's public.

Git hooks (`.githooks/`) and a Claude Code hook block `git commit` / `git push`
until `review-gate.sh mark` has approved the exact staged tree. The gate is
there to enforce the review, so never work around it: no `--no-verify`, no
editing `.git/pr-review-approved` by hand, no running `mark` before the review
below is done. If the gate blocks you, finish the review.

Scripts live in `.claude/skills/pr-review/scripts/` (called `$S` below).

## 1. Gather the changes

```bash
git status --short
git fetch origin --quiet
git diff origin/main...HEAD --stat   # commits not on main yet
git diff HEAD --stat                 # uncommitted work
```

Review **everything that will land on main**: unpushed commits plus
uncommitted work. Read the full diffs (`git diff origin/main...HEAD`,
`git diff HEAD`), not just the stats. Untracked files count too. Read them
before you decide to include them.

If there's nothing to commit and nothing unpushed, say so and stop.

## 2. Review the code

Read the changes the way a careful senior reviewer would, and look at the
surrounding code where a diff alone isn't enough. Look for:

- **Bugs:** logic errors, broken edge cases, wrong types, missing null checks,
  regressions in behaviour that used to work.
- **Repo conventions:** this file and `CLAUDE.md`. For example, résumé content
  belongs in `src/content/site.ts`. Section `id`, `data-label` and
  `data-context` attributes in `page.tsx` drive the flight-path animation.
  New icon keys need an entry in `logos.tsx`.
- **Leftovers:** `console.log`, commented-out code, TODOs added in this change,
  debug flags, unrelated files (screenshots, `.DS_Store`, build output).
- **Static-export breakage:** the site uses `output: "export"`, so API routes,
  server actions, middleware and `next/image` optimisation will fail the build.

Sort what you find into **blocking** (bugs, secrets, failing checks) and
**suggestions**. Fix blocking issues yourself when the fix is clear and
small. Otherwise stop, report them, and ask the user how to proceed. Don't
commit known-broken code.

## 3. Tests

Check whether the change has tests that match it:

- If the repo has a test runner (a `test` script in `package.json`) and the
  change touches logic in `src/` without adding or updating tests, that's
  blocking. Write the missing tests, or ask the user if they'd rather skip
  them for this change.
- If the repo has **no** test runner (currently true for this repo), don't
  invent a framework mid-commit. Say so in the PR description under
  *Testing*, and list what you verified instead: lint, type check, and
  `npm run build` for any change beyond content or copy.

## 4. Stage and run the gate

Stage the files explicitly. Never use `git add -A` / `git add .` blindly, and
never `git commit -a`. Staging by name keeps stray files out, and the gate
approves exactly what's in the index.

```bash
git add <files…>
bash $S/scan-secrets.sh          # quick look first; fix anything it finds
bash $S/review-gate.sh mark      # secret scan + lint + tsc + tests, then approves
```

If the secret scan flags something:

- **Real secret:** unstage it, move it to an env var or untracked config, and
  tell the user to **rotate it**. Even uncommitted, it may already be exposed
  elsewhere.
- **False positive** (e.g. an example string in docs): add the comment
  `pr-review:allow-secret` on that line and say why in the PR description.

If lint, the type check or tests fail, fix the problem and run `mark` again.
`mark` only approves when every check passes. Restaging anything after `mark`
invalidates the approval, so run `mark` again after any change.

## 5. Branch

`main` deploys straight to production, so changes go through a PR:

- On `main`: create a branch named `<type>/<short-slug>` (types: `feat`, `fix`,
  `chore`, `docs`, `refactor`, `style`), e.g. `feat/add-gsoc-project`. If the
  change resolves an issue, put its number in the name: `fix/12-mobile-overlap`.
  Unpushed commits on `main` come along when you branch. After the PR is open,
  reset local `main` to `origin/main` only if the user agrees.
- On a feature branch: stay on it.

## 6. Find related open issues

```bash
gh issue list --state open --limit 100 --json number,title,body,labels,assignees
```

Match issues against the change: issue numbers in the branch name or commit
messages, files or features the issue mentions, and wording that describes
the same bug or request.

- Clear match that the change fully resolves → `Closes #N` (GitHub links it
  to the PR and closes it on merge).
- Partly addressed, or only related → `Refs #N`. That links it without closing it.
- Unsure → ask the user before linking. A wrong `Closes` auto-closes an open issue.

For each issue you link, make sure it has an assignee:
`gh issue edit N --add-assignee @me` when it has none. If nothing matches, say
"No related open issues" in the PR description. Don't force a link.

## 7. Commit

Use a Conventional Commit message: `type(scope): summary`, imperative, ≤72
chars, with a body that explains *why* when it isn't obvious. End with any
attribution trailer your session instructions require.

```bash
git commit -F <message-file>     # the pre-commit hook re-verifies the approval
```

## 8. Push and open the PR

```bash
git push -u origin HEAD          # the pre-push hook re-verifies the approval
gh pr view --json number,url 2>/dev/null   # existing PR for this branch?
```

Write the description to a file and run `gh pr create --base main --title
"<commit summary>" --body-file <file>`. If a PR already exists, run `gh pr edit
--body-file <file>` instead, and fold the new commits into the description.

Use this template for the description:

```markdown
## Summary
<1–3 sentences: what changed and why, for someone who hasn't seen the code.>

## Changes
- <grouped by area, the meaningful changes, not a file list>

## Related issues
Closes #N / Refs #N, or "No related open issues"

## Testing
- [x] Lint (`npm run lint`)
- [x] Type check (`tsc --noEmit`)
- [x] Build (`npm run build`)   <!-- or note why it wasn't needed -->
- [ ] Tests: <run and passing / "no test runner in repo">
- <manual checks, e.g. "checked flight path on mobile and desktop widths">

## Review notes
- Secret scan: clean <or: what was flagged and why it's safe>
- <non-blocking suggestions from step 2, and anything reviewers should look at>
```

End the body with the PR attribution line from your session instructions.

## 9. Report back

Tell the user, briefly:
- the PR link and branch
- what the review found and what you fixed
- which issues were linked (Closes vs Refs)
- anything left for them: suggestions you didn't apply, secrets to rotate,
  tests worth adding
