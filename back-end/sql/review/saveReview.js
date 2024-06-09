const connection = require("../../config/db");

function saveReview(memberId, productId, rating, reviewText, callback) {
  const query = `INSERT INTO reviews (member_id, product_id, rating, review_text, created_at) VALUES (?, ?, ?, ?, NOW())`;

  connection.query(
    query,
    [memberId, productId, rating, reviewText],
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
