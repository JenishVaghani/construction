import React, { useEffect, useRef, useState } from "react";
import { LISTOPEN, LOGOUT } from "../../utils/constants";

function Header({ toggleSidebar }) {
  const user = localStorage.getItem("user");
  const capitalLetter = user?.charAt(0).toUpperCase();
  const listOpen = LISTOPEN;
  const logoutImg = LOGOUT;
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#15616D] text-white flex items-center justify-between px-2 h-16 fixed top-0 right-0 z-10 left-0 sm:left-20 lg:left-56 duration-300">
      <div className="space-x-1 flex items-center">
        <img
          src={listOpen.img}
          alt={listOpen.name}
          className="object-contain w-8 h-8 rounded-md cursor-pointer block sm:hidden"
          onClick={toggleSidebar}
        />
      </div>

      {/* Title (Centered) */}
      <h1 className="text-md sm:text-lg lg:text-lg  font-semibold tracking-wide flex-1 text-center">
        Construction Management
      </h1>

      {/* Profile Section (Aligned to End / Right) */}
      <div className="flex items-center space-x-3 relative">
        {/* User Name */}
        <span className="text-md sm:text-lg lg:text-lg font-medium hidden sm:block lg:block">
          {user ?? "Welcome"}
        </span>

        {/* Profile Button */}
        <div className="relative w-11 h-11">
          <button
          ref={buttonRef}
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-full h-full rounded-full border-2 border-gray-500 shadow-md bg-yellow-600 text-white flex items-center justify-center font-bold text-xl focus:outline-none cursor-pointer"
          >
            {capitalLetter ?? "W"}
          </button>

          {/* Green Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>

          {/* Dropdown */}
          {openDropdown && (
            <div ref={dropdownRef} className="absolute right-0 mt-3 w-36 bg-[#15616D] rounded-md z-20">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 lg:py-3 text-base text-white hover:bg-[#0E4A52] rounded-md text-left cursor-pointer"
              >
                <img
                  src={logoutImg.img}
                  alt={logoutImg.name}
                  className="w-6 h-6"
                />
                <span className="text-lg">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
