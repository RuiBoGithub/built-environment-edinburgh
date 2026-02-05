// Calculate next last Friday of month
function getLastFridayOfMonth(year, month) {
    const lastDay = new Date(year, month + 1, 0);
    const lastFriday = new Date(lastDay);
    lastFriday.setDate(lastDay.getDate() - (lastDay.getDay() + 2) % 7);
    return lastFriday;
}

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Get last Friday of current month
    let nextMeeting = getLastFridayOfMonth(currentYear, currentMonth);
    nextMeeting.setHours(13, 0, 0, 0);
    
    // If already passed, get next month
    if (nextMeeting < now) {
        nextMeeting = getLastFridayOfMonth(currentYear, currentMonth + 1);
        nextMeeting.setHours(13, 0, 0, 0);
    }
    
    // Calculate time difference
    const diff = nextMeeting - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    // Update the display
    document.getElementById('meeting-countdown').innerHTML = 
        `${days} days ${hours} hours ${minutes} minutes`;
    
    // Update the meeting date display
    document.getElementById('next-meeting-date').innerHTML = 
        nextMeeting.toLocaleDateString('en-GB', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Europe/London'
        }) + " at 13:00 UK time";
}

// Update every minute
setInterval(updateCountdown, 60000);
updateCountdown(); // Initial call