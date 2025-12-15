// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Sidebar from "../assets/components/Sidebar";
import TopBar from "../assets/components/TopBar";
import "../assets/styles/additional-styles/responsive.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((v) => !v);
  }, []);

  // Close on ESC for accessibility
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app-root">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`content-root ${sidebarOpen ? "drawer-open" : ""}`}>
        <TopBar onMenuClick={toggleSidebar} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
