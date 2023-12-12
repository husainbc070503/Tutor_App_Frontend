import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
  maxWidth: "95%",
};

const EditLessonModal = ({ lesson, lessonId }) => {
  const [open, setOpen] = React.useState(false);
  const [editlesson, setEditLesson] = React.useState(lesson);
  const { users, updateLesson } = useGlobalContext();
  const teachers = users?.filter((item) => item?.role === "teacher");

  const handleChange = (e) =>
    setEditLesson({ ...editlesson, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    updateLesson(editlesson, lessonId);
    setOpen(false);
  };

  return (
    <div>
      <EditIcon
        className="fs-6"
        onClick={() => setOpen(true)}
        color="secondary"
        sx={{ cursor: "pointer" }}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={4} fontSize={23} fontWeight="bold">
            Update Lesson
          </Typography>
          <Grid container spacing={4} mb={4}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                name="subject"
                label="Subject"
                value={editlesson.subject}
                onChange={handleChange}
                autoFocus
                fullWidth
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="number"
                name="chapter"
                label="Chapter No."
                value={editlesson.chapter}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={4} mb={4}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                name="title"
                label="Title"
                fullWidth
                value={editlesson.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="teacher">Teacher</InputLabel>
                <Select
                  labelId="teacher"
                  name="teacher"
                  label="Teacher"
                  value={editlesson.teacher}
                  onChange={handleChange}
                  required
                >
                  {teachers?.map((item) => (
                    <MenuItem value={item?._id} key={item?._id}>
                      <Typography ml={2}>{item?.name}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditLessonModal;
