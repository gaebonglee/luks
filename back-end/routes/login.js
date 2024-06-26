const express = require("express");
const selectMemberIdPw = require("../sql/login/selectMemberIdPw");

const router = express.Router();

router.post("/", (req, res) => {
  const { member_id, member_pw } = req.body;

  console.log("Received member data: ", { member_id, member_pw });

  selectMemberIdPw(member_id, member_pw, (err, user) => {
    if (err) {
      console.error("Error during login: ", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    if (user) {
      // 세션에 사용자 정보 저장
      req.session.user = {
        id: user.member_id,
        pw: user.member_pw,
        member_name: user.member_name,
        role: user.member_roles,
        email:user.email,
        phonenumber: user.phonenumber,
        postcode: user.postcode,
        basic_address: user.basic_address,
        detail_address: user.detail_address,
      };
      req.session.save((err) => {
        if (err) {
          console.error("Session save error: ", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        console.log("Session saved: ", req.session.user);
        res
          .status(200)
          .json({ success: true, message: "로그인이 완료되었습니다." });
      });
    } else {
      res.status(200).json({
        success: false,
        message: "아이디와 비밀번호를 다시 확인해주세요",
      });
    }
  });
});

module.exports = router;
