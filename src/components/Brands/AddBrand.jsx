import React from "react";
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
import { useForm } from "react-hook-form";

function AddBrand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = BRANDCATEGORYS;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const brandCategory = watch("brandCategory");

  const sizes =
    brandCategory === "Cement"
      ? CEMENTSIZESNAME
      : brandCategory === "Steal"
      ? STEALSIZESNAME
      : [];

  const showAddBrandUrl = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/brands"
      className="hover:underline"
    >
      Brands
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      addBrand
    </Typography>,
  ];

  const onSubmit = (data) => {
    const storeBrandData = {
      brandName: data.brandName,
      brandCategory: data.brandCategory,
      brandSizes: data.brandSizes,
      type: "brand",
    };
    dispatch(addBrands(storeBrandData));
    navigate("/brands");
  };

  return (
    <div className="min-h-screen ml-56 mt-16">
      <div className="p-4">
        <div className="w-fit rounded-xl bg-gray-300 p-3">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {showAddBrandUrl}
          </Breadcrumbs>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div className="mb-4">
              <InputField
                label="Name"
                type="text"
                {...register("brandName", {
                  required: "Brand Name is required",
                })}
              />
              {errors.brandName && (
                <p className="text-red-500">{errors.brandName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <DropDownField
                items={brands}
                title="Category"
                {...register("brandCategory", {
                  required: "Category is required",
                })}
                onChange={(e) => setValue("brandCategory", e)}
              />
              {errors.brandCategory && (
                <p className="text-red-500">{errors.brandCategory.message}</p>
              )}
            </div>
            <div className="mb-4">
              <MultiSelectDropDownField
                items={sizes}
                title="Size"
                {...register("brandSizes", {
                  required: "At least one size is required",
                })}
                onChange={(value) => setValue("brandSizes", value)}
              />
              {errors.brandSizes && (
                <p className="text-red-500">{errors.brandSizes.message}</p>
              )}
            </div>
            <div className="flex items-center mb-4 pl-12">
              <button
                type="submit"
                className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBrand;
