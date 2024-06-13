const connection = require("../../config/db");

function updateReview(reviewId, rating, reviewText, callback) {
  const query = `
    UPDATE reviews
    SET rating = ?, review_text = ?, updated_at = NOW()
    WHERE review_id = ?
  `;

  connection.query(query, [rating, reviewText, reviewId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function deleteReview(reviewId, callback) {
  const query = `
    DELETE FROM reviews
    WHERE review_id = ?
  `;

  connection.query(query, [reviewId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  updateReview,
  deleteReview,
};
