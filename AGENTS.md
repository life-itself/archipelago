This project is deployed with https://flowershow.app/

Pages are generally created in markdown or markdown with html.

## Key references

- `docs/adding-places.md` — **How to add a new place** to the directory and the bespoke map. Read this before adding or modifying places.
- `docs/plans/2026-03-14-directory-and-map.md` — Implementation plan for the directory and map.

## Project structure

- `places/` — One markdown file per place, with YAML frontmatter (title, url, location, country, type, rating, video, image)
- `index.md` — Home page (layout:plain). Full-screen map hero + about section below.
- `assets/archipelago-map.js` — All map JS: island data (`archipelagoPlaces` array with SVG paths), SVG defs injection, rendering. Edit this to add/move islands. See `docs/adding-places.md`.
- `map.html` — Redirects to `/` (kept for backwards compatibility with old links).
- `scripts/build-places-json.js` — Extracts frontmatter from `places/*.md` to `data/places.json`. Run after adding/editing place files.
- `assets/reference/` — Anna Atkins cyanotype reference images (public domain, Met Museum)
- `assets/images/` — Place images (to be populated)

## Flowershow gotchas

- **Inline `<script>` content gets mangled** — the markdown parser entity-encodes special chars (e.g. `ÿ` → `&yuml;`). Keep JS in external files under `assets/`.
- **Heading anchor SVGs** — Flowershow injects a small SVG icon (class `w-5 h-5`) into every heading that gets an auto-generated `id`. These appear in the DOM before other SVGs. Always use `getElementById('your-id')` to target a specific SVG, never `querySelector('someAncestor svg')`.
- **SVG child element IDs** — `id` on `<g>` elements inside SVGs may be stripped. IDs on the `<svg>` element itself survive. Inject all SVG children (defs, filters, shapes) via JS.
- **`<script>` tags in markdown** — Flowershow renders these; `defer` works. But inline script content is safer in external `.js` files.

## Build commands

```bash
# Rebuild places JSON after adding/editing place markdown files
node scripts/build-places-json.js
```
