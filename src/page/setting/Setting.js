import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import i18next, { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../../featue/redux/modeSlice";

const Setting = () => {
  const [language, setLanguage] = React.useState("vi");
  const [mode, setMode] = useState("nomal");
  const [changeMode1, setChangeMode1] = useState("");
  const { change } = useSelector((state) => state.mode);
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    setMode(mode == "" ? "nomal" : "dark");
    mode == "" ? setChangeMode1("black") : setChangeMode1("white");
  }, [changeMode1, change]);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setLanguage(event.target.value);
    i18next.changeLanguage(event.target.value);
  };
  const handleChangeMode = (event) => {
    dispatch(changeMode());
    setMode(event.target.value);
    localStorage.setItem("mode", event.target.value == "nomal" ? "" : "dark");
  };
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ height: "100vh" }}>
          <div style={{ marginTop: "20px" }}>
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("mode")}
                </InputLabel>
                <Select
                  sx={{
                    color: changeMode1,
                    border: `1px solid ${changeMode1}`,
                  }}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={mode}
                  label={"mode"}
                  onChange={handleChangeMode}
                >
                  <MenuItem value={"nomal"}>Nomal</MenuItem>
                  <MenuItem value={"dark"}>Dark</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Box sx={{ width: "100%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("language")}
                </InputLabel>
                <Select
                  sx={{
                    color: changeMode1,
                    border: `1px solid ${changeMode1}`,
                  }}
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label={t("language")}
                  onChange={handleChange}
                >
                  <MenuItem value={"vi"}>vi</MenuItem>
                  <MenuItem value={"en"}>en</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Setting;
