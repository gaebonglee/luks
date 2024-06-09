import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import Swal from "sweetalert2";
import { GoStarFill } from "react-icons/go"; // 아이콘 import 추가
import "../../../style/review/ReviewList.scss";

const ReviewList = () => {
  const [tab, setTab] = useState("writable");
  const [writableReviews, setWritableReviews] = useState([]);
  const [writtenReviews, setWrittenReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/review/list`, {
          withCredentials: true,
        });
        setWritableReviews(response.data.writable);
        setWrittenReviews(response.data.written);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the reviews!", error);
        setError("There was an error fetching the reviews.");
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/check-session`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("There was an error fetching the user!", error);
      }
    };

    fetchReviews();
    fetchUser();
  }, []);

  const handleWriteReview = (review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedReview(null);
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      // 리뷰 저장 로직
      await axios.post(`http://localhost:5000/review/save-review`, reviewData, {
        withCredentials: true,
      });

      Swal.fire({
        icon: "success",
        title: "리뷰 작성이 완료되었습니다!",
        confirmButtonText: "확인",
      });

      // 리뷰 작성 후 리스트 갱신
      const response = await axios.get(`http://localhost:5000/review/list`, {
        withCredentials: true,
      });
      setWritableReviews(response.data.writable);
      setWrittenReviews(response.data.written);

      closeReviewModal();
    } catch (error) {
      console.error("There was an error saving the review!", error);
      Swal.fire({
        icon: "error",
        title: "리뷰 작성에 실패했습니다.",
        confirmButtonText: "확인",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="right_section">
      <div className="ReviewList">
        <div className="ReviewList_tabs">
          <button
            onClick={() => setTab("writable")}
            className={tab === "writable" ? "active" : ""}
          >
            작성 가능한 리뷰
          </button>
          <button
            onClick={() => setTab("written")}
            className={tab === "written" ? "active" : ""}
          >
            작성된 리뷰
          </button>
        </div>
        <div className="ReviewList_contents">
          <div
            className="ReviewList_writable"
            style={{ display: tab === "writable" ? "block" : "none" }}
          >
            {writableReviews.length === 0 ? (
              <p>작성 가능한 리뷰가 없습니다.</p>
            ) : (
              <ul>
                {writableReviews.map((review) => (
                  <li key={review.product_id} className="ReviewItem">
                    <div className="ReviewItem_info">
                      <img src={review.p_image_url} alt="상품 이미지" />
                      <div>
                        <p className="ReviewItem_name">{review.p_name}</p>
                        <p>
                          색상: {review.color_name}, 사이즈: {review.size}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleWriteReview(review)}>
                      리뷰 작성
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div
            className="ReviewList_written"
            style={{ display: tab === "written" ? "block" : "none" }}
          >
            {writtenReviews.length === 0 ? (
              <p>작성된 리뷰가 없습니다.</p>
            ) : (
              <ul>
                {writtenReviews.map((review) => (
                  <li key={review.review_id} className="ReviewItem">
                    <div className="ReviewItem_info">
                      <img src={review.p_image_url} alt="상품 이미지" />
                      <div>
                        <p className="ReviewItem_name">{review.p_name}</p>
                        <p>
                          색상: {review.color_name}, 사이즈: {review.size}
                        </p>

                        <div className="ReviewItem_stars">
                          {[...Array(review.rating)].map((_, index) => (
                            <GoStarFill key={index} className="star" />
                          ))}
                        </div>
                        <p>{review.review_text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {isReviewModalOpen && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onRequestClose={closeReviewModal}
          order={selectedReview}
          memberId={user?.id}
          onReviewSubmit={handleReviewSubmit}
        />
      )}
    </section>
  );
};

export default ReviewList;
