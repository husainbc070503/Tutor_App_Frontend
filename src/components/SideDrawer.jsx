import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <React.Fragment>
        <Button onClick={() => setOpen(true)} color="inherit">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Button>
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(true)}
          PaperProps={{
            sx: {
              width: 240,
              padding: "2rem 10px",
            },
          }}
        >
          <Box
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
          >
            <CloseIcon className="close-icon" onClick={() => setOpen(false)} />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold">Admin Dashboard</Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              {["lessons", "grades", "teachers", "students"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index == 0 ? (
                          <i className="fa-solid fa-book" />
                        ) : index == 1 ? (
                          <i className="fa-solid fa-star" />
                        ) : index == 2 ? (
                          <i className="fa-solid fa-chalkboard-user" />
                        ) : (
                          <i className="fa-solid fa-graduation-cap" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        className="list-text"
                        onClick={() => navigate(`../${text}`)}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default SideDrawer;
