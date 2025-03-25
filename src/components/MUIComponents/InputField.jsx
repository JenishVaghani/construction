import React from "react";
import TextField from "@mui/material/TextField";

const InputField = ({ label, type, ...rest }) => {
  return (
    <TextField
      label={label}
      type={type}
      size="small"
      className="bg-white"
      sx={{ width: 250 }}
      
      {...rest}
    />
  );
};

export default InputField;
