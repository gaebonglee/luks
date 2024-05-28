const connection = require("../../config/db");

function selectCategoryList(callback) {
  const query = "SELECT DISTINCT p_category, p_subcategory FROM product";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      const categories = results.reduce((acc, item) => {
        if (!acc[item.p_category]) {
          acc[item.p_category] = [];
        }
        if (item.p_subcategory) {
          acc[item.p_category].push(item.p_subcategory);
        }
        return acc;
      }, {});
      callback(null, categories);
    }
  });
}

module.exports = {
  selectCategoryList,
};
