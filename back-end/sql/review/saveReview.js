const connection = require("../../config/db");

function saveReview(
  memberId,
  productId,
  orderId,
  rating,
  reviewText,
  callback
) {
  const query = `INSERT INTO reviews (member_id, product_id, order_id, rating, review_text, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;

  connection.query(
    query,
    [memberId, productId, orderId, rating, reviewText],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
}

module.exports = {
  saveReview,
};
