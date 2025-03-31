import React, { useState, useEffect } from "react";
import { Stack, Switch, Typography } from "@mui/material";

function SwitchButtonField({ name1, name2, onChange, value, isReadOnly }) {
  const [checked, setChecked] = useState(value === name2);

  useEffect(() => {
    setChecked(value === name2);
  }, [value, name2]);

  const handleSwitchChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange(isChecked ? name2 : name1);
  };

  return (
    <Stack direction="row" alignItems="center">
      {/* Left Side Label */}
      <Typography>{!checked ? name1 : ""}</Typography>

      {/* Switch Component */}
      <Switch checked={checked} onChange={handleSwitchChange} color="default" disabled={isReadOnly}/>

      {/* Right Side Label */}
      <Typography>{checked ? name2 : ""}</Typography>
    </Stack>
  );
}

export default SwitchButtonField;
