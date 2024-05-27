const connection = require("../../connection/mysqlConnection");

function selectProductDetail(callback) {
  connection.query("SELECT * FROM Product", function (error, results) {
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
