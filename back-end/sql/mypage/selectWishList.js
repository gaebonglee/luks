const db = require("../../config/db");

function selectWishList(member_id, callback) {
  db.query(
    "SELECT product.* FROM product JOIN wishlist ON product.product_id = wishlist.product_id WHERE wishlist.member_id = ? AND wishlist.unliked_at IS NULL",
    [member_id],
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

module.exports = selectWishList;
