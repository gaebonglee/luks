const connection = require("../../config/db");

function addToCart(memberId, productId, colorId, sizeId, quantity, callback) {
  const query = `
    INSERT INTO cart (member_id, product_id, color_id, size_id, quantity) 
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + ?`;
  connection.query(
    query,
    [memberId, productId, colorId, sizeId, quantity, quantity],
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

function removeFromCart(memberId, productId, callback) {
  const query = `DELETE FROM cart WHERE member_id = ? AND product_id = ?`;
  connection.query(query, [memberId, productId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function getCartItemStatus(memberId, productId, callback) {
  const query = `SELECT quantity FROM cart WHERE member_id = ? AND product_id = ?`;
  connection.query(query, [memberId, productId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function getCart(memberId, callback) {
  const query = `
    SELECT p.*, c.quantity FROM cart c
    JOIN product p ON c.product_id = p.product_id
    WHERE c.member_id = ?`;
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
  addToCart,
  removeFromCart,
  getCartItemStatus,
  getCart,
};
