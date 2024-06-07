const express = require("express");
const router = express.Router();
const { getRecentOrders } = require("../sql/order/recentOrders");

router.get("/recent-orders", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const memberId = req.session.user.id;

  getRecentOrders(memberId, (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    // 주문 데이터를 그룹화하여 각 주문에 포함된 상품 목록을 포함
    const orders = results.reduce((acc, row) => {
      const {
        order_id,
        order_date,
        total_amount,
        product_id,
        quantity,
        price,
        p_name,
        p_image_url,
      } = row;

      if (!acc[order_id]) {
        acc[order_id] = {
          order_id,
          order_date,
          total_amount,
          products: [],
        };
      }

      acc[order_id].products.push({
        product_id,
        quantity,
        price,
        p_name,
        p_image_url,
      });

      return acc;
    }, {});

    // 로그 추가
    console.log("Orders:", Object.values(orders));

    res.status(200).json({ success: true, orders: Object.values(orders) });
  });
});

module.exports = router;
