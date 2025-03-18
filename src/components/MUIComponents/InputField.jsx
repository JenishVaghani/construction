import React from "react";
import TextField from "@mui/material/TextField";

function InputField({ label, type, widthStyle, onChange }) {
  return (
    <div>
      <TextField
        label={label}
        type={type}
        size="small"
        className={`${widthStyle}`}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
