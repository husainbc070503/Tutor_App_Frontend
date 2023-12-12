import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Visibility } from "@mui/icons-material";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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

const ClassMates = ({ mates, pos }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <Visibility color="secondary" />
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
            fontSize={22}
            fontWeight="bold"
            mb={2}
          >
            ClassMates
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["Sr.No.", "Profile", "Name", "Email"].map((item, index) => (
                    <TableCell
                      key={index}
                      className={`text-${
                        index === 0 || index === 1 ? "center" : "left"
                      } fw-bold fs-6`}
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {mates[pos]?.map((item, index) => {
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

export default ClassMates;
