import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import Home from "./page/home/Home";
import Register from "./page/register/Register";
import Manager from "./page/manager/Manager";
import Login from "./page/login/Login";
import Account from "./page/account/Account";
import Product from "./page/product/Product";
import Subproduct from "./page/subproduct/Subproduct";
import Showproduct from "./page/showproduct/Showproduct";
import Cart from "./page/cart/Cart";
import Setting from "./page/setting/Setting";
import Profile from "./page/profile/Profile";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/:id", element: <Subproduct /> },
        { index: true, element: <Showproduct /> },
        { path: "profile", element: <Profile /> },
        { path: "cart", element: <Cart /> },
        { path: "setting", element: <Setting /> },
      ],
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
