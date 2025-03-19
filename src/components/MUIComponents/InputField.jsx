import React from "react";
import TextField from "@mui/material/TextField";

function InputField({ label, type, widthStyle, onChange }) {
  return (
    <div>
      <TextField
        label={label}
        type={type}
        size="small"
        className={`${widthStyle} bg-white`}
        onChange={onChange}
        sx={{ minWidth: 250 }}
      />
    </div>
  );
}

export default InputField;
