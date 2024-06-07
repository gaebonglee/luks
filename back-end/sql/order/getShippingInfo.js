const connection = require("../../config/db");

function getShippingInfo(orderId, callback) {
  const query = `SELECT si.recipient_name, si.phone_number, si.address, si.detail_address, si.request
    FROM shipping_info si
    WHERE si.order_id = ?
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
  getShippingInfo,
};
