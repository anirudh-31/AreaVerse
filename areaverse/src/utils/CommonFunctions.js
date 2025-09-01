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

export {
    formatDate,
    stringToGradient
}

