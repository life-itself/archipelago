# Adding Places to the Archipelago

Instructions for adding a new place to the directory and the bespoke map.

## Overview

Adding a place involves two things:

1. **Create a place markdown file** in `places/` with structured frontmatter
2. **Add an island entry** to the `archipelagoPlaces` array in `index.md`

Then rebuild the JSON data file.

## Step 1: Create the place file

Create `places/<slug>.md` where `<slug>` is a URL-friendly version of the name (lowercase, hyphens for spaces).

```markdown
---
title: "Place Name"
url: "https://example.com"
location: "City/Region, Country"
country: "Country"
lat: 0.0000          # optional, latitude
lng: 0.0000          # optional, longitude
type: community / residency   # free-text descriptive (not a fixed enum)
rating: 7            # 1-10, Tucker's metamodern-center rating (not displayed publicly)
video: ""            # optional YouTube/Vimeo URL
image: "https://screenshotit.app/example.com"  # screenshotit URL (see below)
---

![](https://screenshotit.app/example.com)

- **Location:** City/Region, Country
- **Type:** Community / Residency
- **Website:** https://example.com

[← Back to the map](/)

Free-text description of the place. Include ethos, vibe, what it's like to visit or stay.

https://youtube.com/watch?v=VIDEO_ID
```

### Page body structure

The body follows a consistent layout:

1. **Screenshot image** — `![](screenshotit-url)` (see Images section below)
2. **Info card** — bullet list with Location, Type, and Website (plain URL, not a markdown link)
3. **Back to map link** — `[← Back to the map](/)`
4. **Description** — free-text about the place
5. **Video** — bare YouTube/Vimeo URL on its own line (Flowershow auto-embeds it)

### Images

We use [screenshotit.app](https://screenshotit.app/) to generate images from each place's website. The URL format is:

```
https://screenshotit.app/{domain-and-path}
```

Strip the protocol (`https://`) and any trailing slash. Examples:
- `https://www.braveearth.com/` → `https://screenshotit.app/www.braveearth.com`
- `https://futurethinkers.org/village/` → `https://screenshotit.app/futurethinkers.org/village`

Set this URL in both:
- The `image` frontmatter field
- An `![](url)` on the first line of the body (before the info card)

If a place has no website URL, leave `image` empty and omit the screenshot line.

### Notes on `type`

The `type` field is free-text descriptive, not a fixed enum. Use whatever best describes the place:
- community / residency
- retreat centre
- intentional community
- festival
- pop-up gathering
- monastery
- regenerative community
- etc.

Keep it short and lowercase. This appears both in frontmatter and in the body info card.

## Step 2: Add an island to the map

Edit `index.md` and add an entry to the `archipelagoPlaces` array in the `<script>` section. Each entry looks like this:

```javascript
{ id: "place-slug", title: "Display Name", location: "Country/Region", url: "/places/place-slug",
  x: 500, y: 300, size: 0.55, filter: "island-texture",
  // Brief description of the shape for future reference
  paths: [
    "M0,-14 C6,-16 12,-10 ..."
  ]
},
```

### Positioning (x, y)

The SVG canvas is `1200 x 800`. Places are laid out as an imaginal island chain, NOT a geographic map, but with loose regional clustering:

- **Americas**: left side (x: 80–310)
  - North America upper-left (y: 120–370)
  - Central/South America lower-left (y: 440–600)
- **Europe**: centre (x: 380–700)
  - UK & Scandinavia upper-centre (y: 120–200)
  - France mid-centre (y: 280–340)
  - Spain & Italy centre-south (y: 320–420)
  - Portugal cluster centre-south-west (x: 380–490, y: 470–610)
- **Asia/Pacific**: right side (x: 750–900)

When placing a new island, check what's nearby and leave breathing room (~60–80px minimum between islands). Look at the existing layout for reference.

### Size

Keep `size` between **0.5 and 0.65**. All islands should be roughly similar in visual volume — don't make some significantly bigger than others. Use **0.55** as the default.

### Filter

Pick one of the four SVG displacement filters for variety:
- `island-texture` — medium organic distortion (seed 1)
- `island-texture-2` — slightly different character (seed 42)
- `island-texture-3` — more pronounced distortion (seed 99)
- `island-wispy` — lighter, finer distortion for small islands

Vary which filter you use across nearby islands so they don't all look the same.

### Paths (the island shape)

This is the most important part for the map's aesthetic. Each island is one or more SVG path strings drawn relative to (0,0). The SVG displacement filter will further distort the edges organically.

**Design principles:**
- Shapes are inspired by **Anna Atkins cyanotype photograms of algae** — organic, irregular silhouettes with tendrils, inlets, branching fronds, and wispy tips. See `assets/reference/arch-1.jpeg` and `assets/reference/arch2-cluster.jpeg` for the aesthetic.
- Do NOT make simple ovals or circles. Create **unique, organic silhouettes** — each island should have a distinct character.
- Keep shapes relatively small — path coordinates typically range from about -20 to +20 (some up to -35 for taller forms).
- Use **multiple paths** for complex islands: a main body plus smaller tendril/spur paths that branch off.
- Use cubic bezier curves (`C`) for smooth organic lines.

**Shape vocabulary — types of forms that work well:**
- Branching frond with tendril arms
- Elongated kelp blade with ruffled edges
- Fan or leaf shape with serrated edge
- Forked or Y-shaped forms
- Crescent with wispy tips
- Coral-like branching
- Amoeba with pseudopods
- Teardrop trailing off
- Compact form with deep inlets/bays

**Example — a branching frond:**
```javascript
paths: [
  // Main body
  "M-2,-35 C0,-38 3,-36 4,-30 C5,-22 8,-18 6,-10 C4,-2 8,4 10,12 C12,18 8,22 4,20 C0,18 -2,12 -4,8 C-6,4 -8,-2 -6,-10 C-4,-18 -6,-24 -4,-30 C-3,-34 -2,-36 -2,-35",
  // Right tendril
  "M6,-10 C10,-14 14,-12 16,-6 C18,0 15,4 12,2 C9,0 8,-4 6,-10",
  // Left tendril
  "M-6,-10 C-10,-8 -14,-12 -16,-18 C-17,-22 -14,-24 -12,-20 C-10,-16 -8,-12 -6,-10"
]
```

**Style rules:**
- Fill colour is `#e8dfd0` (warm cream) at `opacity: 0.88` — this is set in the JS render code, not per-island
- No blur or glow effects — shapes render crisp, with only the turbulence displacement filter for organic edge distortion
- Labels are rendered automatically below each island in Cormorant Garamond serif

## Step 3: Rebuild the JSON data

After adding the place markdown file, run the build script to regenerate `data/places.json`:

```bash
node scripts/build-places-json.js
```

This reads all `places/*.md` frontmatter and outputs JSON used by other consumers. The map currently reads from its inline `places` array, not from this JSON, but keep it in sync.

## Step 4: Commit

```bash
git add places/<slug>.md index.md data/places.json
git commit -m "feat: add <Place Name> to directory and map"
```
