import React from "react";
import MyCart from "../components/mybag/MyCart";
import "../style/mybag/Mybag.scss";

//아이콘
import { IoMdArrowDropright } from "react-icons/io";

const MyBag = () => {
  return (
    <div className="mybag_container">
      <div className="mybag_wrap">
        <div className="bagAndOrder_title">
          <ul>
            <li>
              <a className="changeColor">SHOPPING BAG</a>
              <IoMdArrowDropright />
            </li>
            <li>
              <a>ORDER</a>
              <IoMdArrowDropright />
            </li>
            <li>
              <a>ORDER CONFIRMED</a>
            </li>
          </ul>
        </div>
        <MyCart />
      </div>
    </div>
  );
};

export default MyBag;
