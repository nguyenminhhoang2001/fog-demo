import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Home from "./page/home/Home";
import Register from "./page/register/Register";
import Manager from "./page/manager/Manager";
import Login from "./page/login/Login";
import Account from "./page/account/Account";
import Product from "./page/product/Product";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "manager",
      element: <Manager />,
      children: [
        { index: true, element: <Account /> },
        { path: "product", element: <Product /> },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
