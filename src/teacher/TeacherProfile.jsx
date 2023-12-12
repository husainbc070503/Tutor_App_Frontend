import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import ProfileDetails from "../components/ProfileDetails";
import { Link } from "react-router-dom";

const TeacherProfile = () => {
  const { user } = useGlobalContext();

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography
          fontSize={30}
          color="secondary"
          textAlign="center"
          fontWeight="bold"
          mb={2}
        >
          My Profile
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6} textAlign="end">
            <div className="img-container ">
              <img src={user?.user?.avatar} alt={user?.user?.name} className="rounded rounded-circle" />
            </div>
          </Grid>
          <Grid item md={6}>
            <ProfileDetails title="Name" value={user?.user?.name} />
            <ProfileDetails title="Email" value={user?.user?.email} />
            <ProfileDetails
              title="Role"
              value={`${user?.user?.role[0].toUpperCase()}${user?.user?.role.substring(
                1
              )}`}
            />
            <Grid container spacing={2} mt={3} alignItems="center">
              {[
                { title: "Lessons", link: "teacherLessons", color: "primary" },
                { title: "Grades", link: "teacherGrading", color: "secondary" },
              ].map((item) => (
                <Grid item md={3}>
                  <Link to={item.link}>
                    <Button variant="contained" color={item.color}>
                      {item.title}
                    </Button>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TeacherProfile;
