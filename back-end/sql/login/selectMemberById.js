const db = require("../../config/db");

function selectMemberById(member_id, callback) {
  db.query(
    "SELECT * FROM member WHERE member_id = ?",
    [member_id],
    function (error, results) {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        if (results.length > 0) {
          callback(null, results[0]);
        } else {
          callback(null, null);
        }
      }
    }
  );
}

module.exports = selectMemberById;
