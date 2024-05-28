const connection = require("../../config/db");

function selectAllCategory(category, callback) {
  const query = "SELECT * FROM product WHERE p_category = ?";
  connection.query(query, [category], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  selectAllCategory,
};
