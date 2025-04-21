import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableField from "../MUIComponents/TableField";
import { MEMBERTABLEHEADINGDATA } from "../../utils/constants";
import axios from "axios";

function Members() {
  const navigate = useNavigate();
  const tableHeadingData = MEMBERTABLEHEADINGDATA;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://192.168.1.3:5000/getMembers");        
        const members = response.data.map((member) => ({
          ...member,
          type: "member",
        }));
        setTableData(members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <div className="flex flex-wrap items-center rounded-lg w-full gap-4 md:gap-6">
          {/* Add Member Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/members/addMember")}
              className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center cursor-pointer bg-[#15616D] text-white hover:bg-[#0E4A52] rounded-full text-2xl shadow-lg z-10"
            >
              +
            </button>
            <label className="text-gray-800 text-xl md:text-2xl font-semibold">
              Add Member
            </label>
          </div>

          {/* Search Input (Responsive & No Overflow) */}
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

export default Members;
