const connection = require("../../config/db");

function selectSize(productId, callback) {
  const query = "SELECT * FROM sizes WHERE product_id = ?";
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
  selectSize,
};
