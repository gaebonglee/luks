import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";

const MemberNav = ({ handleLogout }) => (
  <div className="header_user">
    <div className="header_member">
      <Link to="/mypage">
        <FaRegUser />
        <p>my page</p>
      </Link>
    </div>
    <div className="header_like">
      <Link to="/mypage/mywish">
        <FaHeart />
        <p>my wish</p>
      </Link>
    </div>
    <div className="header_mybag">
      <Link to="/mybag">
        <IoBag />
        <p>my bag</p>
      </Link>
    </div>
    <div className="header_log">
      <a href="#!" onClick={handleLogout}>
        <RiLogoutBoxFill />
        <p>logout</p>
      </a>
    </div>
  </div>
);

export default MemberNav;
