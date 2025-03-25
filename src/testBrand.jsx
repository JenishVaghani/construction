import React from 'react'
import { useNavigate } from 'react-router-dom'
import {  BRANDTABLEHEADINGDATA } from '../../utils/constants'
import { FaSearch } from 'react-icons/fa';
import TableField from '../MUIComponents/TableField';
import { useSelector } from 'react-redux';

function Brands() {
  const navigate = useNavigate()
  const brands = useSelector((state) => state.users.brands)
  const tableData = brands;
  const tableHeadingData = BRANDTABLEHEADINGDATA
  
  return (  
    <div className="min-h-screen ml-56 mt-16 bg-gray-100">
          <div className="p-4">
            {/ Flex Container for Add Member & Search /}
            <div className="flex items-center rounded-lg space-x-4 w-full">
              {/ Add Member Button /}
              <div className="flex items-center space-x-3">
                <button onClick={() => navigate("/brands/addBrand")} className="w-12 h-12 flex items-center justify-center cursor-pointer bg-blue-600 text-white hover:bg-blue-700 rounded-full text-2xl">
                  +
                </button>
                <label className="text-gray-800 text-2xl font-semibold">Add Brand</label>
              </div>
    
              {/ Search Input (Takes Remaining Space) /}
              <label className="flex items-center border border-gray-300 px-3 py-2 bg-white rounded-lg flex-grow focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-800 mr-20">
                <FaSearch className="text-gray-500 mr-2 text-sm" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full outline-none text-sm text-gray-700 focus:ring-0"
                />
              </label>
            </div>
    
            <div className="flex justify-center">
              <div className="pt-4 w-full">
                <TableField tableHeadingData={tableHeadingData} tableData={tableData} />
              </div>
            </div>
          </div>
        </div>
  )
}

export default Brands