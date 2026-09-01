# Priyanshu Chaudhary — Portfolio

Personal developer portfolio for Priyanshu Chaudhary, a full stack (MERN) developer.
Built as a single-page site with a clean, editorial design, a light/dark theme, and
content kept separate from the UI.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** for tooling and builds
- **Tailwind CSS v4** (design tokens defined in `src/index.css`)
- No animation library — scroll reveals use a small `IntersectionObserver` hook and
  CSS transitions, and respect `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production (`dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run oxlint

## Project structure

```
src/
  components/    UI components (Navbar, Hero, Projects, ...)
  data/          All content — edit these to update the site
  hooks/         useTheme, useInView, useActiveSection
  lib/           small helpers (cn)
  index.css      Tailwind + design tokens (colors, fonts)
  App.tsx        page composition
public/
  Priyanshu-Chaudhary-Resume.pdf   linked from the nav / footer
```

## Editing content

Everything shown on the site comes from `src/data/`:

- `profile.ts` — name, role, contact links, intro copy
- `projects.ts` — projects (name, problem, highlights, tech, links)
- `experience.ts`, `education.ts`, `skills.ts`, `certifications.ts`, `exploring.ts`

Colors and fonts live as CSS variables at the top of `src/index.css` — change
`--accent` to reskin the whole site.

## Deployment

The build in `dist/` is fully static and can be hosted on Vercel, Netlify,
Cloudflare Pages, or GitHub Pages.
```bash
npm run build
```
