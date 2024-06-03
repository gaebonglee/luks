const express = require("express");
const router = express.Router();
const { getMemberInfo } = require("../sql/member/member");

router.get("/info", (req, res) => {
  if (!req.session.user) {
    console.error("Unauthorized access attempt");
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const memberId = req.session.user.id;

  getMemberInfo(memberId, (error, memberInfo) => {
    if (error) {
      console.error("Database query error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
    res.status(200).json({ success: true, member: memberInfo });
  });
});

module.exports = router;
