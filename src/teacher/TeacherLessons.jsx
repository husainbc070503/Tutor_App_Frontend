import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Heading from "../components/Heading";
import { useGlobalContext } from "../contexts/AppContext";
import StudentsModal from "./StudentsModal";

const TeacherLessons = () => {
  const { user, lessons } = useGlobalContext();
  const myLessons = lessons?.filter(
    (lesson) => lesson?.teacher?._id === user?.user?._id
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Heading
          title="My Lessons"
          icon={<i className="fa-solid fa-book text-dark icon" />}
        />
        <TableContainer className="mt-3 TableContainer">
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr.No.",
                  "Subject",
                  "Chapter No.",
                  "Description",
                  "Students",
                ].map((item, index) => (
                  <TableCell
                    className={`fw-bold fs-5 text-${
                      index === 3 || index === 1 ? "left" : "center"
                    }`}
                    key={index}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {myLessons?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    {[
                      `${index + 1}.`,
                      item?.subject,
                      item?.chapter,
                      item?.title,
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
                      <StudentsModal
                        students={item?.students}
                        teacher={user?.user?._id}
                        lesson={item?._id}
                      />
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

export default TeacherLessons;
