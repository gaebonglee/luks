const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCartItemStatus,
  getCart,
} = require("../sql/cart/cart");

// 장바구니 추가
router.post("/add", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { product_id, color_id, size_id, quantity } = req.body;
  const member_id = req.session.user.id;

  console.log(
    "Add to cart - member_id:",
    member_id,
    "product_id:",
    product_id,
    "color_id:",
    color_id,
    "size_id:",
    size_id,
    "quantity:",
    quantity
  );

  addToCart(
    member_id,
    product_id,
    color_id,
    size_id,
    quantity,
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      res
        .status(200)
        .json({ success: true, message: "상품이 장바구니에 추가되었습니다." });
    }
  );
});

// 장바구니 삭제
router.post("/remove", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { product_id } = req.body;
  const member_id = req.session.user.id;

  console.log(
    "Remove from cart - member_id:",
    member_id,
    "product_id:",
    product_id
  ); // 로깅 추가

  removeFromCart(member_id, product_id, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res
      .status(200)
      .json({ success: true, message: "상품이 장바구니에서 삭제되었습니다." });
  });
});

// 특정 상품의 장바구니 상태 조회
router.get("/item-status/:product_id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const member_id = req.session.user.id;
  const { product_id } = req.params;

  getCartItemStatus(member_id, product_id, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(200).json({ success: true, in_cart: false });
    }
    res
      .status(200)
      .json({ success: true, in_cart: true, quantity: results[0].quantity });
  });
});

// 장바구니 목록 조회
router.get("/mycart", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const member_id = req.session.user.id;

  getCart(member_id, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.status(200).json({ success: true, products: results });
  });
});

module.exports = router;
