import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../style/mybag/MyCartBtn.scss";

const MyCartBtn = ({
  onRemoveSelected,
  calculateTotal,
  onCheckout,
  selectedItems,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      const price = await calculateTotal();
      setTotalPrice(Number(price)); // Ensure the price is a number
    };
    calculateTotalPrice();
  }, [calculateTotal]);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      Swal.fire("상품을 선택해주세요.");
    } else {
      onCheckout();
    }
  };

  const handleRemoveSelected = () => {
    if (selectedItems.length === 0) {
      Swal.fire("삭제할 상품을 선택해주세요.");
    } else {
      onRemoveSelected();
    }
  };

  return (
    <div className="mybag_bottom">
      <div className="mybag_bottom_DeleteBtn">
        <button onClick={handleRemoveSelected}>선택상품 삭제</button>
      </div>
      <div className="mybag_bottom_BuynowBtn">
        <span>총가격 : {totalPrice.toLocaleString()}원</span>
        <button onClick={handleCheckout}>구매하기</button>
      </div>
    </div>
  );
};

export default MyCartBtn;
