const express = require("express");
const router = express.Router();
const {
  saveOrder,
  saveOrderItems,
  savePayment,
  saveShippingInfo,
  saveBuyerInfo,
} = require("../sql/order/order");
const { removeMultipleFromCart } = require("../sql/cart/cart");
const { getOrders } = require("../sql/order/getOrders");
const { getBuyerInfo } = require("../sql/order/getBuyerInfo");
const { getShippingInfo } = require("../sql/order/getShippingInfo");

router.post("/checkout", async (req, res) => {
  const { orderItems, paymentMethod, shippingInfo, totalAmount } = req.body;
  const memberId = req.session.user.id;
  const memberInfo = req.session.user; // Assuming this contains member_name, email, phonenumber

  if (isNaN(totalAmount)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid total amount" });
  }

  try {
    const orderId = await saveOrder(memberId, totalAmount, "배송완료");
    console.log("Order ID:", orderId); // 콘솔에 Order ID 출력
    await saveOrderItems(orderId, orderItems);
    await savePayment(orderId, paymentMethod, totalAmount);
    await saveShippingInfo(orderId, shippingInfo);
    await saveBuyerInfo(orderId, memberInfo);

    // 주문 성공 후 장바구니에서 항목 제거
    const itemsToRemove = orderItems.map((item) => ({
      product_id: item.product_id,
      color_id: item.color_id,
      size_id: item.size_id,
    }));
    await removeMultipleFromCart(memberId, itemsToRemove);

    res.status(200).json({
      success: true,
      message: "Order successfully placed and items removed from cart",
    });
  } catch (error) {
    console.error("Error during order placement:", error);
    res.status(500).json({ success: false, message: "Order placement failed" });
  }
});

// 주문배송조회jsx
router.get("/my-orders", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const memberId = req.session.user.id;

  getOrders(memberId, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.status(200).json({ success: true, orders: results });
  });
});

// 주문상품 디테일 페이지 주문자 정보 조회
router.get("/buyer-info", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { order_id } = req.query;

  getBuyerInfo(order_id, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Buyer info not found" });
    }

    res.status(200).json({ success: true, buyerInfo: results[0] });
  });
});

router.get("/shipping-info", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { order_id } = req.query;

  getShippingInfo(order_id, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Shipping info not found" });
    }

    res.status(200).json({ success: true, shippingInfo: results[0] });
  });
});

module.exports = router;
