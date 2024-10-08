import React from "react";
import MainHeader from "../layout/MainHeader";
import MainFooter from "../layout/MainFooter";
import { Outlet } from "react-router-dom";

const LayoutRoot: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "0 2rem",
        }}
      >
        <MainHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div style={{ flexGrow: "1", minHeight: "100vh" }}>
          <Outlet />
        </div>
        <MainFooter />
      </div>
    </>
  );
};

export default LayoutRoot;
