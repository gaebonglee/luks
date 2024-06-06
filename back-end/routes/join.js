const express = require("express");
const saveMemberInfo = require("../sql/join/saveMemberInfo");
const selectMemberId = require("../sql/join/selectMemberId");
const selectEmail = require("../sql/join/selectEmail");

const router = express.Router();

router.post("/register", (req, res) => {
  const memberData = req.body;

  console.log("Received member data: ", memberData);

  saveMemberInfo(memberData, (err, result) => {
    if (err) {
      console.error("Error saving member information: ", err);
      return res.status(500).send("Error saving member information");
    }
    res.status(200).json({ message: "회원가입이 완료되었습니다." });
  });
});

router.post("/check-id", (req, res) => {
  const { member_id } = req.body;

  selectMemberId(member_id, (err, count) => {
    if (err) {
      console.error("Error checking member ID: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (count > 0) {
      return res.status(409).json({ message: "아이디가 이미 존재합니다." });
    } else {
      return res.status(200).json({});
    }
  });
});

router.post("/check-email", (req, res) => {
  const { email } = req.body;

  selectEmail(email, (err, count) => {
    if (err) {
      console.error("Error checking email: ", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (count > 0) {
      return res.status(409).json({ message: "이메일이 이미 존재합니다." });
    } else {
      return res.status(200).json({});
    }
  });
});

module.exports = router;
