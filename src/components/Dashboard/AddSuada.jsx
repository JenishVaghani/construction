import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import DropDownField from "../MUIComponents/DropDownField";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import StealInput from "./StealInput";
import CementInput from "./CementInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DateField from "../MUIComponents/DateField";
import { addSuadas } from "../Redux/UserSlice";
//UUID

function AddSuada() {
  const vendersData = useSelector((state) => state.users.vendors);
  const sellersData = useSelector((state) => state.users.sellers);
  const brandsData = useSelector((state) => state.users.brands);
  const suadasData = useSelector((state) => {
    if (!state || !state.users || !state.users.suadas) {
      return [];
    }
    return state.users.suadas;
  });
  const { index } = useParams();
  const editData = suadasData[index];
  const [suadaVendorName, setSaudaVendorName] = useState("");
  const [suadaSellerName, setSuadaSellerName] = useState("");
  const [suadaBrandName, setSuadaBrandName] = useState("");
  const [suadaDate, setSuadaDate] = useState();
  const [suadaBillNo, setSuadaBillNo] = useState("");
  const [suadaSizes, setSuadaSizes] = useState([]);
  const [getSuadaInputData, setGetSuadaInputData] = useState({});
  const [getSuadaTotalQty, setGetSuadaTotalQty] = useState(0);
  const [getTotalVendorRate, setGetTotalVendorRate] = useState(0);
  const [getTotalSellerRate, setGetTotalSellerRate] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedBrand =
    brandsData.find((brand) => brand.name === suadaBrandName) ?? null;
  const sizesData = selectedBrand
    ? selectedBrand.size.map((size) => ({ name: size, value: size }))
    : [];

  const addSuadaPath = [
    <Link underline="hover" key="1" color="inherit" to="/dashboard" className="hover:underline">
      Dashboard
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      AddSuada
    </Typography>,
  ];

  const storeSuadaData = {
    vendorName: suadaVendorName,
    sellerName: suadaSellerName,
    brandName: suadaBrandName,
    sizes: getSuadaInputData,
    date: suadaDate,
    billNo: suadaBillNo,
    type: "suada",
    totalQty: getSuadaTotalQty,
    vendorRate: getTotalVendorRate * getSuadaTotalQty,
    sellerRate: getTotalSellerRate * getSuadaTotalQty,
  };

  const handleAddSuada = () => {
    if (
      suadaVendorName &&
      suadaSellerName &&
      suadaBrandName &&
      suadaSizes.length > 0 &&
      suadaDate &&
      suadaBillNo &&
      getSuadaInputData &&
      Object.keys(getSuadaInputData).length > 0 &&
      suadaSizes.every(
        (size) =>
          getSuadaInputData[size] &&
          Object.keys(getSuadaInputData[size]).length > 0 &&
          ["vendorRate", "sellerRate", "qty", "moneyType"].every(
            (field) =>
              getSuadaInputData[size][field] &&
              getSuadaInputData[size][field].toString().trim() !== ""
          )
      )
    ) {
      console.log("storeSuadaData = ", storeSuadaData);
      dispatch(addSuadas(storeSuadaData));
      navigate("/dashboard");
    } else {
      console.log("Check Alert = ", {
        suadaVendorName,
        suadaSellerName,
        suadaBrandName,
        suadaSizes,
        suadaDate,
        suadaBillNo,
        getSuadaInputData,
      });

      alert("All fields are required!");
    }
  };

  return (
    <div className="min-h-screen ml-56 mt-16 bg-gray-100">
      <div className="p-4">
        <div className="w-fit rounded-md bg-gray-300 p-3">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {addSuadaPath}
          </Breadcrumbs>
        </div>
        <div className="mt-4">
          {/* Vendor & Date Row */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <DropDownField
                value={editData ? editData.vendorName : ""}
                items={vendersData}
                title="Vender"
                onChange={setSaudaVendorName}
              />
            </div>
            <div className="ml-8">
              <DateField
                setSuadaDate={setSuadaDate}
                value={editData ? editData.date : ""}
              />
            </div>
          </div>

          {/* Seller Dropdown */}
          <div className="flex items-center mb-4">
            <DropDownField
              value={editData ? editData.sellerName : ""}
              items={sellersData}
              title="Seller"
              onChange={setSuadaSellerName}
            />
          </div>

          {/* Brand Dropdown */}
          <div className="flex items-center mb-4">
            <DropDownField
              value={editData ? editData.brandName : ""}
              items={brandsData}
              title="Brand"
              onChange={setSuadaBrandName}
            />
          </div>

          {/* Size Dropdown */}
          <div className="flex items-center mb-4">
            <MultiSelectDropDownField
              items={sizesData}
              title="Size"
              onChange={setSuadaSizes}
            />
          </div>
        </div>

        <div>
          {!selectedBrand ? (
            <h3 className="text-red-500 font-bold">
              Please select a brand
            </h3>
          ) : selectedBrand.category === "Steal" ? (
            <StealInput
              selectedSizes={suadaSizes}
              setSuadaBillNo={setSuadaBillNo}
              setGetSuadaTotalQty={setGetSuadaTotalQty}
              setGetSuadaInputData={setGetSuadaInputData}
              setGetTotalVendorRate={setGetTotalVendorRate}
              setGetTotalSellerRate={setGetTotalSellerRate}
            />
          ) : (
            <CementInput
              selectedSizes={suadaSizes}
              setSuadaBillNo={setSuadaBillNo}
              setGetSuadaTotalQty={setGetSuadaTotalQty}
              setGetSuadaInputData={setGetSuadaInputData}
              setGetTotalVendorRate={setGetTotalVendorRate}
              setGetTotalSellerRate={setGetTotalSellerRate}
            />
          )}
        </div>

        {/* Save Button Centered */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddSuada}
            className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddSuada;
