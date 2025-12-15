var map = L.map("leafletMap").setView([46.056946, 14.505751], 13);

// Osnovni sloj zemljevida
L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  }
).addTo(map);

// Oznaka za trenutno ali izbrano lokacijo
let currentLocationMarker = null;

// Zelena ikona po meri za trenutno lokacijo
const greenIcon = new L.Icon({
  iconUrl: "../front-end/assets/img/pin.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [40, 43],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Prikaz vseh parkirišč
(window.parkirnaMesta || []).forEach((parkirisce) => {
  L.marker([parkirisce.latitude, parkirisce.longitude])
    .addTo(map)
    .bindPopup(parkirisce.ime);
});

// Poskusi pridobiti geolokacijo ob nalaganju strani
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      updateCurrentLocationMarker(lat, lon, "Vaša trenutna lokacija");
    },
    (error) => {
      showToast("Napaka pri pridobivanju geografske lokacije.", "error");
      console.error(
        "Napaka pri pridobivanju trenutne lokacije:",
        error.message
      );
    }
  );
} else {
  showToast("Geolokacija ni podprta v tem brskalniku.", "warning");
}

// Funkcija za posodobitev oznake trenutne lokacije na zemljevidu
window.updateCurrentLocationMarker = function (lat, lon, label) {
  // Če označevalec že obstaja, ga najprej odstrani
  if (window.currentLocationMarker) {
    map.removeLayer(window.currentLocationMarker);
  }

  // Ustvari in dodaj novo oznako na zemljevid
  window.currentLocationMarker = L.marker([lat, lon], { icon: greenIcon })
    .addTo(map)
    .bindPopup(label)
    .openPopup();

  // Po želji lahko spremenimo tudi pogled (povečavo in središče) na novo lokacijo.
  map.setView([lat, lon], 13);
};

// ConfirmSelectedParking za posodobitev izbranega parkirišča
function confirmSelectedParking() {
  if (!selectedParkingLocation) {
    showToast("Prosimo, najprej izberite parkirišče.", "warning");
    return;
  }

  const { ime, latitude, longitude } = selectedParkingLocation;

  // Posodobi localStorage
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));
  if (userData) {
    userData.location = ime;
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  }

  // Posodobi DOM
  const locationSpan = document.getElementById("last-location");
  if (locationSpan) {
    locationSpan.innerHTML = ` <strong>${ime}</strong>`;
  }

  // Posodobitev oznake trenutne lokacije
  updateCurrentLocationMarker(latitude, longitude, `Izbrana lokacija: ${ime}`);

  closeModal();
}
