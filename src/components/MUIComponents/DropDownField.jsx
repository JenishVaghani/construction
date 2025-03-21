import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function DropDownField({ options, title, onChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Box sx={{ width: 250 }} className="bg-white">
      <FormControl fullWidth size="small">
        <InputLabel>{title}</InputLabel>
        <Select label={title} onChange={handleChange} value={selectedValue}>
          {options.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropDownField;
