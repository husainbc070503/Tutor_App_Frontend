import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";

const RadioField = ({ name, value, onChange }) => {
  return (
    <FormControl>
      <Typography fontSize={18}>Role</Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="role"
        value={value}
        onChange={onChange}
      >
        {["Student", "Teacher", "Admin"].map((item) => (
          <FormControlLabel
            value={item.toLowerCase()}
            control={<Radio />}
            label={item}
            name="role"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioField;
