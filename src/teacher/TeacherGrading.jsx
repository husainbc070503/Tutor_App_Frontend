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
import UpdateGrading from "./UpdateGrading";
import { useGlobalContext } from "../contexts/AppContext";

const TeacherGrading = () => {
  const { grades, user } = useGlobalContext();
  const myGrades = grades?.filter(
    (grade) => grade?.teacher?._id === user?.user?._id
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Heading
          title="Grades Assigned By Me"
          icon={<i className="fa-solid fa-star text-dark icon" />}
        />
        <TableContainer className="mt-3 TableContainer">
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr.No.",
                  "Grade",
                  "Student Name",
                  "Student Email",
                  "Subject",
                  "Chapter",
                  "Action",
                ].map((item, index) => (
                  <TableCell
                    className={`fw-bold fs-5 text-${
                      index === 2 || index === 3 || index === 4
                        ? "left"
                        : "center"
                    }`}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {myGrades?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    {[
                      `${index + 1}.`,
                      item?.grade,
                      item?.student?.name,
                      item?.student?.email,
                      item?.lesson?.subject,
                      item?.lesson?.chapter,
                    ].map((item, ind) => (
                      <TableCell
                        key={ind}
                        className={`fs-6 text-${
                          ind === 2 || ind === 3 || ind === 4
                            ? "left"
                            : "center"
                        }`}
                      >
                        {item}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <UpdateGrading grade={item?.grade} gradeId={item?._id} />
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

export default TeacherGrading;
