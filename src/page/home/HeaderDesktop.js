import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./header.scss";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
export default function BasicGrid() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const a = useSelector((state) => state.cart);
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          xs={4}
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          <ul className="menu">
            <li>
              <Link className="link">FEAR OF GOD</Link>
            </li>
            <li style={{ marginLeft: "20px" }}>
              <Link className="link">ESSENTIALS</Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={4} sx={{ margin: "auto" }}>
          <Link to={"/"} className="product">
            FEAR OF GOD
          </Link>
        </Grid>

        <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
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
}
