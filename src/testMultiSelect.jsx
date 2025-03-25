import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
};

function MultiSelectDropDownField({
  items,
  title,
  onChange,
  value,
  error,
  helperText
}) {
  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    if (value && Array.isArray(value)) {
      setSelectedValues(value);
    }
  }, [value]);

  const handleChange = (event) => {
    const { value } = event.target;
    const newValues = typeof value === "string" ? value.split(",") : value;
    setSelectedValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <div>
      <Box sx={{ minWidth: 250 }} className="bg-white">
        <FormControl fullWidth size="small" error={error}>
          <InputLabel id="multiple-checkbox-label">{title}</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            multiple
            value={selectedValues}
            onChange={handleChange}
            input={<OutlinedInput label={title} />}
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
              maxWidth: 250,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {items.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                <Checkbox checked={selectedValues.indexOf(item.value) > -1} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      </Box>
    </div>
  );
}

export default MultiSelectDropDownField;