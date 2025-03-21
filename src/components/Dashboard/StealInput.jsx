import InputField from "../MUIComponents/InputField";
import SwitchButtonField from "../MUIComponents/SwitchButtonField";
import { useFormContext } from "react-hook-form";
import { Controller } from "react-hook-form";

function StealInput({ selectedSizes, control }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="">
        <h1 className="text-xl font-semibold mt-6 mb-2">Qty</h1>
        {selectedSizes.map((item, index) => (
          <div className="pb-4" key={index}>
            <label className="text-gray-700 ">{item}</label>

            {/* Input Fields & Switch Row */}
            <div className="flex items-center mt-1 gap-1">
              <div className=" flex-col">
                <InputField
                  label="Vendor rate"
                  type="number"
                  {...register(`sizesData.${item}.vendorRate`, {
                    required: "Vendor rate is required",
                  })}
                />
                {errors.vendorRate && (
                  <p className="text-red-500">{errors.vendorRate.message}</p>
                )}
              </div>
              <div className=" flex-col">
                <InputField
                  label="Seller rate"
                  type="number"
                  {...register(`sizesData.${item}.sellerRate`, {
                    required: "Seller rate is required",
                  })}
                />
                {errors.sellerRate && (
                  <p className="text-red-500">{errors.sellerRate.message}</p>
                )}
              </div>
              <div className=" flex-col">
                <InputField
                  label="Qty"
                  type="number"
                  {...register(`sizesData.${item}.qty`, {
                    required: " Qty is required",
                  })}
                />
                {errors.qty && (
                  <p className="text-red-500">{errors.qty.message}</p>
                )}
              </div>

              <div className=" items-center justify-center">
                <Controller
                  name={`sizesData.${item}.moneyType`}
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
