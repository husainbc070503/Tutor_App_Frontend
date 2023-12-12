import { Button, Grid, Typography } from "@mui/material";
import React from "react";

const AuthButtons = ({ openReg, setOpenReg, loading, handleSubmit }) => {
  return (
    <Grid container spacing={2} my={3} alignItems="center">
      <Grid item md={6} xs={6}>
        <Button
          color="secondary"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          {openReg ? "Register " : "Login"}
        </Button>
      </Grid>
      <Grid item md={6} xs={6}>
        <Typography
          color="GrayText"
          fontSize={16}
          onClick={() => setOpenReg(!openReg)}
          sx={{ cursor: "pointer" }}
          textAlign="right"
        >
          {openReg
            ? "Account exists? Login"
            : "Don't have an account? Register"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AuthButtons;
