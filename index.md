---
layout: plain
title: Archipelago of Renaissance
description: "Mapping an emerging island-chain of places where a regenerative, second renaissance culture is seeding"
image: https://screenshotit.app/archipelago.place@social
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

<script src="/assets/archipelago-map.js" defer></script>
