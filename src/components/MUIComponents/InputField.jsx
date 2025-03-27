import React from "react";
import TextField from "@mui/material/TextField";

const InputField = ({ label, type, ...rest }) => {
  return (
    <div className="">
      <TextField
        label={label}
        type={type}
        size="small"
        className="bg-white w-62"
        {...rest}
      />
    </div>
  );
};

export default InputField;
