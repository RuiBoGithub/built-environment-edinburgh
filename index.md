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

![alt text](image.png){: width="80%"}

**Key updates**
- 2025-11-27: Two members introduced their research in November group meeting!
- 2025-10-17: New semester meeting!
- 2025-06-02: First meeting!

**Future activities**
- TBC: Semester-2 meetings
- TBC: Solstice meeting in December meeting


**Geographic Distribution of Audience**
<div id="map" style="height: 550px; margin-bottom:25px;"></div>

<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- World GeoJSON -->
<script src="https://rawcdn.githack.com/johan/world.geo.json/master/countries.geo.json"></script>

<script>
var map = L.map('map').setView([30, 0], 2);

// Simple base map with white oceans
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 6,
  minZoom: 2,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load your CSV data
const csvData = `country,city,institution,latitude,longitude,participants
United Kingdom,Edinburgh,IIE,55.944,-3.189,3
United Kingdom,Edinburgh,IES,55.944,-3.189,2
United Kingdom,Edinburgh,ESALA,55.944,-3.189,1
France,Paris,PSL,48.8566,2.3522,1
United States,Boston,Boston,42.3601,-71.0589,1`;

function processCSV(text) {
    const lines = text.trim().split("\n").slice(1);
    const selectedCountries = new Set();
    const cityData = {};
    
    // Process data and aggregate by city
    lines.forEach(line => {
        const [country, city, institution, lat, lon, participants] = line.split(",");
        selectedCountries.add(country.trim());
        
        const key = `${city}-${country}`;
        if (!cityData[key]) {
            cityData[key] = {
                city: city.trim(),
                country: country.trim(),
                lat: parseFloat(lat),
                lon: parseFloat(lon),
                totalParticipants: 0,
                institutions: []
            };
        }
        
        cityData[key].totalParticipants += parseInt(participants);
        cityData[key].institutions.push({
            name: institution.trim(),
            participants: parseInt(participants)
        });
    });
    
    return { selectedCountries, cityData: Object.values(cityData) };
}

const { selectedCountries, cityData } = processCSV(csvData);

// Style for countries - colored for selected, grey for others
function styleCountry(feature) {
    const countryName = feature.properties.name;
    if (selectedCountries.has(countryName)) {
        return {
            fillColor: "#4A90E2",  // Nice blue for selected countries
            weight: 1,
            opacity: 1,
            color: "#2C3E50",      // Dark border
            fillOpacity: 0.7,
            dashArray: null
        };
    }
    return {
        fillColor: "#BDC3C7",      // Light grey for other countries
        weight: 0.5,
        opacity: 0.8,
        color: "#95A5A6",          // Light border
        fillOpacity: 0.4,
        dashArray: null
    };
}

// Add colored countries to map
L.geoJSON(world_geo_json, { 
    style: styleCountry,
    onEachFeature: function(feature, layer) {
        const countryName = feature.properties.name;
        if (selectedCountries.has(countryName)) {
            layer.bindTooltip(countryName, {
                permanent: false,
                direction: 'center',
                className: 'country-label'
            });
        }
    }
}).addTo(map);

// Add city circles with participant counts
cityData.forEach(city => {
    // Calculate circle radius based on total participants
    const baseRadius = 50000; // Base size
    const radius = baseRadius * Math.sqrt(city.totalParticipants);
    
    // Create circle with gradient effect
    const circle = L.circle([city.lat, city.lon], {
        radius: radius,
        fillColor: "#E74C3C",
        color: "#C0392B",
        weight: 2,
        fillOpacity: 0.6
    }).addTo(map);
    
    // Create popup content with institution details
    let popupContent = `<div style="min-width: 200px;">
        <h3 style="margin: 0 0 10px 0; color: #2C3E50;">${city.city}, ${city.country}</h3>
        <div style="background: #E74C3C; color: white; padding: 5px 10px; border-radius: 3px; display: inline-block; margin-bottom: 10px;">
            <strong>Total Participants: ${city.totalParticipants}</strong>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #F8F9FA;">
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Institution</th>
                <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Participants</th>
            </tr>`;
    
    city.institutions.forEach(inst => {
        popupContent += `
            <tr>
                <td style="padding: 6px 8px; border-bottom: 1px solid #eee;">${inst.name}</td>
                <td style="padding: 6px 8px; text-align: right; border-bottom: 1px solid #eee;">${inst.participants}</td>
            </tr>`;
    });
    
    popupContent += `</table></div>`;
    
    circle.bindPopup(popupContent);
    
    // Add participant count label next to circle
    const label = L.marker([city.lat, city.lon], {
        icon: L.divIcon({
            className: 'participant-label',
            html: `<div style="
                background: rgba(231, 76, 60, 0.9);
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-weight: bold;
                font-size: 12px;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            ">${city.totalParticipants}</div>`,
            iconSize: [40, 20],
            iconAnchor: [20, 10]
        })
    }).addTo(map);
});

// Add legend
const legend = L.control({ position: 'bottomright' });
legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
        <h4>Participants Map</h4>
        <div style="background: white; padding: 10px; border-radius: 5px; border: 1px solid #ccc;">
            <div><span style="background: #4A90E2; display: inline-block; width: 20px; height: 15px; margin-right: 5px;"></span> Selected Countries</div>
            <div><span style="background: #BDC3C7; display: inline-block; width: 20px; height: 15px; margin-right: 5px;"></span> Other Countries</div>
            <div><span style="background: #E74C3C; display: inline-block; width: 15px; height: 15px; border-radius: 50%; margin-right: 5px;"></span> Participant Cities</div>
            <div style="margin-top: 5px; font-size: 12px;">Circle size = Number of participants</div>
        </div>
    `;
    return div;
};
legend.addTo(map);

// Custom CSS for better styling
const style = document.createElement('style');
style.textContent = `
    .country-label {
        background: transparent;
        border: none;
        box-shadow: none;
        font-weight: bold;
        color: #2C3E50;
        text-shadow: 1px 1px 2px white;
    }
    .participant-label {
        background: transparent;
        border: none;
    }
`;
document.head.appendChild(style);
</script>

Note: We host sessions that welcome audiences from external organisations, and presentations and discussions are encouraged!