//traditional map 
// function initMap() {
//     const map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 2,
//         center: { lat: 57.708870, lng: 11.974560 },
//     });

//     const marker = new google.maps.marker.AdvancedClustererElement( {
//         position: center,
//         content: 'pinGlyph.element',
//     });

// }


//Initializing and add the map
let map;

//Modern map
async function initMap() {
    //The locayion of Liseberg
    const position = { lat: 57.708870, lng: 11.974560 };

    //Request needed liabraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map centere at Liseberg
    map = new Map(document.getElementById("map"), {
        zoom:12,
        center: position, 
        mapId: "56e7ed768db06d16",
    });

    // The marker, positined at Liseberg
    const marker = new AdvancedMarkerElement({
        map:map,
        position: position,
        title: "Liseberg",
    });

    // Array of locations (latitude, longitude, and title)
  const locations = [
    { lat: 57.708870, lng: 11.974560, title: "Liseberg" },
    { lat: 57.704840, lng: 11.985190, title: "Ullevi Stadium" },
    { lat: 57.697940, lng: 11.989200, title: "Korsvägen" },
  ];

  // lLoop through the locations and add markers
  locations.forEach((location) => {
    const marker = new AdvancedMarkerElement({
        map:map,
        position: { lat: location.lat, lng: location.lng },
        title: location.title,
    });
  });
}

initMap();

