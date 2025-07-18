// Initialize map
const map = L.map("map").setView([25.1972, 55.2744], 14); // Burj Khalifa

// Add tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Add Burj Khalifa marker
const burjKhalifaCoords = [25.1972, 55.2744];
const burjMarker = L.marker(burjKhalifaCoords)
  .addTo(map)
  .bindPopup("Burj Khalifa")
  .openPopup();

// Define POIs
const pois = [
  {
    name: "Dubai Mall",
    coords: [25.1985, 55.2795],
    info: "One of the world's largest malls.",
  },
  {
    name: "Dubai Opera",
    coords: [25.1935, 55.2772],
    info: "Cultural and performance center.",
  },
  {
    name: "Souk Al Bahar",
    coords: [25.1952, 55.2771],
    info: "Shopping and dining near Burj Khalifa.",
  },
];

// Your OpenRouteService API key
const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk4YjQ3ZDkzMGY0MTRmZjhiZGRhNTcxMjUyNjMyNjUxIiwiaCI6Im11cm11cjY0In0=";

// Route layer (global so we can clear it)
let currentRouteLayer = null;

// Function to fetch and draw route
function drawDrivingRoute(start, end) {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coordinates: [
        [start[1], start[0]],
        [end[1], end[0]],
      ], // lon, lat
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const coords = data.features[0].geometry.coordinates.map((c) => [
        c[1],
        c[0],
      ]); // flip [lon, lat] to [lat, lon]

      // Remove previous route
      if (currentRouteLayer) {
        map.removeLayer(currentRouteLayer);
      }

      // Draw new route
      currentRouteLayer = L.polyline(coords, {
        color: "blue",
        weight: 4,
      }).addTo(map);

      // Zoom to fit route
      map.fitBounds(currentRouteLayer.getBounds());
    })
    .catch((err) => {
      alert("Failed to get route. Make sure your API key is valid.");
      console.error(err);
    });
}

// Add markers and route logic
pois.forEach((poi) => {
  const marker = L.marker(poi.coords)
    .addTo(map)
    .bindPopup(`<b>${poi.name}</b><br>${poi.info}`);

  marker.on("click", () => {
    drawDrivingRoute(burjKhalifaCoords, poi.coords);
  });
});
