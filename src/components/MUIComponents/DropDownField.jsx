import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function DropDownField({
  options,
  title,
  onChange,
  value,
  myStyle,
  isReadOnly,
}) {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <Box className={`bg-white w-62 ${myStyle}`}>
        <FormControl fullWidth size="small" disabled={isReadOnly}>
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
    </div>
  );
}

export default DropDownField;
