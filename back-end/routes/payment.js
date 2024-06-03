const express = require("express");
const router = express.Router();
const { savePaymentInfo } = require("../sql/payment/payment");

router.post("/save-payment-info", (req, res) => {
  const { memberId, amount, paymentMethod } = req.body;

  savePaymentInfo(memberId, amount, paymentMethod, (error, results) => {
    if (error) {
      console.error("Failed to save payment info", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res
      .status(200)
      .json({ success: true, message: "Payment info saved successfully" });
  });
});

module.exports = router;
