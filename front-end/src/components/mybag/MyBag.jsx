import React from "react";
import MybagProducts from "./MybagProducts";
import "../../style/mybag/Mybag.scss";

//아이콘
import { IoIosArrowForward } from "react-icons/io";

const MyBag = () => {
  return (
    <div className="mybag_container">
      <div className="mybag_wrap">
        <div className="bagAndOrder_title">
          <ul>
            <li>
              <a>01 SHOPPING BAG</a>
              <IoIosArrowForward />
            </li>
            <li>
              <a>02 ORDER</a>
              <IoIosArrowForward />
            </li>
            <li>
              <a>01 ORDER CONFIRMED</a>
            </li>
          </ul>
        </div>
        <MybagProducts />
      </div>
    </div>
  );
};

export default MyBag;
