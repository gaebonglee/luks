import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const ProductWish = ({ productId }) => {
  const [liked, setLiked] = useState(false); // 초기값 false
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/wishlist/item-status/${productId}`,
          {
            withCredentials: true,
          }
        );
        const { liked_at, unliked_at } = response.data;
        if (liked_at) {
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

    fetchWishStatus();
  }, [productId]);

  const toggleLike = async () => {
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
