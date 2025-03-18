import React from "react";
import { FaSearch } from "react-icons/fa";
import SuadaCard from "./SuadaCard";
import { useNavigate } from "react-router-dom";
import DropDownField from "../MUIComponents/DropDownField";
import DateField from "../MUIComponents/DateField";
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const brands = useSelector((state) => state.users.brands);
  const suadas = useSelector((state) => state.users.suadas);

  console.log("suadas = ", suadas);

  return (
    <>
      <div className="h-full ml-56 mt-16">
        <div className="p-2 flex items-center gap-2 w-full">
          {/* Filter */}
          <div className="flex items-center space-x-2">
            <label className="text-lg font-medium">Filter:</label>
            <DropDownField items={brands} title="Brands" />
          </div>

          {/* Datepicker */}
          <div className="w-[200px]">
            <DateField />
          </div>

          {/* Search - Takes Full Width in Between */}
          <div className="flex-grow flex items-center space-x-1">
            <label className="flex items-center border border-gray-300 px-3 py-2 bg-white rounded-lg w-full focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-800">
              <FaSearch className="text-gray-500 mr-1 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none text-sm text-gray-700 focus:ring-0"
              />
            </label>

            <button className="bg-gray-500 text-white px-3 py-2 text-sm rounded-md hover:bg-gray-600 cursor-pointer">
              Search
            </button>
          </div>

          {/* Download PDF Button - Stays on the Right */}
          <button className="bg-blue-500 text-white px-3 py-2 ml-4 text-sm rounded-md hover:bg-blue-600 cursor-pointer">
            Download PDF
          </button>
        </div>

        <div className="flex items-center space-x-3 mt-4 ml-6 rounded-lg">
          <button
            onClick={() => navigate("/dashboard/addSuada")}
            className="w-12 h-12 flex items-center justify-center cursor-pointer bg-blue-600 text-white hover:bg-blue-700 rounded-full text-2xl"
          >
            +
          </button>
          <label className="text-gray-800 text-2xl font-semibold">Suada</label>
        </div>

        <div className="grid md:grid-cols-3 2xl:grid-cols-5 gap-4">
          {suadas.length > 0 ? (
            suadas.map((item, index) => (
              <SuadaCard
                key={index}
                Vname={item.vendorName}
                Sname={item.sellerName}
                VQty={item.totalQty}
                SQty={item.totalQty}
                VRate={item.vendorRate}
                SRate={item.sellerRate}
                VBillno={item.billNo}
                SBillno={item.billNo}
                Brand={item.brandName}
                Date={item.date}
                Status="Draft"
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg font-semibold">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
