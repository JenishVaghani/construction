import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import DropDownField from "../MUIComponents/DropDownField";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import StealInput from "./StealInput";
import CementInput from "./CementInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DateField from "../MUIComponents/DateField";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { addSuadas } from "../Redux/UserSlice";

function AddSuada() {
  const vendersData = useSelector((state) => state.users.vendors);
  const sellersData = useSelector((state) => state.users.sellers);
  const brandsData = useSelector((state) => state.users.brands);

  const methods = useForm();
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

  const suadaBrandName = watch("suadaBrandName");
  const suadaSizes = watch("suadaSizes");

  const selectedBrand =
    brandsData.find((brand) => brand.brandName === suadaBrandName) ?? null;

  const sizesData = selectedBrand
    ? selectedBrand.brandSizes.map((size) => ({ name: size, value: size }))
    : [];

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
      AddSuada
    </Typography>,
  ];

  const onsubmit = (data) => {
    const storeSuadaData = {
      vendorName: data.suadaVendorName,
      sellerName: data.suadaSellerName,
      brandName: data.suadaBrandName,
      date: getValues("suadaDate"),
      sizes: data.suadaSizes,
      sizesData: data.sizesData,
      billNo: data.billNo,
    };
    console.log(storeSuadaData, "storeSuadaData");

    dispatch(addSuadas(storeSuadaData));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen ml-56 mt-16 bg-gray-100">
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
              <div className="flex items-start mb-4 gap-8">
                {/* Vendor Dropdown */}
                <div className="flex flex-col">
                  <DropDownField
                    items={vendersData.map((e) => ({ name: e.vendorName }))}
                    title="Vendor"
                    {...register("suadaVendorName", {
                      required: "Vendor is required",
                    })}
                    onChange={(e) => setValue("suadaVendorName", e)}
                  />
                  {errors.suadaVendorName && (
                    <p className="text-red-500">
                      {errors.suadaVendorName.message}
                    </p>
                  )}
                </div>

                {/* Date Field */}
                <div className="flex flex-col">
                  <Controller
                    name="suadaDate"
                    control={control}
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <DateField suadaDate={field.onChange} />
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
                  items={sellersData.map((e) => ({
                    name: e.sellerName,
                  }))}
                  title="Seller"
                  {...register("suadaSellerName", {
                    required: "Seller is required",
                  })}
                  onChange={(e) => setValue("suadaSellerName", e)}
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
                  items={brandsData.map((e) => ({
                    name: e.brandName,
                  }))}
                  title="Brand"
                  {...register("suadaBrandName", {
                    required: "Brand is required",
                  })}
                  onChange={(e) => setValue("suadaBrandName", e)}
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
                  items={sizesData}
                  title="Size"
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
              {selectedBrand && suadaSizes ? (
                selectedBrand.brandCategory === "Steal" ? (
                  <StealInput
                    selectedSizes={watch("suadaSizes")}
                    control={control}
                  />
                ) : (
                  <CementInput
                    selectedSizes={watch("suadaSizes")}
                    control={control}
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
                className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default AddSuada;
