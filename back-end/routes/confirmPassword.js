const express = require("express");
const selectMemberIdPw = require("../sql/login/selectMemberIdPw");

const router = express.Router();

router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { password } = req.body;
  const member_id = req.session.user.id;

  console.log("Received password for confirmation: ", { member_id, password });

  selectMemberIdPw(member_id, password, (err, user) => {
    if (err) {
      console.error("Error during password confirmation: ", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "Password confirmed" });
    } else {
      return res.status(200).json({
        success: false,
      });
    }
  });
});

module.exports = router;
