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

const Grades = () => {
  const { grades } = useGlobalContext();
  console.log(grades);

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Heading
          title="Grades"
          icon={<i className="fa-solid fa-star text-dark icon" />}
        />
        <TableContainer className="mt-4 TableContainer">
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr.No.",
                  "Grade",
                  "Given By (Teacher) ",
                  "To (Student)",
                  "Subject",
                  "Chapter",
                  "On",
                ].map((item, index) => (
                  <TableCell
                    className={`text-${
                      index === 0 || index === 1 || index === 5 || index === 6
                        ? "center"
                        : "left"
                    } fs-5 fw-bold`}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {grades?.map((item, index) => {
                return (
                  <TableRow key={index + 1}>
                    {[
                      `${index + 1}.`,
                      item?.grade,
                      item?.teacher?.name,
                      item?.student?.name,
                      item?.lesson?.subject,
                      item?.lesson?.chapter,
                      new Date(item?.createdAt).toDateString(),
                    ].map((item, ind) => (
                      <TableCell
                        key={ind}
                        className={`text-${
                          ind === 0 || ind === 1 || ind === 5 || ind === 6
                            ? "center"
                            : "left"
                        } fs-6`}
                      >
                        {item}
                      </TableCell>
                    ))}
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

export default Grades;
