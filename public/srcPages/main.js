// pagesSrc/main.js

// Initialize Leaflet map only
const map = L.map('map').setView([42.6977, 23.3219], 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map)