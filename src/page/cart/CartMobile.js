import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const CartMobile = () => {
  const { item, totalPrice } = useSelector((state) => state.cart);
  return (
    <div>
      {item.map((item) => (
        <Box sx={{ flexGrow: 1, marginTop: "10px" }} key={item.id}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img
                style={{ width: "100%", height: "200px" }}
                src={item.image}
              ></img>
            </Grid>
            <Grid item xs={3} style={{ height: "200px", marginTop: "60px" }}>
              <div>
                <div> {item.name}</div>
                <div>
                  <div style={{ color: "red" }}>
                    {item.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                height: "200px",
                lineHeight: "200px",
              }}
            >
              <Grid item xs={4}>
                <div>
                  <p>-</p>
                </div>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "center", marginTop: "15px" }}>
                {item.quantity}
              </Grid>
              <Grid item xs={4}>
                <div>
                  <p>+</p>
                </div>
              </Grid>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ height: "200px", lineHeight: "200px", marginTop: "15px" }}
            >
              <Button size="small" sx={{ color: "black" }}>
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p>{`thành tiền:${totalPrice.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}`}</p>
      </div>
    </div>
  );
};

export default CartMobile;
