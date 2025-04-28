import { useEffect, useRef } from "react";
import { SIDEDETAILS, TEQNODUX } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const teqnodux = TEQNODUX;
  const sideDetails = SIDEDETAILS;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location.pathname, navigate]);

  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  const isAdmin = localStorage.getItem("isAdminStatus");
  
  const filteredSideDetails =
    isAdmin === "1"
      ? sideDetails
      : sideDetails.filter((item) => item.name === "dashboard");

  return (
    <>
      <div
        ref={sidebarRef}
        className={`bg-[#15616D] h-screen p-4 fixed z-10 top-0 sm:w-20 lg:w-56 duration-300 sm:block lg:block ${
          isSidebarOpen ? "block" : "hidden"
        } ${isSidebarOpen ? "w-56" : "w-20"}`}
      >
        {/* Teqnodux Section */}
        <div className="flex items-center mb-6">
          <img
            src={teqnodux.img}
            alt={teqnodux.name}
            className="object-contain w-10 h-10 rounded-full mb-2 shadow"
          />
          <h1
            className={`ml-3 text-2xl font-semibold text-slate-100 sm:hidden lg:block ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Teqnodux
          </h1>
        </div>

        {/* Sidebar Details */}
        <div className="space-y-1">
          {filteredSideDetails.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/${item.name}`)}
              className={`flex items-center space-x-3 p-2 rounded-lg transition cursor-pointer ${
                location.pathname.startsWith(`/${item.name}`)
                  ? "bg-[#0E4A52]"
                  : "hover:bg-[#1B7F8A]"
              }`}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-8 h-8 rounded-md"
              />
              <h1
                className={`text-slate-100 font-medium sm:hidden lg:block ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                {item.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
