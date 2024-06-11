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

// ------카카오톡 로그인 관련 --------- \\
router.get("/oauth/kakaologin", async (req, res) => {
  const code = req.query.code;

  try {
    const token = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_LOGIN_REST_KEY,
          code,
          redirect_uri: "http://localhost:3001/oauth/kakaologin",
        },
      }
    );

    const userInfo = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token.data.access_token,
        },
      }
    );

    const userId = userInfo.data.id + "_kakao";
    const phoneNumber = userInfo.data.kakao_account.phone_number || "";

    const memberData = {
      member_id: userId,
      member_pw: "",
      member_name: userInfo.data.kakao_account.profile.nickname,
      email: userInfo.data.kakao_account.email,
      phonenumber: phoneNumber,
      postcode: "",
      basic_address: "",
      detail_address: "",
    };

    saveMemberInfo(memberData, (err, result) => {
      if (err) {
        console.error("Error saving member information: ", err);
        return res.status(500).send("Error saving member information");
      }
      res.redirect("http://localhost:3001/");
    });
  } catch (error) {
    console.error("Error during Kakao login:", error);
    res.status(400).end("로그인 에러");
  }
});
// ------카카오톡 로그인 관련 --------- \\

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
