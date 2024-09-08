import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";

const GuestNav: React.FC = () => (
  <div className="header-right">
    <div className="guest">
      <ul className="list">
        <li>
          <Link to="/login">
            <a>LOGIN</a>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <a>MY PAGE</a>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <IoBag />
          </Link>
        </li>
        <li>
          <Link to="/login">
            <FaHeart />
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default GuestNav;
