// Navbar.jsx
import { Link, NavLink } from 'react-router-dom'
import NotiIcon from '../Notification/NotiIcon'
import UserMenu from './UserMenu'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context.jsx'
import { ROUTES } from '../../constants/api.js'
import filter from '/src/assets/images/filter.png'

const Navbar = () => {
  const { user } = useContext(AuthContext)
  return (
    <nav
      className="flex items-center justify-between px-8 h-16 bg-gradient-to-r from-blue-600 to-blue-500 mt-2 rounded-xl shadow-lg">
      {/* Logo + Links */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className="h-10 w-10 animate-spin-slow"
          />
          <NavLink
            to="/"
            className="ml-3 font-bold text-2xl bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent hover:from-orange-500 hover:to-orange-600 transition-all duration-300"
          >
            ReviewComic
          </NavLink>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-8 ml-6">
          <NavLink
            to={`${ROUTES.REVIEW_COMIC}`}
            className="text-white hover:text-gray-600 font-medium transition"
          >
            Review Truyện
          </NavLink>
          <NavLink
            to={`${ROUTES.REVIEW_CHARACTER}`}
            className="text-white hover:text-gray-600 font-medium transition"
          >
            Nhân Vật
          </NavLink>

          <NavLink
            to={`${ROUTES.REVIEW_INSIGHT}`}
            className="text-white hover:text-gray-600 font-medium transition"
          >
            Bình Phẩm
          </NavLink>
        </div>
      </div>

      {/* Search box */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-[300px] max-w-xl">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm truyện, nhân vật..."
              className="w-full pl-12 pr-32 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
            />
            <svg
              className="absolute left-4 w-5 h-5 text-white/70"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
            </svg>
            <button
              className="absolute right-1.5 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 flex items-center gap-2 text-sm font-medium backdrop-blur-sm hover:scale-105">
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
        <Link to={ROUTES.SEARCH}>
          <img src={`${filter}`} className={'w-9 h-9 ml-4 hover:cursor-pointer'}/>
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex align-center items-center gap-7">
        <NotiIcon/>
        <UserMenu/>
      </div>
    </nav>
  )
}

export default Navbar
