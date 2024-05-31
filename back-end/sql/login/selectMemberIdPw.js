const db = require("../../config/db");

function selectMemberIdPw(member_id, member_pw, callback) {
  db.query(
    "SELECT * FROM member WHERE member_id = ? AND member_pw = ?",
    [member_id, member_pw],
    function (error, results) {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          callback(null, results[0]); // 로그인 성공 시 user 객체 반환
        } else {
          callback(null, null); // 로그인 실패 시 null 반환
        }
      }
    }
  );
}

module.exports = selectMemberIdPw;
