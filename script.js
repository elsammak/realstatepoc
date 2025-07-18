<script>
  var map = L.map('map').setView([25.1972, 55.2744], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);

  // Add Burj Khalifa marker
  var mainBuilding = L.marker([25.1972, 55.2744]).addTo(map)
      .bindPopup('Burj Khalifa')
      .openPopup();

  // Define POIs
  var pois = [
      { name: "The Dubai Mall", lat: 25.1984, lng: 55.279, info: "The world's largest mall." },
      { name: "Dubai Fountain", lat: 25.195, lng: 55.275, info: "The world's largest choreographed fountain system." },
      { name: "Dubai Opera", lat: 25.192, lng: 55.275, info: "A multi-format, performing arts centre." }
  ];

  // Create a routing control with dummy waypoints initially (will be updated on click)
  var control = L.Routing.control({
      waypoints: [],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false
  }).addTo(map);

  // Add POI markers only once
  pois.forEach(function(poi) {
      const marker = L.marker([poi.lat, poi.lng]).addTo(map);
      marker.bindPopup('<b>' + poi.name + '</b><br>' + poi.info);

      marker.on('click', function() {
          // Set waypoints when marker is clicked
          control.setWaypoints([
              mainBuilding.getLatLng(),
              marker.getLatLng()
          ]);
          // Open the popup
          marker.openPopup();
      });
  });
</script>
