const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  removeMultipleFromCart,
  getCartItemStatus,
  getCartItemQuantity,
  getCart,
  calculateTotalPrice,
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
  const { product_id, color_id, size_id } = req.body;
  const member_id = req.session.user.id;

  if (!product_id || !color_id || !size_id) {
    console.log("Invalid request data:", { product_id, color_id, size_id });
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  console.log(
    "Remove from cart - member_id:",
    member_id,
    "product_id:",
    product_id,
    "color_id:",
    color_id,
    "size_id:",
    size_id
  );

  removeFromCart(member_id, product_id, color_id, size_id, (error, results) => {
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

// 특정 상품의 현재 수량 조회
router.get("/item-quantity", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { product_id, color_id, size_id } = req.query;
  const member_id = req.session.user.id;

  getCartItemQuantity(
    member_id,
    product_id,
    color_id,
    size_id,
    (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(200).json({ success: true, quantity: 0 });
      }
      res.status(200).json({ success: true, quantity: results[0].quantity });
    }
  );
});

// 장바구니에서 여러 항목 삭제
router.post("/remove-multiple", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { items } = req.body;
  const member_id = req.session.user.id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  console.log(
    "Remove multiple from cart - member_id:",
    member_id,
    "items:",
    items
  );

  try {
    const results = await removeMultipleFromCart(member_id, items);
    console.log("removeMultipleFromCart success");
    res
      .status(200)
      .json({
        success: true,
        message: "선택된 상품이 장바구니에서 삭제되었습니다.",
      });
  } catch (error) {
    console.error("removeMultipleFromCart error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// 장바구니 항목 가져오기
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

// 선택한 상품들의 총 가격 계산
router.post("/calculate-total", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { items } = req.body;
  const member_id = req.session.user.id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  calculateTotalPrice(member_id, items, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    const totalPrice = results[0].total_price;
    res.status(200).json({ success: true, total_price: totalPrice });
  });
});

module.exports = router;
