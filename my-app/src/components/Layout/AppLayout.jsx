import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import AppFooter from "../Footer/AppFooter";

const AppLayout = () => {
  return (
    <div className="app-container min-h-screen flex flex-col bg-gray-50">
      <div className="header-container">
        <Navbar />
      </div>

      <div className="content-container flex-1">
        <Outlet />
      </div>

      <div className="footer-container">
        <AppFooter />
      </div>
    </div>
  );
};

export default AppLayout;
