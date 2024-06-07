const db = require("../../config/db");

const getMemberInfo = (memberId, callback) => {
  const query = `
    SELECT member_id, member_name, email, phonenumber, postcode, basic_address, detail_address 
    FROM member 
    WHERE member_id = ?
  `;
  db.query(query, [memberId], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result[0]);
  });
};

module.exports = getMemberInfo;
