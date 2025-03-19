import React from "react";
import { EDIT, SHOW } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

function SuadaCard({
  index,
  Vname,
  Sname,
  VQty,
  SQty,
  VRate,
  SRate,
  VBillno,
  SBillno,
  Brand,
  Date,
  Status,
}) {
  const navigate = useNavigate()
  const edit = EDIT;
  const show = SHOW;

  const handleEditClick = () => {
    navigate(`/dashboard/edit/${index}`)
  }

  return (
    <div className="w-64 border rounded-lg p-4 shadow-lg relative bg-white mt-4">
      {/* Edit Icon */}
      <div className="absolute -top-5 right-2 bg-gray-300 p-2 rounded-full shadow-md cursor-pointer">
        <img
          src={Status === "Complete" ? show.img : edit.img}
          alt={Status === "Complete" ? show.name : edit.name}
          className="w-6 h-6"
          onClick={handleEditClick}
        />
      </div>

      {/* V Name & S Name Section */}
      <div className="flex justify-between items-center text-gray-600 font-medium">
        <div className="text-center w-1/2">
          <h1 className="text-sm">{Vname}</h1>
          <div className="text-xs mt-4">
            <p>{VQty}</p>
            <p className="font-bold text-lg">{VRate}</p>
            <p>{VBillno}</p>
          </div>
        </div>
        <div className="h-24 w-px bg-gray-400"></div> {/* Vertical Divider */}
        <div className="text-center w-1/2">
          <h1 className="text-sm">{Sname}</h1>
          <div className="text-xs mt-4">
            <p>{SQty}</p>
            <p className="font-bold text-lg">{SRate}</p>
            <p>{SBillno}</p>
          </div>
        </div>
      </div>

      {/* Brand & Date Section */}
      <div className="text-center mt-3">
        <p className="text-sm font-semibold">{Brand}</p>

        <p className="text-sm text-gray-600">
          <span className="font-medium">Date :</span> {Date}
        </p>
      </div>

      {/* Draft Button */}
      <div className="mt-3">
        <button
          className={`w-full text-black py-2 rounded-md shadow-md font-medium cursor-pointer
            ${Status === "Draft" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
            ${Status === "In transite" ? "bg-red-500 hover:bg-red-600" : ""}
            ${Status === "Complete" ? "bg-green-500 hover:bg-green-600" : ""}
          `}
        >
          {Status}
        </button>
      </div>
    </div>
  );
}

export default SuadaCard;
