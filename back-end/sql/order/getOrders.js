const connection = require("../../config/db");

function getOrders(memberId, callback) {
  const query = `
    SELECT 
      o.order_id, o.order_date, o.total_amount, o.status,
      oi.product_id, oi.quantity, oi.price, 
      p.p_name, p.p_image_url,
      cl.color_name,
      s.size
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN product p ON oi.product_id = p.product_id
    LEFT JOIN colors cl ON oi.color_id = cl.color_id
    LEFT JOIN sizes s ON oi.size_id = s.size_id
    WHERE o.member_id = ?
    ORDER BY o.order_date DESC;
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
  getOrders,
};
