import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style/product/ProductDetail.scss";
import Swal from "sweetalert2";

const ProductBtn = ({ productId, colorId, sizeId, quantity = 1 }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/check-session",
          { withCredentials: true }
        );
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("There was an error checking the login status!", error);
      }
    };

    checkLoginStatus();
  }, []);

  const addToCart = async () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "로그인이 필요합니다.",
        text: "로그인 하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    if (!colorId || !sizeId) {
      Swal.fire({
        title: "옵션을 선택하세요",
        text: "색상과 사이즈를 모두 선택해야 합니다.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    try {
      console.log(
        "Product ID:",
        productId,
        "Color ID:",
        colorId,
        "Size ID:",
        sizeId
      ); // 로깅 추가
      await axios.post(
        "http://localhost:5000/cart/add",
        { product_id: productId, color_id: colorId, size_id: sizeId, quantity },
        { withCredentials: true }
      );
      Swal.fire({
        text: "장바구니에 상품이 담겼습니다.",
        showCancelButton: true,
        confirmButtonText: "장바구니 바로가기",
        cancelButtonText: "닫기",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/mybag";
        }
      });
    } catch (error) {
      console.error("There was an error updating the cart!", error);
      Swal.fire({
        title: "오류",
        text: "장바구니에 상품을 추가하는 중 오류가 발생했습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="productInfo_bottom">
      <div className="product_btnWrap">
        <div className="buyNow_btn">
          <button>Buy Now</button>
        </div>
        <div className="addToCart_btn" onClick={addToCart}>
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductBtn;
