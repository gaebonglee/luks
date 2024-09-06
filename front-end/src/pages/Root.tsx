import React, { Dispatch, SetStateAction } from "react";
import Header from "../layout/MainHeader";
import Footer from "../layout/MainFooter";
import { Outlet } from "react-router-dom";

// Props 타입 정의
interface RootProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>; // 타입 수정
}

const Root: React.FC<RootProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ flexGrow: "1", minHeight: "100vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
