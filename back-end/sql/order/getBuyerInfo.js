const connection = require("../../config/db");

function getBuyerInfo(orderId, callback) {
  const query = `SELECT bi.member_name, bi.email, bi.phonenumber
    FROM buyer_info bi
    WHERE bi.order_id = ?
  `;

  connection.query(query, [orderId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  getBuyerInfo,
};
