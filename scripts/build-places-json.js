#!/usr/bin/env node
/**
 * Reads all places/*.md files, parses YAML frontmatter,
 * and outputs data/places.json for the map and other consumers.
 */

const fs = require('fs');
const path = require('path');

const placesDir = path.join(__dirname, '..', 'places');
const outputPath = path.join(__dirname, '..', 'data', 'places.json');

const files = fs.readdirSync(placesDir)
  .filter(f => f.endsWith('.md') && f !== 'index.md');

const places = files.map(file => {
  const content = fs.readFileSync(path.join(placesDir, file), 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

    const frontmatter = {};
  match[1].split('\n').forEach(line => {
    const m = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
    if (m) {
      let value = m[2];
      // Parse numbers
      if (/^-?\d+$/.test(value)) value = parseInt(value, 10);
      else if (/^-?\d+\.\d+$/.test(value)) value = parseFloat(value);
      frontmatter[m[1]] = value;
    }
  });

  return {
    id: file.replace('.md', ''),
    ...frontmatter
  };
}).filter(Boolean);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(places, null, 2));
console.log(`Wrote ${places.length} places to ${outputPath}`);
