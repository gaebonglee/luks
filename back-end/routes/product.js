const express = require("express");
const router = express.Router();
const { selectProductDetail } = require("../sql/product/selectProductDetail");
const { selectColor } = require("../sql/product/selectColor");
const { selectSize } = require("../sql/product/selectSize");
const { selectFabricAndCare } = require("../sql/product/selectFabricAndCare");
const { selectSizeDetail } = require("../sql/product/selectSizeDetail");
const { saveWishList } = require("../sql/product/saveWishList");
const { removeWishList } = require("../sql/product/removeWishList");

router.get("/:productName/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const productDetails = await new Promise((resolve, reject) => {
      selectProductDetail(productId, (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });

    if (!productDetails) {
      return res.status(404).send({ error: "Product not found" });
    }

    const colors = await new Promise((resolve, reject) => {
      selectColor(productId, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    const sizes = await new Promise((resolve, reject) => {
      selectSize(productId, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    const fabricAndCare = await new Promise((resolve, reject) => {
      selectFabricAndCare(productId, (error, results) => {
        if (error) return reject(error);
        resolve(results[0]);
      });
    });

    const sizeDetails = await new Promise((resolve, reject) => {
      selectSizeDetail(productId, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });

    res.json({
      product: productDetails,
      colors: colors,
      sizes: sizes,
      fabricAndCare: fabricAndCare,
      sizeDetails: sizeDetails,
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).send({ error: "Server error" });
  }
});

// 좋아요 추가
router.post("/wishlist/add", (req, res) => {
  const { member_id, product_id } = req.body;

  saveWishList(member_id, product_id, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res
      .status(200)
      .json({ success: true, message: "상품이 위시리스트에 추가되었습니다." });
  });
});

// 좋아요 취소
router.post("/wishlist/remove", (req, res) => {
  const { member_id, product_id } = req.body;

  removeWishList(member_id, product_id, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.status(200).json({
      success: true,
      message: "상품이 위시리스트에서 삭제되었습니다.",
    });
  });
});

module.exports = router;
