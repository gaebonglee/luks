import React from "react";

const MyCartBtn = () => {
  return (
    <div className="mybag_bottom">
      <div className="mybag_bottom_DeleteBtn">
        <button>선택상품 삭제</button>
        <button>전체 삭제</button>
      </div>
      <div className="mybag_bottom_BuynowBtn">
        <button>구매하기</button>
      </div>
    </div>
  );
};

export default MyCartBtn;
