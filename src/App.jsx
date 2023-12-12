import { ThemeProvider, createTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/AppBar";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./contexts/AppContext";
import Lessons from "./admin/Lessons";
import Grades from "./admin/Grades";
import Teachers from "./admin/Teachers";
import Students from "./admin/Students";
import TeacherLessons from "./teacher/TeacherLessons";
import TeacherGrading from "./teacher/TeacherGrading";
import StudentLessons from "./student/StudentLessons";
import StudentGrading from "./student/StudentGrading";
import UpdateProfile from "./pages/UpdateProfile";
import AdminProfile from "./admin/AdminProfile";

function App() {
  const theme = createTheme({
    palette: {
      primary: orange,
      secondary: green,
    },

    typography: {
      fontFamily: "Nova Square",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teacherLessons" element={<TeacherLessons />} />
            <Route path="/teacherGrading" element={<TeacherGrading />} />
            <Route path="/studentLessons" element={<StudentLessons />} />
            <Route path="/studentGrading" element={<StudentGrading />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
            <Route path="/adminProfile" element={<AdminProfile />} />
          </Routes>
          <ToastContainer transition={Zoom} />
        </AppContext>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
