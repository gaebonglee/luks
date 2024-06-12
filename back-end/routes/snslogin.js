const express = require("express");
const axios = require("axios");
const selectMemberById = require("../sql/login/selectMemberById");
const saveMemberInfo = require("../sql/join/saveMemberInfo");

const router = express.Router();

router.post("/oauth/kakao", async (req, res) => {
  const code = req.body.code;

  try {
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_REST_API_KEY,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code: code,
        },
      }
    );

    if (tokenResponse.data.error) {
      throw new Error(tokenResponse.data.error_description);
    }

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.data.kakao_account) {
      throw new Error("Failed to get user account information from Kakao.");
    }

    const kakaoAccount = userResponse.data.kakao_account;
    const memberData = {
      member_id: `${userResponse.data.id}_kakao`,
      member_pw: "",
      member_name: kakaoAccount.name,
      member_roles: "member",
      email: kakaoAccount.email || "",
      phonenumber: kakaoAccount.phone_number || "",
      postcode: "",
      basic_address: "",
      detail_address: "",
    };

    selectMemberById(memberData.member_id, async (err, user) => {
      if (err) {
        console.error("Error during login: ", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (user) {
        req.session.user = {
          id: user.member_id,
          pw: user.member_pw,
          member_name: user.member_name,
          role: user.member_roles,
          email: user.email,
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
        // 새로운 사용자라면 회원가입 처리
        saveMemberInfo(memberData, (err, result) => {
          if (err) {
            console.error("Error saving member information: ", err);
            return res.status(500).json({
              success: false,
              message: "Error saving member information",
            });
          }

          req.session.user = {
            id: memberData.member_id,
            pw: memberData.member_pw,
            member_name: memberData.member_name,
            role: memberData.member_roles,
            email: memberData.email,
            phonenumber: memberData.phonenumber,
            postcode: memberData.postcode,
            basic_address: memberData.basic_address,
            detail_address: memberData.detail_address,
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
              .json({ success: true, message: "회원가입이 완료되었습니다." });
          });
        });
      }
    });
  } catch (error) {
    console.error("Error during Kakao login: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
