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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../styles/pages-styles/topbar.css";

const newsItems = [
  "Redar na Ulici Sončnega Bulevarda",
  "Redar na Ulici Javorja",
  "Redar na Ulici Hrasta",
  "Gneča pri Parkirišču Tivoli",
  "Obvestilo: Zapora pri Linhartovi",
];

const notificationSeed = [
  {
    id: 1,
    title: "Redar v bližini",
    preview: "Ulica Sončnega Bulevarda, preverite vozilo.",
    time: "pred 3 min",
    type: "warning",
    read: false,
  },
  {
    id: 2,
    title: "Novi podatki o parkirišču",
    preview: "Tivoli: na voljo 12 prostih mest.",
    time: "pred 15 min",
    type: "info",
    read: false,
  },
  {
    id: 3,
    title: "Potrjeno opozorilo",
    preview: "Vaša prijava je obdelana. Hvala!",
    time: "pred 1 h",
    type: "success",
    read: true,
  },
];

const TopBar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [newsIndex, setNewsIndex] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationSeed);
  const userMenuRef = useRef(null);
  const notifMenuRef = useRef(null);

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
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    function handleKeydown(e) {
      if (e.key === "Escape") {
        setUserOpen(false);
        setNotifOpen(false);
      }
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

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const isRedar = useMemo(() => (text) => /\bRedar\b/i.test(text), []);

  const markAllRead = () => {
    if (!unreadCount) return;
    setNotifications((curr) => curr.map((item) => ({ ...item, read: true })));
  };

  const markOneRead = (id) => {
    setNotifications((curr) =>
      curr.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
    setNotifOpen(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login", { replace: true });
  };

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
              aria-controls="skin-select"
              aria-expanded={false}
              onClick={onMenuClick}
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
            <li
              ref={notifMenuRef}
              className={`dropdown topbar-dropdown ${notifOpen ? "open" : ""}`}
            >
              <a
                href="#"
                aria-label="Notifications"
                className="dropdown-toggle"
                aria-haspopup="true"
                aria-expanded={notifOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setNotifOpen((v) => !v);
                  setUserOpen(false);
                }}
              >
                <FiBell style={{ fontSize: "20px" }} />
                {unreadCount > 0 && (
                  <div className="noft-red">{unreadCount}</div>
                )}
              </a>

              <ul className="dropdown-menu dropdown-notifications">
                <li className="notif-header">
                  <div>
                    <p className="notif-title">Obvestila</p>
                    <p className="notif-subtitle">
                      {unreadCount} neprebranih · skupaj {notifications.length}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="notif-action"
                    onClick={markAllRead}
                    disabled={!unreadCount}
                  >
                    Označi vse
                  </button>
                </li>

                <li className="notif-list">
                  {notifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`notif-item ${
                        item.read ? "is-read" : "is-unread"
                      }`}
                      onClick={() => markOneRead(item.id)}
                    >
                      <div
                        className={`notif-dot type-${item.type}`}
                        aria-hidden="true"
                      />
                      <div className="notif-content">
                        <div className="notif-row">
                          <span className="notif-item-title">{item.title}</span>
                          <span className="notif-time">{item.time}</span>
                        </div>
                        <p className="notif-preview">{item.preview}</p>
                      </div>
                    </button>
                  ))}
                </li>

                <li className="notif-footer">
                  <Link to="/help" onClick={() => setNotifOpen(false)}>
                    <FiHelpCircle /> Center za pomoč
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a href="/help" aria-label="Help">
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
                    {isRedar(item) && (
                      <span className="ticker-avatar" aria-hidden="true">
                        R
                      </span>
                    )}
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
                Pozdravljeni,{" "}
                <span>{user?.username || user?.email || "Uporabnik"}</span>
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
                  <a href="/help">
                    <FiLifeBuoy />
                    &nbsp;&nbsp;Pomoč
                  </a>
                </li>
                <li role="separator" className="divider"></li>
                <li>
                  <a href="#" onClick={handleLogout}>
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
