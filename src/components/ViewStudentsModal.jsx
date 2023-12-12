import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Visibility } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";
import MultipleSelect from "./MultipleSelect";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "95%",
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
};

const ViewStudentsModal = ({ students, lessonId }) => {
  const [open, setOpen] = React.useState(false);
  const { users, addStudents, removeStudent } = useGlobalContext();
  const tempStudents = users?.filter((item) => item?.role === "student");
  const filteredStudents = tempStudents?.filter(
    (item) => !students?.find((student) => student?._id === item?._id)
  );

  const [show, setShow] = React.useState(false);
  const [addedStudents, setAddedStudents] = React.useState([]);

  const handleSubmit = async () => {
    const arr = [...new Set(addedStudents)];
    addStudents(arr, lessonId);
    setShow(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Visibility />
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container justifyItems="space-between" mb={2}>
            <Grid item md={6} xs={6}>
              <Typography fontSize={20} fontWeight="bold">
                Students List
              </Typography>
            </Grid>
            <Grid item md={6} xs={6} textAlign="end">
              {filteredStudents?.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShow(true)}
                >
                  Add More
                </Button>
              )}
            </Grid>
          </Grid>
          {show && (
            <Box className="my-3">
              <MultipleSelect
                students={filteredStudents}
                fromViewModal={true}
                addedStudents={addedStudents}
                setAddedStudent={setAddedStudents}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
              >
                Add Students
              </Button>
            </Box>
          )}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["Sr.No.", "Profile", "Name", "Email", "Remove"].map(
                    (item, index) => (
                      <TableCell
                        key={index}
                        className={`text-${
                          index === 0 || index === 1 ? "center" : "left"
                        } fw-bold fs-6`}
                      >
                        {item}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {students?.map((item, index) => {
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
                      {[item?.name, item?.email].map((item, ind) => (
                        <TableCell className="fs-6" key={ind}>
                          {item}
                        </TableCell>
                      ))}
                      <TableCell className="fs-6 text-center">
                        <DeleteIcon
                          color="error"
                          sx={{ cursor: "pointer" }}
                          onClick={() => removeStudent(item?._id, lessonId)}
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

export default ViewStudentsModal;
