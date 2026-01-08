import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/additional-styles/breadcrumb.css";
import AddWarden from "./modals/AddWarden";
import ChooseLocationModal from "./modals/ChooseLoactionModal";
import GPSModal from "./modals/GPSModal";
import Toast from "./Toast";

const Breadcrub = ({ showButtons = true }) => {
  const location = useLocation();
  const [isAddWardenOpen, setIsAddWardenOpen] = useState(false);
  const [isChooseLocationOpen, setIsChooseLocationOpen] = useState(false);
  const [isGPSOpen, setIsGPSOpen] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean);

    const breadcrumbItems = [{ label: "Domov", path: "/" }];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;

      // Create readable labels from path names
      const labels = {
        profile: "Profil",
        settings: "Nastavitve",
        search: "Iskanje",
        parking: "Parkiriščа",
        help: "Pomoč",
      };

      const label =
        labels[path] || path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbItems.push({ label, path: currentPath });
    });

    return breadcrumbItems;
  }, [location.pathname]);

  const handleAddWardenSubmit = () => {
    setToastMessage("Redar uspešno prijavljen.");
    setToastType("success");
    setToastOpen(true);
    setIsAddWardenOpen(false);
  };

  const handleChooseLocationConfirm = (location) => {
    console.log("Izbrana lokacija:", location);
    setIsChooseLocationOpen(false);

    if (!location) return;

    const movePin = () => {
      if (window.moveSelectedParkingMarker) {
        window.moveSelectedParkingMarker(
          location.latitude,
          location.longitude,
          location.ime
        );
        return true;
      }
      return false;
    };

    // Try immediately
    if (movePin()) return;

    // If map is not ready yet, retry shortly
    const interval = setInterval(() => {
      if (movePin()) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleGPSToggle = (enabled) => {
    // Handle GPS toggle here
    console.log("GPS:", enabled ? "vklopljen" : "izklopljen");
  };

  return (
    <>
      <Toast
        message={toastMessage}
        open={toastOpen}
        type={toastType}
        duration={3000}
        position="top-right"
        onClose={() => setToastOpen(false)}
      />

      <nav aria-label="Breadcrumb navigation" className="breadcrumb-nav">
        <ol className="breadcrumb-list">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={crumb.path} className="breadcrumb-item">
                {isLast ? (
                  <span className="breadcrumb-current">{crumb.label}</span>
                ) : (
                  <>
                    <Link to={crumb.path} className="breadcrumb-link">
                      {crumb.label}
                    </Link>
                    <span className="breadcrumb-separator"> / </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>

        {showButtons && (
          <div className="breadcrumb-actions">
            <button
              className="breadcrumb-btn btn-report"
              onClick={() => setIsAddWardenOpen(true)}
            >
              <i className="fa fa-exclamation-triangle"></i>
              Prijavi redarja
            </button>
            <button
              className="breadcrumb-btn btn-location"
              onClick={() => setIsChooseLocationOpen(true)}
            >
              <i className="fa fa-map-marker"></i>
              Izberi lokacijo
            </button>
            <button
              className="breadcrumb-btn btn-gps"
              onClick={() => setIsGPSOpen(true)}
            >
              <i className="fa fa-location-arrow"></i>
              GPS
            </button>
          </div>
        )}
      </nav>

      <AddWarden
        isOpen={isAddWardenOpen}
        onClose={() => setIsAddWardenOpen(false)}
        onSubmit={handleAddWardenSubmit}
      />

      <ChooseLocationModal
        isOpen={isChooseLocationOpen}
        onClose={() => setIsChooseLocationOpen(false)}
        onConfirm={handleChooseLocationConfirm}
      />

      <GPSModal
        isOpen={isGPSOpen}
        onClose={() => setIsGPSOpen(false)}
        onToggle={handleGPSToggle}
      />
    </>
  );
};

export default Breadcrub;
