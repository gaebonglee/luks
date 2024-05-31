const connection = require("../../config/db");

function removeWishList(memberId, productId, callback) {
  const query = `
    UPDATE wishlist 
    SET unliked_at = CURRENT_TIMESTAMP 
    WHERE member_id = ? AND product_id = ?`;
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
  removeWishList,
};
