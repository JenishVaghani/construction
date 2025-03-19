import React from 'react'
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

function DropDownField({ items, title, onChange, value }) {

    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (e) => {

        setSelectedValue(e.target.value)
        if (onChange) {
            onChange(e.target.value);
        }
    }

    return (
        <Box sx={{ minWidth: 250 }} className="bg-white">
            <FormControl fullWidth size="small">
                <InputLabel>{title}</InputLabel>
                <Select
                    label={title}
                    value={selectedValue || value}
                    onChange={handleChange}
                >
                    {items.map((item, index) => <MenuItem key={index} value={item.name}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}

export default DropDownField