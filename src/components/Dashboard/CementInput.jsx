/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import InputField from "../MUIComponents/InputField";
import SwitchButtonField from "../MUIComponents/SwitchButtonField";

function CementInput({
  selectedSizes,
  setSuadaBillNo,
  setGetSuadaInputData,
  setGetSuadaTotalQty,
  setGetTotalVendorRate,
  setGetTotalSellerRate,
}) {
  const [suadaSizesInputData, setSuadaSizesData] = useState([]);
  const [suadaTotalQty, setSuadaTotalQty] = useState(0);
  const [suadaTotalVendorRate, setSuadaTotalVendorRate] = useState(0);
  const [suadaTotalSellerRate, setSuadaTotalSellerRate] = useState(0);

  const handleInputchange = (size, field, value) => {
    setSuadaSizesData((prev) => {
      const updatedSizes = {
        ...prev,
        [size]: { ...prev[size], [field]: value },
      };
      // Total qty calculate
      const totalQty = Object.values(updatedSizes).reduce(
        (sum, item) => sum + (parseFloat(item.qty) || 0),
        0
      );

      const totalVendorRate = Object.values(updatedSizes).reduce(
        (sum, item) => sum + (parseFloat(item.vendorRate) || 0),
        0
      );

      const totalSellerRate = Object.values(updatedSizes).reduce(
        (sum, item) => sum + (parseFloat(item.sellerRate) || 0),
        0
      );

      setSuadaTotalQty(totalQty);
      setSuadaTotalVendorRate(totalVendorRate);
      setSuadaTotalSellerRate(totalSellerRate);
      return updatedSizes;
    });
  };

  useEffect(() => {
    setGetSuadaInputData(suadaSizesInputData);
  }, [suadaSizesInputData]);

  useEffect(() => {
    setGetSuadaTotalQty(suadaTotalQty);
  }, [suadaTotalQty]);

  useEffect(() => {
    setGetTotalVendorRate(suadaTotalVendorRate);
  }, [suadaTotalVendorRate]);

  useEffect(() => {
    setGetTotalSellerRate(suadaTotalSellerRate);
  }, [suadaTotalSellerRate]);

  return (
    <div>
      <div className="">
        <h1 className="text-xl font-semibold mt-6 mb-2">Qty</h1>
        {selectedSizes.map((item, index) => (
          <div className="pb-4" key={index}>
            <label className="text-gray-700 ">{item}</label>

            {/* Input Fields & Switch Row */}
            <div className="flex items-center mt-1 gap-1">
              <InputField
                label="Vendor rate"
                type="number"
                onChange={(e) =>
                  handleInputchange(item, "vendorRate", e.target.value)
                }
              />
              <InputField
                label="Seller rate"
                type="number"
                onChange={(e) =>
                  handleInputchange(item, "sellerRate", e.target.value)
                }
              />
              <InputField
                label="Qty"
                type="number"
                onChange={(e) => handleInputchange(item, "qty", e.target.value)}
              />

              <SwitchButtonField
                name1="W"
                name2="B"
                defaultValue="W"
                onChange={(value) =>
                  handleInputchange(item, "moneyType", value || "W")
                }
              />
            </div>
          </div>
        ))}

        {/* Total Quantity & Bill No */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xl mt-2 mb-2 font-sans">
            Total Qty:{" "}
            <span className="font-bold text-md">{suadaTotalQty} T</span>
          </label>
          <InputField
            label="Bill No"
            type="text"
            widthStyle="w-62"
            onChange={(e) => setSuadaBillNo(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CementInput;
