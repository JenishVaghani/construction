import React, { useState, useEffect } from "react";
import DropDownField from "../MUIComponents/DropDownField";
import {
  BRANDCATEGORYS,
  CEMENTSIZESNAME,
  STEALSIZESNAME
} from "../../utils/constants";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import { Breadcrumbs, Typography } from "@mui/material";
import InputField from "../MUIComponents/InputField";
import { useDispatch, useSelector } from "react-redux";
import { addBrands, updateBrand } from "../Redux/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddBrand() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);

  const brands = useSelector((state) => state.users.brands);
  const brandToEdit = isEditMode
    ? brands.find((brand) => brand.id === id)
    : null;

  const brandCategories = BRANDCATEGORYS;
  const availableSizes =
    selectedCategory === "Cement" ? CEMENTSIZESNAME : STEALSIZESNAME;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      category: ""
    }
  });

  useEffect(() => {
    if (isEditMode && brandToEdit) {
      setValue("name", brandToEdit.name);
      setSelectedCategory(brandToEdit.category);
      setSelectedSizes(brandToEdit.size);
    }
  }, [isEditMode, brandToEdit, setValue]);

  const breadcrumbItems = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/brands"
      className="hover:underline"
    >
      Brands
    </Link>,
    <Typography key="2" sx={{ color: "text.primary" }}>
      {isEditMode ? "Edit Brand" : "Add Brand"}
    </Typography>
  ];

  const onSubmit = (data) => {
    const brandData = {
      ...data,
      category: selectedCategory,
      size: selectedSizes,
      type: "brand"
    };

    if (isEditMode) {
      dispatch(updateBrand({ id, updatedData: brandData }));
    } else {
      dispatch(addBrands(brandData));
    }

    navigate("/brands");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSizes([]);
  };

  return (
    <div className="min-h-screen ml-56 mt-16">
      <div className="p-4">
        <div className="w-fit rounded-xl bg-gray-300 p-3">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbItems}
          </Breadcrumbs>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center mb-4">
              <InputField
                label="Name"
                type="text"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", {
                  required: "Brand name is required"
                })}
              />
            </div>
            <div className="flex items-center mb-4">
              <DropDownField
                value={selectedCategory}
                items={brandCategories}
                title="Category"
                onChange={handleCategoryChange}
                error={!selectedCategory}
                helperText={!selectedCategory ? "Category is required" : ""}
              />
            </div>
            <div className="flex items-center mb-4">
              <MultiSelectDropDownField
                items={availableSizes}
                title="Size"
                onChange={setSelectedSizes}
                value={selectedSizes}
                error={selectedSizes.length === 0}
                helperText={
                  selectedSizes.length === 0
                    ? "At least one size is required"
                    : ""
                }
              />
            </div>
            <div className="flex items-center mb-4 pl-12">
              <button
                type="submit"
                className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                disabled={!selectedCategory || selectedSizes.length === 0}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBrand;