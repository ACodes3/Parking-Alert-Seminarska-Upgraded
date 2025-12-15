import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiBell,
  FiCalendar,
  FiClock,
  FiHelpCircle,
  FiLifeBuoy,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import "../styles/pages-styles/topbar.css";

const newsItems = [
  "Redar na Ulici Sončnega Bulevarda",
  "Redar na Ulici Javorja",
  "Redar na Ulici Hrasta",
  "Gneča pri Parkirišču Tivoli",
  "Obvestilo: Zapora pri Linhartovi",
];

const TopBar = () => {
  const [newsIndex, setNewsIndex] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const [userOpen, setUserOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Move the list by a single item height instead of the full list height
  const tickerTransform = useMemo(() => {
    if (!newsItems.length) return "translateY(0)";

    const offsetPercent = 100 / newsItems.length;
    return `translateY(-${newsIndex * offsetPercent}%)`;
  }, [newsIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((current) => (current + 1) % newsItems.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close user dropdown on outside click or ESC
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    }
    function handleKeydown(e) {
      if (e.key === "Escape") setUserOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const dateLabel = useMemo(
    () =>
      now.toLocaleDateString("sl-SI", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [now]
  );

  const [hours = "00", minutes = "00", seconds = "00"] = useMemo(
    () => now.toLocaleTimeString("sl-SI", { hour12: false }).split(":"),
    [now]
  );

  return (
    <nav role="navigation" className="navbar navbar-static-top">
      <div className="container-fluid">
        <div className="topbar-row">
          {/* Mobile toggle + logo */}
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              aria-label="Toggle navigation"
            >
              <FiMenu />
            </button>

            <div id="logo-mobile" className="visible-xs">
              <h1>
                Parking Alert <span>v1.1</span>
              </h1>
            </div>
          </div>

          {/* Left icons */}
          <ul className="nav navbar-nav left-icons">
            <li className="dropdown">
              <a href="#" aria-label="Notifications">
                <FiBell style={{ fontSize: "20px" }} />
                <div className="noft-red">5</div>
              </a>
            </li>

            <li>
              <a href="#" aria-label="Help">
                <FiHelpCircle style={{ fontSize: "20px" }} />
              </a>
            </li>
          </ul>

          {/* Center running text / clock */}
          <div
            id="nt-title-container"
            className="navbar-left running-text"
            style={{ flex: 1, minWidth: 0 }}
          >
            <div className="date-time">
              <ul className="date-top">
                <li>
                  <FiCalendar />
                </li>
                <li>{dateLabel}</li>
              </ul>

              <ul className="digital">
                <li>
                  <FiClock />
                </li>
                <li>{hours}</li>
                <li>:</li>
                <li>{minutes}</li>
                <li>:</li>
                <li>{seconds}</li>
              </ul>
            </div>

            <div className="ticker-window" aria-live="polite">
              <ul
                id="nt-title"
                className="ticker-list"
                style={{ transform: tickerTransform }}
              >
                {newsItems.map((item) => (
                  <li key={item} className="ticker-item">
                    <span className="ticker-dot" aria-hidden="true" />
                    <span className="ticker-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User dropdown */}
          <ul className="nav navbar-nav navbar-right">
            <li
              ref={userMenuRef}
              className={`dropdown ${userOpen ? "open" : ""}`}
            >
              <a
                href="#"
                className="dropdown-toggle"
                aria-haspopup="true"
                aria-expanded={userOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setUserOpen((v) => !v);
                }}
              >
                <img
                  src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                  alt="User"
                  className="admin-pic img-circle"
                />
                Pozdravljeni, <span>Uporabnik</span>
                <b className="caret"></b>
              </a>

              <ul className="dropdown-menu dropdown-setting">
                <li>
                  <Link to="/profile">
                    <FiUser />
                    &nbsp;&nbsp;Moj profil
                  </Link>
                </li>
                <li>
                  <Link to="/settings">
                    <FiSettings />
                    &nbsp;&nbsp;Nastavitve
                  </Link>
                </li>
                <li>
                  <a href="#">
                    <FiLifeBuoy />
                    &nbsp;&nbsp;Pomoč
                  </a>
                </li>
                <li role="separator" className="divider"></li>
                <li>
                  <a href="#">
                    <FiLogOut />
                    &nbsp;&nbsp;Odjava
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
