const connection = require("../../config/db");

function getWritableReviews(memberId, callback) {
  const query = `
    SELECT oi.product_id, p.p_image_url, p.p_name, c.color_name, s.size, oi.order_id
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    JOIN product p ON oi.product_id = p.product_id
    JOIN colors c ON oi.color_id = c.color_id
    JOIN sizes s ON oi.size_id = s.size_id
    WHERE o.member_id = ? AND NOT EXISTS (
      SELECT 1
      FROM reviews r
      WHERE r.member_id = o.member_id AND r.product_id = oi.product_id AND r.order_id = oi.order_id
    )
  `;
  connection.query(query, [memberId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      console.log("getWritableReviews results:", results);
      callback(null, results);
    }
  });
}

function getWrittenReviews(memberId, callback) {
  const query = `
    SELECT r.review_id, r.rating, r.review_text, p.p_image_url, p.p_name, c.color_name, s.size, r.order_id
    FROM reviews r
    JOIN product p ON r.product_id = p.product_id
    JOIN order_items oi ON r.product_id = oi.product_id
    JOIN colors c ON oi.color_id = c.color_id
    JOIN sizes s ON oi.size_id = s.size_id
    WHERE r.member_id = ?
  `;

  connection.query(query, [memberId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      console.log("getWrittenReviews results:", results);
      callback(null, results);
    }
  });
}

module.exports = {
  getWritableReviews,
  getWrittenReviews,
};
