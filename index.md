---
layout: default
title: Home
---

Welcome to `Built Environment Edinburgh` community page!

It is a student-led group at the University of Edinburgh focused on research and knowledge exchange in *sustainable and resilient built environments*, where both internal and external participation is welcomed. Main activities include *monthly events*, such as:
  - Project presentations
  - Research-sharing sessions
  - Skill-development workshops (e.g., academic writing and related training)

Use this site to explore our people, projects, and publications!

![alt text](image.png)
**Key updates**
- 2025-11-27: Two members introduced their research in November group meeting!



**Next activity**
- TBC: Solstice meeting in December meeting



**Key information**
Participants:



**Collaboration Map**
## Geographic Distribution of Audience

<div id="map" style="height: 550px; margin-bottom:25px;"></div>

<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- World GeoJSON (countries) -->
<script src="https://rawcdn.githack.com/johan/world.geo.json/master/countries.geo.json"></script>

<script>
var map = L.map('map').setView([30, 0], 2);

// Base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 5,
  minZoom: 2
}).addTo(map);

// Load your CSV
fetch("{{ '/assets/data/participants.csv' | relative_url }}")
  .then(r => r.text())
  .then(text => {
    const lines = text.trim().split("\n").slice(1);
    const selectedCountries = new Set();
    const cityMarkers = [];

    lines.forEach(line => {
      const [country, city, lat, lon, participants] = line.split(",");
      selectedCountries.add(country.trim());
      cityMarkers.push({
        city: city,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        participants: parseInt(participants)
      });
    });

    // Style for countries
    function styleCountry(feature) {
      const name = feature.properties.name;
      if (selectedCountries.has(name)) {
        return {
          fillColor: "rgba(30,144,255,0.6)",  // Blue
          weight: 1,
          opacity: 1,
          color: "#333",
          fillOpacity: 0.7
        };
      }
      return {
        fillColor: "rgba(200,200,200,0.4)", // Grey for others
        weight: 1,
        opacity: 1,
        color: "#aaa",
        fillOpacity: 0.5
      };
    }

    // Add coloured countries
    L.geoJSON(world_geo_json, { style: styleCountry }).addTo(map);

    // Add city bubble markers (optional)
    cityMarkers.forEach(m => {
      L.circle([m.lat, m.lon], {
        radius: m.participants * 20000,
        fillColor: "rgba(30,144,255,0.3)",
        color: "rgba(30,144,255,0.5)",
        weight: 1,
        fillOpacity: 0.5
      }).addTo(map)
      .bindPopup(`<b>${m.city}</b><br>${m.participants} participants`);
    });

  });
</script>


Note: We have sessions that welcome audience from external bodies (research institues), with presentation and discussion welcomed!