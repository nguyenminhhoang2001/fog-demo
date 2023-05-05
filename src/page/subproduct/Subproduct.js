import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductApi } from "../../API/productApi";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useResize from "../../hooks/useResize";
import { useDispatch } from "react-redux";
import { buyProduct } from "../../featue/redux/cartSlice";
import "./subproduct.scss";
const Subproduct = () => {
  const [data, setData] = React.useState();
  const [mode, setMode] = React.useState();
  const [color, setColor] = React.useState("");
  const [account, setAccount] = React.useState();
  const dispatch = useDispatch();
  const size = useResize();
  React.useEffect(() => {
    getMode();
    getAll();
    const obj = JSON.parse(localStorage.getItem("account"));
    setAccount(obj == null ? true : false);
  }, []);
  const navigate = useNavigate();
  const getMode = () => {
    const mode = localStorage.getItem("mode");
    setMode(mode);
    handleChangeColor(mode);
  };
  const handleChangeColor = (mode) => {
    mode == "dark" ? setColor("white") : setColor("black");
  };

  const getAll = async () => {
    let res = await ProductApi.getAllProduct();
    setData(res);
  };
  const params = useParams();
  const item = data?.find((item) => item.id == params.id);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      {size.with > 768 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <img
                style={{ width: "100%", height: "100vh" }}
                src={item?.image}
              ></img>
            </Grid>
            <Grid item xs={4} className={`name ${mode}`}>
              <p>{item?.name}</p>
              <p style={{ color: "red", fontSize: "25px" }}>
                {item?.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                <Grid item xs={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Color
                      </InputLabel>
                      <Select
                        sx={{ border: `1px solid ${color}`, color: { color } }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Color"
                        onChange={handleChange}
                      >
                        <MenuItem value={"BEIGE"}>BEIGE</MenuItem>
                        <MenuItem value={"CEMENT HEATHER"}>
                          CEMENT HEATHER
                        </MenuItem>
                        <MenuItem value={"BLACK"}>BLACK</MenuItem>
                        <MenuItem value={"GREY HEATHER"}>GREY HEATHER</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Size
                      </InputLabel>
                      <Select
                        sx={{ border: `1px solid ${color}`, color: { color } }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Size"
                        onChange={handleChange}
                      >
                        <MenuItem value={46}>46</MenuItem>
                        <MenuItem value={48}>48</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={52}>52</MenuItem>
                        <MenuItem value={54}>54</MenuItem>
                        <MenuItem value={56}>56</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Stack spacing={2} direction="row" sx={{ marginTop: "40px" }}>
                <Button
                  onClick={() => {
                    account == true
                      ? navigate("/login")
                      : dispatch(buyProduct(item));
                  }}
                  className={`btn ${mode}`}
                  sx={{
                    height: "60px",
                    color: { color },
                    border: `1px solid ${color}`,
                    width: "100%",
                  }}
                  variant="text"
                >
                  ADD TO CARD
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div>
          <img
            src={item?.image}
            style={{ height: "100vh", width: "100%" }}
          ></img>
          <p>{item?.name}</p>
          <p style={{ color: "red", fontSize: "25px" }}>
            {item?.price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <Grid container spacing={2} sx={{ marginTop: "20px" }}>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Color</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Color"
                    onChange={handleChange}
                  >
                    <MenuItem value={"BEIGE"}>BEIGE</MenuItem>
                    <MenuItem value={"CEMENT HEATHER"}>CEMENT HEATHER</MenuItem>
                    <MenuItem value={"BLACK"}>BLACK</MenuItem>
                    <MenuItem value={"GREY HEATHER"}>GREY HEATHER</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Size"
                    onChange={handleChange}
                  >
                    <MenuItem value={46}>46</MenuItem>
                    <MenuItem value={48}>48</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={52}>52</MenuItem>
                    <MenuItem value={54}>54</MenuItem>
                    <MenuItem value={56}>56</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Stack spacing={2} direction="row" sx={{ marginTop: "40px" }}>
            <Button
              onClick={() => {
                account == true
                  ? navigate("/login")
                  : dispatch(buyProduct(item));
              }}
              sx={{
                height: "60px",
                color: "black",
                border: "1px solid black",
                width: "100%",
              }}
              variant="text"
            >
              ADD TO CARD
            </Button>
          </Stack>
        </div>
      )}
    </>
  );
};

export default Subproduct;
