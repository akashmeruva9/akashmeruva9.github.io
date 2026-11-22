# akash.meruva — portfolio

Single-page portfolio. Next.js 16 (App Router) + Tailwind v4, statically exported for GitHub Pages.

## Editing content

**`src/content/site.ts` is the only file you need to touch.** Name, hero copy,
projects, experience, achievements, skills and education all live there — the
page renders whatever that file exports.

- Hero copy: `hero.lines` (headline), `hero.accent` (the coral last line),
  `hero.body` (fragments; `accent: true` colours a phrase).
- Project cards: `projects[]`. `preview` is the mono text inside the fake
  browser window — the last line is highlighted automatically.

## Local development

```bash
npm run dev     # http://localhost:3000
npm run build   # type-checks and writes the static site to out/
npm run lint
```

## Deploying to GitHub Pages

1. Create a repo and push:

   ```bash
   git remote add origin git@github.com:akashmeruva9/<repo>.git
   git add -A && git commit -m "Portfolio site"
   git push -u origin main
   ```

   Naming it `akashmeruva9.github.io` serves the site at the root domain;
   any other name serves it at `/<repo>` (handled automatically, see below).

2. In the repo: **Settings → Pages → Build and deployment → Source →
   GitHub Actions**.

3. Push to `main`. `.github/workflows/deploy.yml` builds and publishes on every
   push. It sets `NEXT_PUBLIC_BASE_PATH` to `/<repo>` for project sites and
   leaves it empty for `<user>.github.io`, so asset and résumé links resolve
   either way.

### Custom domain

Add a `public/CNAME` file containing the domain, point the DNS at GitHub, and
set the domain under Settings → Pages. Then keep `NEXT_PUBLIC_BASE_PATH` empty —
override the workflow's `Resolve base path` step to always output an empty path.

## The 3D hero

`src/components/computer-scene.tsx` — a react-three-fiber scene, all procedural
geometry (no model file to load). The monitor's screen is a 2D canvas drawn each
frame and used as an emissive texture, so the terminal output actually types
itself out; edit the `LINES` array to change what it prints. The rig tilts
toward the pointer and floats gently.

It's loaded via `next/dynamic` with `ssr: false` from
`src/components/hero-visual.tsx`, which first checks for WebGL and falls back to
a flat card if the browser can't render it. three.js (~600 KB) therefore stays
out of the initial bundle.

## Notes

- Dark-only by design; the palette lives in `src/app/globals.css` as CSS
  variables (`--bg`, `--ink`, `--accent`, …). Change `--accent` to re-theme.
- Sections fade in on scroll via `src/components/reveal.tsx`. The styles are
  scoped to `.js`, so without JavaScript everything renders visible.
- `output: "export"` means no server: no API routes, no server actions, no
  `next/image` optimisation.
