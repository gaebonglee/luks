const express = require("express");
const selectMemberName = require("../sql/mypage/selectMemberName");
const selectWishList = require("../sql/mypage/selectWishList");
const getMemberInfo = require("../sql/mypage/getMemberInfo");
const updateMemberInfo = require("../sql/mypage/updateMemberInfo");
const selectEmail = require("../sql/join/selectEmail");
const crypto = require("crypto");
const fetch = require("node-fetch");

const router = express.Router();

// mypage 메뉴란에 로그인한 사용자 이름표시
router.get("/", async (req, res) => {
  console.log("Received request at /mypage");

  if (!req.session.user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const memberName = req.session.user.member_name;

  try {
    const memberDetails = await new Promise((resolve, reject) => {
      selectMemberName(memberName, (error, results) => {
        if (error) return reject(error);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });

    if (!memberDetails) {
      return res.status(404).send({ error: "Member Name not found" });
    }

    res.json({
      member: memberDetails,
    });
  } catch (error) {
    console.error("Error fetching member details:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// 위시리스트 조회
router.get("/mywish", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const member_id = req.session.user.id;

  selectWishList(member_id, (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ wishlist: results });
  });
});

// 회원정보 가져오기
router.get("/memberInfo", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const memberId = req.session.user.id;

  getMemberInfo(memberId, (err, result) => {
    if (err) {
      console.error("Error fetching member information: ", err);
      return res.status(500).send("Error fetching member information");
    }
    res.status(200).json(result);
  });
});

//이메일 중복체크
router.get("/check-email", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const memberId = req.session.user.id;

  selectEmail(memberId, (err, result) => {
    if (err) {
      console.error("Error fetching member information: ", err);
      return res.status(500).send("Error fetching member information");
    }
    res.status(200).json(result);
  });
});
// 인증번호 관련
router.post("/certification", async (req, res) => {
  const { certificateNumber, phonenumber } = req.body;
  console.log("Received certificate number:", certificateNumber, phonenumber);

  const dateTime = new Date().toISOString();
  const salt = crypto.randomBytes(32).toString("hex");

  const dataToSign = dateTime + salt;

  const signature = crypto
    .createHmac("sha256", process.env.COOL_SMS_API_SECRET)
    .update(dataToSign)
    .digest("hex");

  const messageDetails = {
    to: `${phonenumber}`,
    from: `${process.env.COOL_SMS_FROM}`,
    text: `[Luks 인증번호] 휴대폰 인증번호 [${certificateNumber}]를 입력해주세요. `,
  };

  const headers = {
    Authorization: `HMAC-SHA256 apiKey=${process.env.COOL_SMS_API_KEY}, date=${dateTime}, salt=${salt}, signature=${signature}`,
    "Content-Type": "application/json",
  };

  try {
    const apiResponse = await fetch(
      "http://api.coolsms.co.kr/messages/v4/send",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ message: messageDetails }),
      }
    );
    const apiData = await apiResponse.json();
    res.status(200).json(apiData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// 회원정보 업데이트
router.post("/update", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const memberData = {
    new_member_id: req.body.member_id, // 변경할 새로운 member_id
    current_member_id: req.session.user.id, // 현재 세션에서 가져온 member_id
    member_pw: req.body.member_pw,
    member_name: req.body.member_name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    postcode: req.body.postcode,
    basic_address: req.body.basic_address,
    detail_address: req.body.detail_address,
  };

  console.log("Received member data for update:", memberData); // 데이터 확인 로그 추가

  updateMemberInfo(memberData, (err, result) => {
    if (err) {
      console.error("Error updating member information: ", err);
      return res.status(500).send("Error updating member information");
    }

    // 세션 업데이트
    req.session.user.id = memberData.new_member_id;
    req.session.user.member_name = memberData.member_name;
    req.session.user.email = memberData.email;
    req.session.user.phonenumber = memberData.phonenumber;
    req.session.user.postcode = memberData.postcode;
    req.session.user.basic_address = memberData.basic_address;
    req.session.user.detail_address = memberData.detail_address;

    console.log("Update result:", result);
    res.status(200).json({});
  });
});

module.exports = router;
