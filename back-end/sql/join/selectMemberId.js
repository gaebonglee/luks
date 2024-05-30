const db = require("../../config/db");

function selectMemberId(memberId, callback) {
  db.query(
    "SELECT COUNT(*) AS count FROM member WHERE member_id = ?",
    [memberId],
    function (error, results) {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        const count = results[0].count;
        callback(null, count);
      }
    }
  );
}

module.exports = selectMemberId;
