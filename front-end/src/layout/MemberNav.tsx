import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";

interface MemberNavProps {
  handleLogout: () => void;
}

const MemberNav: React.FC<MemberNavProps> = ({ handleLogout }) => (
  <div className="header-right">
    <div className="guest">
      <ul className="list">
        <li onClick={handleLogout}>
          <a>LOGOUT</a>
        </li>
        <li>
          <Link to="/mypage">
            <a>MY PAGE</a>
          </Link>
        </li>
        <li>
          <Link to="/mybag">
            <IoBag />
          </Link>
        </li>
        <li>
          <Link to="/mypage/mywish">
            <FaHeart />
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default MemberNav;
