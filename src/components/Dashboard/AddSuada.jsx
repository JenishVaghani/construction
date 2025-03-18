import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import DropDownField from "../MUIComponents/DropDownField";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import StealInput from "./StealInput";
import CementInput from "./CementInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DateField from "../MUIComponents/DateField";
import { addSuadas } from "../Redux/UserSlice";

function AddSuada() {
  const vendersData = useSelector((state) => state.users.vendors);
  const sellersData = useSelector((state) => state.users.sellers);
  const brandsData = useSelector((state) => state.users.brands);
  const [suadaVendorName, setSaudaVendorName] = useState("");
  const [suadaSellerName, setSuadaSellerName] = useState("");
  const [suadaBrandName, setSuadaBrandName] = useState("");
  const [suadaDate, setSuadaDate] = useState();
  const [suadaBillNo, setSuadaBillNo] = useState("");
  const [suadaSizes, setSuadaSizes] = useState([]);
  const [getSuadaInputData, setGetSuadaInputData] = useState({});
  const dispatch = useDispatch();

  const selectedBrand =
    brandsData.find((brand) => brand.name === suadaBrandName) ?? null;
  const sizesData = selectedBrand
    ? selectedBrand.size.map((size) => ({ name: size, value: size }))
    : [];

  const addSuadaPath = [
    <Link underline="hover" key="1" color="inherit" to="/dashboard">
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
              Array.isArray(getSuadaInputData[size][field]) &&
              getSuadaInputData[size][field].length > 0 &&
              getSuadaInputData[size][field].every(
                (value) => value?.toString().trim() !== ""
              )
          )
      )
    ) {
      console.log(storeSuadaData);
      dispatch(addSuadas(storeSuadaData));
    } else {
      console.log("Check Alert = ", {suadaVendorName:suadaVendorName, suadaSellerName:suadaSellerName, suadaBrandName:suadaBrandName, suadaSizes:suadaSizes, suadaDate:suadaDate, suadaBillNo:suadaBillNo, getSuadaInputData:getSuadaInputData});
      
      alert("All fields are required!");
    }
  };

  return (
    <div className="h-full ml-56 mt-16">
      <div className="p-2">
        <h1 className="text-2xl font-bold pt-4 pl-8">Add Suada</h1>

        <div className="mt-6 ml-4 border border-black p-2 w-fit rounded-xl">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {addSuadaPath}
          </Breadcrumbs>
        </div>
        <div className="pl-16 pt-6">
          {/* Vendor & Date Row */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <DropDownField
                items={vendersData}
                title="Vender"
                onChange={setSaudaVendorName}
              />
            </div>
            <div className="ml-8">
              <DateField setSuadaDate={setSuadaDate} />
            </div>
          </div>

          {/* Seller Dropdown */}
          <div className="flex items-center mb-4">
            <DropDownField
              items={sellersData}
              title="Seller"
              onChange={setSuadaSellerName}
            />
          </div>

          {/* Brand Dropdown */}
          <div className="flex items-center mb-4">
            <DropDownField
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
            <h3 className="pl-12 text-red-500 font-bold">
              Please select a brand
            </h3>
          ) : selectedBrand.category === "Steal" ? (
            <StealInput
              selectedSizes={suadaSizes}
              setSuadaBillNo={setSuadaBillNo}
              setGetSuadaInputData={setGetSuadaInputData}
            />
          ) : (
            <CementInput
              selectedSizes={suadaSizes}
              setSuadaBillNo={setSuadaBillNo}
              setGetSuadaInputData={setGetSuadaInputData}
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
