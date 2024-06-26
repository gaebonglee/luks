const connection = require("../../config/db");

function selectProductDetail(productId, callback) {
  const query = "SELECT * FROM product WHERE product_id = ?";
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
  selectProductDetail,
};
