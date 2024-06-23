const express = require("express");
const { saveReview } = require("../sql/review/saveReview");
const {
  getWritableReviews,
  getWrittenReviews,
} = require("../sql/review/writeReview");
const { updateReview, deleteReview } = require("../sql/review/EditReview");

const router = express.Router();

router.post("/save-review", (req, res) => {
  const { memberId, productId, orderId, rating, reviewText } = req.body;
  console.log("save-review body:", req.body);

  saveReview(
    memberId,
    productId,
    orderId,
    rating,
    reviewText,
    (error, results) => {
      if (error) {
        console.error("Failed to save review", error);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      res
        .status(200)
        .json({ success: true, message: "Review saved successfully" });
    }
  );
});

router.put("/edit-review/:id", (req, res) => {
  const reviewId = req.params.id;
  const { rating, reviewText } = req.body;

  updateReview(reviewId, rating, reviewText, (error, results) => {
    if (error) {
      console.error("Failed to update review", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res
      .status(200)
      .json({ success: true, message: "Review updated successfully" });
  });
});

router.delete("/delete-review/:id", (req, res) => {
  const reviewId = req.params.id;

  deleteReview(reviewId, (error, results) => {
    if (error) {
      console.error("Failed to delete review", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  });
});

router.get("/list", (req, res) => {
  const memberId = req.session.user.id;
  console.log("list memberId:", memberId);

  getWritableReviews(memberId, (writableError, writableReviews) => {
    if (writableError) {
      console.error("Failed to fetch writable reviews", writableError);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    getWrittenReviews(memberId, (writtenError, writtenReviews) => {
      if (writtenError) {
        console.error("Failed to fetch written reviews", writtenError);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      res.status(200).json({
        success: true,
        writable: writableReviews,
        written: writtenReviews,
      });
    });
  });
});

module.exports = router;
