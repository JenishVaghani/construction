import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SuadaCard from "./SuadaCard";
import { useNavigate } from "react-router-dom";
import DropDownField from "../MUIComponents/DropDownField";
import DateField from "../MUIComponents/DateField";
import { useSelector } from "react-redux";
import { FILTER, DOWNLOAD } from "../../utils/constants";
import { Controller, useForm } from "react-hook-form";

function Dashboard({ isSidebarOpen }) {
  const brands = useSelector((state) => state.users.brands);
  const brandOptions = [
    { label: "All", value: "all" }, // Default option
    ...brands.map((brand) => ({
      label: brand.name,
      value: brand.id,
      search: ""
    })),
  ];

  const { register, control, getValues, watch, setValue } = useForm({
    defaultValues: {
      brandFilter: "all",
      startDate: null,
      endDate: null,
    },
  });

  console.log("check filter", watch("brandFilter"));
  
  const navigate = useNavigate();
  const filter = FILTER;
  const download = DOWNLOAD;
  const suadas = useSelector((state) => state.users.suadas);
  const [isFilterModal, setIsFilterModal] = useState(false);

  useEffect(() => {
    if (isFilterModal) {
      setIsFilterModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen]);

  // Filter logic
  const filteredSuadas = suadas.filter((item) => {
    const selectedBrand = watch("brandFilter");
    const startDate = getValues("startDate");
    const endDate = getValues("endDate");
    const itemDate = item.date;
    const searchQuery = watch("search")?.toLowerCase() || "";
    const isWithinDateRange =
      !startDate || !endDate || (itemDate >= startDate && itemDate <= endDate);

    const isMatchingBrand =
    
    selectedBrand === "all" ||
      item.brandName.value === watch("brandFilter");

      const isMatchingSearch =
      searchQuery === "" ||
      item.vendorName.label.toLowerCase().includes(searchQuery) ||
      item.sellerName.label.toLowerCase().includes(searchQuery) ||
      item.billNo.toLowerCase().includes(searchQuery);

    return isMatchingBrand && isWithinDateRange && isMatchingSearch;
  });

  // Handle Apply Filter
  const handleApplyFilter = () => {
    const mobileInStartDate = getValues("startDate");
    const mobileInEndDate = getValues("endDate");
    console.log("mobileInStartDate", mobileInStartDate);
    console.log("mobileInEndDate", mobileInEndDate);

    setIsFilterModal(false); // Close modal
  };  
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="p-4 ">
          <div className="hidden lg:block">
            <div className="flex items-center gap-2">
              {/* Filter */}
              <div className="flex items-center space-x-2">
                <label className="text-lg font-medium">Filter:</label>
                <DropDownField
                  options={brandOptions}
                  title="Brands"
                  value={watch("brandFilter")}
                  {...register("brandFilter")}
                  onChange={(e) => setValue("brandFilter", e)}
                />
              </div>

              {/* Datepicker */}
              <div className="flex space-x-2">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DateField
                      label="Start-Date"
                      date={field.onChange}
                      value={watch("startDate")}
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DateField
                      label="End-Date"
                      date={field.onChange}
                      value={watch("endDate")}
                    />
                  )}
                />
              </div>

              {/* Search - Takes Full Width in Between */}
              <div className="flex-grow flex items-center space-x-2 ">
                <label className="flex items-center border border-gray-300 px-3 py-2 bg-white rounded-lg w-52 lg:w-42 2xl:w-52 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-800">
                  <FaSearch className="text-gray-500 mr-1 text-sm" />
                  <input
                    type="text"
                    placeholder="Search..."
                    {...register("search")}
                    className="w-full outline-none text-sm text-gray-700 focus:ring-0"
                  />
                </label>
              </div>

              {/* Download PDF Button - Stays on the Right */}
              <button className="bg-[#15616D] text-white px-3 py-2 text-sm rounded-md hover:bg-[#0E4A52] cursor-pointer">
                Download PDF
              </button>
            </div>
          </div>

          {/* Mobile screen in show filter */}
          <div className="block lg:hidden">
            {!isFilterModal && (
              <div className="flex justify-between">
                <img
                  src={filter.img}
                  alt={filter.name}
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setIsFilterModal(true)}
                />
                <img
                  src={download.img}
                  alt={download.name}
                  className="w-8 h-8 cursor-pointer"
                />
              </div>
            )}

            {isFilterModal && (
              <div className="fixed inset-0 top-16 bg-gray-100 z-50 flex flex-col p-4 space-y-4 overflow-auto">
                {/* Dropdown */}
                <DropDownField
                  options={brandOptions}
                  title="Brands"
                  value={watch("brandFilter")}
                  {...register("brandFilter")}
                  onChange={(e) => setValue("brandFilter", e)}
                />

                {/* Date Picker */}
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <DateField
                      label="Start-Date"
                      date={field.onChange}
                      value={watch("startDate")}
                    />
                  )}
                />

                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <DateField
                      label="End-Date"
                      date={field.onChange}
                      value={watch("endDate")}
                    />
                  )}
                />

                {/* Search Field */}
                <div className="flex flex-col space-y-2">
                  <label className="flex w-62 items-center border border-gray-300 px-3 py-2 bg-white rounded-lg focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-800">
                    <FaSearch className="text-gray-500 mr-2 text-sm" />
                    <input
                      type="text"
                      placeholder="Search..."
                      {...register("search")}
                      className=" outline-none text-sm text-gray-700 focus:ring-0"
                    />
                  </label>
                </div>
                <div className="fixed bottom-4 left-0 right-0  p-4 flex justify-between sm:justify-center gap-2">
                  <button
                    className="w-full sm:w-62 bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
                    onClick={() => setIsFilterModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleApplyFilter}
                    className="w-full sm:w-62 bg-[#15616D] text-white px-4 py-2 rounded-md hover:bg-[#0E4A52] cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 mt-4 rounded-lg">
            <button
              onClick={() => navigate("/dashboard/addSuada")}
              className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center cursor-pointer bg-[#15616D] text-white hover:bg-[#0E4A52] rounded-full text-2xl shadow-lg z-10"
            >
              +
            </button>

            <label className="text-gray-800 text-2xl font-semibold">
              Suada
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredSuadas.length > 0 ? (
              filteredSuadas.map((item, index) => (
                <SuadaCard
                  key={index}
                  id={item.id}
                  Vname={item.vendorName.label}
                  Sname={item.sellerName.label}
                  TotalQty={item.totalQty}
                  TotalVRate={item.totalVendorRate}
                  TotalSRate={item.totalSellerRate}
                  Billno={item.billNo}
                  Brand={item.brandName.label}
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
      </div>
    </>
  );
}

export default Dashboard;
