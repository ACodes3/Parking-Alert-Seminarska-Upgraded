import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

// custom green pin (current location)
import greenPin from "../images/pin.png";

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const parkingMarkersRef = useRef([]);

  const [parkingSpots, setParkingSpots] = useState([]);

  // 🔹 Fetch parking spots
  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await fetch(
          "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/parkirna-mesta/"
        );

        const data = await response.json();
        setParkingSpots(data);
      } catch (error) {
        console.error("Failed to fetch parking spots:", error);
      }
    };

    fetchParkingSpots();
  }, []);

  // 🔹 Initialize map
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [46.056946, 14.505751],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapRef.current = map;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; CARTO",
        maxZoom: 19,
      }
    ).addTo(map);

    // 🟢 GREEN ICON (current location)
    const greenIcon = new L.Icon({
      iconUrl: greenPin,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [40, 43],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // 🌍 Current location
    map.whenReady(() => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (currentLocationMarkerRef.current) {
            map.removeLayer(currentLocationMarkerRef.current);
          }

          const marker = L.marker([latitude, longitude], {
            icon: greenIcon,
          })
            .addTo(map)
            .bindPopup("Vaša trenutna lokacija");

          currentLocationMarkerRef.current = marker;
          map.setView([latitude, longitude], 13);
          marker.openPopup();
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        }
      );
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 🔹 Render parking spot markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers
    parkingMarkersRef.current.forEach((marker) => marker.remove());
    parkingMarkersRef.current = [];

    parkingSpots.forEach((spot) => {
      const marker = L.marker([spot.latitude, spot.longitude])
        .addTo(mapRef.current)
        .bindPopup(`<b>${spot.ime}</b>`);

      parkingMarkersRef.current.push(marker);
    });
  }, [parkingSpots]);

  return (
    <div style={{ width: "100%", height: "530px" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default MapComponent;
