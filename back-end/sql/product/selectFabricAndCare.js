const connection = require("../../config/db");

function selectFabricAndCare(productId, callback) {
  const query = "SELECT * FROM fabricandcare WHERE product_id = ?";
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
  selectFabricAndCare,
};
