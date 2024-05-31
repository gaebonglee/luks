const express = require("express");
const selectMemberName = require("../sql/mypage/selectMemberName");
const selectWishList = require("../sql/mypage/selectWishList");

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

module.exports = router;
