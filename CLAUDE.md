# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # type-checks and writes the static site to out/
npm run lint    # eslint (flat config, eslint-config-next)
```

There is no test suite. `npm run build` is the verification step (it runs the TypeScript check).

## Committing and pushing: PR review is compulsory

Whenever you're asked to commit, push, or open a PR, use the `pr-review` skill (`.claude/skills/pr-review/`). It reviews the changes, runs the checks, scans for secrets, links open issues, and opens the PR. `git commit` and `git push` are blocked until it approves the exact staged tree: by git hooks in `.githooks/` (installed by `npm install` via the `prepare` script) and by a Claude Code hook in `.claude/settings.json`. Don't bypass the gate (`--no-verify`, or editing `.git/pr-review-approved` by hand).

## What this is

Single-page résumé site for akashmeruva.in: Next.js 16.3 App Router, React 19, Tailwind v4 (via `@tailwindcss/postcss`, no tailwind config file). Statically exported and deployed to GitHub Pages.

- `next.config.ts` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized`. No server: no API routes, server actions, middleware, or `next/image` optimisation.
- `.github/workflows/deploy.yml` builds and publishes `out/` on every push to `main`. It sets `NEXT_PUBLIC_BASE_PATH` (consumed as `basePath`) to empty because the repo is `akashmeruva9.github.io`; `public/CNAME` points it at the custom domain.

## Architecture

**Content vs. layout.** All résumé data (name, contact, experience, projects, achievements, skills) lives in `src/content/site.ts` as the typed `resume` object. `src/app/page.tsx` is a single server component that renders it; `layout.tsx` builds metadata from it too. Content edits should go in `site.ts`, not the page.

**Earth-to-Mars scroll theme.** The page is framed as a flight from Earth (beside the `<h1>`) to Mars (beside the closing "Touchdown" section). Two client components drive it by measuring the DOM and reacting to scroll, writing styles directly through refs (no React state per frame):

- `flight-path.tsx` (desktop, `lg+`): a dotted trajectory in the left gutter. It locates anchors with `document.querySelector`: `main h1` (Earth), `#finish h2` (Mars), and `#<id> h2` for each entry in its `MILESTONES` array (`experience`, `projects`, `achievements`, `skills`). The ship's position is scroll progress interpolated between Earth and Mars, and it re-measures on `ResizeObserver`/resize.
- `mobile-mission.tsx` (below `lg`): a fixed top progress bar, plus a context row showing the current section and item. It reads `main section[data-label]` and `article[data-context]` from the page.

This makes the selectors and data attributes in `page.tsx` load-bearing. If you rename or add a section, keep its `id`, `data-label` and `<h2>` intact, add `data-context` on its articles, and update `MILESTONES` in `flight-path.tsx` for a desktop marker.

Supporting visuals are pure SVG/CSS: `planets.tsx` and `ship.tsx` (shared by both flight components; use `useId` for per-instance SVG ids), `night-sky.tsx` (stars from a seeded PRNG so server and client markup match), and `logos.tsx` (icon maps keyed by `Job.logo`, skill category, and link label, so new keys in `site.ts` need a matching entry there). Keyframe animations live in `src/app/globals.css`.

## Styling conventions

Dark-only. Colours are hard-coded Tailwind classes and hex values (`#0a0a0c` background, neutral greys, amber accents), not CSS variables. Fonts are Geist / Geist Mono via `next/font`, exposed as `--font-sans` / `--font-mono`.

## Gotchas

- `README.md` is partly stale. It describes an older design (`computer-scene.tsx`, `hero-visual.tsx`, `reveal.tsx`, CSS-variable palette, `hero`/`preview` fields), and none of that exists anymore. Trust the code.
- `three`, `@react-three/fiber` and `@react-three/drei` are still in `package.json` but nothing imports them.
