// Navbar.jsx
import { NavLink } from "react-router-dom";
import NotiIcon from "../Notification/NotiIcon";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 h-16 bg-blue-500 mt-2 border-b border-gray-200 rounded-lg">
      {/* Logo + Links */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className="h-10"
          />
          <NavLink to="/" className="ml-3 font-bold text-xl text-orange-400">
            ReviewComic
          </NavLink>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-6 ml-6">
          <NavLink
            to="/review-comic"
            className="text-white hover:text-gray-600 font-medium transition"
          >
            Review Truyện
          </NavLink>
          <NavLink
            to="/review-character"
            className="text-white hover:text-gray-600 font-medium transition"
          >
            Nhân Vật
          </NavLink>
        </div>
      </div>

      {/* Search box */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-xl flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-50 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </div>
          <button className="px-8 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 font-medium">
            Search
          </button>
        </div>
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
