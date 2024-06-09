const express = require("express");
const { saveReview } = require("../sql/review/saveReview");
const { getReviewsByProductId } = require("../sql/review/getReviews");

const router = express.Router();

router.post("/save-review", (req, res) => {
  const { memberId, productId, rating, reviewText } = req.body;

  saveReview(memberId, productId, rating, reviewText, (error, results) => {
    if (error) {
      console.error("Failed to save review", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res
      .status(200)
      .json({ success: true, message: "Review saved successfully" });
  });
});

router.get("/product-reviews", (req, res) => {
  const { productId } = req.query;

  getReviewsByProductId(productId, (error, results) => {
    if (error) {
      console.error("Failed to fetch reviews", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.status(200).json({ success: true, reviews: results });
  });
});

module.exports = router;
