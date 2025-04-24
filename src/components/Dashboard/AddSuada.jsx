import React, { useEffect, useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import DropDownField from "../MUIComponents/DropDownField";
import MultiSelectDropDownField from "../MUIComponents/MultiSelectDropDownField";
import StealInput from "./StealInput";
import CementInput from "./CementInput";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DateField from "../MUIComponents/DateField";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { updateSuadaStatus } from "../Redux/UserSlice";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { CEMENTSIZESNAME, STEALSIZESNAME } from "../../utils/constants";

function AddSuada() {
  const methods = useForm({
    defaultValues: {
      suadaVendorName: "",
      suadaDate: "",
      suadaSellerName: "",
      suadaBrandName: "",
      suadaSizes: [],
      vendorRate: 0,
      sellerRate: 0,
      qty: 0,
      totalQty: 0,
      totalVendorRate: 0,
      totalSellerRate: 0,
      billNo: "",
      status: "Draft",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    control,
    formState: { errors },
  } = methods;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [vendorsData, setVendorsData] = useState([]);
  const [sellersData, setSellersData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [suadas, setSuadas] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const isReadOnly = searchParams.get("mode") === "view";
  const { id } = useParams();
  const isEditMode = !!id;
  const suadaToEdit = isEditMode
    ? suadas.find((suada) => suada.id === id)
    : null;

  // vendor, seller and brand fetch API
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const vendorResponse = await axios.get(
          "http://192.168.1.3:5000/getVendors"
        );

        const sellerResponse = await axios.get(
          "http://192.168.1.3:5000/getSellers"
        );

        const brandResponse = await axios.get(
          "http://192.168.1.3:5000/getBrands"
        );

        setVendorsData(vendorResponse.data || "");
        setSellersData(sellerResponse.data || "");
        setBrandsData(brandResponse.data || "");
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchDatas();
  }, []);

  // Edit suada
  useEffect(() => {
    if (isEditMode && suadaToEdit) {
      setValue("suadaVendorName", suadaToEdit.vendorid);
      setValue("suadaSellerName", suadaToEdit.sellerid);
      setValue("suadaBrandName", suadaToEdit.brandid);
      setValue("suadaDate", suadaToEdit.date);
      setValue("billNo", suadaToEdit.billNo);
      setValue("status", suadaToEdit.status);

      if (suadaToEdit.sizesData) {
        const sizeIds = Object.keys(suadaToEdit.sizesData);

        const ALL_SIZES = [...CEMENTSIZESNAME, ...STEALSIZESNAME];

        const matchedSizes = sizeIds.map((id) => {
          const matched = ALL_SIZES.find((item) => item.value === id);
          return matched.value;
        });
        setValue("suadaSizes", matchedSizes);

        sizeIds.forEach((sizeId) => {
          const sizeDetails = suadaToEdit?.sizesData[sizeId];
          console.log("sizeDetails", sizeDetails);

          const vendorRate = sizeDetails.vendorRate || 0;
          const sellerRate = sizeDetails?.sellerRate || 0;
          const qty = sizeDetails?.qty || 0;
          const moneyType = sizeDetails?.moneyType || "";

          setValue(`sizesData.${sizeId}.vendorRate`, vendorRate);
          setValue(`sizesData.${sizeId}.sellerRate`, sellerRate);
          setValue(`sizesData.${sizeId}.qty`, qty);
          setValue(`sizesData.${sizeId}.moneyType`, moneyType);
        });
      }
    }
  }, [isEditMode, suadaToEdit, setValue]);

  // edit in size reselect to data show
  useEffect(() => {
    const selected = watch("suadaSizes") || [];

    if (selected.length && suadaToEdit?.sizesData) {
      selected.forEach((sizeId) => {
        const sizeDetails = suadaToEdit.sizesData[sizeId];
        if (sizeDetails) {
          setValue(
            `sizesData.${sizeId}.vendorRate`,
            sizeDetails.vendorRate || 0
          );
          setValue(
            `sizesData.${sizeId}.sellerRate`,
            sizeDetails.sellerRate || 0
          );
          setValue(`sizesData.${sizeId}.qty`, sizeDetails.qty || 0);
          setValue(
            `sizesData.${sizeId}.moneyType`,
            sizeDetails.moneyType || ""
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("suadaSizes")]);

  // suada fetch API
  useEffect(() => {
    try {
      const fetchSuadas = async () => {
        const response = await axios.get("http://192.168.1.3:5000/getSuadas");
        setSuadas(response.data.Data || "");
      };
      fetchSuadas();
    } catch (error) {
      console.error("Error fetching suadas:", error);
    }
  }, []);

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
    brandsData.find((brand) => brand.id === suadaBrandName) ?? null;

  let sizesData = [];

  if (selectedBrand) {
    let sizeOptions = [];

    if (selectedBrand.category === "01b31a99-2422-4ee3-ac6c-a63934aecd53") {
      // Cement ni category hoy to Cement Sizes
      sizeOptions = CEMENTSIZESNAME;
    } else if (
      selectedBrand.category === "8b64b5f2-7f1a-4e47-b00a-18ff1126e6fb"
    ) {
      // Steal ni category hoy to Steal Sizes
      sizeOptions = STEALSIZESNAME;
    }

    // Sizes to Label Convert
    sizesData = (selectedBrand.sizes ?? [])
      .map((s) => {
        const matched = sizeOptions.find((size) => size.value === s);
        return matched ? { label: matched.label, value: matched.value } : null;
      })
      .filter(Boolean);
  }
  const selectedSizes = sizesData.filter((size) =>
    (watch("suadaSizes") || []).includes(size.value)
  );
  console.log("selectedSizes", selectedSizes);

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
      setValue("suadaVendorName", selectedVendor.id);
    }
  };

  const handleSellerSelect = (e) => {
    const selectedSeller = sellersData.find((seller) => seller.id === e);
    if (selectedSeller) {
      setValue("suadaSellerName", selectedSeller.id);
    }
  };

  const handleBrandSelect = (e) => {
    const selectedBrands = brandsData.find((brand) => brand.id === e);
    if (selectedBrands) {
      setValue("suadaBrandName", selectedBrands.id);
    }
  };

  const onsubmit = async (data) => {
    const storeSuadaData = {
      id: isEditMode ? id : uuidv4(),
      vendorid: data.suadaVendorName,
      sellerid: data.suadaSellerName,
      brandid: data.suadaBrandName,
      date: getValues("suadaDate"),
      sizesData: data.sizesData,
      billNo: data.billNo,
      totalVendorRate: inputData.vendorRate,
      totalSellerRate: inputData.sellerRate,
      totalQty: inputData.totalQty,
      totalVendorAmount: inputData.totalVendorRate,
      totalSellerAmount: inputData.totalSellerRate,
      status: data.status,
    };
    console.log("storeSuadaData**", storeSuadaData);
    
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(
          "http://192.168.1.3:5000/updateSuada",
          storeSuadaData
        );
        console.log("update**response", response);
        dispatch(updateSuadaStatus({ id, status: data.status }));
      } else {
        response = await axios.post(
          "http://192.168.1.3:5000/addSuada",
          storeSuadaData
        );
        console.log("post**response", response);
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }

    navigate("/dashboard");
  };
  console.log("0000", watch("suadaBrandName"));
  

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
                    value={watch("suadaVendorName") || ""}
                    title="Vendor"
                    {...register("suadaVendorName", {
                      required: "Vendor is required",
                    })}
                    isReadOnly={isReadOnly}
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
                        isReadOnly={isReadOnly}
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
                  value={watch("suadaSellerName") || ""}
                  title="Seller"
                  {...register("suadaSellerName", {
                    required: "Seller is required",
                  })}
                  isReadOnly={isReadOnly}
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
                  value={watch("suadaBrandName") || ""}
                  title="Brand"
                  {...register("suadaBrandName", {
                    required: "Brand is required",
                  })}
                  isReadOnly={isReadOnly}
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
                  isReadOnly={isReadOnly}
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
                    isReadOnly={isReadOnly}
                  />
                ) : (
                  <CementInput
                    selectedSizes={selectedSizes}
                    control={control}
                    getCementInputData={handleInputDataChange}
                    isReadOnly={isReadOnly}
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
              {!isReadOnly && (
                <button
                  type="submit"
                  className="px-10 py-2 bg-[#15616D] text-white rounded-xl hover:bg-[#0E4A52] cursor-pointer"
                  disabled={isReadOnly}
                >
                  {isEditMode ? "Update" : "Save"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default AddSuada;
