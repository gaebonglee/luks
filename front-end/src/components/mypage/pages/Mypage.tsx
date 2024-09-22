import React, { useEffect, useState } from "react";
import axios from "axios";
import { checkSession } from "../../../types/checkSession";
import MyHeart from "../main/MyHeart";

const Mypage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const checkUserSession = async () => {
      const loggedIn = await checkSession();
      setIsLoggedIn(loggedIn);
    };
    checkUserSession();
  });
  return (
    <section className="right_section">
      <div className="MypageMain">
        {/* <RecentOrders /> */}
        <MyHeart />
      </div>
    </section>
  );
};

export default Mypage;
