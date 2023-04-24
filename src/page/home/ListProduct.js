import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ListProductDesktop from "./ListProductDesktop";
import useResize from "../../hooks/useResize";
import ListProductMobile from "./ListProductMobile";
const ListProduct = (props) => {
  const size = useResize();
  const { product, isLoading } = props;
  return (
    <>
      <p>ALL PRODUCT</p>
      {isLoading == true && (
        <Box
          sx={{
            height: "100vh",
            lineHeight: "100vh",
            whiteSpace: "nowrap",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {size.with > 768 ? (
        <ListProductDesktop product={product} />
      ) : (
        <ListProductMobile product={product} />
      )}
    </>
  );
};

export default ListProduct;
