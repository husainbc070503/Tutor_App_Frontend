import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import Heading from "../components/Heading";
import UpdateGrading from "./UpdateGrading";
import { useGlobalContext } from "../contexts/AppContext";
import SearchBox from "../components/SearchBox";

const TeacherGrading = () => {
  const { grades, user } = useGlobalContext();
  const myGrades = grades?.filter(
    (grade) => grade?.teacher?._id === user?.user?._id
  );
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item md={6} xs={12}>
            <Heading
              title="Grades Assigned By Me"
              icon={<i className="fa-solid fa-star text-dark icon" />}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SearchBox
              title="Student"
              search={search}
              handleChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
        </Grid>
        <TableContainer className="mt-4 TableContainer">
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
                    key={index}
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
              {myGrades
                ?.filter((item) =>
                  item?.student?.name?.toLowerCase().includes(search)
                )
                ?.map((item, index) => {
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
                        <UpdateGrading
                          grade={item?.grade}
                          gradeId={item?._id}
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

export default TeacherGrading;
