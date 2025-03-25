import React, { useEffect } from "react";
import DropDownField from "../MUIComponents/DropDownField";
import {
  BRANDCATEGORYS,
  CEMENTSIZESNAME,
  STEALSIZESNAME,
} from "../../utils/constants";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import { Breadcrumbs, Typography } from "@mui/material";
import InputField from "../MUIComponents/InputField";
import { useDispatch, useSelector } from "react-redux";
import { addBrands, updateBrand } from "../Redux/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function AddBrand() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brandName: "",
      brandCategory: [],
      brandSizes: [],
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brandCategorys = BRANDCATEGORYS;
  const cementSizes = CEMENTSIZESNAME;
  const stealSizes = STEALSIZESNAME;
  const { id } = useParams();
  const isEditMode = !!id;

  const brands = useSelector((state) => state.users.brands);

  const brandToEdit = isEditMode
    ? brands.find((brand) => brand.id === id)
    : null;

  useEffect(() => {
    if (isEditMode && brandToEdit) {
      setValue("brandName", brandToEdit.name);
      setValue("brandCategory", brandToEdit.category);
      setValue("brandSizes", brandToEdit.sizes);
    }
  }, [isEditMode, brandToEdit, setValue]);

  const brandCategory = watch("brandCategory");

  const sizes =
    brandCategory?.value === "01b31a99-2422-4ee3-ac6c-a63934aecd53"
      ? cementSizes
      : brandCategory?.value === "8b64b5f2-7f1a-4e47-b00a-18ff1126e6fb"
      ? stealSizes
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
      {isEditMode ? "Edit Brand" : "Add brand"}
    </Typography>,
  ];

  const handleCategorySelect = (e) => {
    const selectedCategory = brandCategorys.find((cat) => cat.value === e);

    if (selectedCategory) {
      setValue("brandCategory", {
        label: selectedCategory.label,
        value: selectedCategory.value,
      });
    } else {
      setValue("brandCategory", { label: "", value: "" });
    }
  };

  const handleSizesSelect = (e) => {
    const brandCategory = watch("brandCategory");
    let availableSizes = [];

    if (brandCategory?.value === "01b31a99-2422-4ee3-ac6c-a63934aecd53") {
      availableSizes = CEMENTSIZESNAME;
    } else if (
      brandCategory?.value === "8b64b5f2-7f1a-4e47-b00a-18ff1126e6fb"
    ) {
      availableSizes = STEALSIZESNAME;
    }

    const selectedSizes = availableSizes.filter((size) =>
      e.includes(size.value)
    );

    setValue("brandSizes", selectedSizes);
  };

  const onSubmit = (data) => {
    const storeBrandData = {
      id: isEditMode ? id : uuidv4(),
      type: "brand",
      name: data.brandName,
      category: data.brandCategory,
      sizes: data.brandSizes,
    };

    if (isEditMode) {
      dispatch(updateBrand(storeBrandData));
    } else {
      dispatch(addBrands(storeBrandData));
    }

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
                options={brandCategorys}
                //me je select ma value set kari 6e te value math thavi pade so .value use karu 6e baki value j difference ha se to select work j nathi karvanu......
                value={watch("brandCategory")?.value || ""}
                title="Category"
                {...register("brandCategory", {
                  required: "Category is required",
                })}
                onChange={handleCategorySelect}
              />
              {errors.brandCategory && (
                <p className="text-red-500">{errors.brandCategory.message}</p>
              )}
            </div>
            <div className="mb-4">
              <MultiSelectDropDownField
                options={sizes}
                value={watch("brandSizes") || []}
                title="Size"
                {...register("brandSizes", {
                  required: "At least one size is required",
                })}
                onChange={handleSizesSelect}
              />
              {errors.brandSizes && (
                <p className="text-red-500">{errors.brandSizes.message}</p>
              )}
            </div>
            <div className="flex items-center mb-4 pl-12">
              <button
                type="submit"
                className="px-10 py-2 bg-[#15616D] text-white rounded-xl hover:bg-[#0E4A52] cursor-pointer"
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBrand;
