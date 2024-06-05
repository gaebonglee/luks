const express = require("express");
const router = express.Router();
const {
  saveOrder,
  saveOrderItems,
  savePayment,
  saveShippingInfo,
} = require("../sql/order/order");
const { removeMultipleFromCart } = require("../sql/cart/cart");

router.post("/checkout", async (req, res) => {
  const { orderItems, paymentMethod, shippingInfo, totalAmount } = req.body;
  const memberId = req.session.user.id;

  if (isNaN(totalAmount)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid total amount" });
  }

  try {
    const orderId = await saveOrder(memberId, totalAmount, "Pending");
    console.log("Order ID:", orderId); // 콘솔에 Order ID 출력
    await saveOrderItems(orderId, orderItems);
    await savePayment(orderId, paymentMethod, totalAmount);
    await saveShippingInfo(orderId, shippingInfo);

    // 주문 성공 후 장바구니에서 항목 제거
    const itemsToRemove = orderItems.map((item) => ({
      product_id: item.product_id,
      color_id: item.color_id,
      size_id: item.size_id,
    }));
    await removeMultipleFromCart(memberId, itemsToRemove);

    res
      .status(200)
      .json({
        success: true,
        message: "Order successfully placed and items removed from cart",
      });
  } catch (error) {
    console.error("Error during order placement:", error);
    res.status(500).json({ success: false, message: "Order placement failed" });
  }
});

module.exports = router;
