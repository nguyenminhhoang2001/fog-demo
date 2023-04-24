import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ProductApi } from "../../API/productApi";
import { useNavigate } from "react-router-dom";
const ListProductMobile = (props) => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState();
  useEffect(() => {
    getByPage();
  }, [page]);
  const getByPage = async () => {
    let res = await ProductApi.getByPageMobile(page);
    setPageData(res);
  };
  const navigate = useNavigate();
  return (
    <>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {pageData?.map((item) => (
                  <Grid item xs={6} key={item.id} sx={{ marginTop: "20px" }}>
                    <Card
                      sx={{ height: "400px" }}
                      onClick={() => {
                        navigate(`/${item.id}`);
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="250"
                          image={item.image}
                          alt={item.description}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ color: "red" }}
                          >
                            {item.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(props.product.length / 4)}
                onChange={(e, p) => {
                  setPage(p);
                }}
              />
            </Stack>
          </div>
        </Container>
      </React.Fragment>
    </>
  );
};

export default ListProductMobile;
