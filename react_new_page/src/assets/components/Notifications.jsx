
import { useMemo, useState } from "react";
import "../styles/additional-styles/notifications.css";

const seedNotifications = [
  {
    id: 1,
    title: "Redar v bližini",
    message: "Opazili smo aktivnega redarja na Trgu republike. Če parkirate v okolici, preverite vozilo.",
    time: "pred 3 min",
    type: "warning",
    source: "GPS opozorila",
    read: false,
  },
  {
    id: 2,
    title: "Novi podatki o parkirišču",
    message: "Na parkirišču Tivoli je na voljo 12 novih prostih mest. Sistem je posodobil redar 15 min nazaj.",
    time: "pred 15 min",
    type: "info",
    source: "Uporabnik Marko",
    read: false,
  },
  {
    id: 3,
    title: "Potrjeno opozorilo",
    message: "Vaša prijava nepravilnega parkiranja je bila obdelana. Hvala za posodobitev podatkov!",
    time: "pred 1 h",
    type: "success",
    source: "Sistem",
    read: true,
  },
  {
    id: 4,
    title: "Nova prijava redarja",
    message: "Uporabnik Ana je opazila redarja na Slovenski cesti (pri postaji LPP).",
    time: "pred 2 h",
    type: "warning",
    source: "Uporabnik Ana",
    read: true,
  },
];

const filterTabs = [
  { key: "all", label: "Vsa" },
  { key: "unread", label: "Neprebrana" },
  { key: "warning", label: "Kritična" },
  { key: "info", label: "Informativna" },
  { key: "success", label: "Potrjena" },
];

const typeLabels = {
  warning: "Kritično",
  info: "Info",
  success: "Potrjeno",
};

const Notifications = () => {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(seedNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const filtered = useMemo(() => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter((item) => !item.read);
    return notifications.filter((item) => item.type === filter);
  }, [filter, notifications]);

  const toggleRead = (id) => {
    setNotifications((curr) =>
      curr.map((item) =>
        item.id === id ? { ...item, read: !item.read } : item
      )
    );
  };

  const markAllRead = () => {
    if (!unreadCount) return;
    setNotifications((curr) => curr.map((item) => ({ ...item, read: true })));
  };

  const clearRead = () => {
    setNotifications((curr) => curr.filter((item) => !item.read));
  };

  return (
    <div className="notifications-wrap">
      <div className="notifications-card">
        <div className="notifications-header">
          <div className="notifications-title">
            <span className="entypo-bell notifications-title-icon" aria-hidden="true" />
            <div>
              <p className="notifications-subtitle">Obvestila</p>
              <p className="notifications-count">
                {unreadCount} neprebranih · skupaj {notifications.length}
              </p>
            </div>
          </div>

          <div className="notifications-actions">
            <button
              type="button"
              className="btn-ghost"
              onClick={markAllRead}
              disabled={!unreadCount}
            >
              Označi vse kot prebrano
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={clearRead}
              disabled={notifications.length === unreadCount}
            >
              Skrij prebrana
            </button>
          </div>
        </div>

        <div className="notifications-filters">
          {filterTabs.map((tab) => {
            const active = filter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                className={active ? "filter-btn active" : "filter-btn"}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
                {tab.key === "unread" && unreadCount > 0 && (
                  <span className="filter-badge">{unreadCount}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="notifications-list">
          {filtered.length === 0 && (
            <div className="notifications-empty">
              <span className="entypo-megaphone" aria-hidden="true" />
              <p>Ni obvestil za izbrani filter.</p>
            </div>
          )}

          {filtered.map((item) => (
            <div
              key={item.id}
              className={`notification-item ${item.read ? "is-read" : "is-unread"}`}
            >
              <div className={`notification-icon type-${item.type}`} aria-hidden="true">
                <span className="entypo-info" />
              </div>

              <div className="notification-content">
                <div className="notification-top">
                  <div className="notification-title-row">
                    <span className="notification-title">{item.title}</span>
                    <span className={`chip chip-${item.type}`}>
                      {typeLabels[item.type] ?? item.type}
                    </span>
                  </div>
                  <span className="notification-time">{item.time}</span>
                </div>

                <p className="notification-message">{item.message}</p>

                <div className="notification-meta">
                  <span className="meta-dot" aria-hidden="true" />
                  <span className="notification-source">{item.source}</span>
                </div>
              </div>

              <button
                type="button"
                className="notification-action"
                onClick={() => toggleRead(item.id)}
              >
                {item.read ? "Označi kot neprebrano" : "Označi kot prebrano"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;