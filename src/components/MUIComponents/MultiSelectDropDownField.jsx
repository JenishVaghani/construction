import React, { useState } from "react";
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

function MultiSelectDropDownField({ items, title, onChange }) {
  const [sizeName, setSizeName] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    const selectedValues = typeof value === "string" ? value.split(",") : value;
    setSizeName(selectedValues);
    if (onChange) {
      onChange(selectedValues);
    }
  };

  return (
    <div>
      <Box sx={{ minWidth: 250 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={sizeName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => {
              const displayText =
                selected.length > 2
                  ? `${selected.slice(0, 2).join(", ")}... (${
                      selected.length - 2
                    } more)`
                  : selected.join(", ");
              return displayText;
            }}
            MenuProps={MenuProps}
            sx={{
              maxWidth: 250, // મહત્તમ પહોળાઈ નિયંત્રિત કરવા માટે
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {items.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                <Checkbox checked={sizeName.includes(item.name)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default MultiSelectDropDownField;
