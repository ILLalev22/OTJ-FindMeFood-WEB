import { loadRestaurants } from '../srcPages/mainRestaurantLoader.js';

const map = L.map('map').setView([42.6977, 23.3219], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);


loadRestaurants(map);
