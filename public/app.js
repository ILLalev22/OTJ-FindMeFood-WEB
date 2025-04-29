// Load Leaflet and initialize map view
const map = L.map('map').setView([42.6977, 23.3219], 13) // Example: Sofia center

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map)
