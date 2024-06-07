const connection = require("../../config/db");

function getRecentOrders(memberId, callback) {
  const query = `
    SELECT o.order_id, o.order_date, o.total_amount, oi.product_id, oi.quantity, oi.price, p.p_name, p.p_image_url
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN product p ON oi.product_id = p.product_id
    WHERE o.member_id = ?
    ORDER BY o.order_date DESC
    LIMIT 5;
  `;

  connection.query(query, [memberId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  getRecentOrders,
};
