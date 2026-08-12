# Dheepam — Website

Premium microsite for **Dheepam** by Kaleesuwari Refinery Pvt. Ltd. — pure lamp
oils and agarbatti. React 19 + Vite 8 + TypeScript, Tailwind v4 for the design
system and Bootstrap 5 for responsive layout only.

This directory is the **repository root** and the **Vercel project root**.

## Quick start

```bash
npm ci
npm run dev
```

| Script            | Does                                          |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Vite dev server (default port 8443)           |
| `npm run build`   | Production build → `dist/`                    |
| `npm run typecheck` | `tsc --noEmit`, no emit                     |
| `npm run preview` | Serve the built `dist/` locally               |

Run **both** `npm run typecheck` and `npm run build` before opening a PR.

## Deployment — Vercel

Connect the GitHub repo to Vercel and accept the detected settings; `vercel.json`
pins them explicitly:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework        | Vite            |
| Install command  | `npm ci`        |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node             | 22.x (`engines.node`) |

No environment variables are required — the site has no backend, no API keys and
no analytics wired in. Purchase CTAs link out to `https://kaleesuwari.com`.

**Two things that will silently break a deploy if reintroduced:**

1. **Git LFS.** `.gitattributes` deliberately does not use it. Vercel clones
   without fetching LFS objects, so LFS-tracked images would arrive as ~130-byte
   pointer files, get bundled as "images", and every photograph on the live site
   would be broken — with a green build log.
2. **A second lockfile.** The project standardises on npm + `package-lock.json`.
   Adding `pnpm-lock.yaml` or `yarn.lock` makes Vercel's package-manager
   detection ambiguous; both are gitignored.

## Structure

```
.figma/make/site.json   <title>, meta description, robots, favicon
public/                 copied verbatim to dist/ root (favicon, apple-touch-icon)
src/
  App.tsx               routing (state, not a router) + section order
  types.ts              the Page union — single source of truth
  index.css             the entire design system
  hooks/useReveal.ts    GSAP scroll reveals
  components/           sections + pages
  imports/              optimised images and video, bundled + hashed by Vite
tools/                  Python asset builders — dev-only, never run at build time
vercel.json             build command, output dir, cache + security headers
```

## Assets

Shipped assets live in `src/imports/` and are **imported by the components**, so
Vite fingerprints them (`hero-banner-BiE9QOIR.webp`) for immutable caching and
fails the build if one goes missing. Nothing is fetched from a local disk path
at runtime.

The uncompressed originals are **not** in this repo — they live in `..\Images\`
on the design machine (35MB+ of source PNGs). The builders in `tools/` read from
there; point them elsewhere with the `DHEEPAM_IMAGES` environment variable:

```bash
python tools/build-dish-plates.py       # → src/imports/dishes/*.webp
python tools/build-section-plates.py    # → our-story.webp, agarbatti-scene.webp
python tools/build-hero-plate.py        # → hero-banner.webp
```

Each writes a contact sheet next to itself — **look at it before wiring anything
in**. Contact sheets are gitignored (regenerable, 1–2MB each).

Some inner-page and Festivals imagery is still hotlinked from Unsplash; see
`PROJECT_STATUS.md`.

## Documentation

- **`CLAUDE.md`** — durable rules: design system, motion, verification quirks,
  guardrails. Read first.
- **`PROJECT_STATUS.md`** — current state and the next task.
- **`AGENTS.md`** — Figma Make scaffold notes.
