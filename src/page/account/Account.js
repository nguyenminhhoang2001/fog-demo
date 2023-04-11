import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { accountApi } from "../../API/accountApi";
import { Alert, Button, Pagination, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./account.scss";
export default function Account() {
  const [page, setPage] = React.useState(1);
  const [deleteAcc, setDeleteAcc] = React.useState(true);
  const [pageData, setPageData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getAll();
    getByPage();
  }, [page, deleteAcc, role]);
  const getAll = async () => {
    let res = await accountApi.getAllAccount();
    setData(res);
  };
  const getByPage = async () => {
    let res = await accountApi.getAccountByPage(page);
    setPageData(res);
  };
  const deleteAccount = async (id) => {
    let res = await accountApi.deleteAccount(id);
    setDeleteAcc(!deleteAcc);
    setOpenDialog(false);
    setOpen(true);
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (event) => {
    const acc = data.filter((i) => i.id == event.target.name);
    acc[0].role = event.target.value;
    changeRole(event.target.name, acc[0]);
  };
  const changeRole = async (id, params) => {
    let res = await accountApi.updateRole(id, params);
    setRole(!role);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="id" align="left">
                id
              </TableCell>
              <TableCell className="name" align="left">
                name
              </TableCell>
              <TableCell className="email" align="left">
                email
              </TableCell>
              <TableCell className="password" align="left">
                password
              </TableCell>
              <TableCell className="role" align="left">
                role
              </TableCell>
              <TableCell className="avata" align="left">
                avata
              </TableCell>
              <TableCell className="action" align="left">
                action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((account) => (
              <TableRow
                key={account.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{account.id}</TableCell>
                <TableCell align="left">{account.name}</TableCell>
                <TableCell align="left">{account.email}</TableCell>
                <TableCell align="left">{account.password}</TableCell>
                <TableCell align="left">
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        role
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={account.role}
                        label="role"
                        onChange={handleChange}
                        name={account.id}
                      >
                        <MenuItem value={"admin"}>admin</MenuItem>
                        <MenuItem value={"user"}>user</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </TableCell>
                <TableCell align="left">{account.avata}</TableCell>
                <TableCell align="left">
                  <div>
                    <Button
                      sx={{ color: "black", border: "1px solid black" }}
                      variant="text"
                      onClick={handleClickOpen}
                      size="small"
                    >
                      Delete
                    </Button>
                    <Dialog
                      open={openDialog}
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
                        <Button
                          sx={{ color: "black", border: "1px solid black" }}
                          onClick={handleClose}
                        >
                          Disagree
                        </Button>
                        <Button
                          sx={{ color: "black", border: "1px solid black" }}
                          onClick={() => {
                            deleteAccount(account.id);
                          }}
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
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
            count={Math.ceil(data.length / 10)}
            color="primary"
            onChange={(e, page) => {
              setPage(page);
            }}
          />
        </Stack>
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            delete successfully
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
