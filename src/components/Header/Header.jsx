import React from "react";
import { PROFILE, LISTOPEN } from "../../utils/constants";

function Header({ toggleSidebar }) {
  const profile = PROFILE;
  const listOpen = LISTOPEN;

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
      <div className="flex items-center space-x-3">
        <span className="text-md sm:text-lg lg:text-lg font-medium hidden sm:block lg:block">
          {profile.name}
        </span>
        <button>
          <img
            src={profile.img}
            alt={profile.name}
            className="w-12 h-12 rounded-full border-2 border-gray-500 shadow-md "
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
