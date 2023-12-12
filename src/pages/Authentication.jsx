import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginImg from "../assets/login-img.jpg";
import RegisterImg from "../assets/register-img.jpeg";
import TextFieldInput from "../components/TextField";
import PasswordField from "../components/PasswordField";
import RadioField from "../components/RadioField";
import AuthButtons from "../components/AuthButtons";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  role: "",
  avatar: "",
};

const Authentication = () => {
  const [openReg, setOpenReg] = useState(false);
  const [details, setDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { registerUser, loginUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleDetails = (e) => {
    console.log(e.target.name, e.target.value);
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleUpload = async (file) => {
    setLoading(true);
    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "tutor_app");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Profile Picture Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setDetails({ ...details, avatar: finalRes.url });
      } else {
        toast.error("Failed to upload image! Try again later!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (openReg) {
      if (details.password !== details.cpassword) {
        toast.error("Mismatch password and confirm password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
        return;
      }
    }

    const data = openReg
      ? await registerUser(details)
      : await loginUser(details);

    if (data.success && openReg) {
      toast.success("Registration Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setOpenReg(!openReg);
      setDetails(initialState);
    } else if (data.success && !openReg) {
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      localStorage.setItem("tutor_user", JSON.stringify(data.user));
      setOpenReg(!openReg);
      navigate("/");
      setDetails(initialState);
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid container spacing={8}>
          <Grid item md={5} xs={12}>
            <img
              src={openReg ? RegisterImg : LoginImg}
              alt="image"
              className={!openReg ? "auth-image" : "auth-image-low-ht"}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography
              textAlign="center"
              fontSize={40}
              fontWeight="bold"
              color="primary"
            >
              {openReg ? "REGISTER" : "LOGIN"}
            </Typography>
            <Box padding={4} mt={2}>
              {openReg && (
                <TextFieldInput
                  title="Name"
                  type="name"
                  others="name"
                  value={details.name}
                  onChange={handleDetails}
                  autoFocus={openReg && true}
                />
              )}
              <TextFieldInput
                title="Email"
                type="email"
                others="email"
                value={details.email}
                onChange={handleDetails}
                autoFocus={!openReg && true}
              />
              <PasswordField
                title="Password"
                others="password"
                value={details.password}
                onChange={handleDetails}
              />
              {openReg && (
                <>
                  <PasswordField
                    title="Confirm Password"
                    others="cpassword"
                    value={details.cpassword}
                    onChange={handleDetails}
                  />
                  <TextFieldInput
                    title="Profile Pic"
                    type="file"
                    others="profile"
                    onChange={(e) => handleUpload(e.target.files[0])}
                  />
                </>
              )}
              <RadioField
                name="role"
                value={details.role}
                onChange={handleDetails}
              />
              <AuthButtons
                openReg={openReg}
                setOpenReg={setOpenReg}
                loading={loading}
                handleSubmit={handleSubmit}
              />
              {!openReg && <ForgotPasswordModal />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Authentication;
