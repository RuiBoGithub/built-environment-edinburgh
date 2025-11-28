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
**Key updates**
- 2025-11-27: Two members introduced their research in November group meeting!
--
**Next activity**
- TBC: Solstice meeting in December meeting
--
**Key information**
Participants:
--
**Collaboration Map**
## Audience Distribution Map

<div id="map" style="height: 500px; margin-bottom:25px; border-radius: 8px;"></div>

<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
// 1. Create map
var map = L.map('map').setView([54.5, -2], 5);  // UK-centered

// 2. Add base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: ''
}).addTo(map);

// 3. Load CSV and draw circles
fetch("/assets/data/participants.csv")
  .then(response => response.text())
  .then(text => {
    const rows = text.trim().split("\n").slice(1);

    rows.forEach(row => {
      const [institution, lat, lon, count] = row.split(",");
      const n = parseInt(count);

      // Scale radius (adjust multiplier as needed)
      const radius = n * 20000;  // 20 km * participants

      // Add circle marker
      L.circle([parseFloat(lat), parseFloat(lon)], {
        radius: radius,
        color: "rgba(0, 100, 255, 0.4)",
        fillColor: "rgba(0, 100, 255, 0.25)",
        fillOpacity: 0.5,
        weight: 1
      }).addTo(map)
        .bindPopup(`<b>${institution}</b><br>${n} participants`);
    });
  });
</script>


Note: We have sessions that welcome audience from external bodies (research institues), with presentation and discussion welcomed!