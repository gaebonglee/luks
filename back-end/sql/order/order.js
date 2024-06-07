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
    ({ product_id, color_id, size_id, quantity, p_price }) => [
      orderId,
      product_id,
      color_id,
      size_id,
      quantity,
      p_price * quantity, // Calculate price as p_price * quantity
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

function saveShippingInfo(orderId, shippingInfo) {
  const query = `
    INSERT INTO shipping_info (order_id, address_name, recipient_name, phone_number, postcode, address, detail_address, request)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    orderId,
    shippingInfo.address_name,
    shippingInfo.recipient_name,
    shippingInfo.phonenumber,
    shippingInfo.postcode,
    shippingInfo.basic_address,
    shippingInfo.detail_address,
    shippingInfo.request,
  ];

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

function saveBuyerInfo(orderId, memberInfo) {
  const query = `INSERT INTO buyer_info (order_id, member_name, email, phonenumber) VALUES (?,?,?,?)`;

  const values = [
    orderId,
    memberInfo.member_name,
    memberInfo.email,
    memberInfo.phonenumber,
  ];

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

module.exports = {
  saveOrder,
  saveOrderItems,
  savePayment,
  saveShippingInfo,
  saveBuyerInfo,
};
