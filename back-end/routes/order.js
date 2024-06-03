const express = require("express");
const router = express.Router();
const {
  saveOrder,
  saveOrderItems,
  savePayment,
} = require("../sql/order/order");

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

    res
      .status(200)
      .json({ success: true, message: "Order successfully placed" });
  } catch (error) {
    console.error("Error during order placement:", error);
    res.status(500).json({ success: false, message: "Order placement failed" });
  }
});

module.exports = router;
