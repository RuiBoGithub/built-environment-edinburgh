// Calculate next last Friday of month at 13:00 UK time
function getNextMeetingDate() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Function to get last Friday of a given month
    function getLastFriday(year, month) {
        const lastDay = new Date(year, month + 1, 0);
        const day = lastDay.getDay(); // 0 = Sunday, 5 = Friday
        const diff = (day >= 5) ? day - 5 : 7 - (5 - day);
        const lastFriday = new Date(lastDay);
        lastFriday.setDate(lastDay.getDate() - diff);
        return lastFriday;
    }
    
    // Get last Friday of current month at 13:00 UK time
    let nextMeeting = getLastFriday(currentYear, currentMonth);
    nextMeeting.setHours(13, 0, 0, 0);
    
    // Convert to UTC (UK time = GMT/BST, but we'll use 13:00 GMT)
    // Note: This doesn't account for BST. For that, you'd need a timezone library
    // or set the time to 12:00 UTC for GMT (13:00 BST = 12:00 GMT)
    const utcMeeting = new Date(nextMeeting.toISOString());
    
    // If meeting already passed this month, get next month's meeting
    if (utcMeeting <= now) {
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        nextMeeting = getLastFriday(nextYear, nextMonth);
        nextMeeting.setHours(13, 0, 0, 0);
    }
    
    return new Date(nextMeeting.toISOString());
}

function updateCountdown() {
    const now = new Date();
    const nextMeeting = getNextMeetingDate();
    
    // Calculate time difference
    const diff = nextMeeting - now;
    
    // If countdown is negative (just passed), show next meeting
    if (diff <= 0) {
        document.getElementById('meeting-countdown').innerHTML = 
            `<span style="color: #27ae60;">Meeting is happening now!</span>`;
        return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Format with leading zeros
    const formatTime = (time) => time.toString().padStart(2, '0');
    
    // Update the display
    document.getElementById('meeting-countdown').innerHTML = 
        `${days} <span class="time-label">days</span> ` +
        `${formatTime(hours)} <span class="time-label">hours</span> ` +
        `${formatTime(minutes)} <span class="time-label">minutes</span> ` +
        `${formatTime(seconds)} <span class="time-label">seconds</span>`;
    
    // Update the meeting date display
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    
    document.getElementById('next-meeting-date').innerHTML = 
        `Next meeting: ${nextMeeting.toLocaleDateString('en-GB', options)}`;
}

// Update every second for live countdown
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call