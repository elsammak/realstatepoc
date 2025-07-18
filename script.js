var map = L.map('map').setView([26.2172, 50.1971], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var mainBuilding = L.marker([26.2172, 50.1971]).addTo(map);

var pois = [
    { name: "POI 1", lat: 26.22, lng: 50.2 },
    { name: "POI 2", lat: 26.21, lng: 50.19 }
];

pois.forEach(function(poi) {
    var marker = L.marker([poi.lat, poi.lng]).addTo(map)
        .bindPopup(poi.name);
    marker.on('click', function() {
        L.Routing.control({
            waypoints: [
                L.latLng(mainBuilding.getLatLng()),
                L.latLng(poi.lat, poi.lng)
            ]
        }).addTo(map);
    });
});
