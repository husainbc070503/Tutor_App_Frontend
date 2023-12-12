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
import { useGlobalContext } from "../contexts/AppContext";
import ClassMates from "./ClassMates";
import Heading from "../components/Heading";

const StudentLessons = () => {
  const { lessons, user } = useGlobalContext();
  const myLessons = lessons?.filter((lesson) =>
    lesson?.students?.find((student) => student?._id === user?.user?._id)
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Heading
          title="My Lessons"
          icon={<i className="fa-solid fa-book text-dark icon" />}
        />
      </Box>
      <TableContainer className="mt-3 TableContainer">
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sr.No.",
                "Subject",
                "Chapter",
                "Title",
                "Teacher",
                "Class Mates",
              ].map((item, index) => (
                <TableCell
                  key={index}
                  className={`fs-5 fw-bold text-${
                    index === 1 || index === 3 ? "left" : "center"
                  }`}
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
                    item?.teacher?.name,
                  ].map((item, ind) => (
                    <TableCell
                      key={ind}
                      className={`fs-6 text-${
                        ind === 1 || ind === 3 ? "left" : "center"
                      }`}
                    >
                      {item}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    <ClassMates
                      mates={myLessons?.map((lesson) => {
                        if (lesson?._id === item?._id) {
                          return lesson?.students?.filter(
                            (student) => student?._id !== user?.user?._id
                          );
                        }
                      })}
                      pos={index}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StudentLessons;
