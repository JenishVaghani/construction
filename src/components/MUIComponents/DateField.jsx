import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function DateField({ setSuadaDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Date"
        format="DD/MM/YYYY"
        slotProps={{ textField: { size: "small" } }}
        onChange={(newValue) => {
          const formattedDate = dayjs(newValue).format("DD/MM/YYYY");
          setSuadaDate(formattedDate);
        }}
      />
    </LocalizationProvider>
  );
}

export default DateField;
