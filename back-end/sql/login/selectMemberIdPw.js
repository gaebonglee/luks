const db = require("../../config/db");

function selectMemberIdPw(memberId, memberPw, callback) {
  db.query(
    "SELECT * FROM member WHERE member_id = ? AND member_pw = ?",
    [memberId, memberPw],
    function (error, results) {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        callback(null, results.length > 0);
      }
    }
  );
}

module.exports = selectMemberIdPw;
