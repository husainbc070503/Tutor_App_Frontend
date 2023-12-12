import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "../contexts/AppContext";
import CheckIcon from "@mui/icons-material/Check";

const AssignGrade = ({ grades, lesson, teacher, studentId }) => {
  const [show, setShow] = React.useState(false);
  const [grade, setGrade] = React.useState("");
  const { assignGrade } = useGlobalContext();

  return grades?.find(
    (gd) => gd?.student?._id === studentId && gd?.lesson?._id === lesson
  ) ? (
    <Typography>Grade Assigned</Typography>
  ) : !show ? (
    <Button color="secondary" variant="contained" onClick={() => setShow(true)}>
      Assign Grade
    </Button>
  ) : (
    <Grid container spacing={2} alignItems="center">
      <Grid item md={8}>
        <TextField
          type="number"
          name="grade"
          label="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
          fullWidth
          autoFocus
        />
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Button
              color="secondary"
              onClick={() => assignGrade(grade, lesson, teacher, studentId)}
            >
              <CheckIcon />
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button onClick={() => setShow(false)}>
              <CloseIcon className="text-danger" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AssignGrade;
