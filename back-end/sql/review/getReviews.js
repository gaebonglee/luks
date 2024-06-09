const connection = require("../../config/db");

function getReviewsByProductId(productId, callback) {
  const query = `
    SELECT r.review_id, r.member_id, r.rating, r.review_text, r.created_at, m.name as member_name
    FROM reviews r
    JOIN member m ON r.member_id = m.id
    WHERE r.product_id = ?`;

  connection.query(query, [productId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  getReviewsByProductId,
};
