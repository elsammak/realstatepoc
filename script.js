// Initialize map
const map = L.map('map').setView([25.1972, 55.2744], 14); // Burj Khalifa

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Burj Khalifa marker
const burjKhalifa = L.marker([25.1972, 55.2744])
  .addTo(map)
  .bindPopup("<b>Burj Khalifa</b><br>The tallest building in the world.")
  .openPopup();

// Sample POIs
const pois = [
  {
    name: "Dubai Mall",
    coords: [25.1985, 55.2795],
    info: "One of the world's largest malls."
  },
  {
    name: "Dubai Opera",
    coords: [25.1935, 55.2772],
    info: "Cultural and performance center."
  },
  {
    name: "Souk Al Bahar",
    coords: [25.1952, 55.2771],
    info: "Shopping and dining spot near Burj Khalifa."
  }
];

// Draw POIs and connect to Burj Khalifa
pois.forEach(poi => {
  const marker = L.marker(poi.coords).addTo(map);
  marker.bindPopup(`<b>${poi.name}</b><br>${poi.info}`);
  
  marker.on('click', () => {
    // Draw a route (polyline)
    L.polyline([burjKhalifa.getLatLng(), poi.coords], {
      color: 'blue',
      weight: 2,
      dashArray: '4'
    }).addTo(map);
  });
});
