const connection = require("../../config/db");

function saveOrder(memberId, totalAmount, status) {
  const query = `
    INSERT INTO orders (member_id, total_amount, status)
    VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [memberId, totalAmount, status],
      (error, results) => {
        if (error) {
          console.error("Database query error:", error);
          reject(error);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
}

function saveOrderItems(orderId, items) {
  const query = `
    INSERT INTO order_items (order_id, product_id, color_id, size_id, quantity, price)
    VALUES ${items.map(() => "(?, ?, ?, ?, ?, ?)").join(", ")}`;

  const values = items.flatMap(
    ({ product_id, color_id, size_id, quantity, price }) => [
      orderId, // 여기에 orderId를 올바르게 전달
      product_id,
      color_id,
      size_id,
      quantity,
      price,
    ]
  );

  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function savePayment(orderId, paymentMethod, amount) {
  const query = `
    INSERT INTO payments (order_id, payment_method, amount)
    VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    connection.query(
      query,
      [orderId, paymentMethod, amount],
      (error, results) => {
        if (error) {
          console.error("Database query error:", error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}

module.exports = {
  saveOrder,
  saveOrderItems,
  savePayment,
};
