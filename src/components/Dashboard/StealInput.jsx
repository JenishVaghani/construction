import { useEffect, useState } from "react";
import InputField from "../MUIComponents/InputField";
import SwitchButtonField from "../MUIComponents/SwitchButtonField";

function StealInput({ selectedSizes, setSuadaBillNo, setGetSuadaInputData }) {
  const [suadaSizesInputData, setSuadaSizesData] = useState([]);

  const handleInputchange = (size, field, value) => {
    setSuadaSizesData((prev) => ({
      ...prev,
      [size]: { ...prev[size], [field]: [value] },
    }));
  };

  useEffect(() => {
        setGetSuadaInputData(suadaSizesInputData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [suadaSizesInputData]);
  return (
    <div>
      <div className="pl-8">
        <h1 className="text-xl font-semibold">Qty</h1>
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
                  handleInputchange(item, "moneyType", value)
                }
              />
            </div>
          </div>
        ))}

        {/* Total Quantity & Bill No */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xl mt-2 mb-3 ml-4 font-sans">
            Total Qty1: <span className="font-bold text-md">20 Bag</span>
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

export default StealInput;
