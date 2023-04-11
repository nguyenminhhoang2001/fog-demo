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
export default function Product() {
  const [data, setData] = React.useState();
  const [pageData, setPageData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [dataEdit, setDataEdit] = React.useState();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [onDelete, setOnDelete] = React.useState(false);
  React.useEffect(() => {
    getAll();
    getByPage();
  }, [page, onDelete]);
  const getAll = async () => {
    let res = await ProductApi.getAllProduct();
    setData(res);
  };
  const getByPage = async () => {
    let res = await ProductApi.getProductByPage(page);
    setPageData(res);
  };
  const deleteProduct = async (id) => {
    let res = await ProductApi.deleteProduct(id);
    setOnDelete(!onDelete);
  };
  const onEdit = (id) => {
    const arr = data.filter((i) => i.id == id);
    setDataEdit(arr[0]);
    setOpenEdit(!openEdit);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cb = (value) => {
    setOpenEdit(value);
  };
  return (
    <>
      <div className="dialog">
        <FullScreenDialog openEdit={openEdit} dataEdit={dataEdit} cb={cb} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="id" align="left">
                id
              </TableCell>
              <TableCell className="name" align="left">
                Name Product
              </TableCell>
              <TableCell className="depcription" align="left">
                Depcription
              </TableCell>
              <TableCell className="price" align="left">
                Price
              </TableCell>
              <TableCell className="image" align="left">
                Image
              </TableCell>
              <TableCell className="action" align="left">
                Action
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
                      Edit
                    </Button>
                    <div style={{ display: "flex" }}>
                      <Button
                        size="small"
                        sx={{
                          color: "black",
                          border: "1px solid black",
                        }}
                        variant="outlined"
                        onClick={handleClickOpen}
                      >
                        Delete
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Delete account"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this account?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Disagree</Button>
                          <Button
                            onClick={() => {
                              deleteProduct(item.id);
                            }}
                            autoFocus
                          >
                            Agree
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
    </>
  );
}
