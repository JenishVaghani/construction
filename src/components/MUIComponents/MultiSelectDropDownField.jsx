import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

function MultiSelectDropDownField({ options, title, onChange, value, isReadOnly }) {
  const [sizeName, setSizeName] = useState([]);

  useEffect(() => {
    // ✅ Ensure only values are stored
    const selectedValues = value.map((item) => item.value);
    setSizeName(selectedValues);
  }, [value]);

  const handleChange = (event) => {
    const { value } = event.target;
    const selectedValues = typeof value === "string" ? value.split(",") : value;

    // Store selected object instead of only label or value
    const selectedObjects = options.filter((item) =>
      selectedValues.includes(item.value)
    );

    setSizeName(selectedObjects.map((item) => item.value)); // Store only values
    if (onChange) {
      onChange(selectedObjects.map((item) => item.value)); // Pass values to parent
    }
  };

  return (
    <div>
      <Box className="bg-white w-62">
        <FormControl fullWidth size="small" disabled={isReadOnly}>
          <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={sizeName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => {
              const selectedLabels = options
                .filter((item) => selected.includes(item.value))
                .map((item) => item.label);

              return selectedLabels.length > 2
                ? `${selectedLabels.slice(0, 2).join(", ")}... (${
                    selectedLabels.length - 2
                  } more)`
                : selectedLabels.join(", ");
            }}
            MenuProps={MenuProps}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {options.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                <Checkbox checked={sizeName.includes(item.value)} />{" "}
                {/* ✅ Fix */}
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default MultiSelectDropDownField;
