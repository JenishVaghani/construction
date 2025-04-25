import React from "react";
import { EDIT, SHOW } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SuadaCard({
  id,
  Vname,
  Sname,
  TotalQty,
  TotalVRate,
  TotalSRate,
  Billno,
  Brand,
  Date,
  Status,
  onStatusChange,
}) {
  const navigate = useNavigate();
  const edit = EDIT;
  const show = SHOW;

  const handleEditClick = () => {
    if (Status.toLowerCase() === "complete") {
      navigate(`/dashboard/edit/${id}?mode=view`);
    } else {
      navigate(`/dashboard/edit/${id}?mode=edit`);
    }
  };

  const handleChangeStatus = async () => {
    let newStatus = Status;
    if (Status === "Draft") {
      newStatus = "In Transite";
    } else if (Status === "In Transite") {
      newStatus = "Complete";
    }

    try {
      await axios.put("http://192.168.1.3:5000/updateSuadaStatus", {
        status: newStatus,
        id: id,
      });

      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="w-72 border rounded-lg p-4 shadow-lg relative bg-white mt-4 mx-auto">
      {/* Edit Icon */}
      <div className="absolute -top-5 right-2 bg-gray-300 hover:bg-[#C8C8C8] p-2 rounded-full shadow-md cursor-pointer">
        <img
          src={Status === "Complete" ? show.img : edit.img}
          alt={Status === "Complete" ? show.name : edit.name}
          className="w-6 h-6"
          onClick={handleEditClick}
        />
      </div>

      {/* Table Format */}
      <div className="text-gray-700 font-medium text-sm">
        <div className="grid grid-cols-3 gap-1 border-b pb-1 text-center font-semibold">
          <p></p>
          <p className="border-r border-gray-400">V</p>
          <p>S</p>
        </div>
        <div className="grid grid-cols-3 gap-1 py-1 text-left">
          <p className="font-semibold">Name :</p>
          <div className="border-r border-gray-400">{Vname}</div>
          <p>{Sname}</p>
        </div>
        <div className="grid grid-cols-3 gap-1 py-1 text-left">
          <p className="font-semibold">Qty :</p>
          <div className="border-r border-gray-400">{TotalQty}</div>
          <p>{TotalQty}</p>
        </div>
        <div className="grid grid-cols-3 gap-1 py-1 text-left">
          <p className="font-semibold">Rate :</p>
          <div className="border-r border-gray-400 font-bold text-lg">
            {TotalVRate}
          </div>
          <p className="font-bold text-lg">{TotalSRate}</p>
        </div>
      </div>

      {/* Category & Other Info */}
      <div className="text-center mt-2 border-t pt-1">
        <p className="text-sm font-semibold uppercase">{Brand}</p>
      </div>
      <div className="text-center mt-1 text-sm">
        <span className="font-medium">Bill No :</span> {Billno}
      </div>
      <div className="text-center mt-1 text-sm text-gray-600">
        <span className="font-medium">Date :</span> {Date}
      </div>

      {/* Status Button */}
      <div className="mt-2">
        <button
          type="submit"
          onClick={handleChangeStatus}
          className={`w-full text-white py-2 rounded-md shadow-md font-medium 
          ${
            Status === "Draft"
              ? "bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              : ""
          }
          ${
            Status === "In Transite"
              ? "bg-red-500 hover:bg-red-600 cursor-pointer"
              : ""
          }
          ${Status === "Complete" ? "bg-green-600 cursor-default" : ""}`}
        >
          {Status}
        </button>
      </div>
    </div>
  );
}

export default SuadaCard;
