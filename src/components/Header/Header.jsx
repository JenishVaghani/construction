import React from "react";
import { LISTOPEN } from "../../utils/constants";

function Header({ toggleSidebar }) {
  const user = localStorage.getItem("user");
  const capitalLetter = user?.charAt(0).toUpperCase();
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
          {user?? "Welcome"}
        </span>
        <div className="relative w-11 h-11">
          <button className="w-full h-full rounded-full border-2 border-gray-500 shadow-md bg-yellow-600 text-white flex items-center justify-center font-bold text-xl">
            {capitalLetter??"W"}
          </button>
          {/* Green Dot */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400  rounded-full"></span>
        </div>
      </div>
    </div>
  );
}

export default Header;
