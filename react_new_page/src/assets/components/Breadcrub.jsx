import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/additional-styles/breadcrumb.css";

const Breadcrub = () => {
  const location = useLocation();

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

  return (
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
    </nav>
  );
};

export default Breadcrub;