---
layout: plain
title: Archipelago of Renaissance
description: "Mapping an emerging island-chain of places where a regenerative, second renaissance culture is seeding"
image: https://screenshotit.app/archipelago.place@social
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">

<style>
  :root {
    --archipelago-nav-offset: 4rem;
  }

  #map-hero {
    position: relative;
    width: 100%;
    height: calc(100vh - var(--archipelago-nav-offset));
    height: calc(100svh - var(--archipelago-nav-offset));
    min-height: clamp(500px, 72svh, 920px);
    background: #14405c;
    overflow: hidden;
  }

  #map-hero iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
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

  @supports (height: 100dvh) {
    #map-hero {
      height: calc(100dvh - var(--archipelago-nav-offset));
      min-height: clamp(500px, 72dvh, 920px);
    }
  }

  @media (max-width: 800px) {
    :root {
      --archipelago-nav-offset: 3.5rem;
    }

    #map-hero {
      min-height: clamp(460px, 78svh, 760px);
    }

    .map-title-overlay {
      top: 1rem;
      left: 1rem;
      right: 1rem;
    }

    .map-title-overlay h1 {
      font-size: clamp(2.25rem, 10vw, 3rem);
      letter-spacing: 0.06em;
    }

    .map-title-overlay p {
      font-size: 0.95rem;
      max-width: 18rem;
    }

    .map-scroll-hint {
      bottom: 1rem;
      font-size: 0.75rem;
    }

    .about-section {
      padding: 3.5rem 1.25rem;
    }

    .about-inner p {
      font-size: 1.08rem;
      line-height: 1.7;
    }
  }
</style>

<div id="map-hero">
  <iframe src="/map.html" title="Archipelago map" loading="eager" referrerpolicy="no-referrer" scrolling="no"></iframe>
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
