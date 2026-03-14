This project is deployed with https://flowershow.app/

Pages are generally created in markdown or markdown with html.

## Key references

- `docs/adding-places.md` — **How to add a new place** to the directory and the bespoke map. Read this before adding or modifying places.
- `docs/plans/2026-03-14-directory-and-map.md` — Implementation plan for the directory and map.

## Project structure

- `places/` — One markdown file per place, with YAML frontmatter (title, url, location, country, type, rating, video, image)
- `map.html` — Standalone bespoke map page. Islands are defined in a JS `places` array with SVG paths. See `docs/adding-places.md` for how to add entries.
- `scripts/build-places-json.js` — Extracts frontmatter from `places/*.md` to `data/places.json`. Run after adding/editing place files.
- `assets/reference/` — Anna Atkins cyanotype reference images (public domain, Met Museum)
- `assets/images/` — Place images (to be populated)

## Build commands

```bash
# Rebuild places JSON after adding/editing place markdown files
node scripts/build-places-json.js
```
