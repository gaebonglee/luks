import React from "react";
import MainHeader from "../layout/MainHeader";
import MainFooter from "../layout/MainFooter";
import { Outlet } from "react-router-dom";

const LayoutRoot: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <MainHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div style={{ flexGrow: "1", minHeight: "100vh" }}>
          <Outlet />
        </div>
        <MainFooter />
      </div>
    </div>
  );
};

export default LayoutRoot;
