import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { RiLogoutBoxFill } from "react-icons/ri";
import "../style/layout/Nav.scss";

interface MemberNavProps {
  handleLogout: () => void;
}

const MemberNav: React.FC<MemberNavProps> = ({ handleLogout }) => (
  <div className="header_user">
    <div className="header_log">
      <a href="#!" onClick={handleLogout}>
        <p>logout</p>
      </a>
    </div>
    <div className="header_member">
      <Link to="/mypage">
        <p>my page</p>
      </Link>
    </div>
    <div className="header_mybag">
      <Link to="/mybag">
        <IoBag />

      </Link>
    </div>
    <div className="header_like">
      <Link to="/mypage/mywish">
        <FaHeart />
      </Link>
    </div>
  </div>
);

export default MemberNav;
