import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useGlobalContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Heading from "../components/Heading";

const AdminDash = () => {
  const { users, lessons, grades } = useGlobalContext();
  const condition = (color) => color === "dark" || color === "success";
  const data = [
    {
      title: "Teachers",
      length: users?.filter((user) => user.role === "teacher").length,
      icon: <i className="fa-solid fa-chalkboard-user"></i>,
      color: "success",
      link: "teachers",
    },
    {
      title: "Students",
      length: users?.filter((user) => user.role === "student").length,
      icon: <i className="fa-solid fa-graduation-cap"></i>,
      color: "dark",
      link: "students",
    },
    {
      title: "Lessons",
      length: lessons?.length,
      icon: <i className="fa-solid fa-book"></i>,
      color: "info",
      link: "lessons",
    },
    {
      title: "Grades",
      length: grades?.length,
      icon: <i className="fa-solid fa-star"></i>,
      color: "warning",
      link: "grades",
    },
  ];

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Heading
          title="Dashboard"
          icon={<DashboardIcon className="dash-icon" />}
        />
        <Grid container rowGap={6} columnSpacing={4} my={3}>
          {data.map((item) => {
            const { title, length, icon, color, link } = item;
            return (
              <Grid key={title} item md={6} xs={12}>
                <div
                  className={`dash-card shadow shadow-lg bg-${color} rounded-2 px-4 py-3 position-relative`}
                >
                  <div className="inner">
                    <Typography
                      fontSize={40}
                      fontWeight="bold"
                      mb={1}
                      className={condition(color) && "text-white"}
                    >
                      {length}
                    </Typography>
                    <Typography
                      fontSize={20}
                      className={condition(color) && "text-white"}
                    >
                      {title}
                    </Typography>
                  </div>
                  <div
                    className={`
                      ${condition(color) && "text-white"}
                      position-absolute top-50 end-0 translate-middle fs-1`}
                  >
                    {icon}
                  </div>
                  <Link
                    to={link}
                    className={`dash-link mt-2 text-${
                      condition(color) ? "warning" : "danger"
                    }`}
                  >
                    <Typography mr={1} fontWeight="bold">
                      More Info
                    </Typography>
                    <ArrowRightAltIcon />
                  </Link>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDash;
