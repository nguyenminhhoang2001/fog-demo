import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./header.scss";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import ViewListIcon from "@mui/icons-material/ViewList";
import { useSelector } from "react-redux";

const HeaderMobile = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const a = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const item = [
    { name: "FEAR OF GOD", url: "#" },
    { name: "ESSENTIALS", url: "#" },
  ];
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {item.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText sx={{ textAlign: "center" }} primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: "white",
        flexGrow: 1,
        height: "50px",
        display: "flex",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            height: "50px",
            lineHeight: "50px",
          }}
        >
          <div>
            <React.Fragment key={"left"}>
              <Button
                onClick={toggleDrawer("left", true)}
                sx={{ color: "black" }}
              >
                <ViewListIcon />
              </Button>
              <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
              >
                <p style={{ textAlign: "center" }}>menu</p>
                {list("left")}
              </Drawer>
            </React.Fragment>
          </div>
        </Grid>
        <Grid item xs={8} style={{ height: "50px", lineHeight: "50px" }}>
          <Link to={"/"} className="product">
            FEAR OF GOD
          </Link>
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", height: "50px", lineHeight: "50px" }}>
            <Button
              onClick={() => {
                navigate("cart");
              }}
            >
              <Badge badgeContent={a?.item.length} color="primary">
                <LocalMallIcon sx={{ color: "black" }}></LocalMallIcon>
              </Badge>
            </Button>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Manager</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderMobile;
