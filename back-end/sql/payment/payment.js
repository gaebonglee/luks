const connection = require("../../config/db");

function savePaymentInfo(memberId, amount, paymentMethod, callback) {
  const query = `
    INSERT INTO payments (member_id, amount, payment_method)
    VALUES (?, ?, ?)`;

  connection.query(
    query,
    [memberId, amount, paymentMethod],
    (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
}

module.exports = {
  savePaymentInfo,
};
