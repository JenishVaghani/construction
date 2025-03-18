import React, { useState } from "react";
import { Stack, Switch, Typography } from "@mui/material";

function SwitchButtonField({ name1, name2, onChange }) {
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange(isChecked ? name2 : name1); // Pass "W" or "B" to parent component
  };

  return (
    <Stack direction="row" alignItems="center">
      {/* Left Side Label */}
      <Typography>{!checked ? name1 : ""}</Typography>

      {/* Switch Component */}
      <Switch checked={checked} onChange={handleSwitchChange} color="default" />

      {/* Right Side Label */}
      <Typography>{checked ? name2 : ""}</Typography>
    </Stack>
  );
}

export default SwitchButtonField;
