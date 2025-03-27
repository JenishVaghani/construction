import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Box } from "@mui/material";

function DateField({ suadaDate, value }) {
  return (
    <div>
      <Box className="w-62 ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="bg-white"
            label="Date"
            format="DD/MM/YYYY"
            slotProps={{ textField: { size: "small", fullWidth: true } }}
            value={value ? dayjs(value, "DD/MM/YYYY") : null}
            shouldDisableDate={(date) => date.isAfter(dayjs(), "day")}
            onChange={(newValue) => {
              const formattedDate = dayjs(newValue).format("DD/MM/YYYY");
              suadaDate(formattedDate);
            }}
          />
        </LocalizationProvider>
      </Box>
    </div>
  );
}

export default DateField;
