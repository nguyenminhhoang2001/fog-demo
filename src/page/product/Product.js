import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./product.scss";
import { ProductApi } from "../../API/productApi";
import FullScreenDialog from "./Dialog";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CustomizedSnackbars from "../manager/AlertAdd";
import { useTranslation } from "react-i18next";

export default function Product() {
  const [data, setData] = React.useState();
  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [dataEdit, setDataEdit] = React.useState();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [onDelete, setOnDelete] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const { t } = useTranslation();

  React.useEffect(() => {
    getAll();
    getByPage();
  }, [page, onDelete, add]);
  const getAll = async () => {
    let res = await ProductApi.getAllProduct();
    setData(res);
  };
  const getByPage = async () => {
    let res = await ProductApi.getProductByPage(page);
    setPageData(res);
  };
  const deleteProduct = async () => {
    let res = await ProductApi.deleteProduct(id);
    setOpenDialog(false);
    setOnDelete(!onDelete);
    handleClick();
  };
  const onEdit = (id) => {
    const arr = data.filter((i) => i.id == id);
    setDataEdit(arr[0]);
    setOpenEdit(!openEdit);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };
  const cb = () => {
    setOpenEdit(false);
  };
  const cbAdd = (value) => {
    setAdd(value);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <div className="dialog">
        <FullScreenDialog
          openEdit={openEdit}
          dataEdit={dataEdit}
          cb={cb}
          cbAdd={cbAdd}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="id" align="left">
                Id
              </TableCell>
              <TableCell className="name" align="left">
                {t("nameProduct")}
              </TableCell>
              <TableCell className="depcription" align="left">
                {t("depcription")}
              </TableCell>
              <TableCell className="price" align="left">
                {t("price")}
              </TableCell>
              <TableCell className="image" align="left">
                {t("image")}
              </TableCell>
              <TableCell className="action" align="left">
                {t("action")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.depcription}</TableCell>
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="left">{item.image}</TableCell>
                <TableCell align="left">
                  <div className="action">
                    <Button
                      size="small"
                      sx={{
                        color: "black",
                        border: "1px solid black",
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        onEdit(item.id);
                      }}
                    >
                      {t("edit")}
                    </Button>
                    <div style={{ display: "flex" }}>
                      <Button
                        size="small"
                        sx={{
                          color: "black",
                          border: "1px solid black",
                        }}
                        variant="outlined"
                        onClick={() => {
                          handleClickOpen();
                          setId(item.id);
                        }}
                      >
                        {t("delete")}
                      </Button>
                      <Dialog
                        open={openDialog}
                        onClose={handleClickClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {t("Delete product")}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {t("textDeleteProduct")}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            sx={{ color: "black", border: "1px solid black" }}
                            onClick={handleClickClose}
                          >
                            {t("Disagree")}
                          </Button>
                          <Button
                            sx={{ color: "black", border: "1px solid black" }}
                            onClick={() => {
                              deleteProduct();
                            }}
                            autoFocus
                          >
                            {t("Agree")}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(data?.length / 10)}
            onChange={(e, p) => {
              setPage(p);
            }}
          />
        </Stack>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {t("Delete successfully")}
          </Alert>
        </Snackbar>
      </Stack>
      {add == true && <CustomizedSnackbars cbAdd={cbAdd} />}
    </>
  );
}
