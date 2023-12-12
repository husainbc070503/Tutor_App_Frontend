import {
  Avatar,
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

const Teachers = () => {
  const { users } = useGlobalContext();
  const teachers = users?.filter((user) => user?.role === "teacher");

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Heading
          title="Teachers"
          icon={<i className="fa-solid fa-chalkboard-user text-dark icon" />}
        />
        <TableContainer className="mt-4 TableContainer">
          <Table>
            <TableHead>
              <TableRow>
                {["Sr. No.", "Profile", "Name", "Email"].map((item) => (
                  <TableCell className="fs-5 fw-bold text-center" key={item}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers?.map((item, index) => {
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
                      <TableCell key={e} className="text-center fs-6">
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
