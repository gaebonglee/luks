import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "../../../style/review/Review.scss";

//아이콘
import { GoStarFill } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";

Modal.setAppElement("#root");

const ReviewModal = ({
  isOpen,
  onRequestClose,
  order,
  memberId,
  onReviewSubmit,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 리뷰가 20자 이상인지 확인
    if (reviewText.length < 20) {
      Swal.fire({
        icon: "warning",
        title: "20자 이상 작성해주세요",
        confirmButtonText: "확인",
      });
      return;
    }

    const reviewData = {
      memberId,
      productId: order.product_id,
      rating,
      reviewText,
    };

    await onReviewSubmit(reviewData);
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

        {order && (
          <div className="reviewModal_productInfo">
            <img src={order.p_image_url} alt="상품 이미지" />
            <div className="MyOrderList_detail">
              <p className="MyOrderList_detail name">{order.p_name}</p>
              <div className="MyOrderList_detail colorSize">
                <p>color : {order.color_name}</p>
                <p>size : {order.size}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="ReviewForm">
          <div className="ReviewForm_wrap">
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
            <a>최소 20자 이상 작성해주세요.</a>
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

export default ReviewModal;
