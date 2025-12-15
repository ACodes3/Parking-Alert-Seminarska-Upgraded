## Parking Alert — React frontend

Modernized Parking Alert UI built with React and Vite. It keeps the legacy dashboard look while adding proper routing, a responsive shell, and a Leaflet map with current-location support.

### Features
- Routed pages with shared layout (sidebar + topbar): see [src/App.jsx](src/App.jsx) and [src/layouts/Layout.jsx](src/layouts/Layout.jsx)
- Leaflet map using CARTO tiles, geolocation, and the legacy marker helper `window.updateCurrentLocationMarker`: [src/assets/components/MapComponent.jsx](src/assets/components/MapComponent.jsx)
- Top bar with news ticker, notifications dropdown, and live clock: [src/assets/components/TopBar.jsx](src/assets/components/TopBar.jsx)
- Dashboard history table showing recent parking alerts: [src/assets/components/HistoryTable.jsx](src/assets/components/HistoryTable.jsx)
- Auth screens styled to mirror the old app: [src/pages/Login.jsx](src/pages/Login.jsx) and [src/pages/SignUp.jsx](src/pages/SignUp.jsx)

### Tech stack
- React 18 with React Router 6
- Vite 7 for dev/build
- Leaflet (via react-leaflet) for mapping
- react-icons for UI icons

### Prerequisites
- Node.js: 18.x or 20.x LTS (recommended). On Windows, install via https://nodejs.org and verify with `node -v`.
- Package manager: npm (bundled with Node). Verify with `npm -v`.
- Optional: Git for version control.

### Getting started
1) Install dependencies (Node 18+ recommended):
	```bash
	npm install
	```
2) Start the dev server:
	```bash
	npm run dev
	```
	Vite will print the local URL (typically http://localhost:5173).
3) Create a production build:
	```bash
	npm run build
	```
4) Preview the production build locally:
	```bash
	npm run preview
	```

### Available scripts
- `npm run dev`: Starts Vite dev server with hot reload.
- `npm run build`: Creates production build in `dist/`.
- `npm run preview`: Serves the built `dist/` locally.
- `npm run lint`: Runs ESLint using `eslint.config.js`.

### Environment variables
Create a `.env` file in `react_new_page/` to configure runtime values. Vite exposes vars prefixed with `VITE_`.

Example `.env`:
```ini
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_NEWS_POLL_INTERVAL_MS=30000
```

Usage in code:
```js
const tileUrl = import.meta.env.VITE_MAP_TILE_URL;
```

### Development tips
- Styling: Legacy CSS under `src/assets/styles` has been split into page and component styles. Prefer scoped classnames rather than global overrides.
- Routing: See `src/App.jsx` for route definitions; add new pages under `src/pages/` and register them.
- Components: Shared UI lives under `src/assets/components/`. Keep components presentational and move state/logic into pages or small hooks.
- Icons: Use `react-icons` instead of legacy icon fonts when possible.
- Images/Assets: Put static assets under `public/` to serve at the root.

### Mapping configuration
- Base tiles: Default uses CARTO/OSM. Override with `VITE_MAP_TILE_URL` in `.env`.
- Current location: Geolocation is requested by `MapComponent`. Windows browsers may require allowing location permissions.
- Legacy markers: The app can read global marker arrays (e.g., `window.parkirnaMesta`) for backward compatibility. Prefer fetching from API and storing in React state.
- Leaflet icon fix: See [src/utils/leafletIconFix.js](src/utils/leafletIconFix.js) to ensure icons render correctly with Vite.

### Project structure (high level)
- Pages and routes: [src/pages](src/pages)
- Shared layout: [src/layouts/Layout.jsx](src/layouts/Layout.jsx)
- Reusable UI components: [src/assets/components](src/assets/components)
- Styles migrated from the legacy UI: [src/assets/styles](src/assets/styles)

### Data and integration notes
- Map markers currently read from a global `window.parkirnaMesta`; replace with real API data or React state in [src/assets/components/MapComponent.jsx](src/assets/components/MapComponent.jsx).
- Notifications, alerts, and auth flows use placeholder data—hook these into your backend when available.
- Legacy static pages and assets remain under `old_page/` for reference.

### Troubleshooting
- Dev server not opening: Ensure ports 5173/5174 are free or set `--port` in `vite.config.js`.
- Leaflet icons missing: Confirm `leafletIconFix.js` is imported early (e.g., in `main.jsx`) and the image assets are available.
- Geolocation blocked: Check browser/site permissions and Windows privacy settings.
- ESLint errors: Run `npm run lint` and follow rules in `eslint.config.js`.
