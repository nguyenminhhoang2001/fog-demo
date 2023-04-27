import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { decre, deleteProduct, incre } from "../../featue/redux/cartSlice";
const CartDesktop = () => {
  const dispatch = useDispatch();
  const { item, totalPrice } = useSelector((state) => state.cart);
  const [mode, setMode] = React.useState("");
  React.useEffect(() => {
    const mode = localStorage.getItem("mode");
    mode == "" ? setMode("black") : setMode("white");
  }, []);
  return (
    <div>
      {item.map((item) => (
        <Box sx={{ flexGrow: 1, marginTop: "20px" }} key={item.id}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img
                style={{ width: "100%", height: "500px" }}
                src={item.image}
              ></img>
            </Grid>
            <Grid item xs={3}>
              <div style={{ marginTop: "230px", color: mode }}>
                <div>{item.name}</div>
                <div style={{ color: "red" }}>
                  {item.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "500px",
                lineHeight: "500px",
              }}
            >
              <Grid item xs={4}>
                <Button
                  onClick={() => {
                    dispatch(decre(item));
                  }}
                  size="small"
                  sx={{ color: { mode }, border: `1px solid ${mode}` }}
                >
                  -
                </Button>
              </Grid>
              <Grid item xs={4} sx={{ color: mode }}>
                {item.quantity}
              </Grid>
              <Grid item xs={4}>
                <Button
                  onClick={() => {
                    dispatch(incre(item));
                  }}
                  size="small"
                  sx={{ color: { mode }, border: `1px solid ${mode}` }}
                >
                  +
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ color: { mode }, height: "500px", lineHeight: "500px" }}
            >
              <Button
                onClick={() => {
                  dispatch(deleteProduct(item));
                }}
                sx={{ color: { mode }, border: `1px solid ${mode}` }}
                size="small"
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          color: mode,
          marginRight: "20px",
        }}
      >
        <p>{`thành tiền:${totalPrice.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}`}</p>
      </div>
    </div>
  );
};

export default CartDesktop;
