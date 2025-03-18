import React from "react";
import { EDIT, SHOW } from "../../utils/constants";

function SuadaCard({
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
  const edit = EDIT;
  const show = SHOW;
  return (
    <div className="w-68 border rounded-lg p-4 shadow-lg relative bg-white ml-4 mt-4">
      {/* Edit Icon */}
      <div className="absolute -top-5 right-2 bg-gray-300 p-2 rounded-full shadow-md cursor-pointer">
        <img
          src={Status === "Complete" ? show.img : edit.img}
          alt={Status === "Complete" ? show.name : edit.name}
          className="w-6 h-6"
        />
      </div>

      {/* V Name & S Name Section */}
      <div className="flex justify-between items-center text-gray-600 font-medium">
        {/* Left Labels - Aligned Properly */}
        <div className="flex flex-col items-start">
            <label className="text-sm mt-14">Qty:</label>
            <label className="text-sm mt-2">Rate:</label>
            <label className="text-sm mt-3">Bill No:</label>
        </div>

        {/* Vendor Data */}
        <div className="text-center">
          <label className="text-md">V</label>
          <h1 className="text-sm font-semibold">{Vname}</h1>
          <div className="text-xs mt-2 space-y-2">
            <p>{VQty}</p>
            <p className="font-bold text-lg">{VRate}</p>
            <p>{VBillno}</p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-24 w-px bg-gray-400"></div>

        {/* Seller Data */}
        <div className="text-center">
          <label className="text-md">S</label>
          <h1 className="text-sm font-semibold">{Sname}</h1>
          <div className="text-xs mt-2 space-y-2">
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
