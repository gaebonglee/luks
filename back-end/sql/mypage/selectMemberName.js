const db = require("../../config/db");

function selectMemberName(memberName, callback) {
  console.log("Querying database for member name:", memberName);
  db.query(
    "SELECT * FROM member WHERE member_name = ?",
    [memberName],
    function (error, results) {
      if (error) {
        console.error("Database query error:", error);
        callback(error, null);
      } else {
        console.log("Database query results:", results);
        callback(null, results);
      }
    }
  );
}

module.exports = selectMemberName;

