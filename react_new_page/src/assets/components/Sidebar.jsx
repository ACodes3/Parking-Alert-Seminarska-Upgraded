import { FiClock, FiHome, FiMap, FiSearch, FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/additional-styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside id="skin-select">
      {/* Logo */}
      <div
        id="logo"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "20px",
          marginTop: "17px",
        }}
      >
        <h1
          style={{
            fontSize: "x-large",
            display: "flex",
            alignItems: "center",
            color: "white",
            gap: "10px",
          }}
        >
          Parking Alert <span>v2.1</span>
        </h1>
      </div>

      {/* Search */}
      <div className="dark" style={{ marginBottom: "15px" }}>
        <form className="search-form">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search rounded id_search"
            placeholder="Iskanje ..."
          />
        </form>
      </div>

      {/* Menu */}
      <div className="skin-part">
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
                <Link
                  to="/"
                  className="tooltip-tip ajax-load"
                  title="Dashboard"
                >
                  <FiHome />
                  <span>Nadzorna plošča</span>
                </Link>
              </li>
            </ul>

            {/* Cities */}
            <ul className="topnav menu-left-nest" id="citySidebar">
              <li>
                <span className="title-menu-left">
                  <span>Mesta</span>
                  <FiSettings className="pull-right config-wrap" />
                </span>
              </li>

              <li>
                <a className="tooltip-tip ajax-load" href="#">
                  <FiMap />
                  <span>Ljubljana</span>
                </a>
              </li>
              <li>
                <a className="tooltip-tip ajax-load" href="#">
                  <FiMap />
                  <span>Maribor</span>
                </a>
              </li>
              <li>
                <a className="tooltip-tip ajax-load" href="#">
                  <FiMap />
                  <span>Kranj</span>
                </a>
              </li>
            </ul>

            {/* Recent parking */}
            <ul className="topnav menu-left-nest">
              <li>
                <span className="title-menu-left">
                  <span>Zadnja Parkirišča</span>
                  <FiSettings className="pull-right config-wrap" />
                </span>
              </li>

              <li>
                <a className="tooltip-tip ajax-load" href="#">
                  <FiClock />
                  <span>Parkirišče FRI</span>
                </a>
              </li>
              <li>
                <a className="tooltip-tip ajax-load" href="#">
                  <FiClock />
                  <span>Parkirišče Bežigrad</span>
                </a>
              </li>
              <li>
                <a className="tooltip-tip ajax-load" href="#">
                  <FiClock />
                  <span>Parkirišče Dolenjska cesta</span>
                </a>
              </li>
              <li>
                <a className="tooltip-tip ajax-load" href="#">
                  <FiClock />
                  <span>Parkirišče Tivoli</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
