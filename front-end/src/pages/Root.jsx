import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Outlet } from "react-router-dom";

const Root = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ flexGrow: "1", minHeight: "900px" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
