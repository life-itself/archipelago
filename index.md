---
layout: plain
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">

<style>
  #map-hero {
    position: relative;
    width: 100%;
    height: calc(100vh - 4rem);
    min-height: 500px;
    background: #14405c;
    overflow: hidden;
  }

  #map-hero svg {
    width: 100%;
    height: 100%;
  }

  .island-group {
    cursor: pointer;
    transition: opacity 0.3s ease;
  }

  .island-group:hover {
    opacity: 0.85;
  }

  .island-label {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 13px;
    fill: #e8e0d0;
    opacity: 0.85;
    pointer-events: none;
    text-anchor: middle;
  }

  .island-label-bg {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 13px;
    fill: none;
    stroke: #1a5276;
    stroke-width: 3;
    pointer-events: none;
    text-anchor: middle;
  }

  .map-tooltip {
    position: fixed;
    background: rgba(10, 40, 60, 0.9);
    border: 1px solid rgba(232, 224, 208, 0.3);
    color: #e8e0d0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    padding: 10px 16px;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 1000;
    max-width: 250px;
  }

  .map-tooltip.visible { opacity: 1; }

  .map-tooltip .place-name {
    font-weight: 400;
    font-size: 17px;
    margin-bottom: 4px;
  }

  .map-tooltip .place-location {
    font-style: italic;
    font-weight: 300;
    opacity: 0.7;
  }

  .map-grain-overlay {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    opacity: 0.06;
    z-index: 50;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
  }

  .map-title-overlay {
    position: absolute;
    top: 2rem;
    left: 3rem;
    z-index: 200;
    pointer-events: none;
  }

  .map-title-overlay h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 3.5rem;
    color: #e8e0d0;
    letter-spacing: 0.08em;
    line-height: 1;
    margin: 0;
    padding: 0;
    border: none;
  }

  .map-title-overlay p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 1.1rem;
    color: rgba(232, 224, 208, 0.65);
    margin: 0.5rem 0 0 0;
  }

  .map-scroll-hint {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
    color: rgba(232, 224, 208, 0.4);
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.85rem;
    text-align: center;
    pointer-events: none;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  /* About section */
  .about-section {
    background: #f5f0e8;
    padding: 5rem 2rem;
  }

  .about-inner {
    max-width: 680px;
    margin: 0 auto;
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: #2c3e50;
  }

  .about-inner h2 {
    font-weight: 400;
    font-size: 2rem;
    letter-spacing: 0.04em;
    margin: 0 0 1.5rem 0;
    color: #14405c;
  }

  .about-inner p {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
    font-weight: 300;
  }

  .about-inner a {
    color: #14405c;
    text-decoration: underline;
    text-decoration-color: rgba(20, 64, 92, 0.35);
    text-underline-offset: 3px;
  }

  .about-inner a:hover {
    text-decoration-color: #14405c;
  }

  .about-links {
    display: flex;
    gap: 2rem;
    margin-top: 2.5rem;
    flex-wrap: wrap;
  }

  .about-links a {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    color: #14405c;
    text-decoration: none;
    border-bottom: 1px solid rgba(20, 64, 92, 0.35);
    padding-bottom: 2px;
    letter-spacing: 0.05em;
    transition: border-color 0.2s;
  }

  .about-links a:hover {
    border-color: #14405c;
  }
</style>

<div id="map-hero">
  <div class="map-title-overlay">
    <h1>Archipelago</h1>
    <p>Mapping a regenerative, second renaissance culture</p>
  </div>

  <svg id="archipelago-map" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="island-texture" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="1" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="island-texture-2" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="42" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="island-texture-3" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="5" seed="99" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="island-wispy" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="7" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <radialGradient id="bg-gradient" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1e6390"/>
        <stop offset="100%" stop-color="#14405c"/>
      </radialGradient>
    </defs>

    <rect width="1200" height="800" fill="url(#bg-gradient)"/>
    <g id="archipelago-islands"></g>
  </svg>

  <div class="map-grain-overlay"></div>
  <div class="map-scroll-hint">scroll to explore &nbsp;↓</div>
</div>

<div class="map-tooltip" id="archipelago-tooltip">
  <div class="place-name"></div>
  <div class="place-location"></div>
</div>

<div class="about-section">
  <div class="about-inner">
    <h2>What is Archipelago?</h2>
    <p>A curated map of places where a regenerative, second renaissance culture is seeding — intentional communities, retreat centres, festivals, and living experiments scattered across the world.</p>
    <p>Not a comprehensive catalog, but a living constellation. Fewer, deeper profiles revealing the center of an emergent field. Each island distinct, together forming a visible geography of culture in motion.</p>
    <p>A collaboration of <a href="https://tuckerwalsh.substack.com">Tucker Walsh</a>, <a href="https://lifeitself.org/">Life Itself</a>, Marin Petrov, and <a href="https://coliven.com">Coliven</a>.</p>
    <div class="about-links">
      <a href="/places">Explore Places →</a>
      <a href="/about">About &amp; FAQ →</a>
    </div>
  </div>
</div>

<script>
const archipelagoPlaces = [
  { id: "future-thinkers-smart-village", title: "Future Thinkers", location: "Canada", url: "/places/future-thinkers-smart-village",
    x: 160, y: 140, size: 0.6, filter: "island-texture",
    paths: [
      "M-2,-35 C0,-38 3,-36 4,-30 C5,-22 8,-18 6,-10 C4,-2 8,4 10,12 C12,18 8,22 4,20 C0,18 -2,12 -4,8 C-6,4 -8,-2 -6,-10 C-4,-18 -6,-24 -4,-30 C-3,-34 -2,-36 -2,-35",
      "M6,-10 C10,-14 14,-12 16,-6 C18,0 15,4 12,2 C9,0 8,-4 6,-10",
      "M-6,-10 C-10,-8 -14,-12 -16,-18 C-17,-22 -14,-24 -12,-20 C-10,-16 -8,-12 -6,-10"
    ]
  },
  { id: "clear-sky-retreat-center", title: "Clear Sky Retreat", location: "Canada", url: "/places/clear-sky-retreat-center",
    x: 100, y: 200, size: 0.55, filter: "island-texture-2",
    paths: [
      "M0,-14 C6,-16 12,-12 14,-4 C16,4 14,10 8,14 C2,18 -4,16 -8,12 C-10,8 -8,4 -10,0 C-12,-4 -14,-8 -10,-12 C-6,-16 -2,-16 0,-14"
    ]
  },
  { id: "monastic-academy", title: "Monastic Academy", location: "Vermont", url: "/places/monastic-academy",
    x: 230, y: 230, size: 0.6, filter: "island-texture-3",
    paths: [
      "M0,-30 C3,-32 6,-28 8,-22 C10,-16 7,-10 9,-4 C11,2 8,8 6,14 C4,20 6,26 2,28 C-2,30 -4,24 -6,18 C-8,12 -5,6 -7,0 C-9,-6 -6,-12 -8,-18 C-10,-24 -6,-28 -2,-30 C-1,-32 0,-32 0,-30",
      "M8,-22 C12,-20 14,-16 12,-14 C10,-12 8,-16 8,-22",
      "M-7,0 C-11,2 -14,-2 -12,-4 C-10,-6 -8,-2 -7,0"
    ]
  },
  { id: "sky-meadow-retreat", title: "Sky Meadow Retreat", location: "Vermont", url: "/places/sky-meadow-retreat",
    x: 280, y: 170, size: 0.5, filter: "island-wispy",
    paths: [
      "M0,-20 C2,-24 4,-22 3,-16 C2,-10 5,-6 4,0 C3,6 0,10 -2,8 C-4,6 -5,0 -4,-6 C-3,-12 -2,-16 0,-20",
      "M3,-16 C7,-18 10,-14 8,-10 C6,-8 4,-12 3,-16"
    ]
  },
  { id: "possibility-alliance", title: "Possibility Alliance", location: "Maine", url: "/places/possibility-alliance",
    x: 310, y: 120, size: 0.5, filter: "island-wispy",
    paths: [
      "M0,-12 C4,-14 8,-10 10,-4 C12,0 10,6 6,10 C2,12 -2,14 -6,10 C-10,6 -12,2 -10,-4 C-8,-8 -4,-14 0,-12",
      "M10,-4 C13,-2 14,2 12,3 C10,4 10,0 10,-4"
    ]
  },
  { id: "the-alembic", title: "The Alembic", location: "California", url: "/places/the-alembic",
    x: 80, y: 320, size: 0.55, filter: "island-texture-2",
    paths: [
      "M-4,-20 C0,-24 6,-20 10,-14 C14,-8 16,0 14,8 C12,14 8,18 4,16 C0,14 -2,8 -4,2 C-6,-4 -8,-10 -6,-16 C-5,-18 -4,-20 -4,-20",
      "M10,-14 C14,-18 16,-16 14,-12",
      "M4,16 C6,20 4,22 2,20 C0,18 2,16 4,16"
    ]
  },
  { id: "burning-man", title: "Burning Man", location: "Nevada", url: "/places/burning-man",
    x: 140, y: 370, size: 0.5, filter: "island-wispy",
    paths: [
      "M0,-8 C4,-10 8,-6 10,0 C8,4 4,8 0,10 C-4,8 -8,4 -10,0 C-8,-6 -4,-10 0,-8",
      "M0,-8 C1,-14 2,-18 0,-16 C-2,-14 -1,-10 0,-8",
      "M10,0 C14,1 16,0 14,-1 C12,-2 10,-1 10,0",
      "M0,10 C1,14 0,16 -1,14 C-2,12 -1,10 0,10",
      "M-10,0 C-14,-1 -16,1 -14,2 C-12,1 -10,0 -10,0"
    ]
  },
  { id: "brave-earth", title: "Brave Earth", location: "Costa Rica", url: "/places/brave-earth",
    x: 200, y: 440, size: 0.55, filter: "island-texture",
    paths: [
      "M0,-22 C4,-24 8,-18 10,-12 C12,-6 14,0 12,6 C10,12 6,18 2,20 C-2,22 -4,18 -6,12 C-8,6 -10,0 -10,-6 C-10,-12 -6,-18 -2,-22 C-1,-24 0,-24 0,-22",
      "M10,-12 C14,-10 16,-6 14,-4 C12,-2 10,-6 10,-12",
      "M-10,-6 C-14,-4 -15,0 -13,2 C-11,0 -10,-4 -10,-6"
    ]
  },
  { id: "eterna", title: "Eterna", location: "Costa Rica", url: "/places/eterna",
    x: 250, y: 500, size: 0.5, filter: "island-wispy",
    paths: [
      "M0,10 C-4,8 -8,2 -10,-4 C-12,-10 -8,-16 -4,-14 C0,-12 2,-6 0,0 C-1,4 -1,8 0,10",
      "M0,10 C4,8 10,0 12,-6 C14,-12 10,-16 6,-12 C2,-8 0,-2 0,10"
    ]
  },
  { id: "tierramor", title: "Tierramor", location: "Costa Rica", url: "/places/tierramor",
    x: 150, y: 520, size: 0.5, filter: "island-texture-2",
    paths: [
      "M0,10 C-2,6 -1,0 0,-6 C1,-10 0,-14 -2,-18 C-3,-20 -1,-22 0,-18 C1,-14 2,-10 3,-6 C4,0 6,4 8,0 C10,-4 8,-8 6,-6 C4,-4 3,-2 3,-6",
      "M0,-6 C-2,-4 -5,-6 -6,-10 C-7,-14 -5,-16 -4,-12 C-3,-8 -1,-6 0,-6"
    ]
  },
  { id: "blue-morpho", title: "Blue Morpho", location: "Peru", url: "/places/blue-morpho",
    x: 280, y: 580, size: 0.55, filter: "island-texture-3",
    paths: [
      "M-14,-8 C-10,-12 -4,-10 0,-6 C4,-2 8,0 12,-2 C16,-4 18,-2 16,2 C14,6 8,8 4,6 C0,4 -4,6 -8,4 C-12,2 -16,0 -14,-4 C-14,-6 -14,-8 -14,-8"
    ]
  },
  { id: "realisation-festival", title: "The Realisation Festival", location: "UK", url: "/places/realisation-festival",
    x: 500, y: 150, size: 0.55, filter: "island-texture-2",
    paths: [
      "M-2,-16 C2,-18 8,-14 10,-8 C12,-2 14,4 10,8 C6,10 4,14 0,16 C-4,14 -6,10 -8,6 C-10,2 -14,-2 -12,-8 C-10,-12 -6,-16 -2,-16",
      "M10,-8 C14,-6 16,-2 14,0 C12,2 10,0 10,-8"
    ]
  },
  { id: "emerge-lakefront", title: "Emerge Lakefront", location: "Sweden", url: "/places/emerge-lakefront",
    x: 620, y: 120, size: 0.6, filter: "island-texture-3",
    paths: [
      "M0,-32 C3,-34 5,-28 4,-22 C3,-16 6,-10 5,-4 C4,2 6,8 4,14 C2,20 4,26 2,30 C0,32 -2,28 -3,22 C-4,16 -2,10 -3,4 C-4,-2 -6,-8 -4,-14 C-2,-20 -4,-26 -2,-30 C-1,-34 0,-34 0,-32",
      "M5,-4 C9,-6 12,-2 10,0 C8,2 6,0 5,-4",
      "M-3,4 C-7,6 -10,4 -8,2 C-6,0 -4,2 -3,4"
    ]
  },
  { id: "borderland", title: "Borderland", location: "Sweden", url: "/places/borderland",
    x: 680, y: 180, size: 0.5, filter: "island-wispy",
    paths: [
      "M0,-10 C4,-12 8,-6 10,0 C12,4 8,8 4,10 C0,8 -2,12 -6,8 C-10,4 -8,-2 -6,-6 C-4,-10 -2,-12 0,-10",
      "M4,10 C6,14 4,16 2,14 C0,12 2,10 4,10"
    ]
  },
  { id: "life-itself-riverside-hub", title: "Life Itself Riverside Hub", location: "France", url: "/places/life-itself-riverside-hub",
    x: 550, y: 280, size: 0.65, filter: "island-texture",
    paths: [
      "M-4,-20 C2,-24 8,-20 12,-14 C16,-8 14,-2 12,4 C10,10 14,16 10,18 C6,20 2,16 -2,12 C-6,8 -10,10 -12,6 C-14,2 -12,-4 -10,-10 C-8,-16 -8,-20 -4,-20",
      "M12,-14 C16,-16 18,-12 16,-8",
      "M-12,6 C-16,8 -18,6 -16,2 C-14,0 -12,2 -12,6",
      "M10,18 C12,22 10,26 8,24 C6,22 8,20 10,18"
    ]
  },
  { id: "feytopia", title: "Feÿtopia", location: "France", url: "/places/feytopia",
    x: 490, y: 330, size: 0.5, filter: "island-wispy",
    paths: [
      "M0,-16 C4,-18 8,-12 10,-6 C12,0 10,6 6,10 C2,12 -2,10 -4,6 C-6,2 -8,-4 -6,-10 C-4,-14 -2,-18 0,-16",
      "M6,10 C8,14 6,18 4,16 C2,14 4,12 6,10"
    ]
  },
  { id: "casa-tilo", title: "Casa Tilo", location: "Spain", url: "/places/casa-tilo",
    x: 520, y: 410, size: 0.55, filter: "island-texture",
    paths: [
      "M0,-14 C6,-16 12,-10 14,-2 C16,4 12,8 8,6 C4,4 2,8 0,12 C-2,16 -6,14 -8,10 C-10,6 -14,2 -12,-4 C-10,-10 -4,-16 0,-14"
    ]
  },
  { id: "liminal-village", title: "Liminal Village", location: "Italy", url: "/places/liminal-village",
    x: 660, y: 320, size: 0.55, filter: "island-texture-2",
    paths: [
      "M-2,-18 C2,-20 6,-16 8,-10 C10,-4 8,2 6,8 C4,12 8,14 12,12 C14,10 12,14 8,16 C4,18 0,14 -2,10 C-4,6 -6,0 -6,-6 C-6,-12 -6,-16 -2,-18"
    ]
  },
  { id: "traditional-dream-factory", title: "Traditional Dream Factory", location: "Portugal", url: "/places/traditional-dream-factory",
    x: 430, y: 470, size: 0.55, filter: "island-texture-3",
    paths: [
      "M0,-14 C6,-16 12,-10 12,-2 C12,4 8,10 4,14 C0,16 -4,14 -8,10 C-12,6 -14,0 -12,-6 C-10,-12 -4,-16 0,-14",
      "M12,-2 C16,0 18,4 16,6 C14,4 12,2 12,-2",
      "M-12,-6 C-16,-8 -18,-4 -16,-2 C-14,-4 -12,-6 -12,-6"
    ]
  },
  { id: "tamera", title: "Tamera", location: "Portugal", url: "/places/tamera",
    x: 380, y: 530, size: 0.5, filter: "island-wispy",
    paths: [
      "M0,-12 C4,-14 8,-8 8,-2 C8,4 4,8 2,12 C0,16 -1,18 -2,14 C-3,10 -4,4 -6,0 C-8,-4 -6,-10 -2,-12 C-1,-14 0,-14 0,-12"
    ]
  },
  { id: "fools-valley", title: "Fools Valley", location: "Portugal", url: "/places/fools-valley",
    x: 490, y: 540, size: 0.5, filter: "island-wispy",
    paths: [
      "M0,8 C-1,4 0,0 0,-4 C0,-8 -2,-12 0,-14 C2,-12 4,-8 4,-4 C4,0 6,-2 8,-6 C10,-8 10,-4 8,-2 C6,0 4,4 2,8 C1,10 0,10 0,8",
      "M0,-4 C-2,-2 -6,-4 -8,-8 C-9,-10 -7,-12 -6,-8 C-4,-6 -2,-4 0,-4"
    ]
  },
  { id: "transformational-connection-hub", title: "Transformational Connection Hub", location: "Portugal", url: "/places/transformational-connection-hub",
    x: 440, y: 600, size: 0.5, filter: "island-texture-2",
    paths: [
      "M0,-10 C4,-12 10,-8 12,-2 C14,4 10,8 6,8 C2,8 0,12 -4,10 C-8,8 -12,4 -12,-2 C-12,-6 -8,-10 -4,-12 C-2,-12 0,-12 0,-10",
      "M6,8 C8,12 6,16 4,14 C2,12 4,10 6,8"
    ]
  },
  { id: "nuanu", title: "Nuanu", location: "Bali", url: "/places/nuanu",
    x: 850, y: 420, size: 0.55, filter: "island-texture-2",
    paths: [
      "M0,-14 C6,-16 12,-10 14,-4 C16,2 12,8 6,10 C2,12 -2,8 -4,4 C-6,0 -4,-4 -6,-6 C-8,-8 -12,-6 -12,-2 C-12,2 -10,6 -8,4 C-6,2 -6,-2 -6,-6",
      "M6,10 C10,12 14,10 12,8",
      "M-12,-2 C-16,0 -18,-2 -16,-4 C-14,-6 -12,-4 -12,-2"
    ]
  },
];

(function() {
  const islandsGroup = document.getElementById('archipelago-islands');
  const tooltip = document.getElementById('archipelago-tooltip');
  const tooltipName = tooltip.querySelector('.place-name');
  const tooltipLocation = tooltip.querySelector('.place-location');

  archipelagoPlaces.forEach((place) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'island-group');
    g.setAttribute('transform', 'translate(' + place.x + ', ' + place.y + ') scale(' + place.size + ')');
    g.setAttribute('filter', 'url(#' + place.filter + ')');
    g.dataset.id = place.id;

    place.paths.forEach(d => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', '#e8dfd0');
      path.setAttribute('opacity', '0.88');
      g.appendChild(path);
    });

    islandsGroup.appendChild(g);

    const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    labelBg.setAttribute('class', 'island-label-bg');
    labelBg.setAttribute('x', place.x);
    labelBg.setAttribute('y', place.y + 22 * place.size + 12);
    labelBg.textContent = place.title;
    islandsGroup.appendChild(labelBg);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('class', 'island-label');
    label.setAttribute('x', place.x);
    label.setAttribute('y', place.y + 22 * place.size + 12);
    label.textContent = place.title;
    islandsGroup.appendChild(label);

    g.addEventListener('mouseenter', () => {
      tooltipName.textContent = place.title;
      tooltipLocation.textContent = place.location;
      tooltip.classList.add('visible');
    });

    g.addEventListener('mousemove', (e) => {
      tooltip.style.left = (e.clientX + 16) + 'px';
      tooltip.style.top = (e.clientY - 10) + 'px';
    });

    g.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });

    g.addEventListener('click', () => {
      if (place.url) window.location.href = place.url;
    });
  });
})();
</script>
