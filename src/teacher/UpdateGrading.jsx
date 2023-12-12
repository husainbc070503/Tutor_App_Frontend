import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useGlobalContext } from "../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "95%",
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
};

const UpdateGrading = ({ grade, gradeId }) => {
  const [updateGrading, setUpdateGrading] = React.useState(grade);
  const [open, setOpen] = React.useState(false);
  const { updateGrade } = useGlobalContext();

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <EditIcon color="secondary" sx={{ cursor: "pointer" }} />
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            fontWeight="bold"
            fontSize={20}
            mb={4}
          >
            Update Grade
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={10}>
              <TextField
                type="number"
                name="grade"
                id="grade"
                label="Grade"
                value={updateGrading}
                onChange={(e) => setUpdateGrading(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={2}>
              <Button
                color="secondary"
                onClick={() => updateGrade(updateGrading, gradeId, setOpen)}
              >
                <CheckIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateGrading;
