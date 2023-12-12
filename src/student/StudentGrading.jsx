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
import { useGlobalContext } from "../contexts/AppContext";
import SearchBox from "../components/SearchBox";

const StudentGrading = () => {
  const { grades, user } = useGlobalContext();
  const myGrades = grades?.filter(
    (grade) => grade?.student?._id === user?.user?._id
  );
  const [search, setSearch] = useState("");

  return (
    <Container className="container" maxWidth="lg">
      <Box>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          mt={3}
        >
          <Grid item md={6} xs={12}>
            <Heading
              title="My Grading"
              icon={<i className="fa-solid fa-star text-dark icon" />}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SearchBox
              title="Lesson by Title"
              search={search}
              handleChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
          </Grid>
        </Grid>
        <TableContainer className="mt-3 TableContainer">
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr.No.",
                  "Grade",
                  "Given By (Teacher)",
                  "Chapter",
                  "Subject",
                  "Title",
                ].map((item, index) => (
                  <TableCell
                    key={index}
                    className={`fs-5 fw-bold text-${
                      index === 4 || index === 5 ? "left" : "center"
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
                  item?.lesson?.title?.toLowerCase().includes(search)
                )
                ?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      {[
                        `${index + 1}.`,
                        item?.grade,
                        item?.teacher?.name,
                        item?.lesson?.chapter,
                        item?.lesson?.subject,
                        item?.lesson?.title,
                      ].map((item, ind) => (
                        <TableCell
                          key={ind}
                          className={`fs-6 text-${
                            ind === 4 || ind === 5 ? "left" : "center"
                          }`}
                        >
                          {ind === 1 ? (
                            <span className="bg-success p-2 rounded rounded-2 text-light fw-bold">
                              {item}
                            </span>
                          ) : (
                            item
                          )}
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

export default StudentGrading;
