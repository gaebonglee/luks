// const express = require("express");
// const router = express.Router();
// const { selectProductDetail } = require("../sql/product/selectProductDetail");

// router.get("/", (req, res) => {
//   selectProductDetail((error, products) => {
//     if (error) {
//       res.status(500).send({ error: "Server error" });
//     } else {
//       res.json(products);
//     }
//   });
// });

// router.get("/:id", (req, res) => {
//   const productId = req.params.id;
//   selectProductById(productId, (error, product) => {
//     if (error) {
//       res.status(500).send({ error: "Server error" });
//     } else {
//       res.json(product);
//     }
//   });
// });

// module.exports = router;
