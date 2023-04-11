import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import "./product.scss";
import { Box, TextField } from "@mui/material";
import { ProductApi } from "../../API/productApi";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [changeText, setChangeText] = React.useState("Add Product");
  const [reRender, setReRender] = React.useState(false);
  const [add, setAdd] = React.useState({
    name: "",
    depcription: "",
    price: "",
    image: "",
  });
  React.useEffect(() => {
    toggle();
    edit();
  }, [props.openEdit]);
  const toggle = () => {
    props.openEdit == false ? setOpen(false) : setOpen(true);
    props.openEdit == false
      ? setChangeText("Add Product")
      : setChangeText("Update Product");
  };
  const edit = () => {
    setAdd({
      name: props.dataEdit?.name,
      depcription: props.dataEdit?.depcription,
      price: props.dataEdit?.price,
      image: props.dataEdit?.image,
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log(props.dataEdit);
  const handleClose = () => {
    props.cb(false);
    setOpen(false);
    setAdd({
      name: "",
      depcription: "",
      price: "",
      image: "",
    });
  };
  const addProduct = async (params) => {
    let res = await ProductApi.AddProduct(params);
  };
  const updateProduct = async (id, params) => {
    let res = await ProductApi.updateProduct(id, params);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (props.openEdit == false) {
      addProduct({
        name: data.get("name"),
        depcription: data.get("depcription"),
        price: data.get("price"),
        image: data.get("image"),
      });
      setOpen(false);
      setAdd({
        name: "",
        depcription: "",
        price: "",
        image: "",
      });
      props.cb(false);
    } else {
      updateProduct(props.dataEdit.id, {
        name: data.get("name"),
        depcription: data.get("depcription"),
        price: data.get("price"),
        image: data.get("image"),
      });
      setOpen(false);
      setAdd({
        name: "",
        depcription: "",
        price: "",
        image: "",
      });
      props.cb(false);
    }
  };
  return (
    <div>
      <Button
        sx={{ color: "black", border: "1px solid black" }}
        onClick={handleClickOpen}
      >
        Add Product
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "black" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {changeText}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={add.name}
              id="name"
              label="Name Product"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={add.depcription}
              name="depcription"
              label="Depcription"
              id="depcription"
              autoComplete="depcription"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={add.price}
              id="price"
              label="Price"
              name="price"
              autoComplete="price"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={add.image}
              id="image"
              label="Image"
              name="image"
              autoComplete="image"
              autoFocus
            />

            <div className="btn">
              <Button
                type="submit"
                sx={{
                  color: "black",
                  border: "1px solid black",
                  width: "500px",
                  height: 50,
                  marginTop: "20px",
                }}
              >
                {changeText}
              </Button>
            </div>
          </Box>
        </List>
      </Dialog>
    </div>
  );
}
