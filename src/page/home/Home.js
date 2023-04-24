import React from "react";
import useResize from "../../hooks/useResize";
import "./home.scss";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Home = () => {
  const size = useResize();

  return (
    <>
      <div className="home">
        {size.with > 900 ? <HeaderDesktop /> : <HeaderMobile />}
        <Outlet />
        <Footer size={size} />
      </div>
    </>
  );
};
export default Home;
