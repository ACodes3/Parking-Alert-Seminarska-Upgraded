# Parking Alert — Monorepo Overview

This repository contains two frontends for the Parking Alert project:

- Legacy static site: the original HTML/CSS/JS dashboard kept for reference and comparison.
- Modern React app: a reimplementation using React + Vite with routing, components, and a Leaflet map.

## Structure

- [old_page](old_page): Legacy static site
	- [front-end](old_page/front-end): HTML pages, scripts, styles, and assets
	- [modals](old_page/modals): Reusable HTML modal templates
- [react_new_page](react_new_page): React + Vite implementation
	- [src/pages](react_new_page/src/pages): Routed pages (Dashboard, Login, Profile, etc.)
	- [src/layouts/Layout.jsx](react_new_page/src/layouts/Layout.jsx): App shell (sidebar + topbar)
	- [src/assets/components](react_new_page/src/assets/components): Reusable UI components (Map, Sidebar, etc.)
	- [src/utils/leafletIconFix.js](react_new_page/src/utils/leafletIconFix.js): Leaflet icon rendering helper for Vite

## Quick Start

### React app (recommended)

From the project root:

```bash
cd react_new_page
npm install
npm run dev
```

Vite will print a local URL (typically http://localhost:5173). For production:

```bash
npm run build
npm run preview
```

See the dedicated guide in [react_new_page/README.md](react_new_page/README.md) for environment variables (e.g., `VITE_MAP_TILE_URL`), scripts, and troubleshooting.

### Legacy static site

You can either open the HTML directly or serve it with a simple HTTP server.

- Open directly: open [old_page/front-end/index.html](old_page/front-end/index.html) in your browser.

- Serve via a local server (pick one):

```bash
# Python 3 (port 8000)
python -m http.server 8000 --directory old_page/front-end

# Node (http-server)
npx http-server old_page/front-end -p 8000
```

Then visit http://localhost:8000.

## Highlights

- Leaflet map integration using the modern React stack in the new app.
- Routed pages with a shared layout (sidebar + topbar) in the React app.
- Legacy UI, assets, and scripts preserved for reference under `old_page`.

## Tech Stack

- React app: React 18, Vite 7, React Router, Leaflet (via react-leaflet), react-icons, ESLint (flat config)
- Legacy site: Static HTML/CSS/JS with Bootstrap and jQuery utilities

## Where to Start

- Prefer the React app for ongoing development and new features: [react_new_page](react_new_page)
- Use the legacy site as a visual/behavioral reference or for asset migration: [old_page](old_page)

## Notes

- Environment variables for the React app must be prefixed with `VITE_` (e.g., `VITE_MAP_TILE_URL`).
- Some legacy data sources under `old_page/front-end/assets/js/dummyData` are placeholders; the React app should use real APIs/state when available.

