import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import Swal from "sweetalert2";
import { GoStarFill } from "react-icons/go";
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

  useEffect(() => {
    fetchReviews();
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

  const handleReviewSubmit = async (reviewData, reviewId = null) => {
    try {
      if (reviewId) {
        // 수정 로직
        await axios.put(
          `http://localhost:5000/review/edit-review/${reviewId}`,
          reviewData,
          {
            withCredentials: true,
          }
        );
        Swal.fire({
          icon: "success",
          title: "리뷰 수정이 완료되었습니다!",
          confirmButtonText: "확인",
        });
      } else {
        // 새 리뷰 작성 로직
        await axios.post(
          `http://localhost:5000/review/save-review`,
          reviewData,
          {
            withCredentials: true,
          }
        );

        Swal.fire({
          icon: "success",
          title: "리뷰 작성이 완료되었습니다!",
          confirmButtonText: "확인",
        });
      }

      // 리뷰 작성/수정 후 리스트 갱신
      fetchReviews();

      closeReviewModal();
    } catch (error) {
      console.error("There was an error saving the review!", error);
      Swal.fire({
        icon: "error",
        title: "리뷰 저장에 실패했습니다.",
        confirmButtonText: "확인",
      });
    }
  };

  const handleReviewEdit = (review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      await axios.delete(
        `http://localhost:5000/review/delete-review/${reviewId}`,
        {
          withCredentials: true,
        }
      );

      Swal.fire({
        icon: "success",
        title: "리뷰가 삭제되었습니다!",
        confirmButtonText: "확인",
      });

      // 리뷰 삭제 후 리스트 갱신
      fetchReviews();
    } catch (error) {
      console.error("There was an error deleting the review!", error);
      Swal.fire({
        icon: "error",
        title: "리뷰 삭제에 실패했습니다.",
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
                        <p className="ReviewItem_name">{review.p_name.toLowerCase()}</p>
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
                        <p className="ReviewItem_text">{review.review_text}</p>
                      </div>
                    </div>
                    <div className="Review_editBtn">
                      <button onClick={() => handleReviewEdit(review)}>
                        수정
                      </button>
                      <button
                        onClick={() => handleReviewDelete(review.review_id)}
                      >
                        삭제
                      </button>
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
