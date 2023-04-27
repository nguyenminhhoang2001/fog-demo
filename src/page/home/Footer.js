import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "./header.scss";
import "./footer.scss";
import { useSelector } from "react-redux";

export default function Footer(props) {
  const [mode, setMode] = React.useState("");
  const { change } = useSelector((state) => state.mode);

  React.useEffect(() => {
    const mode = localStorage.getItem("mode");
    setMode(mode);
  }, [change]);
  return (
    <>
      {props.size.with > 768 ? (
        <div style={{ height: "30px", marginTop: "12px" }}>
          <Box sx={{ flexGrow: 1 }} className={`footer ${mode}`}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <p style={{ marginLeft: "-40px" }}>Join the Conversation</p>
                    <TextField
                      sx={{ marginTop: -3 }}
                      size="small"
                      id="email"
                      label="Email Address"
                      variant="standard"
                    />
                  </div>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <ul className="menufooter">
                  <li>
                    <p style={{ fontSize: "12px" }}>LOCATION: VIETNAM</p>
                  </li>
                  <li>
                    <p style={{ fontSize: "12px" }}>CONTACT</p>
                  </li>
                  <li>
                    <p style={{ fontSize: "12px" }}>CLIENT SERVICES</p>
                  </li>
                  <li>
                    <p style={{ fontSize: "12px" }}>LEGAL NOTICES</p>
                  </li>
                  <li>
                    <p style={{ fontSize: "12px" }}>SOCIAL</p>
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              justifyContent: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <p>Join the Conversation</p>
              <TextField
                sx={{ width: "100%" }}
                id="email"
                label="Email Address"
                variant="standard"
              />
            </div>
          </Box>
          <ul className="menufooterMB">
            <li>LOCATION: VIETNAM</li>
            <li>CONTACT</li>
            <li>CLIENT SERVICES</li>
            <li>LEGAL NOTICES</li>
            <li>SOCIAL</li>
          </ul>
        </div>
      )}
    </>
  );
}
