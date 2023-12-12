import {
  Avatar,
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Heading from "../components/Heading";
import AddLessonModal from "../components/AddLessonModal";
import { useGlobalContext } from "../contexts/AppContext";
import ViewStudentsModal from "../components/ViewStudentsModal";
import EditLessonModal from "../components/EditLessonModal";
import DeleteIcon from "@mui/icons-material/Delete";

const Lessons = () => {
  const { lessons, deleteLesson } = useGlobalContext();
  const tutor = (img, name) => (
    <Grid container alignItems="center">
      <Grid item md={2} xs={12}>
        <Avatar src={img} alt={name} className="d-block mx-auto" />
      </Grid>
      <Grid item md={10} xs={12} textAlign="start">
        <Typography ml={2}>{name}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid container>
          <Grid item md={6}>
            <Heading
              title="Lessons"
              icon={<i className="fa-solid fa-book text-dark icon" />}
            />
          </Grid>
          <Grid item md={6} textAlign="end">
            <AddLessonModal />
          </Grid>
        </Grid>
        <TableContainer className="mt-4 TableContainer">
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr.No.",
                  "Subject",
                  "Chapter No.",
                  "Description",
                  "Teacher",
                  "Students",
                  "Action",
                ].map((item, index) => (
                  <TableCell
                    className={`fw-bold fs-5 text-${
                      index === 3 || index === 1 || index === 4
                        ? "left"
                        : "center"
                    }`}
                    key={index}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    {[
                      `${index + 1}.`,
                      item?.subject,
                      item?.chapter,
                      `${item?.title.substring(0, 22)}${
                        item?.title.length > 22 ? "..." : ""
                      }`,
                      tutor(item?.teacher?.avatar, item?.teacher?.name),
                    ].map((e, ind) => (
                      <TableCell
                        key={ind}
                        className={`text-${
                          ind === 3 || ind === 1 ? "left" : "center"
                        } fs-6`}
                      >
                        {e}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <ViewStudentsModal
                        students={item?.students}
                        lessonId={item?._id}
                      />
                    </TableCell>
                    <TableCell>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item md={6} xs={6} textAlign="end">
                          <EditLessonModal lesson={item} lessonId={item?._id} />
                        </Grid>
                        <Grid item md={6} xs={6} textAlign="start">
                          <DeleteIcon
                            color="error"
                            className="ml-2 fs-6 d-inline-block"
                            onClick={() => deleteLesson(item?._id)}
                            sx={{ cursor: "pointer" }}
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Lessons;
