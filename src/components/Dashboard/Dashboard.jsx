import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SuadaCard from "./SuadaCard";
import { useNavigate } from "react-router-dom";
import DropDownField from "../MUIComponents/DropDownField";
import DateField from "../MUIComponents/DateField";
import { FILTER, DOWNLOAD } from "../../utils/constants";
import { Controller, useForm } from "react-hook-form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

function Dashboard({ isSidebarOpen }) {
  const [suadas, setSuadas] = useState([]);
  const brandOptions = [
    { label: "All", value: "all" },
    ...Array.from(
      new Map(suadas.map((suada) => [suada.brandid, suada])).values()
    ).map((suada) => ({
      value: suada.brandid,
      label: suada.brandName,
      search: "",
    })),
  ];

  const { register, control, getValues, watch, setValue } = useForm({
    defaultValues: {
      brandFilter: "all",
      startDate: null,
      endDate: null,
    },
  });

  const navigate = useNavigate();
  const filter = FILTER;
  const download = DOWNLOAD;

  // fetchSuadas API
  const fetchSuadas = async () => {
    try {
      const response = await axios.get("http://192.168.1.3:5000/getSuadas");
      setSuadas(response.data.Data);
    } catch (error) {
      console.error("Error fetching suadas:", error);
    }
  };
  useEffect(() => {
    fetchSuadas();
  }, []);
  const [isFilterModal, setIsFilterModal] = useState(false);

  useEffect(() => {
    if (isFilterModal) {
      setIsFilterModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen]);

  // Filter logic
  const filteredSuadas = suadas
    .filter((item) => {
      const selectedBrand = watch("brandFilter");
      const startDate = getValues("startDate");
      const endDate = getValues("endDate");
      const itemDate = item.date;
      const searchQuery = watch("search")?.toLowerCase() || "";
      const isWithinDateRange =
        !startDate ||
        !endDate ||
        (itemDate >= startDate && itemDate <= endDate);

      const isMatchingBrand =
        selectedBrand === "all" || item.brandid === watch("brandFilter");

      const isMatchingSearch =
        searchQuery === "" ||
        item.vendorName.toLowerCase().includes(searchQuery) ||
        item.sellerName.toLowerCase().includes(searchQuery) ||
        item.billNo.toLowerCase().includes(searchQuery);

      return isMatchingBrand && isWithinDateRange && isMatchingSearch;
    })
    .sort((a, b) => a.index_id - b.index_id);

  // Handle Apply Filter
  const handleApplyFilter = () => {
    setIsFilterModal(false);
  };

  const handleCancleFilter = () => {
    setValue("brandFilter", "all");
    setValue("startDate", null);
    setValue("endDate", null);
    setIsFilterModal(false);
  };

  const handleDownloadPDF = () => {
    if (filteredSuadas.length === 0) {
      alert("No data available for download!");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape", // લૅન્ડસ્કેપ મોડ માટે
      unit: "mm",
      format: "a4",
    });
    const user = localStorage.getItem("user");
    doc.text(`${user}(Suada Report)`, 10, 12);

    const tableColumn = [
      "Index",
      "ID",
      "Vendor Name",
      "Seller Name",
      "Total Qty",
      "Vendor Amount",
      "Seller Amount",
      "Bill No",
      "Brand",
      "Date",
      "Status",
    ];

    const tableRows = [];
    filteredSuadas.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.id,
        item.vendorName,
        item.sellerName,
        item.totalQty,
        item.totalVendorAmount,
        item.totalSellerAmount,
        item.billNo,
        item.brandName,
        item.date,
        item.status,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: "grid",
      margin: { top: 10, left: 5, right: 5, bottom: 10 }, // Reduce margins
      styles: {
        fontSize: 8, // Reduce font size
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [21, 97, 109],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 25 },
        7: { cellWidth: 20 },
        8: { cellWidth: 20 },
        9: { cellWidth: "wrap" }, // Auto-wrap text
        10: { cellWidth: "wrap" },
      },
    });

    doc.save("Suada_Report.pdf");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="p-4 ">
          <div className="hidden lg:block">
            <div className="flex lg:flex-wrap items-center gap-2">
              {/* Filter brand */}
              <div className="flex items-center space-x-2">
                <label className="text-lg font-medium">Filter:</label>
                <DropDownField
                  options={brandOptions}
                  title="Brands"
                  value={watch("brandFilter")}
                  {...register("brandFilter")}
                  onChange={(e) => setValue("brandFilter", e)}
                  myStyle="lg:w-50"
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
                      myStyle="lg:w-50"
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
                      myStyle="lg:w-50"
                    />
                  )}
                />
              </div>

              {/* Search - Takes Full Width in Between */}
              <div className="flex-grow flex items-center space-x-2 ">
                <label className="flex items-center border border-gray-300 px-3 py-2 bg-white rounded-lg w-48 lg:w-38 2xl:w-52 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 hover:border-gray-800">
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
              <button
                onClick={handleDownloadPDF}
                className="flex bg-[#15616D] text-white px-3 py-2 text-sm rounded-md hover:bg-[#0E4A52] cursor-pointer"
              >
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
                  onClick={handleDownloadPDF}
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

                {/* Date Picker start-date */}
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

                {/* Date Picker end-date */}
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
                  {/* Cancel button */}
                  <button
                    className="w-full sm:w-62 bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
                    onClick={handleCancleFilter}
                  >
                    Cancel
                  </button>

                  {/* Apply button */}
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

          {/* Add suada button (+) */}
          <div className="flex items-center space-x-3 mt-4 rounded-lg">
            <button
              onClick={() => navigate("/dashboard/addSuada")}
              className="sm:static fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center cursor-pointer bg-[#15616D] text-white hover:bg-[#0E4A52] rounded-full text-2xl shadow-lg z-10"
            >
              +
            </button>

            <label className="text-gray-800 text-2xl font-semibold">
              Suada
            </label>
          </div>

          {/* SuadaCard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredSuadas.length > 0 ? (
              filteredSuadas.map((item, index) => (
                <SuadaCard
                  key={index}
                  id={item.id}
                  Vname={item.vendorName}
                  Sname={item.sellerName}
                  TotalQty={item.totalQty}
                  TotalVRate={item.totalVendorAmount}
                  TotalSRate={item.totalSellerAmount}
                  Billno={item.billNo}
                  Brand={item.brandName}
                  Date={item.date}
                  Status={item.status}
                  onStatusChange={fetchSuadas}
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
