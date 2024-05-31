const connection = require("../../config/db");

function saveWishList(memberId, productId, callback) {
  const query = `
    INSERT INTO wishlist (member_id, product_id) 
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE unliked_at = NULL, liked_at = CURRENT_TIMESTAMP`;
  connection.query(query, [memberId, productId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  saveWishList,
};
