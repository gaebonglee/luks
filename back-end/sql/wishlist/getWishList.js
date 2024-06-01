const connection = require("../../config/db");

function getWishList(memberId, callback) {
  const query = `
    SELECT p.* FROM wishlist w
    JOIN product p ON w.product_id = p.product_id
    WHERE w.member_id = ? AND w.unliked_at IS NULL`;
    
  connection.query(query, [memberId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  getWishList,
};
