import React, { useEffect, useState } from "react";
import useResize from "../../hooks/useResize";
import "./home.scss";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { change } = useSelector((state) => state.mode);

  const size = useResize();
  const [mode, setMode] = React.useState("");
  React.useEffect(() => {
    const mode = localStorage.getItem("mode");
    setMode(mode);
  }, [change]);
  return (
    <>
      <div className={`home ${mode}`}>
        {size.with > 900 ? <HeaderDesktop /> : <HeaderMobile />}
        <Outlet />
        <Footer size={size} />
      </div>
    </>
  );
};
export default Home;
