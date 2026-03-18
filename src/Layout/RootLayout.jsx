import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Logo from "../Component/Logo/Logo";
import Navbar2 from "../pages/Shared/Navbar/Navbar2";
import Footer from "../pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      {/* <Logo></Logo> */}
      <Navbar></Navbar>
      {/* <Navbar2></Navbar2> */}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
