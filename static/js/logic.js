var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    // Create the map object with options
    var map = L.map("mapid", {
        center: [44.06, -114.74],
        zoom: 8,
        layers: [lightmap, earthquakes]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}
function createMarkers(response) {

    // Pull the "quakes" property off of response.data
    var quakes = response.features.properties;
  
    // Initialize an array to hold quake markers
    var quakeMarkers = [];
  // Loop through the quakeMarkers array
  for (var index = 0; index < coordinates.length; index++) {
    var quake = quakes[index];

    // For each station, create a marker and bind a popup with the station's name
    var quakeMarker = L.marker(features.properties)
      .bindPopup("<h3>" + properties.place + "<h3><h3>Capacity: " + properties.magType + "</h3>");

    // Add the marker to the bikeMarkers array
    bikeMarkers.push(bikeMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(bikeMarkers));
}
  


function markerSize(mag) {
    return mag * 30000;
}

function markerColor(mag) {
    if (mag <= 1) {
        return "#ADFF2F";
    } else if (mag <= 2) {
        return "#9ACD32";
    } else if (mag <= 3) {
        return "#FFFF00";
    } else if (mag <= 4) {
        return "#ffd700";
    } else if (mag <= 5) {
        return "#FFA500";
    } else {
        return "#FF0000";
    };
}

// Perform a GET request to the query URL
d3.json(link, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});