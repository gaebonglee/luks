import React from "react";
import MainHeader from "../layout/MainHeader";
import { Outlet } from "react-router-dom";

const LayoutRoot: React.FC<{ isLoggedIn: boolean; setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    isLoggedIn,
    setIsLoggedIn,
  }) => {
    return (
      <div>
        <div
          style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <MainHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <div style={{ flexGrow: "1", minHeight: "100vh" }}>
            <Outlet />
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  };
  
  export default LayoutRoot;
  