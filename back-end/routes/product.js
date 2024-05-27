const express = require("express");
const router = express.Router();
const { selectProductDetail } = require("../sql/product/selectProductDetail");

router.get("/", (req, res) => {
  selectProductDetail((error, products) => {
    if (error) {
      res.status(500).send({ error: "Server error" });
    } else {
      res.json(products);
    }
  });
});

module.exports = router;
