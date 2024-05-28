const connection = require("../../config/db");

function selectColor(productId, callback) {
  const query = "SELECT * FROM colors WHERE product_id = ?";
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
  selectColor,
};
