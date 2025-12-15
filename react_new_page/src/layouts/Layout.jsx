// src/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../assets/components/Sidebar";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;
