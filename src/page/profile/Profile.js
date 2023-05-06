import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./profile.scss";
import useResize from "../../hooks/useResize";
const Profile = () => {
  const [user, setUser] = React.useState();
  const users = {
    email: "guest",
    name: "guest",
    role: "admin",
    avata:
      "https://thumbs.dreamstime.com/b/guest-avatar-vector-illustration-default-male-profile-icon-image-profile-guest-avatar-vector-illustration-default-male-profile-182095612.jpg",
  };
  const size = useResize();
  React.useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const obj = JSON.parse(localStorage.getItem("account"));
    console.log(obj);
    obj == undefined ? setUser(users) : setUser(obj?.user);
  };
  return (
    <>
      {size.with > 768 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg"></img>
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
      ) : (
        <div>
          <img
            style={{ width: "100%", height: "500px" }}
            src="https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector.jpg"
          ></img>
          <div style={{ textAlign: "center" }}>
            <p>
              email: <span>{user?.email}</span>
            </p>
            <p>
              name: <span>{user?.name}</span>
            </p>
            <p>
              role: <span>{user?.role}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
