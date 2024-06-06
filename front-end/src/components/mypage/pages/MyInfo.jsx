import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmPassword from "../../login/ConfirmPassword";
import Mymodify from "../myinfo/Mymodify";

const MyInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("There was an error checking the login status!", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handlePasswordConfirm = () => {
    setIsPasswordConfirmed(true);
  };

  return (
    <section className="right_section">
      <div className="myInfo_wrap">
        {isPasswordConfirmed ? (
          <Mymodify />
        ) : (
          <ConfirmPassword onConfirm={handlePasswordConfirm} />
        )}
      </div>
    </section>
  );
};

export default MyInfo;
