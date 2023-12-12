import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Visibility } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";
import AssignGrade from "./AssignGrade";
import SearchBox from "../components/SearchBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  maxWidth: "95%",
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
};

const StudentsModal = ({ students, teacher, lesson }) => {
  const [open, setOpen] = React.useState(false);
  const { grades } = useGlobalContext();
  const [search, setSearch] = React.useState("");

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Tooltip title="View Students">
          <Visibility />
        </Tooltip>
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item md={6} xs={12}>
              <Typography fontSize={20} fontWeight="bold">
                Students List
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <SearchBox
                title="Student"
                search={search}
                handleChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </Grid>
          </Grid>
          <TableContainer className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  {["Sr.No.", "Profile", "Name", "Email", "Action"].map(
                    (item, index) => (
                      <TableCell
                        key={index}
                        className={`text-${
                          index === 0 || index === 1 || index === 4
                            ? "center"
                            : "left"
                        } fw-bold fs-6`}
                      >
                        {item}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  ?.filter((item) => item?.name?.toLowerCase().includes(search))
                  ?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {index + 1}.
                        </TableCell>
                        <TableCell>
                          <Avatar
                            src={item?.avatar}
                            alt={item?.name}
                            className="d-block mx-auto"
                          />
                        </TableCell>
                        <TableCell className="fs-6">{item?.name}</TableCell>
                        <TableCell className="fs-6">{item?.email}</TableCell>
                        <TableCell className="fs-6 text-center">
                          <AssignGrade
                            teacher={teacher}
                            lesson={lesson}
                            grades={grades}
                            studentId={item?._id}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default StudentsModal;
