## Parking Alert — Legacy Static Frontend

This directory contains the original static HTML/CSS/JS dashboard kept for reference. It mirrors the legacy UI, styles, and behavior using jQuery and assorted plugins.

### Structure
- Pages and assets: [front-end](front-end)
  - HTML pages: [index.html](front-end/index.html), [prijava.html](front-end/prijava.html), [profil.html](front-end/profil.html), [ustvariRacun.html](front-end/ustvariRacun.html)
  - Styles: [assets/css](front-end/assets/css)
  - Scripts: [assets/js](front-end/assets/js)
    - Dummy data sources: [dummyData](front-end/assets/js/dummyData)
    - Map helpers: [leafletMap](front-end/assets/js/leafletMap)
- Shared modal templates: [modals](modals)

### Preview locally
Pick one of the following options:

1) Open the HTML file directly:
   - Open [front-end/index.html](front-end/index.html) in your browser.

2) Serve with a simple HTTP server:

```bash
# Python 3 (port 8000)
python -m http.server 8000 --directory old_page/front-end

# Node (http-server)
npx http-server old_page/front-end -p 8000
```

Then visit http://localhost:8000.

### Notes
- This codebase has no build step; it is plain static files.
- Uses older libraries (e.g., jQuery, Bootstrap, various plugins) and placeholder data in `assets/js/dummyData`.
- The modern React implementation lives in [../react_new_page](../react_new_page) and is recommended for new development.

