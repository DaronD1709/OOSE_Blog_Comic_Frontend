import React, { useState, useRef, useEffect, useContext } from "react";
import { Avatar, Button, message } from 'antd'
import { AuthContext } from "../../context/auth.context.jsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/api.js";
import { getUserAvatar } from "../../constants/utility.js";

const UserMenu = () => {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();
  const menuOptions = [
    {
      label: "My Profile",
      icon: (
        <svg
          className="w-5 h-5 mr-2 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      onClick: () => {
        if (user && user.id) {
          navigate(ROUTES.getUserProfile(user.id));
        } else {
          navigate(ROUTES.LOGIN);
        }
      },
    },
    {
      label: "Create Post",
      icon: (
        <svg
          className="w-5 h-5 mr-2 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      onClick: () => navigate(ROUTES.NEW_COMIC),
    },
    {
      label: "Setting",
      icon: (
        <svg
          className="w-5 h-5 mr-2 text-purple-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      onClick: () => alert("Go to setting!"),
    },
  ];

  const goToLogin = () => {
    if (user && user.id) {
      navigate(ROUTES.getUserProfile(user.id));
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    message.success("Đăng xuất thành công");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user]);

  return (
    <div className="relative h-12 flex items-center" ref={ref}>
      {user !== null ? (
        <>
          <div className="flex items-center">
            <div className="relative group">
              <Avatar
                src={getUserAvatar(user.avatar)}
                alt="Avatar"
                className="!w-12 !h-12 rounded-full border-2 border-blue-400 object-cover cursor-pointer hover:border-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-200"
                onClick={() => setOpen((o) => !o)}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
          {open && (
            <div
              className="fixed top-20 right-8 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-[9999] overflow-hidden transform transition-all duration-300 ease-in-out animate-fadeIn"
              style={{ zIndex: 999999 }}
            >
              <div className="px-6 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={getUserAvatar(user?.avatar)}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30 shadow-lg transform hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xl text-white font-bold tracking-tight">
                      {user.username}
                    </p>
                    <p className="text-sm text-white/90 italic">
                      @{user.username}
                    </p>
                  </div>
                </div>
              </div>
              <ul className="py-2">
                {menuOptions.map((option) => (
                  <li
                    key={option.label}
                    className="flex items-center px-6 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm transition-all duration-200 group border-l-4 border-transparent hover:border-blue-500"
                    onClick={() => {
                      setOpen(false);
                      option.onClick();
                    }}
                  >
                    <div className="flex items-center w-full group-hover:translate-x-2 transition-transform duration-200">
                      {option.icon}
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                  className="w-full py-2.5 px-4 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg text-sm font-medium transition-all duration-200 border border-gray-200 hover:border-red-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Button
          onClick={goToLogin}
          className="h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2 border-0"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Đăng nhập
        </Button>
      )}
    </div>
  );
};

export default UserMenu;
