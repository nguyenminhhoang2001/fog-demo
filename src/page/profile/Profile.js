import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./profile.scss";
const Profile = () => {
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const obj = JSON.parse(localStorage.getItem("account"));
    setUser(obj?.user);
  };
  console.log(user);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src="https://vtv1.mediacdn.vn/zoom/700_438/2022/9/23/1652155217doan-gioi-thieu-teaser-avatar-2-tieu-de-ngay-phat-1663908206183474513814-crop-16639082132171187084960.png"></img>
          </Grid>
          <Grid item xs={6}>
            <div style={{ textAlign: "left" }}>
              <p>
                email:<span>{user?.email}</span>
              </p>
              <p>
                name:<span>{user?.name}</span>
              </p>
              <p>
                role:<span>{user?.role}</span>
              </p>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Profile;
