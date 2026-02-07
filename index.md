---
layout: default
title: Home
---
Welcome to `Built Environment Edinburgh` community, a PhD student-led group at the *[University of Edinburgh](https://www.ed.ac.uk/)*{:.HL}, promoting research exchange in *sustainable and resilient built environments*{:.HL}, open to both internal and external participants. 

<div class="hero">
  <img src="image_logo.png" alt="logo">

  <div class="overlay">
    <span class="kw k1">Networking</span>
    <span class="kw k2">Knowledge sharing</span>
    <span class="kw k3">Career sharing</span>
  </div>
</div>

<script>
const words = [
  "Networking",
  "Knowledge sharing",
  "Career sharing",
  "Research exchange",
  "Built environment"
];

const spans = document.querySelectorAll(".kw");

function updateKeywords() {
  spans.forEach(span => {
    // random word
    span.textContent = words[Math.floor(Math.random() * words.length)];

    // random scattered position near centre
    span.style.top = 40 + Math.random()*20 + "%";
    span.style.left = 40 + Math.random()*20 + "%";

    // fade effect
    span.style.opacity = 0.2;
    setTimeout(() => span.style.opacity = 0.7, 300);
  });
}

updateKeywords();
setInterval(updateKeywords, 3500);
</script>


So far, we have:
- **6** meetings/workshops co-created,<br>
- **4** PhD works presented,<br>
- **11** participants from **6** institutions.<br>

Next meeting will take place in:
<div class="countdown-container">
    <div class="countdown-display" id="meeting-countdown">
        Loading countdown...
    </div>    
    <div class="meeting-schedule" id="next-meeting-date">
        📍 Every last Friday of the month at 13:00 UK time
    </div>
</div>

<script defer src="{{ '/assets/js/meeting-countdown.js' | relative_url }}"></script>


---
**Key Updates**
- 2025-06-02: First meeting!
- 2025-10-17: New semester meeting!
- 2025-11-27: Two members introduced their research outcomes in the November group meeting!
    - Discussed future directions of the group, suggesting a page for showcasing each other's interest;
    - Presentation from Androniki and Rui.
- 2026-01-30: A follow-up presentation from Rui.

*Geographic Distribution of Audience*
{% include map_audience.html %}
---
**Main Contacts**

Everyone is very welcome to join any knowledge-sharing session. Please [email](mailto:rui.bo@ed.ac.uk) for contact.
{% include institutions_logos.html %}
