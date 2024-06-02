const connection = require("../../config/db");

function getMemberInfo(memberId, callback) {
  const query = `SELECT member_id, member_name, phonenumber, postcode, basic_address, detail_address FROM member WHERE member_id = ?`;
  connection.query(query, [memberId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      callback(error, null);
    } else {
      if (results.length === 0) {
        console.error(`No member found with id: ${memberId}`);
        callback(new Error("Member not found"), null);
      } else {
        console.log(`Member info: ${JSON.stringify(results[0])}`);
        callback(null, results[0]);
      }
    }
  });
}

module.exports = {
  getMemberInfo,
};
