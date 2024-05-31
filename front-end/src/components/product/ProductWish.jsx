import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2"; // SweetAlert2 라이브러리 사용

const ProductWish = ({ productId }) => {
  const [liked, setLiked] = useState(false); // 초기값 false
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("There was an error checking the login status!", error);
      }
    };

    const fetchWishStatus = async () => {
      if (!isLoggedIn) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/wishlist/item-status/${productId}`,
          {
            withCredentials: true,
          }
        );
        const { liked_at, unliked_at } = response.data;
        if (liked_at && !unliked_at) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } catch (error) {
        console.error(
          "There was an error fetching the wishlist status!",
          error
        );
        setError("There was an error fetching the wishlist status.");
      }
    };

    checkLoginStatus();
    fetchWishStatus();
  }, [productId, isLoggedIn]);

  const toggleLike = async () => {
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
          window.location.href = "/login"; // 로그인 페이지로 이동
        }
      });
      return;
    }

    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    const url = newLikedStatus
      ? `http://localhost:5000/wishlist/add`
      : `http://localhost:5000/wishlist/remove`;

    try {
      await axios.post(
        url,
        { product_id: productId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("There was an error updating the wishlist!", error);
      setLiked(!newLikedStatus); // 에러가 발생한 경우 상태 롤백
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <span className="wishList_icon" onClick={toggleLike}>
      {liked ? <FaHeart /> : <FiHeart />}
    </span>
  );
};

export default ProductWish;
