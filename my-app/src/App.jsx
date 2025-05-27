import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import AppFooter from "./components/Footer/AppFooter";
import { useContext, useEffect } from "react";
import "./App.css";
import { AuthContext } from "./context/auth.context.jsx";
import { fetchAccountAPI } from "./services/userService.js";
function App() {
  return (
    <>
      <div className="app-container min-h-screen flex flex-col bg-gray-50 mt-2">
        <div className="header-container rounded-lg">
          <Navbar />
        </div>
        <div className="content-container ">
          <Outlet />
        </div>
        <div className="footer-container !mt-20">
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export default App;
