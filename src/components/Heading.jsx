import { Typography } from "@mui/material";
import React from "react";

const Heading = ({ title, icon }) => {
  return (
    <Typography fontSize={40} fontWeight="bold" color="secondary">
      {icon} {title}
    </Typography>
  );
};

export default Heading;
