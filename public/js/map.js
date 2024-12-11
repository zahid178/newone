    mapboxgl.accessToken = mapToken;

    // Initialize the map
    const map = new mapboxgl.Map({
        container: 'map', // The div id where the map will be displayed
        style: 'mapbox://styles/mapbox/streets-v12', // Style of the map
        // center: [72.8777, 19.0760], 
        center: listing.geometry.coordinates,  
        zoom: 9 // Initial zoom level
    });


 const marker = new mapboxgl.Marker({ color : "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML (
            `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
        ) 
    )
    .addTo(map);

 