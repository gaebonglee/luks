import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <div style={{ flexGrow: "1",minHeight: "800px" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
