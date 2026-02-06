/* ---------- Inject countdown CSS automatically ---------- */
(function addCountdownStyles(){
    if(document.getElementById("countdown-style")) return;
  
    const style = document.createElement("style");
    style.id = "countdown-style";
    style.textContent = `
    .countdown-grid{
        display:flex;
        justify-content:center;
        gap:18px;
        flex-wrap:wrap;
        margin:12px 0;
        font-family: system-ui, -apple-system, Arial, sans-serif;
    }
  
    .countdown-item{
        text-align:center;
        min-width:85px;
    }
  
    .countdown-number{
        display:flex;
        align-items:center;
        justify-content:center;
        width:80px;
        height:80px;
        background:#000 !important;  /* Added !important to force */
        color:#fff !important;       /* Added !important to force */
        font-size:2.6rem;
        font-weight:700;
        border-radius:8px;
        line-height:1;
    }
  
    .time-label{
        display:block;
        margin-top:6px;
        font-size:0.8rem;
        color:#555;
        text-transform:uppercase;
        letter-spacing:1px;
    }
    `;
    document.head.appendChild(style);
    
    // Debug log
    console.log('Countdown styles injected. Check if .countdown-number background appears');
  })();

/* ---------- Calculate next last Friday ---------- */
function getNextMeetingDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  function getLastFriday(year, month) {
      const lastDay = new Date(year, month + 1, 0);
      const day = lastDay.getDay();
      const diff = (day >= 5) ? day - 5 : 7 - (5 - day);
      const lastFriday = new Date(lastDay);
      lastFriday.setDate(lastDay.getDate() - diff);
      return lastFriday;
  }

  let nextMeeting = getLastFriday(currentYear, currentMonth);
  nextMeeting.setHours(13,0,0,0);

  if(nextMeeting <= now){
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear  = currentMonth === 11 ? currentYear + 1 : currentYear;
      nextMeeting = getLastFriday(nextYear, nextMonth);
      nextMeeting.setHours(13,0,0,0);
  }

  return nextMeeting;
}

/* ---------- Countdown display ---------- */
function updateCountdown() {
  const now = new Date();
  const nextMeeting = getNextMeetingDate();
  const diff = nextMeeting - now;

  if(diff <= 0){
      document.getElementById("meeting-countdown").innerHTML =
          `<span style="color:#27ae60;font-weight:600;">
          Meeting is happening now!
          </span>`;
      return;
  }

  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
  const seconds = Math.floor((diff%(1000*60))/1000);

  const f = t => t.toString().padStart(2,"0");

  document.getElementById("meeting-countdown").innerHTML = `
      <div class="countdown-grid">
          <div class="countdown-item">
              <span class="countdown-number">${days}</span>
              <span class="time-label">Days</span>
          </div>
          <div class="countdown-item">
              <span class="countdown-number">${f(hours)}</span>
              <span class="time-label">Hours</span>
          </div>
          <div class="countdown-item">
              <span class="countdown-number">${f(minutes)}</span>
              <span class="time-label">Minutes</span>
          </div>
          <div class="countdown-item">
              <span class="countdown-number">${f(seconds)}</span>
              <span class="time-label">Seconds</span>
          </div>
      </div>
  `;

  const options = {
      weekday:'long',
      year:'numeric',
      month:'long',
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit',
      timeZoneName:'short'
  };

  document.getElementById("next-meeting-date").innerHTML =
      `Next meeting: ${nextMeeting.toLocaleString("en-GB", options)}`;
}

/* ---------- Start countdown ---------- */
setInterval(updateCountdown, 1000);
updateCountdown();
