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
} from "@mui/material";
import React, { useState } from "react";
import Heading from "../components/Heading";
import { useGlobalContext } from "../contexts/AppContext";
import SearchBox from "../components/SearchBox";

const Teachers = () => {
  const { users } = useGlobalContext();
  const teachers = users?.filter((user) => user?.role === "teacher");
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="lg" className="container">
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
              title="Teachers"
              icon={
                <i className="fa-solid fa-chalkboard-user text-dark icon" />
              }
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <SearchBox
              title="Teacher"
              search={search}
              handleChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
        </Grid>
        <TableContainer className="mt-4 TableContainer">
          <Table>
            <TableHead>
              <TableRow>
                {["Sr. No.", "Profile", "Name", "Email"].map((item, index) => (
                  <TableCell
                    className={`fs-5 fw-bold text-${
                      index === 1 || index === 0 ? "center" : "left"
                    }`}
                    key={item}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers
                ?.filter((item) => item?.name?.toLowerCase().includes(search))
                ?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="text-center fs-6">
                        {index + 1}.
                      </TableCell>
                      <TableCell>
                        <Avatar
                          className="d-block mx-auto"
                          src={item?.avatar}
                          alt={item?.name}
                        />
                      </TableCell>
                      {[item?.name, item?.email].map((e) => (
                        <TableCell key={e} className="text-left fs-6">
                          {e}
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

export default Teachers;
