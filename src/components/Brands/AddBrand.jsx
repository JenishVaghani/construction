import React, { useState } from "react";
import DropDownField from "../MUIComponents/DropDownField";
import {
  BRANDCATEGORYS,
  CEMENTSIZESNAME,
  STEALSIZESNAME,
} from "../../utils/constants";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import { Breadcrumbs, Typography } from "@mui/material";
import InputField from "../MUIComponents/InputField";
import { useDispatch } from "react-redux";
import { addBrands } from "../Redux/UserSlice";
import { Link, useNavigate } from "react-router-dom";

function AddBrand() {
  const [brandName, setBrandName] = useState("");
  const [brandCategory, setBrandCategory] = useState("");
  const [brandSizes, setBrandSizes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = BRANDCATEGORYS;
  const sizes = brandCategory === "Cement" ? CEMENTSIZESNAME : STEALSIZESNAME;
  const showAddBrandUrl = [
    <Link underline="hover" key="1" color="inherit" to="/brands">
      Brands
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      addBrand
    </Typography>,
  ];

  const storeBrandData = {
    name: brandName,
    category: brandCategory,
    size: brandSizes,
    type: "brand",
  };

  const hanleAddBrand = () => {
    if (brandName && brandCategory && brandSizes.length > 0) {
      dispatch(addBrands(storeBrandData));
      setBrandName("");
      setBrandCategory("");
      setBrandSizes([]);
      navigate("/brands");
    } else {
      alert("All fields are required!");
    }
  };

  return (
    <div className="h-full ml-56 mt-16">
      <div className="p-2">
        <h1 className="text-2xl font-bold pt-4 pl-8">Add Brand</h1>

        <div className="mt-6 ml-4 border border-black p-2 w-fit rounded-xl">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {showAddBrandUrl}
          </Breadcrumbs>
        </div>

        <div className="pl-16 pt-6">
          <div className="flex items-center mb-4">
            <InputField
              label="Name"
              type="text"
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <DropDownField
              items={brands}
              title="Category"
              onChange={setBrandCategory}
            />
          </div>
          <div className="flex items-center mb-4">
            <MultiSelectDropDownField
              items={sizes}
              title="Size"
              onChange={setBrandSizes}
            />
          </div>
          <div className="flex items-center mb-4 pl-12">
            <button
              onClick={hanleAddBrand}
              className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBrand;
