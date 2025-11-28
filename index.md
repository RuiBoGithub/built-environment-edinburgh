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

![alt text](image.png){: width="75%"}

**Key updates**
- 2025-11-27: Two members introduced their research in November group meeting!



**Next activity**
- TBC: Solstice meeting in December meeting



**Key information**
Participants:



**Geographic Distribution of Audience**
<div id="svg-map" style="width: 100%; height: 550px; margin-bottom:25px;"></div>

<script>
// Simple SVG world map with minimal styling
fetch("{{ '/assets/data/participants.csv' | relative_url }}")
  .then(r => r.text())
  .then(text => {
    const lines = text.trim().split("\n").slice(1);
    const countryData = {};
    
    lines.forEach(line => {
      const [country, city, lat, lon, participants] = line.split(",");
      countryData[country.trim()] = (countryData[country.trim()] || 0) + parseInt(participants);
    });

    // Simple SVG approach
    const svg = `<svg viewBox="0 0 800 400" style="width:100%; height:100%; background:#f8f9fa;">
      <!-- Simple world outline -->
      <path d="M100,200 Q300,150 500,200 Q700,250 600,300 Q400,350 200,300 Z" 
            fill="none" stroke="#ddd" stroke-width="1"/>
      
      ${Object.entries(countryData).map(([country, count]) => `
        <circle cx="${100 + Math.random() * 600}" cy="${100 + Math.random() * 200}" 
                r="${Math.sqrt(count) * 3}" 
                fill="#1976d2" fill-opacity="0.7" stroke="#0d47a1" stroke-width="1"/>
      `).join('')}
    </svg>`;
    
    document.getElementById('svg-map').innerHTML = svg;
  });
</script>



Note: We have sessions that welcome audience from external bodies (research institues), with presentation and discussion welcomed!