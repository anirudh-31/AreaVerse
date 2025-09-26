function formatDate(isoString) {
    if (!isoString) return "—";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(isoString).toLocaleDateString(undefined, options);
}

function stringToGradient(str) {
    let hash1 = 0, hash2 = 0;
    for (let i = 0; i < str.length; i++) {
        hash1 = str.charCodeAt(i) + ((hash1 << 5) - hash1);
        hash2 = str.charCodeAt(i) + ((hash2 << 7) - hash2);
    }
    function intToColor(hash) {
        return "#" + ((hash >> 24) & 0xFF).toString(16).padStart(2, "0") +
            ((hash >> 16) & 0xFF).toString(16).padStart(2, "0") +
            ((hash >> 8) & 0xFF).toString(16).padStart(2, "0");
    }
    const color1 = intToColor(hash1);
    const color2 = intToColor(hash2);
    return `linear-gradient(135deg, ${color1}, ${color2})`;
}

function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    const years = Math.floor(months / 12);
    return `${years} years ago`;
}

function formatToISTTimeStamp(timestamp){
    const date = new Date(timestamp);

    const options = {
        timeZone: "Asia/Kolkata",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    };

    const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);

    const month = parts.find(p => p.type === "month").value;
    const day = parts.find(p => p.type === "day").value;
    const year = parts.find(p => p.type === "year").value;
    const hour = parts.find(p => p.type === "hour").value;
    const minute = parts.find(p => p.type === "minute").value;
    const dayPeriod = parts.find(p => p.type === "dayPeriod").value;

    return `${month} ${day}, ${year} at ${hour}:${minute} ${dayPeriod}`;
}


function triggerHaptic(style = 'light') {
    if ('vibrate' in navigator) {
        let pattern;
        switch (style) {
            case 'light': pattern = 10; break;
            case 'medium': pattern = 30; break;
            case 'heavy': pattern = 50; break;
            default: pattern = 10;
        }
        navigator.vibrate(pattern);
    }
}
export {
    formatDate,
    stringToGradient,
    timeAgo,
    formatToISTTimeStamp,
    triggerHaptic
}

