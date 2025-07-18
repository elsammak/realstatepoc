// Initialize map
var map = L.map('map').setView([25.1972, 55.2744], 14);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Main location marker (e.g. Ayala or starting point)
var mainBuilding = L.marker([25.1972, 55.2744]).addTo(map).bindPopup("Main Location");

// Points of Interest (POIs)
var pois = [
    { name: "The Dubai Mall", lat: 25.1984, lng: 55.279, info: "The world's largest mall." },
    { name: "Dubai Fountain", lat: 25.195, lng: 55.275, info: "Fountain show and choreographed water display." },
    { name: "Dubai Opera", lat: 25.192, lng: 55.275, info: "Performing arts center." }
];

// Routing control (hidden by default, shown when user taps a POI)
var control = L.Routing.control({
    waypoints: [],
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    createMarker: () => null
}).addTo(map);

// Add POIs to map
pois.forEach(function (poi) {
    const marker = L.marker([poi.lat, poi.lng]).addTo(map);
    marker.on('click', function () {
        // Update route from main location to selected POI
        control.setWaypoints([
            mainBuilding.getLatLng(),
            marker.getLatLng()
        ]);

        // Calculate distance and time using router
        control.on('routesfound', function (e) {
            const route = e.routes[0];
            const distanceKm = (route.summary.totalDistance / 1000).toFixed(2);
            const timeMin = Math.ceil(route.summary.totalTime / 60);

            const popupHtml = `
                <b>${poi.name}</b><br>
                ${poi.info}<br>
                <div class="route-info">🚗 ${timeMin} min | ${distanceKm} km</div>
            `;
            marker.bindPopup(popupHtml).openPopup();
        });
    });
});
