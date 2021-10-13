const mapId = 'map';
const initialCoordinates = [40.4216, -3.6929];
const map = L.map(mapId).setView(initialCoordinates, 13);

// Libreira Tiles para ver el mapa
const MAPBOX_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN = 'pk.eyJ1IjoiaW5mZXJub3dhciIsImEiOiJja3VtazR5a3cwa2VuMm5wZmVkNGNodXlwIn0.B7EO7JS6YDiT_Qrnpq8xGA';
// Lanzaremos la siguiente función de Leaflet para cargar todos los tiles de Mapbox en nuestro mapa:
L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN
  }).addTo(map);
       

// GEOLOCALIZARME---------------------

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        L.marker([position.coords.latitude, position.coords.longitude]).bindPopup("<b>The Bridge</b><br>La escuela de programación").addTo(map);                           
    });
} else {
    console.warn("Tu navegador no soporta Geolocalización!! ");
}

let apiMetro = async () => {
    try {
        let respuesta = await fetch("https://api.metro.net/swagger.json")
        let json = await respuesta.json();
        return json

    }
    catch{
        console.log("Errorrrr")
    }
}

apiMetro()
.then(datos => console.log(datos))