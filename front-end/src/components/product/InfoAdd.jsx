import React from "react";
import "../../style/product/InfoAdd.scss";
import { IoIosArrowDown } from "react-icons/io";

const InfoAdd = () => {
  const handleToggle = (id) => {
    const element = document.getElementById(id);
    if (element.style.height) {
      element.style.height = null;
      element.style.opacity = 0;
    } else {
      element.style.height = element.scrollHeight + "px";
      element.style.opacity = 1;
    }
  };
  return (
    <div className="productInfo_add">
      <div className="productInfo_add_container">
        <div className="productInfo_add_wrap">
          <div
            className="productInfo_title"
            onClick={() => handleToggle("fabricCare")}
          >
            <a>Fabric & Care</a>
            <a>
              <IoIosArrowDown />
            </a>
          </div>

          <div id="fabricCare" className="productInfo_Fabric_Care_content">
            <p>* Fabric : </p>
            <p>* Care : </p>
          </div>
        </div>
        <div className="productInfo_add_wrap">
          <div
            className="productInfo_title"
            onClick={() => handleToggle("sizeDetail")}
          >
            <a>Size Detail</a>
            <a>
              <IoIosArrowDown />
            </a>
          </div>
          <div id="sizeDetail" className="productInfo_Size_Detailcontent">
            <p>* Size details here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAdd;
