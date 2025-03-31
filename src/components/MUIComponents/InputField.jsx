import React from "react";
import TextField from "@mui/material/TextField";

const InputField = ({ label, type, isReadOnly, ...rest }) => {
  return (
    <div className="">
      <TextField
        label={label}
        type={type}
        size="small"
        className="bg-white w-62"
        disabled={isReadOnly}
        {...rest}
      />
    </div>
  );
};

export default InputField;
