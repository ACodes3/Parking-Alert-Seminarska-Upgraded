import { useEffect, useState } from "react";
import { FiClock, FiHome, FiMap, FiSearch, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/additional-styles/responsive.css";
import "../styles/additional-styles/sidebar.css";

const Sidebar = ({ isOpen = false, onClose }) => {
  const [cities, setCities] = useState([]);
  const [recentParking, setRecentParking] = useState([]);
  const [showAllCities, setShowAllCities] = useState(false);

  const MAX_VISIBLE_CITIES = 5;

  const visibleCities = showAllCities
    ? cities
    : cities.slice(0, MAX_VISIBLE_CITIES);

  // 🔹 Fetch slovenska mesta
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/slovenska-mesta/"
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    };

    fetchCities();
  }, []);

  // 🔹 Fetch parking spots (use as recent)
  useEffect(() => {
    const fetchParking = async () => {
      try {
        const response = await fetch(
          "https://parkingalert-backend-dnenavazhgaye7h8.northeurope-01.azurewebsites.net/api/parkirna-mesta/"
        );
        const data = await response.json();
        setRecentParking(data.slice(-5));
      } catch (error) {
        console.error("Failed to fetch parking spots:", error);
      }
    };

    fetchParking();
  }, []);

  return (
    <>
      <aside id="skin-select" className={isOpen ? "open" : ""}>
        {/* ===== FIXED HEADER ===== */}
        <div
          id="logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "17px",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Open Sans', Arial, sans-serif",
              fontSize: "27px",
              fontWeight: "200",
              letterSpacing: "-1px",
              textTransform: "uppercase",
              color: "white",
              margin: 0,
            }}
          >
            Parking Alert{" "}
            <span
              style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "3px",
                fontSize: "11px",
                padding: "0 5px",
                position: "relative",
                top: "-3px",
              }}
            >
              v 2.1
            </span>
          </h1>
        </div>

        {/* ===== FIXED SEARCH ===== */}
        <div className="dark" style={{ marginBottom: "15px", padding: "0 15px" }}>
          <form className="search-form">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search rounded id_search"
              placeholder="Iskanje ..."
            />
          </form>
        </div>

        {/* ===== SCROLLABLE CONTENT ===== */}
        <div className="skin-part sidebar-scroll">
          <div id="tree-wrap">
            <div className="side-bar">

              {/* Shortcuts */}
              <ul className="topnav menu-left-nest">
                <li>
                  <span className="title-menu-left">
                    <span>Kratice</span>
                    <FiSettings className="pull-right config-wrap" />
                  </span>
                </li>

                <li>
                  <Link to="/" className="tooltip-tip ajax-load">
                    <FiHome />
                    <span>Nadzorna plošča</span>
                  </Link>
                </li>
              </ul>

              {/* MESTA */}
              <ul className="topnav menu-left-nest">
                <li>
                  <span className="title-menu-left">
                    <span>Mesta</span>
                    <FiSettings className="pull-right config-wrap" />
                  </span>
                </li>

                {visibleCities.map((city) => (
                  <li key={city.id}>
                    <a className="tooltip-tip ajax-load" href="#">
                      <FiMap />
                      <span>{city.ime}</span>
                    </a>
                  </li>
                ))}

                {cities.length > MAX_VISIBLE_CITIES && (
                  <li className="show-more-item">
                    <button
                      type="button"
                      className="show-more-btn"
                      onClick={() => setShowAllCities((prev) => !prev)}
                    >
                      {showAllCities ? "Prikaži manj" : "Prikaži več"}
                    </button>
                  </li>
                )}
              </ul>

              {/* ZADNJA PARKIRNA MESTA */}
              <ul className="topnav menu-left-nest">
                <li>
                  <span className="title-menu-left">
                    <span>Zadnja parkirna mesta</span>
                    <FiSettings className="pull-right config-wrap" />
                  </span>
                </li>

                {recentParking.map((parking) => (
                  <li key={parking.id}>
                    <a className="tooltip-tip ajax-load" href="#">
                      <FiClock />
                      <span>{parking.ime}</span>
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
    </>
  );
};

export default Sidebar;
