import { FormControl, TextField, Typography } from "@mui/material";
import React from "react";

const TextFieldInput = ({
  title,
  type,
  others,
  autoFocus,
  value,
  onChange,
}) => {
  return (
    <FormControl fullWidth className="mb-4">
      <Typography fontSize={18}>{title}</Typography>
      <TextField
        type={type}
        name={others}
        id={others}
        autoFocus={autoFocus}
        placeholder={title}
        value={value}
        onChange={onChange}
        required
      />
    </FormControl>
  );
};

export default TextFieldInput;
