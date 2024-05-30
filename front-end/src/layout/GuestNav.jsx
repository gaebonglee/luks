// GuestNav.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaHeart } from 'react-icons/fa';
import { IoBag } from 'react-icons/io5';
import { RiLoginBoxFill } from 'react-icons/ri';

const GuestNav = () => (
  <div className="header_user">
    <div className="header_member">
      <Link to="/login">
        <FaRegUser />
        <p>my page</p>
      </Link>
    </div>
    <div className="header_like">
      <Link to="/login">
        <FaHeart />
        <p>my wish</p>
      </Link>
    </div>
    <div className="header_mybag">
      <Link to="/login">
        <IoBag />
        <p>my bag</p>
      </Link>
    </div>
    <div className="header_log">
      <Link to="/login">
        <RiLoginBoxFill />
        <p>login</p>
      </Link>
    </div>
  </div>
);

export default GuestNav;
