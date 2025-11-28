---
layout: default
title: Home
---

**Welcome to `Built Environment Edinburgh` community page!**

It is a student-led group at the University of Edinburgh focused on research and knowledge exchange in *sustainable and resilient built environments*, where both internal and external participation is welcomed. Main activities include *monthly events*, such as:
  - Project presentations
  - Research-sharing sessions
  - Skill-development workshops (e.g., academic writing and related training)

Use this site to explore our people, projects, and publications!

<img src="image_logo.png" alt="alt text" style="width:95%;" />

**Previous meetings**
- 2025-06-02: First meeting!
- 2025-10-17: New semester meeting!
- 2025-11-27: Two members introduced their research in November group meeting!
    - Discussed future directions of the group, suggesting a page for showcasing each other's interest;
    - Talk 1&2

> *Geographic Distribution of Audience*
    <div id="map" style="height: 550px; margin-bottom:25px;"></div>

    <!-- Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script>
    var map = L.map('map').setView([30, 0], 2);

    // White background for oceans - using a simple tile layer with white background
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        noWrap: true
    }).addTo(map);

    // Load world countries GeoJSON
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then(response => response.json())
      .then(worldData => {
        
        // Load your CSV data
        fetch("{{ '/assets/data/participants.csv' | relative_url }}")
          .then(r => r.text())
          .then(csvText => {
            const lines = csvText.trim().split("\n").slice(1);
            const countryParticipants = {};
            const cityData = [];
            
            // Process CSV data
            lines.forEach(line => {
              const [country, city, institution, lat, lon, participants] = line.split(",");
              const participantsCount = parseInt(participants);
              
              // Aggregate by country
              countryParticipants[country.trim()] = (countryParticipants[country.trim()] || 0) + participantsCount;
              
              // Store city data
              cityData.push({
                country: country.trim(),
                city: city.trim(),
                institution: institution.trim(),
                lat: parseFloat(lat),
                lon: parseFloat(lon),
                participants: participantsCount
              });
            });

            // Style countries based on participation
            function styleCountry(feature) {
              const countryName = feature.properties.name;
              const hasParticipants = countryParticipants[countryName] > 0;
              
              return {
                fillColor: hasParticipants ? 
                  getColorByCount(countryParticipants[countryName]) : 
                  '#e0e0e0', // Grey for non-participating countries
                weight: 1,
                opacity: 1,
                color: hasParticipants ? '#666' : '#ccc',
                fillOpacity: hasParticipants ? 0.8 : 0.4,
                className: 'country-boundary'
              };
            }

            // Color scale for participating countries
            function getColorByCount(count) {
              if (count >= 5) return '#1976d2'; // Dark blue for high participation
              if (count >= 2) return '#42a5f5'; // Medium blue
              return '#90caf9'; // Light blue for single participants
            }

            // Add countries to map
            L.geoJSON(worldData, {
              style: styleCountry,
              onEachFeature: function(feature, layer) {
                const countryName = feature.properties.name;
                const count = countryParticipants[countryName] || 0;
                if (count > 0) {
                  layer.bindTooltip(`${countryName}: ${count} participants`, {
                    permanent: false,
                    direction: 'auto'
                  });
                }
              }
            }).addTo(map);

            // Add city circles with institution details
            cityData.forEach(data => {
              const radius = Math.sqrt(data.participants) * 80000; // Scale factor for visibility
              
              const circle = L.circle([data.lat, data.lon], {
                radius: radius,
                fillColor: '#ff6b35',
                color: '#e64a19',
                weight: 2,
                fillOpacity: 0.6
              }).addTo(map);
              
              // Create detailed popup content
              const popupContent = `
                <div style="min-width: 200px;">
                  <h4 style="margin: 0 0 8px 0; color: #333;">${data.city}, ${data.country}</h4>
                  <hr style="margin: 8px 0;">
                  <p style="margin: 4px 0;"><strong>Institution:</strong> ${data.institution}</p>
                  <p style="margin: 4px 0;"><strong>Participants:</strong> ${data.participants}</p>
                  <div style="display: flex; align-items: center; margin-top: 8px;">
                    <div style="width: 12px; height: 12px; background: #ff6b35; border-radius: 50%; margin-right: 8px;"></div>
                    <span style="font-size: 12px; color: #666;">Circle size represents participant count</span>
                  </div>
                </div>
              `;
              
              circle.bindPopup(popupContent);
              
              // Add tooltip on hover
              circle.bindTooltip(`
                <strong>${data.city}</strong><br>
                ${data.institution}<br>
                ${data.participants} participant${data.participants > 1 ? 's' : ''}
              `);
            });

            // Add legend
            const legend = L.control({ position: 'bottomright' });
            legend.onAdd = function(map) {
              const div = L.DomUtil.create('div', 'info legend');
              div.style.backgroundColor = 'white';
              div.style.padding = '10px';
              div.style.borderRadius = '5px';
              div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
              
              div.innerHTML = `
                <h4 style="margin: 0 0 8px 0;">Participants</h4>
                <div style="display: flex; align-items: center; margin: 4px 0;">
                  <div style="width: 12px; height: 12px; background: #90caf9; border-radius: 50%; margin-right: 8px;"></div>
                  <span>1 participant</span>
                </div>
                <div style="display: flex; align-items: center; margin: 4px 0;">
                  <div style="width: 12px; height: 12px; background: #42a5f5; border-radius: 50%; margin-right: 8px;"></div>
                  <span>2-4 participants</span>
                </div>
                <div style="display: flex; align-items: center; margin: 4px 0;">
                  <div style="width: 12px; height: 12px; background: #1976d2; border-radius: 50%; margin-right: 8px;"></div>
                  <span>5+ participants</span>
                </div>
                <hr style="margin: 8px 0;">
                <div style="display: flex; align-items: center; margin: 4px 0;">
                  <div style="width: 12px; height: 12px; background: #e0e0e0; border-radius: 50%; margin-right: 8px;"></div>
                  <span>No participants</span>
                </div>
              `;
              return div;
            };
            legend.addTo(map);

          });
      })
      .catch(error => console.error('Error loading map data:', error));
    </script>

    <style>
    .country-boundary {
      pointer-events: auto;
    }

    .legend {
      line-height: 18px;
      color: #555;
    }
    .legend i {
      width: 18px;
      height: 18px;
      float: left;
      margin-right: 8px;
      opacity: 0.7;
    }

    /* Ensure map background is white */
    #map {
      background: white;
    }
    </style>




















**Future activities**
- TBC: Semester-2 meetings
- TBC: Solstice meeting in December meeting

**Contacts**  
[Rui](mailto:rui.bo@ed.ac.uk)
