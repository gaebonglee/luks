import React from "react";
import "../../style/mybag/MyCartBtn.scss";

const MyCartBtn = () => {
  return (
    <div className="mybag_bottom">
      <div className="mybag_bottom_DeleteBtn">
        <button>선택상품 삭제</button>
        <button>전체 삭제</button>
      </div>
      <div className="mybag_bottom_BuynowBtn">
        <a>총가격 : </a>
        <button>구매하기</button>
      </div>
    </div>
  );
};

export default MyCartBtn;
