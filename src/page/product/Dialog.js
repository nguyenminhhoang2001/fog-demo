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
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { accountApi } from "../../API/accountApi";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [changeText, setChangeText] = React.useState(t("addProduct"));
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
  const schema = yup
    .object({
      name: yup.string().required(t("validateName")),
      depcription: yup.string().required(t("validateDepcription")),
      price: yup.string().required(t("validatePrice")),
      image: yup.string().required(t("validateImage")),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const toggle = () => {
    props.openEdit == false ? setOpen(false) : setOpen(true);
    props.openEdit == false
      ? setChangeText(t("addProduct"))
      : setChangeText(t("updateProduct"));
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
    setAdd({
      name: "",
      depcription: "",
      price: "",
      image: "",
    });
    setOpen(true);
  };
  const handleClose = () => {
    props.cb();
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

  const onSubmit = (data) => {
    if (props.openEdit == false) {
      addProduct({
        name: data.name,
        depcription: data.depcription,
        price: data.price,
        image: data.image,
      });
      setOpen(false);
      setAdd({
        name: "",
        depcription: "",
        price: "",
        image: "",
      });
      props.cb();
      props.cbAdd(true);
    } else {
      updateProduct(props.dataEdit.id, {
        name: data.name,
        depcription: data.depcription,
        price: data.price,
        image: data.image,
      });
      setAdd({
        name: "",
        depcription: "",
        price: "",
        image: "",
      });
      setOpen(false);
      props.cb();
      props.cbAdd(true);
    }
  };
  return (
    <div>
      <Button
        sx={{ color: "black", border: "1px solid black" }}
        onClick={handleClickOpen}
      >
        {t("addProduct")}
      </Button>
      <Dialog
        sx={{ opacity: 1 }}
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={add.name}
              id="name"
              label={t("nameProduct")}
              name="name"
              autoComplete="name"
              autoFocus
              {...register("name", {
                required: true,
              })}
              error={!!errors.name?.type}
              helperText={errors.name?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={add.depcription}
              name="depcription"
              label={t("depcription")}
              id="depcription"
              autoComplete="depcription"
              {...register("depcription", {
                required: true,
              })}
              error={!!errors.depcription?.type}
              helperText={errors.depcription?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={add.price}
              id="price"
              label={t("price")}
              type="number"
              name="price"
              autoComplete="price"
              autoFocus
              {...register("price", {
                required: true,
              })}
              error={!!errors.price?.type}
              helperText={errors.price?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={add.image}
              id="image"
              label={t("image")}
              name="image"
              autoComplete="image"
              autoFocus
              {...register("image", {
                required: true,
              })}
              error={!!errors.image?.type}
              helperText={errors.image?.message}
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
