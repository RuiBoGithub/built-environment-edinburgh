---
layout: default
title: Home
---

Welcome to `Built Environment Edinburgh` community page.

It is a student-led group at the University of Edinburgh focused on research and knowledge exchange in **sustainable and resilient built environments**, where both internal and external participation is welcomed. Main activities include **monthly events**, such as:
  - Project presentations
  - Research-sharing sessions
  - Skill-development workshops (e.g., academic writing and related training)

Use this site to explore our people, projects, and publications.
--
### Key updates:
- 2025-11-27: Two members introduced their research in November group meeting!
--
### Next activity:
- TBC: Solstice meeting in December meeting
--
### Key information:
Participants:
--
## Collaboration Map
<div id="map" style="height: 450px; margin-bottom:20px;"></div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
// Create map centered on UK/Europe
var map = L.map('map').setView([54.5, -2], 5);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Load CSV dynamically
fetch("/assets/data/participants.csv")
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split("\n").slice(1); // drop header
    rows.forEach(row => {
      const [institution, lat, lon, participants] = row.split(",");

      // Add marker for each row
      L.marker([parseFloat(lat), parseFloat(lon)]).addTo(map)
        .bindPopup(`
          <b>${institution}</b><br>
          Participants: ${participants}
        `);
    });
  });
</script>

Note: We have sessions that welcome audience from external bodies (research institues), with presentation and discussion welcomed!