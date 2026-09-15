# RoboSub LA — site concept

An underwater-themed concept for robosubla.org. Plain HTML/CSS/JS, bundled with [Vite](https://vitejs.dev) for local dev and builds.

## Structure

```
robosubla-site/
├── index.html        ← page markup
├── src/
│   ├── main.js        ← all interactive behavior (bubbles, depth gauge, reveals, counters)
│   └── style.css       ← all styling
├── public/              ← put real images/assets here later (currently empty)
└── package.json
```

## Getting started

1. Install [Node.js](https://nodejs.org) (LTS) if you don't already have it.
2. In this folder, run:
   ```
   npm install
   npm run dev
   ```
3. Open the local URL it prints (usually `http://localhost:5173`).

Edits to any file in `src/` or `index.html` hot-reload automatically.

## Building for deployment

```
npm run build
```

This outputs a static `dist/` folder you can upload anywhere (Netlify, Vercel, GitHub Pages, traditional web host) — no server required.

## Known placeholders to replace

- **Fleet spec numbers** (depth rating, thruster count, hull material) in `index.html` under `#fleet` are made up — swap in your vehicle's real specs.
- **Competition task list** under `#competition` is a generic RoboSub task list — update with the current year's actual tasks/scoring.
- **Social links** in the footer (`Instagram`, `GitHub`, `Contact`) are placeholder `#` links.
- **Sign up / resources buttons** under `#join` need real URLs (e.g. your Google Form sign-up link).
- No real photos yet — the mission section uses a simple line-art SVG diagram instead of a vehicle photo. Drop real images into `public/` and reference them as `/your-image.jpg`.

## Notes on the design

- Color and type tokens live at the top of `src/style.css` (`:root` block) — change `--abyss`, `--brass`, `--depth-bright` etc. there to retheme everything at once.
- The depth gauge, bubble field, and sonar rings all respect `prefers-reduced-motion` and turn off/simplify automatically for users who have that OS setting on.
- This is currently a **single page**. If you want separate pages (Fleet, Sponsors, Crew, Resources, Updates) matching the original nav, the next step is either splitting into multiple `.html` entry points in Vite, or migrating to a framework like Astro/Next.js if the site grows more dynamic (e.g. a CMS-driven blog for Updates).
