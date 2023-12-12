import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import HomeImg from "../assets/home-img.jpg";
import { text } from "../constants/Data";
import { useGlobalContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import AdminDash from "../admin/AdminDash";
import TeacherProfile from "../teacher/TeacherProfile";
import StudentProfile from "../student/StudentProfile";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        {user?.user?.role === "admin" ? (
          <AdminDash />
        ) : user?.user?.role === "teacher" ? (
          <TeacherProfile />
        ) : user?.user?.role === "student" ? (
          <StudentProfile />
        ) : (
          <Grid container spacing={8} py={4}>
            <Grid item md={5} xs={12}>
              <img src={HomeImg} alt="homeimage" className="home-img" />
            </Grid>
            <Grid item md={7} xs={12}>
              <Typography fontWeight="bold" fontSize={40} mb={2}>
                Tutor - Application
              </Typography>
              <Typography textAlign="justify" color="GrayText" mb={4}>
                {text}
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => navigate("../auth")}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Home;
