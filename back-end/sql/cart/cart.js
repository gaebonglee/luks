const connection = require("../../config/db");

function addToCart(memberId, productId, colorId, sizeId, quantity, callback) {
  const query = `
    INSERT INTO cart (member_id, product_id, color_id, size_id, quantity) 
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`;

  connection.query(
    query,
    [memberId, productId, colorId, sizeId, quantity],
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

function removeFromCart(memberId, productId, colorId, sizeId, callback) {
  const query = `
    DELETE FROM cart 
    WHERE member_id = ? AND product_id = ? AND color_id = ? AND size_id = ?`;
  connection.query(
    query,
    [memberId, productId, colorId, sizeId],
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

function removeMultipleFromCart(memberId, items, callback) {
  const query = `
    DELETE FROM cart
    WHERE member_id = ? AND (product_id, color_id, size_id) IN (${items
      .map(() => "(?, ?, ?)")
      .join(",")})
  `;

  const values = items.flatMap(({ product_id, color_id, size_id }) => [
    memberId,
    product_id,
    color_id,
    size_id,
  ]);

  connection.query(query, values, (error, results) => {
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

function getCartItemQuantity(memberId, productId, colorId, sizeId, callback) {
  const query = `SELECT quantity FROM cart WHERE member_id = ? AND product_id = ? AND color_id = ? AND size_id = ?`;
  connection.query(
    query,
    [memberId, productId, colorId, sizeId],
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

function getCart(memberId, callback) {
  const query = `
    SELECT 
      c.product_id,
      c.color_id,
      c.size_id,
      SUM(c.quantity) AS quantity,
      p.p_name,
      p.p_image_url,
      p.p_price,
      cl.color_name,
      s.size 
    FROM cart c
    JOIN product p ON c.product_id = p.product_id
    JOIN colors cl ON c.color_id = cl.color_id
    JOIN sizes s ON c.size_id = s.size_id
    WHERE c.member_id = ?
    GROUP BY c.product_id, c.color_id, c.size_id`;
  connection.query(query, [memberId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

function calculateTotalPrice(memberId, items, callback) {
  const query = `
    SELECT SUM(p.p_price * c.quantity) AS total_price
    FROM cart c
    JOIN product p ON c.product_id = p.product_id
    WHERE c.member_id = ? AND (c.product_id, c.color_id, c.size_id) IN (${items
      .map(() => "(?, ?, ?)")
      .join(",")})
  `;

  const values = items.flatMap(({ product_id, color_id, size_id }) => [
    product_id,
    color_id,
    size_id,
  ]);

  connection.query(query, [memberId, ...values], (error, results) => {
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
  removeMultipleFromCart,
  getCartItemStatus,
  getCartItemQuantity,
  getCart,
  calculateTotalPrice,
};
