const express = require("express");
const saveMemberInfo = require("../sql/join/saveMemberInfo");

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

module.exports = router;
