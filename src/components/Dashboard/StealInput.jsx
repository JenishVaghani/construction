import { useEffect } from "react";
import InputField from "../MUIComponents/InputField";
import SwitchButtonField from "../MUIComponents/SwitchButtonField";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";

function StealInput({ selectedSizes, control, getStealInputData }) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Calculate totals
  const sizesData = watch("sizesData") || {};

  // Edit in direct remove size so update calculate
  useEffect(() => {
    const newSizesData = {};

    selectedSizes.forEach((size) => {
      newSizesData[size.value] = sizesData[size.value] || {
        qty: 0,
        vendorRate: 0,
        sellerRate: 0,
      };
    });

    if (JSON.stringify(newSizesData) !== JSON.stringify(sizesData)) {
      setValue("sizesData", newSizesData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSizes]);

  const vendorRate = Object.values(sizesData).reduce(
    (acc, size) => acc + (Number(size.vendorRate) || 0),
    0
  );
  const sellerRate = Object.values(sizesData).reduce(
    (acc, size) => acc + (Number(size.sellerRate) || 0),
    0
  );
  const totalQty = Object.values(sizesData).reduce(
    (acc, size) => acc + (Number(size.qty) || 0),
    0
  );
  const totalVendorRate = vendorRate * totalQty;
  const totalSellerRate = sellerRate * totalQty;

  useEffect(() => {
    const newData = {
      vendorRate,
      sellerRate,
      totalQty,
      totalVendorRate,
      totalSellerRate,
    };

    getStealInputData((prevData) => {
      if (
        prevData.totalQty !== newData.totalQty ||
        prevData.totalVendorRate !== newData.totalVendorRate ||
        prevData.totalSellerRate !== newData.totalSellerRate
      ) {
        return newData;
      }
      return prevData;
    });
  }, [
    vendorRate,
    sellerRate,
    totalQty,
    totalVendorRate,
    totalSellerRate,
    getStealInputData,
  ]);

  return (
    <div>
      <div className="">
        <h1 className="text-xl font-semibold mt-6 mb-2">Qty</h1>
        {selectedSizes.map((item, index) => (
          <div className="pb-4" key={index}>
            <label className="text-gray-700 ">{item.label}</label>

            {/* Input Fields & Switch Row */}
            <div className="flex items-center mt-1 gap-1">
              <div className=" flex-col">
                <InputField
                  label="Vendor rate"
                  type="number"
                  {...register(`sizesData.${item.value}.vendorRate`, {
                    required: "Vendor rate is required",
                  })}
                  onInput={(e) => {
                    if (e.target.value < 1) {
                      e.target.value = "";
                    }
                  }}
                />
                {errors.sizesData?.[item.value]?.vendorRate && (
                  <p className="text-red-500">
                    {errors.sizesData[item.value].vendorRate.message}
                  </p>
                )}
              </div>
              <div className=" flex-col">
                <InputField
                  label="Seller rate"
                  type="number"
                  {...register(`sizesData.${item.value}.sellerRate`, {
                    required: "Seller rate is required",
                  })}
                  onInput={(e) => {
                    if (e.target.value < 1) {
                      e.target.value = "";
                    }
                  }}
                />
                {errors.sizesData?.[item.value]?.sellerRate && (
                  <p className="text-red-500">
                    {errors.sizesData[item.value].sellerRate.message}
                  </p>
                )}
              </div>
              <div className=" flex-col">
                <InputField
                  label="Qty"
                  type="number"
                  {...register(`sizesData.${item.value}.qty`, {
                    required: " Qty is required",
                  })}
                  onInput={(e) => {
                    if (e.target.value < 1) {
                      e.target.value = "";
                    }
                  }}
                />
                {errors.sizesData?.[item.value]?.qty && (
                  <p className="text-red-500">
                    {errors.sizesData[item.value].qty.message}
                  </p>
                )}
              </div>

              <div className=" items-center justify-center">
                <Controller
                  name={`sizesData.${item.value}.moneyType`}
                  control={control}
                  defaultValue="W"
                  render={({ field }) => (
                    <SwitchButtonField
                      name1="W"
                      name2="B"
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Total Quantity & Bill No */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xl mt-2 mb-2 font-sans">
            Total Qty: <span className="font-bold text-md">20 Bag</span>
          </label>
          <InputField
            label="Bill No"
            type="text"
            {...register("billNo", {
              required: "Bill number is required",
            })}
          />
          {errors.billNo && (
            <p className="text-red-500">{errors.billNo.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StealInput;
