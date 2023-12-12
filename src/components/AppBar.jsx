import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";

const Navbar = () => {
  const { user, handleLogout } = useGlobalContext();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {user?.user?.role === "admin" && <SideDrawer />}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Tutor-App
          </Typography>
          <List className="lists">
            <NavLink to="/" className="list-item link">
              Home
            </NavLink>
            {user?.user ? (
              <>
                <Button>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="user-profile" src={user?.user?.avatar} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {user?.user?.role === "admin" && (
                      <MenuItem onClick={handleCloseUserMenu}>
                        <NavLink to="adminProfile" className="link">
                          Profile
                        </NavLink>
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink to="updateProfile" className="link">
                        Update Account
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleLogout}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Button>
              </>
            ) : (
              <Button color="secondary" variant="contained">
                <NavLink to="auth" className="link">
                  Login
                </NavLink>
              </Button>
            )}
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
