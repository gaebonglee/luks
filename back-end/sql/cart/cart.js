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

function removeMultipleFromCart(memberId, items) {
  return new Promise((resolve, reject) => {
    console.log("removeMultipleFromCart called with:", memberId, items); 

    const query = `
      DELETE FROM cart
      WHERE member_id = ? AND (product_id, color_id, size_id) IN (${items
        .map(() => "(?, ?, ?)")
        .join(",")})
    `;

    const values = [
      memberId,
      ...items.flatMap(({ product_id, color_id, size_id }) => [
        product_id,
        color_id,
        size_id,
      ]),
    ];

    console.log("Executing query:", query); // 디버깅 로그 추가
    console.log("With values:", values); // 디버깅 로그 추가

    connection.query(query, values, (error, results) => {
      console.log("Query executed. Error:", error); // 디버깅 로그 추가
      console.log("Query results:", results); // 디버깅 로그 추가
      if (error) {
        console.error("Database query error:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
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

  const values = [
    memberId,
    ...items.flatMap(({ product_id, color_id, size_id }) => [
      product_id,
      color_id,
      size_id,
    ]),
  ];

  connection.query(query, values, (error, results) => {
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
