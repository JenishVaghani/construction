import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BRANDTABLEHEADINGDATA } from "../../utils/constants";
import { FaSearch } from "react-icons/fa";
import TableField from "../MUIComponents/TableField";
import axios from "axios";

function Brands() {
  const navigate = useNavigate();
  const tableHeadingData = BRANDTABLEHEADINGDATA;
  const [tableData, setTableData] = useState([]);

  // fetchBrands API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://192.168.1.3:5000/getBrands");
        const brands = response.data.map((brand) => ({
          ...brand,
          type: "brand",
        }));

        setTableData(brands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        {/* Flex Container for Add Member & Search */}
        <div className="flex flex-wrap items-center rounded-lg w-full gap-4 md:gap-6">
          {/* Add Member Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/brands/addBrand")}
              className="sm:static fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center cursor-pointer bg-[#15616D] text-white hover:bg-[#0E4A52] rounded-full text-2xl shadow-lg z-10"
            >
              +
            </button>
            <label className="text-gray-800 text-xl md:text-2xl font-semibold">
              Add Brand
            </label>
          </div>

          {/* Search Input (Takes Remaining Space) */}
          <div className="flex-grow">
            <label className="flex items-center border border-gray-300 px-3 py-2 bg-white rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-800 w-full max-w-62 sm:max-w-80 md:max-w-96">
              <FaSearch className="text-gray-500 mr-2 text-sm" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none text-sm text-gray-700 focus:ring-0"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="pt-4 w-full">
            <TableField
              tableHeadingData={tableHeadingData}
              tableData={tableData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Brands;
