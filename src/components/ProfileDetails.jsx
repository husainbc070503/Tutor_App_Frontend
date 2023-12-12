import { Grid, Typography } from "@mui/material";
import React from "react";

const ProfileDetails = ({ title, value }) => {
  return (
    <Grid container spacing={2} mb={4}>
      <Grid item md={4}>
        <Typography fontWeight="bold" fontSize={20}>
          {title}
        </Typography>
      </Grid>
      <Grid item md={8}>
        <Typography fontSize={20}>{value}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileDetails;
