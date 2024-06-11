const express = require("express");
const axios = require("axios");

const router = express.Router();

// ------카카오톡 로그인 관련 --------- \\
router.get("/oauth/kakaologin", async (req, res) => {
  console.log("Kakao login callback hit");
  const code = req.query.code;
  console.log("Authorization code received:", code);

  try {
    // 카카오 OAuth를 통해 토큰 받아오기
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
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
        },
      }
    );

    const { access_token } = token.data;
    console.log("Access token received:", access_token);

    // 토큰을 사용하여 사용자 정보 가져오기
    const userInfo = await axios.get(
      "https://kapi.kakao.com/v2/user/me",
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + access_token,
        },
      }
    );

    console.log("User info:", userInfo.data); // 응답 데이터 확인

    const userId = userInfo.data.id + "_kakao";
    const phoneNumber = kakaoAccount.phone_number || "";

    const memberData = {
      member_id: userId,
      member_pw: "",
      member_name: userInfo.data.kakao_account.name,
      email: userInfo.data.kakao_account.email,
      phonenumber: phoneNumber,
      postcode: "",
      basic_address: "",
      detail_address: "",
    };

    saveMemberInfo(memberData, (err, result) => {
      if (err) {
        console.error("Error saving member information:", err);
        return res.status(500).send("Error saving member information");
      }
      console.log("Member information saved:", result);
      res.redirect("http://localhost:3001/");
    });
  } catch (error) {
    console.error("Error during Kakao login:", error);
    res.status(400).end("로그인 에러");
  }
});

// ------카카오톡 로그인 관련 --------- \\

module.exports = router;
