const express = require("express");
const router = express.Router();
const { saveMemberInfo } = require("../sql/join/saveMemberInfo");

router.post("/saveMemberInfo", (req, res) => {
  const memberData = req.body;

  // 전달된 데이터 확인
  console.log("Received Data: ", memberData);

  saveMemberInfo(memberData, (error, results) => {
    if (error) {
      res.status(500).send({
        error: "Error saving member information",
      });
    } else {
      res.status(200).json({
        message: "Member information saved successfully",
      });
    }
  });
});

module.exports = router;
