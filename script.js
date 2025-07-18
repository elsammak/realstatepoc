var map = L.map('map').setView([25.1972, 55.2744], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var mainBuilding = L.marker([25.1972, 55.2744]).addTo(map)
    .bindPopup('Burj Khalifa')
    .openPopup();
