import React from "react";
import { PROFILE } from "../../utils/constants";

function Header() {
  const profile = PROFILE;

  return (
    <div className="h-16 bg-[#15616D]  text-white flex items-center justify-between px-6 fixed top-0 right-0 left-56 z-10">
      {/* Title (Centered) */}
      <h1 className="text-xl font-semibold tracking-wide flex-1 text-center">
        Construction Management
      </h1>

      {/* Profile Section (Aligned to End / Right) */}
      <div className="flex items-center space-x-3">
        <span className="text-lg font-medium">{profile.name}</span>
        <button>
          <img
            src={profile.img}
            alt={profile.name}
            className="w-12 h-12 rounded-full border-2 border-gray-500 shadow-md"
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
