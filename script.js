const map = L.map('map').setView([25.1972, 55.2744], 15);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add Burj Khalifa marker
const burjKhalifa = L.marker([25.1972, 55.2744])
  .addTo(map)
  .bindPopup('<b>Burj Khalifa</b><br>World\'s tallest building.')
  .openPopup();

// Define POIs clearly
const pois = [
  {
    name: "The Dubai Mall",
    lat: 25.1984,
    lng: 55.279,
    info: "The world's largest shopping mall."
  },
  {
    name: "Dubai Fountain",
    lat: 25.195,
    lng: 55.275,
    info: "The world's largest choreographed fountain system."
  },
  {
    name: "Dubai Opera",
    lat: 25.192,
    lng: 55.275,
    info: "A modern performing arts center."
  }
];

// Routing control
let routeControl = L.Routing.control({
  waypoints: [],
  routeWhileDragging: false,
  addWaypoints: false,
  draggableWaypoints: false,
  show: false
}).addTo(map);

// Add POI markers
pois.forEach(poi => {
  const marker = L.marker([poi.lat, poi.lng]).addTo(map);
  marker.bindPopup(`<b>${poi.name}</b><br>${poi.info}`);
  marker.on('click', () => {
    routeControl.setWaypoints([
      burjKhalifa.getLatLng(),
      marker.getLatLng()
    ]);
    marker.openPopup();
  });
});
