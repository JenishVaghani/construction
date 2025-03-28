import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import DropDownField from "../MUIComponents/DropDownField";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import StealInput from "./StealInput";
import CementInput from "./CementInput";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DateField from "../MUIComponents/DateField";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { addSuadas, updateSuada } from "../Redux/UserSlice";
import { v4 as uuidv4 } from "uuid";

function AddSuada() {
  const methods = useForm({
    defaultValues: {
      suadaVendorName: [],
      suadaDate: "",
      suadaSellerName: [],
      suadaBrandName: [],
      suadaSizes: [],
      vendorRate: 0,
      sellerRate: [],
      qty: [],
      totalQty: 0,
      totalVendorRate: 0,
      totalSellerRate: 0,
      billNo: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    control,
    formState: { errors },
  } = methods;

  const vendorsData = useSelector((state) => state.users.vendors);
  const sellersData = useSelector((state) => state.users.sellers);
  const brandsData = useSelector((state) => state.users.brands);

  const { id } = useParams();
  const isEditMode = !!id;
  const suadas = useSelector((state) => state.users.suadas);
  const suadaToEdit = isEditMode
    ? suadas.find((suada) => suada.id === id)
    : null;

  useEffect(() => {
    if (isEditMode && suadaToEdit) {
      setValue("suadaVendorName", suadaToEdit.vendorName);
      setValue("suadaDate", suadaToEdit.date);
      setValue("suadaSellerName", suadaToEdit.sellerName);
      setValue("suadaBrandName", suadaToEdit.brandName);
      setValue(
        "suadaSizes",
        suadaToEdit.sizes.value.map((s) => s)
      );

      setValue("billNo", suadaToEdit.billNo);
      if (suadaToEdit.sizesData) {
        const categoryName = suadaToEdit.sizes.name.map((s) => s);
        const categoryObj = suadaToEdit.sizesData;

        categoryName.forEach((size) => {
          const vendorRate = categoryObj[size]?.vendorRate || 0;
          const sellerRate = categoryObj[size]?.sellerRate || 0;
          const qty = categoryObj[size]?.qty || 0;
          const moneyType = categoryObj[size]?.moneyType || 0;
          setValue(`sizesData.${size}.vendorRate`, vendorRate);
          setValue(`sizesData.${size}.sellerRate`, sellerRate);
          setValue(`sizesData.${size}.qty`, qty);
          setValue(`sizesData.${size}.moneyType`, moneyType);
        });
      }
    }
  }, [isEditMode, suadaToEdit, setValue]);

  const addSuadaPath = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/dashboard"
      className="hover:underline"
    >
      Dashboard
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      {isEditMode ? "Edit Suada" : "Add Suada"}
    </Typography>,
  ];

  const suadaBrandName = watch("suadaBrandName");

  const selectedBrand =
    brandsData.find((brand) => brand.id === suadaBrandName.value) ?? null;

  const suadaSizes = watch("suadaSizes") || [];

  const sizesData = (selectedBrand?.sizes ?? []).map((size) => ({
    label: size.label,
    value: size.value,
  }));

  const selectedSizes = sizesData.filter((size) =>
    (watch("suadaSizes") || []).includes(size.value)
  );

  const [inputData, setInputData] = useState({
    vendorRate: 0,
    sellerRate: 0,
    totalQty: 0,
    totalVendorRate: 0,
    totalSellerRate: 0,
  });

  const handleInputDataChange = (updatedData) => {
    setInputData(updatedData);
  };

  const handleVendorSelect = (e) => {
    const selectedVendor = vendorsData.find((vendor) => vendor.id === e);
    if (selectedVendor) {
      setValue("suadaVendorName", {
        label: selectedVendor.name,
        value: selectedVendor.id,
      });
    }
  };

  const handleSellerSelect = (e) => {
    const selectedSeller = sellersData.find((seller) => seller.id === e);
    if (selectedSeller) {
      setValue("suadaSellerName", {
        label: selectedSeller.name,
        value: selectedSeller.id,
      });
    }
  };

  const handleBrandSelect = (e) => {
    const selectedBrands = brandsData.find((brand) => brand.id === e);
    if (selectedBrands) {
      setValue("suadaBrandName", {
        label: selectedBrands.name,
        value: selectedBrands.id,
      });
    }
  };

  const onsubmit = (data) => {
    const sizes = (selectedBrand?.sizes || [])
      .filter((s) => (suadaSizes || []).includes(s.value))
      .map((s) => s.label);

    const storeSuadaData = {
      id: isEditMode ? id : uuidv4(),
      vendorName: data.suadaVendorName,
      sellerName: data.suadaSellerName,
      brandName: data.suadaBrandName,
      date: getValues("suadaDate"),
      sizes: { name: sizes, value: data.suadaSizes },
      sizesData: data.sizesData,
      billNo: data.billNo,
      vendorRate: inputData.vendorRate,
      sellerRate: inputData.sellerRate,
      totalQty: inputData.totalQty,
      totalVendorRate: inputData.totalVendorRate,
      totalSellerRate: inputData.totalSellerRate,
    };

    if (isEditMode) {
      dispatch(updateSuada(storeSuadaData));
    } else {
      dispatch(addSuadas(storeSuadaData));
    }
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <div className="w-fit rounded-md bg-gray-300 p-3">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {addSuadaPath}
          </Breadcrumbs>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="mt-4">
              {/* Vendor & Date Row */}
              <div className="flex-wrap sm:flex md:flex items-start mb-4 gap-3">
                {/* Vendor Dropdown */}
                <div className="flex flex-col">
                  <DropDownField
                    options={(vendorsData || []).map((e) => ({
                      label: e.name,
                      value: e.id,
                    }))}
                    value={watch("suadaVendorName")?.value || ""}
                    title="Vendor"
                    {...register("suadaVendorName", {
                      required: "Vendor is required",
                    })}
                    onChange={handleVendorSelect}
                  />
                  {errors.suadaVendorName && (
                    <p className="text-red-500">
                      {errors.suadaVendorName.message}
                    </p>
                  )}
                </div>

                {/* Date Field */}
                <div className="flex flex-col mt-4 sm:mt-0 ">
                  <Controller
                    name="suadaDate"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <DateField
                        label="Date"
                        date={field.onChange}
                        value={watch("suadaDate")}
                      />
                    )}
                  />
                  {errors.suadaDate && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.suadaDate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Seller Dropdown */}
              <div className="mb-4">
                <DropDownField
                  options={(sellersData || []).map((e) => ({
                    label: e.name,
                    value: e.id,
                  }))}
                  value={watch("suadaSellerName")?.value || ""}
                  title="Seller"
                  {...register("suadaSellerName", {
                    required: "Seller is required",
                  })}
                  onChange={handleSellerSelect}
                />
                {errors.suadaSellerName && (
                  <p className="text-red-500">
                    {errors.suadaSellerName.message}
                  </p>
                )}
              </div>

              {/* Brand Dropdown */}
              <div className="mb-4">
                <DropDownField
                  options={brandsData.map((e) => ({
                    label: e.name,
                    value: e.id,
                  }))}
                  value={watch("suadaBrandName")?.value || ""}
                  title="Brand"
                  {...register("suadaBrandName", {
                    required: "Brand is required",
                  })}
                  onChange={handleBrandSelect}
                />
                {errors.suadaBrandName && (
                  <p className="text-red-500">
                    {errors.suadaBrandName.message}
                  </p>
                )}
              </div>

              {/* Size Dropdown */}
              <div className="mb-4">
                <MultiSelectDropDownField
                  options={sizesData}
                  title="Size"
                  value={selectedSizes}
                  {...register("suadaSizes", {
                    required: "Size is required",
                  })}
                  onChange={(e) => setValue("suadaSizes", e)}
                />
                {errors.suadaSizes && (
                  <p className="text-red-500">{errors.suadaSizes.message}</p>
                )}
              </div>
            </div>

            <div>
              {selectedBrand && selectedSizes.length > 0 ? (
                selectedBrand.category === "Steal" ? (
                  <StealInput
                    selectedSizes={selectedSizes}
                    control={control}
                    getStealInputData={handleInputDataChange}
                  />
                ) : (
                  <CementInput
                    selectedSizes={selectedSizes}
                    control={control}
                    getCementInputData={handleInputDataChange}
                  />
                )
              ) : (
                <h3 className="text-red-500 font-bold">
                  Please select a brand and size
                </h3>
              )}
            </div>

            {/* Save Button Centered */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-10 py-2 bg-[#15616D] text-white rounded-xl hover:bg-[#0E4A52] cursor-pointer"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default AddSuada;
