const express = require("express");
const selectMemberName = require("../sql/mypage/selectMemberName");

const router = express.Router();

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

module.exports = router;
