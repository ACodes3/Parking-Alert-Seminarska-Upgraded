import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/additional-styles/breadcrumb.css";
import AddWarden from "./modals/AddWarden";
import ChooseLocationModal from "./modals/ChooseLoactionModal";

const Breadcrub = () => {
  const location = useLocation();
  const [isAddWardenOpen, setIsAddWardenOpen] = useState(false);
  const [isChooseLocationOpen, setIsChooseLocationOpen] = useState(false);

  const breadcrumbs = useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    
    const breadcrumbItems = [
      { label: "Domov", path: "/" }
    ];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      
      // Create readable labels from path names
      const labels = {
        "profile": "Profil",
        "settings": "Nastavitve",
        "search": "Iskanje",
        "parking": "Parkiriščа",
      };
      
      const label = labels[path] || path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbItems.push({ label, path: currentPath });
    });

    return breadcrumbItems;
  }, [location.pathname]);

  const handleAddWardenSubmit = () => {
    // Handle form submission here
    console.log("Redar prijavljen");
    setIsAddWardenOpen(false);
  };

  const handleChooseLocationConfirm = (location) => {
    // Handle location selection here
    console.log("Izbrana lokacija:", location);
    setIsChooseLocationOpen(false);
  };

  return (
    <>
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

        <div className="breadcrumb-actions">
          <button 
            className="breadcrumb-btn btn-report"
            onClick={() => setIsAddWardenOpen(true)}
          >
            Prijavi redarja
          </button>
          <button 
            className="breadcrumb-btn btn-location"
            onClick={() => setIsChooseLocationOpen(true)}
          >
            Izberi lokacijo
          </button>
          <button className="breadcrumb-btn btn-gps">GPS</button>
        </div>
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
    </>
  );
};

export default Breadcrub;