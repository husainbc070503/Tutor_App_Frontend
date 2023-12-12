import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import EditIcon from "@mui/icons-material/Edit";
import TextFieldInput from "../components/TextField";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, handleUpdate } = useGlobalContext();
  const [updateUser, setUpdateUser] = useState();
  const [loading, setLoading] = useState(false);

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
        toast.success("Profile Picture Updated!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setUpdateUser({ ...updateUser, avatar: finalRes.url });
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

  const handleChange = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  useEffect(() => {
    setUpdateUser(user?.user);
  }, [user]);

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography
          color="secondary"
          fontSize={34}
          fontWeight="bold"
          mb={1}
          textAlign="center"
        >
          Update Profile
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6}>
            <div className="rounded rounded-circle postition-relative profile-container">
              <img
                className="rounded rounded-circle"
                src={updateUser?.avatar}
                alt={updateUser?.name}
              />
              <label htmlFor="update-image">
                <EditIcon color="primary" className="edit-icon" />
              </label>
              <input
                type="file"
                id="update-image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </div>
          </Grid>
          <Grid item md={6}>
            <TextFieldInput
              title="Name"
              type="text"
              others="name"
              value={updateUser?.name}
              onChange={handleChange}
            />
            <TextFieldInput
              title="Email"
              type="email"
              others="email"
              value={updateUser?.email}
              onChange={handleChange}
            />
            <Button
              color="secondary"
              variant="contained"
              className="mt-3"
              onClick={() => handleUpdate(updateUser, updateUser?._id)}
              disabled={loading}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UpdateProfile;
