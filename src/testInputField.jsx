import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";

const InputField = forwardRef(
  (
    { label, type, widthStyle, onChange, error, helperText, value, ...rest },
    ref
  ) => {
    return (
      <div>
        <TextField
          label={label}
          type={type}
          size="small"
          className={`${widthStyle} bg-white`}
          onChange={onChange}
          sx={{ minWidth: 250 }}
          error={error}
          helperText={helperText}
          value={value}
          inputRef={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default InputField;