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
import MultipleSelect from "./MultipleSelect";

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

const initialState = {
  subject: "",
  chapter: "",
  title: "",
  teacher: "",
  students: [],
};

const AddLessonModal = () => {
  const [open, setOpen] = React.useState(false);
  const [lesson, setLesson] = React.useState(initialState);
  const { users, addLesson } = useGlobalContext();
  const teachers = users?.filter((item) => item?.role === "teacher");
  const students = users?.filter((item) => item?.role === "student");

  const handleChange = (e) =>
    setLesson({ ...lesson, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const tempStudents = [...new Set(lesson.students)];
    lesson.students = tempStudents;
    addLesson(lesson);
    setOpen(false);
    setLesson(initialState);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        color="secondary"
        variant="contained"
      >
        Add Lesson
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography mb={4} fontSize={23} fontWeight="bold">
            Add Lesson
          </Typography>
          <Grid container spacing={4} mb={4}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                name="subject"
                label="Subject"
                value={lesson.subject}
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
                value={lesson.chapter}
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
                value={lesson.title}
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
                  value={lesson.teacher}
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

          <MultipleSelect
            students={students}
            setLesson={setLesson}
            lesson={lesson}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddLessonModal;
