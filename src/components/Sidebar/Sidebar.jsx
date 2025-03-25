import { useEffect } from "react";
import { SIDEDETAILS, TEQNODUX } from "../../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const teqnodux = TEQNODUX;
  const sideDetails = SIDEDETAILS;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
      console.log(location.pathname.startsWith, "location.pathname.startsWith");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <div className="w-56 bg-[#15616D] h-screen p-4 fixed z-10 top-0">
        {/* Teqnodux Section */}
        <div className="flex items-center mb-6">
          <img
            src={teqnodux.img}
            alt={teqnodux.name}
            className="object-contain w-12 h-12 rounded-full mb-2 shadow"
          />
          <h1 className="ml-3 text-2xl font-semibold text-slate-100">
            Teqnodux
          </h1>
        </div>

        {/* Sidebar Details */}
        <div className="space-y-1">
          {sideDetails.map((item, index) => (
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
              <h1 className="text-slate-100 font-medium">{item.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
