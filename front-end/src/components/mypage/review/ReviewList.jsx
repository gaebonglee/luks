import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../../../style/review/ReviewList.scss";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { productId, productName } = location.state || {}; // 기본값을 설정

  useEffect(() => {
    const fetchReviews = async () => {
      if (!productId) {
        setError("상품 정보가 없습니다.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/review/product-reviews`,
          {
            params: { productId },
            withCredentials: true,
          }
        );

        setReviews(response.data.reviews);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the reviews!", error);
        setError("There was an error fetching the reviews.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="review_section">
      <div className="ReviewList">
        <h3>{productName ? `${productName}에 대한 리뷰 목록` : "리뷰 목록"}</h3>
        <div className="ReviewList_contents">
          {reviews.length === 0 ? (
            <p>리뷰가 없습니다.</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review.review_id} className="ReviewItem">
                  <p>
                    <strong>{review.member_name}</strong> (
                    {new Date(review.created_at).toLocaleDateString()})
                  </p>
                  <p>평점: {review.rating} / 5</p>
                  <p>{review.review_text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewList;
