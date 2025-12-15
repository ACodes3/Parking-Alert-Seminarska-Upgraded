import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

// custom green pin (same as old project)
import greenPin from "../images/pin.png";

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);

  useEffect(() => {
    // Prevent double initialization (React StrictMode safe)
    if (mapRef.current) return;

    // Ensure container exists before initializing map
    if (!mapContainerRef.current) return;

    // Small delay to ensure DOM is fully rendered
    const initTimer = setTimeout(() => {
      // Check again if already initialized (double protection)
      if (mapRef.current) return;

      // Remove any existing Leaflet instance from the container
      const container = mapContainerRef.current;
      if (container._leaflet_id) {
        delete container._leaflet_id;
      }

      // === SAME AS: var map = L.map("leafletMap").setView(...) ===
      const map = L.map(container, {
        center: [46.056946, 14.505751],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: true
      });

      mapRef.current = map;

      // === CARTO Voyager base layer (same as old HTML) ===
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      // Force map to recalculate size
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // === CUSTOM GREEN ICON ===
      const greenIcon = new L.Icon({
        iconUrl: greenPin,
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [40, 43],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // === SHOW ALL PARKING LOCATIONS ===
      (window.parkirnaMesta || []).forEach((parkirisce) => {
        L.marker([parkirisce.latitude, parkirisce.longitude])
          .addTo(map)
          .bindPopup(parkirisce.ime);
      });

      // === GLOBAL FUNCTION (unchanged API) ===
      window.updateCurrentLocationMarker = (lat, lon, label) => {
        if (!mapRef.current) return; // Ensure map is initialized
        
        if (currentLocationMarkerRef.current) {
          map.removeLayer(currentLocationMarkerRef.current);
        }

        const marker = L.marker([lat, lon], { icon: greenIcon })
          .addTo(map)
          .bindPopup(label);

        currentLocationMarkerRef.current = marker;

        map.setView([lat, lon], 13);
        
        // Open popup after a brief delay to ensure DOM is ready
        setTimeout(() => {
          marker.openPopup();
        }, 100);
      };

      // === GEOLOCATION ON LOAD ===
      // Wait for map to be fully ready before getting location
      map.whenReady(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              window.updateCurrentLocationMarker(
                latitude,
                longitude,
                "Vaša trenutna lokacija"
              );
            },
            (error) => {
              console.error(
                "Napaka pri pridobivanju trenutne lokacije:",
                error.message
              );
              // optional toast hook
              // showToast("Napaka pri pridobivanju geografske lokacije.", "error");
            }
          );
        }
      });
    }, 10);

    // Cleanup on unmount
    return () => {
      clearTimeout(initTimer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      // Clear Leaflet's internal container reference
      if (mapContainerRef.current && mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }
    };
  }, []);

  return (
    <div id="paper-middle" style={{ width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "530px",
          minHeight: "530px",
        }}
      >
        <div
          id="embed-ded-map-canvas"
          style={{ 
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100%", 
            width: "100%" 
          }}
        >
          {/* Use ref instead of ID for safer React integration */}
          <div 
            ref={mapContainerRef} 
            id="leafletMap" 
            style={{ 
              height: "100%", 
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
