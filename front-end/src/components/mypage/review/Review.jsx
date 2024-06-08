import React, { useState } from "react";
import Modal from "react-modal";
import "../../../style/review/Review.scss";

//아이콘
import { GoStarFill } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";

Modal.setAppElement("#root");

const Review = ({ isOpen, onRequestClose, order }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 리뷰를 서버에 제출하는 로직을 구현합니다.
    console.log("Review Submitted:", { reviewText, rating, order });

    // 제출 후 모달을 닫습니다.
    onRequestClose();
  };

  const handleStarClick = (index) => {
    setRating(index);
  };

  return (
    <div className="modalContainer">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Review Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="reviewModal_titleWrap">
          <h2>리뷰 작성</h2>
          <button onClick={onRequestClose}>
            <MdOutlineCancel />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="ReviewForm">
          <div className="ReviewForm_wrap">
            <label>평점</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((index) => (
                <GoStarFill
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className={index <= rating ? "star selected" : "star"}
                />
              ))}
            </div>
          </div>
          <div className="review_form">
            <label>리뷰</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <div className="ReviewSubmitWrapper">
            <button type="submit" className="ReviewSubmit">
              작성완료
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Review;
