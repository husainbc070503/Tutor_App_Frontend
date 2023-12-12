import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import PasswordField from "./PasswordField";
import { useGlobalContext } from "../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "95%",
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
};

const initialState = { email: "", otp: "", password: "", cpassword: "" };
const ForgotPasswordModal = () => {
  const [open, setOpen] = React.useState(false);
  const [openPass, setOpenPass] = React.useState(false);
  const [details, setDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const { sendEmail, handleUpdatePassword } = useGlobalContext();
  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  return (
    <div>
      <Button onClick={() => setOpen(true)} className="text-secondary">
        Forgot Password?
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={25} fontWeight="bold" mb={3}>
            {openPass ? "Update Password" : "Enter your Email Address"}
          </Typography>
          {!openPass ? (
            <TextField
              type="email"
              name="email"
              label="Email"
              value={details.email}
              onChange={handleChange}
              autoFocus
              fullWidth
            />
          ) : (
            <>
              <TextField
                type="number"
                name="otp"
                label="Otp"
                value={details.otp}
                onChange={handleChange}
                autoFocus
                fullWidth
                className="mb-4"
              />
              <PasswordField
                title="Password"
                others="password"
                value={details.password}
                onChange={handleChange}
              />
              <PasswordField
                title="Retype Password"
                others="cpassword"
                value={details.cpassword}
                onChange={handleChange}
              />
            </>
          )}
          <Button
            className="mt-3"
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={() =>
              openPass
                ? handleUpdatePassword(
                    details,
                    setOpen,
                    setOpenPass,
                    setLoading,
                    setDetails,
                    initialState
                  )
                : sendEmail(details, setOpenPass, setLoading)
            }
          >
            {openPass ? "Update Password" : "Send OTP"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotPasswordModal;
