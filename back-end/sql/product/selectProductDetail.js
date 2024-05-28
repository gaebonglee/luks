// const connection = require("../../mysql");

// function selectProductDetail(callback) {
//   connection.query("SELECT * FROM product", function (error, results) {
//     if (error) {
//       console.error("Database query error:", error);
//       callback(error, null);
//     } else {
//       callback(null, results);
//     }
//   });
// }

// function selectProductById(id, callback) {
//   connection.query(
//     "SELECT * FROM product WHERE product_id = ?",
//     [id],
//     function (error, results) {
//       if (error) {
//         console.error("Database query error:", error);
//         callback(error, null);
//       } else {
//         callback(null, results[0]); //지정된 ID가 있는 제품이 하나뿐이라고 가정합니다
//       }
//     }
//   );
// }

// module.exports = {
//   selectProductDetail,
//   selectProductById,
// };
