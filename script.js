var map = L.map('map').setView([25.1972, 55.2744], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var mainBuilding = L.marker([25.1972, 55.2744]).addTo(map)
    .bindPopup('Burj Khalifa')
    .openPopup();

var pois = [
    { name: "The Dubai Mall", lat: 25.1984, lng: 55.279, info: "The world's largest mall." },
    { name: "Dubai Fountain", lat: 25.195, lng: 55.275, info: "The world's largest choreographed fountain system." },
    { name: "Dubai Opera", lat: 25.192, lng: 55.275, info: "A multi-format, performing arts centre." }
];

var control = L.Routing.control({
    waypoints: [
        L.latLng(mainBuilding.getLatLng()),
        L.latLng(25.1984, 55.279)
    ],
    routeWhileDragging: true,
    addWaypoints: false,
    draggableWaypoints: false
}).addTo(map);

pois.forEach(function(poi) {
    var marker = L.marker([poi.lat, poi.lng]).addTo(map)
        .bindPopup('<b>' + poi.name + '</b><br>' + poi.info);
    marker.on('click', function() {
        control.setWaypoints([
            mainBuilding.getLatLng(),
            marker.getLatLng()
        ]);
        marker.openPopup();
    });
});
