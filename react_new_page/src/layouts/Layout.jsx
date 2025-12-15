// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../assets/components/Sidebar";
import TopBar from "../assets/components/TopBar";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "300px", // keep content clear of fixed sidebar width
          width: "calc(100% - 300px)",
          minHeight: "100vh",
          background: "#f6f8fb",
        }}
      >
        <TopBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
