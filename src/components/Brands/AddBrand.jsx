import React, { useEffect, useState } from "react";
import DropDownField from "../MUIComponents/DropDownField";
import {
  BRANDCATEGORYS,
  CEMENTSIZESNAME,
  STEALSIZESNAME,
} from "../../utils/constants";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import { Breadcrumbs, Typography } from "@mui/material";
import InputField from "../MUIComponents/InputField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Loading from "../Loading/Loading";

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
  const [getBrands, setGetBrands] = useState();
  const [responseMessage, setResponseMessage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const brandCategorys = BRANDCATEGORYS;
  const cementSizes = CEMENTSIZESNAME;
  const stealSizes = STEALSIZESNAME;
  const { id } = useParams();
  const isEditMode = !!id;

  // fetchBrands API
  useEffect(() => {
    setLoading(true);
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://192.168.1.3:5000/getBrands");
        setGetBrands(response.data || "");
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const brandToEdit = isEditMode
    ? getBrands?.find((item) => item.id === id)
    : null;

  useEffect(() => {
    if (isEditMode && brandToEdit) {
      setValue("brandName", brandToEdit.name);

      // brandCategory set kariye proper object mukine
      const selectedCategory = brandCategorys.find(
        (b) => b.value === brandToEdit.category
      );
      setValue("brandCategory", selectedCategory || null);

      // Sizes Logic (Category check pachi)
      let sizesList = [];

      if (selectedCategory?.label === "Cement") {
        sizesList = CEMENTSIZESNAME.filter((sizeObj) =>
          brandToEdit.sizes.includes(sizeObj.value)
        );
      } else if (selectedCategory?.label === "Steal") {
        sizesList = STEALSIZESNAME.filter((sizeObj) =>
          brandToEdit.sizes.includes(sizeObj.value)
        );
      }

      setValue("brandSizes", sizesList);
    }
  }, [isEditMode, brandToEdit, setValue, brandCategorys]);

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

  const onSubmit = async (data) => {
    setLoading(true);
    // API Data
    const storeBrandData = {
      id: isEditMode ? id : uuidv4(),
      type: "brand",
      name: data.brandName,
      category: data.brandCategory.value,
      sizes: data.brandSizes.map((index) => index.value),
    };
    // Post API to Brand
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(
          "http://192.168.1.3:5000/updateBrand",
          storeBrandData
        );
      } else {
        response = await axios.post(
          "http://192.168.1.3:5000/addBrand",
          storeBrandData
        );
      }
      setResponseMessage(response.data.Message);
      navigate("/brands");
    } catch (error) {
      console.error("Error sending data to server", error);
      if (error.response && error.response.status === 409) {
        setResponseMessage(error.response.data.Message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
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
                {(errors.brandName || responseMessage) && (
                  <p className="text-red-500">
                    {errors.brandName?.message || responseMessage}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <DropDownField
                  options={brandCategorys}
                  //me je select ma value set kari 6e te value mathch thavi pade so .value use karu 6e baki value j difference ha se to select work j nathi karvanu......
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
      )}
    </div>
  );
}

export default AddBrand;
