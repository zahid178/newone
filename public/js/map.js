
   
    mapboxgl.accessToken = mapToken;

    // Initialize the map
    const map = new mapboxgl.Map({
        container: 'map', // The div id where the map will be displayed
        style: 'mapbox://styles/mapbox/streets-v12', // Style of the map
        center: [72.8777, 19.0760], // Default coordinates (longitude, latitude)
        zoom: 9 // Initial zoom level
    });


 