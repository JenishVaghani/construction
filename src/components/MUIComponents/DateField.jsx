import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function DateField({ suadaDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
       className="bg-white"
        label="Date"
        format="DD/MM/YYYY"
        slotProps={{ textField: { size: "small" } }}
        onChange={(newValue) => {
          const formattedDate = dayjs(newValue).format("DD/MM/YYYY");
          suadaDate(formattedDate);
        }}
      />
    </LocalizationProvider>
  );
}

export default DateField;
