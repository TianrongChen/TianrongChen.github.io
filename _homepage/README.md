# Homepage maintenance

The current homepage is a standalone, accessible static page. All 32 publications
are rendered into HTML; JavaScript adds topic filters and search without being
required to read the bibliography.

## Update

- Edit `index.html` in this directory for the biography, news, and background.
- Edit `publications.json` for publication metadata. `selected` controls the
  initial selection; all entries remain available through All or search.
- Edit `../assets/css/homepage.css` or `../assets/js/homepage.js` for presentation
  and interactions.
- Run `python3 _homepage/build.py` from the repository root, then commit the
  regenerated root `index.html` along with its source changes.
- Preview with `python3 -m http.server 4173` and open `http://localhost:4173`.

## Publishing

GitHub Pages serves the `gh-pages` branch. The `master` branch retains the Jekyll
source for historical pages and the same static homepage sources. The old
`_pages/about.md` entry is removed from `master` so that there is only one page
at `/`. Jekyll copies the generated root `index.html` and assets as static files.

To publish a homepage-only update, synchronize the generated homepage and its
assets to `gh-pages`, preserving historical pages and assets, and push normally.
Keep `master` synchronized so a later full Jekyll build retains the homepage.
No force push or new hosting service is required.

The October 2026 update is based on the owner's supplied resume. Public paper
links were matched against arXiv, publisher pages, and existing repository links.
The original resume PDF is not a website asset.
