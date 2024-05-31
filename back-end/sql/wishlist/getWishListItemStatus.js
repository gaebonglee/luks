const connection = require("../../config/db");

function getWishListItemStatus(memberId, productId, callback) {
  const query = `
    SELECT liked_at, unliked_at 
    FROM wishlist 
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
  getWishListItemStatus,
};
