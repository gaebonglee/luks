const connection = require("../../config/db");

function selectSubcategory(category, subcategory, callback) {
  const query =
    "SELECT * FROM product WHERE p_category = ? AND p_subcategory = ?";
  connection.query(query, [category, subcategory], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  selectSubcategory,
};
