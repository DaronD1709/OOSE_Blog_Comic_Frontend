// Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import NotiIcon from "../Notification/NotiIcon";
import UserMenu from "./UserMenu";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import { ROUTES } from "../../constants/api.js";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="flex items-center justify-between px-8 h-20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 mt-2 rounded-2xl shadow-xl backdrop-blur-sm border border-white/10">
      {/* Logo + Links */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center group">
          <div className="relative">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="Logo"
              className="h-12 w-12 animate-spin-slow group-hover:animate-spin transition-all duration-500"
            />
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
          <NavLink
            to="/"
            className="ml-3 font-bold text-3xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 bg-clip-text text-transparent hover:from-orange-500 hover:via-orange-600 hover:to-orange-500 transition-all duration-300 tracking-tight"
          >
            ReviewComic
          </NavLink>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-8 ml-6">
          <NavLink
            to={`${ROUTES.REVIEW_COMIC}`}
            className="text-white hover:text-orange-300 font-medium transition-all duration-300 relative group"
          >
            Review Truyện
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-300 group-hover:w-full transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to={`${ROUTES.REVIEW_CHARACTER}`}
            className="text-white hover:text-orange-300 font-medium transition-all duration-300 relative group"
          >
            Nhân Vật
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-300 group-hover:w-full transition-all duration-300"></span>
          </NavLink>
          <NavLink
            to={`${ROUTES.REVIEW_INSIGHT}`}
            className="text-white hover:text-orange-300 font-medium transition-all duration-300 relative group"
          >
            Bình Phẩm
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-300 group-hover:w-full transition-all duration-300"></span>
          </NavLink>
        </div>
      </div>

      {/* Search box */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-[300px] max-w-xl">
          <div className="relative flex items-center group">
            <input
              type="text"
              placeholder="Tìm kiếm truyện, nhân vật..."
              className="w-full pl-12 pr-32 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-300/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/15"
            />
            <svg
              className="absolute left-4 w-5 h-5 text-white/70 group-hover:text-orange-300 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <button className="absolute right-1.5 px-4 py-2 bg-white/10 hover:bg-orange-400 text-white rounded-full transition-all duration-300 flex items-center gap-2 text-sm font-medium backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-orange-400/20">
              <span>Tìm kiếm</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <Link to={ROUTES.SEARCH} className="group ml-7 pt-1">
          <button className="relative text-white bg-white/10 p-2 rounded-full hover:bg-white/20 focus:outline-none transition-all duration-300 hover:scale-110">
            <svg
              className="w-6 h-6 transition-all duration-300 transform group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
              />
            </svg>
          </button>
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex align-center items-center gap-7">
        <NotiIcon />
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
