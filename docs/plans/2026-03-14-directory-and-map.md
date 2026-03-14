# Archipelago Directory & Map Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a curated directory of places as markdown files, then create a beautiful bespoke "imaginal" map in the Anna Atkins cyanotype style, with each place rendered as an island on a deep blue sea.

**Architecture:** Places are individual markdown files in `places/` with structured frontmatter. A build script extracts frontmatter to JSON for the map. The map itself is a standalone HTML page using SVG to recreate the cyanotype aesthetic — white/cream organic island shapes on Prussian blue, labeled with place names, interactive on hover/click. Images for places are stored in `assets/images/`.

**Tech Stack:** Markdown + YAML frontmatter, Node.js/Python script for JSON extraction, HTML + SVG + CSS for the map, vanilla JS for interactivity. Deployed via Flowershow (which supports standalone HTML pages and inline scripts).

**Key references:**
- `docs/bespoke-map.md` — design brief for the map aesthetic, links to the cosmos.so collection and Met Museum source
- `assets/reference/arch-1.jpeg` and `assets/reference/arch2-cluster.jpeg` — Anna Atkins cyanotype prints used as visual reference
- Source: public domain, from [Met Museum collection](https://www.metmuseum.org/art/collection/search/286656)

---

## Phase 1: Places Directory

### Task 1: Create directory structure

**Files:**
- Create: `places/` directory
- Create: `assets/images/` directory

**Step 1: Create the directories**

```bash
mkdir -p places
mkdir -p assets/images
```

**Step 2: Commit**

```bash
git add places/.gitkeep assets/images/.gitkeep
git commit -m "feat: add places and assets directory structure"
```

---

### Task 2: Define the place template and create all place files

Each place gets a markdown file with this frontmatter schema:

```yaml
---
title: "Place Name"
url: "https://..."
location: "Region/City, Country"
country: "Country"
type: place | pop-up | event
rating: 1-10          # Tucker's metamodern-center rating, not displayed publicly
video: "https://..."  # optional
image: ""             # filename in assets/images/, to be added later
---
```

The body contains a free-text description — ethos, vibe, what it's like to visit/stay, embedded videos, links, etc. For now, most bodies will be minimal (a one-liner or empty) since we're seeding from the list.

Note: `image` is left empty for now — we don't have images for any places yet. A placeholder will be used wherever images are displayed. Sourcing good images for each place is a separate task (see Task 4.5 below).

**Files to create** (one per place from `list.md`):

- `places/traditional-dream-factory.md`
- `places/future-thinkers-smart-village.md`
- `places/nuanu.md`
- `places/eterna.md`
- `places/brave-earth.md`
- `places/feytopia.md`
- `places/emerge-lakefront.md`
- `places/clear-sky-retreat-center.md`
- `places/monastic-academy.md`
- `places/blue-morpho.md`
- `places/possibility-alliance.md`
- `places/liminal-village.md`
- `places/bergerac-praxis-hub.md`
- `places/burning-man.md`
- `places/borderland.md`
- `places/tamera.md`
- `places/casa-tilo.md`
- `places/sky-meadow-retreat.md`
- `places/the-alembic.md`
- `places/realisation-festival.md`
- `places/fools-valley.md`
- `places/transformational-connection-hub.md`
- `places/tierramor.md`

**Step 1: Create all place files**

Create each file from the data in `list.md`. Example for the first entry:

```markdown
---
title: "Traditional Dream Factory"
url: "https://traditionaldreamfactory.com/"
location: "Portugal"
country: "Portugal"
type: place
rating: 6
video: "https://youtu.be/btBqOboLdOg?feature=shared"
image: ""
---

A community and residency space in Portugal.
```

Repeat for all 23 places, extracting name, URL, location/country, rating, video, and type from the list.

**Step 2: Commit**

```bash
git add places/
git commit -m "feat: add all 23 place directory entries from initial list"
```

---

### Task 3: Create a places index page

**Files:**
- Create: `places/index.md`

**Step 1: Create the index**

A simple page that lists all places, rendered by Flowershow. Could be a hand-maintained list or use Flowershow's folder listing. Start with a simple manually curated version:

```markdown
---
title: Places
---

The islands of the archipelago — places where a regenerative, second renaissance culture is emerging.

<!-- This page will eventually be auto-generated from the place files -->
```

**Step 2: Commit**

```bash
git add places/index.md
git commit -m "feat: add places index page"
```

---

### Task 4: Build a frontmatter-to-JSON extraction script

This script reads all `places/*.md` files, parses their YAML frontmatter, and outputs a `places.json` file that the map can consume.

**Files:**
- Create: `scripts/build-places-json.js` (or `.py` — whichever is more convenient)
- Create: `data/places.json` (output)

**Step 1: Write the script**

The script should:
1. Glob `places/*.md` (excluding `index.md`)
2. Parse YAML frontmatter from each
3. Output a JSON array to `data/places.json` with fields: `id` (filename slug), `title`, `url`, `location`, `country`, `type`, `rating`, `video`, `image`

**Step 2: Run the script and verify output**

```bash
node scripts/build-places-json.js
cat data/places.json | head -30
```

Expected: a JSON array with 23 entries.

**Step 3: Commit**

```bash
git add scripts/ data/
git commit -m "feat: add script to extract places frontmatter to JSON for map"
```

---

### Task 4.5: Source images for each place

**Not blocking Phase 2** — the map doesn't depend on place images. But this should be done thoughtfully, not rushed.

For each place:
1. Find a high-quality, representative photo (from their website, social media, or video stills)
2. Ensure we have rights to use it (Creative Commons, permission, or fair use for linking/embedding)
3. Save to `assets/images/[slug].jpg`, resize to a consistent dimension (e.g. 800x600)
4. Update the place's frontmatter `image` field

This can be done incrementally — a few at a time — and in parallel with map work.

---

### Checkpoint: Push Phase 1

```bash
git push
```

At this point the directory is live on the site. Review and iterate if needed before moving to Phase 2.

---

## Phase 2: Bespoke Cyanotype Map

The centrepiece of the project. An "imaginal map" — not geographically accurate, but evocative. Each place is rendered as an organic, cyanotype-style island shape on a deep Prussian blue sea. The feel should match the Anna Atkins prints from the Met collection (see `assets/reference/arch-1.jpeg` and `assets/reference/arch2-cluster.jpeg`).

### Design Principles

- **Colour palette:** Deep Prussian blue (#1a5276 to #1b4f72 range) background, white/cream (#f5f0e8) island shapes with subtle transparency and texture
- **Island shapes:** Organic, irregular, slightly translucent edges — mimicking the cyanotype photogram look. SVG filters (feGaussianBlur, feTurbulence, feDisplacementMap) can create organic edges. Could also use actual cropped/traced elements from the reference images.
- **Layout:** Scattered island-chain arrangement, loosely clustered by region (Europe, Americas, Asia) but not strictly geographic. The feel of `arch2-cluster.jpeg` — multiple distinct blobs with breathing room.
- **Labels:** Place names in a serif or handwritten-style font, positioned near each island. Subtle, elegant.
- **Interactivity:** Hover to highlight an island and show a tooltip with place name + location. Click to navigate to the place's page.
- **Texture:** Subtle paper/grain texture overlay to evoke the printed-page feel of the originals.

### Approach Options (to explore in implementation)

1. **Pure SVG generation:** Programmatically create island shapes using SVG paths with turbulence filters. Most flexible, easy to add new places.
2. **Hybrid: real cyanotype image crops + SVG labels:** Cut island shapes from the reference images, position them on the blue background, overlay SVG text labels. Closest to the original aesthetic but harder to add new islands.
3. **SVG with cyanotype texture fills:** Generate shapes programmatically but fill them with a texture sampled from the real cyanotype prints. Best of both worlds.

The implementation task should explore these and pick whichever gets closest to the reference images.

### Task 5: Build the bespoke map page

**Files:**
- Create: `map.md` (or `map.html` — Flowershow entry point)
- Create: `assets/map/map.js` (map logic)
- Create: `assets/map/map.css` (map styles)

**Step 1: Study SVG techniques for cyanotype reproduction**

Before coding, investigate:
- SVG `feTurbulence` + `feDisplacementMap` for organic edges
- SVG `feGaussianBlur` for the soft photogram glow
- CSS/SVG texture overlays for paper grain
- Whether tracing/cropping shapes from `arch-1.jpeg` / `arch2-cluster.jpeg` is viable

**Step 2: Build a prototype with 3-4 islands**

Start with a small subset (e.g. Bergerac Praxis Hub, Emerge Lakefront, Monastic Academy, Traditional Dream Factory) to nail the aesthetic before scaling to all 23.

Create a standalone HTML page that:
1. Sets up the Prussian blue background
2. Renders 3-4 island shapes with the cyanotype look
3. Labels each island
4. Has hover/click interactivity

**Step 3: Iterate on the aesthetic**

This is the most important step. Compare against `assets/reference/arch-1.jpeg` and `assets/reference/arch2-cluster.jpeg`. Adjust colours, blur, transparency, edge roughness until it feels right.

**Step 4: Scale to all 23 places**

Read from `data/places.json` to render all islands. Arrange them in a pleasing scattered layout. Consider:
- Pre-defined x,y positions for each island (stored in JSON or in the script)
- Varying island sizes (perhaps loosely tied to rating, or random)
- Rough regional clustering

**Step 5: Add interactivity**

- Hover: gentle glow/scale effect, tooltip with name + location
- Click: navigate to `/places/[slug]`

**Step 6: Commit and push**

```bash
git add map.md assets/map/
git commit -m "feat: add bespoke cyanotype-style archipelago map"
git push
```

---

### Task 6: Iterate on the map

Review the map, compare with reference images, and refine. This is intentionally open-ended — the map is the centrepiece and worth spending time on.

Areas to iterate:
- Island shape variety and organic quality
- Colour matching to the original prints
- Typography and label placement
- Overall composition and balance
- Mobile responsiveness
- Loading performance

---

## Phase 3: Process & Contributing Guide

### Task 7: Write the "how to add a place" guide

**Files:**
- Create: `docs/contributing.md`

Document:
1. How to create a new place file (frontmatter schema, body format)
2. How to add an image
3. How to rebuild `places.json`
4. How to add the place to the map (x,y position, island shape)
5. Instructions formatted for AI assistants (so someone can paste the guide into Claude/ChatGPT and say "add this place")
6. Instructions for human contributors (PR workflow)

**Step 1: Write the guide**

**Step 2: Commit**

```bash
git add docs/contributing.md
git commit -m "docs: add contributing guide for adding new places"
```

---

## Appendix: Future / Parallel Tasks

These are not part of the current plan but noted for later:

- **Geocoding**: Look up lat/long coordinates for all 23 places. Add `latitude` and `longitude` fields to frontmatter. This enables a future geographic map (Leaflet/Mapbox).
- **Geographic map**: A standard interactive map showing actual locations. Complementary to the bespoke map.
- **Richer place descriptions**: Flesh out the body text for each place with ethos, visiting info, photos, embedded videos.
- **Auto-generated index**: Replace the manual places index with one auto-generated from frontmatter.
