import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { IoBag } from "react-icons/io5";

const GuestNav: React.FC = () => (
  <div className="header_user">
    <div className="header_log">
      <Link to="/login">
        <p>login</p>
      </Link>
    </div>
    <div className="header_member">
      <Link to="/login">
        <p>my page</p>
      </Link>
    </div>

    <div className="header_mybag">
      <Link to="/login">
        <IoBag />
      </Link>
    </div>
    <div className="header_like">
      <Link to="/login">
        <FaHeart />
      </Link>
    </div>
  </div>
);

export default GuestNav;
